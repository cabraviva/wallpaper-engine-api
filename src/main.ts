import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import { exec } from 'child_process'
import * as uuid from 'uuid'
import { ConfigJsonRough } from './configJsonRoughType'

type JSONArray = JSONLike[]
interface JSONObject {
  [key: string]: JSONLike | undefined
}
type JSONLike = number | string | null | boolean | JSONArray | JSONObject

export class WallpaperEngineApi {
  #weInstallPath: string
  #exePath: string
  #doLog: boolean
  #wpFolder: string

  #log(...msg: any[]) {
    if (this.#doLog)
      console.log(`[Wallpaper Engine API: INFO] ${msg.join(' ')}`)
  }

  #warn(...msg: any[]) {
    if (this.#doLog)
      console.warn(`[Wallpaper Engine API: WARN] ${msg.join(' ')}`)
  }

  /**
   * Wallpaper Engine API Wrapper
   * @param weInstallPath Path to the folder containing wallpaper32.exe or wallpaper64.exe. If not provided defaults to "C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine"
   * @param log Determines whether WEAPI should print debug logs
   */
  constructor(
    weInstallPath?: string,
    wpFolder: string = 'C:\\Program Files (x86)\\Steam\\steamapps\\workshop\\content\\431960',
    log: boolean = false
  ) {
    if (typeof weInstallPath !== 'string')
      weInstallPath =
        'C:\\Program Files (x86)\\Steam\\steamapps\\common\\wallpaper_engine'

    this.#weInstallPath = weInstallPath
    this.#exePath = path.join(
      this.#weInstallPath,
      `wallpaper${os.arch().includes('64') ? 64 : 32}.exe`
    )
    this.#doLog = log
    this.#wpFolder = wpFolder

    this.#log('Using', `wallpaper${os.arch().includes('64') ? 64 : 32}.exe`)

    if (fs.existsSync(this.#exePath)) {
      this.#log('Wallpaper Engine Executable found!')
    } else {
      throw new Error(
        'Could not find Wallpaper engine executable at path: ' +
          this.#weInstallPath +
          '\nWas looking for file: ' +
          this.#exePath
      )
    }
  }

  /**
   * Sends a wallpaper32.exe -control command.
   * @param order A argument string to send after -control
   */
  #sendOrder(order: string): Promise<{
    success: boolean
    stdout: string
    stderr: string
  }> {
    return new Promise((resolve, reject) => {
      exec(`"${this.#exePath}" -control ${order}`, (err, stdout, stderr) => {
        if (err) {
          throw err
        }

        if (stderr) {
          return resolve({
            success: false,
            stdout,
            stderr,
          })
        }

        resolve({
          success: true,
          stdout,
          stderr,
        })
      })
    })
  }

  // ####################################################### MAIN API FUNCTIONS #######################################################

  desktop() {
    const p = this
    return {
      async showIcons() {
        const order = 'showIcons'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      async hideIcons() {
        const order = 'hideIcons'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
    }
  }

  controls() {
    const p = this
    return {
      async play() {
        const order = 'play'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      async pause() {
        const order = 'pause'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      /**
       * Completely stops all running backgrounds and switches to windows default background. You can still use play(), or reload the wallpaper to resume.
       */
      async stop() {
        const order = 'stop'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      async mute() {
        const order = 'mute'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      async unmute() {
        const order = 'unmute'

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
    }
  }

  // ####################################################### Background management #######################################################
  async listWallpapers(): Promise<Wallpaper[]> {
    const wallpapers: Wallpaper[] = []

    const wallpaperDirs = fs
      .readdirSync(this.#wpFolder)
      .filter((name) =>
        fs.statSync(path.join(this.#wpFolder, name)).isDirectory()
      )

    for (const wallpaperDirName of wallpaperDirs) {
      const wallpaperDir = path.join(this.#wpFolder, wallpaperDirName)
      const projectJsonPath = path.join(wallpaperDir, 'project.json')
      if (!fs.existsSync(projectJsonPath)) {
        this.#warn(
          `${wallpaperDir} might not be a valid wallpaper. Found no project.json. Skipping indexing for this one.`
        )
        continue
      }
      const projectJson = JSON.parse(
        fs.readFileSync(projectJsonPath, 'utf8')
      ) as JSONLike
      if (
        !(
          projectJson !== null &&
          typeof projectJson === 'object' &&
          !Array.isArray(projectJson)
        )
      )
        throw 'Error: project.json is invalid'

      wallpapers.push({
        title:
          typeof projectJson.title === 'string'
            ? projectJson.title
            : 'No title',
        description:
          typeof projectJson.description === 'string'
            ? projectJson.description
            : 'No description',
        preview:
          typeof projectJson.preview === 'string' &&
          projectJson.preview.length > 0
            ? path.join(wallpaperDir, projectJson.preview)
            : null,
        tags: Array.isArray(projectJson.tags)
          ? projectJson.tags.map((e) => (e || '').toString())
          : [],
        properties: createWallpaperPropertyObject(projectJson),
        path: projectJsonPath,
        id: wallpaperDirName,
      })
    }

    return wallpapers
  }

  /**
   * Returns the config.json file of wallpaper engine.
   */
  async getConfig(): Promise<ConfigJsonRough> {
    const configJsonPath = path.join(this.#weInstallPath, 'config.json')
    const configJson = JSON.parse(
      fs.readFileSync(configJsonPath, 'utf8')
    ) as ConfigJsonRough
    return configJson
  }

  /**
   * Returns an array of names for all created profiles. These can be passed into profile().load()
   */
  async listProfiles(): Promise<string[]> {
    const configJson = await this.getConfig()
    const profiles = configJson[os.userInfo().username].general.profiles ?? []
    return profiles.map((profile) => {
      return profile.name
    })
  }

  profile() {
    const p = this
    return {
      /**
       * Loads a wallpaper and sets it
       * @param profileName Name of the profile. Can be retrieved using listProfiles()
       */
      async load(profileName: string) {
        let order = `openProfile -profile "${profileName}"`

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
    }
  }

  wallpaper() {
    const p = this
    return {
      /**
       * Loads a wallpaper and sets it
       * @param idOrPath Id of the wallpaper or path to project.json
       * @param monitorIndex Monitor Index for the wallpaper to set, beginning at 0. If not provided, sets for all monitors
       */
      async load(idOrPath: string, monitorIndex?: number) {
        const pjPath = getPjPathFromId(idOrPath, p.#wpFolder)

        let order = `openWallpaper -file "${pjPath}"`
        if (typeof monitorIndex === 'number')
          order += ` -monitor ${monitorIndex}`

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
      /**
       * Retrieves the current wallpaper and returns and object containing info about it.
       * @param monitorIndex Monitor Index for the wallpaper to get, beginning at 0. If not provided, retrieves wallpaper of the main monitor
       */
      async current(monitorIndex?: number) {
        let order = 'getWallpaper'
        if (typeof monitorIndex === 'number')
          order += ` -monitor ${monitorIndex}`
        const outFile = `${path.join(os.homedir(), 'x-wpe-' + uuid.v4())}.txt`
        order += ` > ${outFile}`
        p.#log('Will log output of getWallpaper to', outFile)

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)

        const ofContent = fs.readFileSync(outFile, 'utf-8').trim()
        fs.unlinkSync(outFile)
        const pjPath = path.join(path.dirname(ofContent), 'project.json')
        if (!fs.existsSync(pjPath))
          throw `Error: project.json not found at ${pjPath}`
        const projectJson = JSON.parse(
          fs.readFileSync(pjPath, 'utf8')
        ) as JSONLike
        if (
          !(
            projectJson !== null &&
            typeof projectJson === 'object' &&
            !Array.isArray(projectJson)
          )
        )
          throw 'Error: project.json is invalid'

        return {
          title:
            typeof projectJson.title === 'string'
              ? projectJson.title
              : 'No title',
          description:
            typeof projectJson.description === 'string'
              ? projectJson.description
              : 'No description',
          preview:
            typeof projectJson.preview === 'string' &&
            projectJson.preview.length > 0
              ? path.join(path.dirname(ofContent), projectJson.preview)
              : null,
          tags: Array.isArray(projectJson.tags)
            ? projectJson.tags.map((e) => (e || '').toString())
            : [],
          properties: createWallpaperPropertyObject(projectJson),
          path: pjPath,
          id: path.basename(path.dirname(ofContent)),
        }
      },
      async applyProperties(properties: JSONObject) {
        let order = `applyProperties -properties RAW~(${JSON.stringify(
          properties
        )})~END`

        const { success, stdout, stderr } = await p.#sendOrder(order)
        if (!success)
          throw `Error: couldn't execute order "${order}":\n${stderr}`
        p.#log(`Executed order "${order}"`)
      },
    }
  }
}

function createWallpaperPropertyObject(pj: JSONObject): JSONObject {
  pj.general =
    pj.general !== null &&
    typeof pj.general === 'object' &&
    !Array.isArray(pj.general)
      ? pj.general
      : {}
  let propObj = (pj.general || {}).properties || {}
  propObj =
    propObj !== null && typeof propObj === 'object' && !Array.isArray(propObj)
      ? propObj
      : {}

  for (const key of Object.keys(propObj)) {
    propObj[key] =
      propObj[key] !== null &&
      typeof propObj[key] === 'object' &&
      !Array.isArray(propObj[key])
        ? propObj[key]
        : {}
    propObj[key] = propObj[key].value
    if (typeof propObj[key] !== 'string') propObj[key] = `${propObj[key]}`
  }

  return propObj
}

function getPjPathFromId(idOrPath: string, wpf: string) {
  if (idOrPath.endsWith('project.json')) {
    if (fs.existsSync(idOrPath)) {
      return idOrPath
    } else {
      throw `Error: Implied that ${idOrPath} would be a path to a project.json, but wasn't able to find it there!`
    }
  } else {
    idOrPath = path.join(wpf, idOrPath, 'project.json')
    if (fs.existsSync(idOrPath)) {
      return idOrPath
    } else {
      throw `Error: Implied that ${idOrPath} would exist, but wasn't able to find it!`
    }
  }
}

interface Wallpaper {
  /**
   * Title of the Wallpaper
   */
  title: string
  /**
   * Description of the wallpaper
   */
  description: string
  /**
   * Path to preview file, or null if none was specified
   */
  preview: string | null
  /**
   * Specified tags for the wallpaper
   */
  tags: string[]
  /**
   * Property object with the current values. Can be passed into wallpaper().applyProperties()
   */
  properties: JSONObject
  /**
   * Path to project.json file of the wallpaper. Can be passed in when using wallpaper().load() instead of using the id.
   */
  path: string

  /**
   * Id of the background, mainly just used for wallpaper().load()
   */
  id: string
}

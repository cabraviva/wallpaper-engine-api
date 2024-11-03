import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import { exec } from 'child_process'

export class WallpaperEngineApi {

    #weInstallPath: string
    #exePath: string
    #doLog: boolean

    #log(...msg: any[]) {
        if (this.#doLog) console.log(`[Wallpaper Engine API: INFO] ${msg.join(' ')}`)
    }

    #warn(...msg: any[]) {
        if (this.#doLog) console.warn(`[Wallpaper Engine API: WARN] ${msg.join(' ')}`)
    }

    /**
     * Wallpaper Engine API Wrapper
     * @param weInstallPath Path to the folder containing wallpaper32.exe or wallpaper64.exe. If not provided defaults to "C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine"
     * @param log Determines whether WEAPI should print debug logs
     */
    constructor(weInstallPath?: string, log: boolean = false) {
        if (typeof weInstallPath !== 'string') weInstallPath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\wallpaper_engine'
        
        this.#weInstallPath = weInstallPath
        this.#exePath = path.join(this.#weInstallPath, `wallpaper${os.arch().includes('64') ? 64 : 32}.exe`)
        this.#doLog = log

        this.#log('Using', `wallpaper${os.arch().includes('64') ? 64 : 32}.exe`)
        
        if (fs.existsSync(this.#exePath)) {
            this.#log('Wallpaper Engine Executable found!')
        } else {
            throw new Error('Could not find Wallpaper engine executable at path: ' + this.#weInstallPath + '\nWas looking for file: ' + this.#exePath)
        }
    }

    /**
     * Sends a wallpaper32.exe -control command.
     * @param order A argument string to send after -control
     */
     #sendOrder(order: string): Promise<{
        success: boolean,
        stdout: string,
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
                        stderr
                    })
                }

                resolve({
                    success: true,
                    stdout,
                    stderr
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
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            },
            async hideIcons() {
                const order = 'hideIcons'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            }
        }
    }

    controls() {
        const p = this
        return {
            async play() {
                const order = 'play'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            },
            async pause() {
                const order = 'pause'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            },
            /**
             * Completely stops all running backgrounds and switches to windows default background. You can still use play(), or reload the wallpaper to resume.
             */
            async stop() {
                const order = 'stop'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            },
            async mute() {
                const order = 'mute'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            },
            async unmute() {
                const order = 'unmute'

                const { success, stdout, stderr } = await p.#sendOrder(order)
                if (!success) throw `Error: couldn't execute order "${order}":\n${stderr}`
                p.#log(`Executed order "${order}"`)
            }
        }
    }
}
// @ts-check
const { WallpaperEngineApi } = require('./dist/main.js')

const WE = new WallpaperEngineApi(undefined, undefined, false)
const sleep = (/** @type {number} */ ms) =>
  new Promise((r) => setTimeout(r, ms))

;(async () => {
  WE.desktop().hideIcons()

  await sleep(2000)

  WE.desktop().showIcons()

  WE.controls().mute()
  WE.controls().unmute()

  WE.controls().pause()

  await sleep(3000)

  WE.controls().play()

  await sleep(2000)

  WE.controls().stop()

  await sleep(2000)

  WE.controls().play()

  await sleep(1000)

  const wallpapers = await WE.listWallpapers()
  const profiles = await WE.listProfiles()

  // console.log(wallpapers)
  // console.log(profiles)
  // console.log(await WE.getConfig())

  const currentWallpaper = await WE.wallpaper().current()
  console.log(currentWallpaper)

  for (const profile of profiles) {
    await WE.profile().load(profile)
    await sleep(2000)
  }

  await WE.wallpaper().load(currentWallpaper.id)

  await sleep(1000)

  // Properties
  await WE.wallpaper().applyProperties(currentWallpaper.properties)
})()

// @ts-check
const { WallpaperEngineApi } = require('./dist/main.js')

const WE = new WallpaperEngineApi(undefined, true)
const sleep = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms))

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

})();
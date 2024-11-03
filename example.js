// @ts-check
const { WallpaperEngineApi } = require('./dist/main.js')

const WE = new WallpaperEngineApi(undefined, true)
const sleep = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms))

;(async () => {

    WE.desktop().hideIcons()

    await sleep(2000)

    WE.desktop().showIcons()

})();
# wallpaper-engine-api
 A nodejs wrapper to control your wallpaper engine backgrounds

## Install
`npm i wallpaper-engine-api`

## Usage
Import it:
```js
import { WallpaperEngineApi } from 'wallpaper-engine-api'
// or:
const { WallpaperEngineApi } = require('wallpaper-engine-api')
```

Initialize the Api like this:
```js
// First argument is path to the wallpaper engine install directory, defaults to: "C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine"
// Second argument enables debug logging, defaults to false
// All arguments are optional!
const WE = new WallpaperEngineApi(undefined, true)
```

Now you can control your desktop like this:
```js
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
```
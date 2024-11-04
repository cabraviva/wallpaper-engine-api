export interface ConfigJsonRough {
    [key: string]: KeyString
}

export interface KeyString {
    general: General
    version: number
}

export interface General {
    browser: Browser
    editor: Editor
    profiles: Profile[]
    user: User
    wallpaperconfig: Wallpaperconfig
    wallpaperconfigrecent: Wallpaperconfigrecent[]
    wallpaperconfigscreensaver: Wallpaperconfigscreensaver
}

export interface Browser {
    advertiseexplore: boolean
    advertisesendtomobile: boolean
    advertiseworkshop: boolean
    advertiseworkshoppopup: boolean
    authorblocklistnames: any[]
    defaultfilterconfig: Defaultfilterconfig
    explore: Explore
    filterinfo: Filterinfo
    folders: any[]
    lastselectedmonitor: string
    paireddevices: any[]
    pairingguid: string
    resultsperpage: number
    seasonaldialogdisabled: boolean
    seasonaldialogtimestamp: number
    showmonitorselectiononstart: boolean
    viewiconsize: string
}

export interface Defaultfilterconfig {
    Anime: boolean
    recommendedresolution: boolean
    showotherresolution: boolean
}

export interface Explore {
    custom: any[]
    disliked: any[]
    favorites: any[]
    liked: any[]
}

export interface Filterinfo {
    installed: Installed
    workshop: Workshop
}

export interface Installed {
    categorytags: Categorytags
    descending: boolean
    ratingtags: Ratingtags
    resolutiontags: Resolutiontags
    sort: string
    sourcetags: Sourcetags
    tags: Tags
    type: string
    typetags: Typetags
    utilitytags: Utilitytags
}

export interface Categorytags {
    Preset: boolean
    Wallpaper: boolean
}

export interface Ratingtags {
    Everyone: boolean
    Mature: boolean
    Questionable: boolean
}

export interface Resolutiontags {
    "1280 x 720": boolean
    "1366 x 768": boolean
    "1920 x 1080": boolean
    "2560 x 1440": boolean
    "3840 x 2160": boolean
    "Dual 3840 x 1080": boolean
    "Dual 5120 x 1440": boolean
    "Dual 7680 x 2160": boolean
    "Dual Standard Definition": boolean
    "Dynamic resolution": boolean
    "Other resolution": boolean
    "Portrait 1080 x 1920": boolean
    "Portrait 1440 x 2560": boolean
    "Portrait 2160 x 3840": boolean
    "Portrait 720 x 1280": boolean
    "Portrait Standard Definition": boolean
    "Standard Definition": boolean
    "Triple 11520 x 2160": boolean
    "Triple 4096 x 768": boolean
    "Triple 5760 x 1080": boolean
    "Triple 7680 x 1440": boolean
    "Triple Standard Definition": boolean
    "Ultrawide 2560 x 1080": boolean
    "Ultrawide 3440 x 1440": boolean
    "Ultrawide Standard Definition": boolean
}

export interface Sourcetags {
    Local: boolean
    Official: boolean
    Workshop: boolean
}

export interface Tags {
    Abstract: boolean
    Animal: boolean
    Anime: boolean
    CGI: boolean
    Cartoon: boolean
    Cyberpunk: boolean
    Fantasy: boolean
    Game: boolean
    Girls: boolean
    Guys: boolean
    Landscape: boolean
    MMD: boolean
    Medieval: boolean
    Memes: boolean
    Music: boolean
    Nature: boolean
    "Pixel art": boolean
    Relaxing: boolean
    Retro: boolean
    "Sci-Fi": boolean
    Sports: boolean
    Technology: boolean
    Television: boolean
    Unspecified: boolean
    Vehicle: boolean
}

export interface Typetags {
    Application: boolean
    Scene: boolean
    Video: boolean
    Web: boolean
}

export interface Utilitytags { }

export interface Workshop {
    categorytags: Categorytags2
    descending: boolean
    filterTitle: boolean
    ratingtags: Ratingtags2
    resolutiontags: Resolutiontags2
    sort: string
    sourcetags: Sourcetags2
    tags: Tags2
    type: string
    typetags: Typetags2
    utilitytags: Utilitytags2
}

export interface Categorytags2 {
    Preset: boolean
    Wallpaper: boolean
}

export interface Ratingtags2 {
    Everyone: boolean
    Mature: boolean
    Questionable: boolean
}

export interface Resolutiontags2 {
    "1280 x 720": boolean
    "1366 x 768": boolean
    "1920 x 1080": boolean
    "2560 x 1440": boolean
    "3840 x 2160": boolean
    "Dual 3840 x 1080": boolean
    "Dual 5120 x 1440": boolean
    "Dual 7680 x 2160": boolean
    "Dual Standard Definition": boolean
    "Dynamic resolution": boolean
    "Other resolution": boolean
    "Portrait 1080 x 1920": boolean
    "Portrait 1440 x 2560": boolean
    "Portrait 2160 x 3840": boolean
    "Portrait 720 x 1280": boolean
    "Portrait Standard Definition": boolean
    "Standard Definition": boolean
    "Triple 11520 x 2160": boolean
    "Triple 4096 x 768": boolean
    "Triple 5760 x 1080": boolean
    "Triple 7680 x 1440": boolean
    "Triple Standard Definition": boolean
    "Ultrawide 2560 x 1080": boolean
    "Ultrawide 3440 x 1440": boolean
    "Ultrawide Standard Definition": boolean
}

export interface Sourcetags2 {
    Local: boolean
    Official: boolean
    Workshop: boolean
}

export interface Tags2 {
    Abstract: boolean
    Animal: boolean
    Anime: boolean
    CGI: boolean
    Cartoon: boolean
    Cyberpunk: boolean
    Fantasy: boolean
    Game: boolean
    Girls: boolean
    Guys: boolean
    Landscape: boolean
    MMD: boolean
    Medieval: boolean
    Memes: boolean
    Music: boolean
    Nature: boolean
    "Pixel art": boolean
    Relaxing: boolean
    Retro: boolean
    "Sci-Fi": boolean
    Sports: boolean
    Technology: boolean
    Television: boolean
    Unspecified: boolean
    Vehicle: boolean
}

export interface Typetags2 {
    Application: boolean
    Scene: boolean
    Video: boolean
    Web: boolean
}

export interface Utilitytags2 { }

export interface Editor {
    autosavingenabled: boolean
    cameracursorspeed2d: number
    cameracursorspeed3d: number
    hasshownworkshoprules: boolean
    previewratio: string
    recentfiles: any[]
    savedlayouts: Savedlayouts
    scriptconsoleautoscroll: boolean
    showgrid: boolean
    showonstartup: boolean
    showselectionbox: boolean
    showstats: boolean
    showstatsmode: string
    suggestimportresolution: boolean
}

export interface Savedlayouts { }

export interface Profile {
    layout: number
    name: string
    profile: Profile2
    selectedwallpapers: Selectedwallpapers
}

export interface Profile2 { }

export interface Selectedwallpapers {
    Monitor0: Monitor0
}

export interface Monitor0 {
    file: string
}

export interface User {
    adjustdwmcolormode: string
    anticrash: any
    apprules: any
    audioinputdevice: string
    audioinputthreshold: number
    audioinputvolume: number
    autostart: boolean
    autostartscheduler: boolean
    autostartx64: boolean
    cefcommandline: string
    fps: number
    hasshownhighprioritywarning: boolean
    hasshownwelcomedialog: boolean
    highprecisiontimer: boolean
    iconopacity: number
    language: string
    loglevel: string
    mediablocklist: any
    mediaintegration: boolean
    monitordetection: string
    monitormap: Monitormap
    msaa: string
    overridelockscreen: boolean
    overridewallpaper: boolean
    pausevram: boolean
    playbackaudio: string
    playbackfocus: string
    playbackfullscreen: string
    playbackmaximized: string
    playbackonbattery: string
    playbacksleep: string
    plugindelay: number
    plugins: Plugins
    postprocessing: string
    preset: string
    processpriority: string
    reflection: boolean
    reloadaudio: boolean
    resolution: string
    safemode: boolean
    shadows: string
    slideshowkiller: boolean
    steamlanguage: string
    uicmd: string
    uieffects: any
    uihardwareacceleration: boolean
    uiquality: string
    uiskin: string
    uiskinseasonal: boolean
    unpauseaero: boolean
    vdesktopenabled: boolean
    videoaudiooutput: boolean
    videohardwareacceleration: boolean
    videoloopmode: string
    videomfstutterhack: boolean
    videoreadmode: string
    volumetrics: string
    webmframework: any
    windowupdaterate: number
}

export interface Monitormap {
    "//./DISPLAY1": Display1
    "//./DISPLAY27": Display27
    "//?/DISPLAY#GBT2800#5&d7b5261&0&UID4353#{e6f07b5f-ee97-4a90-b076-33f57bf4eaa7}": DisplayGbt28005D7b52610Uid4353E6f07b5fEe974a90B07633f57bf4eaa7
    "//?/DISPLAY#GBT2800#5&d7b5261&0&UID4355#{e6f07b5f-ee97-4a90-b076-33f57bf4eaa7}": DisplayGbt28005D7b52610Uid4355E6f07b5fEe974a90B07633f57bf4eaa7
}

export interface Display1 {
    absx: number
    absy: number
    location: number
    relx: number
    rely: number
    timestamp: number
}

export interface Display27 {
    absx: number
    absy: number
    location: number
    relx: number
    rely: number
    timestamp: number
}

export interface DisplayGbt28005D7b52610Uid4353E6f07b5fEe974a90B07633f57bf4eaa7 {
    absx: number
    absy: number
    location: number
    relx: number
    rely: number
    timestamp: number
}

export interface DisplayGbt28005D7b52610Uid4355E6f07b5fEe974a90B07633f57bf4eaa7 {
    absx: number
    absy: number
    location: number
    relx: number
    rely: number
    timestamp: number
}

export interface Plugins {
    ledextensions: Ledextensions
}

export interface Ledextensions {
    brightnessfactor: number
    chromalinkmulticolor: boolean
    enablechroma: boolean
    enablecue: boolean
    enabled: boolean
    enablescene: boolean
    enablevideo: boolean
    enableweb: boolean
    ledbrightness: boolean
    reducefps: boolean
    sourcemonitor: string
}

export interface Wallpaperconfig {
    layout: number
    profile: Profile3
    selectedwallpapers: Selectedwallpapers2
}

export interface Profile3 { }

export interface Selectedwallpapers2 {
    Monitor0: Monitor02
    Monitor1: Monitor1
}

export interface Monitor02 {
    file: string
}

export interface Monitor1 {
    file: any
}

export interface Wallpaperconfigrecent {
    config: Config
    playlist: boolean
    title: string
}

export interface Config {
    layout: number
    profile?: Profile4
    selectedwallpapers: Selectedwallpapers3
}

export interface Profile4 { }

export interface Selectedwallpapers3 {
    Monitor0: Monitor03
    Monitor1?: Monitor12
}

export interface Monitor03 {
    file: string
}

export interface Monitor12 {
    file: any
}

export interface Wallpaperconfigscreensaver {
    layout: number
    sameaswallpaper: boolean
}

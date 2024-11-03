/*
This file is used to define what happens when you use 'nautus release'
You can write this script like every normal node.js app, but are also
able to use special functions defined below:
async cmd(command: string): Promise<[exitCode, stdout]> - Execute a command in the default shell and waits until completion. Returns [exitCode, stdout]
os(): string - Returns 'windows', 'linux, 'mac' or 'unknown'
info(what: any): void - Displays an info in the console
warn(what: any): void - Displays a warning in the console
error(what: any): void - Displays an error in the console & exits with code 1
exit(code: number = 0): void - Exits with a code (default: 0)
async script(name: string): Promise<void> - Runs another script and returns after it has run. Define it by creating a @ScriptName.js file in this folder and run it by using await script('ScriptName')
async spawn(command: string, args: Array<string>, silent?: bool): Promise<exitCode> - Executes a command and displays the output in the shell
async nodeBin(command: string, args: Array<string>, silent?: bool): Promise<exitCode> - Searches through your locally installed node modules and executes a binary. This can be useful when running pkg, tsc, vite, etc...

modules: A useful collection of some modules, because it's bad practice to use require
Over time we might add more (just check using info(modules)), but right now it's:
- modules.fs
- modules.fse
- modules.path
- modules.chalk
- modules.axios


Only in @Release.js, you will also get global.releasetype
It will either be 'major', 'minor', 'patch' and state
which type of release this is. You can specify it using
nautus release [type]
If not specified, global.releasetype will be 'minor'
*/

module.exports = async (cmd, os, info, warn, error, exit, script, spawn, modules, nodeBin) => {
    /*
        This script is used when you want to release / publish something.
        If you are maintaining a npm module, you could use this script:

        
        const { path, fs } = modules
        const file = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')))
        const { version } = file
        const versionArray = version.split('.')
        const { releasetype } = global
        if (releasetype === 'major') {
            versionArray[0] = (parseInt(versionArray[0]) + 1).toString()
            versionArray[1] = '0'
            versionArray[2] = '0'
        } else if (releasetype === 'minor') {
            versionArray[1] = (parseInt(versionArray[1]) + 1).toString()
            versionArray[2] = '0'
        } else {
            versionArray[2] = (parseInt(versionArray[2]) + 1).toString()
        }
        const newVersion = versionArray.join('.')
        file.version = newVersion
        fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(file))
        await spawn('npm', ['publish'])


        This will automatically update the version depending on the release type and publish to npm!
    */

    /* PLEASE DON'T CHANGE METHOD NAMES, AS IT MIGHT BE REQUIRED BY RUNTIMES */
    /* PLEASE DON'T DELETE OR MODIFY THIS COMMENT, IT WILL BE USED TO INJECT SCRIPTS BY KELP */

    return error('No release script defined, please edit ./nautus/scripts/@Release.js')
}
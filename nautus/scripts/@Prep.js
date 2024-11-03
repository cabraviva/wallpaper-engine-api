/*
This file is used to define what happens when you use 'nautus build'
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
*/

module.exports = async (cmd, os, info, warn, error, exit, script, spawn, modules, nodeBin) => {
    // Edit this file for preparation before run
    /*
        If you use Svelte, for example, you might need to compile your files before
        running. In that case you could do this:

        await cmd('rollup -c')
    */

    /* PLEASE DON'T CHANGE METHOD NAMES, AS IT MIGHT BE REQUIRED BY RUNTIMES */
    /* PLEASE DON'T DELETE OR MODIFY THIS COMMENT, IT WILL BE USED TO INJECT SCRIPTS BY KELP */
// Injected by kelp:
await cmd(modules.path.join(process.cwd(), 'node_modules/.bin/tsc')).catch(error)

}
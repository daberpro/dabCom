const { Compile } = require("../compiler.js");
const fs = require("fs");
const { basename } = require("path");
const url = require("url");

module.exports.dabComPlugin = {
    name: 'dabCom-esbuild-plugin',
    setup(build) {

        build.onLoad({ filter: /\.js$/}, async (args) =>{

            const time = Date.now();

            let text = await fs.promises.readFile(args.path, 'utf8')

            console.log(basename(url.parse(args.path).pathname),Math.abs(time - Date.now())+"ms");
            
            return {
                contents: Compile(text).JS
            }

        })
    }
}
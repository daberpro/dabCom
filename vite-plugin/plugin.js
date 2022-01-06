const { Compile } = require("./compiler.js");
const fs = require("fs");

module.exports.dabComPlugin = {
    name: 'dabCom-esbuild-plugin',
    setup(build) {

        build.onLoad({ filter: /\.js$/}, async (args) =>{

            let text = await fs.promises.readFile(args.path, 'utf8')

            return {
                contents: Compile(text).JS
            }

        })
    }
}
const { Compile } = require("./compiler")
module.exports = function () {

    return {
        name: "dabCom",
        transform(src, id) {
            if (/\.js/.test(id)) {
                return {
                    code: Compile(src).JS,
                    map: null // provide source map if available
                }
            }
        },
        resolveId(id) {
            return `${__dirname}/${id}`;
        }
    }

}
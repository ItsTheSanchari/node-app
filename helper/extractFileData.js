const path = require('path')
const fs = require('fs')

exports.getFileData = (fileName,folder,cb) => {
    const p = path.join(path.dirname(require.main.filename),fileName)
    fs.readFile(p,(err,content)=>{
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(content))
        }
    })
} 
const path = require('path')
const fs = require('fs')

exports.getFileData = (fileName,folder,cb) => {
    const p = path.join(path.dirname(require.main.filename),
    folder,
    fileName
    )
    fs.readFile(p,(err,content)=>{
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(content))
        }
    })
}

exports.storeInsideFile = (fileName,folder,data,cb) => {
    const p = path.join(path.dirname(require.main.filename),
    folder,
    fileName
    )
    fs.writeFile(p,JSON.stringify(data),(err)=>{
        if(err) console.log('error',err)
    })
    cb(data)
}
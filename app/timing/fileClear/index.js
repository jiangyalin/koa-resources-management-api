const fs = require('fs')
const File = require('./models/file')

/*
* 文件删除步骤
* 1. 运行index删除所有状态为0的文件
* */

File.find({ is_deleted: 0 }, { path: 1, name: 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
    if (err) return console.log('err', err)
    const paths = result.map(data => './../../public' + data.path + data.name)
    paths.forEach(data =>{
        fs.unlink(data, (err, data) => {
            if (err) return console.log('err', err)
            console.log('data', data)
        })
    })
})
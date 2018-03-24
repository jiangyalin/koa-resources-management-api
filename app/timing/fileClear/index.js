const fs = require('fs')
const Volume = require('./models/volume')
const Book = require('./models/book')
const User = require('./models/user')
const App = require('./models/app')

/*
* 文件删除步骤
* 1. 运行index找到所有有引用的文件id并放入相应的json
* 2. 运行json读取有引用的文件id，反向找到所有无引用的文件id，更改无应用的文件id的删除状态
* 3. 删除所有状态为0的文件
* */

Volume.find({ is_deleted: 1 }, { cover: 1, file: 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
    if (err) return console.log('err', err)
    let id = []
    result.forEach(data => {
        if (data.cover !== null && data.cover !== undefined && data.cover !== '') id.push(data.cover)
        if (data.file !== null && data.file !== undefined && data.file !== '') id.push(data.file)
    })
    const fileId = { id }
    fs.writeFile('./log/volume.json', JSON.stringify(fileId), err => {
        if (err) return console.log('err', err)
        console.log('Saved.')
    })
})

Book.find({ is_deleted: 1 }, { cover: 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
    if (err) return console.log('err', err)
    let id = []
    result.forEach(data => {
        if (data.cover !== null && data.cover !== undefined && data.cover !== '') id.push(data.cover)
    })
    const fileId = { id }
    fs.writeFile('./log/book.json', JSON.stringify(fileId), err => {
        if (err) return console.log('err', err)
        console.log('Saved.')
    })
})

User.find({ is_deleted: 1 }, { avatar: 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
    if (err) return console.log('err', err)
    let id = []
    result.forEach(data => {
        if (data.avatar !== null && data.avatar !== undefined && data.avatar !== '') id.push(data.avatar)
    })
    const fileId = { id }
    fs.writeFile('./log/user.json', JSON.stringify(fileId), err => {
        if (err) return console.log('err', err)
        console.log('Saved.')
    })
})

App.find({ is_deleted: 1 }, { img: 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
    if (err) return console.log('err', err)
    let id = []
    result.forEach(data => {
        if (data.img !== null && data.img !== undefined && data.img !== '') id.push(data.img)
    })
    const fileId = { id }
    fs.writeFile('./log/app.json', JSON.stringify(fileId), err => {
        if (err) return console.log('err', err)
        console.log('Saved.')
    })
})
const fs = require('fs')
const File = require('./models/file')

const Reading = (json) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./log/' + json + '.json', 'utf8', (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

const app = Reading('app')

const user = Reading('user')

const book = Reading('book')

const volume = Reading('volume')

Promise.all([app, user, book, volume]).then((resolve) => {
    let id = []
    resolve.forEach(data => {
        JSON.parse(data).id.forEach(data => {
            id.push(data)
        })
    })

    File.find({ is_deleted: 1 }, { _id : 1 }, { sort: [{ createTime: -1 }] }, (err, result) => {
        if (err) return console.log('err', err)
        let arr = []
        result.forEach(data => {
            let node = true
            id.forEach(data1 => {
                if (data._id + '' === data1) node = false
            })
            if (node) arr.push(data)
        })
        arr.forEach(data => {
            File.update({ is_deleted: 1, _id: data }, { is_deleted : 0 }, { sort: [{ createTime: -1 }] }, (err, result) => {
                if (err) return console.log('err', err)
                console.log('result', result)
            })
        })
    })
}).catch((reject) => {
    console.log('reject', reject)
})
const File = require('./models/file')

File.remove({ is_deleted: 0 }, async (err, result) => {
    if (err) return console.log('err', err)
    console.log('成功')
})
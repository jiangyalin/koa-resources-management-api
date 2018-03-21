const Volume = require('./models/volume')

const Model = Volume // 模板
const criteria = { is_deleted: 1 } // 查询条件
const fields = { cover: 1, file: 1 } // 待返回的字段
const options = { sort: [{ createTime: -1 }] } // 排序

Model.find(criteria, fields, options, (err, result) => {
    if (err) return console.log('err', err)
    console.log('result', result)
})
const Book = new require('./book');

const page = Number(0) + 1 // 当前页码
const pageSize = Number(1) // 每页条数
const qs = new RegExp('') // 标题正则参数
const Model = Book // 模板
const populate = []
const criteria = { is_deleted: 1, $or: [{ name: qs }]} // 查询条件
const fields = { name: 1, area: 1, releaseTime: 1, author: 1, illustrator: 1, cover: 1, bookFile: 1, introduction: 1 } // 待返回的字段
const options = { sort: [{ releaseTime: -1 }] } // 排序

Model.find(criteria, fields, options, function (err, result) {
    console.log('ss', result)
}).skip((page -1) * pageSize).limit(pageSize).populate(populate)
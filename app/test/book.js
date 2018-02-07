const mongoose = require('./db')
var Schema = mongoose.Schema

//文章模板
const BookSchema = new Schema({
    bookName : { type: String, default: null }, // 书籍名称
    area : { type: String, default: null }, // 地区
    releaseTime : { type: Date, default: Date.now }, // 发售时间
    author : { type: String, default: null }, // 作者
    illustrator : { type: String, default: null }, // 插画师
    is_deleted : { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('book', BookSchema)
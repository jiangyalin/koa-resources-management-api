const mongoose = require('./db')
const Schema = mongoose.Schema

// 轻小说模板
const BookSchema = new Schema({
    bookName: { type: String, default: null }, // 书籍名称
    area: { type: Schema.Types.ObjectId, ref: 'country' }, // 地区
    library: { type: Schema.Types.ObjectId, ref: 'library' }, // 文库
    author: { type: String, default: null }, // 作者
    illustrator: { type: String, default: null }, // 插画师
    introduction: { type: String, default: null }, // 简介
    cover: { type: Schema.Types.ObjectId, ref: 'file' }, // 封面
    updateTime: { type: Date, default: Date.now }, // 更新时间
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('book', BookSchema)
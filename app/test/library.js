const mongoose = require('./db')
const Schema = mongoose.Schema

// 文库模板
const LibrarySchema = new Schema({
    name: { type: String, default: null }, // 文库名称
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('library', LibrarySchema)
const mongoose = require('./db')
const Schema = mongoose.Schema

// 文件模板
const FileSchema = new Schema({
    name: { type: String, default: null }, // 文件名称
    type: { type: String, default: '未知' }, // 文件类型
    suffixName: { type: String, default: null }, // 文件后缀名
    path: { type: String, default: null }, // 文件路径
    size: { type: String, default: null }, // 文件大小
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('file', FileSchema)
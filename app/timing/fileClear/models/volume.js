const mongoose = require('./db')
const Schema = mongoose.Schema

// 轻小说(卷)模板
const VolumeSchema = new Schema({
    name: { type: String, default: null }, // 卷名称
    sequence: { type: Number, default: 1 }, // 序列号
    releaseTime: { type: Date, default: Date.now }, // 发售时间
    cover: { type: Schema.Types.ObjectId, ref: 'file' }, // 封面
    file: { type: Schema.Types.ObjectId, ref: 'file' }, // 文件
    book: { type: Schema.Types.ObjectId, ref: 'book' }, // 书
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('volume', VolumeSchema)
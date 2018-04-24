import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 轻小说模板
const BookSchema = new Schema({
    name: { type: String, default: null }, // 书籍名称
    area: { type: Schema.Types.ObjectId, ref: 'country' }, // 地区
    library: { type: Schema.Types.ObjectId, ref: 'library' }, // 文库
    author: { type: String, default: null }, // 作者
    illustrator: { type: String, default: null }, // 插画师
    introduction: { type: String, default: null }, // 简介
    cover: { type: Schema.Types.ObjectId, ref: 'file' }, // 封面
    file: { type: Schema.Types.ObjectId, ref: 'file' }, // 文件
    statistics: { type: Schema.Types.ObjectId, ref: 'statistics' }, // 统计
    updateTime: { type: Date, default: Date.now }, // 更新时间
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('book', BookSchema)
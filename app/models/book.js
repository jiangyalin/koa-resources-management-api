import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 轻小说模板
const BookSchema = new Schema({
    bookName: { type: String, default: null }, // 书籍名称
    area: { type: String, default: null }, // 地区
    releaseTime: { type: Date, default: Date.now }, // 发售时间
    author: { type: String, default: null }, // 作者
    illustrator: { type: String, default: null }, // 插画师
    cover: { type: Schema.Types.ObjectId, ref: 'file' }, // 封面
    file: { type: Schema.Types.ObjectId, ref: 'file' }, // 文件id
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('book', BookSchema)
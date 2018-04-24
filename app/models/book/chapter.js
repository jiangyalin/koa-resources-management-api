import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 轻小说(章)模板
const ChapterSchema = new Schema({
    name: { type: String, default: null }, // 章名称
    sequence: { type: Number, default: 1 }, // 序列号,0为序章
    file: { type: Schema.Types.ObjectId, ref: 'file' }, // 文件
    book: { type: Schema.Types.ObjectId, ref: 'book' }, // 书
    volume: { type: Schema.Types.ObjectId, ref: 'volume' }, // 卷
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('chapter', ChapterSchema)
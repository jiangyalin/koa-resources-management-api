import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 书籍卷关系模板
const BookVolumeSchema = new Schema({
    sequence: { type: String, default: 1 }, // 序列号
    book: { type: Schema.Types.ObjectId, ref: 'book' }, // 书
    volume: { type: Schema.Types.ObjectId, ref: 'volume' }, // 券
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('book_volume', BookVolumeSchema)
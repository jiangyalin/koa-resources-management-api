import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 这本轻小说真厉害模板
const BookSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'book' }, // 书籍名称
    session: { type: Number, default: 1 }, // 届
    rank: { type: Number, default: 1 }, // 排名
    year: { type: Number, default: 2018 }, // 年
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('book', BookSchema)
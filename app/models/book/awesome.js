import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 这本轻小说真厉害榜单模板
const AwesomeSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'book' }, // 书籍
    rank: { type: Number, default: 1 }, // 排名
    year: { type: Number, default: 2018 }, // 年
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('awesome', AwesomeSchema)
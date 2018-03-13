import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// app模板
const AppSchema = new Schema({
    name: { type: String, default: null }, // 名称
    type: { type: Number, default: null }, // 类型
    content: { type: String, default: null }, // 内容
    img: { type: Schema.Types.ObjectId, ref: 'file', default: null }, // 图片
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('app', AppSchema)
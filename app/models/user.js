import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 轻小说模板
const BookSchema = new Schema({
    name: { type: String, default: null }, // 用户名
    password: { type: String, default: null }, // 密码
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('user', BookSchema)
import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 账号模板
const AccountSchema = new Schema({
    name: { type: String, default: null }, // 账号名
    password: { type: String, default: null }, // 密码
    user: { type: Schema.Types.ObjectId, ref: 'user' }, // 用户
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('account', AccountSchema)
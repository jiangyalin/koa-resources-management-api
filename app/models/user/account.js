import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 账号模板
const AccountSchema = new Schema({
    account: { type: String, default: null }, // 账号名
    password: { type: String, default: null }, // 密码
    user: { type: Schema.Types.ObjectId, ref: 'user' }, // 用户
    type: { type: Number, default: 1 }, // 用户类型 0 管理员，1 一般用户
    createTime: { type: Date, default: Date.now }, // 创建时间
    verificationCode: { type: Number, default: Math.floor(Math.random()*(999999 - 100000 + 1) + 100000) }, // 验证码 100000-999999之间得随机整数
    is_active: { type: Number, default: 0 }, // 激活状态
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('account', AccountSchema)
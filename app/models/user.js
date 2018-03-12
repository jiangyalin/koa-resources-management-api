import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 用户模板
const UserSchema = new Schema({
    name: { type: String, default: null }, // 姓名
    nickname: { type: String, default: null }, // 昵称
    gender: { type: String, default: null }, // 性别
    phone: { type: String, default: null }, // 手机
    eMail: { type: String, default: null }, // 电子邮箱
    birthDate: { type: Date, default: Date.now }, // 出生日期
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('user', UserSchema)
const mongoose = require('./db')
const Schema = mongoose.Schema

// 用户模板
const UserSchema = new Schema({
    name: { type: String, default: null }, // 姓名
    nickname: { type: String, default: null }, // 昵称
    gender: { type: String, default: 0 }, // 性别 0 保密，1 男， 2女
    phone: { type: String, default: null }, // 手机
    eMail: { type: String, default: null }, // 电子邮箱
    birthDate: { type: Date, default: Date.now }, // 出生日期
    avatar: { type: Schema.Types.ObjectId, ref: 'file' }, // 头像
    type: { type: Number, default: 1 }, // 用户类型 0 管理员，1 一般用户
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

module.exports = mongoose.model('user', UserSchema)
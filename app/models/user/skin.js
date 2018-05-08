import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 皮肤模板
const SkinSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' }, // 用户
    type_a_backgroundColor: { type: Array, default: [0, 0, 0, 0] }, // 类型a盒子背景颜色raba
    type_a_boxShadow: { type: Array, default: [0, 0, 0, 0, [0, 0, 0, 0]] }, // 类型a盒子阴影 左位移，上位移，扩展，大小，rgba
    type_a_backgroundImage: { type: Schema.Types.ObjectId, ref: 'file' }, // 类型a盒子背景图片
    type_a_backgroundSize: { type: Number, default: 0 }, // 类型a盒子背景图片大小
    backgroundImage: { type: Schema.Types.ObjectId, ref: 'file' }, // 网页背景图片
    type_b_opacity: { type: Number, default: 0 }, // 类型b盒子背景透明度
    type_b_backgroundColor: { type: Array, default: [0, 0, 0, 0] }, // 类型b盒子背景颜色raba
    type_b_fontColor: { type: Array, default: [0, 0, 0, 0] }, // 类型b盒子字体颜色rgba
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('skin', SkinSchema)
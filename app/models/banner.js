import mongoose from './../lib/db'
const Schema = mongoose.Schema

// banner模板
const BannerSchema = new Schema({
    name: { type: String, default: null }, // 名称
    image: { type: Schema.Types.ObjectId, ref: 'file' }, // 封面
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('banner', BannerSchema)
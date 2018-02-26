import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 国家模板
const CountrySchema = new Schema({
    name: { type: String, default: null }, // 国家名称
    sn: { type: String, default: null }, // 地区
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('country', CountrySchema)
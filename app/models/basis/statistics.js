import mongoose from './../../lib/db'
const Schema = mongoose.Schema

// 统计模板
const StatisticsSchema = new Schema({
    down: { type: Number, default: 0 }, // 下载次数
    click: { type: Number, default: 0 }, // 点击次数
    collect: { type: Number, default: 0 }, // 收藏次数
    createTime: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
})

export default mongoose.model('statistics', StatisticsSchema)
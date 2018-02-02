import mongoose from './../lib/db'
var Schema = mongoose.Schema

//文章模板
const BookSchema = new Schema({
    bookName : { type: String, default: null }, // 书籍名称
    area : { type: String, default: null }, // 地区
    releaseTime : { type: String, default: null }, // 发售时间
    author : { type: String, default: null }, // 作者
    illustrator : { type: String, default: null } // 插画师
})

export default mongoose.model('book', BookSchema)
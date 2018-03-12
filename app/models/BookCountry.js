import mongoose from './../lib/db'
const Schema = mongoose.Schema

// 书籍国家关系
var BookCountrySchema = new Schema({
    book_id : { type: Schema.Types.ObjectId, ref: 'book' }, // 书籍id
    country_id: [{ type: Schema.Types.ObjectId, ref: 'country'}] // 国家id
});

module.exports = mongoose.model('book_country', BookCountrySchema);
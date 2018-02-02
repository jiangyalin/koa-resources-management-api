const Book = new require('./book');
const moment = require('moment');

// 插入数据
let book = {
    bookName: '', // 书籍名称
    area: '0', // 地区
    releaseTime: '', // 发售时间
    author: '', // 作者
    illustrator: '' // 插画师
};
Book.create(book, function (err, result) {
    console.log('成功');
});
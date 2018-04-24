const Book = new require('./book');

// 插入数据
let book = {
    name: '魔法禁书目录', // 书籍名称
    area: '日本', // 地区
    releaseTime: new Date(), // 发售时间
    author: '镰池和马', // 作者
    illustrator: '八王子' // 插画师
};
Book.create(book, function (err, result) {
    console.log('成功');
});
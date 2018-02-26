const Country = new require('./country');

// 插入数据
let country = {
    name: '德国',
    sn: 'de'
};
Country.create(country, function (err, result) {
    console.log('成功');
});
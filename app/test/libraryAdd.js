const Library = new require('./library');

// 插入数据
let library = [{
    name: 'GAGAGA文库'
}, {
    name: 'MF文库J'
}, {
    name: '富士见Fantasia文库'
}, {
    name: 'Sneaker文库'
}, {
    name: 'Overlap文库'
}];
Library.create(library, function (err, result) {
    if (err) {
        console.log(err)
    } else {
        console.log('成功', result);
    }
});
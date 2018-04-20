var TimSort = require('timsort');

// var arr = [5, 6, 1, 9];
var arr = [{
    a: 1
}, {
    a: 4
}, {
    a: 8
}, {
    a: 7
}];

const sort = (a, b) => {
    return b.a - a.a
}

TimSort.sort(arr, sort);

console.log(arr);
const fs = require('fs')
const File = require('./models/file')

// File.update({ is_deleted: 0, _id:  }, { is_deleted: 0 }, { sort: [{ createTime: -1 }] }, (err, result) => {
//     if (err) {
//         reject({
//             code: '500',
//             data: {},
//             message: err.message
//         })
//     }
//
//     resolve({
//         code: '200',
//         data: {
//             ...result._doc
//         }
//     })
// })
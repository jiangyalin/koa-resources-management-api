import Chapter from './../../../../models/book/chapter'

export default (criteria) => {
    return new Promise((resolve, reject) => {
        Chapter.update(criteria, { is_deleted: 0 }, { sort: [{ createTime: -1 }] }, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            }
            console.log('result', result)

            resolve({
                code: '200',
                data: {
                    ...result._doc
                }
            })
        })
    })
}
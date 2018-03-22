import BookVolume from './../../../../models/book/book_volume'

export default (criteria) => {
    return new Promise((resolve, reject) => {
        BookVolume.remove(criteria, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {}
            })
            
        })
    })
}
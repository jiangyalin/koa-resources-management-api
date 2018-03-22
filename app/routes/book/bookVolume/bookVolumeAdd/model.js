import BookVolume from './../../../../models/book/book_volume'

export default (objects) => {
    return new Promise((resolve, reject) => {
        BookVolume.create(objects, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        volume: null
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    ...result._doc
                }
            })
        })
    })
}
import Book from './../../../../models/book/book'
import log from './../../../../log'

export default (objects) => {
    return new Promise((resolve, reject) => {
        Book.create(objects, (err, result) => {
            if (err) {
                log.warn(JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        book: []
                    },
                    message: err.message
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        ...result._doc
                    }
                })
            }
        })
    })
}
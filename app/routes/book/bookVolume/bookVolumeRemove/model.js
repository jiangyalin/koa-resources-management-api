import BookVolume from './../../../../models/book/book_volume'
import log from './../../../../log'

export default (criteria) => {
    return new Promise((resolve, reject) => {
        BookVolume.remove(criteria, async (err, result) => {
            if (err) {
                log.warn(JSON.stringify(err))
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
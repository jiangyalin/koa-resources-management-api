import Awesome from './../../../../models/book/awesome'
import log from './../../../../log'

export default (objects) => {
    return new Promise((resolve, reject) => {
        Awesome.create(objects, async (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
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
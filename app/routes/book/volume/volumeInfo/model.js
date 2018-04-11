import Volume from './../../../../models/book/volume'
import log from './../../../../log'

export default (criteria, fields, options, populate) => {
    return new Promise((resolve, reject) => {
        Volume.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                log.warn(JSON.stringify(err))
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            } else if (result !== null) {
                resolve({
                    code: '200',
                    data: {
                        ...result._doc
                    }
                })
            } else {
                reject({
                    code: '401',
                    data: {}
                })
            }
        }).populate(populate)
    })
}
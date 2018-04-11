import User from './../../../../models/user/user'
import log from './../../../../log'

export default (criteria, doc, options) => {
    return new Promise((resolve, reject) => {
        User.update(criteria, doc, options, (err, result) => {
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
                data: {
                    ...result._doc
                }
            })
        })
    })
}
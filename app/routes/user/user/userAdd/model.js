import User from './../../../../models/user/user'
import log from './../../../../log'

export default (objects) => {
    return new Promise((resolve, reject) => {
        User.create(objects, (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        user: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    user: result
                }
            })

        })
    })
}
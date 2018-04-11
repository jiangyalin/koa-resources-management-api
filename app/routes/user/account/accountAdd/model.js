import Account from './../../../../models/user/account'
import log from './../../../../log'

export default (objects) => {
    return new Promise((resolve, reject) => {
        Account.create(objects, (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        account: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    account: result
                }
            })

        })
    })
}
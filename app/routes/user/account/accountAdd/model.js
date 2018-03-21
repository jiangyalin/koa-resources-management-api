import Account from './../../../../models/account'

export default (objects) => {
    return new Promise((resolve, reject) => {
        Account.create(objects, (err, result) => {
            if (err) {
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
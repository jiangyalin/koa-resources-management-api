import Skin from './../../../../models/user/skin'
import log from './../../../../log'

export default (objects) => {
    return new Promise((resolve, reject) => {
        Skin.create(objects, (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        skin: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    skin: result
                }
            })

        })
    })
}
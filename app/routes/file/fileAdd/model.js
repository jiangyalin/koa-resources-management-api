import File from './../../../models/basis/file'
import log from './../../../log'

export default (fileInfo) => {
    return new Promise((resolve, reject) => {
        File.create(fileInfo, (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {}
                })
            }

            resolve({
                code: '200',
                data: {
                    id: result._id
                }
            })
        })
    })
}
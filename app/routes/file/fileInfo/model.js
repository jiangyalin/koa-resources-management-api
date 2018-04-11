import File from './../../../models/file'
import log from './../../../log'

export default (criteria, fields, options, populate) => {
    return new Promise((resolve, reject) => {
        File.findOne(criteria, fields, options, (err, result) => {
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
                log.warn('文件不存在' + JSON.stringify(criteria))
                reject({
                    code: '401',
                    data: {}
                })
            }
        }).populate(populate)
    })
}
import File from './../../../models/file'

export default (criteria, fields, options, populate) => {
    return new Promise((resolve, reject) => {
        File.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                console.log('err', err)
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
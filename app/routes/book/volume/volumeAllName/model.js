import Volume from './../../../../models/book/volume'

export default (criteria, fields, options, populate) => {
    return new Promise((resolve, reject) => {
        Volume.find(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            } else if (result !== null) {
                resolve({
                    code: '200',
                    data: {
                        volume: result
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
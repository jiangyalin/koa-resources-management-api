import Volume from './../../../../models/book/volume'

export default (criteria) => {
    return new Promise((resolve, reject) => {
        Volume.remove(criteria, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            }

            reject({
                code: '200',
                data: {}
            })
            
        })
    })
}
import Statistics from './../../../../models/basis/statistics'
import log from './../../../../log'

export default (criteria) => {
    return new Promise((resolve, reject) => {
        Statistics.update(criteria, { is_deleted: 0 }, { sort: [{ createTime: -1 }] }, async (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
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
import BookVolume from './../../../../models/book/book_volume'
import log from './../../../../log'

export default (sequence, book) => {
    return new Promise((resolve, reject) => {
        BookVolume.find({ is_deleted: 1, sequence: Number(sequence), book: book }, { volume: 1 }, { sort: [{ createTime: -1 }] }, async (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        volume: []
                    },
                    message: err.message
                })
            }
            
            resolve({
                code: '200',
                data: {
                    bookVolume: result
                }
            })
        }).populate([{ path: 'volume' }])
    })
}
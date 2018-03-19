import Router from 'koa-router'
import BookVolume from './../../../models/book/book_volume'
import Volume from './../../../models/book/volume'

const router = Router()

// 添加书籍(卷)
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const volume = {
        sequence: Number(parameter.sequence), // 序列号
        name: parameter.name, // 卷名称
        releaseTime: parameter.releaseTime, // 发售时间
        cover: parameter.cover, // 封面
        file: parameter.file // 文件
    }

    const model = new Promise((resolve, reject) => {
        BookVolume.find({ is_deleted: 1, sequence: Number(parameter.sequence), book: parameter.book }, { createTime: 1 }, { sort: [{ createTime: -1 }] }, async (error, result) => {
            if (error) {
                reject({
                    code: '500',
                    data: {
                        volume: []
                    },
                    message: err.message
                })
            }

            if (result.length === 0) {
                const model2 = new Promise((resolve, reject) => {
                    Volume.create(volume, async (err, result) => {
                        if (err) {
                            reject({
                                code: '500',
                                data: {
                                    volume: null
                                },
                                message: err.message
                            })
                        }

                        const bookVolume = {
                            sequence: Number(parameter.sequence), // 序列号
                            book: parameter.book, // 书
                            volume: result._id // 卷
                        }

                        const model3 = new Promise((resolve, reject) => {
                            BookVolume.create(bookVolume, async (err, result) => {
                                if (err) {
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

                        const data3 = await model3.then((resolve) => {
                            return resolve
                        }).catch((reject) => {
                            return reject
                        })

                        resolve(data3)
                    })
                })

                const data2 = await model2.then((resolve) => {
                    return resolve
                }).catch((reject) => {
                    return reject
                })

                resolve(data2)
            }

            if (result.length > 0) {

                const bookVolume = {
                    sequence: Number(parameter.sequence), // 序列号
                    book: parameter.book, // 书
                    volume: result[0]._id // 卷
                }

                const criteria = { is_deleted: 1, $or: [{ _id: result[0]._id }] } // 查询条件
                const options = { sort: [{ createTime: -1 }] } // 排序

                const model3 = new Promise((resolve, reject) => {
                    BookVolume.update(criteria, bookVolume, options, (err, result) => {
                        if (err) {
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

                const data3 = await model3.then((resolve) => {
                    return resolve
                }).catch((reject) => {
                    return reject
                })

                resolve(data3)
            }
        })
    })

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })


    ctx.body = data
})

export default router
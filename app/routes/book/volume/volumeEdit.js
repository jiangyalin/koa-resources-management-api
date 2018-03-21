import Router from 'koa-router'
import Volume from './../../../models/book/volume'
import BookVolume from './../../../models/book/book_volume'

const router = Router()

// 编辑卷
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 删除卷表中同一书下同一序列号的数据（真删）
    const model = new Promise((resolve, reject) => {
        Volume.remove({ is_deleted: 1, sequence: parameter.sequence, book: parameter.book }, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            }

            // 删除卷表-书关系表中同一书下同一序列号的数据（真删）
            const model2 = new Promise((resolve, reject) => {
                BookVolume.remove({ is_deleted: 1, sequence: parameter.sequence, book: parameter.book }, async (err, result) => {
                    if (err) {
                        reject({
                            code: '500',
                            data: {},
                            message: err.message
                        })
                    }

                    // 添加卷
                    const volume = {
                        sequence: Number(parameter.sequence), // 序列号
                        name: parameter.name, // 卷名称
                        releaseTime: parameter.releaseTime, // 发售时间
                        cover: parameter.cover, // 封面
                        file: parameter.file, // 文件
                        book: parameter.book // 书
                    }

                    const model3 = new Promise((resolve, reject) => {
                        Volume.create(volume, async (err, result) => {
                            if (err) {
                                reject({
                                    code: '500',
                                    data: {},
                                    message: err.message
                                })
                            }

                            // 添加书-卷关系
                            const bookVolume = {
                                sequence: Number(parameter.sequence), // 序列号
                                book: parameter.book, // 书
                                volume: result._id
                            }

                            const model4 = new Promise((resolve, reject) => {
                                BookVolume.create(bookVolume, (err, result) => {
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

                            const data4 = await model4.then((resolve) => {
                                return resolve
                            }).catch((reject) => {
                                return reject
                            })

                            resolve(data4)
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
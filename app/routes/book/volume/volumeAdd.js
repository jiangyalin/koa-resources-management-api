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
    console.log('volume', volume)
    const model = new Promise((resolve, reject) => {
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
                book: parameter.book, // 书
                volume: result._id // 卷
            }

            const model2 = new Promise((resolve, reject) => {
                BookVolume.create(bookVolume, async (err, result) => {
                    if (err) {
                        reject({
                            code: '500',
                            data: {},
                            message: err.message
                        })
                    } else {
                        resolve({
                            code: '200',
                            data: {
                                ...result._doc
                            }
                        })
                    }
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

    const date = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = date
})

export default router
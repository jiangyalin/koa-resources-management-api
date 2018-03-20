import Router from 'koa-router'
import Volume from './../../../models/book/volume'

const router = Router()

// 获取书籍详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'book', select: 'bookName' }, { path: 'file' }, { path: 'cover' }]
    const fields = { name: 1, book: 1, file: 1,  releaseTime: 1, sequence: 1, cover: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Volume.findOne(criteria, fields, options, (err, result) => {
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

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router
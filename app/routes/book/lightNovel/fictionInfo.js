import Router from 'koa-router'
import Book from './../../../models/book'

const router = Router()

// 获取书籍详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'cover' }, { path: 'bookFile' }]
    const fields = { bookName: 1, area: 1, releaseTime: 1, author: 1, illustrator: 1, cover: 1, bookFile: 1, introduction: 1 } // 待返回的字段
    const options = { sort: [{ bookName: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Book.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {}
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
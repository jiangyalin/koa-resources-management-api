import Router from 'koa-router'
import Book from './../../../models/book'

const router = Router()

// 获取书籍列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    let fields = { bookName : 2, area : 1, releaseTime : -1, author: 1, illustrator: 1, file: 1 } // 待返回的字段
    const options = { sort: [{ bookName: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Book.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {}
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

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router
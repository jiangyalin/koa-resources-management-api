import Router from 'koa-router'
import Book from './../../../models/book/book'

const router = Router()

// 获取书籍详情
router.get('/', async (ctx, next) => {
    const criteria = { is_deleted: 1 } // 查询条件
    const populate = []
    const fields = { bookName: 1 } // 待返回的字段
    const options = { sort: [{ bookName: 1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Book.find(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {}
                })
            } else if (result !== null) {
                resolve({
                    code: '200',
                    data: {
                        book: result
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
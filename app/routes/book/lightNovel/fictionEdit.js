import Router from 'koa-router'
import Book from './../../../models/book/book'

const router = Router()

// 编辑书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let book = {
        bookName: parameter.bookName, // 书籍名称
        area: parameter.area, // 地区
        library: parameter.library, // 文库
        author: parameter.author, // 作者
        illustrator: parameter.illustrator, // 插画师
        introduction: parameter.introduction // 简介
    }

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc = book // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Book.update(criteria, doc, options, (err, result) => {
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
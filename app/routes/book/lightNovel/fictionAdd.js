import Router from 'koa-router'
import Book from './../../../models/book/book'

const router = Router()

// 添加书籍
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
    const model = new Promise((resolve, reject) => {
        Book.create(book, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        book: []
                    },
                    message: err.message
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        book: []
                    }
                })
            }
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
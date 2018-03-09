import Router from 'koa-router'
import Book from './../../../models/book'

const router = Router()

// 添加书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let book = {
        bookName: parameter.bookName, // 书籍名称
        area: parameter.area, // 地区
        releaseTime: parameter.releaseTime, // 发售时间
        author: parameter.author, // 作者
        illustrator: parameter.illustrator, // 插画师
        cover: parameter.coverId, // 封面id
        bookFile: parameter.fileId, // 文件id
        introduction: parameter.introduction // 简介
    }
    const model = new Promise((resolve, reject) => {
        Book.create(book, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        book: []
                    }
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
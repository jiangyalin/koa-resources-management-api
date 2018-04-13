import Router from 'koa-router'
import FictionAdd from './model'

const router = Router()

// 添加书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const book = {
        bookName: parameter.bookName, // 书籍名称
        area: parameter.area, // 地区
        library: parameter.library, // 文库
        author: parameter.author, // 作者
        cover: parameter.cover, // 封面
        illustrator: parameter.illustrator, // 插画师
        introduction: parameter.introduction // 简介
    }

    const model = FictionAdd(book)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
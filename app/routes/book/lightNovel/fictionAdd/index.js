import Router from 'koa-router'
import FictionAdd from './model'
import StatisticsAdd from './../../../basis/statistics/statisticsAdd/model'

const router = Router()

// 添加书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    
    // 添加书籍
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

    const fictionAdd = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    if (fictionAdd.code === '200') {
        // 插入统计
        const statistics = {
            book: fictionAdd.data._id, // 对象
            type: 'book' // 类型
        }

        const model0 = StatisticsAdd(statistics)

        await model0.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    ctx.body = fictionAdd
})

export default router
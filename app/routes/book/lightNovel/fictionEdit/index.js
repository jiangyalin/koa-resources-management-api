import Router from 'koa-router'
import FictionEdit from './model'

const router = Router()

// 编辑书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let book = {
        bookName: parameter.bookName, // 书籍名称
        area: parameter.area, // 地区
        library: parameter.library, // 文库
        author: parameter.author, // 作者
        cover: parameter.cover, // 封面
        illustrator: parameter.illustrator, // 插画师
        introduction: parameter.introduction, // 简介
        updateTime: Date.now() // 更新时间
    }

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc = book // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FictionEdit(criteria, doc, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
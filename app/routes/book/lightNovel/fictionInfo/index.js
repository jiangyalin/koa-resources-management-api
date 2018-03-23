import Router from 'koa-router'
import FictionInfo from './model'

const router = Router()

// 获取书籍详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'cover' }]
    const fields = { bookName: 1, area: 1, library: 1,  author: 1, illustrator: 1, introduction: 1, cover: 1, updateTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FictionInfo(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
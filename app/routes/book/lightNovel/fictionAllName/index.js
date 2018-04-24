import Router from 'koa-router'
import FictionAllName from './model'

const router = Router()

// 获取所有书籍名称
router.get('/', async (ctx, next) => {
    const criteria = { is_deleted: 1 } // 查询条件
    const populate = []
    const fields = { name: 1 } // 待返回的字段
    const options = { sort: [{ name: 1 }] } // 排序

    const model = FictionAllName(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
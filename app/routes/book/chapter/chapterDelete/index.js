import Router from 'koa-router'
import ChapterDelete from './model'

const router = Router()

// 删除章
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件

    // 删除章
    const model = ChapterDelete(criteria)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router
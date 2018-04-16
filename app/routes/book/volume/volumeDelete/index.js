import Router from 'koa-router'
import VolumeDelete from './model'

const router = Router()

// 删除卷
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件

    // 删除卷
    const model = VolumeDelete(criteria)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data2
})

export default router
import Router from 'koa-router'
import VolumeAllName from './model'

const router = Router()

// 获取指定书下所有卷名称
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, book: parameter.id } // 查询条件
    const populate = []
    const fields = { name: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ sequence: 1 }] } // 排序

    const model = VolumeAllName(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
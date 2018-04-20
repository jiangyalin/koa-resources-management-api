import Router from 'koa-router'
import StatisticsInfo from './model'

const router = Router()

// 获取统计详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, $or: [{ [parameter.type]: parameter.id, type: parameter.type }] } // 查询条件
    const populate = [{ path: parameter.type }]
    const fields = { type: 1, down: 1, click: 1, collect: 1, [parameter.type]: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = StatisticsInfo(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
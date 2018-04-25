import Router from 'koa-router'
import StatisticsList from './../../../basis/statistics/statisticsList/model'

const router = Router()

// 获取章列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    // 获取排行
    const page = 1 // 当前页码
    const pageSize = Number(parameter.size) // 每页条数
    const populate = [{ path: 'book' }]
    const criteria = { is_deleted: 1, type: 'book' } // 查询条件
    const fields = { type: 1, down: 1, click: 1, collect: 1, book: 1 } // 待返回的字段
    const options = { sort: [{ [parameter.sort]: -1 }] } // 排序

    const model = StatisticsList(page, pageSize, populate, criteria, fields, options)

    const statisticsList = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = statisticsList

})

export default router
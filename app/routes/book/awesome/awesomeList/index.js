import Router from 'koa-router'
const TimSort = require('timsort')
import AwesomeList from './model'

const router = Router()

// 榜单列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = ['book']
    const criteria = { is_deleted: 1, $or: [{ year: Number(parameter.year) }] } // 查询条件
    const fields = { book: 1, rank: 1, year: 1 } // 待返回的字段
    const options = { sort: [{ rank: 1 }] } // 排序

    ctx.body = await AwesomeList(page, pageSize, populate, criteria, fields, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
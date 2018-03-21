import Router from 'koa-router'
import AccountList from './model'

const router = Router()

// 获取账户列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'user' }]
    const criteria = { is_deleted: 1, $or: [{ account: qs }] } // 查询条件
    const fields = { account: 1, password: 1, user: 1, type: 1 } // 待返回的字段
    const options = { sort: [{ releaseTime: -1 }] } // 排序

    const model = AccountList(page, pageSize, populate, criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
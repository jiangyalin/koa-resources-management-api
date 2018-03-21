import Router from 'koa-router'
import Account from './model'

const router = Router()

// 登录
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const criteria = { is_deleted: 1, $or: [{ account: parameter.username, password: parameter.password }] } // 查询条件
    const populate = [{ path: 'user' }]
    const fields = { account: 1, password: 1, type: 1, user: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = Account(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
import Router from 'koa-router'
import AccountAdd from './model'

const router = Router()

// 添加账户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let account = parameter

    const model = AccountAdd(account)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
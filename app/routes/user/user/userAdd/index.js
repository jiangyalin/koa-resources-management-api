import Router from 'koa-router'
import UserAdd from './model'

const router = Router()

// 添加用户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const user = parameter

    const model = UserAdd(user)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
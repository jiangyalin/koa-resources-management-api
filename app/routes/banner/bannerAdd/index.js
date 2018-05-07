import Router from 'koa-router'
import BannerAdd from './model'

const router = Router()

// 添加banner
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 添加banner
    ctx.body = await BannerAdd(parameter).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
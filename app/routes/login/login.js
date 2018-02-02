import Router from 'koa-router'

const router = Router()

// 登录
router.get('/', async (ctx, next) => {
    const data = {
        code: '200',
        id: "1"
    }
    ctx.body = data
})

export default router
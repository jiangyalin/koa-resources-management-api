import Router from 'koa-router'

const router = Router()

// 登录
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const isUser = parameter.username === 'admin' && parameter.password === '123456'
    let data = {}
    if (isUser) {
        data = {
            code: '200',
            user: {
                id: "1"
            }
        }
    } else {
        data = {
            code: '403',
            user: null
        }
    }
    ctx.body = data
})

export default router
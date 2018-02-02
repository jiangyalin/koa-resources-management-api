import Router from 'koa-router'

const router = Router()

// 登录
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const id = parameter.id
    let data = {}
    if (id === '1') {
        data = {
            code: '200',
            user: {
                id: '1',
                name: '一方通行',
                type: 'operate' // 运营
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
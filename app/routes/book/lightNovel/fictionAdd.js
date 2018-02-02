import Router from 'koa-router'

const router = Router()

// 添加书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    console.log('body', parameter)
    let data = {}
    // if (id === '1') {
        data = {
            code: '200',
            book: []
        }
    // } else {
    //     data = {
    //         code: '403',
    //         book: []
    //     }
    // }
    ctx.body = data
})

export default router
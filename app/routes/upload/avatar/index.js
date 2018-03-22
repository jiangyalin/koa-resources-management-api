import Router from 'koa-router'
import Avatar from './model'

const router = Router()

// 上传
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const path = '/avatar/'
    var base64Data = parameter.avatar.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')

    const model = Avatar(path, dataBuffer)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router


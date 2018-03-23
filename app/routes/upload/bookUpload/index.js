import Router from 'koa-router'
import multiparty from 'multiparty'
import BookUpload from './model'

const router = Router()

// 上传
router.post('/', async (ctx, next) => {
    // 生成multiparty对象，并配置上传目标路径
    const path = '/books/'
    const form = new multiparty.Form({
        maxFieldsSize: 100,
        uploadDir: './app/public' + path
    })
    
    const model = BookUpload(ctx, path, form)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router


import Router from 'koa-router'
import BookVolumeSequenceBookFind from './model'

const router = Router()

// 获取书籍-卷列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const model = BookVolumeSequenceBookFind(parameter.sequence, parameter.book)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
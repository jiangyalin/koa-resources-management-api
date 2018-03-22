import Router from 'koa-router'
import BookVolumeAdd from './model'

const router = Router()

// 添加书籍(卷)
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const bookVolume = {
        sequence: Number(parameter.sequence), // 序列号
        book: parameter.book, // 书
        volume: parameter.volume // 卷
    }

    const model = BookVolumeAdd(bookVolume)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
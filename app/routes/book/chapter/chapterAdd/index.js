import Router from 'koa-router'
import ChapterAdd from './model'
import ChapterDelete from './../chapterDelete/model'

const router = Router()

// 添加章
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 删除章表中同一卷下同一序列号的数据
    const criteria = { is_deleted: 1, sequence: Number(parameter.sequence), volume: parameter.volume }
    const model0 = ChapterDelete(criteria)

    await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 添加章
    const chapter = {
        name: parameter.name, // 章名称
        sequence: parameter.sequence, // 序列号
        file: parameter.file, // 文件
        book: parameter.book, // 书
        volume: parameter.volume // 卷
    }

    const model = ChapterAdd(chapter)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
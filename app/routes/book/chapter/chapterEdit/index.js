import Router from 'koa-router'
import ChapterDelete from './../chapterDelete/model'
import ChapterAdd from './../chapterAdd/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'

const router = Router()

// 编辑章
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 删除章表中同一卷下同一序列号的数据
    const criteria = { is_deleted: 1, sequence: Number(parameter.sequence), volume: parameter.volume }
    const model = ChapterDelete(criteria)

    await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 添加章
    const chapter = {
        sequence: Number(parameter.sequence), // 序列号
        name: parameter.name, // 章
        file: parameter.file, // 文件
        volume: parameter.volume, // 卷
        book: parameter.book // 书
    }

    const model2 = ChapterAdd(chapter)

    const data = await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 更新轻小说时间
    const model3 = FictionEdit({ is_deleted: 1, _id: parameter.book }, { updateTime: Date.now() }, { sort: [{ createTime: -1 }] })

    await model3.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data

})

export default router
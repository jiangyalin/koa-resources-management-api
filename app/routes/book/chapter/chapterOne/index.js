import Router from 'koa-router'
import ChapterAll from './../chapterAll/model'

const router = Router()

// 获取书第一章
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, $or: [{ book: parameter.book }] } // 查询条件
    const populate = [{ path: 'file' }, { path: 'book' }, { path: 'volume' }]
    const fields = { name: 1, book: 1, volume: 1, file: 1,  releaseTime: 1, sequence: 1, cover: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ sequence: -1 }] } // 排序

    const chapterInfo = await ChapterAll(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let one = {
        code: '200',
        data: chapterInfo.data.chapter[0]
    }

    chapterInfo.data.chapter.forEach(data => {
        if (data.volume.sequence < one.data.volume.sequence) {
            one.data = data
        }
    })

    ctx.body = one
})

export default router
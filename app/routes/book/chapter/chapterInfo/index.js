import Router from 'koa-router'
import ChapterInfo from './model'

const router = Router()

// 获取章详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'file' }, { path: 'book' }, { path: 'volume' }]
    const fields = { name: 1, book: 1, volume: 1, file: 1,  releaseTime: 1, sequence: 1, cover: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = ChapterInfo(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
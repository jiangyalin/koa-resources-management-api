import Router from 'koa-router'
import VolumeList from './model'

const router = Router()

// 获取卷列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const book = parameter.book // 书
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'cover' }, { path: 'file' }, { path: 'book', select: 'bookName' }]
    const criteria = { is_deleted: 1, book } // 查询条件
    const fields = { name: 1, sequence: 1, releaseTime: 1, cover: 1, file: 1, book: 1 } // 待返回的字段
    const options = { sort: [{ sequence: -1 }] } // 排序

    const model = VolumeList(page, pageSize, populate, criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
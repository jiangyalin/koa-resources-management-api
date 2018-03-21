import Router from 'koa-router'
import BookVolumeList from './model'

const router = Router()

// 获取书籍-卷列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const id = parameter.id // 当前页码
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'book' }, { path: 'volume' }]
    const criteria = { is_deleted: 1, book: id } // 查询条件
    const fields = { book: 1, volume: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = BookVolumeList(page, pageSize, populate, criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
import Router from 'koa-router'
import FictionList from './model'

const router = Router()

// 获取书籍列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'area', select: 'name' }, { path: 'library', select: 'name' }, { path: 'cover' }]
    const criteria = { is_deleted: 1, $or: [{ bookName: qs }, { author: qs }] } // 查询条件
    const fields = { bookName: 1, area: 1, library: 1, author: 1, illustrator: 1, introduction: 1, cover: 1, file: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FictionList(page, pageSize, populate, criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
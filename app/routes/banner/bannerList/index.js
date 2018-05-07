import Router from 'koa-router'
import BannerList from './model'

const router = Router()

// banner列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'image' }]
    const criteria = { is_deleted: 1 } // 查询条件
    const fields = { name: 1, image: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: 1 }] } // 排序

    ctx.body = await BannerList(page, pageSize, populate, criteria, fields, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
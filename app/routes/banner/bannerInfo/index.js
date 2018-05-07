import Router from 'koa-router'
import BannerInfo from './model'

const router = Router()

// 获取banner详情
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id
    
    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const populate = [{ path: 'image' }]
    const fields = { name: 1, image: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await BannerInfo(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
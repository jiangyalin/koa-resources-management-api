import Router from 'koa-router'
import AwesomeDelete from './model'

const router = Router()

// 删除榜单
router.delete('/:id', async (ctx, next) => {
    const id = ctx.params.id

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const doc = { is_deleted: 0 } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await AwesomeDelete(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
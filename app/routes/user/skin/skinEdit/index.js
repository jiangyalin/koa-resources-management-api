import Router from 'koa-router'
import SkinEdit from './model'

const router = Router()

// 编辑用户
router.post('/:id', async (ctx, next) => {
    const parameter = ctx.request.body
    const id = ctx.params.id

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const doc = parameter // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await SkinEdit(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
import Router from 'koa-router'
import UserDelete from './model'
import SkinDelete from './../../skin/skinDelete/model'

const router = Router()

// 删除用户
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc = { is_deleted: 0 } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const userDelete = await UserDelete(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    const criteria1 = { is_deleted: 1, $or: [{ user: parameter.id }] } // 查询条件
    const doc1 = { is_deleted: 0 } // 修改的字段
    const options1 = { sort: [{ createTime: -1 }] } // 排序

    await SkinDelete(criteria1, doc1, options1).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = userDelete

})

export default router
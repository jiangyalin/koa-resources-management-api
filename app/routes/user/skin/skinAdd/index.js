import Router from 'koa-router'
import SkinAdd from './model'
import UserEdit from './../../user/userEdit/model'

const router = Router()

// 添加皮肤
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const skin = await SkinAdd(parameter).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.user }] } // 查询条件
    const doc = { skin: skin.data.skin._id } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    await UserEdit(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = skin

})

export default router
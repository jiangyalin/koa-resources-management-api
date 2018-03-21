import Router from 'koa-router'
import UserInfo from './model'

const router = Router()

// 获取用户详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'avatar' }]
    const fields = { name: 1, nickname: 1, gender: 1, phone: 1, eMail: 1, birthDate: 1, avatar: 1, type: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = UserInfo(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
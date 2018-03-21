import Router from 'koa-router'
import UserList from './model'

const router = Router()

// 获取用户列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'avatar' }]
    const criteria = { is_deleted: 1, $or: [{ name: qs }] } // 查询条件
    const fields = { name: 1, nickname: 1, gender: -1, phone: 1, eMail: 1, birthDate: 1, avatar: 1 } // 待返回的字段
    const options = { sort: [{ releaseTime: -1 }] } // 排序

    const model = UserList(page, pageSize, populate, criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
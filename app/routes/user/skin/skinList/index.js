import Router from 'koa-router'
import SkinList from './model'

const router = Router()

// 获取皮肤列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'user' }, { path: 'type_a_backgroundImage' }, { path: 'backgroundImage' }]
    const criteria = { is_deleted: 1 } // 查询条件
    const fields = { user: 1, type_a_backgroundColor: 1, type_a_boxShadow: 1, type_a_backgroundImage: 1, type_a_backgroundSize: 1, backgroundImage: 1,  type_b_opacity: 1, type_b_backgroundColor: 1, type_b_fontColor: 1 } // 待返回的字段
    const options = { sort: [{ releaseTime: -1 }] } // 排序

    ctx.body = await SkinList(page, pageSize, populate, criteria, fields, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
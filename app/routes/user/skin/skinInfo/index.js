import Router from 'koa-router'
import SkinInfo from './model'

const router = Router()

// 获取皮肤详情
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id

    const criteria = { is_deleted: 1, $or: [{ user: id }] } // 查询条件
    const populate = []
    const fields = { user: 1, type_a_backgroundColor: 1, type_a_boxShadow: 1, type_a_backgroundImage: 1, type_a_backgroundSize: 1, backgroundImage: 1,  type_b_opacity: 1, type_b_backgroundColor: 1, type_b_fontColor: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await SkinInfo(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
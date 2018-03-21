import Router from 'koa-router'
import LibraryAll from './model'

const router = Router()

// 获取文库列表
router.get('/', async (ctx, next) => {
    const criteria = { is_deleted: 1 } // 查询条件
    const fields = { name: 1 } // 待返回的字段
    const options = { sort: [{ name: -1 }] } // 排序

    const model = LibraryAll(criteria, fields, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
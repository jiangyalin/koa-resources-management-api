import Router from 'koa-router'
import FileDelete from './model'

const router = Router()

// 删除文件
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件

    const model = FileDelete(criteria)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
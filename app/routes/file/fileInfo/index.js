import Router from 'koa-router'
import FileInfo from './model'

const router = Router()

// 获取书籍详情
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const populate = []
    const fields = { name: 1, type: 1, suffixName: 1, path: 1, size: 1, content: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FileInfo(criteria, fields, options, populate)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
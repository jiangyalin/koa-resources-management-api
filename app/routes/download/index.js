import Router from 'koa-router'
import send from 'koa-send'
import FileInfo from './../file/fileInfo/model'

const router = Router()

// 文件下载
router.get('/download/:id', async (ctx) => {
    const id = ctx.params.id

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const populate = []
    const fields = { name: 1, path: 1, size: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FileInfo(criteria, fields, options, populate)

    const file = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    const path = 'app/public' + file.data.path + file.data.name
    ctx.attachment(path)
    await send(ctx, path)
})

export default router


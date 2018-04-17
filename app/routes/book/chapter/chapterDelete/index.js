import Router from 'koa-router'
import ChapterDelete from './model'
import ChapterInfo from './../chapterInfo/model'
import FileDelete from './../../../file/fileDelete/model'

const router = Router()

// 删除章
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    // 找到章关联的文件id
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'file' }]
    const fields = { file: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = ChapterInfo(criteria, fields, options, populate)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除文件
    const criteria0 = { is_deleted: 1, _id: data.data.file._id } // 查询条件

    const model0 = FileDelete(criteria0)

    await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    const criteria1 = { is_deleted: 1, _id: parameter.id } // 查询条件

    // 删除章
    const model1 = ChapterDelete(criteria1)

    ctx.body = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
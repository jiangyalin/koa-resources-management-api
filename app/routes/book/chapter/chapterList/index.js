import Router from 'koa-router'
const TimSort = require('timsort')
import ChapterList from './model'

const router = Router()

// 获取章列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const volume = parameter.volume // 卷
    const book = parameter.book // 书
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const populate = [{ path: 'file', select: ['name', 'path', 'size'] }, { path: 'volume', select: ['name', 'sequence'] }, { path: 'book', select: 'name' }]
    let criteria = {} // 查询条件
    if (volume) {
        criteria = { is_deleted: 1, volume }
    } else if (book) {
        criteria = { is_deleted: 1, book }
    } else {
        criteria = { is_deleted: 1 }
    }
    const fields = { name: 1, sequence: 1, releaseTime: 1, cover: 1, file: 1, book: 1, volume: 1 } // 待返回的字段
    const options = { sort: [{ sequence: -1 }] } // 排序

    const model = ChapterList(page, pageSize, populate, criteria, fields, options)

    const chapter = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let arr = chapter.data.content

    TimSort.sort(arr, (a, b) =>  a.volume.sequence - b.volume.sequence)
    TimSort.sort(arr, (a, b) =>  a.sequence - b.sequence)

    chapter.data.content = arr

    ctx.body = chapter

})

export default router
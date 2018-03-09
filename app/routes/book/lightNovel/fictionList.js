import Router from 'koa-router'
import Book from './../../../models/book'
import PageList from './../../../models/pageList'

const router = Router()

// 获取书籍列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const Model = Book // 模板
    const populate = [{ path: 'cover' }, { path: 'bookFile' }]
    const criteria = { is_deleted: 1, $or: [{ bookName: qs }, { author: qs }] } // 查询条件
    const fields = { bookName: 2, area: 1, releaseTime: -1, author: 1, illustrator: 1, cover: 1, bookFile: 1, introduction: 1 } // 待返回的字段
    const options = { sort: [{ releaseTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options, (err, $page) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        content: []
                    }
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        totalElements: $page.count,
                        content: $page.results
                    }
                })
            }
        })
    })

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router
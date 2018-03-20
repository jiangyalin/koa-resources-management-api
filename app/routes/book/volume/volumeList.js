import Router from 'koa-router'
import Volume from './../../../models/book/volume'
import PageList from './../../../models/pageList'

const router = Router()

// 获取卷列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const book = parameter.book // 书
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const Model = Volume // 模板
    const populate = [{ path: 'cover' }, { path: 'file' }, { path: 'book', select: 'bookName' }]
    const criteria = { is_deleted: 1, book } // 查询条件
    const fields = { name: 1, sequence: 1, releaseTime: 1, cover: 1, file: 1, book: 1 } // 待返回的字段
    const options = { sort: [{ sequence: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options, (err, $page) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        content: []
                    },
                    message: err.message
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
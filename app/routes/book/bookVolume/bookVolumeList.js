import Router from 'koa-router'
import BookVolume from './../../../models/book/book_volume'
import PageList from './../../../models/pageList'

const router = Router()

// 获取书籍-卷列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const Model = BookVolume // 模板
    const populate = [{ path: 'book' }, { path: 'volume' }]
    const criteria = { is_deleted: 1 } // 查询条件
    const fields = { book: 1, volume: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

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
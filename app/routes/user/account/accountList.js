import Router from 'koa-router'
import Account from './../../../models/account'
import PageList from './../../../models/pageList'

const router = Router()

// 获取账户列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const page = Number(parameter.pageNum) + 1 // 当前页码
    const pageSize = Number(parameter.pageSize) // 每页条数
    const qs = new RegExp('') // 标题正则参数
    const Model = Account // 模板
    const populate = [{ path: 'user' }]
    const criteria = { is_deleted: 1, $or: [{ account: qs }] } // 查询条件
    const fields = { account: 1, password: 1, user: 1, type: 1 } // 待返回的字段
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
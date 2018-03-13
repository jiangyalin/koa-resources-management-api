import Router from 'koa-router'
import App from './../../../models/yao-xiao/app'

const router = Router()

// 获取app详情
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate = [{ path: 'img' }]
    const fields = { name: 1, type: 1, content: 1, img: 1 } // 待返回的字段
    const options = { sort: [{ bookName: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        App.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {}
                })
            } else if (result !== null) {
                resolve({
                    code: '200',
                    data: {
                        ...result._doc
                    }
                })
            } else {
                reject({
                    code: '401',
                    data: {}
                })
            }
        }).populate(populate)
    })

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router
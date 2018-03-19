import Router from 'koa-router'
import Volume from './../../../models/book/volume'


const router = Router()

// 编辑卷
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let volume = {
        name: parameter.name, // 卷名称
        releaseTime: parameter.releaseTime, // 发售时间
        cover: parameter.cover, // 封面
        file: parameter.file // 文件
    }

    const criteria = { is_deleted: 1, $or: [{ sequence: parameter.sequence }] } // 查询条件
    const doc = volume // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Volume.update(criteria, doc, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        ...result._doc
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
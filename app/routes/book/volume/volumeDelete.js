import Router from 'koa-router'
import Volume from './../../../models/book/volume'
import BookVolume from './../../../models/book/book_volume'

const router = Router()

// 删除卷
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件
    const doc = { is_deleted: 0 } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序
    
    // 删除卷
    const model = new Promise((resolve, reject) => {
        Volume.update(criteria, doc, options, async (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            }

            const criteria = { is_deleted: 1, volume: parameter.id } // 查询条件
            const doc = { is_deleted: 0 } // 修改的字段
            const options = { sort: [{ createTime: -1 }] } // 排序

            // 删除书-卷关系
            const model2 = new Promise((resolve, reject) => {
                BookVolume.update(criteria, doc, options, async (err, result) => {
                    if (err) {
                        reject({
                            code: '500',
                            data: {},
                            message: err.message
                        })
                    }

                    resolve({
                        code: '200',
                        data: {
                            ...result._doc
                        }
                    })
                })
            })

            const data2 = await model2.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
            
            resolve(data2)
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
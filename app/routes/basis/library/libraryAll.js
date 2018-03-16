import Router from 'koa-router'
import Library from './../../../models/library'

const router = Router()

// 获取文库列表
router.get('/', async (ctx, next) => {
    const Model = Library // 模板
    const criteria = { is_deleted: 1 } // 查询条件
    let fields = { name: 1 } // 待返回的字段
    const options = { sort: [{ name: -1 }] } // 排序
    const model = new Promise((resolve, reject) => {
        Model.find(criteria, fields, options, (error, result) => {
            if (error) {
                reject({
                    code: '500',
                    data: {
                        library: []
                    }
                })
            } else {
                let library = [];
                result.forEach((value, index) => {
                    let node = {
                        id: result[index]._id,
                        name: result[index].name
                    }
                    library.push(node)
                })
                resolve({
                    code: '200',
                    data: {
                        library: library
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
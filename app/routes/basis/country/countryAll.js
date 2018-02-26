import Router from 'koa-router'
import Book from './../../../models/country'

const router = Router()

// 获取书籍列表
router.get('/', async (ctx, next) => {
    const Model = Book // 模板
    const criteria = { is_deleted: 1 } // 查询条件
    let fields = { name: 2 } // 待返回的字段
    const options = {sort: [{ name: -1 }]} // 排序
    const model = new Promise((resolve, reject) => {
        Model.find(criteria, fields, options, (error, result) => {
            if (error) {
                reject({
                    code: '500',
                    data: {
                        content: []
                    }
                })
            } else {
                let country = [];
                result.forEach((value, index) => {
                    let node = {
                        id: result[index]._id,
                        name: result[index].name
                    }
                    country.push(node)
                })
                resolve({
                    code: '200',
                    data: {
                        content: country
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
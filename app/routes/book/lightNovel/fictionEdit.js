import Router from 'koa-router'
import Book from './../../../models/book'

const router = Router()

// 添加书籍
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let book = {
        bookName: parameter.bookName, // 书籍名称
        area: parameter.area, // 地区
        releaseTime: parameter.releaseTime, // 发售时间
        author: parameter.author, // 作者
        illustrator: parameter.illustrator, // 插画师
        file: parameter.fileId // 文件id
    }

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc = book // 修改的字段
    const options = { sort: [{ bookName: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Book.update(criteria, doc, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {}
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
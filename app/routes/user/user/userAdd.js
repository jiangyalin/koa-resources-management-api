import Router from 'koa-router'
import User from './../../../models/user'

const router = Router()

// 添加用户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let user = parameter
    
    const model = new Promise((resolve, reject) => {
        User.create(user, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        user: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    user: result
                }
            })

        })
    })

    const date = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = date
})

export default router
import Router from 'koa-router'
import Account from './../../../models/account'

const router = Router()

// 添加账户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let account = parameter

    const model = new Promise((resolve, reject) => {
        Account.create(account, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        account: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    account: result
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
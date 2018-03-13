import Router from 'koa-router'
import App from './../../../models/yao-xiao/app'

const router = Router()

// 添加app
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let app = parameter
    const model = new Promise((resolve, reject) => {
        App.create(app, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        app: []
                    },
                    tips: err
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        app: []
                    }
                })
            }
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
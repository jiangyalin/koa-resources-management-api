import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import config from './../../config'
import Account from './../../models/account'
import Request from 'request'

const router = Router()

// 登录
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const criteria = { is_deleted: 1, $or: [{ account: parameter.username, password: parameter.password }] } // 查询条件
    const populate = [{ path: 'user' }]
    const fields = { account: 1, password: 1, type: 1, user: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        Account.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            } else if (result !== null) {
                // const url = config.server + '/api/user/userInfo'
                // const qs = { id: result.user }
                // Request.get({ url, qs }, (err, result, body) => {
                //     console.log('body', body)
                // })
                const token = jwt.sign({ id: result._id }, config.tokenKey, { expiresIn:  60 })
                resolve({
                    code: '200',
                    data: {
                        ...result._doc,
                        token
                    }
                })
            } else {
                reject({
                    code: '401',
                    data: {},
                    message: '用户名或密码错误'
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
    // const parameter = ctx.request.body
    // const isUser = parameter.username === 'admin' && parameter.password === '123456'
    // let data = {}
    // if (isUser) {
    //     data = {
    //         code: '200',
    //         user: {
    //             id: "1"
    //         }
    //     }
    // } else {
    //     data = {
    //         code: '403',
    //         user: null
    //     }
    // }
    // ctx.body = data
})

export default router
import Router from 'koa-router'
import UserAdd from './../../user/userAdd/model'
import AccountAdd from './model'

const router = Router()

// 添加账户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const user = {
        name: '', // 姓名
        nickname: parameter.account, // 昵称
        phone: '', // 手机
        eMail: '' // 电子邮箱
    }

    // 添加用户
    const model = UserAdd(user)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 添加账户
    let data2 = {
        code: '500',
        data: {}
    }
    if (data.code === '200') {
        const account = {
            account: parameter.account, // 账号名
            password: parameter.password, // 密码
            user: data.data.user._id // 用户
        }
        const model2 = AccountAdd(account)

        data2 = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    ctx.body = data2

})

export default router
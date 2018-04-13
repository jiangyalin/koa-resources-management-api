import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import config from './../../../config'
import UserInfo from './../../user/user/UserInfo/model'
import UserAdd from './../../user/user/userAdd/model'

const router = Router()

// 激活账号
router.get('/:token', async (ctx, next) => {
    const parameter = ctx.request.query
    const token = ctx.params.token

    const eMail = jwt.verify(token, config.tokenKey).eMail
    const password = jwt.verify(token, config.tokenKey).password

    const criteria = { is_deleted: 1, is_active: 1, $or: [{ eMail }] } // 查询条件
    const populate = []
    const fields = { name: 1, nickname: 1, gender: 1, phone: 1, eMail: 1, birthDate: 1, avatar: 1, type: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model0 = UserInfo(criteria, fields, options, populate)

    let data = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 查询此邮箱是否已经注册
    if (data.code === '200') {
        data = {
            code: '4000',
            message: '此邮箱已经注册'
        }
    } else {
        const user = {
            name: '', // 姓名
            nickname: eMail, // 昵称
            password, // 密码
            eMail, // 电子邮箱
            is_active: 1 // 激活状态
        }

        const model = UserAdd(user)

        data = await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    ctx.body = data

})

export default router
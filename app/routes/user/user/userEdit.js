import Router from 'koa-router'
import User from './../../../models/user'

const router = Router()

// 编辑用户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    let user = {
        name: parameter.name, // 姓名
        nickname: parameter.nickname, // 昵称
        gender: parameter.gender, // 性别 0 保密，1 男， 2女
        phone: parameter.phone, // 手机
        eMail: parameter.eMail, // 电子邮箱
        birthDate: parameter.birthDate, // 出生日期
        avatar: parameter.avatar // 头像
    }

    const criteria = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc = user // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = new Promise((resolve, reject) => {
        User.update(criteria, doc, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {},
                    message: err.message
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
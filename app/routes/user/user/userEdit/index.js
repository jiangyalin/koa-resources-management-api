import Router from 'koa-router'
import UserInfo from './../userInfo/model'
import AccountDelete from './../../account/AccountDelete/model'
import AccountAdd from './../../account/accountAdd/model'
import UserEdit from './model'

const router = Router()

// 编辑用户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const criteria0 = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate0 = [{ path: 'avatar' }]
    const fields0 = { name: 1, nickname: 1, gender: 1, phone: 1, eMail: 1, birthDate: 1, avatar: 1, type: 1 } // 待返回的字段
    const options0 = { sort: [{ createTime: -1 }] } // 排序

    const model0 = UserInfo(criteria0, fields0, options0, populate0)

    const data0 = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 对比邮箱是否有改动如有就删除之前的邮箱账号并创建新的
    if (parameter.eMail !== data0.data.eMail) {
        const criteria = { is_deleted: 1, $or: [{ account: data0.data.eMail }] } // 查询条件
        const doc = { is_deleted: 0 } // 修改的字段
        const options = { sort: [{ createTime: -1 }] } // 排序

        const model = AccountDelete(criteria, doc, options)

        await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        const account = {
            account: parameter.eMail, // 账号名
            password: parameter.password, // 密码
            user: parameter.id // 用户
        }

        const model1 = AccountAdd(account)

        await model1.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    const user = {
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

    const model = UserEdit(criteria, doc, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
})

export default router
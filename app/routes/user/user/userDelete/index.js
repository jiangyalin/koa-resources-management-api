import Router from 'koa-router'
import UserDelete from './model'
import UserInfo from './../userInfo/model'
import FileDelete from './../../../file/fileDelete/model'
import SkinDelete from './../../skin/skinDelete/model'

const router = Router()

// 删除用户
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    // 查询用户
    const criteria0 = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate0 = []
    const fields0 = { name: 1, nickname: 1, gender: 1, phone: 1, eMail: 1, birthDate: 1, avatar: 1, type: 1, skin: 1 } // 待返回的字段
    const options0 = { sort: [{ createTime: -1 }] } // 排序

    const userInfo = await UserInfo(criteria0, fields0, options0, populate0).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除用户
    const criteria1 = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const doc1 = { is_deleted: 0 } // 修改的字段
    const options1 = { sort: [{ createTime: -1 }] } // 排序

    const userDelete = await UserDelete(criteria1, doc1, options1).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除关联的头像
    const criteria2 = { is_deleted: 1, $or: [{ _id: userInfo.data.avatar }] } // 查询条件

    await FileDelete(criteria2).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除关联的皮肤
    const criteria3 = { is_deleted: 1, $or: [{ user: parameter.id }] } // 查询条件
    const doc3 = { is_deleted: 0 } // 修改的字段
    const options3 = { sort: [{ createTime: -1 }] } // 排序

    await SkinDelete(criteria3, doc3, options3).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = userDelete

})

export default router
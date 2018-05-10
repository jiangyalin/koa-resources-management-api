import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import config from './../../../config'
import UserInfo from './../../user/user/UserInfo/model'
import UserAdd from './../../user/user/userAdd/model'
import SkinAdd from './../../user/skin/skinAdd/model'
import UserEdit from './../../user/user/userEdit/model'

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

    let data = await UserInfo(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let html = '<h1>注册失败</h1>'

    // 查询此邮箱是否已经注册
    if (data.code === '200') {
        data = {
            code: '4000',
            message: '此邮箱已经注册'
        }
        html = '<h1>此邮箱已经注册</h1>'
    } else {
        const user = {
            name: '', // 姓名
            nickname: eMail, // 昵称
            password, // 密码
            eMail, // 电子邮箱
            is_active: 1 // 激活状态
        }

        data = await UserAdd(user).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        const skin = {
            user: data.data.user._id, // 用户
            type_a_backgroundColor: [0, 0, 0, 0], // 类型a盒子背景颜色raba
            type_a_boxShadow: [0, 1, 0, 2, [0, 0, 0, 0.1]], // 类型a盒子阴影 左位移，上位移，扩展，大小，rgba
            // type_a_backgroundImage: '', // 类型a盒子背景图片
            type_a_backgroundSize: 1920, // 类型a盒子背景图片大小
            // backgroundImage: '', // 网页背景图片
            type_b_opacity: 0, // 类型b盒子背景透明度
            type_b_backgroundColor: [0, 0, 0, 0], // 类型b盒子背景颜色raba
            type_b_fontColor: [0, 0, 0, 0] // 类型b盒子字体颜色rgba
        }

        const skinAdd = await SkinAdd(skin).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        const criteria1 = { is_deleted: 1, $or: [{ _id: data.data.user._id }] } // 查询条件
        const doc1 = { skin: skinAdd.data.skin._id } // 修改的字段
        const options1 = { sort: [{ createTime: -1 }] } // 排序

        await UserEdit(criteria1, doc1, options1).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        html = '<h1>注册成功</h1>'
    }

    ctx.body = html

})

export default router
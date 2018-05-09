import Router from 'koa-router'
import UserAdd from './model'
import UserEdit from './../userEdit/model'
import SkinAdd from './../../skin/skinAdd/model'

const router = Router()

// 添加用户
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const userAdd = await UserAdd(parameter).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    const skin = {
        user: userAdd.data.user._id, // 用户
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

    const criteria = { is_deleted: 1, $or: [{ _id: userAdd.data.user._id }] } // 查询条件
    const doc = { skin: skinAdd.data.skin._id } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    await UserEdit(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = userAdd
    
})

export default router
import Router from 'koa-router'
import BannerEdit from './model'
import BannerInfo from './../bannerInfo/model'
import FileDelete from './../../file/fileDelete/model'

const router = Router()

// 编辑用户banner
router.post('/:id', async (ctx, next) => {
    const parameter = ctx.request.body
    const id = ctx.params.id

    // 查询关联的图片
    const criteria0 = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const populate0 = []
    const fields0 = { image: 1 } // 待返回的字段
    const options0 = { sort: [{ sequence: 1 }] } // 排序

    const data = await BannerInfo(criteria0, fields0, options0, populate0).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    if (data.data.image !== parameter.image) {
        const criteria = { is_deleted: 1, $or: [{ _id: data.data.image }] } // 查询条件

        await FileDelete(criteria).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    const banner = {
        name: parameter.name,
        image: parameter.image
    }

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const doc = banner // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await BannerEdit(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
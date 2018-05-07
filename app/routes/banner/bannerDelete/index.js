import Router from 'koa-router'
import BannerDelete from './model'
import BannerInfo from './../bannerInfo/model'
import FileDelete from './../../file/fileDelete/model'

const router = Router()

// 删除banner
router.delete('/:id', async (ctx, next) => {
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

    // 删除文件
    if (data.data.image) {
        const criteria = { is_deleted: 1, $or: [{ _id: data.data.image }] } // 查询条件

        await FileDelete(criteria).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    const criteria = { is_deleted: 1, $or: [{ _id: id }] } // 查询条件
    const doc = { is_deleted: 0 } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    ctx.body = await BannerDelete(criteria, doc, options).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
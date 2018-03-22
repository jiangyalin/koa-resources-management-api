import Router from 'koa-router'
import VolumeDelete from './model'
import BookVolumeDelete from './../../bookVolume/bookVolumeDelete/model'

const router = Router()

// 删除卷
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件

    // 删除卷
    const model = VolumeDelete(criteria)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除书-卷关系
    let data2 = {
        code: '500',
        data: {}
    }
    const criteria2 = { is_deleted: 1, volume: parameter.id }
    if (data.code === '200') {
        const model2 = BookVolumeDelete(criteria2)

        data2 = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    ctx.body = data2
})

export default router
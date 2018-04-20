import Router from 'koa-router'
import VolumeInfo from './../../../book/volume/volumeInfo/model'
import FictionInfo from './../../../book/lightNovel/fictionInfo/model'
import StatisticsInfo from './../../../basis/statistics/statisticsInfo/model'
import StatisticsEdit from './../../../basis/statistics/statisticsEdit/model'

const router = Router()

// 统计下载
router.get('/:id/', async (ctx, next) => {
    const id = ctx.params.id

    // 查询下载纪录
    const criteria0 = { is_deleted: 1, $or: [{ object: id }] } // 查询条件
    const populate0 = []
    const fields0 = { down: 1 } // 待返回的字段
    const options0 = { sort: [{ createTime: -1 }] } // 排序

    const model0 = StatisticsInfo(criteria0, fields0, options0, populate0)

    const statisticsInfo = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 编辑统计下载
    const criteria1 = { is_deleted: 1, object: id } // 查询条件
    const options1 = { sort: [{ createTime: -1 }] } // 排序

    const model1 = StatisticsEdit(criteria1, { down: statisticsInfo.data.down + 1 }, options1)

    ctx.body = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
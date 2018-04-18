import Router from 'koa-router'
import VolumeDelete from './model'
import VolumeInfo from './../../volume/volumeInfo/model'
import ChapterAll from './../../chapter/chapterAll/model'
import ChapterDelete from './../../chapter/chapterDelete/model'
import FileDelete from './../../../file/fileDelete/model'
import StatisticsDelete from './../../../basis/statistics/statisticsDelete/model'

const router = Router()

// 删除卷
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    // 查询卷关联的章文件（取得章关联的文件及卷关联的文件）
    const criteria0 = { is_deleted: 1, $or: [{ volume: parameter.id }] } // 查询条件
    const populate0 = [{ path: 'volume' }]
    const fields0 = { file: 1, volume: 1 } // 待返回的字段
    const options0 = { sort: [{ sequence: 1 }] } // 排序

    const model0 = ChapterAll(criteria0, fields0, options0, populate0)

    const data = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let fileList = []

    if (data.data.chapter && data.data.chapter.length !== 0) {
        fileList.push(data.data.chapter[0].volume.file)
        fileList.push(data.data.chapter[0].volume.cover)
        data.data.chapter.forEach((data) => {
            fileList.push(data.file)
        })
    }

    // 删除文件
    fileList.forEach(async (data) => {
        const criteria = { is_deleted: 1, $or: [{ _id: data }] } // 查询条件

        const model = FileDelete(criteria)

        await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    })

    // 删除章
    if (data.data.chapter) {
        data.data.chapter.forEach(async (data) => {
            const criteria1 = { is_deleted: 1, _id: data._id } // 查询条件

            const model1 = ChapterDelete(criteria1)

            await model1.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        })
    }

    // 查询此卷的关联统计
    const criteria1 = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate1 = []
    const fields1 = { statistics: 1 } // 待返回的字段
    const options1 = { sort: [{ createTime: -1 }] } // 排序

    const model1 = VolumeInfo(criteria1, fields1, options1, populate1)

    const volumeInfo = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除统计
    const criteria3 = { is_deleted: 1, _id: volumeInfo.data.statistics } // 查询条件

    const model3 = StatisticsDelete(criteria3)

    await model3.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除卷
    const criteria2 = { is_deleted: 1, _id: parameter.id } // 查询条件

    const model2 = VolumeDelete(criteria2)

    ctx.body = await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
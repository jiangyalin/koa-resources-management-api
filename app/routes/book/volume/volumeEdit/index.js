import Router from 'koa-router'
import VolumeInfo from './../volumeInfo/model'
import VolumeEdit from './../volumeEdit/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'
import FileDelete from './../../../file/fileDelete/model'
import StatisticsAdd from './../../../basis/statistics/statisticsAdd/model'

const router = Router()

// 编辑卷
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 查询废弃的封面id
    const model0 = VolumeInfo({ is_deleted: 1, sequence: parameter.sequence, book: parameter.book }, { file: 1, cover: 1 }, { sort: [{ createTime: -1 }] }, [])

    const volumeInfo = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 如果封面有更改
    if (volumeInfo.data.cover !== parameter.cover) {
        // 删除文件
        const file = FileDelete({ is_deleted: 1, _id: volumeInfo.data.cover })

        await file.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    // 编辑卷
    const criteria = { is_deleted: 1, _id: volumeInfo.data._id } // 查询条件
    const doc = {
        name: parameter.name, // 卷名称
        releaseTime: parameter.releaseTime, // 发售时间
        cover: parameter.cover // 封面
    }
    const options = { sort: [{ createTime: -1 }] } // 排序
    const model = VolumeEdit(criteria, doc, options)

    const volumeEdit = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 更新轻小说时间
    const model2 = FictionEdit({ is_deleted: 1, _id: parameter.book }, { updateTime: Date.now() }, { sort: [{ createTime: -1 }] })

    await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = volumeEdit

})

export default router
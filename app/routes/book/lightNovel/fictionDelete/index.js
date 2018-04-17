import Router from 'koa-router'
import ChapterAll from './../../chapter/chapterAll/model'
import ChapterDelete from './../../chapter/chapterDelete/model'
import VolumeAll from './../../volume/volumeAll/model'
import VolumeDelete from './../../volume/volumeDelete/model'
import FileDelete from './../../../file/fileDelete/model'
import FictionInfo from './../fictionInfo/model'
import FictionDelete from './model'

const router = Router()

// 删除书籍
router.delete('/', async (ctx, next) => {
    const parameter = ctx.query

    // 找到书下所有卷
    const criteria0 = { is_deleted: 1, book: parameter.id } // 查询条件
    const populate0 = []
    const fields0 = { file: 1, cover: 1 } // 待返回的字段
    const options0 = { sort: [{ sequence: 1 }] } // 排序

    const model0 = VolumeAll(criteria0, fields0, options0, populate0)

    const data0 = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除书下所有卷
    data0.data.volume.forEach(async (data) => {
        const criteria2 = { is_deleted: 1, _id: data._id } // 查询条件

        const model2 = VolumeDelete(criteria2)

        ctx.body = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    })

    let fileList = []

    data0.data.volume.forEach((data) => {
        fileList.push(data.file)
        fileList.push(data.cover)
    })

    // 找到书下所有章
    const criteria1 = { is_deleted: 1, $or: [{ book: parameter.id }] } // 查询条件
    const populate1 = []
    const fields1 = { file: 1 } // 待返回的字段
    const options1 = { sort: [{ sequence: 1 }] } // 排序

    const model1 = ChapterAll(criteria1, fields1, options1, populate1)

    const data1 = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除所有章
    data1.data.chapter.forEach(async (data) => {
        const criteria1 = { is_deleted: 1, _id: data._id } // 查询条件

        const model1 = ChapterDelete(criteria1)

        await model1.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    })

    data1.data.chapter.forEach((data) => {
        fileList.push(data.file)
    })

    // 找到书关联的文件
    const criteria2 = { is_deleted: 1, $or: [{ _id: parameter.id }] } // 查询条件
    const populate2 = []
    const fields2 = { file: 1, cover: 1 } // 待返回的字段
    const options2 = { sort: [{ createTime: -1 }] } // 排序

    const model2 = FictionInfo(criteria2, fields2, options2, populate2)

    const data2 = await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    fileList.push(data2.data.file)
    fileList.push(data2.data.cover)

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

    // 删除书籍
    const criteria = { is_deleted: 1, _id: parameter.id } // 查询条件
    const doc = { is_deleted: 0 } // 修改的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = FictionDelete(criteria, doc, options)

    ctx.body = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

})

export default router
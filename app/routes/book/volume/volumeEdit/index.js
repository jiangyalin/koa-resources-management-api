import Router from 'koa-router'
import VolumeAdd from './../volumeAdd/model'
import VolumeInfo from './../volumeInfo/model'
import VolumeRemove from './../volumeRemove/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'
import FileDelete from './../../../file/fileDelete/model'
import BookVolumeRemove from './../../bookVolume/bookVolumeRemove/model'

const router = Router()

// 编辑卷
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 查询废弃的文件与封面id
    const model0 = VolumeInfo({ is_deleted: 1, sequence: parameter.sequence, book: parameter.book }, { file: 1, cover: 1 }, { sort: [{ createTime: -1 }] }, [])

    const volumeInfo = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 如果文件有更改
    if (volumeInfo.data.file !== parameter.file) {
        // 删除文件
        const file = FileDelete({ is_deleted: 1, _id: volumeInfo.data.file })

        await file.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

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

    // 删除卷表中同一书下同一序列号的数据（真删）
    const criteria = { is_deleted: 1, sequence: parameter.sequence, book: parameter.book }
    const model = VolumeRemove(criteria)

    const data = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除卷表-书关系表中同一书下同一序列号的数据（真删）
    let data2 = {}
    const criteria2 = { is_deleted: 1, sequence: parameter.sequence, book: parameter.book }
    if (data.code === '200') {
        const model2 = BookVolumeRemove(criteria2)

        data2 = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    // 添加卷
    let data3 = {
        code: '500',
        data: {}
    }
    const volume = {
        sequence: Number(parameter.sequence), // 序列号
        name: parameter.name, // 卷名称
        releaseTime: parameter.releaseTime, // 发售时间
        cover: parameter.cover, // 封面
        file: parameter.file, // 文件
        book: parameter.book // 书
    }
    if (data2.code === '200') {
        const model3 = VolumeAdd(volume)

        data3 = await model3.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    // 更新轻小说时间
    const model2 = FictionEdit({ is_deleted: 1, _id: parameter.book }, { updateTime: Date.now() }, { sort: [{ createTime: -1 }] })

    await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data3

})

export default router
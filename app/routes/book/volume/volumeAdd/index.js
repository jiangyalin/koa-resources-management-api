import Router from 'koa-router'
import BookVolumeSequenceBookFind from './../../bookVolume/bookVolumeSequenceBookFind/model'
import BookVolumeAdd from './../../bookVolume/bookVolumeAdd/model'
import VolumeAdd from './model'
import VolumeEdit from './../volumeEdit/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'
import FileDelete from './../../../file/fileDelete/model'

const router = Router()

// 添加书籍(卷)
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    const volume = {
        sequence: Number(parameter.sequence), // 序列号
        name: parameter.name, // 卷名称
        releaseTime: parameter.releaseTime, // 发售时间
        cover: parameter.cover, // 封面
        file: parameter.file, // 文件
        book: parameter.book // 书
    }

    // 验证此书下是否存在相同的序列号
    const model = BookVolumeSequenceBookFind(parameter.sequence, parameter.book)

    const data1 = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let data2 = {}
    // 不存在则添加此卷并且添加关联关系
    if (data1.data.bookVolume.length === 0) {
        const model = VolumeAdd(volume)

        data2 = await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        // 添加关联关系
        const bookVolume = {
            sequence: Number(parameter.sequence), // 序列号
            book: parameter.book, // 书
            volume: data2.data._id // 卷
        }

        const model2 = BookVolumeAdd(bookVolume)

        data2 = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }
    // 存在则更改卷相同此书下形同序列号的卷信息
    if (data1.data.bookVolume.length > 0) {
        const criteria = { is_deleted: 1, _id: data1.data.bookVolume[0].volume } // 查询条件
        const doc = volume
        const options = { sort: [{ createTime: -1 }] } // 排序
        const model = VolumeEdit(criteria, doc, options)

        data2 = await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        if (data1.data.bookVolume[0].volume.file !== parameter.file) {
            // 删除文件
            const file = FileDelete({ is_deleted: 1, _id: data1.data.bookVolume[0].volume.file })

            await file.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        }

        if (data1.data.bookVolume[0].volume.cover !== parameter.cover) {
            // 删除文件
            const file = FileDelete({ is_deleted: 1, _id: data1.data.bookVolume[0].volume.cover })

            await file.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        }
    }

    // 更新轻小说时间
    const criteria = { is_deleted: 1, _id: parameter.book } // 查询条件
    const options = { sort: [{ createTime: -1 }] } // 排序
    const model2 = FictionEdit(criteria, { updateTime: Date.now() }, options)

    await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data2

})

export default router
import Router from 'koa-router'
import VolumeAdd from './model'
import VolumeEdit from './../volumeEdit/model'
import VolumeInfo from './../../volume/volumeInfo/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'
import FileDelete from './../../../file/fileDelete/model'
import StatisticsAdd from './../../../basis/statistics/statisticsAdd/model'

const router = Router()

// 添加书籍(卷)
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body
    
    // 验证此书下是否存在相同的序列号
    const criteria1 = { is_deleted: 1, $or: [{ book: parameter.book, sequence: parameter.sequence }] } // 查询条件
    const populate1 = []
    const fields1 = { statistics: 1, cover: 1 } // 待返回的字段
    const options1 = { sort: [{ createTime: -1 }] } // 排序
    
    const model1 = VolumeInfo(criteria1, fields1, options1, populate1)

    const data1 = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let data2 = {
        code: '501',
        message: '网络错误'
    }
    // 不存在则添加此卷
    if (data1.code === '401') {
        // 插入统计
        const model0 = StatisticsAdd({})

        const data0 = await model0.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        // 添加卷
        const volume = {
            sequence: Number(parameter.sequence), // 序列号
            name: parameter.name, // 卷名称
            releaseTime: parameter.releaseTime, // 发售时间
            cover: parameter.cover, // 封面
            book: parameter.book, // 书
            statistics: data0.data._id // 统计
        }

        const model = VolumeAdd(volume)

        data2 = await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }
    // 存在则更改卷相同此书下形同序列号的卷信息
    if (data1.code === '200') {
        const criteria = { is_deleted: 1, _id: data1.data._id } // 查询条件
        const doc = {
            name: parameter.name, // 卷名称
            releaseTime: parameter.releaseTime, // 发售时间
            cover: parameter.cover // 封面
        }
        const options = { sort: [{ createTime: -1 }] } // 排序
        const model = VolumeEdit(criteria, doc, options)

        data2 = await model.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        if (data1.data.cover !== parameter.cover) {
            // 删除文件
            const file = FileDelete({ is_deleted: 1, _id: data1.data.cover })

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
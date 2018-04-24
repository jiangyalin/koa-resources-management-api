import Router from 'koa-router'
import AwesomeInfo from './../awesomeInfo/model'
import AwesomeAdd from './model'

const router = Router()

// 添加榜单
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 检查书是否在同一届里添加多次
    const criteria = { is_deleted: 1, $or: [{ _id: parameter.book, year: parameter.year }] } // 查询条件
    const populate = []
    const fields = { book: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const awesomeInfo = await AwesomeInfo(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    let data = {
        code: '501',
        message: '此书已经在此届上榜，请勿多次添加'
    }

    if (awesomeInfo.code !== '200') {
        // 添加榜单
        data = await AwesomeAdd(parameter).then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

    ctx.body = data

})

export default router
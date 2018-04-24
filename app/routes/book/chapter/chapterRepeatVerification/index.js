import Router from 'koa-router'
import ChapterAll from './../chapterAll/model'

const router = Router()

// 获取指定书下所有卷名称
router.get('/', async (ctx, next) => {
    const parameter = ctx.query

    const criteria = { is_deleted: 1, sequence: parameter.sequence, volume: parameter.volume } // 查询条件
    const populate = []
    const fields = { name: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ sequence: 1 }] } // 排序

    const chapterAll = await ChapterAll(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    if (chapterAll.code === '200' && chapterAll.data.chapter.length > 0) {
        ctx.body = {
            code: '501',
            message: '此书此卷下已存在此序列号的章'
        }
    } else {
        ctx.body = {
            code: '200',
            data: {
                chapterAll
            }
        }
    }

})

export default router
import Router from 'koa-router'
import VolumeAll from './../volumeAll/model'

const router = Router()

// 获取指定书下所有卷名称
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    
    const criteria = { is_deleted: 1, sequence: parameter.sequence, book: parameter.book } // 查询条件
    const populate = []
    const fields = { name: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ sequence: 1 }] } // 排序

    const model = VolumeAll(criteria, fields, options, populate)

    const volumeAll = await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    if (volumeAll.code === '200' && volumeAll.data.volume.length > 0) {
        ctx.body = {
            code: '501',
            message: '此书下已存在此序列号的卷'
        }
    } else {
        ctx.body = {
            code: '200',
            data: {
                volumeAll
            }
        }
    }

})

export default router
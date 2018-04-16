import chapterAll from './../chapterAll/model'

// 合并章到卷
const chapterMerge = {}

chapterMerge.up = (volume) => {
    const criteria = { is_deleted: 1, $or: [{ volume }] } // 查询条件
    const populate = [{ path: 'file' }, { path: 'book' }, { path: 'volume' }]
    const fields = { name: 1, book: 1, volume: 1, file: 1,  releaseTime: 1, sequence: 1, cover: 1, createTime: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    const model = chapterAll(criteria, fields, options, populate)

    const data = model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    console.log('data', data)
}

export default chapterMerge
import fs from 'fs'
import nzhcn from 'nzh/cn'
import ChapterAll from './../chapterAll/model'
import FileAdd from './../../../file/fileAdd/model'
import FileDelete from './../../../file/fileDelete/model'
import VolumeInfo from './../../volume/volumeInfo/model'
import VolumeEdit from './../../volume/volumeEdit/model'

// 合并章到卷
const chapterMerge = {}

chapterMerge.up = (volume) => {

    // 找到要合并的章
    const criteria = { is_deleted: 1, $or: [{ volume }] } // 查询条件
    const populate = [{ path: 'file' }, { path: 'volume' }]
    const fields = { file: 1, name: 1, volume: 1, sequence: 1 } // 待返回的字段
    const options = { sort: [{ sequence: 1 }] } // 排序

    const model = ChapterAll(criteria, fields, options, populate)

    model.then(async (resolve) => {
        // 创建卷文件
        if (resolve.code === '200' && resolve.data.chapter.length !== 0) {
            const path = '/books/'
            const fileSuffixName = '.txt' // 后缀名
            const name = Date.now() + fileSuffixName // 文件名
            const dstPath = './app/public' + path + name
            const text = '第' + nzhcn.encodeS(resolve.data.chapter[0].volume.sequence) + '卷 ' + resolve.data.chapter[0].volume.name

            // 创建文件
            fs.appendFileSync(dstPath, text)
            resolve.data.chapter.forEach((data) => {
                fs.appendFileSync(dstPath, '\r\n\r\n' + '第' + nzhcn.encodeS(data.sequence) + '章 ' + data.name + '\r\n\r\n')
                const fileText = fs.readFileSync('./app/public' + data.file.path + data.file.name)
                fs.appendFileSync(dstPath, fileText)
            })

            // 添加文件
            const fileInfo = {
                name, // 文件名称
                type: 'book', // 文件分类
                suffixName: 'text/plain', // 文件类型
                path,
                content: '',
                size: -1
            }

            const model = FileAdd(fileInfo)

            return await model.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        }
        return {
            code: '501'
        }
    }).then(async (data) => {
        if (data.code === '200') {
            // 查询编辑前的卷关联文件
            const criteria1 = { is_deleted: 1, $or: [{ _id: volume }] } // 查询条件
            const populate1 = []
            const fields1 = { file: 1 } // 待返回的字段
            const options1 = { sort: [{ createTime: -1 }] } // 排序

            const model1 = VolumeInfo(criteria1, fields1, options1, populate1)

            const data1 = await model1.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })

            // 删除文件
            const criteria0 = { is_deleted: 1, _id: data1.data.file } // 查询条件

            const model0 = FileDelete(criteria0)

            await model0.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })

            // 关联新文件到卷
            const model = VolumeEdit({ is_deleted: 1, _id: volume }, { file: data.data.id }, { sort: [{ createTime: -1 }] })

            await model.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        }
    }).catch((reject) => {
        return reject
    })
}

export default chapterMerge
import fs from 'fs'
import VolumeAll from './../volumeAll/model'
import FileAdd from './../../../file/fileAdd/model'
import FileDelete from './../../../file/fileDelete/model'
import FictionInfo from './../../lightNovel/fictionInfo/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'

// 合并章到卷
const volumeMerge = {}

volumeMerge.up = async (book) => {

    // 找到要合并的卷
    const criteria = { is_deleted: 1, $or: [{ book }] } // 查询条件
    const populate = [{ path: 'file' }, { path: 'book', select: 'bookName'}]
    const fields = { file: 1, name: 1, sequence: 1, book: 1 } // 待返回的字段
    const options = { sort: [{ sequence: 1 }] } // 排序

    const model = VolumeAll(criteria, fields, options, populate)

    const data = await model.then(async (resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 创建书文件
    if (data.code === '200' && data.data.volume.length !== 0) {
        const path = '/books/'
        const fileSuffixName = '.txt' // 后缀名
        const name = Date.now() + fileSuffixName // 文件名
        const dstPath = './app/public' + path + name
        const text = data.data.volume[0].book.bookName + '\r\n\r\n'

        // 创建文件
        fs.appendFileSync(dstPath, text)
        data.data.volume.forEach((data) => {
            const fileText = fs.readFileSync('./app/public' + data.file.path + data.file.name)
            fs.appendFileSync(dstPath, fileText)
        })

        // 添加文件
        const fileInfo1 = {
            name, // 文件名称
            type: 'book', // 文件分类
            suffixName: 'text/plain', // 文件类型
            path,
            content: '',
            size: -1
        }

        const model1 = FileAdd(fileInfo1)

        const data1 = await model1.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        // 查询编辑前的书关联文件
        const criteria2 = { is_deleted: 1, $or: [{ _id: book }] } // 查询条件
        const populate2 = []
        const fields2 = { file: 1 } // 待返回的字段
        const options2 = { sort: [{ createTime: -1 }] } // 排序

        const model2 = FictionInfo(criteria2, fields2, options2, populate2)

        const data2 = await model2.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })

        // 删除文件
        if (data2.data.file) {
            const criteria0 = { is_deleted: 1, _id: data2.data.file } // 查询条件

            const model0 = FileDelete(criteria0)

            await model0.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })
        }

        // 关联新文件到卷
        const model3 = FictionEdit({ is_deleted: 1, _id: book }, { file: data1.data.id }, { sort: [{ createTime: -1 }] })

        await model3.then((resolve) => {
            return resolve
        }).catch((reject) => {
            return reject
        })
    }

}

export default volumeMerge
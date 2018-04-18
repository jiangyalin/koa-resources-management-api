import fs from 'fs'
import Router from 'koa-router'
import HtmlToText from 'html-to-text'
import ChapterDelete from './../chapterDelete/model'
import ChapterAdd from './../chapterAdd/model'
import ChapterInfo from './../chapterInfo/model'
import FileAdd from './../../../file/fileAdd/model'
import FileDelete from './../../../file/fileDelete/model'
import FictionEdit from './../../lightNovel/fictionEdit/model'
import chapterMerge from './../chapterMerge'
import volumeMerge from './../../volume/volumeMerge'

const router = Router()

// 编辑章
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    // 解析html成text
    const text = HtmlToText.fromString(parameter.content, {
        format: {
            heading: (elem, fn, options) => {
                var h = fn(elem.children, options);
                return '' + h.replace(/(^\s*)|(\s*$)/g, '') + '\r\n';
            },
            paragraph: (elem, fn, options) => {
                var h = fn(elem.children, options);
                if (h.substring(0, 1) === ' ' || h.substring(0, 1) === '    ' || h.substring(0, 1) === ' ') {
                    let index = 0
                    for (let i = 0; i < h.length; i++) {
                        if (h.substring(i, i + 1) !== ' ' && h.substring(i, i + 1) !== '    ' && h.substring(i, i + 1) !== ' ') {
                            index = i
                            i = h.length
                        }
                    }
                    h = '    ' + h.substring(index, h.length)
                }
                return h + '\r\n';
            }
        },
        wordwrap: 80,
        preserveNewlines: true, // 保留换行符
        uppercaseHeadings: false, // 标题大写
        singleNewLineParagraphs: true // 段落为单个换行符
    })

    // 创建文件
    const model0 = new Promise((resolve, reject) => {
        const path = '/books/'
        const fileSuffixName = '.txt' // 后缀名
        const name = Date.now() + fileSuffixName // 文件名
        const dstPath = './app/public' + path + name

        fs.writeFile(dstPath, text, async (err) => {
            if (err) reject('error: ' + err)

            const content = parameter.content

            const fileInfo = {
                name: name, // 文件名称
                type: 'book', // 文件分类
                suffixName: 'text/plain', // 文件类型
                path: path,
                content,
                size: -1
            }

            const mode2 = FileAdd(fileInfo)

            const data = await mode2.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })

            resolve(data)
        })
    })

    const file = await model0.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 找到章关联的文件id
    const criteria1 = { is_deleted: 1, $or: [{ volume: parameter.volume, sequence: Number(parameter.sequence) }] } // 查询条件
    const populate1 = []
    const fields1 = { file: 1 } // 待返回的字段
    const options1 = { sort: [{ createTime: -1 }] } // 排序

    const model1 = ChapterInfo(criteria1, fields1, options1, populate1)

    const data = await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除文件
    const criteria2 = { is_deleted: 1, _id: data.data.file } // 查询条件

    const model2 = FileDelete(criteria2)

    await model2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 删除章表中同一卷下同一序列号的数据
    const criteria = { is_deleted: 1, sequence: Number(parameter.sequence), volume: parameter.volume }
    const model = ChapterDelete(criteria)

    await model.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 添加章
    const chapter4 = {
        name: parameter.name, // 章名称
        sequence: Number(parameter.sequence), // 序列号
        file: file.data.id, // 文件
        book: parameter.book, // 书
        volume: parameter.volume // 卷
    }

    const model4 = ChapterAdd(chapter4)

    const data4 = await model4.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 更新轻小说时间
    const model3 = FictionEdit({ is_deleted: 1, _id: parameter.book }, { updateTime: Date.now() }, { sort: [{ createTime: -1 }] })

    await model3.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data4
    
    // 合并章到卷
    if (data4.code === '200') chapterMerge.up(parameter.volume)
    // 合并到书
    if (data4.code === '200') volumeMerge.up(parameter.book)
})

export default router
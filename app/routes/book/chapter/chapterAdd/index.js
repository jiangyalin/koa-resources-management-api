import fs from 'fs'
import Router from 'koa-router'
import HtmlToText from 'html-to-text'
import ChapterAdd from './model'
import ChapterDelete from './../chapterDelete/model'
import FileAdd from './../../../file/fileAdd/model'

const router = Router()

// 添加章
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const text = HtmlToText.fromString(parameter.content, {
        wordwrap: 80,
        preserveNewlines: true, // 保留换行符
        uppercaseHeadings: false, // 标题大写
        singleNewLineParagraphs: true // 段落为单个换行符
    })

    const model0 = new Promise((resolve, reject) => {
        const path = '/books/'
        const fileSuffixName = '.txt' // 后缀名
        const name = Date.now() + fileSuffixName // 文件名
        const dstPath = './app/public' + path + name

        // 创建文件
        fs.writeFile(dstPath, text, async (err) => {
            if (err) reject('error: ' + err)

            const content = parameter.content.replace(/&nbsp;&nbsp;/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

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

    // 删除章表中同一卷下同一序列号的数据
    const criteria = { is_deleted: 1, sequence: Number(parameter.sequence), volume: parameter.volume }
    const model1 = ChapterDelete(criteria)

    await model1.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    // 添加章
    const chapter = {
        name: parameter.name, // 章名称
        sequence: parameter.sequence, // 序列号
        file: file.data.id, // 文件
        book: parameter.book, // 书
        volume: parameter.volume // 卷
    }

    const mode2 = ChapterAdd(chapter)

    ctx.body = await mode2.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
})

export default router
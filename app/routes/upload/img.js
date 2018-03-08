import fs from 'fs'
import Router from 'koa-router'
import multiparty from 'multiparty'
import File from './../../models/file'

const router = Router()

// 上传
router.post('/', async (ctx, next) => {
    let data = {}
    // 生成multiparty对象，并配置上传目标路径
    const path = '/images/'
    const form = new multiparty.Form({
        maxFieldsSize: 100,
        uploadDir: './app/public' + path
    })
    const fileFlow = new Promise((resolve, reject) => {
        form.parse(ctx.req, async (err, fields, files) => {
            if (err) reject('parse error: ' + err)

            let inputFile = files.img[0]
            const fileSuffixName = inputFile.originalFilename.substring(inputFile.originalFilename.lastIndexOf('.'))
            inputFile.originalFilename = Date.now() + fileSuffixName
            const uploadedPath = inputFile.path
            const dstPath = './app/public' + path + inputFile.originalFilename

            // 重命名为真实文件名
            const file = new Promise((resolve, reject) => {
                fs.rename(uploadedPath, dstPath, async (err) => {

                    if (err) reject('rename error: ' + err)

                    const fileInfo = {
                        name: inputFile.originalFilename, // 文件名称
                        type: 'image', // 文件类型
                        suffixName: inputFile.headers['content-type'], // 文件后缀名
                        path: path,
                        size: inputFile.size
                    }

                    const model = new Promise((resolve, reject) => {
                        File.create(fileInfo, (err, result) => {
                            if (err) {
                                reject({
                                    code: '500',
                                    data: {}
                                })
                            } else {
                                resolve({
                                    code: '200',
                                    data: {
                                        id: result._id
                                    }
                                })
                            }
                        })
                    })

                    const fileDate = await model.then((resolve) => {
                        return resolve
                    }).catch((reject) => {
                        return reject
                    })

                    resolve(fileDate)

                    ctx.body = fileDate

                })
            })

            data = await file.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })

            resolve(data)

        })

    })

    data = await fileFlow.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router


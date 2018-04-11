import fs from 'fs'
import File from './../../../models/file'
import log from './../../../log'

export default (ctx, path, form) => {
    return new Promise((resolve, reject) => {
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
                    if (err) {
                        log.warn('img重命名: ' + JSON.stringify(err))
                        reject('rename error: ' + err)
                    }

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
                                log.warn(JSON.stringify(err))
                                reject({
                                    code: '500',
                                    data: {}
                                })
                            }

                            resolve({
                                code: '200',
                                data: {
                                    id: result._id
                                }
                            })
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

            const data = await file.then((resolve) => {
                return resolve
            }).catch((reject) => {
                return reject
            })

            resolve(data)

        })

    })
}
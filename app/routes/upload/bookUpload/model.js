import fs from 'fs'
import mammoth from 'mammoth'
import File from './../../../models/file'

export default (ctx, path, form) => {
    return new Promise((resolve, reject) => {
        form.parse(ctx.req, async (err, fields, files) => {
            if (err) reject('parse error: ' + err)

            let inputFile = files.file[0]
            const fileSuffixName = inputFile.originalFilename.substring(inputFile.originalFilename.lastIndexOf('.'))
            inputFile.originalFilename = Date.now() + fileSuffixName
            const uploadedPath = inputFile.path
            const dstPath = './app/public' + path + inputFile.originalFilename

            // 重命名为真实文件名
            const file = new Promise((resolve, reject) => {
                fs.rename(uploadedPath, dstPath, async (err) => {

                    if (err) reject('rename error: ' + err)

                    if (inputFile.headers['content-type'] !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                        resolve({
                            code: '501',
                            data: {},
                            message: '文件格式错误'
                        })
                    }
                    else {
                        const content = new Promise((resolve, reject) => {
                            const options = {
                                styleMap: [
                                    "p[style-name='Section Title'] => h1:fresh",
                                    "p[style-name='Subsection Title'] => h2:fresh"
                                ],
                                includeDefaultStyleMap: true, // 保留默认样式映射
                                includeEmbeddedStyleMap: false, // 停用附加样式映射
                                ignoreEmptyParagraphs: false // 保留空白段落
                            }
                            mammoth.convertToHtml({ path: './app/public' + path + inputFile.originalFilename }, options)
                                .then((result) => {
                                    resolve(result.value)
                                }).done()

                            // docx4js.load('./app/public' + path + inputFile.originalFilename).then(docx => {
                            //     console.log('docx', docx)
                            // })

                            // docx4js.create().then(docx => {
                            //     docx.save("~/new.docx")
                            // })
                        })

                        const html = await content.then((resolve) => {
                            return resolve
                        }).catch((reject) => {
                            return reject
                        })

                        const fileInfo = {
                            name: inputFile.originalFilename, // 文件名称
                            type: 'book', // 文件类型
                            suffixName: inputFile.headers['content-type'], // 文件后缀名
                            path: path,
                            content: html,
                            size: inputFile.size
                        }

                        const model = new Promise((resolve, reject) => {
                            File.create(fileInfo, (err, result) => {
                                if (err) {
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
                    }
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
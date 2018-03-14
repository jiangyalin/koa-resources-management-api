import fs from 'fs'
import Router from 'koa-router'
import multiparty from 'multiparty'
import File from './../../models/file'

const router = Router()

// 上传
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    let data = {}

    const path = '/avatar/'
    var base64Data = parameter.avatar.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')

    const fileFlow = new Promise((resolve, reject) => {
        console.log('sss')

        let inputFile = {}
        const fileSuffixName = '.png'
        inputFile.originalFilename = Date.now() + fileSuffixName
        const dstPath = './app/public' + path + inputFile.originalFilename

        console.log('inputFile', inputFile)
        console.log('dstPath', dstPath)

        fs.writeFile(dstPath, dataBuffer, async (err) => {
            console.log('ppp')
            if (err) reject('rename error: ' + err)

            const fileInfo = {
                name: inputFile.originalFilename, // 文件名称
                type: 'avatar', // 文件类型
                suffixName: 'image/png', // 文件后缀名
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

    data = await fileFlow.then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })

    ctx.body = data
})

export default router


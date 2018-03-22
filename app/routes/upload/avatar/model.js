import fs from 'fs'
import File from './../../../models/file'

export default (path, dataBuffer) => {
    return new Promise((resolve, reject) => {
        let inputFile = {}
        const fileSuffixName = '.png'
        inputFile.originalFilename = Date.now() + fileSuffixName
        const dstPath = './app/public' + path + inputFile.originalFilename

        fs.writeFile(dstPath, dataBuffer, async (err) => {
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
            
        })

    })
}
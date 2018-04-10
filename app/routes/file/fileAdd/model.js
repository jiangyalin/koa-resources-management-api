import File from './../../../models/file'

export default (fileInfo) => {
    return new Promise((resolve, reject) => {
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
}
import Library from './../../../../models/library'

export default (criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        Library.find(criteria, fields, options, (err, result) => {
            if (err) {
                reject({
                    code: '500',
                    data: {
                        library: []
                    }
                })
            }
            
            let library = [];
            result.forEach((value, index) => {
                let node = {
                    id: result[index]._id,
                    name: result[index].name
                }
                library.push(node)
            })
            resolve({
                code: '200',
                data: {
                    library: library
                }
            })
        })
    })
}
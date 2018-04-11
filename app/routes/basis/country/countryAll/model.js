import Country from './../../../../models/country'
import log from './../../../../log'

export default (criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        Country.find(criteria, fields, options, (err, result) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        content: []
                    }
                })
            }

            let country = [];
            result.forEach((value, index) => {
                const node = {
                    id: result[index]._id,
                    name: result[index].name
                }
                country.push(node)
            })
            resolve({
                code: '200',
                data: {
                    content: country
                }
            })
        })
    })
}
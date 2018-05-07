import Banner from './../../../models/banner'
import PageList from './../../../models/pageList'
import log from './../../../log'

export default (page, pageSize, populate, criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, Banner, populate, criteria, fields, options, (err, $page) => {
            if (err) {
                log.warn(__filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        content: []
                    },
                    message: err.message
                })
            }

            resolve({
                code: '200',
                data: {
                    totalElements: $page.count,
                    content: $page.results
                }
            })
        })
    })
}
import Book from './../../../../models/book/book'
import PageList from './../../../../models/pageList'
import log from './../../../../log'

export default (page, pageSize, populate, criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, Book, populate, criteria, fields, options, (err, $page) => {
            if (err) {
                log.warn(JSON.stringify(err))
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
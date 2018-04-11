import BookVolume from './../../../../models/book/book_volume'
import PageList from './../../../../models/pageList'
import log from './../../../../log'

export default (page, pageSize, populate, criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, BookVolume, populate, criteria, fields, options, (err, $page) => {
            if (err) {
                log.warn(JSON.stringify(err))
                reject({
                    code: '500',
                    data: {
                        content: []
                    }
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
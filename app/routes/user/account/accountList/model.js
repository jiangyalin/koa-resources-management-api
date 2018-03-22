import Account from './../../../../models/user/account'
import PageList from './../../../../models/pageList'

export default (page, pageSize, populate, criteria, fields, options) => {
    return new Promise((resolve, reject) => {
        PageList.pageQuery(page, pageSize, Account, populate, criteria, fields, options, (err, $page) => {
            if (err) {
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
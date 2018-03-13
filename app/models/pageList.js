// 分页插件
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import async from 'async'
// 当前页码，每页条数，模板, 外键, 查询参数, 排序方式, 回调
let pageQuery = (page, pageSize, Model, populate, queryParams, fields, sortParams, callback) => {
    console.log(page, pageSize, Model, populate, queryParams, fields, sortParams, callback)
    let start = (page -1) * pageSize
    let $page = {
        pageNumber: page
    }
    async.parallel({
        count: (done) => {    // 查询数据总量
            Model.count(queryParams, (err, count) => {
                done(err, count)
            })
        },
        records: (done) => {    // 查询一页的记录
            Model.find(queryParams, fields, sortParams, (err, doc) => {
                done(err, doc)
            }).skip(start).limit(pageSize).populate(populate)
        }
    },function (err, results) {
        let count = results.count
        $page.pageCount = (count - 1) / pageSize + 1
        $page.results = results.records
        $page.count = results.count
        callback(err, $page)
    })
}

export default {
    pageQuery: pageQuery
}
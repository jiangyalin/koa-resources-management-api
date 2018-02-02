import Router from 'koa-router'

const router = Router()

// 获取书籍列表
router.get('/', async (ctx, next) => {
    const parameter = ctx.query
    const id = parameter.id
    let data = {}
    if (id === '1') {
        data = {
            code: '200',
            book: [{
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }, {
                id: '465',
                bookName: '魔法禁书目录',
                author: '镰池和马',
                updateTime: '2015-05-05 08:55'
            }]
        }
    } else {
        data = {
            code: '403',
            book: []
        }
    }
    ctx.body = data
})

export default router
import Koa from 'koa'
import config from './config'
const app = new Koa()

app.use(async ctx => {
    ctx.body = 'Hello World2'
})

app.listen(config.port, () => {
    console.log('启动成功：' + config.port)
})
import path from 'path'
import Koa from 'koa'
import staticCache from 'koa-static-cache'
import convert from 'koa-convert'
import cors from 'koa-cors' // 跨域
import bodyParser from 'koa-bodyparser' // 请求体JSON解析
import error from 'koa-onerror' // 错误处理
import koaBody from 'koa-body'
import jwt from 'koa-jwt'
import config from './config'
import errorHandle from './token'
import routes from './routes'
const app = new Koa()

error(app)

app.use(koaBody())

app.use(convert(cors()))

app.use(bodyParser())

app.use(staticCache(path.join(__dirname, './public'), {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: true
}))

app.use(errorHandle)

const secret = config.tokenKey
app.use(jwt({ secret }).unless({ path: [/\/register/, /\/login/] }))

app.use(routes.routes(), routes.allowedMethods())

app.listen(config.port, () => {
    console.log('启动成功：' + config.port)
})
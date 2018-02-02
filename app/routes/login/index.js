import Router from 'koa-router'
import login from './login'
import me from './me'

const router = Router()

// 登录
router.use('/login', login.routes(), login.allowedMethods())

// 获取用户详情
router.use('/me', me.routes(), me.allowedMethods())

export default router


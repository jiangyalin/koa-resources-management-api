import Router from 'koa-router'
import login from './login'

const router = Router()

// 登录
router.use('/login', login.routes(), login.allowedMethods())

// 获取用户详情

export default router


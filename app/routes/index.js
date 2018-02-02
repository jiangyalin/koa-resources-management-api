import Router from 'koa-router'
import login from './login'

const router = Router()

// 登录
router.use('/api', login.routes(), login.allowedMethods())

export default router


import Router from 'koa-router'
import login from './login'
import join from './join'
import activateAccount from './activateAccount'

const router = Router()

// 登录
router.use('/login', login.routes(), login.allowedMethods())

// 注册
router.use('/join', join.routes(), join.allowedMethods())

// 邮箱激活
router.use('/activateAccount', activateAccount.routes(), activateAccount.allowedMethods())

export default router


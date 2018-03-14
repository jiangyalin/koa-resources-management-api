import Router from 'koa-router'
import user from './user'
import account from './account'

const router = Router()

// 用户
router.use('/user', user.routes(), user.allowedMethods())

// 账户
router.use('/user', account.routes(), account.allowedMethods())

export default router


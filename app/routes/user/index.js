import Router from 'koa-router'
import user from './user'

const router = Router()

// 用户
router.use('/user', user.routes(), user.allowedMethods())

export default router


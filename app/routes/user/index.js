import Router from 'koa-router'
import user from './user'
import skin from './skin'

const router = Router()

// 用户
router.use('/user', user.routes(), user.allowedMethods())

// 用户
router.use('/user', skin.routes(), skin.allowedMethods())

export default router


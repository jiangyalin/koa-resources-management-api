import Router from 'koa-router'
import basis from './basis'
import login from './login'
import book from './book'

const router = Router()

// 基础信息
router.use('/api', basis.routes(), basis.allowedMethods())

// 登录
router.use('/api', login.routes(), login.allowedMethods())

// 书
router.use('/api', book.routes(), book.allowedMethods())

export default router


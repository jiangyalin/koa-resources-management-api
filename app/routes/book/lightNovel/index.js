import Router from 'koa-router'
import fiction from './fiction'

const router = Router()

// 书籍列表
router.use('/fiction', fiction.routes(), fiction.allowedMethods())

export default router


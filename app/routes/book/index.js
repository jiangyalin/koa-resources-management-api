import Router from 'koa-router'
import lightNovel from './lightNovel'

const router = Router()

// 书籍
router.use('/lightNovel', lightNovel.routes(), lightNovel.allowedMethods())

export default router


import Router from 'koa-router'
import down from './down'

const router = Router()

// 下载
router.use('/statistics/down', down.routes(), down.allowedMethods())

export default router


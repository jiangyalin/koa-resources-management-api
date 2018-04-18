import Router from 'koa-router'
import country from './country'
import library from './library'
import statistics from './statistics'

const router = Router()

// 国家
router.use('/basis', country.routes(), country.allowedMethods())

// 文库
router.use('/basis', library.routes(), library.allowedMethods())

// 统计
router.use('/basis', statistics.routes(), statistics.allowedMethods())

export default router


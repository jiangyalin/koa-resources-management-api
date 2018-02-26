import Router from 'koa-router'
import country from './country'

const router = Router()

// 基础信息
router.use('/basis', country.routes(), country.allowedMethods())

export default router


import Router from 'koa-router'
import country from './country'
import library from './library'

const router = Router()

// 国家
router.use('/basis', country.routes(), country.allowedMethods())

// 文库
router.use('/basis', library.routes(), library.allowedMethods())

export default router


import Router from 'koa-router'
import countryAll from './countryAll'

const router = Router()

// 查询所有国家
router.use('/country', countryAll.routes(), countryAll.allowedMethods())

export default router


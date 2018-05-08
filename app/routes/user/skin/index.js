import Router from 'koa-router'
import skinList from './skinList'

const router = Router()

// 皮肤列表
router.use('/skin', skinList.routes(), skinList.allowedMethods())

export default router
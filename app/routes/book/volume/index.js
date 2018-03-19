import Router from 'koa-router'
import volumeAdd from './volumeAdd'

const router = Router()

// 添加卷
router.use('/volume', volumeAdd.routes(), volumeAdd.allowedMethods())

export default router


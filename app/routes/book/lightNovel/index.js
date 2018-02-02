import Router from 'koa-router'
import fictionList from './fictionList'
import fictionAdd from './fictionAdd'

const router = Router()

// 书籍列表
router.use('/fiction', fictionList.routes(), fictionList.allowedMethods())

// 添加书籍
router.use('/fiction', fictionAdd.routes(), fictionAdd.allowedMethods())

export default router


import Router from 'koa-router'
import fictionList from './fictionList'
import fictionInfo from './fictionInfo'
import fictionAdd from './fictionAdd'
import fictionDelete from './fictionDelete'
import fictionEdit from './fictionEdit'

const router = Router()

// 书籍列表
router.use('/fiction', fictionList.routes(), fictionList.allowedMethods())

// 添加书籍
router.use('/fiction', fictionAdd.routes(), fictionAdd.allowedMethods())

// 获取书籍详情
router.use('/fictionInfo', fictionInfo.routes(), fictionInfo.allowedMethods())

// 编辑书籍详情
router.use('/fictionInfo', fictionEdit.routes(), fictionEdit.allowedMethods())

// 删除书籍
router.use('/fiction', fictionDelete.routes(), fictionDelete.allowedMethods())

export default router


import Router from 'koa-router'
import chapterAdd from './chapterAdd'
import chapterList from './chapterList'
import chapterDelete from './chapterDelete'
import chapterInfo from './chapterInfo'
import chapterEdit from './chapterEdit'
const router = Router()

// 章列表
router.use('/chapter', chapterList.routes(), chapterList.allowedMethods())

// 添加章
router.use('/chapter', chapterAdd.routes(), chapterAdd.allowedMethods())

// 删除章
router.use('/chapter', chapterDelete.routes(), chapterDelete.allowedMethods())

// 章详情
router.use('/chapterInfo', chapterInfo.routes(), chapterInfo.allowedMethods())

// 章编辑
router.use('/chapterInfo', chapterEdit.routes(), chapterEdit.allowedMethods())

export default router


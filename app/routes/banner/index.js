import Router from 'koa-router'
import bannerAdd from './bannerAdd'
import bannerList from './bannerList'
import bannerInfo from './bannerInfo'
import bannerEdit from './bannerEdit'
import bannerDelete from './bannerDelete'

const router = Router()

// 添加banner
router.use('/banner', bannerAdd.routes(), bannerAdd.allowedMethods())

// banner列表
router.use('/banner', bannerList.routes(), bannerList.allowedMethods())

// banner详情
router.use('/banner', bannerInfo.routes(), bannerInfo.allowedMethods())

// 编辑banner
router.use('/banner', bannerEdit.routes(), bannerEdit.allowedMethods())

// 删除banner
router.use('/banner', bannerDelete.routes(), bannerDelete.allowedMethods())

export default router


import Router from 'koa-router'
import bookVolumeList from './bookVolumeList'

const router = Router()

// 书籍-卷列表
router.use('/bookVolume', bookVolumeList.routes(), bookVolumeList.allowedMethods())

export default router


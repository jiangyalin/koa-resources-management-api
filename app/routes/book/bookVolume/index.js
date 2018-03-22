import Router from 'koa-router'
import bookVolumeList from './bookVolumeList'
import bookVolumeAdd from './bookVolumeAdd'

const router = Router()

// 书籍-卷列表
router.use('/bookVolume', bookVolumeList.routes(), bookVolumeList.allowedMethods())

// 添加书籍-卷
router.use('/bookVolume', bookVolumeAdd.routes(), bookVolumeAdd.allowedMethods())

export default router


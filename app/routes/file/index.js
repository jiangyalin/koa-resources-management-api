import Router from 'koa-router'
import fileInfo from './fileInfo'
import fileDelete from './fileDelete'

const router = Router()

// 文件详情
router.use('/file', fileInfo.routes(), fileInfo.allowedMethods())

// 删除文件
router.use('/file', fileDelete.routes(), fileDelete.allowedMethods())

export default router


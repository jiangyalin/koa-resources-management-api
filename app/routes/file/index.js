import Router from 'koa-router'
import fileDelete from './fileDelete'

const router = Router()

// 删除文件
router.use('/file', fileDelete.routes(), fileDelete.allowedMethods())

export default router


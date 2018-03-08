import Router from 'koa-router'
import file from './file'
import img from './img'

const router = Router()

// 文件上传
router.use('/upload', file.routes(), file.allowedMethods())

// 图片上传
router.use('/upload/img', img.routes(), img.allowedMethods())

export default router


import Router from 'koa-router'
import file from './file'
import fileDelete from './fileDelete'
import img from './img'
import avatar from './avatar'

const router = Router()

// 文件上传
router.use('/upload', file.routes(), file.allowedMethods())

// 文件删除
router.use('/uploadDelete', fileDelete.routes(), fileDelete.allowedMethods())

// 图片上传
router.use('/upload/img', img.routes(), img.allowedMethods())

// 头像上传
router.use('/upload/avatar', avatar.routes(), avatar.allowedMethods())

export default router


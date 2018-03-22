import Router from 'koa-router'
import fileUpload from './fileUpload'
import imgUpload from './imgUpload'
import avatar from './avatar'

const router = Router()

// 文件上传
router.use('/upload', fileUpload.routes(), fileUpload.allowedMethods())

// 图片上传
router.use('/upload/img', imgUpload.routes(), imgUpload.allowedMethods())

// 头像上传
router.use('/upload/avatar', avatar.routes(), avatar.allowedMethods())

export default router


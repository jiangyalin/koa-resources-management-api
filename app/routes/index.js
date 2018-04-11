import Router from 'koa-router'
import basis from './basis'
import login from './login'
import book from './book'
import upload from './upload'
import download from './download'
import user from './user'
import file from './file'
import yaoXiao from './yao-xiao'

const router = Router()

// 基础信息
router.use('/api', basis.routes(), basis.allowedMethods())

// 登录
router.use('/api', login.routes(), login.allowedMethods())

// 书
router.use('/api', book.routes(), book.allowedMethods())

// 上传
router.use('/api', upload.routes(), upload.allowedMethods())

// 下载
router.use('/api', download.routes(), download.allowedMethods())

// 用户
router.use('/api', user.routes(), user.allowedMethods())

// 文件
router.use('/api', file.routes(), file.allowedMethods())

// 姚逍
router.use('/api', yaoXiao.routes(), yaoXiao.allowedMethods())

export default router


import Router from 'koa-router'
import appAdd from './appAdd'
import appList from './appList'
import appInfo from './appInfo'

const router = Router()

// 添加app
router.use('/app', appAdd.routes(), appAdd.allowedMethods())

// app列表
router.use('/app', appList.routes(), appList.allowedMethods())

// app详情
router.use('/appInfo', appInfo.routes(), appInfo.allowedMethods())

export default router


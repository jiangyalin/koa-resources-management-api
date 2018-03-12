import Router from 'koa-router'
import appAdd from './appAdd'
import appList from './appList'

const router = Router()

// 添加app
router.use('/app', appAdd.routes(), appAdd.allowedMethods())

// app列表
router.use('/app', appList.routes(), appList.allowedMethods())

export default router


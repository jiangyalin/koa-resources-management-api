import Router from 'koa-router'
import accountAdd from './accountAdd'
import accountList from './accountList'

const router = Router()

// 添加账户
router.use('/account', accountAdd.routes(), accountAdd.allowedMethods())

// 账户列表
router.use('/account', accountList.routes(), accountList.allowedMethods())

export default router


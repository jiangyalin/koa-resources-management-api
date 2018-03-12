import Router from 'koa-router'
import userAdd from './userAdd'
import userList from './userList'

const router = Router()

// 添加书籍
router.use('/user', userAdd.routes(), userAdd.allowedMethods())

// 书籍列表
router.use('/user', userList.routes(), userList.allowedMethods())

export default router


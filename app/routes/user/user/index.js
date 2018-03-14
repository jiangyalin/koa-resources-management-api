import Router from 'koa-router'
import userAdd from './userAdd'
import userList from './userList'
import userInfo from './userInfo'
import userEdit from './userEdit'
import userDelete from './userDelete'

const router = Router()

// 添加用户
router.use('/user', userAdd.routes(), userAdd.allowedMethods())

// 用户列表
router.use('/user', userList.routes(), userList.allowedMethods())

// 用户详情
router.use('/userInfo', userInfo.routes(), userInfo.allowedMethods())

// 编辑用户
router.use('/userInfo', userEdit.routes(), userEdit.allowedMethods())

// 删除用户
router.use('/user', userDelete.routes(), userDelete.allowedMethods())

export default router


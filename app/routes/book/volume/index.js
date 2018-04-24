import Router from 'koa-router'
import volumeList from './volumeList'
import volumeAdd from './volumeAdd'
import volumeInfo from './volumeInfo'
import volumeEdit from './volumeEdit'
import volumeDelete from './volumeDelete'
import volumeAllName from './volumeAllName'
import volumeRepeatVerification from './volumeRepeatVerification'

const router = Router()

// 卷列表
router.use('/volume', volumeList.routes(), volumeList.allowedMethods())

// 添加卷
router.use('/volume', volumeAdd.routes(), volumeAdd.allowedMethods())

// 删除卷
router.use('/volume', volumeDelete.routes(), volumeDelete.allowedMethods())

// 卷详情
router.use('/volumeInfo', volumeInfo.routes(), volumeInfo.allowedMethods())

// 编辑卷
router.use('/volume', volumeEdit.routes(), volumeEdit.allowedMethods())

// 获取所有卷名称
router.use('/volumeAllName', volumeAllName.routes(), volumeAllName.allowedMethods())

// 卷验证
router.use('/volume/verification', volumeRepeatVerification.routes(), volumeRepeatVerification.allowedMethods())

export default router


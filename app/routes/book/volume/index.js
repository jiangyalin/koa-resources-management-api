import Router from 'koa-router'
import volumeList from './volumeList'
import volumeAdd from './volumeAdd'
import volumeInfo from './volumeInfo'
import volumeEdit from './volumeEdit'
import volumeBookSequence from './volumeBookSequence'

const router = Router()

// 卷列表
router.use('/volume', volumeList.routes(), volumeList.allowedMethods())

// 添加卷
router.use('/volume', volumeAdd.routes(), volumeAdd.allowedMethods())

// 卷详情
router.use('/volumeInfo', volumeInfo.routes(), volumeInfo.allowedMethods())

// 编辑卷
router.use('/volumeInfo', volumeEdit.routes(), volumeEdit.allowedMethods())

// 查询是否书籍下乙存在此卷
// router.use('/volumeBookSequence', volumeBookSequence.routes(), volumeBookSequence.allowedMethods())

export default router


import Router from 'koa-router'
import volumeAdd from './volumeAdd'
import volumeEdit from './volumeEdit'
import volumeBookSequence from './volumeBookSequence'

const router = Router()

// 添加卷
router.use('/volume', volumeAdd.routes(), volumeAdd.allowedMethods())

// 编辑卷
// router.use('/volumeInfo', volumeEdit.routes(), volumeEdit.allowedMethods())

// 查询是否书籍下乙存在此卷
// router.use('/volumeBookSequence', volumeBookSequence.routes(), volumeBookSequence.allowedMethods())

export default router


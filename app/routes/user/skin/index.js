import Router from 'koa-router'
import skinList from './skinList'
// import skinAdd from './skinAdd'
// import skinDelete from './skinDelete'
import skinInfo from './skinInfo'
import skinEdit from './skinEdit'

const router = Router()

// 皮肤列表
router.use('/skin', skinList.routes(), skinList.allowedMethods())

// 添加皮肤
// router.use('/skin', skinAdd.routes(), skinAdd.allowedMethods()) // 不允许直接添加皮肤

// 删除皮肤
// router.use('/skin', skinDelete.routes(), skinDelete.allowedMethods()) // 皮肤不能删除

// 皮肤详情
router.use('/skin', skinInfo.routes(), skinInfo.allowedMethods())

// 编辑皮肤
router.use('/skin', skinEdit.routes(), skinEdit.allowedMethods())

export default router
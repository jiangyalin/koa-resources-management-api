import Router from 'koa-router'
import awesomeList from './awesomeList'
import awesomeAdd from './awesomeAdd'
import awesomeDelete from './awesomeDelete'
const router = Router()

// 榜单列表
router.use('/awesome', awesomeList.routes(), awesomeList.allowedMethods())

// 添加榜单
router.use('/awesome', awesomeAdd.routes(), awesomeAdd.allowedMethods())

// 删除榜单
router.use('/awesome', awesomeDelete.routes(), awesomeDelete.allowedMethods())

export default router
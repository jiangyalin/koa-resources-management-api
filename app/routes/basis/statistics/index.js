import Router from 'koa-router'
import click from './click'
import down from './down'
import statisticsInfo from './statisticsInfo'

const router = Router()

// 点击
router.use('/statistics/click', click.routes(), click.allowedMethods())

// 下载
router.use('/statistics/down', down.routes(), down.allowedMethods())

// 查看详情（根据类型加类型id）
router.use('/statistics', statisticsInfo.routes(), statisticsInfo.allowedMethods())

export default router


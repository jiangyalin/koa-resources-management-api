import Router from 'koa-router'
import click from './click'
import down from './down'

const router = Router()

// 点击
router.use('/statistics/click', click.routes(), click.allowedMethods())

// 下载
router.use('/statistics/down', down.routes(), down.allowedMethods())

export default router


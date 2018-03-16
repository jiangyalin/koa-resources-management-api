import Router from 'koa-router'
import libraryAll from './libraryAll'

const router = Router()

// 查询所有文库
router.use('/library', libraryAll.routes(), libraryAll.allowedMethods())

export default router


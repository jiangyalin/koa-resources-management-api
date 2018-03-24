import Router from 'koa-router'
import lightNovel from './lightNovel'
import volume from './volume'
import chapter from './chapter'
import bookVolume from './bookVolume'

const router = Router()

// 书籍
router.use('/lightNovel', lightNovel.routes(), lightNovel.allowedMethods())

// 卷
router.use('/lightNovel', volume.routes(), volume.allowedMethods())

// 章
router.use('/lightNovel', chapter.routes(), chapter.allowedMethods())

// 书籍-卷
router.use('/lightNovel', bookVolume.routes(), bookVolume.allowedMethods())

export default router


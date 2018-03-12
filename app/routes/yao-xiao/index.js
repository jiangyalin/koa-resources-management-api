import Router from 'koa-router'
import app from './app'

const router = Router()

// app
router.use('/yaoxiao', app.routes(), app.allowedMethods())

export default router


import Router from 'koa-router'
import axios from 'axios'
import { liveXhr } from './urlConfig'

const router = Router()

// 直播
router.get('/live', async (ctx, next) => {
    let response = await axios.get(liveXhr)
    response = {
        data: {
            a: "aaa"
        }
    }
    let data = response.data
    let result = data
    // console.log('ppppp', JSON.parse(result))
    ctx.body = data
})

export default router
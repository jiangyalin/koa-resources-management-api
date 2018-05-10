import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import log from './../../../log'
import config from './../../../config'
import UserInfo from './../../user/user/userInfo/model'

const router = Router()

// 注册
router.post('/', async (ctx, next) => {
    const parameter = ctx.request.body

    const criteria = { is_deleted: 1, is_active: 1, $or: [{ eMail: parameter.eMail }] } // 查询条件
    const populate = []
    const fields = { name: 1, nickname: 1, gender: 1, phone: 1, eMail: 1, birthDate: 1, avatar: 1, type: 1 } // 待返回的字段
    const options = { sort: [{ createTime: -1 }] } // 排序

    let data = await UserInfo(criteria, fields, options, populate).then((resolve) => {
        return resolve
    }).catch((reject) => {
        return reject
    })
    
    // 查询此邮箱是否已经注册
    if (data.code === '200') {
        data = {
            code: '4000',
            message: '此邮箱已经注册'
        }
    }

    if (data.code === '401') {
        const token = jwt.sign({ eMail: parameter.eMail, password: parameter.password }, config.tokenKey, { expiresIn: 60 * 60 * 1 }) // 有效期1个小时

        const href = config.server + '/api/activateAccount/' + token

        // 邮件信息
        const mailOptions = {
            from: '18725944157@163.com', // 发送邮箱
            to: parameter.eMail, // 接受邮箱
            subject: 'acgn账号激活邮件', // 标题
            html: '<p>点击连接激活账号,有效期1个小时,如你没有注册acgn，请无视此邮件。</p><a href="'+ href + '">确认激活</a>' // 内容
        }

        // 发送邮件
        const transporter = nodemailer.createTransport(config.eMail)
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return log.warn(__filename, JSON.stringify(err))
        })

        data = {
            code: '200',
            data: {}
        }
    }

    ctx.body = data

})

export default router
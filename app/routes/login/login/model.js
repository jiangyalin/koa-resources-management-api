import config from './../../../config'
import jwt from 'jsonwebtoken'
import Account from './../../../models/user/account'
import log from './../../../log'

export default (criteria, fields, options, populate) => {
    return new Promise((resolve, reject) => {
        Account.findOne(criteria, fields, options, (err, result) => {
            if (err) {
                log.warn(__filename, __filename, JSON.stringify(err))
                reject({
                    code: '500',
                    data: {},
                    message: err.message
                })
            } else if (result !== null) {
                const token = jwt.sign({id: result._id}, config.tokenKey, {expiresIn: 60 * 60 * 24})
                log.info(__filename, '登录成功:' + JSON.stringify(criteria))
                resolve({
                    code: '200',
                    data: {
                        ...result._doc,
                        token
                    }
                })
            } else {
                log.info(__filename, '登录失败:' + JSON.stringify(criteria))
                reject({
                    code: '401',
                    data: {},
                    message: '用户名或密码错误'
                })
            }
        }).populate(populate)
    })
}
const params = {
    host: 'smtp.163.com', // 设置服务
    port: 465, // 端口
    sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
    auth: {
        user: '18725944157@163.com', // 邮箱和密码
        pass: 'jiang1995991'
    }
}

// 邮件信息
const mailOptions = {
    from: '18725944157@163.com', // 发送邮箱
    to: 'liuxs@knowone.com.cn', // 接受邮箱
    subject: '测试邮件', // 标题
    html: '<p>这是一封测试邮件</p>' // 内容
}

// 发送邮件
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport(params)
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    // success
    // ...
})
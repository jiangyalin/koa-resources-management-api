// mongodb配置文件
export default {
    port: 8088,
    session: {
        secret: 'acgnDB',
        key: 'acgnDB',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://192.168.17.111:27017/acgnDB',
    ip: '192.168.17.111',
    server: 'http://192.168.17.111:8088',
    tokenKey: 'YaLin',
    eMail: {
        host: 'smtp.163.com', // 设置服务
        port: 465, // 端口
        sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
        auth: {
            user: '18725944157@163.com', // 邮箱和密码
            pass: 'jiang1995991'
        }
    }
}
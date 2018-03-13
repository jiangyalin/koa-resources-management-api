// mongodb配置文件
module.exports = {
    port: 8088,
    session: {
        secret: 'personalDB',
        key: 'personalDB',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://www.jiangyalin.com:27017/acgnDB'
}
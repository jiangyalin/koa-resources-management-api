// mongodb配置文件
export default {
    port: 8088,
    session: {
        secret: 'acgnDB',
        key: 'acgnDB',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/acgnDB'
}
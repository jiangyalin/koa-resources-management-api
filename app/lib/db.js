// 连接数据库
import mongoose from 'mongoose'
import config from '../config'
const DB_URL = config.mongodb

//连接
mongoose.Promise = global.Promise
mongoose.connect(DB_URL)

//连接成功
mongoose.connection.on('connected', () => {
    console.log("mongoose连接成功")
})

//连接异常
mongoose.connection.on('error', () => {
    console.log("连接异常")
    console.log('Mongoose connection error: ' + err)
})

//连接断开
mongoose.connection.on('disconnected', () => {
    console.log("连接断开")
    console.log('Mongoose connection disconnected')
})

export default mongoose;
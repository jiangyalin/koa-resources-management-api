import fs from 'fs'
import moment from 'moment'

let log = {}

log.debug = (path, info) => {
    const level = '+++debug+++'
    const date = 'date: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    const text = level + '\r' + date + '\r' + path + '\r' + info + '\r\r\r\r'
    const fileName = moment().format('YYYY-MM-DD')
    fs.appendFile('./app/log/file/' + fileName + '.txt', text, () => {})
}

log.info = (path, info) => {
    const level = '---info---'
    const date = 'date: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    const text = level + '\r' + date + '\r' + path + '\r' + info + '\r\r\r\r'
    const fileName = moment().format('YYYY-MM-DD')
    fs.appendFile('./app/log/file/' + fileName + '.txt', text, () => {})
}

log.warn = (path, info) => {
    const level = '===warn==='
    const date = 'date: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    const text = level + '\r' + date + '\r' + path + '\r' + info + '\r\r\r\r'
    const fileName = moment().format('YYYY-MM-DD')
    fs.appendFile('./app/log/file/' + fileName + '.txt', text, () => {})
}

log.error = (path, info) => {
    const level = '***error***'
    const date = 'date: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    const text = level + '\r' + date + '\r' + path + '\r' + info + '\r\r\r\r'
    const fileName = moment().format('YYYY-MM-DD')
    fs.appendFile('./app/log/file/' + fileName + '.txt', text, () => {})
}

export default log
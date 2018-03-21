import Request from 'request'

const fileDelete = () => {
    const url = 'http://szxy.mypep.cn/ajax/lessons/get_lessons'
    const qs = {
        id: '5a960a9f39fcfe3d48cfd953'
    }
    Request.post({ url, qs, headers: {Cookie: 'PHPSESSID=k2c84etmelc6sscqllfckbekt0'} }, (err, result, body) => {
        console.log('body', body)
    })
}

// fileDelete()

export default fileDelete

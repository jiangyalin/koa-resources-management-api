import Request from 'request'

const fileDelete = () => {
    const url = 'http://localhost:8088' + '/api/upload/uploadDelete'
    const qs = {
        id: '5a960a9f39fcfe3d48cfd953'
    }
    Request.delete({ url, qs }, (err, result, body) => {
        console.log('body', body)
    })
}

export default fileDelete

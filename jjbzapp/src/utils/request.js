import axios from 'axios'

// 仅用于请求相关问题


// const http = 'https'
// const localhost = 'noxus.dynv6.net:9001'

const http = 'http'
const localhost = '127.0.0.1:9001'

const request = axios.create({
    baseURL: http + '://' + localhost,
    timeout: 600000,
})

export default request

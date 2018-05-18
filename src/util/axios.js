import axios from 'axios';
import { Notification } from 'element-ui';
import config from "config";

let baseURL = "http://localhost:3001";

const mockCtrl = config.mockServer.mockCtrl;

if(mockCtrl){
    baseURL = config.mockServer.url;
}else{
    switch(process.env.NODE_ENV){
        case "development":
            baseURL = config.devServer;
            break;
        case "production":
            baseURL = config.prodServer;
            break;
        default:
            baseURL = config.devServer;
            break;
    }
}

console.log(process.env);
//默认错误处理方式
const _onerror = function (error) {
    Notification({
        title: '请求错误',
        type: 'error',
        message: error.message ||'请求发生错误'
    })
}

const service = axios.create({
    // baseURL:'https://www.easy-mock.com/mock/5aab842b82fe290e7f22d91a',
    baseURL: baseURL,
    timeout:1000
});

//http request拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

//http response拦截器
service.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        console.dir(err);
        if(err && err.response){
            switch(err.response.status){
                case 400: err.message = '请求错误(400)';break;
                case 401: err.message = '未授权，请重新登录(401)';setTimeout(()=>window.location.href="/login",100);break;
                case 403: err.message = '拒绝访问(403)';break;
                case 404: err.message = '请求错误(404)';break;
                case 408: err.message = '服务器错误(500)';break;
                case 501: err.message = '服务器未实现(501)';break;
                case 502: err.message = '网络错误(503)';break;
                case 503: err.message = '服务不可用(503)';break;
                case 504: err.message = '网络超时(504)';break;
                case 505: err.message = 'HTTP版本不受支持(505)';break;
                default: err.message = `错误类型(${err.response.status})`
            }
            // err.message = err.response.statusText;
            // err.code = err.response.status;
        }else{
            err.message = '连接服务器失败！'
        }
        _onerror(err);
        return Promise.reject(err);
    }
)

export default service;
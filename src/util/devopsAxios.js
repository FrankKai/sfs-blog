/* 
    author: summer_mushroom@163.com
    date: 2017.11.09
    des: 使用axios处理ajax请求
*/
import axios from 'axios';
import store from 'js/store/index';
import {Notice} from 'iview';
import Cookies from 'js-cookie';

// 默认错误处理方式
const _onerror = function (error) {
        Notice.error({
            title: '请求错误',
            desc: error.response.data.data || error.message || '请求发生错误'
        });
    
}

// 将obj转化成为form-data格式的数据
const _formlize = function (obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += _formlize(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                var str = 'labels+\[+[0-9]+\]$';
                if (name.match('labels') && !name.match(str)) {
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += _formlize(innerObj) + '&';
                } else {
                    fullSubName = name + '.' + subName + '';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += _formlize(innerObj) + '&';
                }
            }
        } else if (value == null || value === '') {
            delete obj[name];
        } else {
            query += encodeURIComponent(name) + '=' + encodeURIComponent((value == null ? '' : value)) + '&';
        }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
}

// 错误处理方法
let errorfn = _onerror;

const service = axios.create({
    baseURL: '/moon',
    timeout: 5000
});

// request拦截器
service.interceptors.request.use(config => {
    config.method = config.method || 'GET';
    config.data = config.data || {};
    errorfn = typeof config.onerror === 'function' ? config.onerror : _onerror;
    // 判断是否有token存在，若存在则携带token发送请求
    if (Cookies.get('token')) {
        config.headers.common['Authorization'] = Cookies.get('token');
    }
    if (config.upload) {
        config.headers.common['Content-Type'] = 'multipart/form-data';
        config.transformRequest = (data, headers) => {
            let param = new FormData();
            for (name in data) {
                let value = data[name];
                if (value instanceof Object) {
                    if(value.length){
                        for (let i = 0; i < value.length; i++) {
                            param.append(name, value[i], value[i].name);
                        }
                    }else{
                        param.append(name, value, value.name);
                    }
                    
                } else {
                    param.append(name, value);
                }
            }
            return param;
        };
    }

    // 若formlize==true ,则将数据转化为form-data的形式
    if (config.formlize) {
        config.transformRequest = (data, headers) => {
            return _formlize(data);
        }
    }

    return config;
}, error => {
    errorfn.apply(this, arguments);
    return Promise.reject(error);
});

// response拦截器
service.interceptors.response.use(response => {
    if (response.status >= 400 || response.status < 200) {
        errorfn.apply(this, arguments);
    }
    return response;
}, error => {
    errorfn.apply(this, arguments);
    return Promise.reject(error);
});

export default service;
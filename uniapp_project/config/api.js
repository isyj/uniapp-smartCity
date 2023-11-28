const http = uni.$u.http

/*
// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
*/


//post请求，登录接口验证账号密码，获取登录token
export const postLogin = (params) => http.post('/prod-api/api/login', params)


// get请求，获取首页轮播图
export const getIndexSwiper = (data) => http.get('/prod-api/api/rotation/list', data)


// get请求，获取全部服务
export const getServe = (data) => http.get('/prod-api/api/service/list', data)


// get请求，获取新闻列表
export const getNewsList = (data) => http.get('/prod-api/press/press/list', data)


// get请求，获取新闻分类
export const getNewsCategory = (data) => http.get('/prod-api/press/category/list', data)


// get请求，获取新闻详情信息
export const getNewsDetails = (data, id) => http.get('/prod-api/press/press/' + id, data)

// get请求，获取停车场列表信息
export const getParkList = (data) => http.get('/prod-api/api/park/lot/list', data)

// get请求，获取停车场详情信息
export const getParkDetails = (data, id) => http.get('/prod-api/api/park/lot/' + id, data)
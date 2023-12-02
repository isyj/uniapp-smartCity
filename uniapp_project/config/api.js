const http = uni.$u.http

/*
// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
*/


// post请求 文件上传接口
export const postLoadFile = (params) => http.upload('/prod-api/common/upload', params)

//post请求，登录接口验证账号密码，获取登录token
export const postLogin = (params) => http.post('/prod-api/api/login', params)

//post请求，登录接口验证账号密码，获取登录token
export const postRegister = (params) => http.post('/prod-api/api/register', params)

// get请求，获取个人信息
export const getUserInfo = (data) => http.get('/prod-api/api/common/user/getInfo', data)

// put请求 上传修改的个人信息
export const putUserInfo = (params) => http.put('/prod-api/api/common/user', params)

// put请求 修改密码
export const putUserPassword = (params) => http.put('/prod-api/api/common/user/resetPwd', params)

// get请求，获取订单
export const getAllOrder = (data) => http.get('/prod-api/api/allorder/list', data)

// post请求，提交意见反馈信息
export const postFeedback = (params) => http.post('/prod-api/api/common/feedback', params)

// get请求，获取意见反馈列表
export const getFeedbackList = (data) => http.get('/prod-api/api/common/feedback/list', data)

// get请求，获取意见反馈详情
export const getFeedbackDetails = (data, id) => http.get(`/prod-api/api/common/feedback/${id}`, data)



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



// get请求，获取图书馆列表
export const getLibraryList = (data) => http.get('/prod-api/api/digital-library/library/list', data)

// get请求，获取图书馆详情信息
export const getLibraryDetails = (data, id) => http.get(`/prod-api/api/digital-library/library/${id}`, data)

// get请求，获取图书馆评论
export const getLibraryComment = (data) => http.get('/prod-api/api/digital-library/library-comment/list', data)

// get请求，获取青年驿站列表
export const getYouthStationList = (data) => http.get('/prod-api/api/youth-inn/youth-inn/list', data)

// get请求，获取青年驿站详情
export const getYouthStationDetails = (data, id) => http.get('/prod-api/api/youth-inn/youth-inn/' + id, data)

// get请求，获取人才区域列表
export const getTalentPolicyArea = (data) => http.get('/prod-api/api/youth-inn/talent-policy-area/list', data)

// get请求，获取人才区域详情
export const getTalentPolicy = (data, id) => http.get('/prod-api/api/youth-inn/talent-policy-area/' + id, data)

// get请求，获取指定区域人才区域详情
export const getTalentPolicyDetails = (data) => http.get('/prod-api/api/youth-inn/talent-policy/list', data)

// get请求，获取指定人才区域详情
export const getTalentPolicyDetailsInfo = (data, id) => http.get('/prod-api/api/youth-inn/talent-policy/' + id, data)
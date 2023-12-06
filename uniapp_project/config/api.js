const http = uni.$u.http

/*
// post请求，获取菜单
export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const getMenu = (data) => http.get('/ebapi/public_api/index', data)
*/


// get请求，获取字典
export const getDataType = (data, dictType) => http.get('/prod-api/system/dict/data/type/' + dictType, data)



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

// get请求，获人才区域详情
export const getTalentPolicy = (data, id) => http.get('/prod-api/api/youth-inn/talent-policy-area/' + id, data)

// get请求，获取人才区域政策列表
export const getTalentPolicyDetails = (data) => http.get('/prod-api/api/youth-inn/talent-policy/list', data)

// get请求，获取人才区域政策详情
export const getTalentPolicyDetailsInfo = (data, id) => http.get('/prod-api/api/youth-inn/talent-policy/' + id, data)



// get请求，获取活动轮播图
export const getActivitySwiper = (data) => http.get('/prod-api/api/activity/rotation/list', data)

// get请求，获取活动详情
export const getActivityDetails = (data, id) => http.get('/prod-api/api/activity/activity/' + id, data, id)

// get请求，获取活动分类
export const getActivityCategory = (data, id) => http.get('/prod-api/api/activity/category/list', data)

// get请求，获取活动列表
export const getActivityList = (data) => http.get('/prod-api/api/activity/activity/list', data)

// get请求，获取活动评论列表
export const getActivityCommonList = (data, id) => http.get('/prod-api/api/activity/comment/list', data, id)

// post请求，发表评论
export const postActivityCommon = (params) => http.post('/prod-api/api/activity/comment', params)

// post请求，报名活动
export const postActivitySignup = (params) => http.post('/prod-api/api/activity/signup', params)

// post请求，判断是否报名
export const postActivitySignupCheck = (params) => http.get('/prod-api/api/activity/signup/check', params)



// get请求，获取爱心捐赠轮播图
export const getWelfareBannerList = (data) => http.get('/prod-api/api/public-welfare/ad-banner/list', data)

// get请求，获取公益分类
export const getWelfareClassifyList = (data) => http.get('/prod-api/api/public-welfare/public-welfare-type/list', data)

// get请求，分类获取公益活动
export const getWelfareActivityList = (data) => http.get(
	'/prod-api/api/public-welfare/public-welfare-activity/list', data)

// get请求，获取推荐公益活动
export const getWelfareRecommendActivityList = (data) => http.get(
	'/prod-api/api/public-welfare/public-welfare-activity/recommend-list', data)

// post请求，发起捐款
export const getWelfareDonateRecord = (params) => http.post('/prod-api/api/public-welfare/donate-record', params)



// get请求，获取政府服务热线轮播图
export const getHotlineSwiper = (data) => http.get('/prod-api/api/gov-service-hotline/ad-banner/list', data)

// get请求，获取政府服务分类
export const getHotlineCategoryList = (data) => http.get('/prod-api/api/gov-service-hotline/appeal-category/list', data)

// get请求，获取政府服务分类诉求列表
export const getHotlineCategoryDetails = (data) => http.get('/prod-api/api/gov-service-hotline/appeal/list', data)

// get请求，获取政府服务分类详情
export const getHotlineMyList = (data) => http.get('/prod-api/api/gov-service-hotline/appeal/my-list', data)

// get请求，获取政府服务分类详情
export const getHotlineAppealDetails = (data, id) => http.get('/prod-api/api/gov-service-hotline/appeal/' + id, data)

// post请求，发起诉求
export const postHotlineAppeal = (params) => http.post('/prod-api/api/gov-service-hotline/appeal', params)



// get请求，获取房源列表
export const getHomeList = (data) => http.get('/prod-api/api/house/housing/list', data)
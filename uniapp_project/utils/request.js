//请求封装
const baseUrl = 'http://124.93.196.45:10001'

const header = {
	Authorization: uni.getStorageSync('token')
}

const request = (url, data = {}, method = 'GET') => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header,
			method,
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}



//请求拦截
//白名单
const whiteList = [
	'/pages/user/login'
]
//判断是否登录
const intercept = {
	invoke(options) {
		if (Boolean(uni.getStorageSync('token')) || whiteList.indexOf(options.url) >= 0) {
			return true
		} else {
			uni.showToast({
				title: '请登录',
				icon: 'error'
			})
			uni.reLaunch({
				url: '/pages/user/user',
			})
			return false
		}

	},
	success(options) {

	},
}

uni.addInterceptor('navigateTo', intercept)

export default request
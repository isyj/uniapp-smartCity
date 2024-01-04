// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = 'http://124.93.196.45:10001'; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		config.header = {
			...config.header,
			Authorization: uni.getStorageSync('token')
		}


		// 根据custom参数中配置的是否需要token，添加对应的请求头
		// config.header['cookie'] = uni.getStorageSync('cookie')
		// if (uni.getStorageSync('token')) {
		// 	// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		// } else {
		// 	uni.reLaunch({
		// 		url: '/pages/user/user'
		// 	})
		// }
		// console.log(config);
		return config

	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data

		// 自定义参数
		const custom = response.config?.custom
		if (data.code == 401) {
			uni.switchTab({
				url: '/pages/user/user'
			})
			uni.showToast({
				title: '请登录',
				icon: 'error'
			})
		}

		// 	// 如果需要catch返回，则进行reject
		// 	if (custom?.catch) {
		// 		return Promise.reject(data)
		// 	} else {
		// 		// 否则返回一个pending中的promise，请求不会进入catch中
		// 		return new Promise(() => {})
		// 	}
		// }
		// return data.data === undefined ? {} : data.data
		return data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
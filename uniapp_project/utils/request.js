const baseUrl = 'http://124.93.196.45:10001'

const header = {
	Authorization : uni.getStorageSync('token')
}

const request = (url, data = {}, method = 'GET') => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl+url,
			header,
			method,
			data,
			success: (res) => {
				resolve(res)
			},
			fail: () => {
				reject(err)
			}
		});
	})
}

export default request
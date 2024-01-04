import App from './App'
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
//服务器地址
var ip = 'http://124.93.196.45:10001'
Vue.prototype.ip = ip

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
// 引入请求封装，将app参数传递到配置中
require('./config/request.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
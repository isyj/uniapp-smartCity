<template>
	<view class="home">
		<indexNavBar></indexNavBar>
		<indexSwiper></indexSwiper>
		<indexServe></indexServe>
		<indexHotModule></indexHotModule>
		<indexNewsList></indexNewsList>
	</view>
</template>

<script>
	import indexSwiper from '../../components/indexSwiper/indexSwiper.vue'
	import indexNavBar from '../../components/indexNavBar/indexNavBar.vue'
	import indexServe from "../../components/indexServe/indexServe.vue"
	import indexModuleHot from "../../components/indexHotModule/indexHotModule.vue"
	import indexNewsList from "../../components/indexNewsList/indexNewsList.vue"


	import {
		getUserInfo
	} from "../../config/api.js"
	export default {
		data() {
			return {

			};
		},
		onPullDownRefresh() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">
</style>
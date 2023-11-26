<template>
	<view class="">
		<u-button class="button" @click="login()" type="primary">登录</u-button>
		<u-button class="button" @click="logout()" type="primary" color='#f56c6c'>注销</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			login() {
				if (uni.getStorageSync('token')) {
					uni.showToast({
						title: '您已登录',
						icon: 'error'
					})
				} else {
					uni.navigateTo({
						url: '/pages/user/login'
					})
				}
			},
			logout() {
				if (Boolean(uni.getStorageSync('token'))) {
					uni.clearStorage()
					uni.showToast({
						title: '注销成功'
					})
				} else {
					uni.showToast({
						title: '您还未登录',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.button {
		margin-top: 25rpx;
		width: 80%;
		color: white;
		font-size: 40rpx;
		font-family: '苹方-简';
	}
</style>
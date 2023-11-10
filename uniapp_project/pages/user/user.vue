<template>
	<view class="">
		<button @click="login()" type="primary">登录</button>
		<button @click="logout()" type="primary">注销</button>
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
				uni.navigateTo({
					url: '/pages/user/login',
				});
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
	button {
		margin-top: 25rpx;
		width: 80%;
		color: white;
		font-weight: bold;
	}
</style>
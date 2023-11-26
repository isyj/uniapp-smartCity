<template>
	<view class="home">
		<view class="button">
			<u-button class="custom-style" @click="login()" type="primary" shape="circle">登录</u-button>
			<u-button class="custom-style" @click="logout()" type="primary" shape="circle" color='#f56c6c'>注销</u-button>
		</view>
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
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.button {
			width: 80%;

			.custom-style {
				margin-top: 25rpx;
				color: white;
				font-size: 40rpx;
				font-family: '苹方-简';
			}
		}
	}
</style>
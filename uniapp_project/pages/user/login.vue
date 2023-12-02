<template>

	<view class="content">
		<view class="login">
			<view class="txt">登录</view>
			<view class="input">
				<input type="text" v-model="username" />
				<input type="password" v-model="password" />
				<button @click="submit()">登录</button>

				<view class="register" @click="register()">
					注册
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		postLogin,
	} from "../../config/api.js"
	export default {
		data() {
			return {
				username: 'imxiaochen',
				password: 'imxiaochen0v0'
			};
		},
		methods: {
			async submit() {
				await postLogin({
					username: this.username,
					password: this.password
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
								title: res.msg,
								icon: 'success',
							}),
							uni.setStorageSync('token', res.token),
							uni.switchTab({
								url: '/pages/index/index'
							})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
					}
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/user/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		box-sizing: border-box;
		background-color: #f0f0f0;
		height: 100%;
		flex: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.login {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			background-color: black;
			width: 80%;
			height: 45%;
			border-radius: 10px;
			background-color: #fff;
			align-items: center;

			.txt {
				color: pink;
				font-family: '苹方-简';
				font-size: 50rpx;
				margin-top: 80rpx;
			}

			.input {
				width: 75%;
				height: 40%;
				margin-top: 70rpx;
				color: pink;

				input {
					padding: 5rpx;
					border-bottom: 2px solid pink;
					margin-bottom: 20rpx;
				}

				button {
					background-color: pink;
					color: white;
					font-family: '苹方-简';
					margin-top: 50rpx;
				}

				.register {
					margin: 10rpx auto;
					width: 20%;
					text-align: center;
				}
			}

		}
	}
</style>
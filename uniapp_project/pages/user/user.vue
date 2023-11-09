<template>
	<view class="content">
		<view class="login">
			<view class="txt">登录</view>
			<view class="input">
				<input type="text" v-model="username" />
				<input type="password" v-model="password" />
				<button @click="submit()">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: 'tb123',
				password: '123456'
			};
		},
		methods: {
			submit() {
				this.$request('/prod-api/api/login', {
					username: this.username,
					password: this.password
				}, 'POST').then(res => {
					if (res.data.code === 200) {
						uni.showToast({
							title: '登录成功',
							icon: 'success',
						})
					} else {
						uni.showToast({
							title: '用户不存在/密码错误',
							icon: 'none',
						})
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		box-sizing: border-box;
		background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
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
			height: 50%;
			border-radius: 10px;
			background-color: #fff;
			align-items: center;

			.txt {
				color: #00D1FF;
				font-weight: bold;
				font-size: 50rpx;
				margin-top: 80rpx;
			}

			.input {
				width: 75%;
				height: 40%;
				margin-top: 100rpx;
				color: #00D1FF;

				input {
					padding: 5rpx;
					border-bottom: 2px solid #00D1FF;
					margin-bottom: 20rpx;
				}

				button {
					background-color: #00D1FF;
					color: white;
					font-weight: bold;
					margin-top: 50rpx;
				}
			}

		}
	}
</style>
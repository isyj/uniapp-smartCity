<template>
	<view class="home">

		<uni-card>
			<uni-card :isFull="true" :title="this.userInfo.nickName" :sub-title="this.userInfo.email"
				:thumbnail="ip + this.userInfo.avatar" @click="login()">
				<text>ID ：{{ this.userInfo.userId }}</text>
			</uni-card>
			<br />
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="">
				订单列表
			</view>
			<u-divider></u-divider>
			<view class="">
				修改密码
			</view>
			<u-divider></u-divider>
			<view class="">
				意见反馈
			</view>
			<br />
			<u-button type="error" text="退出登录" @click="logout()"></u-button>
		</uni-card>

	</view>
</template>

<script>
	import {
		getUserInfo
	} from "../../config/api.js"
	export default {
		data() {
			return {
				userInfo: {
					nickName: '未登录',
					email: 'none',
					userId: 'none'
				}
			}
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
					uni.clearStorage('token')
					uni.showToast({
						title: '注销成功'
					})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: '您还未登录',
						icon: 'error'
					})
				}
			}
		},
		async onShow() {
			if (uni.getStorageSync('token')) {
				await getUserInfo().then(res => {
					this.userInfo = res.user
				})
			}

		}
	}
</script>

<style lang="scss">
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>
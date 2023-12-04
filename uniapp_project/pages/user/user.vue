<template>
	<view class="home">

		<uni-card>
			<uni-card isFull :title="this.userInfo.nickName" :sub-title="this.userInfo.email"
				:thumbnail="ip + this.userInfo.avatar" @click="login()">
				<text>ID ：{{ this.userInfo.userId }}</text>
			</uni-card>
			<br />
			<view class="" @click="jump('userInfo')">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="" @click="jump('allOrder')">
				订单列表
			</view>
			<u-divider></u-divider>
			<view class="" @click="jump('password')">
				修改密码
			</view>
			<u-divider></u-divider>
			<view class="" @click="jump('feedback')">
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
					userId: 'none'
				}
			}
		},
		methods: {
			login() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/user/login'
					})
				}
			},
			logout() {
				if (Boolean(uni.getStorageSync('token'))) {
					uni.removeStorageSync('token')
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
			},
			jump(link) {
				uni.navigateTo({
					url: '/pages/user/' + link
				})
			}
		},
		async onShow() {
			if (uni.getStorageSync('token')) {
				await getUserInfo().then(res => {
					this.userInfo = res.user
					uni.setStorageSync('userInfo', this.userInfo)
				})
			}

		}
	}
</script>

<style lang="scss">

</style>
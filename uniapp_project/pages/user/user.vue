<template>
	<view class="home">

		<uni-card>
			<uni-card :isFull="true" :title="this.userInfo.nickName" :sub-title="this.userInfo.email"
				:thumbnail="ip+this.userInfo.avatar" @click="login()">
				<text>ID ：{{this.userInfo.userId}}</text>
			</uni-card>
			<br />
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
			<view class="">
				个人信息
			</view>
			<u-divider></u-divider>
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
				userInfo: {}
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
		},
		onLoad() {
			getUserInfo().then(res => {
				if (res.data === 200) {
					this.userInfo = res.user
				} else {
					this.userInfo = {
						nickName: "***",
						email: "***",
						userId: "********"
					}
				}
			})

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
<template>
	<view>

		<u-navbar autoBack :title="list.name" placeholder=""></u-navbar>

		<!-- 活动内容 -->
		<view class="content">
			<uni-card>
				<u-parse :content="this.list.content"></u-parse>
			</uni-card>
		</view>

		<!-- tabs -->
		<u-tabs :list="classify" @click="clickTabs" :activeStyle="{transform: 'scale(1.15)',color:'pink'}"
			:inactiveStyle="{
			transform: 'scale(1.1)' }" itemStyle="width:27%; height:75rpx" lineWidth="100rpx" lineColor="pink"></u-tabs>


		<!-- 评论 -->
		<view v-if="this.count==0">
			<uni-card>
				<u--textarea v-model="common" placeholder="请输入内容" count height="120"></u--textarea>
				<br />
				<u-button type="primary" text="发表评论" @click="clickBtn()"></u-button>
			</uni-card>
			<uni-card :title="item.nickName" thumbnail="" extra="额外信息" note="Tips" v-for="(item,index) in commonList"
				:key="index">
				{{item.content}}
			</uni-card>
		</view>


		<!-- 参加活动 -->
		<view v-if="this.count==1">
			<uni-card>
				<u-button :type="btn()" @click="signup()">{{signupCheck==true?"已报名":"报名"}}</u-button>
			</uni-card>
		</view>


		<!-- 活动推荐 -->
		<view v-if="this.count==2">
			<uni-card note="Tips" v-for="(item,index) in recommendList" :key="index">
				<image slot="title" :src="ip+item.imgUrl" mode=""></image>{{item.name}}
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getActivityDetails,
		getActivityCommonList,
		postActivityCommon,
		getActivityList,
		postActivitySignup,
		postActivitySignupCheck
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				commonList: [],
				classify: [{
					name: '查看评论'
				}, {
					name: '参加活动'
				}, {
					name: '活动推荐'
				}],
				show: false,
				count: 0,
				common: '',
				activityId: '',
				recommendList: '',
				signupCheck: ''
			}
		},
		methods: {
			//报名活动
			async signup() {
				// 发起报名请求
				await postActivitySignup({
					activityId: this.activityId
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
				// 检查是否报名活动
				await postActivitySignupCheck({
					params: {
						activityId: this.activityId
					}
				}).then(res => {
					this.signupCheck = res.isSignup
				})
			},
			//点击tabs
			clickTabs(item) {
				this.count = item.index
			},
			//发表评论
			clickBtn() {
				//发起评论请求
				postActivityCommon({
					activityId: this.activityId,
					content: this.common
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
				//重新获取评论列表
				getActivityCommonList({
					params: {
						activityId: this.activityId
					}
				}).then(res => {
					this.commonList = res.rows.slice(0, 20)
				})
			},
			//报名按钮样式
			btn() {
				if (this.signupCheck == true) {
					return 'error'
				} else {
					return 'primary'
				}
			}


		},
		onLoad(e) {
			this.activityId = e.id
			//获取活动详情
			getActivityDetails({}, this.activityId).then(res => {
				this.list = res.data
			})
			//获取活动列表
			getActivityCommonList({
				params: {
					activityId: this.activityId
				}
			}).then(res => {
				this.commonList = res.rows.slice(0, 20)
			})
			//获取推荐活动列表
			getActivityList({
				params: {
					recommend: 'Y'
				}
			}).then(res => {
				this.recommendList = res.rows
			})
			// 检查是否报名活动
			postActivitySignupCheck({
				params: {
					activityId: this.activityId
				}
			}).then(res => {
				this.signupCheck = res.isSignup
			})

		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin: 20rpx 0 0 0;
		border-radius: 5px;
	}
</style>
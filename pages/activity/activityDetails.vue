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
			<uni-card :title="item.nickName" :subTitle="item.commentTime" note="Tips" v-for="(item,index) in commonList"
				:key="index">
				{{item.content}}
			</uni-card>
			<u-loadmore @loadmore="loadMore" :status="status" fontSize="30rpx" color="#bbb" />
		</view>


		<!-- 参加活动 -->
		<view v-if="this.count==1">
			<uni-card padding="0 0 200rpx 0" :border="false" shadow="0 0">
				<u-button size="large" :type="btn()" @click="signup()">{{signupCheck==true?"已报名":"报名"}}</u-button>
			</uni-card>
		</view>


		<!-- 活动推荐 -->
		<view v-if="this.count==2">
			<view @click="jump(item.id)" v-for="(item,index) in recommendList" :key="index">
				<uni-card>
					<image slot="title" :src="ip+item.imgUrl" mode=""></image>{{item.name}}
				</uni-card>
			</view>
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
				signupCheck: '',
				pageNum: 1,
				status: 'loadmore'
			}
		},
		methods: {
			/* 报名活动 */
			async signup() {
				await postActivitySignup({
					activityId: this.activityId
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
				await postActivitySignupCheck({
					params: {
						activityId: this.activityId
					}
				}).then(res => {
					this.signupCheck = res.isSignup
				})
			},
			/* 点击tabs */
			clickTabs(item) {
				this.count = item.index
			},
			/* 发表评论 */
			clickBtn() {
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
				getActivityCommonList({
					params: {
						activityId: this.activityId,
						pageSize: '10',
						pageNum: 1
					}
				}).then(res => {
					this.commonList = res.rows
				})
			},
			/* 报名按钮样式 */
			btn() {
				if (this.signupCheck == true) {
					return 'error'
				} else {
					return 'primary'
				}
			},
			/* 点击推荐活动卡片 */
			jump(id) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails?id=' + id
				})
			},
			//加载更多评论
			loadMore() {
				this.status = 'loading'
				this.pageNum += 1
				getActivityCommonList({
					params: {
						activityId: this.activityId,
						pageSize: '10',
						pageNum: this.pageNum
					}
				}).then(res => {
					if (this.commonList.length < res.total) {
						this.commonList = this.commonList.concat(res.rows)
						this.status = 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			}

		},
		onLoad(e) {
			this.activityId = e.id
			getActivityDetails({}, this.activityId).then(res => {
				this.list = res.data
			})
			getActivityCommonList({
				params: {
					activityId: this.activityId,
					pageSize: '10',
					pageNum: this.pageNum
				}
			}).then(res => {
				this.commonList = res.rows
			})
			getActivityList({
				params: {
					recommend: 'Y'
				}
			}).then(res => {
				this.recommendList = res.rows
			})
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
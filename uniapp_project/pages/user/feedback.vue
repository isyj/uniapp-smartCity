<template>
	<view>

		<uni-card>

			<text>标题</text>
			<uni-easyinput placeholder="请输入标题" v-model="title"></uni-easyinput>


			<br />


			<text>内容</text>
			<uni-easyinput type="textarea" placeholder="请输入内容" maxlength="150" v-model="content"></uni-easyinput>


			<br />

			<u-button type="primary" @click="submit()">提交</u-button>

			<view class="jumpFeedbackList" @click="jumpFeedbackList()">
				查询历史反馈信息
			</view>

		</uni-card>

	</view>
</template>

<script>
	import {
		postFeedback
	} from "../../config/api.js"
	export default {
		data() {
			return {
				title: '',
				content: '',
			};
		},
		methods: {
			submit() {
				postFeedback({
					title: this.title,
					content: this.content
				}).then(res => {
					uni.showToast({
						title: res.msg
					})
				})
			},
			jumpFeedbackList() {
				uni.navigateTo({
					url: '/pages/user/feedbackList',

				});
			}
		}
	}
</script>

<style lang="scss">
	text {
		font-size: 35rpx;
	}

	.jumpFeedbackList {
		margin: 20rpx auto;
		width: 40%;
		height: 50rpx;
		color: #aaa;
	}
</style>
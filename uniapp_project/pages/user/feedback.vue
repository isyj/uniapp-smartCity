<template>
	<view>

		<uni-card is-full padding="10rpx">

			<text>标题</text>
			<uni-easyinput placeholder="请输入标题" v-model="title"></uni-easyinput>


			<br />


			<text>内容</text>
			<uni-easyinput type="textarea" placeholder="请输入内容" maxlength="150" v-model="content"></uni-easyinput>


			<br />

			<u-button type="primary" @click="submit()">提交</u-button>

		</uni-card>

	</view>
</template>

<script>
	import {
		postFeekback
	} from "../../config/api.js"
	export default {
		data() {
			return {
				title: '',
				content: ''
			};
		},
		methods: {
			submit() {
				console.log(this.title);
				postFeekback({
					title: this.title,
					content: this.content
				}).then(res => {
					uni.showToast({
						title: res.msg
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	text {
		font-size: 35rpx;
	}
</style>
<template>
	<view>
		<view class="card">
			<uni-card :title="list.title" :subTitle="list.author" :extra="list.createTime" note="Tips">
				<u-parse :content="list.content" domain="ip"></u-parse>
			</uni-card>
		</view>


		<!-- 评论 -->
		<view>
			<uni-card>
				<u--textarea maxlength="30" v-model="content" placeholder="请输入内容" count></u--textarea>
				<br>
				<u-button type="error" @click="submit()">提交</u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
import {
	getGarbageNewsDetalis,
	postGarbageNewsComment
} from "../../config/api.js"
export default {
	data() {
		return {
			list: {},
			newsId: 0,
			content: ''
		};
	},
	async onLoad(e) {
		//新闻id
		this.newsId = e.id
		console.log(this.newsId);
		//获取新闻详情
		await getGarbageNewsDetalis({}, e.id).then(res => {
			uni.setNavigationBarTitle({
				title: res.data.title
			})
			this.list = res.data
		})
	},
	methods: {
		//提交评论
		submit() {
			postGarbageNewsComment({
				newsId: this.newsId,
				content: this.content
			}).then(res => {
				if (res.code == 200) {
					uni.showToast({
						title: res.msg
					})
				}
			})
		}
	},
}
</script>

<style lang="scss"></style>
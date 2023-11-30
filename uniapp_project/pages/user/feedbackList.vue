<template>
	<view>
		<uni-card :title="item.title" :extra="item.createTime" v-for="(item,index) in list" :key="index"
			@click="jump(item.id)">
			<u--text :text="item.content" lines="1"></u--text>
			<view style="margin-left: 75%;">
				id ：{{item.id}}
			</view>
		</uni-card>

	</view>
</template>

<script>
	import {
		getFeedbackList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			getFeedbackList().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			jump(id) {
				uni.navigateTo({
					url: `/pages/user/feedbackDetails?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
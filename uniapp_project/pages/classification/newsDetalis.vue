<template>
	<view>
		<uni-card :title="list.title" :subTitle="list.author" :extra="list.createTime" note="Tips">
			<u-parse :content="list.content" domain="ip"></u-parse>
		</uni-card>
	</view>
</template>

<script>
	import {
		getGarbageNewsDetalis
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {}
			};
		},
		async onLoad(e) {
			//获取新闻详情
			await getGarbageNewsDetalis({}, e.id).then(res => {
				uni.setNavigationBarTitle({
					title: res.data.title
				})
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">

</style>
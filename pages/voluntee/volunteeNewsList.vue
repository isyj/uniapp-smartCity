<template>
	<view>
		<view class="news">
			<uni-card :title="data.title" :subTitle="data.createTime" note="Tips">
				<image slot="cover" :src="ip + data.imgUrl" mode="aspectFill"></image>
				<view class="txt">
					<u-parse :content="data.content"></u-parse>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getVolunteerNewsDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				data: {}
			};
		},
		async onLoad(e) {
			// 获取新闻详情信息
			await getVolunteerNewsDetails({}, e.id).then(res => {
				this.data = res.data
			})
			uni.setNavigationBarTitle({
				title: this.data.title
			})
		}
	}
</script>

<style lang="scss">
	.news {
		image {
			width: 100%;
			height: 450rpx;
			border-radius: 5rpx;
			margin: 20rpx 0;
		}
	}
</style>
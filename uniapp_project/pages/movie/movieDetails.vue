<template>
	<view>
		<view class="card">
			<uni-card :title="data.name" :subTitle="data.playDate" :extra="data.likeNum+'人想看'" note="Tips">
				<image slot="cover" :src="ip + data.cover" mode="aspectFill"></image>
				<view class="">
					评分：{{data.score}}星
				</view>
				<br />
				<u-button type="error" text="主页" @click="back()"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getMovieDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				data: {}
			};
		},
		async onLoad(e) {
			//获取电影详情
			await getMovieDetails({}, e.id).then(res => {
				console.log(res);
				this.data = res.data
			})
			await uni.setNavigationBarTitle({
				title: this.data.name
			})
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.card {
		image {
			width: 100%;
			height: 450rpx;
			margin: 20rpx 0;
			border-radius: 5px;
		}
	}
</style>
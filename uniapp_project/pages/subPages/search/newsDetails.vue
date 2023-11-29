<template>
	<view class="home">
		<view class="u-content">
			<uni-nav-bar rightWidth="50rpx" leftWidth="80rpx" left-icon="back" :title="this.list.title" statusBar
				@clickLeft="backSearch()"></uni-nav-bar>
		</view>
		<u-parse class="content" :content="this.list.content" :domain="this.ip" :tagStyle="style"></u-parse>
	</view>
</template>

<script>
	import {
		getNewsDetails
	} from "../../../config/api.js"
	export default {
		data() {
			return {
				list: {},
				style: {
					img: 'width: 100%'
				}
			}
		},
		onLoad(e) {
			getNewsDetails({}, e.id).then(res => {
				this.list = res.data
			})
		},
		methods: {
			backSearch() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.home {
		background-color: #f0f0f0;

		.content {
			background-color: #fff;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 20rpx;
			margin: 20rpx;
		}
	}
</style>
<template>
	<view class="home">
		<view class="nav">
			<uni-nav-bar rightWidth="10rpx" leftWidth="50rpx" left-icon="back" :title="this.list.title" statusBar
				@clickLeft="backSearch()"></uni-nav-bar>
		</view>
		<view class="content" v-html="this.list"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad(e) {
			this.$request('/prod-api/press/press/' + e.id, '', 'GET').then(res => {
				this.list = res.data.data.content.replace(/\/prod-api/g,
					'http://124.93.196.45:10001/prod-api')

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

			/deep/img {
				width: 100%;
			}
		}
	}
</style>
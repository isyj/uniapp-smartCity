<template>
	<view>
		<view class="nav">
			<uni-nav-bar rightWidth="10rpx" leftWidth="50rpx" left-icon="back" :title="this.list.title" statusBar
				@clickLeft="backSearch()"></uni-nav-bar>
		</view>
		<view class="content" v-html="this.list.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(e) {
			this.$request('/prod-api/press/press/' + e.id, '', 'GET').then(res => {
				this.list = res.data.data
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
	.content {
		box-sizing: border-box;
		padding: 20rpx;
	}
</style>
<template>
	<view class="home">
		<view class="u-content">
			<uni-nav-bar rightWidth="50rpx" leftWidth="80rpx" left-icon="back" :title="this.list.title" statusBar
				@clickLeft="backSearch()"></uni-nav-bar>
		</view>
		<uni-card padding="10rpx 0" margin="15rpx">
			<u-parse class="content" :content="this.list.content" :domain="this.ip" :tagStyle="style"></u-parse>
		</uni-card>

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

</style>
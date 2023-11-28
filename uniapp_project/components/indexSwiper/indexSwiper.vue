<template>
	<view class="content">
		<u-swiper :list="list" autoplay circular duration="500" previousMargin="10" nextMargin="10" bgColor="#fff"
			height="312rpx"></u-swiper>
	</view>
</template>

<script>
	import {
		getIndexSwiper
	} from "../../config/api.js"
	export default {

		data() {
			return {
				list: [],
			};
		},
		onLoad() {

		},
		methods: {

		},
		mounted() {
			getIndexSwiper({
				pageNum: 1,
				pageSize: 8,
				type: 2
			}).then(res => {
				for (let i = 0; i < res.rows.length; i++) {
					this.list.push('http://124.93.196.45:10001' + res.rows[i].advImg)
				}
			})
		}

	}
</script>

<style lang="scss">
	.content {
		margin: 10rpx 0;
	}
</style>
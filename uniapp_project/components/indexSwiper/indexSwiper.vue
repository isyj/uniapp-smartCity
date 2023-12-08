<template>
	<view class="content">
		<u-swiper :list="list" indicator="" autoplay circular duration="1000" previousMargin="10" nextMargin="10"
			bgColor="#fff" height="350rpx" @click="jump"></u-swiper>
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
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/index/newsDetails?id=' + this.list[item].id
				});
			}
		},
		async mounted() {
			await getIndexSwiper({
				type: 2
			}).then(res => {
				this.list = res.rows.map(e => ({
					url: this.ip + e.advImg,
					id: e.targetId
				}))
			})
		}

	}
</script>

<style lang="scss">
	.content {
		margin: 15rpx 0 0 0;
	}
</style>
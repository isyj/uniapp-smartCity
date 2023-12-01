<template>
	<view class="content">
		<u-swiper :list="list" autoplay circular duration="500" previousMargin="10" nextMargin="10" bgColor="#fff"
			height="350rpx" @click="jump()"></u-swiper>
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
			jump() {
				uni.navigateTo({
					url: '/pages/video'
				});
			}
		},
		async mounted() {
			await getIndexSwiper({
				pageNum: 1,
				pageSize: 8,
				type: 2
			}).then(res => {
				for (let i = 0; i < res.rows.length; i++) {
					this.list.push(this.ip + res.rows[i].advImg)
				}
			})
		}

	}
</script>

<style lang="scss">
	.content {
		margin: 15rpx 0 0 0;
	}
</style>
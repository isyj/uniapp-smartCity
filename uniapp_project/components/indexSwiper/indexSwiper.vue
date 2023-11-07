<template>
	<view class="content">
		<view class="banner">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item, index) in list" :key="index">
					<view class="swiper-item">
						<image class="img" :src="demo(item.advImg)" mode="" />
					</view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				list: [],
				url: 'http://124.93.196.45:10001'
			};
		},
		onLoad() {

		},
		methods: {
			demo(Img) {
				return this.url + Img
			}
		},
		mounted() {
			uni.request({
				method: 'GET',
				url: 'http://124.93.196.45:10001/prod-api/api/rotation/list?pageNum=1&pageSize=8&type=2',
				success: (res) => {
					this.list = res.data.rows
				}
			})
		}

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.banner {
			box-sizing: border-box;
			display: flex;
			width: 100%;
			padding: 10rpx 25rpx;
			border-radius: 5px;
			justify-self: center;
			align-items: center;
			overflow: hidden;
		}

		.swiper {
			width: 100%;
			height: 312rpx;

			.img {
				width: 100%;
				height: 312rpx;
				border-radius: 5px;
			}
		}


	}
</style>
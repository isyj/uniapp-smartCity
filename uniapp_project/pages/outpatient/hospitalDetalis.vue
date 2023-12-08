<template>
	<view>
		<view class="swiper">
			<u-swiper :list="swiperList" indicator="" circular="" duration="1000" height="350rpx" next-margin="10"
				previousMargin="10" bgColor="#ffffff"></u-swiper>
		</view>

		<view class="card">
			<uni-card :title="list.hospitalName" thumbnail="" :extra="list.level+'星'" note="Tips">
				<u-parse :content="list.brief"></u-parse>
				<br />
				<u-button type="error" text="预约挂号" @click="jump()"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHospitaDetalis,
		getHospitalSwiper
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {},
				swiperList: []
			};
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.hospitalName
			})
			//获取医院详情
			getHospitaDetalis({}, e.id).then(res => {
				this.list = res.data
			})
			//获取医院轮播图
			getHospitalSwiper({
				params: {
					hospitalId: e.id
				}
			}).then(res => {
				this.swiperList = res.data.map(e => ({
					url: this.ip + e.imgUrl
				}))
			})
		},
		methods: {
			//点击预约挂号按钮
			jump() {
				uni.navigateTo({
					url: "/pages/outpatient/patientInfo"
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}
</style>
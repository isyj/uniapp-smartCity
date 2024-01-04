<template>
	<view>
		<view class="swiper">
			<u-swiper :list="swiperList" circular="" indicator="" :autoplay="true" :interval="3000" :duration="1000"
				height="350rpx" nextMargin="10" previousMargin="10">
			</u-swiper>
		</view>


		<uni-section title="新闻列表" type="line" titleFontSize="35rpx"></uni-section>

		<!-- 新闻列表 -->
		<view class="news" v-for="(item,index) in newsList" :key="index" @click="jump(item)">
			<uni-card :title="item.title" :subTitle="item.createTime" note="Tips">
				<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
				<view class="txt">
					{{item.summary}}
				</view>
			</uni-card>
		</view>

		<!-- tabbar -->
		<u-tabbar :value="value" :placeholder="true" inactiveColor="pink" @change="change" :fixed="true"
			:safeAreaInsetBottom="false">
			<u-tabbar-item text="志愿活动" icon="twitter-circle-fill"></u-tabbar-item>
			<u-tabbar-item text="我的活动" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getVolunteerSwiper,
		getVolunteerNewsList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				newsList: [],
				value: ''
			};
		},
		async onLoad() {
			// 获取广告轮播图
			await getVolunteerSwiper().then(res => {
				this.swiperList = res.data.map(e => ({
					url: this.ip + e.imgUrl
				}))
			})
			// 获取新闻列表
			await getVolunteerNewsList().then(res => {
				this.newsList = res.rows.reverse()
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/voluntee/volunteeNewsList?id=' + item.id
				})
			},
			change(index) {
				if (index === 0) {
					uni.navigateTo({
						url: '/pages/voluntee/Volunteering'
					})
				}
				if (index === 1) {
					uni.navigateTo({
						url: '/pages/voluntee/myActivitity'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}

	.news {
		image {
			width: 100%;
			height: 350rpx;
			border-radius: 5rpx;
			margin: 20rpx 0;
		}
	}
</style>
<template>
	<view>
		<view class="swiper">
			<u-swiper :list="this.swiperList" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
				circular nextMargin="10" previousMargin="10" height="350rpx" bgColor="#ffffff" indicator
				@click="clickSwiper">
			</u-swiper>
		</view>


		<view class="tabs">
			<u-tabs :list="categoryList" @click="clickTabs" lineColor="pink" :activeStyle="{ transform:'scale(1.15)',
			color:'pink'}" :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1.1)'
    }" itemStyle="padding:25rpx; width:10%"></u-tabs>
		</view>

		<view class="list" v-for="(item,index) in activityList" :key="index" @click="jump(item.id)">
			<uni-card :title="item.name" note="Tips">
				<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
				<view class="">
					报名人数：{{item.signupNum}} <uni-icons type="auth"></uni-icons>
				</view>
				<view class="">
					点赞： {{item.likeNum}}<uni-icons type="heart"></uni-icons>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getActivitySwiper,
		getActivityCategory,
		getActivityList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				categoryList: [],
				activityList: []
			};
		},
		async onLoad() {
			await getActivitySwiper().then(res => {
				this.swiperList = res.rows.map(e => ({
					url: this.ip + e.advImg,
					id: e.targetId
				}))
			})
			await getActivityCategory().then(res => {
				this.categoryList = res.data.map(e => ({
					name: e.name,
					id: e.id
				}))
			})
			await getActivityList({
				params: {
					categoryId: this.categoryList[0].id
				}
			}).then(res => {
				this.activityList = res.rows
			})
		},
		methods: {
			clickSwiper(item) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails?id=' + this.swiperList[item].id
				})
			},
			clickTabs(item) {
				getActivityList({
					params: {
						categoryId: item.id
					}
				}).then(res => {
					this.activityList = res.rows
				})
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/activity/activityDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0 0 0;
	}

	image {
		width: 100%;
		height: 350rpx;
		margin: 20rpx 0 0 0;
		border-radius: 5px;

	}
</style>
<template>
	<view>
		<view class="swiper">
			<u-swiper :list="swiperList" indicator="" :autoplay="true" circular="" :interval="3000" :duration="1000"
				nextMargin="10" previousMargin="10" height="350rpx">
			</u-swiper>

			<u-search style="margin: 15rpx;" height="50rpx" v-model="keyword" @custom="search"
				@search="search"></u-search>
		</view>


		<uni-section title="电影列表" type="line" titleFontSize="35rpx"></uni-section>
		<view class="card" v-for="(item,index) in MovieList" :key="index" @click="jump(item)">
			<uni-card :title="item.name" :subTitle="item.playDate" :extra="item.duration+'分钟'" note="Tips">
				<image slot="cover" :src="ip + item.cover" mode="aspectFill"></image>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getMovieSwiper,
		getMovieList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				MovieList: [],
				keyword: ''
			}
		},
		async onLoad() {
			//获取轮播图
			await getMovieSwiper().then(res => {
				this.swiperList = res.rows.map(e => ({
					url: this.ip + e.advImg
				}))
			})
			//获取电影列表
			await getMovieList().then(res => {
				this.MovieList = res.rows
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/movie/movieDetails?id=' + item.id
				})
			},
			search() {
				getMovieList({
					params: {
						name: this.keyword
					}
				}).then(res => {
					this.MovieList = res.rows
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}

	.card {
		image {
			width: 100%;
			height: 350rpx;
			margin: 20rpx 0;
			border-radius: 5px;
		}
	}
</style>
<template>
	<view>
		<view class="swiper">
			<u-swiper :list="swiperList" indicator="" circular="" :autoplay="true" :interval="3000" :duration="1000"
				nextMargin="10" previousMargin="10" height="350rpx" bgColor="#ffffff">
			</u-swiper>
		</view>


		<!-- 新闻分类 -->
		<view class="newsClassify">
			<u-tabs :list="newsClassify" @change="change" lineColor="pink" :activeStyle="{color:'pink',
			transform:'scale(1.15)'}" :inactiveStyle="{transform:'scale(1.1)'}"
				itemStyle="padding:0; width:25%; height:40px"></u-tabs>
		</view>


		<!-- 新闻列表 -->
		<view class="news" v-for="(item,index) in newList" :key="index" @click="jump(item)">
			<uni-card padding="15rpx 0">
				<view class="newsCard">
					<view class="content">
						<view class="title">
							<u--text :text="item.title" lines="2"></u--text>
						</view>
						<view class="time">
							{{item.createTime}}
						</view>
					</view>
					<image :src="ip + item.imgUrl" mode="aspectFill"></image>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getGarbageSwiper,
		getGarbageNewsType,
		getGarbageNewsList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				newsClassify: [],
				newList: []
			};
		},
		async onLoad() {
			//获取轮播图
			await getGarbageSwiper().then(res => {
				this.swiperList = res.data.map(e => ({
					url: this.ip + e.imgUrl
				}))
			})
			//获取新闻分类
			await getGarbageNewsType().then(res => {
				this.newsClassify = res.rows.map(e => ({
					id: e.id,
					name: e.name
				}))
			})
			//获取某个分类新闻列表
			await getGarbageNewsList({
				params: {
					type: this.newsClassify[0].id
				}
			}).then(res => {
				this.newList = res.rows
			})
		},
		methods: {
			change(item) {
				//获取某个分类新闻列表
				getGarbageNewsList({
					params: {
						type: item.id
					}
				}).then(res => {
					this.newList = res.rows
				})
			},
			//点击新闻卡片
			jump(item) {
				uni.navigateTo({
					url: '/pages/classification/newsDetalis?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}

	.news {
		.newsCard {
			display: flex;
			justify-content: center;
			align-items: center;

			.content {
				padding: 15rpx;
				width: 100%;

				.title {
					font-weight: bold;
				}
			}

			image {
				width: 100%;
				height: 250rpx;
				border-radius: 5px;
			}
		}
	}
</style>
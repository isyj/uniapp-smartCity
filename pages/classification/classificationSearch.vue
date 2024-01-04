<template>
	<view>
		<view class="swiper">
			<u-swiper :list="list" indicator autoplay circular duration="1000" height="350rpx" next-margin="10"
				previous-margin="10" bg-color="#ffffff"></u-swiper>
		</view>

		<u-search placeholder="请输入垃圾分类" v-model="keyword" :clearabled="false" height="50rpx" style="margin: 15rpx;"
			@search="search()" @custom="search()"></u-search>
		<view>

			<uni-card>
				<view style="color: pink;">
					热门搜索
				</view>
				<u-grid col="3">
					<u-grid-item @click="jump(item)" v-for="(item, index) in hotList" :key="index"
						style="margin: 15rpx 0;">
						{{ item.keyword }}
					</u-grid-item>
				</u-grid>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getGarbagePosterList,
		getGarHotList
	} from "../../config/api.js";
	export default {
		data() {
			return {
				list: [],
				keyword: '',
				hotList: []
			}
		},
		onLoad() {
			//获取垃圾分类轮播图
			getGarbagePosterList().then((res) => {
				this.list = res.data.map(e => ({
					url: this.ip + e.imgUrl
				}));
			})
			//获取所有垃圾分类搜索热词
			getGarHotList({
				params: {
					pageNum: 1,
					pageSize: '21'
				}
			}).then((result) => {
				this.hotList = result.data.map(e => ({
					keyword: e.keyword,
				}));
			})
		},
		methods: {
			// 搜索
			search() {
				uni.navigateTo({
					url: '/pages/classification/searchDetalis?keyword=' + this.keyword
				})
			},
			jump(item) {
				uni.navigateTo({
					url: '/pages/classification/searchDetalis?keyword=' + item.keyword
				})
			}
		},

	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}
</style>
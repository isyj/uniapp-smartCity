<template>
	<view>
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper :list="swiperList" indicator :autoplay="true" :interval="3000" :duration="1000" circular=""
				height="350rpx" nextMargin="10" previousMargin="10" bgColor="#ffffff">
			</u-swiper>
		</view>


		<!-- 市民诉求分类 -->
		<uni-section title="诉求分类" sub-title="" type="line" titleFontSize="35rpx"></uni-section>
		<view class="classify">
			<swiper :indicator-dots="true" :duration="500">
				<swiper-item>
					<uni-card isFull="" padding="15rpx 0" shadow="0 0" :border="false">
						<u-grid col="4">
							<u-grid-item v-for="(item,index) in classifyList.slice(0,8)" :key="index"
								@click="jumpList(item)" style="margin: 0 0 15rpx 0;">
								<image :src="item.imgUrl" mode="widthFix"></image>
								<text>{{item.name}}</text>
							</u-grid-item>
						</u-grid>
					</uni-card>
				</swiper-item>
				<swiper-item>
					<uni-card isFull="" padding="15rpx 0" shadow="0 0" :border="false">
						<u-grid col="4">
							<u-grid-item v-for="(item,index) in classifyList.slice(8,16)" :key="index"
								@click="jumpList(item)" style="margin: 0 0 15rpx 0;">
								<image :src="item.imgUrl" mode="widthFix"></image>
								<text>{{item.name}}</text>
							</u-grid-item>
						</u-grid>
					</uni-card>
				</swiper-item>
			</swiper>
		</view>


		<!-- 我的诉求 -->
		<uni-section title="我的诉求" sub-title="" type="line" titleFontSize="35rpx"></uni-section>
		<view class="my">
			<uni-card :title="item.title" :subTitle="'提交时间：'+item.createTime" :extra="item.appealCategoryName"
				note="Tips" v-for="(item,index) in myList" :key="index" @click="jumpDetails(item)">
				承办单位：{{item.undertaker}}
				<br />
				处理状态：{{statusList[item.state]}}
				<br />
				处理结果：{{item.detailResult?item.detailResult:'暂无'}}
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHotlineSwiper,
		getHotlineCategoryList,
		getHotlineMyList,
		getDataType
	} from "../../config/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				classifyList: [],
				myList: [],
				statusList: []
			};
		},
		async onShow() {
			// 删除上次点击图标保存的分类id
			uni.removeStorageSync('appealCategoryId')
			//获取轮播图
			await getHotlineSwiper().then(res => {
				this.swiperList = res.data.map(e => ({
					url: this.ip + e.imgUrl
				}))
			})
			//获取诉求分类
			await getHotlineCategoryList().then(res => {
				this.classifyList = res.rows.map(e => ({
					imgUrl: this.ip + e.imgUrl,
					name: e.name,
					id: e.id
				}))
			})
			// 获取我的诉求
			await getHotlineMyList().then(res => {
				this.myList = res.rows.reverse().slice(0, 10)
			})
			//获取处理状态字典
			await getDataType({}, 'gsh_appeal_state').then(res => {
				this.statusList = res.data.map(e => e.dictLabel)
			})
		},
		methods: {
			//点击分类图标
			jumpList(item) {
				//保存点击图标的分类id到本地
				uni.setStorageSync('appealCategoryId', item.id)
				uni.navigateTo({
					url: "/pages/hotline/hotlineCategory?name=" + item.name

				})
			},
			//点击我的诉求卡片
			jumpDetails(item) {
				uni.navigateTo({
					url: '/pages/hotline/hotlineAppealDetails?id=' + item.id,
				});
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		margin: 15rpx 0;
	}

	.classify {
		swiper {
			height: 330rpx;

			image {
				width: 50%;
			}
		}

		text {
			font-size: 25rpx
		}
	}
</style>
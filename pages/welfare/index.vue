<template>
	<view>
		<view class="navBar">
			<u-navbar title="爱心捐赠" placeholder="" autoBack=""></u-navbar>
			<u-search style="margin: 15rpx;" placeholder="请输入内容" :showAction="false" @focus="jump"
				height="50rpx"></u-search>


			<!-- 轮播图 -->
			<u-swiper :list="bannerList" indicator :autoplay="true" :interval="3000" :duration="1000" circular
				nextMargin="10" previousMargin="10" height="350rpx" bgColor="#ffffff" style="margin: 20rpx 0;">
			</u-swiper>


			<!-- 公益分类 -->
			<uni-section title="公益分类" sub-title="" type="line" titleFontSize="35rpx"></uni-section>

			<view class="grid">
				<uni-card margin="20rpx 0" shadow="0 0" :border="false">
					<u-grid :border="false" col="4">
						<u-grid-item v-for="(item, index) in classifyList" :key="index" @click="clickGrid(item)"
							style="margin: 0 0 15rpx 0;">
							<image :src="ip + item.imgUrl" mode="widthFix"></image>
							<text class="grid-text">{{ item.name }}</text>
						</u-grid-item>
					</u-grid>
				</uni-card>
			</view>


			<!-- 推荐公益 -->
			<uni-section title="推荐公益" sub-title="" type="line" titleFontSize="35rpx"></uni-section>

			<view class="recommend" @click="clickCard(item)" v-for="(item, index) in recommendActivityList" :key="index">
				<uni-card :title="item.name" thumbnail="" :extra="item.author" note="Tips">
					<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
					<view class="">
						捐赠人数：{{ item.donateCount }}
					</view>
					<view class="">
						已筹善款：{{ item.moneyNow }} 元
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getWelfareBannerList,
	getWelfareClassifyList,
	getWelfareRecommendActivityList
} from "../../config/api.js"
export default {
	data() {
		return {
			bannerList: [],
			classifyList: [],
			recommendActivityList: []
		};
	},
	onShow() {
		/* 获取轮播图数据 */
		getWelfareBannerList().then(res => {
			this.bannerList = res.data.map(e => ({
				url: this.ip + e.imgUrl,
				id: e.id
			}))
		})
		/* 获取公益分类 */
		getWelfareClassifyList().then(res => {
			this.classifyList = res.data.map(e => ({
				imgUrl: e.imgUrl,
				id: e.id,
				name: e.name
			}))
		})
		/* 获取推荐公益活动 */
		getWelfareRecommendActivityList().then(res => {
			this.recommendActivityList = res.rows
		})
	},
	methods: {
		/* 点击grid  */
		clickGrid(item) {
			uni.navigateTo({
				url: '/pages/welfare/welfareActivity?typeId=' + item.id + '&name=' + item.name
			})
		},
		//点击推荐公益卡片
		clickCard(item) {
			uni.navigateTo({
				url: '/pages/welfare/welfareActivity?typeId=' + item.typeId + '&name=' + item.type.name
			})
		},
		// 点击搜索框
		jump() {
			uni.navigateTo({
				url: '/pages/welfare/welfareSeachList',
				animationType: 'fade-in'
			})
		}
	}
}
</script>

<style lang="scss">
.grid {
	image {
		width: 50%;

	}

	text {
		font-size: 25rpx
	}
}

.recommend {
	image {
		width: 100%;
		height: 350rpx;
		margin: 20rpx 0 0 0;
		border-radius: 5px;
	}
}
</style>
<template>
	<view>

		<u-navbar autoBack :title="this.list.name" placeholder=""></u-navbar>

		<u-tabs :list="classify" @click="clickTabs" :activeStyle="{transform: 'scale(1.15)',color:'pink'}"
			:inactiveStyle="{
			transform: 'scale(1.1)' }" itemStyle="width:27%; height:75rpx" lineWidth="100rpx" lineColor="pink"></u-tabs>

		<!-- 	<view class="content">
			<uni-card>
				<u-parse :content="this.list.content"></u-parse>
			</uni-card>
		</view> -->



		<view>
			<view class="common" style="font-size: 25rpx; color: #ccc;" v-if="showCommon == true">
				<u-button type="primary" text="发表评论" v-if="showCommon == true" @click="show=true"></u-button>
				共计：{{this.commonList.length}}条评论
			</view>

			<uni-card :title="item.nickName" note="Tips" v-for="(item,index) in commonList" :key="index">
				{{item.content}}
			</uni-card>
		</view>

		<u-popup :show="show" @close="close" :safeAreaInsetTop="true">
			<uni-card>
				<u--textarea placeholder="请输入内容" count v-model="commonUpLoad"></u--textarea>
				<u-button type="primary" text="发表评论" @click="clickCommon()"></u-button>
			</uni-card>
		</u-popup>

	</view>
</template>

<script>
	import {
		getActivityDetails,
		getActivityCommonList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				commonList: [],
				classify: [{
					name: '活动推荐'
				}, {
					name: '查看评论'
				}, {
					name: '参加活动'
				}],
				show: false,
				showCommon: false,
				activityId: '',
				commonUpLoad: ''
			}
		},
		methods: {
			close(item) {
				this.show = false
			},
			clickTabs(item) {
				this.showCommon = false
			},
			clickComkon() {
				this.show = true
				console.log(this.commonUpLoad);
			}
		},
		onLoad(e) {
			this.activityId = e.id

			getActivityDetails({}, e.id).then(res => {
				this.list = res.data
			})

			getActivityCommonList({
				params: {
					activityId: e.id
				}
			}).then(res => {
				this.commonList = res.rows.slice(0, 20)
			})

		}
	}
</script>

<style lang="scss">
	.common {
		width: 80%;
		margin: 25rpx auto;
	}
</style>
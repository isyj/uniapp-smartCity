<template>
	<view>
		<u-navbar title="爱心捐赠" placeholder="" autoBack=""></u-navbar>
		<u-search v-model="keyword" style="margin-bottom: 15rpx;" placeholder="请输入内容" height="20rpx" @search="search()"
			@custom="search()" focus></u-search>


		<!-- 弹出层 -->
		<u-popup :show="show" closeOnClickOverlay @close="close">
			<uni-card padding="100rpx">
				<u--input placeholder="请输入金额" border="surround" v-model="donateMoney"></u--input>
				<br />
				<u-button type="error" @click="clickBtn()">捐款</u-button>
			</uni-card>
		</u-popup>


		<!-- 搜索到的活动卡片 -->
		<view class="card" v-for="(item,index) in searchList" :key="index">
			<uni-card :title="item.name" :subTitle="item.createTime" thumbnail="" :extra="item.author" note="Tips">
				<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
				<view class="">
					捐赠人数：{{item.donateCount}}
				</view>
				<view class="">
					已筹善款：{{item.moneyNow}} 元
				</view>
				<view class="">
					所需筹款：{{item.moneyTotal}} 元
				</view>
				<u-button type="error" @click="click(item.id)">捐款</u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getWelfareActivityList,
		getWelfareDonateRecord
	} from "../../config/api.js"
	export default {
		data() {
			return {
				searchList: [],
				keyword: '',
				donateMoney: '',
				activityId: '',
				show: false,
				typeId: ''
			};
		},
		onLoad(e) {
			this.typeId = e.typeId
		},
		methods: {
			// 搜索
			search() {
				// 获取全部该分类公益活动数据列表
				getWelfareActivityList({
					params: {
						typeId: this.typeId,
						name: this.keyword
					}
				}).then(res => {
					if (!this.keyword) {
						uni.showToast({
							title: "请输入内容",
							icon: 'error'
						})
						return
					}
					//清空展示的数据
					this.searchList = []
					this.searchList = res.rows
				})
			},

			//点击捐款按钮
			click(id) {
				this.show = true
				// 活动id
				this.activityId = id
			},

			//点击弹出层按钮
			async clickBtn() {
				this.show = false
				// 发起对应活动捐款
				await getWelfareDonateRecord({
					activityId: this.activityId,
					donateMoney: this.donateMoney
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
				// 捐款后重新获取全部活动数据列表
				await getWelfareActivityList({
					params: {
						typeId: this.typeId,
						name: this.keyword
					}
				}).then(res => {
					this.searchList = res.rows

				})
			},

			// 关闭弹出层
			close() {
				this.show = false
			},

		},
	}
</script>

<style lang="scss">
	.card {
		image {
			width: 100%;
			margin: 20rpx 0 0 0;
			border-radius: 5px;
			max-height: 400rpx;
		}
	}
</style>
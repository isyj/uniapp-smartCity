<template>
	<view>
		<u-navbar :title="navTitle" autoBack="" placeholder=""></u-navbar>
		<u-search style="margin: 15rpx;" placeholder="请输入内容" :showAction="false" height="50rpx"
			@focus="jump"></u-search>

		<!-- 弹出层 -->
		<u-popup :show="show" closeOnClickOverlay @close="close">
			<uni-card margin="25rpx 25rpx 100rpx 25rpx">
				<u--input placeholder="请输入金额" border="surround" v-model="donateMoney"></u--input>
				<br />
				<u-button type="error" @click="clickBtn()">捐款</u-button>
			</uni-card>
		</u-popup>


		<!-- 公益活动信息卡片 -->
		<view class=" card">
			<uni-card :title="item.name" :subTitle="item.createTime" thumbnail="" :extra="item.author" note="Tips"
				v-for="(item,index) in list" :key="index">
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
				list: [],
				navTitle: '',
				show: false,
				donateMoney: '',
				activityId: '',
				typeId: ''
			};
		},
		onLoad(e) {
			this.navTitle = e.name
			//活动分类id
			this.typeId = e.typeId
			// 分类获取活动数据
			getWelfareActivityList({
				params: {
					typeId: e.typeId
				}
			}).then(res => {
				this.list = res.rows
			})

		},
		methods: {
			// 关闭弹出层
			close() {
				this.show = false
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
				// 捐款后重新获取该分类活动数据列表
				await getWelfareActivityList({
					params: {
						typeId: this.typeId
					}
				}).then(res => {
					this.list = res.rows
					this.navTitle = res.rows[0].type.name
				})

			},
			//点击捐款按钮
			click(id) {
				this.show = true
				// 活动id
				this.activityId = id
			},
			// 点击搜索框
			jump() {
				uni.navigateTo({
					url: '/pages/welfare/welfareSeachList?typeId=' + this.typeId + '&navTitle=' + this.navTitle,
					animationType: 'fade-in'
				})
			}
		}
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
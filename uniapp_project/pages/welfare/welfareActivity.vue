<template>
	<view>
		<u-navbar :title="navTitle" autoBack="" placeholder=""></u-navbar>


		<!-- 弹出层面 -->
		<u-popup :show="show" closeOnClickOverlay @close="close">
			<uni-card>
				<u--input placeholder="请输入金额" border="surround" v-model="donateMoney"></u--input>
				<br />
				<u-button type="error" @click="clickBtn()">捐款</u-button>
			</uni-card>
		</u-popup>


		<!-- 活动信息卡片 -->
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
			//活动分类id
			this.typeId = e.id
			// 分类获取活动数据
			getWelfareActivityList({
				params: {
					typeId: e.id
				}
			}).then(res => {
				this.list = res.rows
				this.navTitle = res.rows[0].type.name
			})

		},
		methods: {
			// 关闭弹出层面
			close() {
				this.show = false
			},
			//点击弹出层按钮
			async clickBtn() {
				this.show = false
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
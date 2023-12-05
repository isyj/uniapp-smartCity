<template>
	<view>
		<u-navbar :title="navTitle" autoBack="" placeholder=""></u-navbar>


		<view class="card">
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
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getWelfareActivityList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				navTitle: ''
			};
		},
		onLoad(e) {
			getWelfareActivityList({
				params: {
					typeId: e.id
				}
			}).then(res => {
				this.list = res.rows
				console.log(this.list);
				this.navTitle = res.rows[0].type.name
			})

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
<template>
	<view>

		<view class="orders">
			<view class="content" v-for="(item,index) in orderClassify" :key="index" @click="click(index)">
				<view :class="{btn:count == index}">
					{{item}}
				</view>
			</view>
		</view>

		<view>
			<uni-card :title=" item.name" :sub-title="item.orderNo" :extra="item.orderTypeName"
				v-for="(item,index) in list" :key="index">
				<text>{{item.orderStatus}}</text>
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getAllOrder
	} from "../../config/api.js"
	export default {
		data() {
			return {
				count: 0,
				list: [],
				orderClassify: ['全部订单', '订单分类']
			};
		},
		async onLoad() {
			await getAllOrder().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			click(index) {
				this.count = index
			}
		}
	}
</script>

<style lang="scss">
	.orders {
		display: flex;
		margin: 25rpx 0;

		.content {
			width: 50%;
			text-align: center;
		}

		.btn {
			color: pink;
		}

		.btn::after {
			content: '';
			width: 125rpx;
			height: 5rpx;
			background-color: pink;
			position: absolute;
			margin-top: 50rpx;
			margin-left: -126rpx;
		}
	}
</style>
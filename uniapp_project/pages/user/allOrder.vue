<template>
	<view>

		<view>
			<u-tabs :list="list4" lineWidth="60" lineColor="pink" :activeStyle="{
	            color: 'pink',
	            transform: 'scale(1.15)'
	        }" :inactiveStyle="{
	            color: '#606266',
	            transform: 'scale(1.1)'
	        }" itemStyle="padding: 0; height: 40px; width: 50%" @click="clickClassify">
			</u-tabs>
			<view>
				<u-picker closeOnClickOverlay :show="show" :columns="columns" @cancel="cancel" @close="cancel"
					@confirm="confirm"></u-picker>
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
				show: false,
				list: [],
				list4: [{
					name: '全部订单'
				}, {
					name: '订单分类'
				}],
				columns: [
					['外卖订餐', '电影']
				],

			};
		},
		async onLoad() {
			await getAllOrder().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			// 点击订单分类
			clickClassify(item) {
				if (item.index == 1) {
					this.show = true
				}
			},
			// 关闭选择器
			cancel(item) {
				this.show = false
			},
			// 点击确定
			confirm(item) {
				this.show = false
				let orderType = item.value
				if (item.value == "外卖订餐") {
					orderType = 'takeout'
				} else if (item.value == "电影") {
					orderType = 'movie'
				}
				getAllOrder({
					params: {
						orderType: orderType
					}
				}).then(res => {
					this.list = res.rows
				})

			}
		}
	}
</script>

<style lang="scss">

</style>
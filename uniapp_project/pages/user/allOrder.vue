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
				<u-picker closeOnClickOverlay :show="show" keyName="ladel" :columns="columns" @cancel="cancel"
					@close="cancel" @confirm="confirm"></u-picker>
			</view>
		</view>


		<view>
			<uni-card :title="item.name" :sub-title="item.orderNo" :extra="item.orderTypeName"
				v-for="(item,index) in list" :key="index">
				<text>{{item.orderStatus}}</text>
			</uni-card>
			<uni-card :title="item.path" :sub-title="item.orderNum" :extra="item.paymentType"
				v-for="(item,index) in busList" :key="index">
				<view class="">
					上车点：{{item.start}}
				</view>
				<view class="">
					上车点：{{item.end}}
				</view>
				<view class="">
					票价：{{item.price}}元
				</view>
				<view class="">
					支付信息：{{item.status==0?'待支付':'已支付'}}
				</view>
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getAllOrder,
		getBusOrderList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				show: false,
				list: [],
				busList: [],
				list4: [{
					name: '全部订单'
				}, {
					name: '订单分类'
				}],
				columns: [
					[{
						ladel: '外卖订餐',
						orderType: 'takeout'
					}, {
						ladel: '电影',
						orderType: 'movie'
					}, {
						ladel: '巴士订单',
					}]
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
				} else {
					getAllOrder().then(res => {
						this.list = res.rows
					})
				}
			},
			// 关闭选择器
			cancel(item) {
				this.show = false
			},
			// 点击确定
			confirm(item) {
				this.show = false
				this.list4[1].name = item.value[0].ladel
				if (item.value[0].orderType) {
					getAllOrder({
						params: {
							orderType: item.value[0].orderType
						}
					}).then(res => {
						this.busList = ''
						this.list = res.rows
					})
				} else {
					getBusOrderList().then(res => {
						this.list = ''
						this.busList = res.rows
					})
				}


			}
		}
	}
</script>

<style lang="scss">

</style>
<template>
	<view>

		<view>
			<u-tabs :list="list4" lineWidth="60" lineColor="pink" :activeStyle="{
	            color: 'pink',
	            transform: 'scale(1.15)'
	        }" :inactiveStyle="{
	            color: '#606266',
	            transform: 'scale(1.1)'
	        }" itemStyle="padding: 0; height: 40px; width: 50%" @click="click">
			</u-tabs>
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
				list: [],
				list4: [{
					name: '全部订单'
				}, {
					name: '订单分类'
				}],

			};
		},
		async onLoad() {
			await getAllOrder().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			click(item) {
				console.log(item);
			}
		}
	}
</script>

<style lang="scss">

</style>
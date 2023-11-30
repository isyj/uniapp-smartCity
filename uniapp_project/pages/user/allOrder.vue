<template>
	<view>
		<view>
			<uni-card :title="item.name" :sub-title="item.orderNo" :extra="item.orderTypeName"
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
			};
		},
		async onLoad() {
			await getAllOrder().then(res => {
				this.list = res.rows
				console.log(this.list[0].payTime);
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>
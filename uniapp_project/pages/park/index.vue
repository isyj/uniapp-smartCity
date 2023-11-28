<template>
	<view>
		<uni-card :title="item.parkName" :sub-title="'空位 : '+item.vacancy" :extra="'距离 : '+item.distance+'m'"
			v-for="(item,index) in list" :key="index">
			<text>地址：{{item.address}}</text>
			<br />
			<text>价格：{{item.rates}}￥</text>
		</uni-card>
	</view>
</template>

<script>
	import {
		getParkList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				temp: {}
			};
		},
		onLoad() {
			getParkList().then(res => {
				res.rows.sort(function(a, b) {
					return a.distance - b.distance
				});
				this.list = res.rows
			})
		}
	}
</script>

<style lang="scss">

</style>
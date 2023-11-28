<template>
	<view>
		<uni-card :title="item.parkName" :sub-title="'距离 : '+item.distance+'m'" :extra="'空位 : '+item.vacancy"
			v-for="(item,index) in list" :key="index" @click="jump(item.id)">
			<view>地址：<uni-icons type="map"></uni-icons> {{item.address}}</view>
			<text style="color: red;">价格：￥{{item.rates}} / 小时</text>
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
		},
		methods: {
			jump(id) {
				uni.navigateTo({
					url: '/pages/park/parkDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
<template>
	<view>
		<u-tabs :list="list" lineColor="pink" itemStyle="width: 33%; padding: 0; height:40px"
			:activeStyle="{color: 'pink', transform: 'scale(1.15)'}" :inactiveStyle="{transform: 'scale(1.1)'}"
			@change="change"></u-tabs>


		<view class="card">

		</view>
	</view>
</template>

<script>
	import {
		getDataType,
		getVolunteerMyActivity
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [{
					name: "已完成"
				}, {
					name: "已报名"
				}, {
					name: "已取消"
				}],
				list: []
			};
		},
		async onLoad() {
			await getVolunteerMyActivity({}, '0').then(res => {
				this.list = res.rows
			})
		},
		methods: {
			change(item) {
				getVolunteerMyActivity({}, item.index).then(res => {
					this.list = res.rows
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
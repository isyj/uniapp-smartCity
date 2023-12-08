<template>
	<view>
		<view class="card" v-for="(item,index) in list" :key="index">
			<uni-card :title="item.categoryName" :extra="String(item.money) + '元'">
				<u-button type="error" text="预约" style="width: 50%;" @click="jump(item)"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHospitalCategory
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			//获取科室分类
			getHospitalCategory().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/outpatient/hospitalReservation?id=' + item.id + '&type=' + item.type + '&money=' +
						item.money
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
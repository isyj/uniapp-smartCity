<template>
	<view>




		<view class="card" v-for="(item,index) in list" :key="index" @click="jump(item)">
			<uni-card :title="item.hospitalName" thumbnail="" :extra="String(item.level)+'星'" note="Tips">
				<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHospitalList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			//获取所有医院列表
			getHospitalList().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			//点击医院卡片
			jump(item) {
				uni.navigateTo({
					url: '/pages/outpatient/hospitalDetalis?id=' + item.id + '&hospitalName=' + item.hospitalName
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		image {
			width: 100%;
			margin: 20rpx 0 0 0;
			border-radius: 5px;
			height: 400rpx;
		}
	}
</style>
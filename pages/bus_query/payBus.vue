<template>
	<view>
		<uni-card :title="orderInfo.path" :subTitle="'票价：'+orderInfo.price+'元'" extra="待支付" note="Tips">
			上车点：{{this.orderInfo.start}}
			<br />
			下车点：{{this.orderInfo.end}}
			<br />
			<br />
			<u-button type="error" text="支付" @click="pay"></u-button>
		</uni-card>
	</view>
</template>

<script>
	import {
		postPayBusOrder
	} from "../../config/api.js"
	export default {
		data() {
			return {
				orderNum: '',
				orderInfo: uni.getStorageSync('busOrderInfo')
			};
		},
		onLoad(e) {
			this.orderNum = e.orderNum
			console.log(this.orderNum);
			console.log(this.orderInfo);
		},
		methods: {
			pay() {
				postPayBusOrder({
					orderNum: this.orderNum,
					paymentType: '电子支付'
				}).then(res => {
					uni.showToast({
						title: '支付成功'
					})
					uni.navigateBack()
					uni.removeStorageSync('busOrderInfo')
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
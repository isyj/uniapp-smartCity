<template>
	<view>
		<u-datetime-picker :show="show" v-model="value1" mode="datetime" @confirm="confirm" @cancel="show=false"
			@close="show=false" closeOnClickOverlay=""></u-datetime-picker>


		<view class="">
			<uni-card>
				<uni-card>
					<view class="" style="text-align: center;">
						{{this.time}}
					</view>
				</uni-card>
				<u-button type="primary" @click="show = true">选择日期</u-button>
				<br />
				<u-button type="error" @click="jump()">下一步</u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value1: Number(new Date()),
				time: 'xxxx-xx-xx xx:xx',
				lineId: ''
			};
		},
		onLoad(e) {
			this.lineId = e.lineId
		},
		methods: {
			confirm(item) {
				this.time = uni.$u.timeFormat(String(item.value), 'yyyy-mm-dd hh:MM')
				this.show = false
			},
			jump() {
				if (uni.$u.test.date(this.time)) {
					uni.navigateTo({
						url: '/pages/bus_query/uploadBusOrder?time=' + this.time + '&lineId=' + this.lineId
					})
				} else {
					uni.showToast({
						title: '请选择时间',
						icon: 'error'
					})
				}
			}
		},

	}
</script>

<style lang="scss">

</style>
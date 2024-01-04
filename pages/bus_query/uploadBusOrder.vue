<template>
	<view>
		<view class="card">
			<uni-card>
				<u-cell-group :border="false">
					<u-cell title="日期" :value="time"></u-cell>

					<u-cell title="起点" :value="first"></u-cell>

					<u-cell title="终点" :value="end"></u-cell>

					<u-picker :show="show" closeOnClickOverlay :columns="list" @cancel="show = false"
						@close="show = false" @confirm="confirm1"></u-picker>
					<u-cell title="上车点">
						<text @click="show = true" slot="value">{{this.orderInfo.start}}</text>
					</u-cell>
					<u-picker :show="show2" closeOnClickOverlay :columns="list" @cancel="show2 = false"
						@close="show2 = false" @confirm='confirm2'></u-picker>
					<u-cell title="下车点">
						<text @click="show2 = true" slot="value">{{this.orderInfo.end}}</text>
					</u-cell>
				</u-cell-group>

				<u-button type="error" text="确定" @click="jump"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getBusLineStop,
		getBusLineDetails,
		postBusOrder
	} from "../../config/api.js"
	export default {
		data() {
			return {
				time: '',
				show: false,
				show2: false,
				list: [
					[]
				],
				first: '',
				end: '',
				orderInfo: {
					start: '选择上车点',
					end: '选择下车点',
					price: '',
					path: '',
					status: 1,
				},
				orderNum: ''
			};
		},
		onLoad(e) {
			this.time = e.time
			getBusLineDetails({}, e.lineId).then(res => {
				this.first = res.data.first
				this.end = res.data.end

				this.orderInfo.price = res.data.price
				this.orderInfo.path = res.data.name
			})
			//	获取站点信息
			getBusLineStop({
				params: {
					linesId: e.lineId
				}
			}).then(res => {
				for (var i = 0; i < res.rows.length; i++) {
					this.list[0].push(res.rows[i].name)
				}
			})
		},
		methods: {
			confirm1(item) {
				this.show = false
				this.orderInfo.start = item.value[0]
			},
			confirm2(item) {
				this.show2 = false
				this.orderInfo.end = item.value[0]
			},
			jump() {
				if (this.orderInfo.start != '选择上车点' && this.orderInfo.end != '选择下车点' && this.orderInfo.start != this
					.orderInfo.end) {
					uni.setStorageSync('busOrderInfo', this.orderInfo)
					postBusOrder(this.orderInfo).then(res => {
						this.orderNum = res.orderNum
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/bus_query/payBus?orderNum=' + this.orderNum
						})
					}, 500)

				} else {
					uni.showToast({
						title: '选择有误',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
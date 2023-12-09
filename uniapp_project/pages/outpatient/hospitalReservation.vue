<template>
	<view>
		<view class="card">
			<uni-card>
				<u-cell-group :border="false">
					<u-cell title="姓名">
						<input type="text" slot="right-icon" placeholder="请输入姓名" v-model="reservation.patientName" />
					</u-cell>

					<u-datetime-picker closeOnClickOverlay @close="show = false" @cancel="show = false"
						@confirm="confirm" v-model="value" :show="show" mode="datetime"></u-datetime-picker>
					<u-cell title="预约时间">
						<text slot="right-icon" @click="show = true">{{reservation.reserveTime}}</text>
					</u-cell>

					<br />

					<u-button type="error" text="提交" @click="submit()"></u-button>
				</u-cell-group>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		postReservation
	} from "../../config/api.js"
	export default {
		data() {
			return {
				value: Number(new Date()),
				show: false,
				reservation: {
					categoryId: '',
					money: '',
					patientName: '',
					reserveTime: '选择预约时间',
					type: ''
				}
			};
		},
		onLoad(e) {
			this.reservation.categoryId = e.id,
				this.reservation.money = e.money,
				this.reservation.type = e.type
		},
		methods: {
			//选择日期
			confirm(item) {
				this.show = false
				this.reservation.reserveTime = uni.$u.timeFormat(item.value, 'yyyy-mm-dd hh:MM')
			},
			//提交
			submit() {
				if (this.reservation.patientName != '') {
					postReservation(this.reservation).then(res => {
						uni.showToast({
							title: res.msg
						})
					})
				} else {
					uni.showToast({
						title: '请输入姓名',
						icon: 'error'
					})
				}
			}
		}

	}
</script>

<style lang="scss">
	text,
	input {
		width: 300rpx;
		font-size: 25rpx
	}
</style>
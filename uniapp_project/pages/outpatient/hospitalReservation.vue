<template>
	<view>
		<view class="card">
			<uni-card>
				<u-cell-group :border="false">
					<u-cell title="姓名">
						<input type="text" slot="right-icon" placeholder="请输入姓名" v-model="reservation.patientName" />
					</u-cell>
					<u-cell title="预约时间">
						<input type="text" slot="right-icon" placeholder="请输入预约时间" v-model="reservation.reserveTime" />
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
				reservation: {
					categoryId: '',
					money: '',
					patientName: '',
					reserveTime: '',
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
			submit() {
				if (this.reservation.patientName != '') {
					postReservation(this.reservation).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: res.msg
							})
						} else {
							uni.showToast({
								title: '时间格式有误',
								icon: 'error'
							})
						}
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
	input {
		width: 300rpx;
		font-size: 25rpx
	}
</style>
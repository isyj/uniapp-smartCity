<template>
	<view>
		<u-datetime-picker :show="show" v-model="value1" mode="datetime" @confirm="confirm"></u-datetime-picker>


		<view class="">
			<uni-card>
				<uni-card>
					<view class="" style="text-align: center;">
						{{this.time}}
					</view>
				</uni-card>
				<u-button type="primary" @click="show = true">选择日期</u-button>
				<br />
				<u-button type="error">下一步</u-button>
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
				time: 'xxxx-xx-xx xx:xx'
			};
		},
		methods: {
			confirm(item) {
				this.time = uni.$u.timeFormat(String(item.value), 'yyyy-mm-dd hh:MM')
				console.log(this.time);
				this.show = false
			}
		}

	}
</script>

<style lang="scss">

</style>
<template>
	<view>
		<view class="card">
			<uni-card :title="data.name" :subTitle="'运行时间：'+data.startTime+'-'+data.endTime" :extra="data.price+'元'"
				note="Tips">
				起点：{{data.first}}
				<br />
				终点：{{data.end}}
				<br />
				里程：{{data.mileage}}km
				<br />
				<br />
				<u-button type="error" text="下一步" @click="jump()"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getBusLineDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				data: {},
				lineId: ''
			};
		},
		onLoad(e) {
			this.lineId = e.id
			getBusLineDetails({}, e.id).then(res => {
				this.data = res.data
			})
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '/pages/bus_query/busDate?lineId=' + this.lineId
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
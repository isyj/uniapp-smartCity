<template>
	<view>
		<view class="card" v-for="(item,index) in list" :key="index">
			<uni-card :title="item.name" :subTitle="'运行时间：'+item.startTime+'-'+item.endTime" :extra="item.price+'元'"
				note="Tips">
				<view @click="jump(item)">
					起点：{{item.first}}
					<br />
					终点：{{item.end}}
					<br />
					里程：{{item.mileage}}km
				</view>

				<u-collapse :border="false" @open="linesStop(item)">
					<u-collapse-item title="站点">
						<view class="" v-for="(item,index) in stop" :key="index">
							{{item.name}}
						</view>
					</u-collapse-item>
				</u-collapse>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getBusLine,
		getBusLineStop
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				stop: []
			};
		},
		async onLoad() {
			//获取线路列表
			await getBusLine().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/bus_query/busLineDetails?id=' + item.id
				})
			},
			linesStop(item) {
				//获取站点信息
				getBusLineStop({
					params: {
						linesId: item.id
					}
				}).then(res => {
					this.stop = res.rows
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
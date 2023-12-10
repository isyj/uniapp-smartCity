<template>
	<view>
		<view class="card" v-for="(item, index) in list" :key="index">
			<uni-card :title="item.name" :subTitle="'运行时间：' + item.startTime + '-' + item.endTime"
				:extra="item.price + '元'" note="Tips">
				<view @click="jump(item)">
					起点：{{ item.first }}
					<br />
					终点：{{ item.end }}
					<br />
					里程：{{ item.mileage }}km
				</view>
				<u-collapse :border="false">
					<u-collapse-item title="站点">
						<view class="" v-for="(stopItem, index) in item.stop" :key="index">
							{{stopItem.name}}
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
			};
		},
		async onLoad() {
			//获取线路列表
			await getBusLine().then(res => {
				this.list = res.rows
			})

			for (let i = 0; i < this.list.length; i++) {
				await getBusLineStop({
					params: {
						linesId: this.list[i].id
					}
				}).then(res => {
					this.list[i].stop = res.rows
				})
			}
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/bus_query/busLineDetails?id=' + item.id
				})
			},
			// linesStop(item) {
			// 	//获取站点信息
			// 	getBusLineStop({
			// 		params: {
			// 			linesId: item.id
			// 		}
			// 	}).then(res => {
			// 		this.stop = res.rows
			// 	})
			// }
		}
	}
</script>

<style lang="scss"></style>
<template>
	<view>
		<view class="content">
			近七天温度
		</view>
		<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
	</view>
</template>

<script>
	import {
		getWeather
	} from "../../config/api.js"
	export default {
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 20,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							linearType: "custom",
							linearOpacity: 0.5,
							barBorderCircle: true,
							customColor: [
								"#FA7D8D",
								"#EB88E2"
							]
						}
					}
				}
			}
		},
		onLoad() {
			getWeather().then(res => {
				let dayList = []
				let weatherListMax = []
				let weatherListMin = []
				dayList = res.data.weatherList.map(e => e.day.slice(0, 2) + '.' + e.day.slice(3, 5))
				weatherListMax = res.data.weatherList.map(e => e.minTemperature)
				weatherListMin = res.data.weatherList.map(e => e.maxTemperature)
				this.chartData = {
					categories: dayList,
					series: [{
							name: "最高温度",
							data: weatherListMax
						},
						{
							name: "最低温度",
							data: weatherListMin
						}
					]
				}
			})
		}
	}
</script>

<style lang="scss">
	.content {
		margin: 40rpx 0 10rpx 30rpx;
		font-size: 35rpx;
		font-weight: bold;
	}

	.content::after {
		content: '';
		width: 10rpx;
		height: 32rpx;
		background-color: #FFC0CB;
		position: absolute;
		margin-left: -185rpx;
		margin-top: 10rpx;
		border-radius: 5px;
	}
</style>
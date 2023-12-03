<template>
	<view>
		<view class="content">
			新闻数据
		</view>
		<qiun-data-charts type="column" :opts="opts" :chartData="chartData" :ontouch="true" />
	</view>
</template>

<script>
	import {
		getNewsList
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
					enableScroll: true,
					legend: {},
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 4
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
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
			//新闻数据
			getNewsList().then(res => {
				let idList = []
				let commentNumList = []
				let likeNumList = []

				idList = res.rows.map(e => 'id: ' + e.id)
				commentNumList = res.rows.map(e => e.commentNum)
				likeNumList = res.rows.map(e => e.likeNum)

				this.chartData = {
					categories: idList,
					series: [{
							name: "评论",
							data: commentNumList
						},
						{
							name: "点赞",
							data: likeNumList
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
		margin-left: -155rpx;
		margin-top: 10rpx;
		border-radius: 5px;
	}
</style>
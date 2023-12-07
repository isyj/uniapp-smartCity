<template>
	<view>
		<u-search style="margin: 10rpx 0;" height="50rpx" v-model="keyword" @custom="search"
			@search="search"></u-search>


		<!-- tabs -->
		<u-tabs :list="houseType" keyName="dictLabel" @change="change" itemStyle="width: 25%; padding:0; height:40px"
			:activeStyle="{transform:'scale(1.15)',
			color:'pink'}" :inactiveStyle="{transform:'scale(1.1)'}" lineColor="pink"></u-tabs>


		<!-- 房子卡片 -->
		<view class="card" v-for="(item,index) in list" :key="index" @click="clickCard(item)">
			<uni-card :title="item.sourceName" thumbnail="" :extra="'面积:'+item.areaSize+'㎡'" note="Tips">
				<image slot="cover" :src="ip + item.pic" mode="aspectFill"></image>
				地址：{{item.address}}
				<br />
				价格：{{item.price}}
				<br />
				简介：{{item.description}}
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHomeList,
		getDataType
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				houseType: [],
				keyword: '',
				dictLabel: ''
			};
		},
		async onLoad() {
			//获取房子类型字典
			await getDataType({}, 'house_type').then(res => {
				this.houseType = res.data.map(e => ({
					dictLabel: e.dictLabel
				}))
			})
			//获取房源列表
			await getHomeList({
				params: {
					houseType: this.houseType[0].dictLabel
				}
			}).then(res => {
				this.list = res.rows
				this.dictLabel = this.houseType[0].dictLabel
			})
		},
		methods: {
			//搜索
			search() {
				//获取房源列表
				getHomeList({
					params: {
						houseType: this.dictLabel,
						sourceName: this.keyword,
						pageNum: 1,
						pageSize: '50'
					}
				}).then(res => {
					this.list = res.rows
				})
			},
			// 点击tabs
			change(item) {
				this.dictLabel = item.dictLabel
				//获取房源列表
				getHomeList({
					params: {
						houseType: item.dictLabel,
						pageNum: 1,
						pageSize: '50'
					}
				}).then(res => {
					this.list = res.rows
				})
			},
			//点击房子卡片
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/house/houseDetails?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin: 20rpx 0 0 0;
		border-radius: 5px;
		height: 400rpx;
	}
</style>
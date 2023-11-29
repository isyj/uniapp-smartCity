<template>
	<view class="home">
		<uni-nav-bar :title="this.list.parkName" statusBar leftIcon="back" @clickLeft="backPackIndex()"></uni-nav-bar>


		<u-cell-group>
			<u-cell icon="" title="停车场" :value="this.list.parkName"></u-cell>
			<u-cell icon="" title="地址" :value="this.list.address"></u-cell>
			<u-cell icon="" title="距离" :value="this.list.distance +'m'"></u-cell>
			<u-cell icon="" title="是否对外开发" :value="open(this.list.open)"></u-cell>
		</u-cell-group>


		<view class="carInfo">
			车位信息
		</view>
		<view>
			<uni-card shadow="">
				<text class="txt">停车费￥{{this.list.rates}} / 小时
					<br />剩余车位：{{this.list.vacancy}}</text>
			</uni-card>
		</view>


		<view class="carInfo">
			收费标准
		</view>
		<view>
			<uni-card>
				<text class="txt">每小时￥{{this.list.rates}}
					<br />封顶￥{{this.list.priceCaps}}</text>

			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getParkDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {},
			}
		},
		methods: {
			open(open) {
				if (open === 'Y') {
					return '是'
				}
				if (open === 'N') {
					return '否'
				}
			},
			backPackIndex() {
				uni.navigateBack()
			}
		},
		onLoad(e) {
			getParkDetails({}, e.id).then(res => {
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">
	.home {
		height: 100%;

		.carInfo {
			margin: 25rpx 30rpx;
			font-size: 35rpx;
			font-weight: bold;

		}

		.carInfo::after {
			content: '';
			width: 10rpx;
			height: 32rpx;
			background-color: #FFC0CB;
			position: absolute;
			margin-left: -155rpx;
			margin-top: 10rpx;
			border-radius: 5px;
		}

		.txt {
			font-size: 30rpx
		}
	}
</style>
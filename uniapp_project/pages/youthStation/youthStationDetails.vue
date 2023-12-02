<template>
	<view>
		<u-navbar placeholder :title="this.list.name" :autoBack="true"></u-navbar>
		<u-swiper :list="banner" previousMargin="10" nextMargin="10" circular :autoplay="true" radius="5" duration="500"
			indicator height="350rpx" style="margin-top: 15rpx;"></u-swiper>

		<uni-card class="card">
			<view class="txt">
				<view class="">
					地址
				</view>
				{{this.list.address}}
			</view>
			<view class="txt">
				<view class="">
					联系电话
				</view>
				{{this.list.phone}}
			</view>
			<view class="txt">
				<view class="">
					办理入住时间
				</view>
				{{this.list.workTime}}
			</view>
		</uni-card>


		<uni-card class="card">
			<view class="txt">
				<view>
					简介
				</view>
				{{this.list.introduce}}
			</view>
			<view class="txt">
				<view class="">
					房间配置
				</view>
				{{this.list.internalFacilities}}
			</view>
			<view class="txt">
				<view class="">
					周边配套
				</view>
				{{this.list.surroundingFacilities}}
			</view>
			<view class="txt">
				<view class="">
					特色服务
				</view>
				{{this.list.specialService}}
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		getYouthStationDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				banner: [],
				list: []
			};
		},
		onLoad(e) {
			getYouthStationDetails({}, e.id).then(res => {
				this.list = res.data
				for (var i = 0; i < this.list.imageUrlList.length; i++) {
					this.banner.push(this.ip + this.list.imageUrlList[i])
				}

			})
		}
	}
</script>

<style lang="scss">
	.card {
		.txt {
			margin: 30rpx 0;

			view {
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
</style>
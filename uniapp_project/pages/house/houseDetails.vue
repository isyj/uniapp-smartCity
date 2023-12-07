<template>
	<view>
		<u-navbar placeholder="" :title="this.list.sourceName"></u-navbar>


		<view class="card">
			<uni-card :title="this.list.sourceName" thumbnail="" note="Tips">
				<image slot="cover" :src="ip + this.list.pic" mode="aspectFill"></image>
				地址：{{this.list.address}}

			</uni-card>
			<uni-card title="简介" :subTitle="'价格：' + this.list.price" :extra="'面积:'+this.list.areaSize+'㎡'" note="Tips">

				{{this.list.description}}
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHomeDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {}
			};
		},
		onLoad(e) {
			getHomeDetails({}, e.id).then(res => {
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin: 20rpx 0 0 0;
		border-radius: 5px;
		height: 500rpx;
	}
</style>
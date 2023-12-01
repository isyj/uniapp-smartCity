<template>
	<view>

		<u-navbar :title="this.list.name" placeholder autoBack bgColor="#f8f8f8"></u-navbar>

		<uni-card :title="this.list.name" :subTitle="this.list.address" :extra="state(this.list.businessState)"
			note="Tips">
			<image slot='cover' :src="ip + this.list.imgUrl" mode="aspectFill"></image>
			<view class="">
				营业时间：{{this.list.businessHours}}
			</view>
			<br />
			<view class="introduce">
				介绍
			</view>
			<text>{{this.list.description}}</text>

			<u-button class="btn" type="primary" text="评论" @click="jump(list.id)"></u-button>
		</uni-card>

	</view>
</template>

<script>
	import {
		getlLibraryDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {},
			};
		},
		onLoad(e) {
			getlLibraryDetails({}, e.id).then(res => {
				this.list = res.data
			})


		},
		methods: {
			state(businessState) {
				if (businessState == 1) {
					return '营业中'
				}
				if (businessState == 0) {
					return '停止营业'
				}
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/library/libraryComment?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		max-height: 400rpx;
		min-height: 400rpx;
		margin-top: 20rpx;
		border-radius: 5rpx;
	}

	.btn {
		width: 50%;
		margin-top: 20rpx
	}

	.introduce {
		font-size: 30rpx;
		font-weight: bold
	}
</style>
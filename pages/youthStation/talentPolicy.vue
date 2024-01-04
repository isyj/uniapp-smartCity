<template>
	<view>

		<u-navbar placeholder="" :title="this.list.name" :autoBack="true"></u-navbar>


		<uni-card note="Tips" padding="0">
			<image slot="cover" :src="ip + this.list.imgUrl" mode=""></image>
			<view class="content">
				<view>
					简介
				</view>
				{{this.list.introduce}}
			</view>
		</uni-card>

		<view class="">
			<uni-card :title="item.title" note="Tips" v-for="(item,index) in policyList" :key="index"
				@click="jump(item.id)">
				{{item.createTime}}
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getTalentPolicy,
		getTalentPolicyDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				policyList: []
			};
		},
		async onLoad(e) {
			await getTalentPolicy({}, e.id).then(res => {
				this.list = res.data
			})
			await getTalentPolicyDetails({
				params: {
					areaId: e.id
				}
			}).then(res => {
				this.policyList = res.data
			})
		},
		methods: {
			jump(id) {
				uni.navigateTo({
					url: '/pages/youthStation/talentPolicyDetailsInfo?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin-top: 15rpx;
		border-radius: 5px;
	}

	.content {
		view {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
</style>
<template>
	<view>

		<view>
			<uni-card isFull note="Tips">
				<image slot="cover" :src="ip +this.banner.coverImgUrl" mode=""
					@click="jumpYouthStationDetails(banner.id)"></image>
				<u-text :text="this.banner.introduce" lines="3"></u-text>
			</uni-card>
		</view>

		<view class="title">
			人才政策
		</view>
		<view class="areaList">
			<uni-card margin="25rpx 0" padding="10rpx" note="Tips" v-for="(item,index) in areaList" :key="index">
				<image slot="cover" :src="ip + item.imgUrl" mode="center" @click="jumpTalentPolicy(item.id)"></image>
				<view>
					{{item.name}}
				</view>
			</uni-card>
		</view>

		<view class="title">
			青年驿站
		</view>
		<view class="card">
			<uni-card note="Tips" v-for="(item,index) in list" :key="index" padding="0">
				<view slot="title" class="img" @click="jumpYouthStationDetails(item.id)">
					<image :src="ip + item.coverImgUrl" mode="aspectFill"></image>
					<view class="txt">
						<view>{{item.name}}</view>
						<view>剩余床位：男{{item.bedsCountBoy}} | 女{{item.bedsCountGirl}}</view>
						<view>地址 ：{{item.address}}</view>
					</view>
				</view>

				<view class="content" style="margin-top: 15rpx;">
					<u-collapse :border="false">
						<u-collapse-item title="驿站介绍" name="Docs guide">
							<text>{{item.introduce}}</text>
						</u-collapse-item>
					</u-collapse>
				</view>
			</uni-card>
		</view>


	</view>
</template>

<script>
	import {
		getYouthStationList,
		getTalentPolicyArea
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				banner: [],
				areaList: []
			};
		},
		onLoad() {
			let count = Math.floor(Math.random() * 12)

			getYouthStationList().then(res => {
				this.list = res.rows
				this.banner = res.rows[count]
			})

			getTalentPolicyArea().then(res => {
				this.areaList = res.data
			})
		},
		methods: {
			jumpTalentPolicy(id) {
				uni.navigateTo({
					url: '/pages/youthStation/talentPolicy?id=' + id
				})
			},

			jumpYouthStationDetails(id) {
				uni.navigateTo({
					url: '/pages/youthStation/youthStationDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin-top: 20rpx;
		border-radius: 5rpx;
	}

	.areaList {
		display: flex;

		image {
			height: 200rpx;
			margin: 10rpx 0;
		}

		view {
			font-size: 20rpx;
			width: 100%;
			text-align: center;
		}
	}

	.title {
		margin: 40rpx 0 0 30rpx;
		font-size: 35rpx;
		font-weight: bold;

	}

	.title::after {
		content: '';
		width: 10rpx;
		height: 32rpx;
		background-color: #FFC0CB;
		position: absolute;
		margin-left: -155rpx;
		margin-top: 10rpx;
		border-radius: 5px;
	}


	.card {
		.img {
			display: flex;
			justify-self: center;
			align-items: center;

			image {
				max-width: 250rpx;
				max-height: 250rpx;
				border-radius: 10px;
			}

			.txt {
				width: 100%;
				margin: 15rpx;
				font-size: 25rpx;

				view {
					margin: 15rpx;
				}
			}
		}
	}
</style>
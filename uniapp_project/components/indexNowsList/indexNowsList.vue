<template>
	<view>

		<view class="content">
			<scroll-view scroll-x="true" class="nows">
				<view class="nowsName" v-for="(item,index) in list" :key="index" @click="change(index,item.id)">
					<view :class="{btn:count==index}">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>


		<view class="nowsList" v-for="(item,index) in nowsList" :key="index">
			<view class="nowsContent" @click="jump(item.id)">
				<image :src="imgUrl(item.cover)" mode="widthFix"></image>
				<view class="txt">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				count: 0,
				nowsList: []
			};
		},
		methods: {
			change(index, id) {
				this.count = index
				this.$request('/prod-api/press/press/list', {
					type: id
				}, 'GET').then(res => {
					this.nowsList = res.data.rows
				})
			},
			imgUrl(img) {
				return 'http://124.93.196.45:10001' + img
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/subPages/search/newsDetails?id=' + id,
				});
			}
		},
		mounted() {
			this.$request('/prod-api/press/category/list', {}, 'GET').then(res => {
				this.list = res.data.data

				this.$request('/prod-api/press/press/list', {
					type: this.list[0].id
				}, 'GET').then(res => {
					this.nowsList = res.data.rows
				})
			})
		}
	}
</script>

<style lang="scss">
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.content {
		border-top: 1px #eee solid;
		padding: 15rpx 25rpx 0 25rpx;
		margin: 25rpx 0 20rpx 0;

		.nows {
			white-space: nowrap;
			width: 100%;

			.nowsName {
				display: inline-block;
				width: 30%;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 32rpx;

				.btn {
					color: #FFC0CB;
				}

				.btn::after {
					content: '';
					width: 20%;
					height: 3px;
					background-color: #FFC0CB;
					position: absolute;
					bottom: 0;
					margin-left: -142rpx;
				}
			}

		}
	}

	.nowsList {
		display: flex;
		background-color: #eee;

		.nowsContent {
			background-color: white;
			display: flex;
			width: 100%;
			border-radius: 5px;
			margin: 17rpx 15rpx 0 15rpx;

			image {
				max-width: 280rpx;
				max-height: 180rpx;
				min-height: 180rpx;
				border-radius: 20px;
				padding: 10rpx;
				border-radius: 20px;
			}

			.txt {
				padding: 10rpx;
				align-self: center;
				font-size: 28rpx;
			}
		}
	}
</style>
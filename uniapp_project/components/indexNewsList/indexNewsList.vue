<template>
	<view>

		<view class="content">
			<scroll-view scroll-x="true" class="news">
				<view class="newsName" v-for="(item, index) in list" :key="index" @click="change(index, item.id)">
					<view :class="{ btn: count == index }">
						{{ item.name }}
					</view>
				</view>
			</scroll-view>
		</view>


		<view class="newsList" v-for="(item, index) in newsList" :key="index">
			<view class="newsContent" @click="jump(item.id)">
				<image :src="imgUrl(item.cover)" mode="widthFix"></image>
				<view class="txt">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNewsList,
		getNewsCategory
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				count: 0,
				newsList: []
			};
		},
		methods: {
			change(index, id) {
				this.count = index
				getNewsList({
					params: {
						type: id
					}
				}).then(res => {
					this.newsList = res.rows
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
			getNewsCategory().then(res => {
				this.list = res.data

				getNewsList({
					params: {
						type: this.list[0].id
					}
				}).then(res => {
					this.newsList = res.rows
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

		.news {
			white-space: nowrap;
			width: 100%;

			.newsName {
				display: inline-block;
				width: 30%;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 32rpx;
				font-family: '苹方-简';
				padding: 5rpx;

				.btn {
					color: #FFC0CB;
				}

				.btn::after {
					content: '';
					width: 18%;
					height: 3px;
					background-color: #FFC0CB;
					position: absolute;
					bottom: 0;
					margin-left: -125rpx;
				}
			}

		}
	}

	.newsList {
		display: flex;
		background-color: #eee;

		.newsContent {
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
				font-family: '苹方-简';
			}
		}
	}
</style>
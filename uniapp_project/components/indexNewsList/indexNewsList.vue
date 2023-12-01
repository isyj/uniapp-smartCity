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


		<view class="uCard" v-for="(item, index) in newsList" :key="index" @click="jump(item.id)">
			<uni-card :title="item.title" :subTitle="item.publishDate">
				<image slot='cover' :src="ip+item.cover" mode="widthFix"></image>
				<view class="card">
					<view>
						<uni-icons type="heart"></uni-icons>
						<text>{{item.likeNum}}</text>
					</view>
					<view>
						<uni-icons type="eye"></uni-icons>
						<text> {{item.readNum}}</text>
					</view>
					<view>
						<uni-icons type="chat"></uni-icons>
						<text> {{item.commentNum}}</text>
					</view>
				</view>
			</uni-card>
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
			jump(id) {
				uni.navigateTo({
					url: '/pages/index/newsDetails?id=' + id,
				});
			}
		},
		async mounted() {
			await getNewsCategory().then(res => {
				this.list = res.data
			});
			await getNewsList({
				params: {
					type: this.list[0].id
				}
			}).then(res => {
				this.newsList = res.rows
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
				padding: 5rpx;

				.btn {
					color: #FFC0CB;
				}

				.btn::after {
					content: '';
					width: 125rpx;
					height: 3px;
					background-color: #FFC0CB;
					position: absolute;
					bottom: 0;
					margin-left: -125rpx;

				}
			}

		}
	}

	.uCard {
		.card {
			display: flex;

			view {
				width: 100%;
				text-align: center;

				text {
					margin-left: 5rpx;
				}

			}
		}

		image {
			margin-top: 20rpx;
			border-radius: 5px;
			width: 100%;
			min-height: 350rpx;
			max-height: 350rpx;
		}
	}
</style>
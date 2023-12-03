<template>
	<view>

		<u-tabs :list="list" lineWidth="60" lineColor="pink" :activeStyle="{
		            color: 'pink',
		            transform: 'scale(1.15)'
		        }" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1.1)'
		        }" itemStyle="margin-top:20rpx; padding-left: 15px; padding-right: 15px; height: 40px;" @click="change">
		</u-tabs>


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
				newsList: [],
			};
		},
		methods: {
			change(item) {
				getNewsList({
					params: {
						type: item.id
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
				this.list = res.data.map(e => ({
					id: e.id,
					name: e.name
				}))
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
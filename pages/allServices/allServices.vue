<template>
	<view>
		<view class="content">
			<view class="serveCategory">
				<view class="category" :class="{ btn : count == index}" v-for="(item,index) in serveList" :key="index"
					@click="serveCategory(item,index)">
					{{item}}
				</view>
			</view>
			<view class="serve">
				<view class="serveList" v-for="(item, index) in list" :key="index" @click="jump(item.link)">
					<image class="img" :src="ip + item.imgUrl" mode="widthFix"></image>
					<view class="txt">
						{{ item.serviceName }}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getServe
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				serveList: ['全部服务', '车主服务', '便民服务', '生活服务'],
				count: 0
			};
		},
		methods: {
			jump(link) {
				console.log(link);
				uni.navigateTo({
					url: '/pages/' + link
				})
			},
			serveCategory(item, index) {
				this.count = index
				if (item === '全部服务') {
					getServe().then(res => {
						this.list = res.rows
					})
				} else {
					getServe({
						params: {
							serviceType: item
						}
					}).then(res => {
						this.list = res.rows
					})
				}
			}
		},
		onLoad() {
			getServe().then(res => {
				this.list = res.rows
			})
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		// 盒子模型不撑开容器本身大小
		box-sizing: border-box;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 10rpx;

		.serveCategory {
			width: 20%;
			display: flex;
			// 盒子模型不撑开容器本身大小
			box-sizing: border-box;
			flex-direction: column;
			flex-wrap: wrap;
			padding: 30rpx 5rpx;

			.category {
				text-align: center;
				width: 100%;
				font-size: 30rpx;
				padding: 20rpx 10rpx;
				margin: 10rpx 0;
			}

			.btn {
				background-color: pink;
				border-radius: 5px;
				color: white;
			}
		}

		.serve {
			width: 80%;
			display: flex;
			height: 100%;
			// 盒子模型不撑开容器本身大小
			box-sizing: border-box;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 30rpx 5rpx;

			.serveList {
				display: flex;
				width: 33%;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				text-align: center;
				margin-bottom: 30rpx;

				.img {
					width: 55%;
				}

				.txt {
					width: 100%;
					font-size: 25rpx;
					margin-top: 20rpx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
	}
</style>
<template>
	<view>
		<view class="content">
			<view class="serveList" v-for="(item, index) in list" :key="index" @click="jump(item.link)">
				<image class="img" :src="ip + item.imgUrl" mode="widthFix"></image>
				<view class="txt">
					{{ item.serviceName }}
				</view>
			</view>
			<view class="serveList" @click="jumpAllServe()">
				<image class="img" src="../../static/other.png" mode="widthFix"></image>
				<view class="txt">
					更多
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
				list: []
			};
		},
		methods: {
			jumpAllServe() {
				uni.switchTab({
					url: '/pages/allServices/allServices'
				})
			},
			jump(link) {
				uni.navigateTo({
					url: '/pages/' + link
				})
			}
		},
		mounted() {
			getServe().then(res => {
				this.list = res.rows.slice(0, 9)
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
		padding: 30rpx 25rpx;

		.serveList {
			display: flex;
			width: 20%;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			text-align: center;
			margin-bottom: 30rpx;

			.img {
				width: 75%;
			}

			.txt {
				width: 100%;
				font-size: 25rpx;
				font-family: '苹方-简';
				margin-top: 20rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
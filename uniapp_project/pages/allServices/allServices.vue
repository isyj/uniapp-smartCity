<template>
	<view>
		<view class="content">
			<view class="serveList" v-for="(item, index) in list" :key="index">
				<image class="img" :src="imgUrl(item.imgUrl)" mode="widthFix"></image>
				<view class="txt">
					{{ item.serviceName }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		methods: {
			imgUrl(img) {
				return 'http://124.93.196.45:10001/' + img
			},
			jump() {

			}
		},
		mounted() {
			this.$request('/prod-api/api/service/list', '', 'GET').then(res => {
				this.list = res.data.rows
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
			width: 33%;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			text-align: center;
			margin-bottom: 30rpx;

			.img {
				width: 60%;
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
</style>
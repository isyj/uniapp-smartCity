<template>
	<view class="home">
		<view class="hotModuleTxt">热门模块</view>

		<view class="hotModule">
			<view class="content" v-for="(item, index) in hotNowsList" :key="index" @click="jump(item.id)">
				<image class="img" :src="imgUrl(item.cover)" mode="aspectFill"></image>
				<view class="txt">
					{{ item.title }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotNowsList: []
			};
		},
		methods: {
			imgUrl(img) {
				return 'http://124.93.196.45:10001' + img
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/subPages/search/newsDetails?id=' + id,
				});
			},
		},
		mounted() {
			uni.$u.http.get('/prod-api/press/press/list').then(res => {
				for (let i = 0; i < res.rows.length; i++) {
					if (res.rows[i].hot === "Y") {
						this.hotNowsList.push(res.rows[i])
					}
				}
			})
		},
	}
</script>

<style lang="scss">
	.home {
		box-sizing: border-box;
	}

	.hotModuleTxt {
		box-sizing: border-box;
		padding: 10rpx 25rpx;
		font-weight: bold;
		font-size: 45rpx;
	}

	.hotModule {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		padding: 10rpx 25rpx;

		.content {
			box-sizing: border-box;
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0 10rpx;
			border-radius: 20rpx;

			.img {
				width: 100%;
				height: 200rpx;
				border-radius: 20rpx;
			}

			.txt {
				width: 100%;
				font-size: 25rpx;
				font-family: '苹方-简';
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
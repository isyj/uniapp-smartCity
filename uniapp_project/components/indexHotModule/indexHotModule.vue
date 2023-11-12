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
	import {
		randomInt
	} from 'crypto';
	export default {
		data() {
			return {
				allNowsList: [],
				hotNowsList: []
			};
		},
		methods: {
			imgUrl(img) {
				return 'http://124.93.196.45:10001' + img
			},
			hotModule() {
				for (let i = 0; i < 2; i++) {
					let count = Math.floor((Math.random() * this.allNowsList.length));
					this.hotNowsList.push(this.allNowsList[count])
				}
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/subPages/search/newsDetails?id=' + id,
				});
			}
		},
		mounted() {
			this.$request('/prod-api/press/press/list', '', 'GET').then(res => {
				this.allNowsList = res.data.rows
				this.hotModule()
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
				white-space: wrap;
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2;
				/** 显示的行数 **/
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
<template>
	<view>

		<view class="box-bg">
			<uni-nav-bar leftWidth="60rpx" rightWidth="60rpx" border="false" statusBar>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" auto-focus
						@confirm="confirm()" v-model="keyword" />
				</view>
				<block slot="right">
					<view class="search" @click="confirm()">
						搜索
					</view>
				</block>
				<block slot="left">
					<uni-icons class="icon" type="left" @click="backIndex()"></uni-icons>
				</block>
			</uni-nav-bar>
		</view>


		<view v-for="(item,index) in searchList" :key="index" @click="jump(item.id)">
			<uni-card :title="item.title" :sub-title="item.publishDate">
				<view class="card">
					<view>
						<uni-icons type="heart"></uni-icons>
						<text>{{item.likeNum}}</text>
					</view>
					<view>
						<uni-icons type="eye"></uni-icons>
						<text>{{item.readNum}}</text>
					</view>
					<view>
						<uni-icons type="chat"></uni-icons>
						<text>{{item.commentNum}}</text>
					</view>
				</view>
			</uni-card>
		</view>
	</view>

</template>

<script>
	import {
		getNewsList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				keyword: '',
				searchList: [],
			}
		},
		methods: {
			backIndex() {
				uni.navigateBack({
					animationType: 'fade-out'
				});
			},
			//搜索 获取输入内容对应新闻数据
			confirm() {
				if (!this.keyword) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					});
					this.searchList = []
				} else {
					getNewsList({
						params: {
							title: this.keyword
						}
					}).then(res => {
						this.searchList = res.rows
					})

				}
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/index/newsDetails?id=' + id,
				});
			}
		}
	}
</script>

<style lang="scss">
	$nav-height: 30px;

	.icon {
		padding-left: 20rpx;
	}

	.box-bg {
		padding: 5px 0;

		.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			// width: 500rpx;
			flex: 1;
			background-color: #f8f8f8;
			height: $nav-height;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: $nav-height;

			.input-uni-icon {
				line-height: $nav-height;
			}

			.nav-bar-input {
				height: $nav-height;
				line-height: $nav-height;
				/* #ifdef APP-PLUS-NVUE */
				width: 370rpx;
				/* #endif */
				padding: 0 5px;
				font-size: 12px;
				background-color: #f8f8f8;
			}
		}

	}

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
</style>
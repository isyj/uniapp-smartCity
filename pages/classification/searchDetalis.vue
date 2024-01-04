<template>
	<view>
		<view class="card">
			<uni-card :title="item.name" v-for="(item, index) in list" :key="index">
				<image slot="cover" :src="ip + item.imgUrl" mode="" />
				<view>
					<text> 介绍:</text><br>
					{{ item.introduce }}
				</view>

				<u-grid col="4" v-if="item.name=='可回收垃圾'">
					<u-grid-item v-for="(item, index) in category" :key="index" name="gridName">
						<image :src="ip + item.imgUrl" mode="" style="width: 100%; height: 100rpx;" />
						<text style="font-size: 20rpx;">{{ item.name }}</text>
					</u-grid-item>
				</u-grid>
				<u-grid col="4" v-if="item.name=='有害垃圾'">
					<u-grid-item v-for="(item, index) in category2" :key="index" name="gridName">
						<image :src="ip + item.imgUrl" mode="" style="width: 100%; height: 100rpx;" />
						<text style="font-size: 20rpx;">{{ item.name }}</text>
					</u-grid-item>
				</u-grid>
				<u-grid col="4" v-if="item.name=='厨余垃圾'">
					<u-grid-item v-for="(item, index) in category3" :key="index" name="gridName">
						<image :src="ip + item.imgUrl" mode="" style="width: 100%; height: 100rpx;" />
						<text style="font-size: 20rpx;">{{ item.name }}</text>
					</u-grid-item>
				</u-grid>
				<u-grid col="4" v-if="item.name=='其他垃圾'">
					<u-grid-item v-for="(item, index) in category4" :key="index" name="gridName">
						<image :src="ip + item.imgUrl" mode="" style="width: 100%; height: 100rpx;" />
						<text style="font-size: 20rpx;">{{ item.name }}</text>
					</u-grid-item>
				</u-grid>

				<view>
					<text> 投放指导：</text><br>
					{{ item.guide }}
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getGarClassify,
		getGarClassifyInfo
	} from "../../config/api.js";
	export default {
		data() {
			return {
				list: [],
				category: [],
				category2: [],
				category3: [],
				category4: [],
				appealCategoryId: []
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.keyword,
			})
			//获取垃圾分类搜索结果
			await getGarClassify({
				params: {
					name: options.keyword
				}
			}).then((result) => {
				this.list = result.rows;
				this.appealCategoryId = this.list.map(e => ({
					appealCategoryId: e.id
				}));
			})
			//获取每一个搜索到的垃圾分类图片
			await this.appealCategoryId.forEach(item => {
				getGarClassifyInfo({
					params: {
						type: item.appealCategoryId
					}
				}).then((result) => {
					// console.log(result);
					if (item.appealCategoryId == 8) {
						this.category = result.rows.slice(0, 12);
					} else if (item.appealCategoryId == 9) {
						this.category2 = result.rows.slice(0, 12);
					} else if (item.appealCategoryId == 10) {
						this.category3 = result.rows.slice(0, 12);
					} else {
						this.category4 = result.rows.slice(0, 12);
					}
				})
			});

		}
	}
</script>

<style lang="scss" scoped>
	.card {
		image {
			margin: 20rpx 0;
			border-radius: 5px;
			width: 100%;
		}

		view {
			margin: 15rpx 0;

			text {
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
</style>
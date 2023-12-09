<template>
	<view>
		<view class="card">
			<uni-card :title="item.name" @click="" v-for="(item, index) in list" :key="index">
				<image slot="cover" :src="ip + item.imgUrl" mode="" />
				<view>
					<text> 介绍:</text><br>
					{{ item.introduce }}
				</view>

				<u-grid col="4">
					<u-grid-item v-for="(item, index) in category" :key="index" name="gridName">
						<image :src="ip + item.imgUrl" mode="" style="width: 100%; height: 100rpx;" />
						<text style="font-size: 15rpx;">{{ item.name }}</text>
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
			appealCategoryId: ''
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
			this.appealCategoryId = result.rows[0].id;
		})
		await getGarClassifyInfo({
			params: {
				type: this.appealCategoryId
			}
		}).then((result) => {
			this.category = result.rows.slice(0, 12);
		})
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
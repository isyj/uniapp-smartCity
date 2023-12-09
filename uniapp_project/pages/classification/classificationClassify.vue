<template>
	<view>
		<view class="classify">
			<uni-card>
				<u-grid col="2">
					<u-grid-item v-for="(item, index) in list" :key="index" @click="jump(item)" style="margin: 25rpx 0;">
						<image :src="ip + item.imgUrl" mode="aspectFill" />
						<text>{{ item.name }}</text>
					</u-grid-item>
				</u-grid>
			</uni-card>
		</view>
	</view>
</template>

<script>
import {
	getGarClassify
} from "../../config/api.js";
export default {
	data() {
		return {
			list: []
		}
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '分类',
		})
		// 获取分类列表
		getGarClassify().then(res => {
			this.list = res.rows

		})
	},
	methods: {
		jump(item) {
			uni.navigateTo({
				url: '/pages/classification/searchDetalis?keyword=' + item.name,
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.classify {
	image {
		width: 90%;
		height: 200rpx;
		border-radius: 5px
	}
}
</style>
<template>
	<view>
		<!-- 标题、诉求内容、图片、承办单位、提交时间、反馈处理状态和处理结果。 -->
		<view class="">
			<uni-card :title="list.title" :subTitle="'提交时间：'+list.createTime" :extra="'承办单位：'+list.undertaker"
				note="Tips">
				<image slot="cover" :src="ip + list.imgUrl" mode=""></image>
				<view>
					{{this.list.content}}
				</view>
				<br />
				<view style="font-size: 20rpx;">
					处理状态：{{this.statusList[this.list.state]}}
				</view>
				<view style="font-size: 20rpx;">
					处理情况：{{this.list.detailResult?this.list.detailResult:'暂无'}}
				</view>

			</uni-card>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		getHotlineAppealDetails,
		getDataType
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {},
				statusList: []
			};
		},
		async onLoad(e) {
			//获取分类详情
			await getHotlineAppealDetails({}, e.id).then(res => {
				this.list = res.data
			})
			//获取处理状态字典
			await getDataType({}, 'gsh_appeal_state').then(res => {
				this.statusList = res.data.map(e => e.dictLabel)
			})
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
		margin: 20rpx 0 0 0;
		border-radius: 5px;
	}
</style>
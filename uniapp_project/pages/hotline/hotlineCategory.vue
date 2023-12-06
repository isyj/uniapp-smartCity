<template>
	<view>


		<u-navbar autoBack="" placeholder="" :title="this.name"></u-navbar>

		<!-- 诉求列表 -->
		<view class="">
			<uni-card :title="item.title" :subTitle="'提交时间：'+item.createTime" :extra="item.undertaker" note="Tips"
				v-for="(item,index) in list" :key="index" @click="jumpDetails(item)">
				处理状态：{{statusList[item.state]}}
				<br />
				处理情况：{{item.detailResult?item.detailResult:'暂无'}}
			</uni-card>
		</view>
		<u-button type="error" style="position: fixed; bottom: 0; z-index: 999;" @click="jumpAppeal()">发布诉求</u-button>
	</view>
</template>

<script>
	import {
		getHotlineCategoryDetails,
		getDataType
	} from "../../config/api.js"
	export default {
		data() {
			return {
				name: '',
				list: [],
				appealCategoryId: '',
				statusList: [],
				total: 0
			};
		},
		async onLoad(e) {
			//诉求分类名称
			this.name = e.name
			//获取该分类诉求列表
			await getHotlineCategoryDetails({
				params: {
					appealCategoryId: e.id,
					pageSize: '0',
					pageNum: 2
				}
			}).then(res => {
				this.total = res.total
			})
			await getHotlineCategoryDetails({
				params: {
					appealCategoryId: e.id,
					pageSize: '100',
					pageNum: (this.total)
				}
			}).then(res => {
				this.list = res.rows.reverse()
			})
			//获取处理状态字典
			await getDataType({}, 'gsh_appeal_state').then(res => {
				this.statusList = res.data.map(e => e.dictLabel)
			})
		},
		methods: {
			jumpAppeal() {
				uni.navigateTo({
					url: '/pages/hotline/hotlineAppeal'
				})
			},
			jumpDetails(item) {
				uni.navigateTo({
					url: '/pages/hotline/hotlineAppealDetails?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
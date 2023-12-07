<template>
	<view>

		<u-navbar autoBack="" placeholder="" :title="this.name" @rightClick="jumpAppeal()">
			<view class="appeal" slot="right">
				发布诉求
			</view>
		</u-navbar>


		<!-- 诉求列表 -->
		<view class="">
			<uni-card :title="item.title" :subTitle="'提交时间：'+item.createTime" :extra="'承办单位：'+item.undertaker"
				note="Tips" v-for="(item,index) in list" :key="index" @click="jumpDetails(item)">
				处理状态：{{statusList[item.state]}}
				<br />
				处理情况：{{item.detailResult?item.detailResult:'暂无'}}
			</uni-card>
		</view>


		<u-loadmore @loadmore="loadMore" :status="status" fontSize="30rpx" color="#bbb" />
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
				status: 'loadmore',
				name: '',
				list: [],
				appealCategoryId: '',
				statusList: [],
				total: 0
			};
		},
		onShow() {
			//提交诉求后刷新该页面数据
			if (uni.getStorageSync('appeal')) {
				this.getData()
			}
			uni.removeStorageSync('appeal')
		},
		async onLoad(e) {
			//诉求分类名称
			this.name = e.name
			// 获取该分类最新一页诉求列表
			await this.getData()
			//获取处理状态字典
			await getDataType({}, 'gsh_appeal_state').then(res => {

				this.statusList = res.data.map(e => e.dictLabel)
			})
		},
		methods: {
			//加载更多
			loadMore() {
				this.status = 'loading'
				this.total -= 1
				//获取更多诉求列表
				getHotlineCategoryDetails({
					params: {
						appealCategoryId: uni.getStorageSync('appealCategoryId'),
						pageSize: '10',
						pageNum: this.total
					}
				}).then(res => {
					this.list = this.list.concat(res.rows.reverse())

					if (this.list.length < res.total) {
						this.status = 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			},
			//点击发布诉求按钮
			jumpAppeal() {
				uni.navigateTo({
					url: '/pages/hotline/hotlineAppeal'
				})
			},
			//点击诉求列表卡片
			jumpDetails(item) {
				uni.navigateTo({
					url: '/pages/hotline/hotlineAppealDetails?id=' + item.id
				})
			},
			async getData() {
				//获取该分类最新一页诉求列表
				await getHotlineCategoryDetails({
					params: {
						appealCategoryId: uni.getStorageSync('appealCategoryId'),
						pageSize: '0',
						pageNum: 1
					}
				}).then(res => {
					this.total = Math.ceil((res.total / 10))
				})
				await getHotlineCategoryDetails({
					params: {
						appealCategoryId: uni.getStorageSync('appealCategoryId'),
						pageSize: '10',
						pageNum: this.total
					}
				}).then(res => {
					this.list = res.rows.reverse()
				})
			}
		},

	}
</script>

<style lang="scss">
	.appeal {
		font-size: 25rpx;
		color: #bbb;
	}
</style>
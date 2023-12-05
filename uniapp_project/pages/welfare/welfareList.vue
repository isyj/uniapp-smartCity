<template>
	<view>
		<u-navbar title="爱心捐赠" placeholder="" autoBack=""></u-navbar>
		<u-search v-model="keyword" style="margin-bottom: 15rpx;" placeholder="请输入内容" height="20rpx" @search="search()"
			@custom="search()" focus></u-search>

		<view class="card">
			<uni-card :title="item.name" :subTitle="item.createTime" thumbnail="" :extra="item.author" note="Tips"
				v-for="(item,index) in searchList" :key="index">
				<image slot="cover" :src="ip + item.imgUrl" mode="aspectFill"></image>
				<view class="">
					捐赠人数：{{item.donateCount}}
				</view>
				<view class="">
					已筹善款：{{item.moneyNow}} 元
				</view>
				<view class="">
					所需筹款：{{item.moneyTotal}} 元
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getWelfareActivityList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				searchList: [],
				keyword: ''
			};
		},
		onLoad() {
			// 获取全部活动数据列表
			getWelfareActivityList().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			// 搜索
			search() {
				if (!this.keyword) {
					uni.showToast({
						title: "请输入内容",
						icon: 'error'
					})
					return
				}
				//先清空展示的数据
				this.searchList = []
				for (var i = 0; i < this.list.length; i++) {
					// 判断输入内容是否包含于全部活动内容标题
					if (this.list[i].name.indexOf(this.keyword) >= 0) {
						this.searchList.push(this.list[i])
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.card {
		image {
			width: 100%;
			margin: 20rpx 0 0 0;
			border-radius: 5px;
			max-height: 400rpx;
		}
	}
</style>
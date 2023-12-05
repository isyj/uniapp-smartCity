<template>
	<view>
		<view class="upLoad">
			<uni-card>
				<u--textarea v-model="undertaker" placeholder="请输入承办单位" autoHeight class="txt"></u--textarea>

				<u--textarea v-model="title" placeholder="请输入标题" autoHeight class="txt"></u--textarea>

				<u--textarea v-model="content" count placeholder="请输入内容" class="txt"></u--textarea>
				<u-button type="primary" text="提交" @click="upLoad()"></u-button>
			</uni-card>
		</view>



		<!-- 诉求列表 -->
		<view class="">
			<uni-card :title="item.title" :subTitle="item.createTime" :extra="item.undertaker" note="Tips"
				v-for="(item,index) in list" :key="index">
				处理情况：{{item.detailResult?item.detailResult:'暂无'}}
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getHotlineCategoryDetails,
		postHotlineAppeal
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: [],
				appealCategoryId: '',
				undertaker: '',
				title: '',
				content: '',
				imgUrl: ''
			};
		},
		async onLoad(e) {
			//诉求分类id
			this.appealCategoryId = e.id
			//获取该分类诉求列表
			await getHotlineCategoryDetails({
				params: {
					appealCategoryId: e.id
				}
			}).then(res => {
				this.list = res.rows
			})
		},
		methods: {
			upLoad() {
				postHotlineAppeal({
					appealCategoryId: this.appealCategoryId,
					undertaker: this.undertaker,
					title: this.title,
					content: this.content,
					imgUrl: this.imgUrl
				}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">
	.upLoad {
		.txt {
			margin: 10rpx;
		}
	}
</style>
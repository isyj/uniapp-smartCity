<template>
	<view>
		<uni-card :title="item.name" :subTitle="item.address" :extra="state(item.businessState)" note="Tips"
			v-for="(item,index) in list" :key="index" @click="jump(item.id)">
			营业时间：{{item.businessHours}}
		</uni-card>
	</view>
</template>

<script>
	import {
		getlLibraryList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			state(businessState) {
				if (businessState == 1) {
					return '营业中'
				}
				if (businessState == 0) {
					return '停止营业'
				}
			},
			jump(id) {
				uni.navigateTo({
					url: `/pages/library/libraryDetails?id=${id}`
				})
			}
		},
		onLoad() {
			getlLibraryList().then(res => {
				this.list = res.rows
			})
		}
	}
</script>

<style>

</style>
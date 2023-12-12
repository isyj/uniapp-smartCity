<template>
	<view>
		<u-search height="50rpx" style="margin: 15rpx 0;" v-model="keyword"></u-search>

		<view class="card" v-for="(item,index) in list" :key="index">
			<uni-card :title="item.title" :subTitle="item.startAt" :extra="item.undertaker" note="Tips"
				@click="jump(item)">
				<view class="">
					要求：{{item.requireText}}
				</view>
				<br />
				<u-button type="error" text="报名"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getVolunteerActivityList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				keyword: '',
				list: []
			};
		},
		onLoad() {
			getVolunteerActivityList().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/voluntee/volunteeringDetails?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
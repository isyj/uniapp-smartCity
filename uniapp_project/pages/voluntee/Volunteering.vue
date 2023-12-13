<template>
	<view>
		<u-search height="50rpx" style="margin: 15rpx;" v-model="keyword" @search="search" @custom="search"></u-search>

		<view class="card">
			<uni-card :title="item.title" :subTitle="item.startAt" :extra="item.undertaker" note="Tips"
				v-for="(item,index) in list" :key="index" @click="jump(item)">
				<view class="">
					要求：{{item.requireText}}
				</view>
				<br />
				<view class="" @click.stop>
					<u-button type="error" text="报名" @click="clickBtn(item.id)"></u-button>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getVolunteerActivityList,
		postVolunteerRegister,
	} from "../../config/api.js"
	export default {
		data() {
			return {
				keyword: '',
				list: []
			};
		},
		async onLoad() {
			await getVolunteerActivityList().then(res => {
				this.list = res.rows
			})
		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: '/pages/voluntee/volunteeringDetails?id=' + item.id
				})
			},
			search() {
				getVolunteerActivityList().then(res => {
					for (var i = 0; i < res.rows.length; i++) {
						if (!this.keyword) {
							uni.showToast({
								title: '请输入内容',
								icon: 'error'
							})
						} else if (res.rows[i].title.indexOf(this.keyword) !== -1) {
							this.list = []
							this.list.push(res.rows[i])
						}
					}
				})
			},
			clickBtn(id) {
				postVolunteerRegister({
					activityId: id,
					newState: true
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
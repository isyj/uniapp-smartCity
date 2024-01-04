<template>
	<view>
		<uni-card :title="data.title" :subTitle="data.startAt" :extra="data.undertaker" note="Tips">
			<view class="">
				要求：{{this.data.requireText}}
			</view>
			<br />
			<view class="">
				<u-parse :content="data.detail" domain='ip'></u-parse>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		getVolunteerActivityDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				data: {}
			};
		},
		async onLoad(e) {
			await getVolunteerActivityDetails({}, e.id).then(res => {
				this.data = res.data
			})
			uni.setNavigationBarTitle({
				title: this.data.title
			})
		}
	}
</script>

<style lang="scss">

</style>
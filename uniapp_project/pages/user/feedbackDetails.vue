<template>
	<view>
		<uni-card :title="this.list.title" :extra="this.list.createTime" note="Tips">
			<text>{{this.list.content}}</text>
			<view style="margin-left: 75%;">
				id ：{{this.list.id}}
			</view>
		</uni-card>
	</view>
</template>

<script>
	import {
		getFeedbackDetails
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: {}
			};
		},
		onLoad(e) {
			getFeedbackDetails({}, e.id).then(res => {
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">

</style>
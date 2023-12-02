<template>
	<view>
		<u-navbar placeholder="" :title="list.title" :autoBack="true"></u-navbar>

		<uni-card :title="list.title" :subTitle="list.author" thumbnail="" :extra="list.createTime" note="Tips">
			<u-parse :content="list.content"></u-parse>
		</uni-card>
	</view>
</template>

<script>
	import {
		getTalentPolicyDetailsInfo
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad(e) {
			getTalentPolicyDetailsInfo({}, e.id).then(res => {
				this.list = res.data
			})
		}
	}
</script>

<style lang="scss">

</style>
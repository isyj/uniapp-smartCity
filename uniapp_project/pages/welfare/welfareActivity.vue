<template>
	<view>
		<u-navbar title=""></u-navbar>
	</view>
</template>

<script>
	import {
		getWelfareActivityList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad(e) {
			getWelfareActivityList({
				params: {
					typeId: e.id
				}
			}).then(res => {
				this.list = res.rows
				console.log(res);
			})

		}
	}
</script>

<style lang="scss">

</style>
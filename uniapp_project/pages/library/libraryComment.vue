<template>
	<view>

	</view>
</template>

<script>
	import {
		getlLibraryComment
	} from "../../config/api.js"
	export default {
		data() {
			return {

			};
		},
		onLoad(e) {
			getlLibraryComment({}, e.id).then(res => {
				uni.showToast({
					title: res.msg
				})
			})
		}
	}
</script>

<style lang="scss">

</style>
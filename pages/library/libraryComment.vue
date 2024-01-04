<template>
	<view>


	</view>
</template>

<script>
	import {
		getLibraryComment
	} from "../../config/api.js"
	export default {
		data() {
			return {

			};
		},
		onLoad(e) {
			getLibraryComment({}, e.id).then(res => {
				uni.showToast({
					title: res.msg
				})
			})
		}
	}
</script>

<style lang="scss">

</style>
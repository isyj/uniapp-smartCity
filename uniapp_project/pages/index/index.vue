<template>
	<view class="home">
		<indexNavBar></indexNavBar>
		<indexSwiper />
		<indexServe></indexServe>
	</view>
</template>

<script>
	import indexSwiper from '../../components/indexSwiper/indexSwiper.vue'
	import indexNavBar from '../../components/indexNavBar/indexNavBar.vue'
	import indexServe from "../../components/indexServe/indexServe.vue"

	export default {
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.home {
		padding-top: env(safe-area-inset-top);
	}
</style>
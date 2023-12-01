<template>
	<view class="home">

		<u-navbar :title="this.list.title" placeholder autoBack bgColor="#f8f8f8"></u-navbar>

		<uni-card>
			<u-parse class="content" :content="this.list.content" :domain="this.ip" :tagStyle="style"></u-parse>
		</uni-card>

	</view>
</template>

<script>
	import {
		getNewsDetails
	} from "../../../config/api.js"
	export default {
		data() {
			return {
				list: {},
				style: {
					img: 'width: 100%'
				}
			}
		},
		onLoad(e) {
			getNewsDetails({}, e.id).then(res => {
				this.list = res.data
			})
		},
		methods: {
			backSearch() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">

</style>
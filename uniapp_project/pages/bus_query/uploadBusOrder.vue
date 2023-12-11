<template>
	<view>
		<view class="card">
			<uni-card>
				<u-cell-group :border="false">
					<u-cell title="日期" :value="time"></u-cell>

					<u-cell title="起点" :value="start"></u-cell>

					<u-cell title="终点" :value="end"></u-cell>

					<u-picker :show="show" :columns="list" keyName="label" @cancel="show = false"></u-picker>
					<u-cell title="终点">
						<u-button @click="show = true" slot="value">打开</u-button>
					</u-cell>
					{{this.list}}
				</u-cell-group>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		getBusLineStop
	} from "../../config/api.js"
	export default {
		data() {
			return {
				time: '',
				show: false,
				columns: [
					[{
						label: '雪月夜',
						// 其他属性值
						id: 2021
						// ...
					}, {
						label: '冷夜雨',
						id: 804
					}]
				],
				list: [
					[]
				],
				start: '',
				end: ''
			};
		},
		onLoad(e) {
			this.time = e.time
			getBusLineStop({
				params: {
					linesId: e.lineId
				}
			}).then(res => {
				console.log(res);
				// for (var i = 0; i < res.rows.length; i++) {
				// 	console.log(res.rows[i].name);
				// 	this.list[0].push(res.rows[i].name)
				// }
				this.list[0] = res.rows.map(e => ({
					label: e.name
				}))
				console.log(this.list);
				this.start = res.rows[0].name
				this.end = res.rows[res.rows.length - 1].name
			})
		},
	}
</script>

<style lang="scss">

</style>
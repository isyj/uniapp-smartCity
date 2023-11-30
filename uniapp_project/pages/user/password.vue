<template>
	<view class="home">
		<uni-card>
			<u-cell-group>

				<u-cell title="旧密码">
					<input class="oldPassword" type="password" slot="value" placeholder="请输入旧密码"
						v-model="oldPassword" />
				</u-cell>


				<u-cell title="新密码">
					<input type="password" slot="value" placeholder="请输入新密码" v-model="newPassword" />
				</u-cell>

			</u-cell-group>
			<br />
			<u-button type="primary" @click="revisePassword()">确定</u-button>
		</uni-card>
	</view>
</template>

<script>
	import {
		putUserPassword
	} from "../../config/api.js"
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: ''
			};
		},
		methods: {
			revisePassword() {
				putUserPassword({
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功'
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
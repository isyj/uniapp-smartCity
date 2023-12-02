<template>
	<view>
		<uni-card>

			<u-cell-group :border="false">

				<u-cell title="头像">
					<image :src="ip + this.retisger.avatar" mode="aspectFill" slot="right-icon" @click="setImg()">
					</image>
				</u-cell>


				<u-cell title="昵称">
					<input slot="right-icon" v-model="retisger.nickName" placeholder="请输入昵称"
						placeholder-style="font-size : 30rpx" />
				</u-cell>


				<u-cell title="用户名">
					<input slot="right-icon" v-model="retisger.userName" placeholder="请输入用户名"
						placeholder-style="font-size : 30rpx" />
				</u-cell>


				<u-cell title="密码">
					<input type="password" slot="right-icon" v-model="retisger.password" placeholder="请输入密码"
						placeholder-style="font-size : 30rpx" />
				</u-cell>

				<u-cell title="联系电话">
					<input slot="right-icon" v-model="retisger.phonenumber" placeholder="请输入电话号码"
						placeholder-style="font-size : 30rpx" />
				</u-cell>


				<u-cell title="性别">
					<radio-group slot="right-icon" @change="sex()" style="width : 250rpx;">
						<radio :checked="this.retisger.sex == 0" />男
						<radio :checked="this.retisger.sex == 1" />女
					</radio-group>
				</u-cell>


				<u-cell title="邮箱地址">
					<input slot="right-icon" v-model="retisger.email" placeholder="请输入邮箱地址"
						placeholder-style="font-size : 30rpx" />
				</u-cell>
			</u-cell-group>


			<u-cell title="身份证">
				<input slot="right-icon" v-model="retisger.idCard" placeholder="请输入身份证"
					placeholder-style="font-size : 30rpx" />
			</u-cell>
			</u-cell-group>


			<u-button type="primary" @click="upLoadRegister()">确定</u-button>

		</uni-card>
	</view>
</template>

<script>
	import {
		postRegister
	} from "../../config/api.js"
	export default {
		data() {
			return {
				retisger: {
					avatar: '/prod-api/profile/upload/2023/12/02/9b60d6d3-7f45-46a3-aa6b-398fc216e304.png',
					nickName: '',
					userName: '',
					password: '',
					phonenumber: '',
					sex: 0,
					email: '',
					idCard: ''
				},
			};
		},
		methods: {
			setImg() {
				uni.showToast({
					title: '请注册后修改',
					icon: 'error'
				})
			},

			sex() {
				if (this.retisger.sex == 0) {
					this.retisger.sex = 1
				} else {
					this.retisger.sex = 0
				}
			},

			upLoadRegister() {
				if (this.test()) {
					postRegister(this.retisger).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						if (res.code == 200) {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}
					})
				}
			},

			test() {
				if (uni.$u.test.isEmpty(this.retisger.nickName)) {
					uni.showToast({
						title: "请输入昵称",
						icon: 'error'
					})
					return false
				} else if (uni.$u.test.isEmpty(this.retisger.userName)) {
					uni.showToast({
						title: "请输入用户名",
						icon: 'error'
					})
					return false
				} else if (uni.$u.test.isEmpty(this.retisger.password)) {
					uni.showToast({
						title: "请输入密码",
						icon: 'error'
					})
					return false
				} else if (!this.$u.test.mobile(this.retisger.phonenumber)) {
					uni.showToast({
						title: "手机号格式错误",
						icon: 'error'
					})
					return false
				} else if (!this.$u.test.email(this.retisger.email)) {
					uni.showToast({
						title: "邮箱格式错误",
						icon: 'error'
					})
					return false
				} else if (!this.$u.test.idCard(this.retisger.idCard)) {
					uni.showToast({
						title: "身份证格式错误",
						icon: 'error'
					})
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
</style>
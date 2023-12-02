<template>
	<view>

		<uni-card>
			<u-cell-group :border="false">

				<u-cell :disabled="changeState" title="头像">
					<image :src="ip+this.userInfo.avatar" mode="aspectFill" slot="right-icon" @click="upLoadCover()">
					</image>
				</u-cell>

				<u-cell disabled title="用户名" :value="userInfo.userName">

				</u-cell>

				<u-cell :disabled="changeState" title="昵称">
					<input :disabled="changeState" slot="right-icon" type="text" v-model="userInfo.nickName" />
				</u-cell>


				<u-cell :disabled="changeState" title="性别">
					<radio-group slot="right-icon" @change="sex()" style="width : 250rpx;">
						<radio :disabled="changeState" :checked="this.userInfo.sex == 0" />男
						<radio :disabled="changeState" :checked="this.userInfo.sex == 1" />女
					</radio-group>
				</u-cell>


				<u-cell :disabled="changeState" title="联系电话">
					<input :disabled="changeState" slot="right-icon" type="text" v-model="phoneNumber"
						@focus="phoneNumber=userInfo.phonenumber" @blur="blurPhoneNumber()" />
				</u-cell>


				<u-cell :disabled="changeState" title="邮箱地址">
					<input :disabled="changeState" slot="right-icon" type="text" v-model="userInfo.email" />
				</u-cell>


				<u-cell disabled title="身份证" :value="idCard()"></u-cell>


				<u-cell disabled title="余额" :value="'￥' + this.userInfo.balance"></u-cell>


				<u-cell disabled title="积分" :value="this.userInfo.score"></u-cell>

				<br />

				<u-button @click="uploadUserInfo()" type="error">{{changeState?"修改":"保存"}}</u-button>

			</u-cell-group>
		</uni-card>

	</view>
</template>

<script>
	import {
		putUserInfo,
		getUserInfo,
		postLoadFile
	} from "../../config/api.js"
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				phoneNumber: uni.getStorageSync('userInfo').phonenumber.slice(0, -4) + '****',
				changeState: true
			}
		},
		methods: {
			idCard() {
				if (this.userInfo.idCard) {
					this.userInfo.idCard = this.userInfo.idCard.slice(0, -4) + '****'
					return this.userInfo.idCard
				}
			},
			sex() {
				if (this.userInfo.sex == 0) {
					this.userInfo.sex = 1
				} else {
					this.userInfo.sex = 0
				}
			},

			blurPhoneNumber() {
				if (this.phoneNumber.indexOf('*') == -1) {
					this.userInfo.phonenumber = this.phoneNumber
				}
				this.phoneNumber = this.phoneNumber.slice(0, -4) + '****'
			},

			async uploadUserInfo() {
				this.changeState = !this.changeState
				if (this.changeState) {
					let flag = Boolean(this.$u.test.mobile(this.userInfo.phonenumber) && uni.$u.test.isEmpty(!this
						.userInfo
						.nickName) && this.$u.test.email(this.userInfo.email))
					if (flag) {
						await putUserInfo(this.userInfo).then(res => {
							if (res.code == 200) {
								uni.showToast({
									title: res.msg
								});
							} else {
								console.log(res.msg);
								uni.showToast({
									title: res.msg.substring(13, 20),
									icon: 'error'
								});
							}
						});
						await getUserInfo().then(res => {
							this.userInfo = res.user
							uni.setStorageSync('userInfo', res.user)
						});
					} else {
						this.changeState = !this.changeState
						uni.showToast({
							title: '格式有误',
							icon: 'error'
						});
					}
				}
			},
			upLoadCover() {
				if (!this.changeState) {
					uni.chooseImage({
						count: 1,
						success: (e) => {
							postLoadFile({
								filePath: e.tempFilePaths[0],
								name: 'file'
							}).then(res => {
								this.userInfo.avatar = '/prod-api' + res.fileName
							})
						}
					})
				}
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

	input {
		width: 260rpx;
		font-size: 28rpx
	}
</style>
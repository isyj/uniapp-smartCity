<template>
	<view>
		<u-datetime-picker closeOnClickOverlay :show="show" v-model="value1" mode="date" @cancel="show = false"
			@close="show = false" @confirm="confirm"></u-datetime-picker>

		<view class=" card">
			<uni-card>
				<uni-icons type="right" @click="jump()" style="float: right;"></uni-icons>
				<u-cell-group :border="false" style="margin-top: 50rpx;">
					<u-cell title="家庭住址">
						<input slot="right-icon" type="text" placeholder="请输入家庭住址" v-model="myCard.address" />
					</u-cell>
					<u-cell title="出生年月日">
						<text class="txt" slot="right-icon" @click="show = true">{{myCard.birthday}}</text>
					</u-cell>
					<u-cell title="身份证">
						<input slot="right-icon" type="text" placeholder="请输入身份证" v-model="myCard.cardId" />
					</u-cell>
					<u-cell title="姓名">
						<input slot="right-icon" type="text" placeholder="请输入姓名" v-model="myCard.name" />
					</u-cell>
					<u-cell title="性别">
						<u-radio-group slot="right-icon" @change="change" v-model="myCard.sex">
							<u-radio label="男" name="0"></u-radio>
							<u-radio label="女" name="1"></u-radio>
						</u-radio-group>
					</u-cell>
					<u-cell title="电话">
						<input slot="right-icon" type="text" placeholder="请输入电话" v-model="myCard.tel" />
					</u-cell>
				</u-cell-group>

				<u-button type="error" @click="submit()">提交</u-button>
			</uni-card>

		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		postPatientInfo
	} from "../../config/api.js"
	export default {
		data() {
			return {
				userInfo: {},
				show: false,
				value1: Number(new Date()),
				myCard: {
					address: '',
					birthday: '请选择出生日期',
					cardId: '',
					name: '',
					sex: '',
					tel: ''
				}
			};
		},
		async onLoad() {
			//获取用户个人信息
			await getUserInfo().then(res => {
				this.myCard.cardId = res.user.idCard
				this.myCard.tel = res.user.phonenumber
				this.myCard.sex = res.user.sex
			})
		},
		methods: {
			// 选择性别
			change(item) {
				this.sex = item
			},
			//选择出生日期
			confirm(item) {
				this.show = false
				this.myCard.birthday = uni.$u.timeFormat(item.value, 'yyyy-mm-dd')
			},
			submit() {
				//判断输入就诊信息是否正确
				let flag = Boolean(this.myCard.address != '' && uni.$u.test
					.mobile(this.myCard.tel) && uni.$u.test
					.chinese(this.myCard.name))
				if (flag) {
					//提交就诊信息
					postPatientInfo(this.myCard).then(res => {
						uni.showToast({
							title: res.msg,
						})
					})
				} else {
					uni.showToast({
						title: '格式有误',
						icon: 'error'
					})
				}
			},
			jump() {
				uni.navigateTo({
					url: '/pages/outpatient/hospitalCategory'
				})
			}
		}
	}
</script>

<style lang="scss">
	input {
		width: 300rpx;
		font-size: 30rpx
	}

	.txt {
		width: 300rpx;
		font-size: 30rpx
	}
</style>
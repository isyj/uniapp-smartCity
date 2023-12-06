<template>
	<view>
		<view class="upLoad">
			<uni-card>
				<view class="" style="width: 90%;margin: 0 auto;">
					<uni-data-select v-model="value" :localdata="classify" @change="change"
						:clear="false"></uni-data-select>
				</view>

				<u--textarea v-model="appeal.title" placeholder="请输入标题" autoHeight class="txt"></u--textarea>

				<u--textarea v-model="appeal.undertaker" placeholder="请输入承办单位" autoHeight class="txt"></u--textarea>

				<u--textarea placeholder="请输入反馈手机" autoHeight class="txt"></u--textarea>

				<u--textarea v-model="appeal.content" count placeholder="请输入内容" class="txt"></u--textarea>

				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="1"></u-upload>

				<u-button type="primary" text="提交" @click="upLoad()"></u-button>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import {
		postHotlineAppeal,
		postLoadFile,
		getHotlineCategoryList
	} from "../../config/api.js"
	export default {
		data() {
			return {
				value: 0,
				classify: [],
				fileList1: [],
				appeal: {
					appealCategoryId: '',
					undertaker: '',
					title: '',
					content: '',
					imgUrl: ''
				}
			};
		},
		onLoad(e) {
			getHotlineCategoryList().then(res => {
				this.classify = res.rows.map(e => ({
					value: e.id,
					text: e.name
				}))
			})
		},
		methods: {
			// 选择诉求分类
			change(e) {
				//诉求分类id
				this.appeal.appealCategoryId = e
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			//上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = postLoadFile({
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						}
					}).then(res => {
						setTimeout(() => {
							this.appeal.imgUrl = '/prod-api/' + res.fileName
							resolve(res)
						}, 1000)
					})
				})
			},
			//点击提交按钮 上传诉求
			upLoad() {
				postHotlineAppeal(this.appeal).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.msg
						})
					} else {
						uni.showToast({
							title: '请选择分类',
							icon: 'error'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.upLoad {
		.txt {
			margin: 25rpx;
		}
	}
</style>
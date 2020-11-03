<template>
	<video :src="videoSrc" :style="cusStyle" :class="cusClass" controls></video>
</template>

<script>
	// iframe 转 video
	export default {
		props: {
			// 模式 tx: 腾讯视频
			mode: {
				type: String,
				default: () => 'tx'
			},
			vid: {
				type: String,
				required: true
			},
			cusStyle: {
				type: [Object, String]
			},
			cusClass: {
				type: String
			}
		},
		data() {
			return {
				videoSrc: ''
			}
		},
		created() {
			if (this.mode === 'tx') {
				this.getTxVideo(this.vid)
			}
		},
		methods: {
			// 获取腾讯视频video视频源
			// 微信小程序video组件调用腾讯视频的解决方案 https://jiezhe.net/post/38.html
			getTxVideo(vid) {
				let that = this
				uni.request({
					url: `http://vv.video.qq.com/getinfo?vids=${vid}&platform=101001&charge=0&otype=json`,
					success(res) {
						try {
							let data = JSON.parse(res.data.slice(13, res.data.length - 1))
							let data1 = data.vl.vi[0]
							let url = data1.ul.ui[0].url
							let fvkey = data1.fvkey
							let fn = data1.fn
							console.log(`${url}${fn}?vkey=${fvkey}`)
							that.videoSrc = `${url}${fn}?vkey=${fvkey}`
						} catch (error) {
							uni.showToast({
								title: 'vid有误!',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>

<template>
	<view class="detail">
		<img src="http://hgqweb.cn/7d2c163f06b3dc113be2f89878e05df.png" alt="" @click="previewImgage">
	</view>
</template>

<script>
	export default {
		methods: {
			previewImgage () {
				uni.previewImage({
					current: '0',
					urls: ['http://hgqweb.cn/7d2c163f06b3dc113be2f89878e05df.png'],
					indicator: 'number',
					loop: true,
					success: ()=>{
						console.log('预览')
					}
					
				})
			}
		}
	}
</script>

<style lang="less">
.detail {
	text-align: center;
	img {
		display: inline-block;
		width: 563rpx;
		height: 1167rpx;
	}
}
</style>

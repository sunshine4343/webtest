<template>
	<view class="detail">
		<div class="title">
			{{detail_content.title}}
		</div>
		<div class="content" v-html="detail_content.content">
			<!-- <div v-html="item.content" v-for="(item,index) in detail_content.content" :key="index" :class="item.class">
			</div> -->
		</div>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				detail_id: '',
				detail_content: {}
			}
		},
		onLoad (options) {
			this.detail_id = options.id
			this.loadData()
		},
		onPullDownRefresh () {
			this.detail_content = {}
			this.loadData()
			 setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1200);
		},
		methods: {
			loadData () {
				this.$request('/wxzone/getOnceWebtest.php?id='+this.detail_id).then((ret)=>{
					this.detail_content = ret.data.data[0]
					this.detail_content.content = this.detail_content.content.substring(1,this.detail_content.content.length-1)
				}).catch(error=>{
					console.log(error)
				})

				// uni.request({
				// 	url: 'https://www.hgqweb.cn/wxinterface/wxzone/getOnceWebtest.php?id='+this.detail_id,
				// 	success: (res) => {
				// 		this.detail_content = res.data.data[0];
				// 	},
				// 	fail: (error) => {
				// 		console.log(error)
				// 	}
				// });
			},
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
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
	letter-spacing: 4rpx;
	img {
		display: inline-block;
		width: 563rpx;
		height: 1167rpx;
	}
	.title {
		width: 100%;
		font-size: 42rpx;
		color: #333333;
		font-weight: bold;
		margin: 24rpx auto 48rpx;
		padding: 0 12rpx;
		box-sizing: border-box;
	}
	.content {
		font-size: 32rpx;
		color: #333333;
		white-space: pre-wrap;
		text {
			display: block;
			width: 100%;
		}
		.text {
			width: 100%;
			border-radius: 8rpx;
			padding: 12rpx;
			box-sizing: border-box;
			margin: 10rpx auto;
		}
		.tit {
			width: 100%;
			margin: 10rpx auto;
			color: #47e92a;
			font-size: 36rpx;
			padding: 0 12rpx;
			box-sizing: border-box;
		}
		.code {
			width: 100%;
			background: #eeeeee;
			border-radius: 8rpx;
			margin: 10rpx auto;
			padding: 24rpx;
			box-sizing: border-box;
			color: #999999;
			font-size: 30rpx;
			background-color: #f8f8f8;
			overflow-x: auto;
			.code-text {
				width: 200%;
				background-color: inherit;
			}
		}
	}
}
</style>

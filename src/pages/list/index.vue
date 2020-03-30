<template>
	<view class="container">
		<ul class="content">
			<li v-for="(kind,index) in kindLists" :key="index" @click="goToDetail(kind)">
				<div>{{index + 1}}、{{kind.tit}}</div>
				<div><img src="../../static/icon-right3.png" alt=""></div>
			</li>
		</ul>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				kindLists: [
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: '手写实现4种继承'
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: '对原型链的理解？prototype上都有哪些属性'
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: '节流和防抖'
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'let const var作用域'
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'ajax和axios、fetch的区别'
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: '浏览器如何阻止事件传播，阻止默认行为'
					}
				]
			}
		},
		methods: {
			goToDetail (item) {
				uni.navigateTo({
					url: '/pages/detail/index'
				})
			}
		}
	}
</script>
<style scoped lang="less">
.container {
	width: 100%;
	padding: 24rpx 0;
	box-sizing: border-box;
	background-color: #f5f5f5;
	overflow: hidden;
	.content {
		width: 100%;
		li {
			width: calc(100% - 16rpx);
			padding: 24rpx 0;
			background-color: #FFFFFF;
			position: relative;
			overflow: hidden;
			color: #143dcc;
			border-bottom: 1rpx solid #eeeeee;
			div:nth-child(1) {
				width: 100%;
				height: 100%;
				float: right;
				padding: 0 108rpx 0 10rpx;
				line-height: 64rpx;
				box-sizing: border-box;
			}
			div:nth-child(2) {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				right: 36rpx;
				top: 50%;
				transform: translateY(-50%);
				img {
					width: 100%;
					height: 100%;
				}
			}
			li:nth-child(1) {
				margin-top: 0;
			}
		}
	}
}
</style>
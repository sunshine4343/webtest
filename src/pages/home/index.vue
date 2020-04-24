<template>
	<view class="container">
		<div class="header">
			<img src="../../static/zuanshi.png" alt="">
			0 积分
			<span>每日签到</span>
		</div>
		<ul class="content">
			<li v-for="(kind,index) in kindLists" :key="index" @click="goToList(kind)">
				<div><img :src="kind.img" alt=""></div>
				<div>【{{kind.tit}}】<span>面试题</span></div>
				<div><img src="http://hgqweb.cn/icon-right2.png" alt=""></div>
			</li>
		</ul>
		<div class="footer">
			-欢迎访问作者技术博客「https://www.hgqweb.cn」-
		</div>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				kindLists: [
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Javascript',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Node.js',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'ES6',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Vue',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Typescript',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'HTML+CSS',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: '网络',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Git',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Webpack',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Java',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'MySQL',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'PHP',
						id: ''
					},
					{
						img: 'http://hgqweb.cn/basicprofile.png',
						tit: 'Python',
						id: ''
					}
				]
			}
		},
		methods: {
			goToList (item) {
				uni.navigateTo({
					url: '/pages/list/index?tag='+item.tit
				})
			}
		}
	}
</script>
<style scoped lang="less">
.container {
	width: 100%;
	padding: 16rpx 24rpx;
	box-sizing: border-box;
	background-color: #f5f5f5;
	overflow: hidden;
	.header {
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		color: #333333;
		img {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			vertical-align: middle;
			margin-right: 12rpx;
		}
		span {
			color: gray;
			float: right;
			font-size: 32rpx;
		}
		img:nth-child(2) {
			width: 32rpx;
			height: 32rpx;
			display: inline-block;
			vertical-align: middle;
			float: right;
			margin-left: 6rpx;
			margin-right: 0;
		}
	}
	.content {
		width: 100%;
		list-style: none;
		padding: 0;
		li {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			margin: 24rpx auto;
			position: relative;
			box-shadow: 0 8rpx 4rpx 4rpx #eeeeee;
			color: #143dcc;
			div:nth-child(1) {
				width: 120rpx;
				height: 100%;
				float: left;
				img {
					width: 100%;
					height: 100%;
				}
			}
			div:nth-child(2) {
				width: calc(100% - 120rpx);
				height: 100%;
				float: right;
				line-height: 120rpx;
				span {
					margin-left: 12rpx;
				}
			}
			div:nth-child(3) {
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
	.footer {
		font-size: 28rpx;
		color: gray;
		text-align: center;
		margin: 36rpx;
	}
}
</style>
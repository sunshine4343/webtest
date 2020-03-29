<template>
	<view class="container">
		<ul class="content">
			<li v-for="(kind,index) in kindLists" :key="index" @click="goToList(kind)">
				<div><img :src="kind.img" alt=""></div>
				<div>{{kind.tit}}</div>
				<div><img src="http://hgqweb.cn/icon-right2.png" alt=""></div>
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
						tit: 'Javascript',
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
						tit: 'HTML+CSS',
						id: ''
					}
				]
			}
		},
		methods: {
			goToList (item) {
				uni.navigateTo({
					url: '/pages/list/index'
				})
			}
		}
	}
</script>
<style scoped lang="less">
.container {
	width: 100%;
	padding: 24rpx 16rpx;
	box-sizing: border-box;
	background-color: #e6e6e6;
	overflow: hidden;
	.content {
		width: 100%;
		li {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			margin: 16rpx auto;
			position: relative;
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
}
</style>
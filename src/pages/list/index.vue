<template>
	<view class="container">
		<ul class="content" v-if="!noData">
			<li v-for="(kind,index) in kindLists" :key="index" @click="goToDetail(kind)">
				<div>
					{{index + 1}}、{{kind.title}}
					<p>{{kind.createdate}} | {{kind.system}}</p>
				</div>
				<div><img src="../../static/icon-right3.png" alt=""></div>
			</li>
		</ul>
		<ul v-else class="content">
			<li style="text-align:center;color:gray;">暂无数据</li>
		</ul>

	</view>
</template>
<script>
	export default {
		data () {
			return {
				kindLists: [],
				tagName: '',
				page: 1,
				limit: 10,
				noData: false
			}
		},
		// onShow () {
		// 	this.page = 1
		// 	this.kindLists = []
		// 	this.loadData()
		// },
		onLoad (options) {
			if(options) {
				this.tagName = options.tag
			}
			this.loadData()
		},
		onPullDownRefresh () {
			this.page = 1
			this.kindLists = []
			this.loadData()
			 setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1200);
		},
		onReachBottom () {
			this.page++
			this.loadData()
		},
		methods: {
			loadData () {
				let data = {
					tag: this.tagName,
					page: this.page,
					limit: this.limit
				};
				this.$request('/wxzone/getWebtestList.php',data).then((res)=>{
					this.kindLists = this.kindLists.concat(res.data.data)
					if(this.page == 1 && this.kindLists.length == 0) {
						this.noData = true
					}
				}).catch(error=>{
					console.log(error)
				})
			},
			goToDetail (item) {
				uni.navigateTo({
					url: '/pages/detail/index?id='+item.id
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
	background-color: #ffffff;
	overflow: hidden;
	.content {
		width: 100%;
		list-style: none;
		padding: 0;
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
				p {
					color: #666;
					font-size: 24rpx;
				}
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
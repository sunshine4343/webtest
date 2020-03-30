<template>
    <div class="myworld">
        <div class="user-login">
            <img :src="isLogin?thisUserInfo.avatarUrl||thisUserInfo.headurl:'http://hgqweb.cn/noheadurl.png'" alt="">
            <span v-if="!isLogin">您好,<button type="default" class="apply" :disabled="isDisabled" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appBindUserInfo">登录</button>体验更多功能</span>
            <span v-else>{{ thisUserInfo.nickName || thisUserInfo.nickname }}</span>
            <!-- 登录状态 -->
            <span v-if="isLogin" class="leave" @click="leaveLogin">
                <img src="https://files.mijwed.com/static/mini/mjwedshare/icon-leave.png" alt="">
                退出登录
            </span>
        </div>
       <!-- <div class="my-resourse" @click="gotoZN">
            <div class="my-res-l"><img src="https://files.mijwed.com/static/mini/mjwedshare/icon-info-txt.png" alt="">操作指南</div>
            <div class="my-res-r"><img src="https://files.mijwed.com/static/mini/mjwedshare/icon-go-r.png" alt=""></div>
        </div> -->
         <div class="my-resourse share-list">
            <div class="my-res-l"><img src="https://files.mijwed.com/static/mini/mjwedshare/icon-tuijian.png" alt="">推荐小程序给朋友</div>
            <div class="my-res-r"><img src="https://files.mijwed.com/static/mini/mjwedshare/icon-go-r.png" alt=""></div>
            <button open-type="share" class="share-btn"></button>
        </div>
		
		<div class="footer">
			-欢迎访问作者技术博客「https://www.hgqweb.cn」-
		</div>

        <!-- 密码登录弹窗 -->
        <div v-if="isVaitePwd" class="popup">
            <div class="popup-pwd">
                <div class="title">密码验证</div>
                <input v-model="userPwd" class="pwd" type="text" password="true" placeholder="输入密码验证">
                <div class="info">*通过密码获取资源动态发布编辑权限</div>
                <div class="dotted"></div>
                <div class="btn-box">
                    <div class="giveup" @click="giveUp">取消</div>
                    <div class="submit" @click="vaitePwd">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
			thisUserInfo: {},
			isLogin: false,
			is_contract: false,
			onLoadOptions: null,
			userInfo: null,
			profileId: "",
			isDisabled: false,//防止多次点击
			isVaitePwd: false,
			userPwd: '',
			hasKey: false,
			myZoneNum: 0,
			oldPwd: ''
		}
	},

	onShow() {
		
	},

	onLoad () {
		uni.getStorage({
			key: 'userInfo',
			success: (res) => {
				console.log(res.data,'++本地储存中的用户信息++');
				this.thisUserInfo = res.data || null
				this.$store.state.openid = this.thisUserInfo.openid
				this.$store.state.userInfo = this.thisUserInfo
				if(this.thisUserInfo.openid) {
					this.isLogin = true
				}
			}
		});
	},

	methods: {
		gotoMyResourse () {
			if (!this.isLogin) {
				uni.showToast({
					icon: 'none',
					title: '请先登录',
					duration: 1000
				});
				return
			}
			this.isVaitePwd = true
		},
		giveUp () {
			this.isVaitePwd = false
		},
		vaitePwd () {
			if (this.userPwd == 'xiaoting0930') {
				uni.navigateTo({
					url: '/pages/publish/index'
				});
				this.isVaitePwd = false
			} else {
				uni.showToast({
					icon: 'none',
					title: '密码不正确',
					duration: 1000
				});
			}
		},
		//获取Tab标签以及登录密码
		getCapsuleOthers () {
			// eslint-disable-next-line consistent-this
			let _this = this
			this.$http.request(
				this.$API.getTabPwds()
			).then((res) => {
				_this.$store.state.capsuleOthers = res.capsuleOthers
				_this.tabLists = JSON.parse(JSON.stringify(_this.$store.state.capsuleOthers.tagsList))
				_this.tabLists.unshift('全部')
				console.log(_this.tabLists,'*****')
			}).catch((error) => {
				console.log(error);
				this.$hud.showError(error)
			})
		},
		// 用户点击授权 || 之前授权过了 -- 获取用户信息
		appBindUserInfo(res1) {
          console.log(res1,'基础用户信息')
          uni.login({
              success: (res)=>{
                  uni.request({
                     //后台接口地址
                      url: 'https://www.hgqweb.cn/wxinterface/wxzone/wxlogin.php?code='+res.code,
                      header: {
                        'content-type': 'application/json'
                      },
                      success: (res2) => {
                       console.log(res2,'敏感数据')
                       this.$request('/wxzone/createBlogUser.php',{
                           openid:JSON.parse(res2.data.data).openid,
                           nickname:res1.detail.userInfo.nickName,
                           headurl:res1.detail.userInfo.avatarUrl,
                           sex:res1.detail.userInfo.gender==2?'女':'男',
                           city:res1.detail.userInfo.city,
                       }).then(response=>{
                           console.log(response,999)
                           this.$store.state.userInfo = res1.detail.userInfo
                           this.$store.state.openid = JSON.parse(res2.data.data).openid
                           //存储用户信息 + openid
                           let localUserInfo = res1.detail.userInfo
                           localUserInfo.openid = JSON.parse(res2.data.data).openid
						   this.thisUserInfo = localUserInfo;
						   this.isLogin = true
                           uni.setStorage({
                                key: 'userInfo',
                                data: localUserInfo,
                                success: function () {
                                    console.log('success');
                                }
                          });

                       }).catch(err=>{
                           console.log(err)
                       })
                    },
					fail: (error) => {
						console.log(error)
					}
                })
              }
          })
      },
		//退出登录
		leaveLogin () {
			this.userInfo = null
			this.isLogin = false
			this.hasKey = false
			uni.clearStorage();
		},

		//更新动态数量
		upDateZoneNum (openid) {
			// eslint-disable-next-line consistent-this
			let that = this
			let data = {
				content: '',
				limit: 10,
				openId: openid,
				page: 1,
				tags: ''
			}
			that.$http.request(
				that.$API.searPhotoZone(data)
			).then((res) => {
				console.log(res,'----动态----')
				//将总数存起来
				that.$store.state.myZoneNumTotal = res.total_count
				that.myZoneNum = res.total_count
				uni.setStorage({
					key: 'myZoneNumTotal',
					data: res.total_count,
					success: function () {}
				});
			}).catch((error) => {})
		},

		gotoZN () {
			uni.navigateTo({
				url: `/pages/webView/index?url=https://www.hgqweb.cn`
			})
		}
	}
}
</script>

<style lang="less">
.myworld {
    .user-login {
        height: 164upx;
        line-height: 164upx;
        background: #ffffff;
        padding-left: 40upx;
        font-size: 36upx;
        color: #333333;
        font-weight: bold;
        letter-spacing: 3upx;
        .apply {
            border: none !important;
            background: inherit;
            font-size: 36upx;
            width: 80upx !important;
            display: inline !important;
            color: #DC1414;
        }
        .apply::after {
            border: none !important;
        }
        img {
            width: 80upx;
            height: 80upx;
            margin-right: 30upx;
			vertical-align: middle;
        }
        .leave {
            float: right;
            font-size: 32upx;
            color: #999999;
            margin-right: 30upx;
            img {
                width: 36upx;
                height: 36upx;
                margin: 0;
				vertical-align: middle;
            }
        }
    }
    .my-resourse {
        width: 100%;
        height: 104upx;
        display: flex;
        background: #ffffff;
        div {
            line-height: 104upx;
            flex: 1;
            img {
                width: 48upx;
                height: 48upx;
                margin-top: -10upx;
				vertical-align: middle;
            }
        }
        .my-res-l {
            font-size: 34upx;
            color: #333333;
            img {
                margin-left: 40upx;
                margin-right: 20upx;
				vertical-align: middle;
            }
        }
        .my-res-r {
            font-size: 34upx;
            color: #999999;
            text-align: right;
            overflow: hidden;
            position: relative;
            .zonenum {
                display: inline-block;
                width:46upx;
                height:46upx;
                background:rgba(220,20,20,1);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 98upx;
                border-radius:50%;
                text-align: center;
                line-height: 46upx;
                font-size: 28upx;
                color: #FFFFFF;
            }
            img {
                margin-right: 30upx;
                margin-left: 10upx;
                display: inline-block;
				vertical-align: middle;
            }
        }

        &:last-child {
            border-top: 1upx solid #EEEEEE;
            .my-res-l {
                flex: 2;
            }
            .my-res-r {
                flex: 1;
            }
        }
    }

    .common_list1 {
        width: 670upx;
        height: 200upx;
        margin: 80upx auto 0;
        position: relative;
    }
    .share-list {
        position: relative;
        .my-res-l {
            flex: 2;
        }
        .my-res-r {
            flex: 1;
        }

        .share-btn {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0);
            border: none;
        }
        .share-btn::after {
            border: none !important;
        }
    }
	
	.footer {
		font-size: 28rpx;
		color: gray;
		text-align: center;
		margin: 36rpx;
	}
    .my-first {
        margin: 20upx auto;
    }

   .popup {
       width: 100%;
       height: 100%;
       position: fixed;
       left: 0;
       top: 0;
       background-color: rgba(0, 0, 0, .6);
       .popup-pwd {
            width: 560upx;
            height: 426upx;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 20upx;
            overflow: hidden;
            background-color: #FFFFFF;
            .title {
                width: 100%;
                height: 70upx;
                color: #FFFFFF;
                line-height: 70upx;
                font-size: 30upx;
                text-align: center;
                background:linear-gradient(270deg,rgba(220,20,20,1) 0%,rgba(233,69,41,1) 75%,rgba(248,95,67,1) 100%);
            }
            .pwd {
                width: 462upx;
                height: 80upx;
                background:rgba(247,247,247,1);
                border: 2upx solid rgba(204,204,204,1);
                border-radius: 8upx;
                display: block;
                margin: 40upx auto 24upx;
                color: #848488;
                font-size: 30upx;
                padding-left: 20upx;
                box-sizing: border-box;
            }
            .info {
                font-size: 28upx;
                color: #999999;
                width: 100%;
                text-align: center;
            }
            .dotted {
                width: 520upx;
                border-top: 2upx solid #EEEEEE;
                margin: 40upx auto;
            }
            .btn-box {
                width: 420upx;
                height: 60upx;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                div {
                    width: 176upx;
                    height: 56upx;
                    line-height: 56upx;
                    text-align: center;
                    font-size: 28upx;
                    border-radius:10px;

                }
                .giveup {
                    border:2px solid rgba(204,204,204,1);
                    color: #666666;
                }
                .submit {
                    background:linear-gradient(270deg,rgba(220,20,20,1) 0%,rgba(233,69,41,1) 75%,rgba(248,95,67,1) 100%);
                    color: #FFFFFF;
                    width: 180upx;
                    height: 60upx;
                }
            }
        }
   }
}
</style>
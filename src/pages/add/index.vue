<template>
    <div class="add-container">
        <div class="picker-box">
            <picker @change="bindPickerChange" :value="index" :range="kindArray">
                <view class="uni-input">{{kindArray[index]}}</view>
            </picker>
            <input type="text" class="title" v-model="title" placeholder="输入标题">
        </div>
        <div class="btns">
            <button type="primary" @click="addBlock('text')">文本块</button>
            <button type="primary" @click="addBlock('tit')">标题</button>
            <button type="primary" @click="addBlock('code')">代码块</button>
            <button type="primary">图片</button>
        </div>
        <div class="content-box">
            <div v-for="(item,index) in textList" :key="index" :class="[item.type=='text'?'text':item.type == 'tit'?'tit':'code']">
                <textarea @focus="getFocus(index)" maxlength="-1" v-model="item.content" :placeholder="item.type=='text'?'请输入文本块':item.type == 'tit'?'请输入标题':'请输入代码块'" >

                </textarea>
                <img class="delete-img" src="../../static/icon-delete.png" alt="" @click="deleteThisBlock(item,index)">
            </div>
           
        </div>
        <button type="primary" @click="submit()">上传</button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            kindArray: [
                'Javascript',
                'Node.js',
                'ES6',
                'Vue',
                'Typescript',
                'HTML+CSS',
                '网络',
                'Git',
                'Webpack',
                'Java',
                'MySQL',
                'PHP',
                'Python'
            ],
            index: 0,
            title: '',
            textList: [
                {
                    type: 'text',
                    class: 'text',
                    content: ''
                },
                // {
                //     type: 'code',
                //     class: 'code',
                //     content: ''
                // }
            ],
            addIndex: '',
            content: '',
			systemInfo: ''
        }
    },
	onLoad () {
		uni.getSystemInfo({
			success: (res) => {
				console.log(res,'********')
				this.systemInfo = res.model + '-' + res.system
			}
		})
	},
    methods: {
        submit () {
            this.content = ''
            if (this.title == '') {
                uni.showToast({
                    title: '标题不能为空',
                    duration: 2000,
                    icon: 'none'
                });
                return false;
            }
            this.textList.forEach(ele=>{
                ele.content = ele.content.replace(/[\n\r]/g, '<br>').replace(/\s/g, '&nbsp;')
                if(ele.type == 'text') {
                    this.content = this.content + `<div class="text">${ele.content}</div>`
                }else if(ele.type == 'code') {
                    this.content = this.content+ `<div class="code"><div class="code-text">${ele.content}</div></div>`
                }else if(ele.type == 'tit') {
                    this.content = this.content+ `<div class="tit">${ele.content}</div>`
                }
            })

            console.log(this.textList,'**************')

            let data = {
                tag: this.kindArray[this.index],
                title: this.title,
                content: JSON.stringify(this.content),
				system: this.systemInfo
            };
            this.$request('/wxzone/addWebtest.php',data).then((res)=>{
                if(res.data.error == 0) {
                    uni.showToast({
                        title: '上传成功',
                        duration: 2000,
                    });
                    uni.navigateTo({
                        url: '/pages/list/index?tag='+this.kindArray[this.index]
                    })
                }else {
                    uni.showToast({
                        title: '上传失败',
                        duration: 2000,
                    });
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        bindPickerChange: function(e) {
            this.index = e.target.value
        },
        getFocus (index) {
            this.addIndex = index
        },
        addBlock (type) {
            if(type == 'text') {
                this.textList.splice(this.addIndex + 1,0,{
                    type: 'text',
                    class: 'text',
                    placeholder: ''
                })
                // this.textList.push({
                //     type: 'text',
                //     class: 'text',
                //     placeholder: ''
                // })
            }else if(type == 'code') {
                this.textList.splice(this.addIndex + 1,0,{
                    type: 'code',
                    class: 'code',
                    placeholder: ''
                })
                // this.textList.push({
                //     type: 'code',
                //     class: 'code',
                //     placeholder: ''
                // })
            }else if(type == 'tit') {
                this.textList.splice(this.addIndex + 1,0,{
                    type: 'tit',
                    class: 'tit',
                    placeholder: ''
                })
                // this.textList.push({
                //     type: 'tit',
                //     class: 'tit',
                //     placeholder: ''
                // })
            }
        },
        deleteThisBlock (item,index) {
            this.textList.splice(index,1)
        }
    }
}
</script>
<style lang="less">
.add-container {
    width: 100%;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    .picker-box {
        text-align: center;
        color: brown;
        font-weight: bold;
        font-size: 48rpx;
        margin-bottom: 10rpx;
        .title {
            width: 100%;
            height: 72rpx;
            font-weight: normal;
            // line-height: 72rpx;
            border-radius: 6rpx;
            border: 1rpx solid #eeeeee;
            margin: 12px auto;
            text-indent: 24rpx;
            color: #333333;
            font-size: 32rpx;
        }
    }
    .btns {
        width: 100%;
        height: 105rpx;
        display: flex;
        justify-content: space-between;
        margin-bottom: 24rpx;
        button {
            width: 22%;
            height: 100%;
        }
    }
    .content-box {
        div {
            width: 100%;
            padding: 18rpx;
            box-sizing: border-box;
            font-size: 36rpx;
            border: 1rpx solid #eeeeee;
            border-radius: 4rpx;
            margin: 16rpx auto;
            position: relative;
            .delete-img {
                width: 32rpx;
                height: 32rpx;
                position: absolute;
                right: 10rpx;
                top: 10rpx;
                z-index: 99;
            }
        }
        .text {
            overflow: hidden;
            textarea {
                width: 100%;
                max-height: 240rpx;
            }
        }
        .tit {
            overflow: hidden;
            textarea {
                width: 100%;
                max-height: 100rpx;
            }
        }
        .code {
            overflow-x: auto;
            background: #eeeeee;
			position: relative;

            textarea {
				overflow: scroll;
                width: 200%;
                max-height: 240rpx;
            }
        }
    }
}
</style>
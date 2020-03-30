let request = (url,data,method ='GET')=>{
    return new Promise((resolve,reject)=>{
        uni.request({
            url: 'https://www.hgqweb.cn/wxinterface'+url, //仅为示例，并非真实接口地址。
            data:data,
            method:method,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                resolve(res)
            },
            fail:(error)=>{
                reject(error)
            }
        });
    })
}
export default request;

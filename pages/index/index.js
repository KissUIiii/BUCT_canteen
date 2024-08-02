// var WxAutoImage = require('../../js/wxAutoImageCal.js');
var app = getApp();

Page({
    data: {
        imgUrls: [
            {
                src: 'https://s2.loli.net/2024/08/01/6vfRPsqnCi9gzcj.png',
                url: 'https://mp.weixin.qq.com/s/QM-_7AZyHY2q7bNo-chRMg' // 示例外部链接
            },
            {
                src: 'https://s2.loli.net/2024/08/01/6vfRPsqnCi9gzcj.png',
                url: '/pages/mapAll/mapAll' 
            },
            {
                src: 'https://s2.loli.net/2024/08/01/6vfRPsqnCi9gzcj.png',
                url: 'https://mp.weixin.qq.com/s/ah5l71Wtio5N6JHTq5g1HA' // 示例外部链接
            }
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
    },
    cusImageLoad: function(e) {
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    },
    onImageClick: function(event) {
        const url = event.currentTarget.dataset.url;
        if (!url) return;

        if (url.startsWith('http')) {
            wx.navigateTo({
                url: '/pages/webview/webview?url=' + encodeURIComponent(url),
                success: function(res) {
                    console.log('跳转成功', res);
                },
                fail: function(err) {
                    console.error('跳转失败', err);
                }
            });
        } else if (this.isTabBarPage(url)) {
            wx.switchTab({
                url: url,
                success: function(res) {
                    console.log('跳转成功', res);
                },
                fail: function(err) {
                    console.error('跳转失败', err);
                }
            });
        } else {
            wx.navigateTo({
                url: url,
                success: function(res) {
                    console.log('跳转成功', res);
                },
                fail: function(err) {
                    console.error('跳转失败', err);
                }
            });
        }
    },
    isTabBarPage: function(url) {
        const tabBarPages = [
            '/pages/category/category',
            '/pages/mapAll/mapAll',
            '/pages/my/my'
        ];
        return tabBarPages.includes(url);
    }
});

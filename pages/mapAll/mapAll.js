var e = require("../../@babel/runtime/helpers/objectSpread2"),
    t = getApp().globalData.fengmap;

Page({
    data: {},
    fmap: null,
    onReady: function() {
        var e = this;
        console.log("onReady: 开始初始化地图");
        
        // 使用选择器查询API获取#fengMap的canvas节点
        wx.createSelectorQuery().select("#fengMap").node().exec(function(a) {
            if (a && a[0]) {
                var n = a[0].node;
                console.log("Got fengMap canvas:", n);
                e.canvas = n;

                // 再次使用选择器查询API获取#temp的canvas节点
                wx.createSelectorQuery().select("#temp").node().exec(function(a) {
                    if (a && a[0]) {
                        var c = a[0].node;
                        console.log("Got temp canvas:", c);
                        t.FMWXSetting.textureCanvas = [c];

                        // 地图初始化配置
                        var o = {
                            container: n,
                            appName: "蜂鸟研发SDK_2_0",
                            key: "57c7f309aca507497d028a9c00207cf8",
                            mapID: "1514920297309614082",
                            themeID: "1580453922356207618",
                            level: 5,
                            rotation: 90
                        };

                        // 创建并初始化地图对象
                        e.fmap = new t.FMMap(o);
                    } else {
                        console.error("Failed to get temp canvas");
                    }
                });
            } else {
                console.error("Failed to get fengMap canvas");
            }
        });
    },
    onUnload: function() {
        if (this.fmap) {
            this.fmap.dispose();
            this.fmap = null;
            console.log("Map disposed");
        }
    },
    touchStart: function(t) {
        if (this.canvas) {
            // console.log("Touch start", t);
            this.canvas.dispatchTouchEvent(e(e({}, t), {}, { type: "touchstart" }));
        } else {
            console.error("Canvas not initialized for touchStart");
        }
    },
    touchMove: function(t) {
        if (this.canvas) {
            // console.log("Touch move", t);
            this.canvas.dispatchTouchEvent(e(e({}, t), {}, { type: "touchmove" }));
        } else {
            console.error("Canvas not initialized for touchMove");
        }
    },
    touchEnd: function(t) {
        if (this.canvas) {
            // console.log("Touch end", t);
            this.canvas.dispatchTouchEvent(e(e({}, t), {}, { type: "touchend" }));
        } else {
            console.error("Canvas not initialized for touchEnd");
        }
    }
});

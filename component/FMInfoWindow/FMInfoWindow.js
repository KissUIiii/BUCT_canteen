var t = require("../../@babel/runtime/helpers/objectSpread2"), i = require("../../utils/util"), e = getApp().globalData.fengmap;

Component({
    properties: {
        screenPosition: {
            type: "Object",
            value: {
                left: "0px",
                top: "0px"
            }
        }
    },
    data: {
        mapPosition: {
            x: null,
            y: null
        },
        groupID: null,
        isShow: !1
    },
    pageLifetimes: {},
    methods: {
        setFMap: function(t) {
            this.fmMap = t;
            var e = this;
            this.fmMap.on("viewChanged", function(t) {
                i.debounce(function(t) {
                    e.updatePosition();
                }, 150)();
            });
        },
        setPosition_: function(i) {
            var o = this, n = e.FMUtil.coordsMapToScreen(this.fmMap, t({}, i));
            wx.createSelectorQuery().in(this).select(".fm-info-window").boundingClientRect().exec(function(t) {
                var i = t[0], e = i.width, s = i.height;
                o.setData({
                    screenPosition: {
                        left: n.x - e / 2 + "px",
                        top: n.y - s - 15 + "px"
                    }
                });
            });
        },
        updatePosition: function() {
            null !== this.data.mapPosition.x && null !== this.data.mapPosition.y && null !== this.data.mapPosition.level && this.setPosition_(this.data.mapPosition);
        },
        setPosition: function(i) {
            this.setData({
                mapPosition: t({}, i),
                isShow: !0
            }), this.setPosition_(i);
        }
    }
});
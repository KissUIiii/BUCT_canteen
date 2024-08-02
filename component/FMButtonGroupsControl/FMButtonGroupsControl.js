var i = require("../../utils/util"), t = getApp().globalData.fengmap;

Component({
    properties: {
        showBtnCount: {
            type: Number,
            value: 3
        },
        expand: {
            type: Boolean,
            value: !0,
            observer: function(i, t) {
                this.setData({
                    isShowList: i
                });
            }
        },
        enableExpand: {
            type: Boolean,
            value: !0
        },
        offset: {
            type: Array,
            observer: function(i) {
                this.setData({
                    top: i[0],
                    left: i[1]
                });
            }
        }
    },
    data: {
        btnUrl: "./image/",
        scrollHeight: 84,
        focusGroupName: "F1",
        isShowList: !0,
        top: 40,
        left: 40,
        groupIDs: [ {
            gid: 1,
            gname: "F1"
        } ],
        focusGroupID: 1,
        isInBuilding: !1,
        isOutBuilding: !1,
        canClick: !0
    },
    fmMap: null,
    curBuilding: null,
    methods: {
        setFMap: function(n) {
            var e = this;
            this.fmMap = n;
            var s = this.fmMap.getLevel(), u = this.fmMap.getFloorInfos();
            this.initData(s, u), this.fmMap.on("levelChanged", function(i) {
                var t = i.level;
                e.setData({
                    focusGroupID: t
                }), e._setFocusGroupName(t);
            }), this.fmMap.on("buildingEntered", function(n) {
                i.debounce(function(i) {
                    var s, u = e.fmMap.focusBuilding, o = n.buildingID;
                    if ((null === (s = e.curBuilding) || void 0 === s ? void 0 : s.buildingID) !== o) if (u && u.overviewMode !== t.FMOverviewMode.OUTDOOR && o === u.buildingID) {
                        var a = e.fmMap.getBuilding(o), l = a.level, r = a.getFloorInfos();
                        e.curBuilding = a, e.initData(l, r), e.setData({
                            isInBuilding: !0,
                            isOutBuilding: !1
                        });
                    } else e.exitCurBuilding();
                }, 200)();
            }), this.fmMap.on("buildingExited", function(n) {
                e.curBuilding && i.debounce(function(i) {
                    var n = e.fmMap.focusBuilding, s = e.buildingIsInZoomRange(n);
                    (!n || n && n.overviewMode === t.FMOverviewMode.OUTDOOR || !s) && e.exitCurBuilding();
                }, 200)();
            });
        },
        initData: function(i, t) {
            var n = this, e = t.reverse().map(function(i) {
                return {
                    gid: i.level,
                    gname: i.name
                };
            });
            console.log("scrollHeight:", this.properties.showBtnCount < e.length ? 88 * this.properties.showBtnCount - 1 + 24 : 88 * e.length - 1, e.length, this.properties.showBtnCount);
            var s = this.properties.showBtnCount < e.length ? 88 * this.properties.showBtnCount - 1 + 24 : 88 * e.length - 1;
            this.setData({
                focusGroupID: i,
                groupIDs: e,
                scrollHeight: s
            }, function() {
                n._setFocusGroupName(i);
            });
        },
        buildingIsInZoomRange: function(i) {
            if (!i) return !1;
            var t = this.fmMap.getZoom(), n = i.zoomRange, e = !0;
            return n && (t < n.minLevel || t > n.maxLevel) && (e = !1), e;
        },
        switchGroup: function(i) {
            var t = i.currentTarget.dataset.gid;
            this.curBuilding ? this.curBuilding && this.curBuilding.setLevel({
                level: t
            }) : this.fmMap && this.fmMap.setLevel({
                level: t
            });
        },
        folderGroupBtns: function() {
            this.properties.enableExpand && this.setData({
                isShowList: !this.data.isShowList
            });
        },
        exitBuilding: function() {
            var i = this;
            this.data.canClick && (this.setData({
                canClick: !1
            }), this.fmMap && this.fmMap.exitBuilding({
                finish: function() {
                    i.setData({
                        isOutBuilding: !1,
                        isInBuilding: !0,
                        canClick: !0
                    });
                }
            }));
        },
        enterBuilding: function() {
            var i = this;
            this.data.canClick && this.curBuilding && (this.setData({
                canClick: !1
            }), this.fmMap && this.fmMap.enterBuilding({
                buildingID: this.curBuilding.buildingID,
                finish: function() {
                    i.setData({
                        isOutBuilding: !0,
                        isInBuilding: !1,
                        canClick: !0
                    });
                }
            }));
        },
        exitCurBuilding: function() {
            this.curBuilding = null, this.setData({
                isInBuilding: !1,
                isOutBuilding: !1
            });
            var i = this.fmMap.getLevel(), t = this.fmMap.getFloorInfos();
            this.initData(i, t);
        },
        _setFocusGroupName: function(i) {
            var t = this.data.groupIDs.find(function(t) {
                return t.gid === i;
            });
            t && (this.setData({
                focusGroupName: t.gname
            }), console.log(t.gname));
        }
    }
});
var i = require("../../utils/util"), t = getApp().globalData.fengmap;

Component({
    fmMap: null,
    curBuilding: null,
    properties: {
        showBtnCount: {
            type: Number,
            value: 3
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
        isTop: !1,
        isBottom: !0,
        needArrow: !1,
        scrollTop: 0,
        groupIDs: [],
        showBtnCount: 3,
        isAllLayer: !0,
        focusGroupID: 1,
        isInBuilding: !1,
        isOutBuilding: !1,
        top: 40,
        right: 40,
        exitTop: 0,
        canClick: !0
    },
    methods: {
        setFMap: function(e) {
            var s = this;
            this.fmMap = e;
            var n = this.fmMap.getLevel(), l = this.fmMap.getFloorInfos(), u = this.fmMap.getVisibleLevels();
            this.initData(n, l, u), this.fmMap.on("levelChanged", function(i) {
                var t = i.level;
                s.setData({
                    focusGroupID: t
                }, function() {
                    s._setArrowBtnStatus(t), s.updateScrollHeightByFocusGroupID(t);
                });
            }), this.fmMap.on("visibleLevelsLoaded", function(i) {
                var t, e, n, l;
                (s.curBuilding ? null !== (t = null === (e = s.curBuilding) || void 0 === e ? void 0 : e.getVisibleLevels()) && void 0 !== t ? t : [] : null !== (n = null === (l = s.fmMap) || void 0 === l ? void 0 : l.getVisibleLevels()) && void 0 !== n ? n : []).length > 1 ? s.setData({
                    isAllLayer: !0
                }) : s.setData({
                    isAllLayer: !1
                });
            }), this.fmMap.on("buildingEntered", function(e) {
                i.debounce(function(i) {
                    var n, l = s.fmMap.focusBuilding, u = e.buildingID;
                    if (console.log(null != l ? l : "", u, "enter", e.buildingID), (null === (n = s.curBuilding) || void 0 === n ? void 0 : n.buildingID) !== u) if (l && l.overviewMode !== t.FMOverviewMode.OUTDOOR && u === l.buildingID) {
                        var a = s.fmMap.getBuilding(u), o = a.level, r = a.getFloorInfos(), g = a.getVisibleLevels();
                        s.curBuilding = a, s.initData(o, r, g), s.setData({
                            isInBuilding: !0,
                            isOutBuilding: !1
                        });
                    } else s.exitCurBuilding();
                }, 200)();
            }), this.fmMap.on("buildingExited", function(e) {
                s.curBuilding && i.debounce(function(i) {
                    var n = s.fmMap.focusBuilding;
                    console.log(e.buildingID, null != n ? n : "", "exit", s.curBuilding);
                    var l = s.buildingIsInZoomRange(n);
                    (!n || n && n.overviewMode === t.FMOverviewMode.OUTDOOR || !l) && s.exitCurBuilding();
                }, 200)();
            });
        },
        initData: function(i, t, e) {
            var s = this, n = t.reverse().map(function(i) {
                return {
                    gid: i.level,
                    gname: i.name
                };
            }), l = this.properties.showBtnCount < n.length ? 88 * this.properties.showBtnCount - 1 : 88 * n.length - 1, u = l + 84 + 20;
            this.properties.showBtnCount < n.length && (u += 72), this.setData({
                focusGroupID: i,
                groupIDs: n,
                needArrow: this.properties.showBtnCount < n.length,
                scrollHeight: l,
                isAllLayer: e.length > 1,
                exitTop: u
            }, function() {
                s._setArrowBtnStatus(i), s.updateScrollHeightByFocusGroupID(i);
            });
        },
        switchGroup: function(i) {
            var t = i.currentTarget.dataset.gid;
            this.curBuilding ? this.curBuilding && this.curBuilding.setLevel({
                level: t
            }) : this.fmMap && this.fmMap.setLevel({
                level: t
            });
        },
        buildingIsInZoomRange: function(i) {
            if (!i) return !1;
            var t = this.fmMap.getZoom(), e = i.zoomRange, s = !0;
            return e && (t < e.minLevel || t > e.maxLevel) && (s = !1), s;
        },
        exitCurBuilding: function() {
            var i = this;
            this.curBuilding = null, this.setData({
                isInBuilding: !1,
                isOutBuilding: !1
            }, function() {
                var t = i.fmMap.getLevel(), e = i.fmMap.getFloorInfos(), s = i.fmMap.getVisibleLevels();
                i.initData(t, e, s);
            });
        },
        _setArrowBtnStatus: function(i) {
            1 === i ? this.setData({
                isBottom: !0
            }) : i === this.data.groupIDs.length ? this.setData({
                isTop: !0
            }) : this.setData({
                isTop: !1,
                isBottom: !1
            });
        },
        switchLayers: function() {
            this.data.isAllLayer ? this.curBuilding ? this.curBuilding && this.curBuilding.setVisibleLevels([ this.data.focusGroupID ]) : this.fmMap && this.fmMap.setVisibleLevels([ this.data.focusGroupID ]) : this.curBuilding ? this.curBuilding && this.curBuilding.setVisibleLevels(this.data.groupIDs.map(function(i) {
                return i.gid;
            })) : this.fmMap && this.fmMap.setVisibleLevels(this.data.groupIDs.map(function(i) {
                return i.gid;
            }));
        },
        goTop: function() {
            if (!this.data.isTop) {
                var i = this.data.focusGroupID + 1;
                i > 0 && i <= this.data.groupIDs.length && (this.curBuilding ? this.curBuilding.setLevel({
                    level: i
                }) : this.fmMap && this.fmMap.setLevel({
                    level: i
                }));
            }
        },
        goBottom: function() {
            if (!this.data.isBottom) {
                var i = this.data.focusGroupID - 1;
                i > 0 && (this.curBuilding ? this.curBuilding.setLevel({
                    level: i
                }) : this.fmMap && this.fmMap.setLevel({
                    level: i
                }));
            }
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
        updateScrollHeightByFocusGroupID: function(i) {
            var t = 86 * (this.data.groupIDs.length - i);
            this.setData({
                scrollTop: t + "rpx"
            });
        }
    }
});
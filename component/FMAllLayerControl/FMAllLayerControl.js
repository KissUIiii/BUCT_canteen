Component({
    properties: {
        offset: {
            type: Array,
            observer: function(e) {
                this.setData({
                    top: e[0],
                    left: e[1]
                });
            }
        }
    },
    data: {
        btnUrl: "./image/",
        isAllLayer: !1,
        top: 328,
        left: 40
    },
    methods: {
        switchLayers: function() {
            this.data.isAllLayer ? this.fmMap && this.fmMap.setVisibleLevels([ this.fmMap.getLevel() ]) : this.fmMap && this.fmMap.setVisibleLevels(this.fmMap.getFloorInfos().map(function(e) {
                return e.level;
            }));
        },
        setFMap: function(e) {
            var t = this;
            this.fmMap = e;
            var s = this.fmMap.getVisibleLevels();
            this.setData({
                isAllLayer: s.length > 1
            }), this.fmMap.on("visibleLevelsLoaded", function(e) {
                t.fmMap.getVisibleLevels().length > 1 ? t.setData({
                    isAllLayer: !0
                }) : t.setData({
                    isAllLayer: !1
                });
            });
        }
    }
});
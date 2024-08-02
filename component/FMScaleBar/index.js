var t = require("../../utils/util");

Component({
    properties: {
        offset: {
            type: Array,
            observer: function(t) {
                this.setData({
                    top: t[0],
                    left: t[1]
                });
            }
        }
    },
    data: {
        scale: 1,
        scaleWidth: 100,
        unit: "",
        top: 40,
        left: 40
    },
    fmMap: null,
    methods: {
        setFMap: function(e) {
            this.fmMap = e, this.updateScale();
            var a = this;
            this.fmMap.on("zoom", function(e) {
                t.debounce(function(t) {
                    a.updateScale();
                }, 100)();
            });
        },
        updateScale: function() {
            var t = this.fmMap.getScaleBarInfo();
            this.setData({
                scale: t.actualDistance,
                unit: t.unit,
                scaleWidth: t.screenDistance
            });
        }
    }
});
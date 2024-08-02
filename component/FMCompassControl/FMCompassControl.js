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
        btnUrl: "./image/",
        rotation: 0,
        top: 40,
        left: 32
    },
    fmMap: null,
    created: function() {
        console.log("created", this.fmMap);
    },
    lifetimes: {
        attached: function() {
            console.log("attached");
        },
        detached: function() {}
    },
    methods: {
        setFMap: function(o) {
            var e = this;
            this.fmMap = o, this.fmMap && this.fmMap.on("viewChanged", function(o) {
                var a = e.fmMap.getRotation();
                if (a !== e.data.rotation) {
                    var i = e;
                    t.debounce(function(t) {
                        i.setData({
                            rotation: -a
                        });
                    }, 100)();
                }
            });
        },
        rotateToZero: function() {
            this.fmMap && this.fmMap.setRotation({
                rotation: 0,
                duration: .3,
                finish: function() {
                    console.log("rotateTo complete!");
                }
            });
        }
    }
});
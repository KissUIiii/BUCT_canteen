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
        top: 452,
        left: 40
    },
    fmMap: null,
    methods: {
        setFMap: function(t) {
            this.fmMap = t;
        },
        zoomIn: function() {
            this.fmMap && this.fmMap.zoomIn();
        },
        zoomOut: function() {
            this.fmMap && this.fmMap.zoomOut();
        }
    }
});
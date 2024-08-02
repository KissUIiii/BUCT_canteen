Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../@babel/runtime/helpers/classCallCheck"), t = require("../@babel/runtime/helpers/createClass"), n = [ {
    x: 11791481.889093,
    y: 3418801.912089,
    angle: 0
}, {
    x: 11791483.847014,
    y: 3418802.017923,
    angle: 0
}, {
    x: 11791486.175352,
    y: 3418802.282507,
    angle: 0
}, {
    x: 11791488.027439,
    y: 3418802.441257,
    angle: 0
}, {
    x: 11791490.937862,
    y: 3418802.38834,
    angle: 90
}, {
    x: 11791493.054532,
    y: 3418802.176673,
    angle: 0
}, {
    x: 11791495.964955,
    y: 3418801.965006,
    angle: -60
}, {
    x: 11791498.134543,
    y: 3418801.806256,
    angle: -30
}, {
    x: 11791499.827879,
    y: 3418801.753339,
    angle: 0
}, {
    x: 11791501.521216,
    y: 3418801.647506,
    angle: -60
}, {
    x: 11791503.320056,
    y: 3418801.394828,
    angle: -30
}, {
    x: 11791504.828184,
    y: 3418800.561389,
    angle: 0
}, {
    x: 11791506.574437,
    y: 3418799.807325,
    angle: -30
} ];

exports.default = function() {
    function a() {
        e(this, a), this._freq = 800, this._index = 0, this._timer = null;
    }
    return t(a, [ {
        key: "_getMockdata",
        value: function() {
            var e;
            return this._index > n.length - 1 && (this._index = 0), e = n[this._index], this._index++, 
            e;
        }
    }, {
        key: "updateLocation",
        value: function(e) {
            var t = this;
            this._timer = setInterval(function() {
                return e(t._getMockdata());
            }, this._freq);
        }
    }, {
        key: "stopUpdateLocation",
        value: function() {
            this._timer && (clearInterval(this._timer), this._timer = null), console.log("update stoped.");
        }
    } ]), a;
}();
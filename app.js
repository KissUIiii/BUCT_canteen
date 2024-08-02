var i = require("@babel/runtime/helpers/objectSpread2"), e = require("./utils/fengmap.minimap.min.js"), n = require("./utils/fengmap.minianalyser.min"), a = require("./utils/fengmap.miniplugin.navi.min"), m = i(i(i({}, e.fmMap), n.fmAnalyser), a.fmNavi);

App({
    onLaunch: function() {},
    globalData: {
        fengmap: m
    }
});
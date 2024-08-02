module.exports = {
    throttle: function(t, n) {
        var o = Date.now();
        return function() {
            var e = this, r = arguments, u = Date.now();
            console.log(u - o > n, "throttle"), u - o > n && (t.apply(e, r), o = Date.now());
        };
    },
    debounce: function(t, n) {
        var o;
        return function() {
            var e = this, r = arguments, u = function() {
                o = null, t.apply(e, r);
            };
            clearTimeout(o), o = setTimeout(u, n);
        };
    }
};
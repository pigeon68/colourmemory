/*!
* @license TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs = this.createjs || {},
createjs.extend = function(a, b) {
    "use strict";
    function c() {
        this.constructor = a
    }
    return c.prototype = b.prototype,
    a.prototype = new c
}
,
this.createjs = this.createjs || {},
createjs.promote = function(a, b) {
    "use strict";
    var c = a.prototype
      , d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;
    if (d) {
        c[(b += "_") + "constructor"] = d.constructor;
        for (var e in d)
            c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e])
    }
    return a
}
,
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a(a, b, c) {
        this.type = a,
        this.target = null,
        this.currentTarget = null,
        this.eventPhase = 0,
        this.bubbles = !!b,
        this.cancelable = !!c,
        this.timeStamp = (new Date).getTime(),
        this.defaultPrevented = !1,
        this.propagationStopped = !1,
        this.immediatePropagationStopped = !1,
        this.removed = !1
    }
    var b = a.prototype;
    b.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }
    ,
    b.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ,
    b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ,
    b.remove = function() {
        this.removed = !0
    }
    ,
    b.clone = function() {
        return new a(this.type,this.bubbles,this.cancelable)
    }
    ,
    b.set = function(a) {
        for (var b in a)
            this[b] = a[b];
        return this
    }
    ,
    b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ,
    createjs.Event = a
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a() {
        this._listeners = null,
        this._captureListeners = null
    }
    var b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener,
        a.on = b.on,
        a.removeEventListener = a.off = b.removeEventListener,
        a.removeAllEventListeners = b.removeAllEventListeners,
        a.hasEventListener = b.hasEventListener,
        a.dispatchEvent = b.dispatchEvent,
        a._dispatchEvent = b._dispatchEvent,
        a.willTrigger = b.willTrigger
    }
    ,
    b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c),
        e = d[a],
        e ? e.push(b) : d[a] = [b],
        b
    }
    ,
    b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b,
        b = b.handleEvent),
        c = c || this,
        this.addEventListener(a, function(a) {
            b.call(c, a, e),
            d && a.remove()
        }, f)
    }
    ,
    b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == b) {
                        1 == g ? delete d[a] : e.splice(f, 1);
                        break
                    }
        }
    }
    ,
    b.off = b.removeEventListener,
    b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a],
        this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }
    ,
    b.dispatchEvent = function(a) {
        if ("string" == typeof a) {
            var b = this._listeners;
            if (!b || !b[a])
                return !1;
            a = new createjs.Event(a)
        } else
            a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (c) {}
        if (a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent; )
                e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--)
                e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++)
                e[f]._dispatchEvent(a, 3)
        } else
            this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }
    ,
    b.hasEventListener = function(a) {
        var b = this._listeners
          , c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }
    ,
    b.willTrigger = function(a) {
        for (var b = this; b; ) {
            if (b.hasEventListener(a))
                return !0;
            b = b.parent
        }
        return !1
    }
    ,
    b.toString = function() {
        return "[EventDispatcher]"
    }
    ,
    b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length))
                return;
            try {
                a.currentTarget = this
            } catch (f) {}
            try {
                a.eventPhase = b
            } catch (f) {}
            a.removed = !1,
            e = e.slice();
            for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                var h = e[g];
                h.handleEvent ? h.handleEvent(a) : h(a),
                a.removed && (this.off(a.type, h, 1 == b),
                a.removed = !1)
            }
        }
    }
    ,
    createjs.EventDispatcher = a
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a() {
        throw "Ticker cannot be instantiated."
    }
    a.RAF_SYNCHED = "synched",
    a.RAF = "raf",
    a.TIMEOUT = "timeout",
    a.useRAF = !1,
    a.timingMode = null,
    a.maxDelta = 0,
    a.paused = !1,
    a.removeEventListener = null,
    a.removeAllEventListeners = null,
    a.dispatchEvent = null,
    a.hasEventListener = null,
    a._listeners = null,
    createjs.EventDispatcher.initialize(a),
    a._addEventListener = a.addEventListener,
    a.addEventListener = function() {
        return !a._inited && a.init(),
        a._addEventListener.apply(a, arguments)
    }
    ,
    a._inited = !1,
    a._startTime = 0,
    a._pausedTime = 0,
    a._ticks = 0,
    a._pausedTicks = 0,
    a._interval = 50,
    a._lastTime = 0,
    a._times = null,
    a._tickTimes = null,
    a._timerId = null,
    a._raf = !0,
    a.setInterval = function(b) {
        a._interval = b,
        a._inited && a._setupTick()
    }
    ,
    a.getInterval = function() {
        return a._interval
    }
    ,
    a.setFPS = function(b) {
        a.setInterval(1e3 / b)
    }
    ,
    a.getFPS = function() {
        return 1e3 / a._interval
    }
    ;
    try {
        Object.defineProperties(a, {
            interval: {
                get: a.getInterval,
                set: a.setInterval
            },
            framerate: {
                get: a.getFPS,
                set: a.setFPS
            }
        })
    } catch (b) {
        console.log(b)
    }
    a.init = function() {
        a._inited || (a._inited = !0,
        a._times = [],
        a._tickTimes = [],
        a._startTime = a._getTime(),
        a._times.push(a._lastTime = 0),
        a.interval = a._interval)
    }
    ,
    a.reset = function() {
        if (a._raf) {
            var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            b && b(a._timerId)
        } else
            clearTimeout(a._timerId);
        a.removeAllEventListeners("tick"),
        a._timerId = a._times = a._tickTimes = null,
        a._startTime = a._lastTime = a._ticks = 0,
        a._inited = !1
    }
    ,
    a.getMeasuredTickTime = function(b) {
        var c = 0
          , d = a._tickTimes;
        if (!d || d.length < 1)
            return -1;
        b = Math.min(d.length, b || 0 | a.getFPS());
        for (var e = 0; b > e; e++)
            c += d[e];
        return c / b
    }
    ,
    a.getMeasuredFPS = function(b) {
        var c = a._times;
        return !c || c.length < 2 ? -1 : (b = Math.min(c.length - 1, b || 0 | a.getFPS()),
        1e3 / ((c[0] - c[b]) / b))
    }
    ,
    a.setPaused = function(b) {
        a.paused = b
    }
    ,
    a.getPaused = function() {
        return a.paused
    }
    ,
    a.getTime = function(b) {
        return a._startTime ? a._getTime() - (b ? a._pausedTime : 0) : -1
    }
    ,
    a.getEventTime = function(b) {
        return a._startTime ? (a._lastTime || a._startTime) - (b ? a._pausedTime : 0) : -1
    }
    ,
    a.getTicks = function(b) {
        return a._ticks - (b ? a._pausedTicks : 0)
    }
    ,
    a._handleSynch = function() {
        a._timerId = null,
        a._setupTick(),
        a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick()
    }
    ,
    a._handleRAF = function() {
        a._timerId = null,
        a._setupTick(),
        a._tick()
    }
    ,
    a._handleTimeout = function() {
        a._timerId = null,
        a._setupTick(),
        a._tick()
    }
    ,
    a._setupTick = function() {
        if (null == a._timerId) {
            var b = a.timingMode || a.useRAF && a.RAF_SYNCHED;
            if (b == a.RAF_SYNCHED || b == a.RAF) {
                var c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (c)
                    return a._timerId = c(b == a.RAF ? a._handleRAF : a._handleSynch),
                    void (a._raf = !0)
            }
            a._raf = !1,
            a._timerId = setTimeout(a._handleTimeout, a._interval)
        }
    }
    ,
    a._tick = function() {
        var b = a.paused
          , c = a._getTime()
          , d = c - a._lastTime;
        if (a._lastTime = c,
        a._ticks++,
        b && (a._pausedTicks++,
        a._pausedTime += d),
        a.hasEventListener("tick")) {
            var e = new createjs.Event("tick")
              , f = a.maxDelta;
            e.delta = f && d > f ? f : d,
            e.paused = b,
            e.time = c,
            e.runTime = c - a._pausedTime,
            a.dispatchEvent(e)
        }
        for (a._tickTimes.unshift(a._getTime() - c); a._tickTimes.length > 100; )
            a._tickTimes.pop();
        for (a._times.unshift(c); a._times.length > 100; )
            a._times.pop()
    }
    ;
    var c = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    a._getTime = function() {
        return (c && c.call(performance) || (new Date).getTime()) - a._startTime
    }
    ,
    createjs.Ticker = a
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a(b, c, d) {
        this.ignoreGlobalPause = !1,
        this.loop = !1,
        this.duration = 0,
        this.pluginData = d || {},
        this.target = b,
        this.position = null,
        this.passive = !1,
        this._paused = !1,
        this._curQueueProps = {},
        this._initQueueProps = {},
        this._steps = [],
        this._actions = [],
        this._prevPosition = 0,
        this._stepPosition = 0,
        this._prevPos = -1,
        this._target = b,
        this._useTicks = !1,
        this._inited = !1,
        c && (this._useTicks = c.useTicks,
        this.ignoreGlobalPause = c.ignoreGlobalPause,
        this.loop = c.loop,
        c.onChange && this.addEventListener("change", c.onChange),
        c.override && a.removeTweens(b)),
        c && c.paused ? this._paused = !0 : createjs.Tween._register(this, !0),
        c && null != c.position && this.setPosition(c.position, a.NONE)
    }
    var b = createjs.extend(a, createjs.EventDispatcher);
    a.NONE = 0,
    a.LOOP = 1,
    a.REVERSE = 2,
    a.IGNORE = {},
    a._tweens = [],
    a._plugins = {},
    a.get = function(b, c, d, e) {
        return e && a.removeTweens(b),
        new a(b,c,d)
    }
    ,
    a.tick = function(b, c) {
        for (var d = a._tweens.slice(), e = d.length - 1; e >= 0; e--) {
            var f = d[e];
            c && !f.ignoreGlobalPause || f._paused || f.tick(f._useTicks ? 1 : b)
        }
    }
    ,
    a.handleEvent = function(a) {
        "tick" == a.type && this.tick(a.delta, a.paused)
    }
    ,
    a.removeTweens = function(b) {
        if (b.tweenjs_count) {
            for (var c = a._tweens, d = c.length - 1; d >= 0; d--) {
                var e = c[d];
                e._target == b && (e._paused = !0,
                c.splice(d, 1))
            }
            b.tweenjs_count = 0
        }
    }
    ,
    a.removeAllTweens = function() {
        for (var b = a._tweens, c = 0, d = b.length; d > c; c++) {
            var e = b[c];
            e._paused = !0,
            e.target.tweenjs_count = 0
        }
        b.length = 0
    }
    ,
    a.hasActiveTweens = function(b) {
        return b ? b.tweenjs_count : a._tweens && !!a._tweens.length
    }
    ,
    a.installPlugin = function(b, c) {
        var d = b.priority;
        null == d && (b.priority = d = 0);
        for (var e = 0, f = c.length, g = a._plugins; f > e; e++) {
            var h = c[e];
            if (g[h]) {
                for (var i = g[h], j = 0, k = i.length; k > j && !(d < i[j].priority); j++)
                    ;
                g[h].splice(j, 0, b)
            } else
                g[h] = [b]
        }
    }
    ,
    a._register = function(b, c) {
        var d = b._target
          , e = a._tweens;
        if (c)
            d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1),
            e.push(b),
            !a._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", a),
            a._inited = !0);
        else {
            d && d.tweenjs_count--;
            for (var f = e.length; f--; )
                if (e[f] == b)
                    return void e.splice(f, 1)
        }
    }
    ,
    b.wait = function(a, b) {
        if (null == a || 0 >= a)
            return this;
        var c = this._cloneProps(this._curQueueProps);
        return this._addStep({
            d: a,
            p0: c,
            e: this._linearEase,
            p1: c,
            v: b
        })
    }
    ,
    b.to = function(a, b, c) {
        return (isNaN(b) || 0 > b) && (b = 0),
        this._addStep({
            d: b || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: c,
            p1: this._cloneProps(this._appendQueueProps(a))
        })
    }
    ,
    b.call = function(a, b, c) {
        return this._addAction({
            f: a,
            p: b ? b : [this],
            o: c ? c : this._target
        })
    }
    ,
    b.set = function(a, b) {
        return this._addAction({
            f: this._set,
            o: this,
            p: [a, b ? b : this._target]
        })
    }
    ,
    b.play = function(a) {
        return a || (a = this),
        this.call(a.setPaused, [!1], a)
    }
    ,
    b.pause = function(a) {
        return a || (a = this),
        this.call(a.setPaused, [!0], a)
    }
    ,
    b.setPosition = function(a, b) {
        0 > a && (a = 0),
        null == b && (b = 1);
        var c = a
          , d = !1;
        if (c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration,
        d = !0)),
        c == this._prevPos)
            return d;
        var e = this._prevPos;
        if (this.position = this._prevPos = c,
        this._prevPosition = a,
        this._target)
            if (d)
                this._updateTargetProps(null, 1);
            else if (this._steps.length > 0) {
                for (var f = 0, g = this._steps.length; g > f && !(this._steps[f].t > c); f++)
                    ;
                var h = this._steps[f - 1];
                this._updateTargetProps(h, (this._stepPosition = c - h.t) / h.d)
            }
        return 0 != b && this._actions.length > 0 && (this._useTicks ? this._runActions(c, c) : 1 == b && e > c ? (e != this.duration && this._runActions(e, this.duration),
        this._runActions(0, c, !0)) : this._runActions(e, c)),
        d && this.setPaused(!0),
        this.dispatchEvent("change"),
        d
    }
    ,
    b.tick = function(a) {
        this._paused || this.setPosition(this._prevPosition + a)
    }
    ,
    b.setPaused = function(b) {
        return this._paused === !!b ? this : (this._paused = !!b,
        a._register(this, !b),
        this)
    }
    ,
    b.w = b.wait,
    b.t = b.to,
    b.c = b.call,
    b.s = b.set,
    b.toString = function() {
        return "[Tween]"
    }
    ,
    b.clone = function() {
        throw "Tween can not be cloned."
    }
    ,
    b._updateTargetProps = function(b, c) {
        var d, e, f, g, h, i;
        if (b || 1 != c) {
            if (this.passive = !!b.v,
            this.passive)
                return;
            b.e && (c = b.e(c, 0, 1, 1)),
            d = b.p0,
            e = b.p1
        } else
            this.passive = !1,
            d = e = this._curQueueProps;
        for (var j in this._initQueueProps) {
            null == (g = d[j]) && (d[j] = g = this._initQueueProps[j]),
            null == (h = e[j]) && (e[j] = h = g),
            f = g == h || 0 == c || 1 == c || "number" != typeof g ? 1 == c ? h : g : g + (h - g) * c;
            var k = !1;
            if (i = a._plugins[j])
                for (var l = 0, m = i.length; m > l; l++) {
                    var n = i[l].tween(this, j, f, d, e, c, !!b && d == e, !b);
                    n == a.IGNORE ? k = !0 : f = n
                }
            k || (this._target[j] = f)
        }
    }
    ,
    b._runActions = function(a, b, c) {
        var d = a
          , e = b
          , f = -1
          , g = this._actions.length
          , h = 1;
        for (a > b && (d = b,
        e = a,
        f = g,
        g = h = -1); (f += h) != g; ) {
            var i = this._actions[f]
              , j = i.t;
            (j == e || j > d && e > j || c && j == a) && i.f.apply(i.o, i.p)
        }
    }
    ,
    b._appendQueueProps = function(b) {
        var c, d, e, f, g;
        for (var h in b)
            if (void 0 === this._initQueueProps[h]) {
                if (d = this._target[h],
                c = a._plugins[h])
                    for (e = 0,
                    f = c.length; f > e; e++)
                        d = c[e].init(this, h, d);
                this._initQueueProps[h] = this._curQueueProps[h] = void 0 === d ? null : d
            } else
                d = this._curQueueProps[h];
        for (var h in b) {
            if (d = this._curQueueProps[h],
            c = a._plugins[h])
                for (g = g || {},
                e = 0,
                f = c.length; f > e; e++)
                    c[e].step && c[e].step(this, h, d, b[h], g);
            this._curQueueProps[h] = b[h]
        }
        return g && this._appendQueueProps(g),
        this._curQueueProps
    }
    ,
    b._cloneProps = function(a) {
        var b = {};
        for (var c in a)
            b[c] = a[c];
        return b
    }
    ,
    b._addStep = function(a) {
        return a.d > 0 && (this._steps.push(a),
        a.t = this.duration,
        this.duration += a.d),
        this
    }
    ,
    b._addAction = function(a) {
        return a.t = this.duration,
        this._actions.push(a),
        this
    }
    ,
    b._set = function(a, b) {
        for (var c in a)
            b[c] = a[c]
    }
    ,
    createjs.Tween = createjs.promote(a, "EventDispatcher")
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a(a, b, c) {
        this.EventDispatcher_constructor(),
        this.ignoreGlobalPause = !1,
        this.duration = 0,
        this.loop = !1,
        this.position = null,
        this._paused = !1,
        this._tweens = [],
        this._labels = null,
        this._labelList = null,
        this._prevPosition = 0,
        this._prevPos = -1,
        this._useTicks = !1,
        c && (this._useTicks = c.useTicks,
        this.loop = c.loop,
        this.ignoreGlobalPause = c.ignoreGlobalPause,
        c.onChange && this.addEventListener("change", c.onChange)),
        a && this.addTween.apply(this, a),
        this.setLabels(b),
        c && c.paused ? this._paused = !0 : createjs.Tween._register(this, !0),
        c && null != c.position && this.setPosition(c.position, createjs.Tween.NONE)
    }
    var b = createjs.extend(a, createjs.EventDispatcher);
    b.addTween = function(a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = 0; b > c; c++)
                this.addTween(arguments[c]);
            return arguments[0]
        }
        return 0 == b ? null : (this.removeTween(a),
        this._tweens.push(a),
        a.setPaused(!0),
        a._paused = !1,
        a._useTicks = this._useTicks,
        a.duration > this.duration && (this.duration = a.duration),
        this._prevPos >= 0 && a.setPosition(this._prevPos, createjs.Tween.NONE),
        a)
    }
    ,
    b.removeTween = function(a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = !0, d = 0; b > d; d++)
                c = c && this.removeTween(arguments[d]);
            return c
        }
        if (0 == b)
            return !1;
        for (var e = this._tweens, d = e.length; d--; )
            if (e[d] == a)
                return e.splice(d, 1),
                a.duration >= this.duration && this.updateDuration(),
                !0;
        return !1
    }
    ,
    b.addLabel = function(a, b) {
        this._labels[a] = b;
        var c = this._labelList;
        if (c) {
            for (var d = 0, e = c.length; e > d && !(b < c[d].position); d++)
                ;
            c.splice(d, 0, {
                label: a,
                position: b
            })
        }
    }
    ,
    b.setLabels = function(a) {
        this._labels = a ? a : {}
    }
    ,
    b.getLabels = function() {
        var a = this._labelList;
        if (!a) {
            a = this._labelList = [];
            var b = this._labels;
            for (var c in b)
                a.push({
                    label: c,
                    position: b[c]
                });
            a.sort(function(a, b) {
                return a.position - b.position
            })
        }
        return a
    }
    ,
    b.getCurrentLabel = function() {
        var a = this.getLabels()
          , b = this.position
          , c = a.length;
        if (c) {
            for (var d = 0; c > d && !(b < a[d].position); d++)
                ;
            return 0 == d ? null : a[d - 1].label
        }
        return null
    }
    ,
    b.gotoAndPlay = function(a) {
        this.setPaused(!1),
        this._goto(a)
    }
    ,
    b.gotoAndStop = function(a) {
        this.setPaused(!0),
        this._goto(a)
    }
    ,
    b.setPosition = function(a, b) {
        0 > a && (a = 0);
        var c = this.loop ? a % this.duration : a
          , d = !this.loop && a >= this.duration;
        if (c == this._prevPos)
            return d;
        this._prevPosition = a,
        this.position = this._prevPos = c;
        for (var e = 0, f = this._tweens.length; f > e; e++)
            if (this._tweens[e].setPosition(c, b),
            c != this._prevPos)
                return !1;
        return d && this.setPaused(!0),
        this.dispatchEvent("change"),
        d
    }
    ,
    b.setPaused = function(a) {
        this._paused = !!a,
        createjs.Tween._register(this, !a)
    }
    ,
    b.updateDuration = function() {
        this.duration = 0;
        for (var a = 0, b = this._tweens.length; b > a; a++) {
            var c = this._tweens[a];
            c.duration > this.duration && (this.duration = c.duration)
        }
    }
    ,
    b.tick = function(a) {
        this.setPosition(this._prevPosition + a)
    }
    ,
    b.resolve = function(a) {
        var b = Number(a);
        return isNaN(b) && (b = this._labels[a]),
        b
    }
    ,
    b.toString = function() {
        return "[Timeline]"
    }
    ,
    b.clone = function() {
        throw "Timeline can not be cloned."
    }
    ,
    b._goto = function(a) {
        var b = this.resolve(a);
        null != b && this.setPosition(b)
    }
    ,
    createjs.Timeline = createjs.promote(a, "EventDispatcher")
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a() {
        throw "Ease cannot be instantiated."
    }
    a.linear = function(a) {
        return a
    }
    ,
    a.none = a.linear,
    a.get = function(a) {
        return -1 > a && (a = -1),
        a > 1 && (a = 1),
        function(b) {
            return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
        }
    }
    ,
    a.getPowIn = function(a) {
        return function(b) {
            return Math.pow(b, a)
        }
    }
    ,
    a.getPowOut = function(a) {
        return function(b) {
            return 1 - Math.pow(1 - b, a)
        }
    }
    ,
    a.getPowInOut = function(a) {
        return function(b) {
            return (b *= 2) < 1 ? .5 * Math.pow(b, a) : 1 - .5 * Math.abs(Math.pow(2 - b, a))
        }
    }
    ,
    a.quadIn = a.getPowIn(2),
    a.quadOut = a.getPowOut(2),
    a.quadInOut = a.getPowInOut(2),
    a.cubicIn = a.getPowIn(3),
    a.cubicOut = a.getPowOut(3),
    a.cubicInOut = a.getPowInOut(3),
    a.quartIn = a.getPowIn(4),
    a.quartOut = a.getPowOut(4),
    a.quartInOut = a.getPowInOut(4),
    a.quintIn = a.getPowIn(5),
    a.quintOut = a.getPowOut(5),
    a.quintInOut = a.getPowInOut(5),
    a.sineIn = function(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }
    ,
    a.sineOut = function(a) {
        return Math.sin(a * Math.PI / 2)
    }
    ,
    a.sineInOut = function(a) {
        return -.5 * (Math.cos(Math.PI * a) - 1)
    }
    ,
    a.getBackIn = function(a) {
        return function(b) {
            return b * b * ((a + 1) * b - a)
        }
    }
    ,
    a.backIn = a.getBackIn(1.7),
    a.getBackOut = function(a) {
        return function(b) {
            return --b * b * ((a + 1) * b + a) + 1
        }
    }
    ,
    a.backOut = a.getBackOut(1.7),
    a.getBackInOut = function(a) {
        return a *= 1.525,
        function(b) {
            return (b *= 2) < 1 ? .5 * b * b * ((a + 1) * b - a) : .5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
        }
    }
    ,
    a.backInOut = a.getBackInOut(1.7),
    a.circIn = function(a) {
        return -(Math.sqrt(1 - a * a) - 1)
    }
    ,
    a.circOut = function(a) {
        return Math.sqrt(1 - --a * a)
    }
    ,
    a.circInOut = function(a) {
        return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
    }
    ,
    a.bounceIn = function(b) {
        return 1 - a.bounceOut(1 - b)
    }
    ,
    a.bounceOut = function(a) {
        return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
    }
    ,
    a.bounceInOut = function(b) {
        return .5 > b ? .5 * a.bounceIn(2 * b) : .5 * a.bounceOut(2 * b - 1) + .5
    }
    ,
    a.getElasticIn = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d)
                return d;
            var e = b / c * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b))
        }
    }
    ,
    a.elasticIn = a.getElasticIn(1, .3),
    a.getElasticOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d)
                return d;
            var e = b / c * Math.asin(1 / a);
            return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1
        }
    }
    ,
    a.elasticOut = a.getElasticOut(1, .3),
    a.getElasticInOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            var e = b / c * Math.asin(1 / a);
            return (d *= 2) < 1 ? -.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b) : a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) * .5 + 1
        }
    }
    ,
    a.elasticInOut = a.getElasticInOut(1, .3 * 1.5),
    createjs.Ease = a
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    function a() {
        throw "MotionGuidePlugin cannot be instantiated."
    }
    a.priority = 0,
    a._rotOffS,
    a._rotOffE,
    a._rotNormS,
    a._rotNormE,
    a.install = function() {
        return createjs.Tween.installPlugin(a, ["guide", "x", "y", "rotation"]),
        createjs.Tween.IGNORE
    }
    ,
    a.init = function(a, b, c) {
        var d = a.target;
        return d.hasOwnProperty("x") || (d.x = 0),
        d.hasOwnProperty("y") || (d.y = 0),
        d.hasOwnProperty("rotation") || (d.rotation = 0),
        "rotation" == b && (a.__needsRot = !0),
        "guide" == b ? null : c
    }
    ,
    a.step = function(b, c, d, e, f) {
        if ("rotation" == c && (b.__rotGlobalS = d,
        b.__rotGlobalE = e,
        a.testRotData(b, f)),
        "guide" != c)
            return e;
        var g, h = e;
        h.hasOwnProperty("path") || (h.path = []);
        var i = h.path;
        if (h.hasOwnProperty("end") || (h.end = 1),
        h.hasOwnProperty("start") || (h.start = d && d.hasOwnProperty("end") && d.path === i ? d.end : 0),
        h.hasOwnProperty("_segments") && h._length)
            return e;
        var j = i.length
          , k = 10;
        if (!(j >= 6 && (j - 2) % 4 == 0))
            throw "invalid 'path' data, please see documentation for valid paths";
        h._segments = [],
        h._length = 0;
        for (var l = 2; j > l; l += 4) {
            for (var m, n, o = i[l - 2], p = i[l - 1], q = i[l + 0], r = i[l + 1], s = i[l + 2], t = i[l + 3], u = o, v = p, w = 0, x = [], y = 1; k >= y; y++) {
                var z = y / k
                  , A = 1 - z;
                m = A * A * o + 2 * A * z * q + z * z * s,
                n = A * A * p + 2 * A * z * r + z * z * t,
                w += x[x.push(Math.sqrt((g = m - u) * g + (g = n - v) * g)) - 1],
                u = m,
                v = n
            }
            h._segments.push(w),
            h._segments.push(x),
            h._length += w
        }
        g = h.orient,
        h.orient = !0;
        var B = {};
        return a.calc(h, h.start, B),
        b.__rotPathS = Number(B.rotation.toFixed(5)),
        a.calc(h, h.end, B),
        b.__rotPathE = Number(B.rotation.toFixed(5)),
        h.orient = !1,
        a.calc(h, h.end, f),
        h.orient = g,
        h.orient ? (b.__guideData = h,
        a.testRotData(b, f),
        e) : e
    }
    ,
    a.testRotData = function(a, b) {
        if (void 0 === a.__rotGlobalS || void 0 === a.__rotGlobalE) {
            if (a.__needsRot)
                return;
            a.__rotGlobalS = a.__rotGlobalE = void 0 !== a._curQueueProps.rotation ? a._curQueueProps.rotation : b.rotation = a.target.rotation || 0
        }
        if (void 0 !== a.__guideData) {
            var c = a.__guideData
              , d = a.__rotGlobalE - a.__rotGlobalS
              , e = a.__rotPathE - a.__rotPathS
              , f = d - e;
            if ("auto" == c.orient)
                f > 180 ? f -= 360 : -180 > f && (f += 360);
            else if ("cw" == c.orient) {
                for (; 0 > f; )
                    f += 360;
                0 == f && d > 0 && 180 != d && (f += 360)
            } else if ("ccw" == c.orient) {
                for (f = d - (e > 180 ? 360 - e : e); f > 0; )
                    f -= 360;
                0 == f && 0 > d && -180 != d && (f -= 360)
            }
            c.rotDelta = f,
            c.rotOffS = a.__rotGlobalS - a.__rotPathS,
            a.__rotGlobalS = a.__rotGlobalE = a.__guideData = a.__needsRot = void 0
        }
    }
    ,
    a.tween = function(b, c, d, e, f, g, h) {
        var i = f.guide;
        if (void 0 == i || i === e.guide)
            return d;
        if (i.lastRatio != g) {
            var j = (i.end - i.start) * (h ? i.end : g) + i.start;
            switch (a.calc(i, j, b.target),
            i.orient) {
            case "cw":
            case "ccw":
            case "auto":
                b.target.rotation += i.rotOffS + i.rotDelta * g;
                break;
            case "fixed":
            default:
                b.target.rotation += i.rotOffS
            }
            i.lastRatio = g
        }
        return "rotation" != c || i.orient && "false" != i.orient ? b.target[c] : d
    }
    ,
    a.calc = function(b, c, d) {
        void 0 == b._segments && a.validate(b),
        void 0 == d && (d = {
            x: 0,
            y: 0,
            rotation: 0
        });
        for (var e = b._segments, f = b.path, g = b._length * c, h = e.length - 2, i = 0; g > e[i] && h > i; )
            g -= e[i],
            i += 2;
        var j = e[i + 1]
          , k = 0;
        for (h = j.length - 1; g > j[k] && h > k; )
            g -= j[k],
            k++;
        var l = k / ++h + g / (h * j[k]);
        i = 2 * i + 2;
        var m = 1 - l;
        return d.x = m * m * f[i - 2] + 2 * m * l * f[i + 0] + l * l * f[i + 2],
        d.y = m * m * f[i - 1] + 2 * m * l * f[i + 1] + l * l * f[i + 3],
        b.orient && (d.rotation = 57.2957795 * Math.atan2((f[i + 1] - f[i - 1]) * m + (f[i + 3] - f[i + 1]) * l, (f[i + 0] - f[i - 2]) * m + (f[i + 2] - f[i + 0]) * l)),
        d
    }
    ,
    createjs.MotionGuidePlugin = a
}(),
this.createjs = this.createjs || {},
function() {
    "use strict";
    var a = createjs.TweenJS = createjs.TweenJS || {};
    a.version = "0.6.0",
    a.buildDate = "Thu, 11 Dec 2014 23:32:09 GMT"
}();

/* Web Font Loader v1.5.8 - (c) Adobe Systems, Google. License: Apache 2.0 */
;(function(window, document, undefined) {
    var k = this;
    function m(a, b) {
        var c = a.split(".")
          , d = k;
        c[0]in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift()); )
            c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
    }
    function aa(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function ba(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function n(a, b, c) {
        n = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
        return n.apply(null, arguments)
    }
    var q = Date.now || function() {
        return +new Date
    }
    ;
    function s(a, b) {
        this.K = a;
        this.v = b || a;
        this.F = this.v.document
    }
    s.prototype.createElement = function(a, b, c) {
        a = this.F.createElement(a);
        if (b)
            for (var d in b)
                b.hasOwnProperty(d) && ("style" == d ? a.style.cssText = b[d] : a.setAttribute(d, b[d]));
        c && a.appendChild(this.F.createTextNode(c));
        return a
    }
    ;
    function t(a, b, c) {
        a = a.F.getElementsByTagName(b)[0];
        a || (a = document.documentElement);
        a && a.lastChild && a.insertBefore(c, a.lastChild)
    }
    function ca(a, b) {
        function c() {
            a.F.body ? b() : setTimeout(c, 0)
        }
        c()
    }
    function u(a, b, c) {
        b = b || [];
        c = c || [];
        for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
            for (var f = !1, g = 0; g < d.length; g += 1)
                if (b[e] === d[g]) {
                    f = !0;
                    break
                }
            f || d.push(b[e])
        }
        b = [];
        for (e = 0; e < d.length; e += 1) {
            f = !1;
            for (g = 0; g < c.length; g += 1)
                if (d[e] === c[g]) {
                    f = !0;
                    break
                }
            f || b.push(d[e])
        }
        a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
    }
    function v(a, b) {
        for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
            if (c[d] == b)
                return !0;
        return !1
    }
    function w(a) {
        var b = a.v.location.protocol;
        "about:" == b && (b = a.K.location.protocol);
        return "https:" == b ? "https:" : "http:"
    }
    function x(a, b) {
        var c = a.createElement("link", {
            rel: "stylesheet",
            href: b
        })
          , d = !1;
        c.onload = function() {
            d || (d = !0)
        }
        ;
        c.onerror = function() {
            d || (d = !0)
        }
        ;
        t(a, "head", c)
    }
    function y(a, b, c, d) {
        var e = a.F.getElementsByTagName("head")[0];
        if (e) {
            var f = a.createElement("script", {
                src: b
            })
              , g = !1;
            f.onload = f.onreadystatechange = function() {
                g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0,
                c && c(null),
                f.onload = f.onreadystatechange = null,
                "HEAD" == f.parentNode.tagName && e.removeChild(f))
            }
            ;
            e.appendChild(f);
            window.setTimeout(function() {
                g || (g = !0,
                c && c(Error("Script load timeout")))
            }, d || 5E3);
            return f
        }
        return null
    }
    ;function z(a, b, c, d) {
        this.R = a;
        this.Z = b;
        this.Da = c;
        this.ba = d
    }
    m("webfont.BrowserInfo", z);
    z.prototype.ta = function() {
        return this.R
    }
    ;
    z.prototype.hasWebFontSupport = z.prototype.ta;
    z.prototype.ua = function() {
        return this.Z
    }
    ;
    z.prototype.hasWebKitFallbackBug = z.prototype.ua;
    z.prototype.va = function() {
        return this.Da
    }
    ;
    z.prototype.hasWebKitMetricsBug = z.prototype.va;
    z.prototype.sa = function() {
        return this.ba
    }
    ;
    z.prototype.hasNativeFontLoading = z.prototype.sa;
    function A(a, b, c, d) {
        this.d = null != a ? a : null;
        this.g = null != b ? b : null;
        this.C = null != c ? c : null;
        this.f = null != d ? d : null
    }
    var da = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
    A.prototype.compare = function(a) {
        return this.d > a.d || this.d === a.d && this.g > a.g || this.d === a.d && this.g === a.g && this.C > a.C ? 1 : this.d < a.d || this.d === a.d && this.g < a.g || this.d === a.d && this.g === a.g && this.C < a.C ? -1 : 0
    }
    ;
    A.prototype.toString = function() {
        return [this.d, this.g || "", this.C || "", this.f || ""].join("")
    }
    ;
    function B(a) {
        a = da.exec(a);
        var b = null
          , c = null
          , d = null
          , e = null;
        a && (null !== a[1] && a[1] && (b = parseInt(a[1], 10)),
        null !== a[2] && a[2] && (c = parseInt(a[2], 10)),
        null !== a[3] && a[3] && (d = parseInt(a[3], 10)),
        null !== a[4] && a[4] && (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
        return new A(b,c,d,e)
    }
    ;function C(a, b, c, d, e, f, g, h, l, p, r) {
        this.L = a;
        this.Ca = c;
        this.ka = d;
        this.ja = f;
        this.za = g;
        this.ya = l;
        this.ia = p;
        this.m = r
    }
    m("webfont.UserAgent", C);
    C.prototype.getName = function() {
        return this.L
    }
    ;
    C.prototype.getName = C.prototype.getName;
    C.prototype.ra = function() {
        return this.Ca
    }
    ;
    C.prototype.getVersion = C.prototype.ra;
    C.prototype.na = function() {
        return this.ka
    }
    ;
    C.prototype.getEngine = C.prototype.na;
    C.prototype.oa = function() {
        return this.ja
    }
    ;
    C.prototype.getEngineVersion = C.prototype.oa;
    C.prototype.pa = function() {
        return this.za
    }
    ;
    C.prototype.getPlatform = C.prototype.pa;
    C.prototype.qa = function() {
        return this.ya
    }
    ;
    C.prototype.getPlatformVersion = C.prototype.qa;
    C.prototype.ma = function() {
        return this.ia
    }
    ;
    C.prototype.getDocumentMode = C.prototype.ma;
    C.prototype.la = function() {
        return this.m
    }
    ;
    C.prototype.getBrowserInfo = C.prototype.la;
    function D(a, b) {
        this.a = a;
        this.o = b
    }
    var ea = new C("Unknown",0,"Unknown","Unknown",0,"Unknown","Unknown",0,"Unknown",void 0,new z(!1,!1,!1,!1));
    D.prototype.parse = function() {
        var a;
        if (-1 != this.a.indexOf("MSIE") || -1 != this.a.indexOf("Trident/")) {
            a = E(this);
            var b = F(this)
              , c = B(b)
              , d = null
              , e = null
              , f = null
              , g = G(this.a, /Trident\/([\d\w\.]+)/, 1)
              , h = H(this.o)
              , d = -1 != this.a.indexOf("MSIE") ? G(this.a, /MSIE ([\d\w\.]+)/, 1) : G(this.a, /rv:([\d\w\.]+)/, 1)
              , e = B(d);
            "" != g ? (f = "Trident",
            B(g)) : g = f = "Unknown";
            a = new C("MSIE",0,d,f,0,g,a,0,b,h,new z("Windows" == a && 6 <= e.d || "Windows Phone" == a && 8 <= c.d,!1,!1,!!this.o.fonts))
        } else if (-1 != this.a.indexOf("Opera"))
            a: if (a = "Unknown",
            b = G(this.a, /Presto\/([\d\w\.]+)/, 1),
            e = B(b),
            c = F(this),
            B(c),
            d = H(this.o),
            null !== e.d ? a = "Presto" : (-1 != this.a.indexOf("Gecko") && (a = "Gecko"),
            b = G(this.a, /rv:([^\)]+)/, 1),
            B(b)),
            -1 != this.a.indexOf("Opera Mini/"))
                e = G(this.a, /Opera Mini\/([\d\.]+)/, 1),
                f = B(e),
                a = new C("OperaMini",0,e,a,0,b,E(this),0,c,d,new z(!1,!1,!1,!!this.o.fonts));
            else {
                if (-1 != this.a.indexOf("Version/") && (e = G(this.a, /Version\/([\d\.]+)/, 1),
                f = B(e),
                null !== f.d)) {
                    a = new C("Opera",0,e,a,0,b,E(this),0,c,d,new z(10 <= f.d,!1,!1,!!this.o.fonts));
                    break a
                }
                e = G(this.a, /Opera[\/ ]([\d\.]+)/, 1);
                f = B(e);
                a = null !== f.d ? new C("Opera",0,e,a,0,b,E(this),0,c,d,new z(10 <= f.d,!1,!1,!!this.o.fonts)) : new C("Opera",0,"Unknown",a,0,b,E(this),0,c,d,new z(!1,!1,!1,!!this.o.fonts))
            }
        else
            /OPR\/[\d.]+/.test(this.a) ? a = I(this) : /AppleWeb(K|k)it/.test(this.a) ? a = I(this) : -1 != this.a.indexOf("Gecko") ? (a = "Unknown",
            d = new A,
            b = "Unknown",
            c = F(this),
            B(c),
            d = !1,
            -1 != this.a.indexOf("Firefox") ? (a = "Firefox",
            b = G(this.a, /Firefox\/([\d\w\.]+)/, 1),
            d = B(b),
            d = 3 <= d.d && 5 <= d.g) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"),
            e = G(this.a, /rv:([^\)]+)/, 1),
            f = B(e),
            d || (d = 1 < f.d || 1 == f.d && 9 < f.g || 1 == f.d && 9 == f.g && 2 <= f.C || null != e.match(/1\.9\.1b[123]/) || null != e.match(/1\.9\.1\.[\d\.]+/)),
            a = new C(a,0,b,"Gecko",0,e,E(this),0,c,H(this.o),new z(d,!1,!1,!!this.o.fonts))) : a = ea;
        return a
    }
    ;
    function E(a) {
        var b = G(a.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
        if ("" != b)
            return /BB\d{2}/.test(b) && (b = "BlackBerry"),
            b;
        a = G(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/, 1);
        return "" != a ? ("Mac_PowerPC" == a ? a = "Macintosh" : "PlayStation" == a && (a = "Linux"),
        a) : "Unknown"
    }
    function F(a) {
        var b = G(a.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
        if (b || (b = G(a.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = G(a.a, /(iPhone )?OS ([\d_]+)/, 2)))
            return b;
        if (b = G(a.a, /(?:Linux|CrOS|CrKey) ([^;)]+)/, 1))
            for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
                if (/^[\d\._]+$/.test(b[c]))
                    return b[c];
        return (a = G(a.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown"
    }
    function I(a) {
        var b = E(a)
          , c = F(a)
          , d = B(c)
          , e = G(a.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1)
          , f = B(e)
          , g = "Unknown"
          , h = new A
          , l = "Unknown"
          , h = !1;
        /OPR\/[\d.]+/.test(a.a) ? g = "Opera" : -1 != a.a.indexOf("Chrome") || -1 != a.a.indexOf("CrMo") || -1 != a.a.indexOf("CriOS") ? g = "Chrome" : /Silk\/\d/.test(a.a) ? g = "Silk" : "BlackBerry" == b || "Android" == b ? g = "BuiltinBrowser" : -1 != a.a.indexOf("PhantomJS") ? g = "PhantomJS" : -1 != a.a.indexOf("Safari") ? g = "Safari" : -1 != a.a.indexOf("AdobeAIR") ? g = "AdobeAIR" : -1 != a.a.indexOf("PlayStation") && (g = "BuiltinBrowser");
        "BuiltinBrowser" == g ? l = "Unknown" : "Silk" == g ? l = G(a.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == g ? l = G(a.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != a.a.indexOf("Version/") ? l = G(a.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == g ? l = G(a.a, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == g ? l = G(a.a, /OPR\/([\d.]+)/, 1) : "PhantomJS" == g && (l = G(a.a, /PhantomJS\/([\d.]+)/, 1));
        h = B(l);
        h = "AdobeAIR" == g ? 2 < h.d || 2 == h.d && 5 <= h.g : "BlackBerry" == b ? 10 <= d.d : "Android" == b ? 2 < d.d || 2 == d.d && 1 < d.g : 526 <= f.d || 525 <= f.d && 13 <= f.g;
        return new C(g,0,l,"AppleWebKit",0,e,b,0,c,H(a.o),new z(h,536 > f.d || 536 == f.d && 11 > f.g,"iPhone" == b || "iPad" == b || "iPod" == b || "Macintosh" == b,!!a.o.fonts))
    }
    function G(a, b, c) {
        return (a = a.match(b)) && a[c] ? a[c] : ""
    }
    function H(a) {
        if (a.documentMode)
            return a.documentMode
    }
    ;function fa(a) {
        this.xa = a || "-"
    }
    fa.prototype.f = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++)
            b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
        return b.join(this.xa)
    }
    ;
    function K(a, b) {
        this.L = a;
        this.S = 4;
        this.Q = "n";
        var c = (b || "n4").match(/^([nio])([1-9])$/i);
        c && (this.Q = c[1],
        this.S = parseInt(c[2], 10))
    }
    K.prototype.getName = function() {
        return this.L
    }
    ;
    function ga(a) {
        return ha(a) + " " + (a.S + "00") + " 300px " + ia(a.L)
    }
    function ia(a) {
        var b = [];
        a = a.split(/,\s*/);
        for (var c = 0; c < a.length; c++) {
            var d = a[c].replace(/['"]/g, "");
            -1 == d.indexOf(" ") ? b.push(d) : b.push("'" + d + "'")
        }
        return b.join(",")
    }
    function L(a) {
        return a.Q + a.S
    }
    function ha(a) {
        var b = "normal";
        "o" === a.Q ? b = "oblique" : "i" === a.Q && (b = "italic");
        return b
    }
    function ja(a) {
        var b = 4
          , c = "n"
          , d = null;
        a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()),
        (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
        return c + b
    }
    ;function ka(a, b, c) {
        this.c = a;
        this.s = b;
        this.U = c;
        this.j = "wf";
        this.h = new fa("-")
    }
    function M(a) {
        var b = v(a.s, a.h.f(a.j, "active"))
          , c = []
          , d = [a.h.f(a.j, "loading")];
        b || c.push(a.h.f(a.j, "inactive"));
        u(a.s, c, d);
        N(a, "inactive")
    }
    function N(a, b, c) {
        if (a.U[b])
            if (c)
                a.U[b](c.getName(), L(c));
            else
                a.U[b]()
    }
    ;function la() {
        this.B = {}
    }
    ;function O(a, b) {
        this.c = a;
        this.u = b;
        this.q = this.c.createElement("span", {
            "aria-hidden": "true"
        }, this.u)
    }
    function P(a) {
        t(a.c, "body", a.q)
    }
    function Q(a) {
        return "display:block;position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + ia(a.L) + ";" + ("font-style:" + ha(a) + ";font-weight:" + (a.S + "00") + ";")
    }
    O.prototype.remove = function() {
        var a = this.q;
        a.parentNode && a.parentNode.removeChild(a)
    }
    ;
    function na(a, b, c, d, e, f) {
        this.N = a;
        this.P = b;
        this.k = d;
        this.c = c;
        this.D = e || 3E3;
        this.u = f || void 0
    }
    na.prototype.start = function() {
        var a = this.c.v.document
          , b = this;
        Promise.race([new Promise(function(a, d) {
            k.setTimeout(function() {
                d(b.k)
            }, b.D)
        }
        ), a.fonts.load(ga(this.k), this.u)]).then(function(a) {
            1 === a.length ? b.N(b.k) : b.P(b.k)
        }, function() {
            b.P(b.k)
        })
    }
    ;
    function oa(a, b, c, d, e, f, g, h) {
        this.N = a;
        this.P = b;
        this.c = c;
        this.k = d;
        this.u = h || "BESbswy";
        this.m = e;
        this.J = {};
        this.D = f || 3E3;
        this.ea = g || null;
        this.H = this.G = null;
        a = new O(this.c,this.u);
        P(a);
        for (var l in R)
            R.hasOwnProperty(l) && (b = new K(R[l],L(this.k)),
            b = Q(b),
            a.q.style.cssText = b,
            this.J[R[l]] = a.q.offsetWidth);
        a.remove()
    }
    var R = {
        Ga: "serif",
        Fa: "sans-serif",
        Ea: "monospace"
    };
    oa.prototype.start = function() {
        this.G = new O(this.c,this.u);
        P(this.G);
        this.H = new O(this.c,this.u);
        P(this.H);
        this.Aa = q();
        var a = new K(this.k.getName() + ",serif",L(this.k))
          , a = Q(a);
        this.G.q.style.cssText = a;
        a = new K(this.k.getName() + ",sans-serif",L(this.k));
        a = Q(a);
        this.H.q.style.cssText = a;
        pa(this)
    }
    ;
    function qa(a, b, c) {
        for (var d in R)
            if (R.hasOwnProperty(d) && b === a.J[R[d]] && c === a.J[R[d]])
                return !0;
        return !1
    }
    function pa(a) {
        var b = a.G.q.offsetWidth
          , c = a.H.q.offsetWidth;
        b === a.J.serif && c === a.J["sans-serif"] || a.m.Z && qa(a, b, c) ? q() - a.Aa >= a.D ? a.m.Z && qa(a, b, c) && (null === a.ea || a.ea.hasOwnProperty(a.k.getName())) ? S(a, a.N) : S(a, a.P) : ra(a) : S(a, a.N)
    }
    function ra(a) {
        setTimeout(n(function() {
            pa(this)
        }, a), 25)
    }
    function S(a, b) {
        a.G.remove();
        a.H.remove();
        b(a.k)
    }
    ;function T(a, b, c, d) {
        this.c = b;
        this.w = c;
        this.V = 0;
        this.ga = this.da = !1;
        this.D = d;
        this.m = a.m
    }
    function sa(a, b, c, d, e) {
        if (0 === b.length && e)
            M(a.w);
        else
            for (a.V += b.length,
            e && (a.da = e),
            e = 0; e < b.length; e++) {
                var f = b[e]
                  , g = c[f.getName()]
                  , h = a.w
                  , l = f;
                u(h.s, [h.h.f(h.j, l.getName(), L(l).toString(), "loading")]);
                N(h, "fontloading", l);
                h = null;
                h = a.m.ba ? new na(n(a.$, a),n(a.aa, a),a.c,f,a.D,g) : new oa(n(a.$, a),n(a.aa, a),a.c,f,a.m,a.D,d,g);
                h.start()
            }
    }
    T.prototype.$ = function(a) {
        var b = this.w;
        u(b.s, [b.h.f(b.j, a.getName(), L(a).toString(), "active")], [b.h.f(b.j, a.getName(), L(a).toString(), "loading"), b.h.f(b.j, a.getName(), L(a).toString(), "inactive")]);
        N(b, "fontactive", a);
        this.ga = !0;
        ta(this)
    }
    ;
    T.prototype.aa = function(a) {
        var b = this.w
          , c = v(b.s, b.h.f(b.j, a.getName(), L(a).toString(), "active"))
          , d = []
          , e = [b.h.f(b.j, a.getName(), L(a).toString(), "loading")];
        c || d.push(b.h.f(b.j, a.getName(), L(a).toString(), "inactive"));
        u(b.s, d, e);
        N(b, "fontinactive", a);
        ta(this)
    }
    ;
    function ta(a) {
        0 == --a.V && a.da && (a.ga ? (a = a.w,
        u(a.s, [a.h.f(a.j, "active")], [a.h.f(a.j, "loading"), a.h.f(a.j, "inactive")]),
        N(a, "active")) : M(a.w))
    }
    ;function U(a) {
        this.K = a;
        this.A = new la;
        this.Ba = new D(a.navigator.userAgent,a.document);
        this.a = this.Ba.parse();
        this.W = this.X = 0
    }
    U.prototype.load = function(a) {
        var b = a.context || this.K;
        this.c = new s(this.K,b);
        var b = new ka(this.c,b.document.documentElement,a)
          , c = []
          , d = a.timeout;
        u(b.s, [b.h.f(b.j, "loading")]);
        N(b, "loading");
        var c = this.A, e = this.c, f = [], g;
        for (g in a)
            if (a.hasOwnProperty(g)) {
                var h = c.B[g];
                h && f.push(h(a[g], e))
            }
        c = f;
        this.W = this.X = c.length;
        a = new T(this.a,this.c,b,d);
        g = 0;
        for (d = c.length; g < d; g++)
            e = c[g],
            e.M(this.a, n(this.wa, this, e, b, a))
    }
    ;
    U.prototype.wa = function(a, b, c, d) {
        var e = this;
        d ? a.load(function(a, b, d) {
            ua(e, c, a, b, d)
        }) : (a = 0 == --this.X,
        this.W--,
        a && 0 == this.W ? M(b) : sa(c, [], {}, null, a))
    }
    ;
    function ua(a, b, c, d, e) {
        var f = 0 == --a.X;
        setTimeout(function() {
            sa(b, c, d || {}, e || null, f)
        }, 0)
    }
    ;function va(a, b, c) {
        this.T = a ? a : b + wa;
        this.t = [];
        this.Y = [];
        this.ha = c || ""
    }
    var wa = "//fonts.googleapis.com/css";
    va.prototype.f = function() {
        if (0 == this.t.length)
            throw Error("No fonts to load!");
        if (-1 != this.T.indexOf("kit="))
            return this.T;
        for (var a = this.t.length, b = [], c = 0; c < a; c++)
            b.push(this.t[c].replace(/ /g, "+"));
        a = this.T + "?family=" + b.join("%7C");
        0 < this.Y.length && (a += "&subset=" + this.Y.join(","));
        0 < this.ha.length && (a += "&text=" + encodeURIComponent(this.ha));
        return a
    }
    ;
    function xa(a) {
        this.t = a;
        this.fa = [];
        this.O = {}
    }
    var ya = {
        latin: "BESbswy",
        cyrillic: "&#1081;&#1103;&#1046;",
        greek: "&#945;&#946;&#931;",
        khmer: "&#x1780;&#x1781;&#x1782;",
        Hanuman: "&#x1780;&#x1781;&#x1782;"
    }
      , za = {
        thin: "1",
        extralight: "2",
        "extra-light": "2",
        ultralight: "2",
        "ultra-light": "2",
        light: "3",
        regular: "4",
        book: "4",
        medium: "5",
        "semi-bold": "6",
        semibold: "6",
        "demi-bold": "6",
        demibold: "6",
        bold: "7",
        "extra-bold": "8",
        extrabold: "8",
        "ultra-bold": "8",
        ultrabold: "8",
        black: "9",
        heavy: "9",
        l: "3",
        r: "4",
        b: "7"
    }
      , Aa = {
        i: "i",
        italic: "i",
        n: "n",
        normal: "n"
    }
      , Ba = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
    xa.prototype.parse = function() {
        for (var a = this.t.length, b = 0; b < a; b++) {
            var c = this.t[b].split(":")
              , d = c[0].replace(/\+/g, " ")
              , e = ["n4"];
            if (2 <= c.length) {
                var f;
                var g = c[1];
                f = [];
                if (g)
                    for (var g = g.split(","), h = g.length, l = 0; l < h; l++) {
                        var p;
                        p = g[l];
                        if (p.match(/^[\w-]+$/)) {
                            p = Ba.exec(p.toLowerCase());
                            var r = void 0;
                            if (null == p)
                                r = "";
                            else {
                                r = void 0;
                                r = p[1];
                                if (null == r || "" == r)
                                    r = "4";
                                else
                                    var ma = za[r]
                                      , r = ma ? ma : isNaN(r) ? "4" : r.substr(0, 1);
                                p = p[2];
                                r = [null == p || "" == p ? "n" : Aa[p], r].join("")
                            }
                            p = r
                        } else
                            p = "";
                        p && f.push(p)
                    }
                0 < f.length && (e = f);
                3 == c.length && (c = c[2],
                f = [],
                c = c ? c.split(",") : f,
                0 < c.length && (c = ya[c[0]]) && (this.O[d] = c))
            }
            this.O[d] || (c = ya[d]) && (this.O[d] = c);
            for (c = 0; c < e.length; c += 1)
                this.fa.push(new K(d,e[c]))
        }
    }
    ;
    function V(a, b) {
        this.a = (new D(navigator.userAgent,document)).parse();
        this.c = a;
        this.e = b
    }
    var Ca = {
        Arimo: !0,
        Cousine: !0,
        Tinos: !0
    };
    V.prototype.M = function(a, b) {
        b(a.m.R)
    }
    ;
    V.prototype.load = function(a) {
        var b = this.c;
        "MSIE" == this.a.getName() && 1 != this.e.blocking ? ca(b, n(this.ca, this, a)) : this.ca(a)
    }
    ;
    V.prototype.ca = function(a) {
        for (var b = this.c, c = new va(this.e.api,w(b),this.e.text), d = this.e.families, e = d.length, f = 0; f < e; f++) {
            var g = d[f].split(":");
            3 == g.length && c.Y.push(g.pop());
            var h = "";
            2 == g.length && "" != g[1] && (h = ":");
            c.t.push(g.join(h))
        }
        d = new xa(d);
        d.parse();
        x(b, c.f());
        a(d.fa, d.O, Ca)
    }
    ;
    function W(a, b) {
        this.c = a;
        this.e = b;
        this.p = []
    }
    W.prototype.I = function(a) {
        var b = this.c;
        return w(this.c) + (this.e.api || "//f.fontdeck.com/s/css/js/") + (b.v.location.hostname || b.K.location.hostname) + "/" + a + ".js"
    }
    ;
    W.prototype.M = function(a, b) {
        var c = this.e.id
          , d = this.c.v
          , e = this;
        c ? (d.__webfontfontdeckmodule__ || (d.__webfontfontdeckmodule__ = {}),
        d.__webfontfontdeckmodule__[c] = function(a, c) {
            for (var d = 0, l = c.fonts.length; d < l; ++d) {
                var p = c.fonts[d];
                e.p.push(new K(p.name,ja("font-weight:" + p.weight + ";font-style:" + p.style)))
            }
            b(a)
        }
        ,
        y(this.c, this.I(c), function(a) {
            a && b(!1)
        })) : b(!1)
    }
    ;
    W.prototype.load = function(a) {
        a(this.p)
    }
    ;
    function X(a, b) {
        this.c = a;
        this.e = b;
        this.p = []
    }
    X.prototype.I = function(a) {
        var b = w(this.c);
        return (this.e.api || b + "//use.typekit.net") + "/" + a + ".js"
    }
    ;
    X.prototype.M = function(a, b) {
        var c = this.e.id
          , d = this.e
          , e = this.c.v
          , f = this;
        c ? (e.__webfonttypekitmodule__ || (e.__webfonttypekitmodule__ = {}),
        e.__webfonttypekitmodule__[c] = function(c) {
            c(a, d, function(a, c, d) {
                for (var e = 0; e < c.length; e += 1) {
                    var g = d[c[e]];
                    if (g)
                        for (var J = 0; J < g.length; J += 1)
                            f.p.push(new K(c[e],g[J]));
                    else
                        f.p.push(new K(c[e]))
                }
                b(a)
            })
        }
        ,
        y(this.c, this.I(c), function(a) {
            a && b(!1)
        }, 2E3)) : b(!1)
    }
    ;
    X.prototype.load = function(a) {
        a(this.p)
    }
    ;
    function Y(a, b) {
        this.c = a;
        this.e = b;
        this.p = []
    }
    Y.prototype.M = function(a, b) {
        var c = this
          , d = c.e.projectId
          , e = c.e.version;
        if (d) {
            var f = c.c.v;
            y(this.c, c.I(d, e), function(e) {
                if (e)
                    b(!1);
                else {
                    if (f["__mti_fntLst" + d] && (e = f["__mti_fntLst" + d]()))
                        for (var h = 0; h < e.length; h++)
                            c.p.push(new K(e[h].fontfamily));
                    b(a.m.R)
                }
            }).id = "__MonotypeAPIScript__" + d
        } else
            b(!1)
    }
    ;
    Y.prototype.I = function(a, b) {
        var c = w(this.c)
          , d = (this.e.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "")
    }
    ;
    Y.prototype.load = function(a) {
        a(this.p)
    }
    ;
    function Z(a, b) {
        this.c = a;
        this.e = b
    }
    Z.prototype.load = function(a) {
        var b, c, d = this.e.urls || [], e = this.e.families || [], f = this.e.testStrings || {};
        b = 0;
        for (c = d.length; b < c; b++)
            x(this.c, d[b]);
        d = [];
        b = 0;
        for (c = e.length; b < c; b++) {
            var g = e[b].split(":");
            if (g[1])
                for (var h = g[1].split(","), l = 0; l < h.length; l += 1)
                    d.push(new K(g[0],h[l]));
            else
                d.push(new K(g[0]))
        }
        a(d, f)
    }
    ;
    Z.prototype.M = function(a, b) {
        return b(a.m.R)
    }
    ;
    var $ = new U(k);
    $.A.B.custom = function(a, b) {
        return new Z(b,a)
    }
    ;
    $.A.B.fontdeck = function(a, b) {
        return new W(b,a)
    }
    ;
    $.A.B.monotype = function(a, b) {
        return new Y(b,a)
    }
    ;
    $.A.B.typekit = function(a, b) {
        return new X(b,a)
    }
    ;
    $.A.B.google = function(a, b) {
        return new V(b,a)
    }
    ;
    k.WebFont || (k.WebFont = {},
    k.WebFont.load = n($.load, $),
    k.WebFontConfig && $.load(k.WebFontConfig));
}
)(this, document);

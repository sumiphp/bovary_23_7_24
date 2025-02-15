/**
 * @popperjs/core v2.6.0 - MIT License
 */

"use strict"
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports)
        : "function" == typeof define && define.amd
        ? define(["exports"], t)
        : t(((e = e || self).Popper = {}))
})(this, function (e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top,
        }
    }
    function n(e) {
        return "[object Window]" !== e.toString()
            ? ((e = e.ownerDocument) && e.defaultView) || window
            : e
    }
    function r(e) {
        return { scrollLeft: (e = n(e)).pageXOffset, scrollTop: e.pageYOffset }
    }
    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }
    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }
    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }
    function s(e) {
        return (
            (o(e) ? e.ownerDocument : e.document) || window.document
        ).documentElement
    }
    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }
    function c(e) {
        return n(e).getComputedStyle(e)
    }
    function p(e) {
        return (
            (e = c(e)),
            /auto|scroll|overlay|hidden/.test(
                e.overflow + e.overflowY + e.overflowX
            )
        )
    }
    function l(e, o, c) {
        void 0 === c && (c = !1)
        var l = s(o)
        e = t(e)
        var u = i(o),
            d = { scrollLeft: 0, scrollTop: 0 },
            m = { x: 0, y: 0 }
        return (
            (u || (!u && !c)) &&
                (("body" !== a(o) || p(l)) &&
                    (d =
                        o !== n(o) && i(o)
                            ? {
                                  scrollLeft: o.scrollLeft,
                                  scrollTop: o.scrollTop,
                              }
                            : r(o)),
                i(o)
                    ? (((m = t(o)).x += o.clientLeft), (m.y += o.clientTop))
                    : l && (m.x = f(l))),
            {
                x: e.left + d.scrollLeft - m.x,
                y: e.top + d.scrollTop - m.y,
                width: e.width,
                height: e.height,
            }
        )
    }
    function u(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight,
        }
    }
    function d(e) {
        return "html" === a(e)
            ? e
            : e.assignedSlot || e.parentNode || e.host || s(e)
    }
    function m(e, t) {
        void 0 === t && (t = [])
        var r = (function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t))
                ? t.ownerDocument.body
                : i(t) && p(t)
                ? t
                : e(d(t))
        })(e)
        e = "body" === a(r)
        var o = n(r)
        return (
            (r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r),
            (t = t.concat(r)),
            e ? t : t.concat(m(d(r)))
        )
    }
    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null
        if ((e = e.offsetParent)) {
            var t = s(e)
            if (
                "body" === a(e) &&
                "static" === c(e).position &&
                "static" !== c(t).position
            )
                return t
        }
        return e
    }
    function g(e) {
        for (
            var t = n(e), r = h(e);
            r &&
            0 <= ["table", "td", "th"].indexOf(a(r)) &&
            "static" === c(r).position;

        )
            r = h(r)
        if (r && "body" === a(r) && "static" === c(r).position) return t
        if (!r)
            e: {
                for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e)); ) {
                    if (
                        "none" !== (r = c(e)).transform ||
                        "none" !== r.perspective ||
                        (r.willChange && "auto" !== r.willChange)
                    ) {
                        r = e
                        break e
                    }
                    e = e.parentNode
                }
                r = null
            }
        return r || t
    }
    function v(e) {
        var t = new Map(),
            n = new Set(),
            r = []
        return (
            e.forEach(function (e) {
                t.set(e.name, e)
            }),
            e.forEach(function (e) {
                n.has(e.name) ||
                    (function e(o) {
                        n.add(o.name),
                            []
                                .concat(
                                    o.requires || [],
                                    o.requiresIfExists || []
                                )
                                .forEach(function (r) {
                                    n.has(r) || ((r = t.get(r)) && e(r))
                                }),
                            r.push(o)
                    })(e)
            }),
            r
        )
    }
    function b(e) {
        var t
        return function () {
            return (
                t ||
                    (t = new Promise(function (n) {
                        Promise.resolve().then(function () {
                            ;(t = void 0), n(e())
                        })
                    })),
                t
            )
        }
    }
    function y(e) {
        return e.split("-")[0]
    }
    function O(e, t) {
        var r,
            o = t.getRootNode && t.getRootNode()
        if (e.contains(t)) return !0
        if (
            ((r = o) &&
                (r =
                    o instanceof (r = n(o).ShadowRoot) ||
                    o instanceof ShadowRoot),
            r)
        )
            do {
                if (t && e.isSameNode(t)) return !0
                t = t.parentNode || t.host
            } while (t)
        return !1
    }
    function w(e) {
        return Object.assign(
            Object.assign({}, e),
            {},
            {
                left: e.x,
                top: e.y,
                right: e.x + e.width,
                bottom: e.y + e.height,
            }
        )
    }
    function x(e, o) {
        if ("viewport" === o) {
            o = n(e)
            var a = s(e)
            o = o.visualViewport
            var p = a.clientWidth
            a = a.clientHeight
            var l = 0,
                u = 0
            o &&
                ((p = o.width),
                (a = o.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                    ((l = o.offsetLeft), (u = o.offsetTop))),
                (e = w((e = { width: p, height: a, x: l + f(e), y: u })))
        } else i(o) ? (((e = t(o)).top += o.clientTop), (e.left += o.clientLeft), (e.bottom = e.top + o.clientHeight), (e.right = e.left + o.clientWidth), (e.width = o.clientWidth), (e.height = o.clientHeight), (e.x = e.left), (e.y = e.top)) : ((u = s(e)), (e = s(u)), (l = r(u)), (o = u.ownerDocument.body), (p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0)), (a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0)), (u = -l.scrollLeft + f(u)), (l = -l.scrollTop), "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), (e = w({ width: p, height: a, x: u, y: l })))
        return e
    }
    function j(e, t, n) {
        return (
            (t =
                "clippingParents" === t
                    ? (function (e) {
                          var t = m(d(e)),
                              n =
                                  0 <=
                                      ["absolute", "fixed"].indexOf(
                                          c(e).position
                                      ) && i(e)
                                      ? g(e)
                                      : e
                          return o(n)
                              ? t.filter(function (e) {
                                    return o(e) && O(e, n) && "body" !== a(e)
                                })
                              : []
                      })(e)
                    : [].concat(t)),
            ((n = (n = [].concat(t, [n])).reduce(function (t, n) {
                return (
                    (n = x(e, n)),
                    (t.top = Math.max(n.top, t.top)),
                    (t.right = Math.min(n.right, t.right)),
                    (t.bottom = Math.min(n.bottom, t.bottom)),
                    (t.left = Math.max(n.left, t.left)),
                    t
                )
            }, x(e, n[0]))).width = n.right - n.left),
            (n.height = n.bottom - n.top),
            (n.x = n.left),
            (n.y = n.top),
            n
        )
    }
    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }
    function E(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null
        e = e ? e.split("-")[1] : null
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2
        switch (r) {
            case "top":
                o = { x: o, y: t.y - n.height }
                break
            case "bottom":
                o = { x: o, y: t.y + t.height }
                break
            case "right":
                o = { x: t.x + t.width, y: i }
                break
            case "left":
                o = { x: t.x - n.width, y: i }
                break
            default:
                o = { x: t.x, y: t.y }
        }
        if (null != (r = r ? M(r) : null))
            switch (((i = "y" === r ? "height" : "width"), e)) {
                case "start":
                    o[r] -= t[i] / 2 - n[i] / 2
                    break
                case "end":
                    o[r] += t[i] / 2 - n[i] / 2
            }
        return o
    }
    function D(e) {
        return Object.assign(
            Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }),
            e
        )
    }
    function P(e, t) {
        return t.reduce(function (t, n) {
            return (t[n] = e), t
        }, {})
    }
    function L(e, n) {
        void 0 === n && (n = {})
        var r = n
        n = void 0 === (n = r.placement) ? e.placement : n
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i
        i = void 0 === (i = r.elementContext) ? "popper" : i
        var c = r.altBoundary,
            p = void 0 !== c && c
        r = D(
            "number" != typeof (r = void 0 === (r = r.padding) ? 0 : r)
                ? r
                : P(r, T)
        )
        var l = e.elements.reference
        ;(c = e.rects.popper),
            (a = j(
                o(
                    (p =
                        e.elements[
                            p ? ("popper" === i ? "reference" : "popper") : i
                        ])
                )
                    ? p
                    : p.contextElement || s(e.elements.popper),
                a,
                f
            )),
            (p = E({
                reference: (f = t(l)),
                element: c,
                strategy: "absolute",
                placement: n,
            })),
            (c = w(Object.assign(Object.assign({}, c), p))),
            (f = "popper" === i ? c : f)
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right,
        }
        if (((e = e.modifiersData.offset), "popper" === i && e)) {
            var d = e[n]
            Object.keys(u).forEach(function (e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x"
                u[e] += d[n] * t
            })
        }
        return u
    }
    function k() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
            t[n] = arguments[n]
        return !t.some(function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        })
    }
    function B(e) {
        void 0 === e && (e = {})
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e
        return function (e, t, i) {
            function a() {
                f.forEach(function (e) {
                    return e()
                }),
                    (f = [])
            }
            void 0 === i && (i = r)
            var s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign(Object.assign({}, V), r),
                    modifiersData: {},
                    elements: { reference: e, popper: t },
                    attributes: {},
                    styles: {},
                },
                f = [],
                c = !1,
                p = {
                    state: s,
                    setOptions: function (i) {
                        return (
                            a(),
                            (s.options = Object.assign(
                                Object.assign(Object.assign({}, r), s.options),
                                i
                            )),
                            (s.scrollParents = {
                                reference: o(e)
                                    ? m(e)
                                    : e.contextElement
                                    ? m(e.contextElement)
                                    : [],
                                popper: m(t),
                            }),
                            (i = (function (e) {
                                var t = v(e)
                                return N.reduce(function (e, n) {
                                    return e.concat(
                                        t.filter(function (e) {
                                            return e.phase === n
                                        })
                                    )
                                }, [])
                            })(
                                (function (e) {
                                    var t = e.reduce(function (e, t) {
                                        var n = e[t.name]
                                        return (
                                            (e[t.name] = n
                                                ? Object.assign(
                                                      Object.assign(
                                                          Object.assign({}, n),
                                                          t
                                                      ),
                                                      {},
                                                      {
                                                          options:
                                                              Object.assign(
                                                                  Object.assign(
                                                                      {},
                                                                      n.options
                                                                  ),
                                                                  t.options
                                                              ),
                                                          data: Object.assign(
                                                              Object.assign(
                                                                  {},
                                                                  n.data
                                                              ),
                                                              t.data
                                                          ),
                                                      }
                                                  )
                                                : t),
                                            e
                                        )
                                    }, {})
                                    return Object.keys(t).map(function (e) {
                                        return t[e]
                                    })
                                })([].concat(n, s.options.modifiers))
                            )),
                            (s.orderedModifiers = i.filter(function (e) {
                                return e.enabled
                            })),
                            s.orderedModifiers.forEach(function (e) {
                                var t = e.name,
                                    n = e.options
                                ;(n = void 0 === n ? {} : n),
                                    "function" == typeof (e = e.effect) &&
                                        ((t = e({
                                            state: s,
                                            name: t,
                                            instance: p,
                                            options: n,
                                        })),
                                        f.push(t || function () {}))
                            }),
                            p.update()
                        )
                    },
                    forceUpdate: function () {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference
                            if (k(t, (e = e.popper)))
                                for (
                                    s.rects = {
                                        reference: l(
                                            t,
                                            g(e),
                                            "fixed" === s.options.strategy
                                        ),
                                        popper: u(e),
                                    },
                                        s.reset = !1,
                                        s.placement = s.options.placement,
                                        s.orderedModifiers.forEach(function (
                                            e
                                        ) {
                                            return (s.modifiersData[e.name] =
                                                Object.assign({}, e.data))
                                        }),
                                        t = 0;
                                    t < s.orderedModifiers.length;
                                    t++
                                )
                                    if (!0 === s.reset) (s.reset = !1), (t = -1)
                                    else {
                                        var n = s.orderedModifiers[t]
                                        e = n.fn
                                        var r = n.options
                                        ;(r = void 0 === r ? {} : r),
                                            (n = n.name),
                                            "function" == typeof e &&
                                                (s =
                                                    e({
                                                        state: s,
                                                        options: r,
                                                        name: n,
                                                        instance: p,
                                                    }) || s)
                                    }
                        }
                    },
                    update: b(function () {
                        return new Promise(function (e) {
                            p.forceUpdate(), e(s)
                        })
                    }),
                    destroy: function () {
                        a(), (c = !0)
                    },
                }
            return k(e, t)
                ? (p.setOptions(i).then(function (e) {
                      !c && i.onFirstUpdate && i.onFirstUpdate(e)
                  }),
                  p)
                : p
        }
    }
    function W(e) {
        var t,
            r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive
        e.roundOffsets
            ? ((e = window.devicePixelRatio || 1),
              (e = {
                  x: Math.round(a.x * e) / e || 0,
                  y: Math.round(a.y * e) / e || 0,
              }))
            : (e = a)
        var l = e
        ;(e = void 0 === (e = l.x) ? 0 : e), (l = void 0 === (l = l.y) ? 0 : l)
        var u = a.hasOwnProperty("x")
        a = a.hasOwnProperty("y")
        var d,
            m = "left",
            h = "top",
            v = window
        if (p) {
            var b = g(r)
            b === n(r) && (b = s(r)),
                "top" === i &&
                    ((h = "bottom"),
                    (l -= b.clientHeight - o.height),
                    (l *= c ? 1 : -1)),
                "left" === i &&
                    ((m = "right"),
                    (e -= b.clientWidth - o.width),
                    (e *= c ? 1 : -1))
        }
        return (
            (r = Object.assign({ position: f }, p && z)),
            c
                ? Object.assign(
                      Object.assign({}, r),
                      {},
                      (((d = {})[h] = a ? "0" : ""),
                      (d[m] = u ? "0" : ""),
                      (d.transform =
                          2 > (v.devicePixelRatio || 1)
                              ? "translate(" + e + "px, " + l + "px)"
                              : "translate3d(" + e + "px, " + l + "px, 0)"),
                      d)
                  )
                : Object.assign(
                      Object.assign({}, r),
                      {},
                      (((t = {})[h] = a ? l + "px" : ""),
                      (t[m] = u ? e + "px" : ""),
                      (t.transform = ""),
                      t)
                  )
        )
    }
    function A(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
            return G[e]
        })
    }
    function H(e) {
        return e.replace(/start|end/g, function (e) {
            return J[e]
        })
    }
    function R(e, t, n) {
        return (
            void 0 === n && (n = { x: 0, y: 0 }),
            {
                top: e.top - t.height - n.y,
                right: e.right - t.width + n.x,
                bottom: e.bottom - t.height + n.y,
                left: e.left - t.width - n.x,
            }
        )
    }
    function S(e) {
        return ["top", "right", "bottom", "left"].some(function (t) {
            return 0 <= e[t]
        })
    }
    var T = ["top", "bottom", "right", "left"],
        q = T.reduce(function (e, t) {
            return e.concat([t + "-start", t + "-end"])
        }, []),
        C = [].concat(T, ["auto"]).reduce(function (e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }, []),
        N =
            "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(
                " "
            ),
        V = { placement: "bottom", modifiers: [], strategy: "absolute" },
        I = { passive: !0 },
        _ = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(
                        t.scrollParents.reference,
                        t.scrollParents.popper
                    )
                return (
                    i &&
                        f.forEach(function (e) {
                            e.addEventListener("scroll", r.update, I)
                        }),
                    a && s.addEventListener("resize", r.update, I),
                    function () {
                        i &&
                            f.forEach(function (e) {
                                e.removeEventListener("scroll", r.update, I)
                            }),
                            a && s.removeEventListener("resize", r.update, I)
                    }
                )
            },
            data: {},
        },
        U = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function (e) {
                var t = e.state
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement,
                })
            },
            data: {},
        },
        z = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
        F = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (e) {
                var t = e.state,
                    n = e.options
                e = void 0 === (e = n.gpuAcceleration) || e
                var r = n.adaptive
                ;(r = void 0 === r || r),
                    (n = void 0 === (n = n.roundOffsets) || n),
                    (e = {
                        placement: y(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: e,
                    }),
                    null != t.modifiersData.popperOffsets &&
                        (t.styles.popper = Object.assign(
                            Object.assign({}, t.styles.popper),
                            W(
                                Object.assign(
                                    Object.assign({}, e),
                                    {},
                                    {
                                        offsets: t.modifiersData.popperOffsets,
                                        position: t.options.strategy,
                                        adaptive: r,
                                        roundOffsets: n,
                                    }
                                )
                            )
                        )),
                    null != t.modifiersData.arrow &&
                        (t.styles.arrow = Object.assign(
                            Object.assign({}, t.styles.arrow),
                            W(
                                Object.assign(
                                    Object.assign({}, e),
                                    {},
                                    {
                                        offsets: t.modifiersData.arrow,
                                        position: "absolute",
                                        adaptive: !1,
                                        roundOffsets: n,
                                    }
                                )
                            )
                        )),
                    (t.attributes.popper = Object.assign(
                        Object.assign({}, t.attributes.popper),
                        {},
                        { "data-popper-placement": t.placement }
                    ))
            },
            data: {},
        },
        X = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function (e) {
                var t = e.state
                Object.keys(t.elements).forEach(function (e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e]
                    i(o) &&
                        a(o) &&
                        (Object.assign(o.style, n),
                        Object.keys(r).forEach(function (e) {
                            var t = r[e]
                            !1 === t
                                ? o.removeAttribute(e)
                                : o.setAttribute(e, !0 === t ? "" : t)
                        }))
                })
            },
            effect: function (e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0",
                        },
                        arrow: { position: "absolute" },
                        reference: {},
                    }
                return (
                    Object.assign(t.elements.popper.style, n.popper),
                    t.elements.arrow &&
                        Object.assign(t.elements.arrow.style, n.arrow),
                    function () {
                        Object.keys(t.elements).forEach(function (e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {}
                            ;(e = Object.keys(
                                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                            ).reduce(function (e, t) {
                                return (e[t] = ""), e
                            }, {})),
                                i(r) &&
                                    a(r) &&
                                    (Object.assign(r.style, e),
                                    Object.keys(o).forEach(function (e) {
                                        r.removeAttribute(e)
                                    }))
                        })
                    }
                )
            },
            requires: ["computeStyles"],
        },
        Y = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function (e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = C.reduce(function (e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s =
                                "function" == typeof r
                                    ? r(
                                          Object.assign(
                                              Object.assign({}, o),
                                              {},
                                              { placement: n }
                                          )
                                      )
                                    : r
                        return (
                            (o = (o = s[0]) || 0),
                            (s = ((s = s[1]) || 0) * a),
                            (i =
                                0 <= ["left", "right"].indexOf(i)
                                    ? { x: s, y: o }
                                    : { x: o, y: s }),
                            (e[n] = i),
                            e
                        )
                    }, {}))[t.placement],
                    i = o.x
                ;(o = o.y),
                    null != t.modifiersData.popperOffsets &&
                        ((t.modifiersData.popperOffsets.x += i),
                        (t.modifiersData.popperOffsets.y += o)),
                    (t.modifiersData[n] = e)
            },
        },
        G = { left: "right", right: "left", bottom: "top", top: "bottom" },
        J = { start: "end", end: "start" },
        K = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t = e.state,
                    n = e.options
                if (((e = e.name), !t.modifiersData[e]._skip)) {
                    var r = n.mainAxis
                    r = void 0 === r || r
                    var o = n.altAxis
                    o = void 0 === o || o
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements
                    ;(p = y((n = t.options.placement))),
                        (i =
                            i ||
                            (p !== n && l
                                ? (function (e) {
                                      if ("auto" === y(e)) return []
                                      var t = A(e)
                                      return [H(e), t, H(t)]
                                  })(n)
                                : [A(n)]))
                    var d = [n].concat(i).reduce(function (e, n) {
                        return e.concat(
                            "auto" === y(n)
                                ? (function (e, t) {
                                      void 0 === t && (t = {})
                                      var n = t.boundary,
                                          r = t.rootBoundary,
                                          o = t.padding,
                                          i = t.flipVariations,
                                          a = t.allowedAutoPlacements,
                                          s = void 0 === a ? C : a,
                                          f = t.placement.split("-")[1]
                                      0 ===
                                          (i = (t = f
                                              ? i
                                                  ? q
                                                  : q.filter(function (e) {
                                                        return (
                                                            e.split("-")[1] ===
                                                            f
                                                        )
                                                    })
                                              : T).filter(function (e) {
                                              return 0 <= s.indexOf(e)
                                          })).length && (i = t)
                                      var c = i.reduce(function (t, i) {
                                          return (
                                              (t[i] = L(e, {
                                                  placement: i,
                                                  boundary: n,
                                                  rootBoundary: r,
                                                  padding: o,
                                              })[y(i)]),
                                              t
                                          )
                                      }, {})
                                      return Object.keys(c).sort(function (
                                          e,
                                          t
                                      ) {
                                          return c[e] - c[t]
                                      })
                                  })(t, {
                                      placement: n,
                                      boundary: s,
                                      rootBoundary: f,
                                      padding: a,
                                      flipVariations: l,
                                      allowedAutoPlacements: u,
                                  })
                                : n
                        )
                    }, [])
                    ;(n = t.rects.reference), (i = t.rects.popper)
                    var m = new Map()
                    p = !0
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var v = d[g],
                            b = y(v),
                            O = "start" === v.split("-")[1],
                            w = 0 <= ["top", "bottom"].indexOf(b),
                            x = w ? "width" : "height",
                            j = L(t, {
                                placement: v,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: c,
                                padding: a,
                            })
                        if (
                            ((O = w
                                ? O
                                    ? "right"
                                    : "left"
                                : O
                                ? "bottom"
                                : "top"),
                            n[x] > i[x] && (O = A(O)),
                            (x = A(O)),
                            (w = []),
                            r && w.push(0 >= j[b]),
                            o && w.push(0 >= j[O], 0 >= j[x]),
                            w.every(function (e) {
                                return e
                            }))
                        ) {
                            ;(h = v), (p = !1)
                            break
                        }
                        m.set(v, w)
                    }
                    if (p)
                        for (
                            r = function (e) {
                                var t = d.find(function (t) {
                                    if ((t = m.get(t)))
                                        return t
                                            .slice(0, e)
                                            .every(function (e) {
                                                return e
                                            })
                                })
                                if (t) return (h = t), "break"
                            },
                                o = l ? 3 : 1;
                            0 < o && "break" !== r(o);
                            o--
                        );
                    t.placement !== h &&
                        ((t.modifiersData[e]._skip = !0),
                        (t.placement = h),
                        (t.reset = !0))
                }
            },
            requiresIfExists: ["offset"],
            data: { _skip: !1 },
        },
        Q = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t = e.state,
                    n = e.options
                e = e.name
                var r = n.mainAxis,
                    o = void 0 === r || r
                r = void 0 !== (r = n.altAxis) && r
                var i = n.tether
                i = void 0 === i || i
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a
                ;(n = L(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary,
                })),
                    (a = y(t.placement))
                var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a)
                a = "x" === p ? "y" : "x"
                var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h =
                        "function" == typeof s
                            ? s(
                                  Object.assign(
                                      Object.assign({}, t.rects),
                                      {},
                                      { placement: t.placement }
                                  )
                              )
                            : s
                if (((s = { x: 0, y: 0 }), l)) {
                    if (o) {
                        var v = "y" === p ? "top" : "left",
                            b = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width"
                        o = l[p]
                        var w = l[p] + n[v],
                            x = l[p] - n[b],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O]
                        ;(f = "start" === f ? -m[O] : -d[O]),
                            (m = t.elements.arrow),
                            (m = i && m ? u(m) : { width: 0, height: 0 })
                        var D = t.modifiersData["arrow#persistent"]
                            ? t.modifiersData["arrow#persistent"].padding
                            : { top: 0, right: 0, bottom: 0, left: 0 }
                        ;(v = D[v]),
                            (b = D[b]),
                            (m = Math.max(0, Math.min(d[O], m[O]))),
                            (E = c ? d[O] / 2 - j - m - v - h : E - m - v - h),
                            (c = c ? -d[O] / 2 + j + m + b + h : f + m + b + h),
                            (h = t.elements.arrow && g(t.elements.arrow)),
                            (d = t.modifiersData.offset
                                ? t.modifiersData.offset[t.placement][p]
                                : 0),
                            (h =
                                l[p] +
                                E -
                                d -
                                (h
                                    ? "y" === p
                                        ? h.clientTop || 0
                                        : h.clientLeft || 0
                                    : 0)),
                            (c = l[p] + c - d),
                            (i = Math.max(
                                i ? Math.min(w, h) : w,
                                Math.min(o, i ? Math.max(x, c) : x)
                            )),
                            (l[p] = i),
                            (s[p] = i - o)
                    }
                    r &&
                        ((r = l[a]),
                        (i = Math.max(
                            r + n["x" === p ? "top" : "left"],
                            Math.min(r, r - n["x" === p ? "bottom" : "right"])
                        )),
                        (l[a] = i),
                        (s[a] = i - r)),
                        (t.modifiersData[e] = s)
                }
            },
            requiresIfExists: ["offset"],
        },
        Z = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (e) {
                var t,
                    n = e.state
                e = e.name
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i)
                if (
                    ((i =
                        0 <= ["left", "right"].indexOf(i) ? "height" : "width"),
                    r && o)
                ) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l =
                            n.rects.reference[i] +
                            n.rects.reference[a] -
                            o[a] -
                            n.rects.popper[i]
                    ;(o = o[a] - n.rects.reference[a]),
                        (l =
                            (r = (r = g(r))
                                ? "y" === a
                                    ? r.clientHeight || 0
                                    : r.clientWidth || 0
                                : 0) /
                                2 -
                            f[i] / 2 +
                            (l / 2 - o / 2)),
                        (i = Math.max(s[c], Math.min(l, r - f[i] - s[p]))),
                        (n.modifiersData[e] =
                            (((t = {})[a] = i), (t.centerOffset = i - l), t))
                }
            },
            effect: function (e) {
                var t = e.state,
                    n = e.options
                e = e.name
                var r = n.element
                if (
                    ((r = void 0 === r ? "[data-popper-arrow]" : r),
                    (n = void 0 === (n = n.padding) ? 0 : n),
                    null != r)
                ) {
                    if (
                        "string" == typeof r &&
                        !(r = t.elements.popper.querySelector(r))
                    )
                        return
                    O(t.elements.popper, r) &&
                        ((t.elements.arrow = r),
                        (t.modifiersData[e + "#persistent"] = {
                            padding: D("number" != typeof n ? n : P(n, T)),
                        }))
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
        },
        $ = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function (e) {
                var t = e.state
                e = e.name
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = L(t, { elementContext: "reference" }),
                    a = L(t, { altBoundary: !0 })
                ;(n = R(i, n)),
                    (r = R(a, r, o)),
                    (o = S(n)),
                    (a = S(r)),
                    (t.modifiersData[e] = {
                        referenceClippingOffsets: n,
                        popperEscapeOffsets: r,
                        isReferenceHidden: o,
                        hasPopperEscaped: a,
                    }),
                    (t.attributes.popper = Object.assign(
                        Object.assign({}, t.attributes.popper),
                        {},
                        {
                            "data-popper-reference-hidden": o,
                            "data-popper-escaped": a,
                        }
                    ))
            },
        },
        ee = B({ defaultModifiers: [_, U, F, X] }),
        te = [_, U, F, X, Y, K, Q, Z, $],
        ne = B({ defaultModifiers: te })
    ;(e.applyStyles = X),
        (e.arrow = Z),
        (e.computeStyles = F),
        (e.createPopper = ne),
        (e.createPopperLite = ee),
        (e.defaultModifiers = te),
        (e.detectOverflow = L),
        (e.eventListeners = _),
        (e.flip = K),
        (e.hide = $),
        (e.offset = Y),
        (e.popperGenerator = B),
        (e.popperOffsets = U),
        (e.preventOverflow = Q),
        Object.defineProperty(e, "__esModule", { value: !0 })
})
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v5.0.0-beta2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e(require("@popperjs/core")))
        : "function" == typeof define && define.amd
        ? define(["@popperjs/core"], e)
        : ((t =
              "undefined" != typeof globalThis
                  ? globalThis
                  : t || self).bootstrap = e(t.Popper))
})(this, function (t) {
    "use strict"
    function e(t) {
        if (t && t.__esModule) return t
        var e = Object.create(null)
        return (
            t &&
                Object.keys(t).forEach(function (n) {
                    if ("default" !== n) {
                        var i = Object.getOwnPropertyDescriptor(t, n)
                        Object.defineProperty(
                            e,
                            n,
                            i.get
                                ? i
                                : {
                                      enumerable: !0,
                                      get: function () {
                                          return t[n]
                                      },
                                  }
                        )
                    }
                }),
            (e.default = t),
            Object.freeze(e)
        )
    }
    var n = e(t)
    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n]
            ;(i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
        }
    }
    function o(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }
    function s() {
        return (s =
            Object.assign ||
            function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e]
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) &&
                            (t[i] = n[i])
                }
                return t
            }).apply(this, arguments)
    }
    function r(t, e) {
        var n, i
        ;(t.prototype = Object.create(e.prototype)),
            (t.prototype.constructor = t),
            (n = t),
            (i = e),
            (
                Object.setPrototypeOf ||
                function (t, e) {
                    return (t.__proto__ = e), t
                }
            )(n, i)
    }
    var a,
        l,
        c = function (t) {
            do {
                t += Math.floor(1e6 * Math.random())
            } while (document.getElementById(t))
            return t
        },
        u = function (t) {
            var e = t.getAttribute("data-bs-target")
            if (!e || "#" === e) {
                var n = t.getAttribute("href")
                if (!n || (!n.includes("#") && !n.startsWith("."))) return null
                n.includes("#") &&
                    !n.startsWith("#") &&
                    (n = "#" + n.split("#")[1]),
                    (e = n && "#" !== n ? n.trim() : null)
            }
            return e
        },
        h = function (t) {
            var e = u(t)
            return e && document.querySelector(e) ? e : null
        },
        d = function (t) {
            var e = u(t)
            return e ? document.querySelector(e) : null
        },
        f = function (t) {
            if (!t) return 0
            var e = window.getComputedStyle(t),
                n = e.transitionDuration,
                i = e.transitionDelay,
                o = Number.parseFloat(n),
                s = Number.parseFloat(i)
            return o || s
                ? ((n = n.split(",")[0]),
                  (i = i.split(",")[0]),
                  1e3 * (Number.parseFloat(n) + Number.parseFloat(i)))
                : 0
        },
        p = function (t) {
            t.dispatchEvent(new Event("transitionend"))
        },
        g = function (t) {
            return (t[0] || t).nodeType
        },
        m = function (t, e) {
            var n = !1,
                i = e + 5
            t.addEventListener("transitionend", function e() {
                ;(n = !0), t.removeEventListener("transitionend", e)
            }),
                setTimeout(function () {
                    n || p(t)
                }, i)
        },
        _ = function (t, e, n) {
            Object.keys(n).forEach(function (i) {
                var o,
                    s = n[i],
                    r = e[i],
                    a =
                        r && g(r)
                            ? "element"
                            : null == (o = r)
                            ? "" + o
                            : {}.toString
                                  .call(o)
                                  .match(/\s([a-z]+)/i)[1]
                                  .toLowerCase()
                if (!new RegExp(s).test(a))
                    throw new TypeError(
                        t.toUpperCase() +
                            ': Option "' +
                            i +
                            '" provided type "' +
                            a +
                            '" but expected type "' +
                            s +
                            '".'
                    )
            })
        },
        v = function (t) {
            if (!t) return !1
            if (t.style && t.parentNode && t.parentNode.style) {
                var e = getComputedStyle(t),
                    n = getComputedStyle(t.parentNode)
                return (
                    "none" !== e.display &&
                    "none" !== n.display &&
                    "hidden" !== e.visibility
                )
            }
            return !1
        },
        b = function () {
            return function () {}
        },
        y = function (t) {
            return t.offsetHeight
        },
        w = function () {
            var t = window.jQuery
            return t && !document.body.hasAttribute("data-bs-no-jquery")
                ? t
                : null
        },
        E = "rtl" === document.documentElement.dir,
        T = function (t, e) {
            var n
            ;(n = function () {
                var n = w()
                if (n) {
                    var i = n.fn[t]
                    ;(n.fn[t] = e.jQueryInterface),
                        (n.fn[t].Constructor = e),
                        (n.fn[t].noConflict = function () {
                            return (n.fn[t] = i), e.jQueryInterface
                        })
                }
            }),
                "loading" === document.readyState
                    ? document.addEventListener("DOMContentLoaded", n)
                    : n()
        },
        A =
            ((a = {}),
            (l = 1),
            {
                set: function (t, e, n) {
                    void 0 === t.bsKey && ((t.bsKey = { key: e, id: l }), l++),
                        (a[t.bsKey.id] = n)
                },
                get: function (t, e) {
                    if (!t || void 0 === t.bsKey) return null
                    var n = t.bsKey
                    return n.key === e ? a[n.id] : null
                },
                delete: function (t, e) {
                    if (void 0 !== t.bsKey) {
                        var n = t.bsKey
                        n.key === e && (delete a[n.id], delete t.bsKey)
                    }
                },
            }),
        k = function (t, e, n) {
            A.set(t, e, n)
        },
        L = function (t, e) {
            return A.get(t, e)
        },
        C = /[^.]*(?=\..*)\.|.*/,
        D = /\..*/,
        S = /::\d+$/,
        N = {},
        O = 1,
        I = { mouseenter: "mouseover", mouseleave: "mouseout" },
        j = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ])
    function P(t, e) {
        return (e && e + "::" + O++) || t.uidEvent || O++
    }
    function x(t) {
        var e = P(t)
        return (t.uidEvent = e), (N[e] = N[e] || {}), N[e]
    }
    function H(t, e, n) {
        void 0 === n && (n = null)
        for (var i = Object.keys(t), o = 0, s = i.length; o < s; o++) {
            var r = t[i[o]]
            if (r.originalHandler === e && r.delegationSelector === n) return r
        }
        return null
    }
    function B(t, e, n) {
        var i = "string" == typeof e,
            o = i ? n : e,
            s = t.replace(D, ""),
            r = I[s]
        return r && (s = r), j.has(s) || (s = t), [i, o, s]
    }
    function M(t, e, n, i, o) {
        if ("string" == typeof e && t) {
            n || ((n = i), (i = null))
            var s = B(e, n, i),
                r = s[0],
                a = s[1],
                l = s[2],
                c = x(t),
                u = c[l] || (c[l] = {}),
                h = H(u, a, r ? n : null)
            if (h) h.oneOff = h.oneOff && o
            else {
                var d = P(a, e.replace(C, "")),
                    f = r
                        ? (function (t, e, n) {
                              return function i(o) {
                                  for (
                                      var s = t.querySelectorAll(e),
                                          r = o.target;
                                      r && r !== this;
                                      r = r.parentNode
                                  )
                                      for (var a = s.length; a--; )
                                          if (s[a] === r)
                                              return (
                                                  (o.delegateTarget = r),
                                                  i.oneOff &&
                                                      K.off(t, o.type, n),
                                                  n.apply(r, [o])
                                              )
                                  return null
                              }
                          })(t, n, i)
                        : (function (t, e) {
                              return function n(i) {
                                  return (
                                      (i.delegateTarget = t),
                                      n.oneOff && K.off(t, i.type, e),
                                      e.apply(t, [i])
                                  )
                              }
                          })(t, n)
                ;(f.delegationSelector = r ? n : null),
                    (f.originalHandler = a),
                    (f.oneOff = o),
                    (f.uidEvent = d),
                    (u[d] = f),
                    t.addEventListener(l, f, r)
            }
        }
    }
    function R(t, e, n, i, o) {
        var s = H(e[n], i, o)
        s && (t.removeEventListener(n, s, Boolean(o)), delete e[n][s.uidEvent])
    }
    var K = {
            on: function (t, e, n, i) {
                M(t, e, n, i, !1)
            },
            one: function (t, e, n, i) {
                M(t, e, n, i, !0)
            },
            off: function (t, e, n, i) {
                if ("string" == typeof e && t) {
                    var o = B(e, n, i),
                        s = o[0],
                        r = o[1],
                        a = o[2],
                        l = a !== e,
                        c = x(t),
                        u = e.startsWith(".")
                    if (void 0 === r) {
                        u &&
                            Object.keys(c).forEach(function (n) {
                                !(function (t, e, n, i) {
                                    var o = e[n] || {}
                                    Object.keys(o).forEach(function (s) {
                                        if (s.includes(i)) {
                                            var r = o[s]
                                            R(
                                                t,
                                                e,
                                                n,
                                                r.originalHandler,
                                                r.delegationSelector
                                            )
                                        }
                                    })
                                })(t, c, n, e.slice(1))
                            })
                        var h = c[a] || {}
                        Object.keys(h).forEach(function (n) {
                            var i = n.replace(S, "")
                            if (!l || e.includes(i)) {
                                var o = h[n]
                                R(
                                    t,
                                    c,
                                    a,
                                    o.originalHandler,
                                    o.delegationSelector
                                )
                            }
                        })
                    } else {
                        if (!c || !c[a]) return
                        R(t, c, a, r, s ? n : null)
                    }
                }
            },
            trigger: function (t, e, n) {
                if ("string" != typeof e || !t) return null
                var i,
                    o = w(),
                    s = e.replace(D, ""),
                    r = e !== s,
                    a = j.has(s),
                    l = !0,
                    c = !0,
                    u = !1,
                    h = null
                return (
                    r &&
                        o &&
                        ((i = o.Event(e, n)),
                        o(t).trigger(i),
                        (l = !i.isPropagationStopped()),
                        (c = !i.isImmediatePropagationStopped()),
                        (u = i.isDefaultPrevented())),
                    a
                        ? (h = document.createEvent("HTMLEvents")).initEvent(
                              s,
                              l,
                              !0
                          )
                        : (h = new CustomEvent(e, {
                              bubbles: l,
                              cancelable: !0,
                          })),
                    void 0 !== n &&
                        Object.keys(n).forEach(function (t) {
                            Object.defineProperty(h, t, {
                                get: function () {
                                    return n[t]
                                },
                            })
                        }),
                    u && h.preventDefault(),
                    c && t.dispatchEvent(h),
                    h.defaultPrevented && void 0 !== i && i.preventDefault(),
                    h
                )
            },
        },
        W = (function () {
            function t(t) {
                t &&
                    ((this._element = t), k(t, this.constructor.DATA_KEY, this))
            }
            return (
                (t.prototype.dispose = function () {
                    var t, e
                    ;(t = this._element),
                        (e = this.constructor.DATA_KEY),
                        A.delete(t, e),
                        (this._element = null)
                }),
                (t.getInstance = function (t) {
                    return L(t, this.DATA_KEY)
                }),
                o(t, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.0.0-beta2"
                        },
                    },
                ]),
                t
            )
        })(),
        U = (function (t) {
            function e() {
                return t.apply(this, arguments) || this
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.close = function (t) {
                    var e = t ? this._getRootElement(t) : this._element,
                        n = this._triggerCloseEvent(e)
                    null === n || n.defaultPrevented || this._removeElement(e)
                }),
                (n._getRootElement = function (t) {
                    return d(t) || t.closest(".alert")
                }),
                (n._triggerCloseEvent = function (t) {
                    return K.trigger(t, "close.bs.alert")
                }),
                (n._removeElement = function (t) {
                    var e = this
                    if (
                        (t.classList.remove("show"),
                        t.classList.contains("fade"))
                    ) {
                        var n = f(t)
                        K.one(t, "transitionend", function () {
                            return e._destroyElement(t)
                        }),
                            m(t, n)
                    } else this._destroyElement(t)
                }),
                (n._destroyElement = function (t) {
                    t.parentNode && t.parentNode.removeChild(t),
                        K.trigger(t, "closed.bs.alert")
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        var n = L(this, "bs.alert")
                        n || (n = new e(this)), "close" === t && n[t](this)
                    })
                }),
                (e.handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }),
                o(e, null, [
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.alert"
                        },
                    },
                ]),
                e
            )
        })(W)
    K.on(
        document,
        "click.bs.alert.data-api",
        '[data-bs-dismiss="alert"]',
        U.handleDismiss(new U())
    ),
        T("alert", U)
    var F = (function (t) {
        function e() {
            return t.apply(this, arguments) || this
        }
        return (
            r(e, t),
            (e.prototype.toggle = function () {
                this._element.setAttribute(
                    "aria-pressed",
                    this._element.classList.toggle("active")
                )
            }),
            (e.jQueryInterface = function (t) {
                return this.each(function () {
                    var n = L(this, "bs.button")
                    n || (n = new e(this)), "toggle" === t && n[t]()
                })
            }),
            o(e, null, [
                {
                    key: "DATA_KEY",
                    get: function () {
                        return "bs.button"
                    },
                },
            ]),
            e
        )
    })(W)
    function z(t) {
        return (
            "true" === t ||
            ("false" !== t &&
                (t === Number(t).toString()
                    ? Number(t)
                    : "" === t || "null" === t
                    ? null
                    : t))
        )
    }
    function Y(t) {
        return t.replace(/[A-Z]/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }
    K.on(
        document,
        "click.bs.button.data-api",
        '[data-bs-toggle="button"]',
        function (t) {
            t.preventDefault()
            var e = t.target.closest('[data-bs-toggle="button"]'),
                n = L(e, "bs.button")
            n || (n = new F(e)), n.toggle()
        }
    ),
        T("button", F)
    var X = {
            setDataAttribute: function (t, e, n) {
                t.setAttribute("data-bs-" + Y(e), n)
            },
            removeDataAttribute: function (t, e) {
                t.removeAttribute("data-bs-" + Y(e))
            },
            getDataAttributes: function (t) {
                if (!t) return {}
                var e = {}
                return (
                    Object.keys(t.dataset)
                        .filter(function (t) {
                            return t.startsWith("bs")
                        })
                        .forEach(function (n) {
                            var i = n.replace(/^bs/, "")
                            ;(i =
                                i.charAt(0).toLowerCase() +
                                i.slice(1, i.length)),
                                (e[i] = z(t.dataset[n]))
                        }),
                    e
                )
            },
            getDataAttribute: function (t, e) {
                return z(t.getAttribute("data-bs-" + Y(e)))
            },
            offset: function (t) {
                var e = t.getBoundingClientRect()
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft,
                }
            },
            position: function (t) {
                return { top: t.offsetTop, left: t.offsetLeft }
            },
        },
        q = function (t, e) {
            var n
            return (
                void 0 === e && (e = document.documentElement),
                (n = []).concat.apply(
                    n,
                    Element.prototype.querySelectorAll.call(e, t)
                )
            )
        },
        Q = function (t, e) {
            return (
                void 0 === e && (e = document.documentElement),
                Element.prototype.querySelector.call(e, t)
            )
        },
        V = function (t, e) {
            var n
            return (n = []).concat.apply(n, t.children).filter(function (t) {
                return t.matches(e)
            })
        },
        $ = function (t, e) {
            for (var n = t.previousElementSibling; n; ) {
                if (n.matches(e)) return [n]
                n = n.previousElementSibling
            }
            return []
        },
        G = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0,
        },
        Z = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean",
        },
        J = (function (t) {
            function e(e, n) {
                var i
                return (
                    ((i = t.call(this, e) || this)._items = null),
                    (i._interval = null),
                    (i._activeElement = null),
                    (i._isPaused = !1),
                    (i._isSliding = !1),
                    (i.touchTimeout = null),
                    (i.touchStartX = 0),
                    (i.touchDeltaX = 0),
                    (i._config = i._getConfig(n)),
                    (i._indicatorsElement = Q(
                        ".carousel-indicators",
                        i._element
                    )),
                    (i._touchSupported =
                        "ontouchstart" in document.documentElement ||
                        navigator.maxTouchPoints > 0),
                    (i._pointerEvent = Boolean(window.PointerEvent)),
                    i._addEventListeners(),
                    i
                )
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.next = function () {
                    this._isSliding || this._slide("next")
                }),
                (n.nextWhenVisible = function () {
                    !document.hidden && v(this._element) && this.next()
                }),
                (n.prev = function () {
                    this._isSliding || this._slide("prev")
                }),
                (n.pause = function (t) {
                    t || (this._isPaused = !0),
                        Q(
                            ".carousel-item-next, .carousel-item-prev",
                            this._element
                        ) && (p(this._element), this.cycle(!0)),
                        clearInterval(this._interval),
                        (this._interval = null)
                }),
                (n.cycle = function (t) {
                    t || (this._isPaused = !1),
                        this._interval &&
                            (clearInterval(this._interval),
                            (this._interval = null)),
                        this._config &&
                            this._config.interval &&
                            !this._isPaused &&
                            (this._updateInterval(),
                            (this._interval = setInterval(
                                (document.visibilityState
                                    ? this.nextWhenVisible
                                    : this.next
                                ).bind(this),
                                this._config.interval
                            )))
                }),
                (n.to = function (t) {
                    var e = this
                    this._activeElement = Q(
                        ".active.carousel-item",
                        this._element
                    )
                    var n = this._getItemIndex(this._activeElement)
                    if (!(t > this._items.length - 1 || t < 0))
                        if (this._isSliding)
                            K.one(
                                this._element,
                                "slid.bs.carousel",
                                function () {
                                    return e.to(t)
                                }
                            )
                        else {
                            if (n === t) return this.pause(), void this.cycle()
                            var i = t > n ? "next" : "prev"
                            this._slide(i, this._items[t])
                        }
                }),
                (n.dispose = function () {
                    t.prototype.dispose.call(this),
                        K.off(this._element, ".bs.carousel"),
                        (this._items = null),
                        (this._config = null),
                        (this._interval = null),
                        (this._isPaused = null),
                        (this._isSliding = null),
                        (this._activeElement = null),
                        (this._indicatorsElement = null)
                }),
                (n._getConfig = function (t) {
                    return (t = s({}, G, t)), _("carousel", t, Z), t
                }),
                (n._handleSwipe = function () {
                    var t = Math.abs(this.touchDeltaX)
                    if (!(t <= 40)) {
                        var e = t / this.touchDeltaX
                        ;(this.touchDeltaX = 0),
                            e > 0 && (E ? this.next() : this.prev()),
                            e < 0 && (E ? this.prev() : this.next())
                    }
                }),
                (n._addEventListeners = function () {
                    var t = this
                    this._config.keyboard &&
                        K.on(
                            this._element,
                            "keydown.bs.carousel",
                            function (e) {
                                return t._keydown(e)
                            }
                        ),
                        "hover" === this._config.pause &&
                            (K.on(
                                this._element,
                                "mouseenter.bs.carousel",
                                function (e) {
                                    return t.pause(e)
                                }
                            ),
                            K.on(
                                this._element,
                                "mouseleave.bs.carousel",
                                function (e) {
                                    return t.cycle(e)
                                }
                            )),
                        this._config.touch &&
                            this._touchSupported &&
                            this._addTouchEventListeners()
                }),
                (n._addTouchEventListeners = function () {
                    var t = this,
                        e = function (e) {
                            !t._pointerEvent ||
                            ("pen" !== e.pointerType &&
                                "touch" !== e.pointerType)
                                ? t._pointerEvent ||
                                  (t.touchStartX = e.touches[0].clientX)
                                : (t.touchStartX = e.clientX)
                        },
                        n = function (e) {
                            !t._pointerEvent ||
                                ("pen" !== e.pointerType &&
                                    "touch" !== e.pointerType) ||
                                (t.touchDeltaX = e.clientX - t.touchStartX),
                                t._handleSwipe(),
                                "hover" === t._config.pause &&
                                    (t.pause(),
                                    t.touchTimeout &&
                                        clearTimeout(t.touchTimeout),
                                    (t.touchTimeout = setTimeout(function (e) {
                                        return t.cycle(e)
                                    }, 500 + t._config.interval)))
                        }
                    q(".carousel-item img", this._element).forEach(function (
                        t
                    ) {
                        K.on(t, "dragstart.bs.carousel", function (t) {
                            return t.preventDefault()
                        })
                    }),
                        this._pointerEvent
                            ? (K.on(
                                  this._element,
                                  "pointerdown.bs.carousel",
                                  function (t) {
                                      return e(t)
                                  }
                              ),
                              K.on(
                                  this._element,
                                  "pointerup.bs.carousel",
                                  function (t) {
                                      return n(t)
                                  }
                              ),
                              this._element.classList.add("pointer-event"))
                            : (K.on(
                                  this._element,
                                  "touchstart.bs.carousel",
                                  function (t) {
                                      return e(t)
                                  }
                              ),
                              K.on(
                                  this._element,
                                  "touchmove.bs.carousel",
                                  function (e) {
                                      return (function (e) {
                                          e.touches && e.touches.length > 1
                                              ? (t.touchDeltaX = 0)
                                              : (t.touchDeltaX =
                                                    e.touches[0].clientX -
                                                    t.touchStartX)
                                      })(e)
                                  }
                              ),
                              K.on(
                                  this._element,
                                  "touchend.bs.carousel",
                                  function (t) {
                                      return n(t)
                                  }
                              ))
                }),
                (n._keydown = function (t) {
                    ;/input|textarea/i.test(t.target.tagName) ||
                        ("ArrowLeft" === t.key
                            ? (t.preventDefault(),
                              E ? this.next() : this.prev())
                            : "ArrowRight" === t.key &&
                              (t.preventDefault(),
                              E ? this.prev() : this.next()))
                }),
                (n._getItemIndex = function (t) {
                    return (
                        (this._items =
                            t && t.parentNode
                                ? q(".carousel-item", t.parentNode)
                                : []),
                        this._items.indexOf(t)
                    )
                }),
                (n._getItemByDirection = function (t, e) {
                    var n = "next" === t,
                        i = "prev" === t,
                        o = this._getItemIndex(e),
                        s = this._items.length - 1
                    if (
                        ((i && 0 === o) || (n && o === s)) &&
                        !this._config.wrap
                    )
                        return e
                    var r = (o + ("prev" === t ? -1 : 1)) % this._items.length
                    return -1 === r
                        ? this._items[this._items.length - 1]
                        : this._items[r]
                }),
                (n._triggerSlideEvent = function (t, e) {
                    var n = this._getItemIndex(t),
                        i = this._getItemIndex(
                            Q(".active.carousel-item", this._element)
                        )
                    return K.trigger(this._element, "slide.bs.carousel", {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n,
                    })
                }),
                (n._setActiveIndicatorElement = function (t) {
                    if (this._indicatorsElement) {
                        var e = Q(".active", this._indicatorsElement)
                        e.classList.remove("active"),
                            e.removeAttribute("aria-current")
                        for (
                            var n = q(
                                    "[data-bs-target]",
                                    this._indicatorsElement
                                ),
                                i = 0;
                            i < n.length;
                            i++
                        )
                            if (
                                Number.parseInt(
                                    n[i].getAttribute("data-bs-slide-to"),
                                    10
                                ) === this._getItemIndex(t)
                            ) {
                                n[i].classList.add("active"),
                                    n[i].setAttribute("aria-current", "true")
                                break
                            }
                    }
                }),
                (n._updateInterval = function () {
                    var t =
                        this._activeElement ||
                        Q(".active.carousel-item", this._element)
                    if (t) {
                        var e = Number.parseInt(
                            t.getAttribute("data-bs-interval"),
                            10
                        )
                        e
                            ? ((this._config.defaultInterval =
                                  this._config.defaultInterval ||
                                  this._config.interval),
                              (this._config.interval = e))
                            : (this._config.interval =
                                  this._config.defaultInterval ||
                                  this._config.interval)
                    }
                }),
                (n._slide = function (t, e) {
                    var n = this,
                        i = Q(".active.carousel-item", this._element),
                        o = this._getItemIndex(i),
                        s = e || (i && this._getItemByDirection(t, i)),
                        r = this._getItemIndex(s),
                        a = Boolean(this._interval),
                        l =
                            "next" === t
                                ? "carousel-item-start"
                                : "carousel-item-end",
                        c =
                            "next" === t
                                ? "carousel-item-next"
                                : "carousel-item-prev",
                        u = "next" === t ? "left" : "right"
                    if (s && s.classList.contains("active"))
                        this._isSliding = !1
                    else if (
                        !this._triggerSlideEvent(s, u).defaultPrevented &&
                        i &&
                        s
                    ) {
                        if (
                            ((this._isSliding = !0),
                            a && this.pause(),
                            this._setActiveIndicatorElement(s),
                            (this._activeElement = s),
                            this._element.classList.contains("slide"))
                        ) {
                            s.classList.add(c),
                                y(s),
                                i.classList.add(l),
                                s.classList.add(l)
                            var h = f(i)
                            K.one(i, "transitionend", function () {
                                s.classList.remove(l, c),
                                    s.classList.add("active"),
                                    i.classList.remove("active", c, l),
                                    (n._isSliding = !1),
                                    setTimeout(function () {
                                        K.trigger(
                                            n._element,
                                            "slid.bs.carousel",
                                            {
                                                relatedTarget: s,
                                                direction: u,
                                                from: o,
                                                to: r,
                                            }
                                        )
                                    }, 0)
                            }),
                                m(i, h)
                        } else
                            i.classList.remove("active"),
                                s.classList.add("active"),
                                (this._isSliding = !1),
                                K.trigger(this._element, "slid.bs.carousel", {
                                    relatedTarget: s,
                                    direction: u,
                                    from: o,
                                    to: r,
                                })
                        a && this.cycle()
                    }
                }),
                (e.carouselInterface = function (t, n) {
                    var i = L(t, "bs.carousel"),
                        o = s({}, G, X.getDataAttributes(t))
                    "object" == typeof n && (o = s({}, o, n))
                    var r = "string" == typeof n ? n : o.slide
                    if ((i || (i = new e(t, o)), "number" == typeof n)) i.to(n)
                    else if ("string" == typeof r) {
                        if (void 0 === i[r])
                            throw new TypeError('No method named "' + r + '"')
                        i[r]()
                    } else o.interval && o.ride && (i.pause(), i.cycle())
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        e.carouselInterface(this, t)
                    })
                }),
                (e.dataApiClickHandler = function (t) {
                    var n = d(this)
                    if (n && n.classList.contains("carousel")) {
                        var i = s(
                                {},
                                X.getDataAttributes(n),
                                X.getDataAttributes(this)
                            ),
                            o = this.getAttribute("data-bs-slide-to")
                        o && (i.interval = !1),
                            e.carouselInterface(n, i),
                            o && L(n, "bs.carousel").to(o),
                            t.preventDefault()
                    }
                }),
                o(e, null, [
                    {
                        key: "Default",
                        get: function () {
                            return G
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.carousel"
                        },
                    },
                ]),
                e
            )
        })(W)
    K.on(
        document,
        "click.bs.carousel.data-api",
        "[data-bs-slide], [data-bs-slide-to]",
        J.dataApiClickHandler
    ),
        K.on(window, "load.bs.carousel.data-api", function () {
            for (
                var t = q('[data-bs-ride="carousel"]'), e = 0, n = t.length;
                e < n;
                e++
            )
                J.carouselInterface(t[e], L(t[e], "bs.carousel"))
        }),
        T("carousel", J)
    var tt = { toggle: !0, parent: "" },
        et = { toggle: "boolean", parent: "(string|element)" },
        nt = (function (t) {
            function e(e, n) {
                var i
                ;((i = t.call(this, e) || this)._isTransitioning = !1),
                    (i._config = i._getConfig(n)),
                    (i._triggerArray = q(
                        '[data-bs-toggle="collapse"][href="#' +
                            e.id +
                            '"],[data-bs-toggle="collapse"][data-bs-target="#' +
                            e.id +
                            '"]'
                    ))
                for (
                    var o = q('[data-bs-toggle="collapse"]'),
                        s = 0,
                        r = o.length;
                    s < r;
                    s++
                ) {
                    var a = o[s],
                        l = h(a),
                        c = q(l).filter(function (t) {
                            return t === e
                        })
                    null !== l &&
                        c.length &&
                        ((i._selector = l), i._triggerArray.push(a))
                }
                return (
                    (i._parent = i._config.parent ? i._getParent() : null),
                    i._config.parent ||
                        i._addAriaAndCollapsedClass(
                            i._element,
                            i._triggerArray
                        ),
                    i._config.toggle && i.toggle(),
                    i
                )
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.toggle = function () {
                    this._element.classList.contains("show")
                        ? this.hide()
                        : this.show()
                }),
                (n.show = function () {
                    var t = this
                    if (
                        !this._isTransitioning &&
                        !this._element.classList.contains("show")
                    ) {
                        var n, i
                        this._parent &&
                            0 ===
                                (n = q(
                                    ".show, .collapsing",
                                    this._parent
                                ).filter(function (e) {
                                    return "string" == typeof t._config.parent
                                        ? e.getAttribute("data-bs-parent") ===
                                              t._config.parent
                                        : e.classList.contains("collapse")
                                })).length &&
                            (n = null)
                        var o = Q(this._selector)
                        if (n) {
                            var s = n.find(function (t) {
                                return o !== t
                            })
                            if (
                                (i = s ? L(s, "bs.collapse") : null) &&
                                i._isTransitioning
                            )
                                return
                        }
                        if (
                            !K.trigger(this._element, "show.bs.collapse")
                                .defaultPrevented
                        ) {
                            n &&
                                n.forEach(function (t) {
                                    o !== t && e.collapseInterface(t, "hide"),
                                        i || k(t, "bs.collapse", null)
                                })
                            var r = this._getDimension()
                            this._element.classList.remove("collapse"),
                                this._element.classList.add("collapsing"),
                                (this._element.style[r] = 0),
                                this._triggerArray.length &&
                                    this._triggerArray.forEach(function (t) {
                                        t.classList.remove("collapsed"),
                                            t.setAttribute("aria-expanded", !0)
                                    }),
                                this.setTransitioning(!0)
                            var a =
                                    "scroll" +
                                    (r[0].toUpperCase() + r.slice(1)),
                                l = f(this._element)
                            K.one(this._element, "transitionend", function () {
                                t._element.classList.remove("collapsing"),
                                    t._element.classList.add(
                                        "collapse",
                                        "show"
                                    ),
                                    (t._element.style[r] = ""),
                                    t.setTransitioning(!1),
                                    K.trigger(t._element, "shown.bs.collapse")
                            }),
                                m(this._element, l),
                                (this._element.style[r] =
                                    this._element[a] + "px")
                        }
                    }
                }),
                (n.hide = function () {
                    var t = this
                    if (
                        !this._isTransitioning &&
                        this._element.classList.contains("show") &&
                        !K.trigger(this._element, "hide.bs.collapse")
                            .defaultPrevented
                    ) {
                        var e = this._getDimension()
                        ;(this._element.style[e] =
                            this._element.getBoundingClientRect()[e] + "px"),
                            y(this._element),
                            this._element.classList.add("collapsing"),
                            this._element.classList.remove("collapse", "show")
                        var n = this._triggerArray.length
                        if (n > 0)
                            for (var i = 0; i < n; i++) {
                                var o = this._triggerArray[i],
                                    s = d(o)
                                s &&
                                    !s.classList.contains("show") &&
                                    (o.classList.add("collapsed"),
                                    o.setAttribute("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), (this._element.style[e] = "")
                        var r = f(this._element)
                        K.one(this._element, "transitionend", function () {
                            t.setTransitioning(!1),
                                t._element.classList.remove("collapsing"),
                                t._element.classList.add("collapse"),
                                K.trigger(t._element, "hidden.bs.collapse")
                        }),
                            m(this._element, r)
                    }
                }),
                (n.setTransitioning = function (t) {
                    this._isTransitioning = t
                }),
                (n.dispose = function () {
                    t.prototype.dispose.call(this),
                        (this._config = null),
                        (this._parent = null),
                        (this._triggerArray = null),
                        (this._isTransitioning = null)
                }),
                (n._getConfig = function (t) {
                    return (
                        ((t = s({}, tt, t)).toggle = Boolean(t.toggle)),
                        _("collapse", t, et),
                        t
                    )
                }),
                (n._getDimension = function () {
                    return this._element.classList.contains("width")
                        ? "width"
                        : "height"
                }),
                (n._getParent = function () {
                    var t = this,
                        e = this._config.parent
                    return (
                        g(e)
                            ? (void 0 === e.jquery && void 0 === e[0]) ||
                              (e = e[0])
                            : (e = Q(e)),
                        q(
                            '[data-bs-toggle="collapse"][data-bs-parent="' +
                                e +
                                '"]',
                            e
                        ).forEach(function (e) {
                            var n = d(e)
                            t._addAriaAndCollapsedClass(n, [e])
                        }),
                        e
                    )
                }),
                (n._addAriaAndCollapsedClass = function (t, e) {
                    if (t && e.length) {
                        var n = t.classList.contains("show")
                        e.forEach(function (t) {
                            n
                                ? t.classList.remove("collapsed")
                                : t.classList.add("collapsed"),
                                t.setAttribute("aria-expanded", n)
                        })
                    }
                }),
                (e.collapseInterface = function (t, n) {
                    var i = L(t, "bs.collapse"),
                        o = s(
                            {},
                            tt,
                            X.getDataAttributes(t),
                            "object" == typeof n && n ? n : {}
                        )
                    if (
                        (!i &&
                            o.toggle &&
                            "string" == typeof n &&
                            /show|hide/.test(n) &&
                            (o.toggle = !1),
                        i || (i = new e(t, o)),
                        "string" == typeof n)
                    ) {
                        if (void 0 === i[n])
                            throw new TypeError('No method named "' + n + '"')
                        i[n]()
                    }
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        e.collapseInterface(this, t)
                    })
                }),
                o(e, null, [
                    {
                        key: "Default",
                        get: function () {
                            return tt
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.collapse"
                        },
                    },
                ]),
                e
            )
        })(W)
    K.on(
        document,
        "click.bs.collapse.data-api",
        '[data-bs-toggle="collapse"]',
        function (t) {
            ;("A" === t.target.tagName ||
                (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
                t.preventDefault()
            var e = X.getDataAttributes(this),
                n = h(this)
            q(n).forEach(function (t) {
                var n,
                    i = L(t, "bs.collapse")
                i
                    ? (null === i._parent &&
                          "string" == typeof e.parent &&
                          ((i._config.parent = e.parent),
                          (i._parent = i._getParent())),
                      (n = "toggle"))
                    : (n = e),
                    nt.collapseInterface(t, n)
            })
        }
    ),
        T("collapse", nt)
    var it = new RegExp("ArrowUp|ArrowDown|Escape"),
        ot = E ? "top-end" : "top-start",
        st = E ? "top-start" : "top-end",
        rt = E ? "bottom-end" : "bottom-start",
        at = E ? "bottom-start" : "bottom-end",
        lt = E ? "left-start" : "right-start",
        ct = E ? "right-start" : "left-start",
        ut = {
            offset: [0, 2],
            flip: !0,
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
        },
        ht = {
            offset: "(array|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
        },
        dt = (function (e) {
            function i(t, n) {
                var i
                return (
                    ((i = e.call(this, t) || this)._popper = null),
                    (i._config = i._getConfig(n)),
                    (i._menu = i._getMenuElement()),
                    (i._inNavbar = i._detectNavbar()),
                    i._addEventListeners(),
                    i
                )
            }
            r(i, e)
            var a = i.prototype
            return (
                (a.toggle = function () {
                    if (
                        !this._element.disabled &&
                        !this._element.classList.contains("disabled")
                    ) {
                        var t = this._element.classList.contains("show")
                        i.clearMenus(), t || this.show()
                    }
                }),
                (a.show = function () {
                    if (
                        !(
                            this._element.disabled ||
                            this._element.classList.contains("disabled") ||
                            this._menu.classList.contains("show")
                        )
                    ) {
                        var e = i.getParentFromElement(this._element),
                            o = { relatedTarget: this._element }
                        if (
                            !K.trigger(this._element, "show.bs.dropdown", o)
                                .defaultPrevented
                        ) {
                            if (this._inNavbar)
                                X.setDataAttribute(this._menu, "popper", "none")
                            else {
                                if (void 0 === n)
                                    throw new TypeError(
                                        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                                    )
                                var s = this._element
                                "parent" === this._config.reference
                                    ? (s = e)
                                    : g(this._config.reference)
                                    ? ((s = this._config.reference),
                                      void 0 !==
                                          this._config.reference.jquery &&
                                          (s = this._config.reference[0]))
                                    : "object" ==
                                          typeof this._config.reference &&
                                      (s = this._config.reference)
                                var r = this._getPopperConfig(),
                                    a = r.modifiers.find(function (t) {
                                        return (
                                            "applyStyles" === t.name &&
                                            !1 === t.enabled
                                        )
                                    })
                                ;(this._popper = t.createPopper(
                                    s,
                                    this._menu,
                                    r
                                )),
                                    a &&
                                        X.setDataAttribute(
                                            this._menu,
                                            "popper",
                                            "static"
                                        )
                            }
                            var l
                            "ontouchstart" in document.documentElement &&
                                !e.closest(".navbar-nav") &&
                                (l = []).concat
                                    .apply(l, document.body.children)
                                    .forEach(function (t) {
                                        return K.on(
                                            t,
                                            "mouseover",
                                            null,
                                            function () {}
                                        )
                                    }),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                this._menu.classList.toggle("show"),
                                this._element.classList.toggle("show"),
                                K.trigger(this._element, "shown.bs.dropdown", o)
                        }
                    }
                }),
                (a.hide = function () {
                    if (
                        !this._element.disabled &&
                        !this._element.classList.contains("disabled") &&
                        this._menu.classList.contains("show")
                    ) {
                        var t = { relatedTarget: this._element }
                        K.trigger(this._element, "hide.bs.dropdown", t)
                            .defaultPrevented ||
                            (this._popper && this._popper.destroy(),
                            this._menu.classList.toggle("show"),
                            this._element.classList.toggle("show"),
                            X.removeDataAttribute(this._menu, "popper"),
                            K.trigger(this._element, "hidden.bs.dropdown", t))
                    }
                }),
                (a.dispose = function () {
                    e.prototype.dispose.call(this),
                        K.off(this._element, ".bs.dropdown"),
                        (this._menu = null),
                        this._popper &&
                            (this._popper.destroy(), (this._popper = null))
                }),
                (a.update = function () {
                    ;(this._inNavbar = this._detectNavbar()),
                        this._popper && this._popper.update()
                }),
                (a._addEventListeners = function () {
                    var t = this
                    K.on(this._element, "click.bs.dropdown", function (e) {
                        e.preventDefault(), e.stopPropagation(), t.toggle()
                    })
                }),
                (a._getConfig = function (t) {
                    if (
                        ((t = s(
                            {},
                            this.constructor.Default,
                            X.getDataAttributes(this._element),
                            t
                        )),
                        _("dropdown", t, this.constructor.DefaultType),
                        "object" == typeof t.reference &&
                            !g(t.reference) &&
                            "function" !=
                                typeof t.reference.getBoundingClientRect)
                    )
                        throw new TypeError(
                            "dropdown".toUpperCase() +
                                ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
                        )
                    return t
                }),
                (a._getMenuElement = function () {
                    return (function (t, e) {
                        for (var n = t.nextElementSibling; n; ) {
                            if (n.matches(e)) return [n]
                            n = n.nextElementSibling
                        }
                        return []
                    })(this._element, ".dropdown-menu")[0]
                }),
                (a._getPlacement = function () {
                    var t = this._element.parentNode
                    if (t.classList.contains("dropend")) return lt
                    if (t.classList.contains("dropstart")) return ct
                    var e =
                        "end" ===
                        getComputedStyle(this._menu)
                            .getPropertyValue("--bs-position")
                            .trim()
                    return t.classList.contains("dropup")
                        ? e
                            ? st
                            : ot
                        : e
                        ? at
                        : rt
                }),
                (a._detectNavbar = function () {
                    return null !== this._element.closest(".navbar")
                }),
                (a._getOffset = function () {
                    var t = this,
                        e = this._config.offset
                    return "string" == typeof e
                        ? e.split(",").map(function (t) {
                              return Number.parseInt(t, 10)
                          })
                        : "function" == typeof e
                        ? function (n) {
                              return e(n, t._element)
                          }
                        : e
                }),
                (a._getPopperConfig = function () {
                    var t = {
                        placement: this._getPlacement(),
                        modifiers: [
                            {
                                name: "preventOverflow",
                                options: {
                                    altBoundary: this._config.flip,
                                    boundary: this._config.boundary,
                                },
                            },
                            {
                                name: "offset",
                                options: { offset: this._getOffset() },
                            },
                        ],
                    }
                    return (
                        "static" === this._config.display &&
                            (t.modifiers = [
                                { name: "applyStyles", enabled: !1 },
                            ]),
                        s(
                            {},
                            t,
                            "function" == typeof this._config.popperConfig
                                ? this._config.popperConfig(t)
                                : this._config.popperConfig
                        )
                    )
                }),
                (i.dropdownInterface = function (t, e) {
                    var n = L(t, "bs.dropdown")
                    if (
                        (n || (n = new i(t, "object" == typeof e ? e : null)),
                        "string" == typeof e)
                    ) {
                        if (void 0 === n[e])
                            throw new TypeError('No method named "' + e + '"')
                        n[e]()
                    }
                }),
                (i.jQueryInterface = function (t) {
                    return this.each(function () {
                        i.dropdownInterface(this, t)
                    })
                }),
                (i.clearMenus = function (t) {
                    if (
                        !t ||
                        (2 !== t.button &&
                            ("keyup" !== t.type || "Tab" === t.key))
                    )
                        for (
                            var e = q('[data-bs-toggle="dropdown"]'),
                                n = 0,
                                i = e.length;
                            n < i;
                            n++
                        ) {
                            var o = L(e[n], "bs.dropdown"),
                                s = { relatedTarget: e[n] }
                            if (
                                (t && "click" === t.type && (s.clickEvent = t),
                                o)
                            ) {
                                var r,
                                    a = o._menu
                                if (
                                    e[n].classList.contains("show") &&
                                    !(
                                        (t &&
                                            (("click" === t.type &&
                                                /input|textarea/i.test(
                                                    t.target.tagName
                                                )) ||
                                                ("keyup" === t.type &&
                                                    "Tab" === t.key)) &&
                                            a.contains(t.target)) ||
                                        K.trigger(e[n], "hide.bs.dropdown", s)
                                            .defaultPrevented
                                    )
                                )
                                    "ontouchstart" in
                                        document.documentElement &&
                                        (r = []).concat
                                            .apply(r, document.body.children)
                                            .forEach(function (t) {
                                                return K.off(
                                                    t,
                                                    "mouseover",
                                                    null,
                                                    function () {}
                                                )
                                            }),
                                        e[n].setAttribute(
                                            "aria-expanded",
                                            "false"
                                        ),
                                        o._popper && o._popper.destroy(),
                                        a.classList.remove("show"),
                                        e[n].classList.remove("show"),
                                        X.removeDataAttribute(a, "popper"),
                                        K.trigger(e[n], "hidden.bs.dropdown", s)
                            }
                        }
                }),
                (i.getParentFromElement = function (t) {
                    return d(t) || t.parentNode
                }),
                (i.dataApiKeydownHandler = function (t) {
                    if (
                        !(/input|textarea/i.test(t.target.tagName)
                            ? "Space" === t.key ||
                              ("Escape" !== t.key &&
                                  (("ArrowDown" !== t.key &&
                                      "ArrowUp" !== t.key) ||
                                      t.target.closest(".dropdown-menu")))
                            : !it.test(t.key)) &&
                        (t.preventDefault(),
                        t.stopPropagation(),
                        !this.disabled && !this.classList.contains("disabled"))
                    ) {
                        var e = i.getParentFromElement(this),
                            n = this.classList.contains("show")
                        if ("Escape" === t.key)
                            return (
                                (this.matches('[data-bs-toggle="dropdown"]')
                                    ? this
                                    : $(this, '[data-bs-toggle="dropdown"]')[0]
                                ).focus(),
                                void i.clearMenus()
                            )
                        if (n || ("ArrowUp" !== t.key && "ArrowDown" !== t.key))
                            if (n && "Space" !== t.key) {
                                var o = q(
                                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                                    e
                                ).filter(v)
                                if (o.length) {
                                    var s = o.indexOf(t.target)
                                    "ArrowUp" === t.key && s > 0 && s--,
                                        "ArrowDown" === t.key &&
                                            s < o.length - 1 &&
                                            s++,
                                        o[(s = -1 === s ? 0 : s)].focus()
                                }
                            } else i.clearMenus()
                        else
                            (this.matches('[data-bs-toggle="dropdown"]')
                                ? this
                                : $(this, '[data-bs-toggle="dropdown"]')[0]
                            ).click()
                    }
                }),
                o(i, null, [
                    {
                        key: "Default",
                        get: function () {
                            return ut
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return ht
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.dropdown"
                        },
                    },
                ]),
                i
            )
        })(W)
    K.on(
        document,
        "keydown.bs.dropdown.data-api",
        '[data-bs-toggle="dropdown"]',
        dt.dataApiKeydownHandler
    ),
        K.on(
            document,
            "keydown.bs.dropdown.data-api",
            ".dropdown-menu",
            dt.dataApiKeydownHandler
        ),
        K.on(document, "click.bs.dropdown.data-api", dt.clearMenus),
        K.on(document, "keyup.bs.dropdown.data-api", dt.clearMenus),
        K.on(
            document,
            "click.bs.dropdown.data-api",
            '[data-bs-toggle="dropdown"]',
            function (t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    dt.dropdownInterface(this, "toggle")
            }
        ),
        K.on(
            document,
            "click.bs.dropdown.data-api",
            ".dropdown form",
            function (t) {
                return t.stopPropagation()
            }
        ),
        T("dropdown", dt)
    var ft = { backdrop: !0, keyboard: !0, focus: !0 },
        pt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
        },
        gt = (function (t) {
            function e(e, n) {
                var i
                return (
                    ((i = t.call(this, e) || this)._config = i._getConfig(n)),
                    (i._dialog = Q(".modal-dialog", e)),
                    (i._backdrop = null),
                    (i._isShown = !1),
                    (i._isBodyOverflowing = !1),
                    (i._ignoreBackdropClick = !1),
                    (i._isTransitioning = !1),
                    (i._scrollbarWidth = 0),
                    i
                )
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t)
                }),
                (n.show = function (t) {
                    var e = this
                    if (!this._isShown && !this._isTransitioning) {
                        this._element.classList.contains("fade") &&
                            (this._isTransitioning = !0)
                        var n = K.trigger(this._element, "show.bs.modal", {
                            relatedTarget: t,
                        })
                        this._isShown ||
                            n.defaultPrevented ||
                            ((this._isShown = !0),
                            this._checkScrollbar(),
                            this._setScrollbar(),
                            this._adjustDialog(),
                            this._setEscapeEvent(),
                            this._setResizeEvent(),
                            K.on(
                                this._element,
                                "click.dismiss.bs.modal",
                                '[data-bs-dismiss="modal"]',
                                function (t) {
                                    return e.hide(t)
                                }
                            ),
                            K.on(
                                this._dialog,
                                "mousedown.dismiss.bs.modal",
                                function () {
                                    K.one(
                                        e._element,
                                        "mouseup.dismiss.bs.modal",
                                        function (t) {
                                            t.target === e._element &&
                                                (e._ignoreBackdropClick = !0)
                                        }
                                    )
                                }
                            ),
                            this._showBackdrop(function () {
                                return e._showElement(t)
                            }))
                    }
                }),
                (n.hide = function (t) {
                    var e = this
                    if (
                        (t && t.preventDefault(),
                        this._isShown &&
                            !this._isTransitioning &&
                            !K.trigger(this._element, "hide.bs.modal")
                                .defaultPrevented)
                    ) {
                        this._isShown = !1
                        var n = this._element.classList.contains("fade")
                        if (
                            (n && (this._isTransitioning = !0),
                            this._setEscapeEvent(),
                            this._setResizeEvent(),
                            K.off(document, "focusin.bs.modal"),
                            this._element.classList.remove("show"),
                            K.off(this._element, "click.dismiss.bs.modal"),
                            K.off(this._dialog, "mousedown.dismiss.bs.modal"),
                            n)
                        ) {
                            var i = f(this._element)
                            K.one(this._element, "transitionend", function (t) {
                                return e._hideModal(t)
                            }),
                                m(this._element, i)
                        } else this._hideModal()
                    }
                }),
                (n.dispose = function () {
                    ;[window, this._element, this._dialog].forEach(function (
                        t
                    ) {
                        return K.off(t, ".bs.modal")
                    }),
                        t.prototype.dispose.call(this),
                        K.off(document, "focusin.bs.modal"),
                        (this._config = null),
                        (this._dialog = null),
                        (this._backdrop = null),
                        (this._isShown = null),
                        (this._isBodyOverflowing = null),
                        (this._ignoreBackdropClick = null),
                        (this._isTransitioning = null),
                        (this._scrollbarWidth = null)
                }),
                (n.handleUpdate = function () {
                    this._adjustDialog()
                }),
                (n._getConfig = function (t) {
                    return (t = s({}, ft, t)), _("modal", t, pt), t
                }),
                (n._showElement = function (t) {
                    var e = this,
                        n = this._element.classList.contains("fade"),
                        i = Q(".modal-body", this._dialog)
                    ;(this._element.parentNode &&
                        this._element.parentNode.nodeType ===
                            Node.ELEMENT_NODE) ||
                        document.body.appendChild(this._element),
                        (this._element.style.display = "block"),
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        this._element.setAttribute("role", "dialog"),
                        (this._element.scrollTop = 0),
                        i && (i.scrollTop = 0),
                        n && y(this._element),
                        this._element.classList.add("show"),
                        this._config.focus && this._enforceFocus()
                    var o = function () {
                        e._config.focus && e._element.focus(),
                            (e._isTransitioning = !1),
                            K.trigger(e._element, "shown.bs.modal", {
                                relatedTarget: t,
                            })
                    }
                    if (n) {
                        var s = f(this._dialog)
                        K.one(this._dialog, "transitionend", o),
                            m(this._dialog, s)
                    } else o()
                }),
                (n._enforceFocus = function () {
                    var t = this
                    K.off(document, "focusin.bs.modal"),
                        K.on(document, "focusin.bs.modal", function (e) {
                            document === e.target ||
                                t._element === e.target ||
                                t._element.contains(e.target) ||
                                t._element.focus()
                        })
                }),
                (n._setEscapeEvent = function () {
                    var t = this
                    this._isShown
                        ? K.on(
                              this._element,
                              "keydown.dismiss.bs.modal",
                              function (e) {
                                  t._config.keyboard && "Escape" === e.key
                                      ? (e.preventDefault(), t.hide())
                                      : t._config.keyboard ||
                                        "Escape" !== e.key ||
                                        t._triggerBackdropTransition()
                              }
                          )
                        : K.off(this._element, "keydown.dismiss.bs.modal")
                }),
                (n._setResizeEvent = function () {
                    var t = this
                    this._isShown
                        ? K.on(window, "resize.bs.modal", function () {
                              return t._adjustDialog()
                          })
                        : K.off(window, "resize.bs.modal")
                }),
                (n._hideModal = function () {
                    var t = this
                    ;(this._element.style.display = "none"),
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        (this._isTransitioning = !1),
                        this._showBackdrop(function () {
                            document.body.classList.remove("modal-open"),
                                t._resetAdjustments(),
                                t._resetScrollbar(),
                                K.trigger(t._element, "hidden.bs.modal")
                        })
                }),
                (n._removeBackdrop = function () {
                    this._backdrop.parentNode.removeChild(this._backdrop),
                        (this._backdrop = null)
                }),
                (n._showBackdrop = function (t) {
                    var e = this,
                        n = this._element.classList.contains("fade")
                            ? "fade"
                            : ""
                    if (this._isShown && this._config.backdrop) {
                        if (
                            ((this._backdrop = document.createElement("div")),
                            (this._backdrop.className = "modal-backdrop"),
                            n && this._backdrop.classList.add(n),
                            document.body.appendChild(this._backdrop),
                            K.on(
                                this._element,
                                "click.dismiss.bs.modal",
                                function (t) {
                                    e._ignoreBackdropClick
                                        ? (e._ignoreBackdropClick = !1)
                                        : t.target === t.currentTarget &&
                                          ("static" === e._config.backdrop
                                              ? e._triggerBackdropTransition()
                                              : e.hide())
                                }
                            ),
                            n && y(this._backdrop),
                            this._backdrop.classList.add("show"),
                            !n)
                        )
                            return void t()
                        var i = f(this._backdrop)
                        K.one(this._backdrop, "transitionend", t),
                            m(this._backdrop, i)
                    } else if (!this._isShown && this._backdrop) {
                        this._backdrop.classList.remove("show")
                        var o = function () {
                            e._removeBackdrop(), t()
                        }
                        if (this._element.classList.contains("fade")) {
                            var s = f(this._backdrop)
                            K.one(this._backdrop, "transitionend", o),
                                m(this._backdrop, s)
                        } else o()
                    } else t()
                }),
                (n._triggerBackdropTransition = function () {
                    var t = this
                    if (
                        !K.trigger(this._element, "hidePrevented.bs.modal")
                            .defaultPrevented
                    ) {
                        var e =
                            this._element.scrollHeight >
                            document.documentElement.clientHeight
                        e || (this._element.style.overflowY = "hidden"),
                            this._element.classList.add("modal-static")
                        var n = f(this._dialog)
                        K.off(this._element, "transitionend"),
                            K.one(this._element, "transitionend", function () {
                                t._element.classList.remove("modal-static"),
                                    e ||
                                        (K.one(
                                            t._element,
                                            "transitionend",
                                            function () {
                                                t._element.style.overflowY = ""
                                            }
                                        ),
                                        m(t._element, n))
                            }),
                            m(this._element, n),
                            this._element.focus()
                    }
                }),
                (n._adjustDialog = function () {
                    var t =
                        this._element.scrollHeight >
                        document.documentElement.clientHeight
                    ;((!this._isBodyOverflowing && t && !E) ||
                        (this._isBodyOverflowing && !t && E)) &&
                        (this._element.style.paddingLeft =
                            this._scrollbarWidth + "px"),
                        ((this._isBodyOverflowing && !t && !E) ||
                            (!this._isBodyOverflowing && t && E)) &&
                            (this._element.style.paddingRight =
                                this._scrollbarWidth + "px")
                }),
                (n._resetAdjustments = function () {
                    ;(this._element.style.paddingLeft = ""),
                        (this._element.style.paddingRight = "")
                }),
                (n._checkScrollbar = function () {
                    var t = document.body.getBoundingClientRect()
                    ;(this._isBodyOverflowing =
                        Math.round(t.left + t.right) < window.innerWidth),
                        (this._scrollbarWidth = this._getScrollbarWidth())
                }),
                (n._setScrollbar = function () {
                    var t = this
                    this._isBodyOverflowing &&
                        (this._setElementAttributes(
                            ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                            "paddingRight",
                            function (e) {
                                return e + t._scrollbarWidth
                            }
                        ),
                        this._setElementAttributes(
                            ".sticky-top",
                            "marginRight",
                            function (e) {
                                return e - t._scrollbarWidth
                            }
                        ),
                        this._setElementAttributes(
                            "body",
                            "paddingRight",
                            function (e) {
                                return e + t._scrollbarWidth
                            }
                        )),
                        document.body.classList.add("modal-open")
                }),
                (n._setElementAttributes = function (t, e, n) {
                    q(t).forEach(function (t) {
                        var i = t.style[e],
                            o = window.getComputedStyle(t)[e]
                        X.setDataAttribute(t, e, i),
                            (t.style[e] = n(Number.parseFloat(o)) + "px")
                    })
                }),
                (n._resetScrollbar = function () {
                    this._resetElementAttributes(
                        ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                        "paddingRight"
                    ),
                        this._resetElementAttributes(
                            ".sticky-top",
                            "marginRight"
                        ),
                        this._resetElementAttributes("body", "paddingRight")
                }),
                (n._resetElementAttributes = function (t, e) {
                    q(t).forEach(function (t) {
                        var n = X.getDataAttribute(t, e)
                        void 0 === n && t === document.body
                            ? (t.style[e] = "")
                            : (X.removeDataAttribute(t, e), (t.style[e] = n))
                    })
                }),
                (n._getScrollbarWidth = function () {
                    var t = document.createElement("div")
                    ;(t.className = "modal-scrollbar-measure"),
                        document.body.appendChild(t)
                    var e = t.getBoundingClientRect().width - t.clientWidth
                    return document.body.removeChild(t), e
                }),
                (e.jQueryInterface = function (t, n) {
                    return this.each(function () {
                        var i = L(this, "bs.modal"),
                            o = s(
                                {},
                                ft,
                                X.getDataAttributes(this),
                                "object" == typeof t && t ? t : {}
                            )
                        if ((i || (i = new e(this, o)), "string" == typeof t)) {
                            if (void 0 === i[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                )
                            i[t](n)
                        }
                    })
                }),
                o(e, null, [
                    {
                        key: "Default",
                        get: function () {
                            return ft
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.modal"
                        },
                    },
                ]),
                e
            )
        })(W)
    K.on(
        document,
        "click.bs.modal.data-api",
        '[data-bs-toggle="modal"]',
        function (t) {
            var e = this,
                n = d(this)
            ;("A" !== this.tagName && "AREA" !== this.tagName) ||
                t.preventDefault(),
                K.one(n, "show.bs.modal", function (t) {
                    t.defaultPrevented ||
                        K.one(n, "hidden.bs.modal", function () {
                            v(e) && e.focus()
                        })
                })
            var i = L(n, "bs.modal")
            if (!i) {
                var o = s({}, X.getDataAttributes(n), X.getDataAttributes(this))
                i = new gt(n, o)
            }
            i.toggle(this)
        }
    ),
        T("modal", gt)
    var mt = new Set([
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
        ]),
        _t = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        vt =
            /^data:(?:image\/(?:bmp|gif|jpeg|webp|webp|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i
    function bt(t, e, n) {
        var i
        if (!t.length) return t
        if (n && "function" == typeof n) return n(t)
        for (
            var o = new window.DOMParser().parseFromString(t, "text/html"),
                s = Object.keys(e),
                r = (i = []).concat.apply(i, o.body.querySelectorAll("*")),
                a = function (t, n) {
                    var i,
                        o = r[t],
                        a = o.nodeName.toLowerCase()
                    if (!s.includes(a))
                        return o.parentNode.removeChild(o), "continue"
                    var l = (i = []).concat.apply(i, o.attributes),
                        c = [].concat(e["*"] || [], e[a] || [])
                    l.forEach(function (t) {
                        ;(function (t, e) {
                            var n = t.nodeName.toLowerCase()
                            if (e.includes(n))
                                return (
                                    !mt.has(n) ||
                                    Boolean(
                                        _t.test(t.nodeValue) ||
                                            vt.test(t.nodeValue)
                                    )
                                )
                            for (
                                var i = e.filter(function (t) {
                                        return t instanceof RegExp
                                    }),
                                    o = 0,
                                    s = i.length;
                                o < s;
                                o++
                            )
                                if (i[o].test(n)) return !0
                            return !1
                        })(t, c) || o.removeAttribute(t.nodeName)
                    })
                },
                l = 0,
                c = r.length;
            l < c;
            l++
        )
            a(l)
        return o.body.innerHTML
    }
    var yt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        wt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Et = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)",
        },
        Tt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: E ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: E ? "right" : "left",
        },
        At = {
            animation: !0,
            template:
                '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: [],
            },
            popperConfig: null,
        },
        kt = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip",
        },
        Lt = (function (e) {
            function i(t, i) {
                var o
                if (void 0 === n)
                    throw new TypeError(
                        "Bootstrap's tooltips require Popper (https://popper.js.org)"
                    )
                return (
                    ((o = e.call(this, t) || this)._isEnabled = !0),
                    (o._timeout = 0),
                    (o._hoverState = ""),
                    (o._activeTrigger = {}),
                    (o._popper = null),
                    (o.config = o._getConfig(i)),
                    (o.tip = null),
                    o._setListeners(),
                    o
                )
            }
            r(i, e)
            var a = i.prototype
            return (
                (a.enable = function () {
                    this._isEnabled = !0
                }),
                (a.disable = function () {
                    this._isEnabled = !1
                }),
                (a.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
                }),
                (a.toggle = function (t) {
                    if (this._isEnabled)
                        if (t) {
                            var e = this._initializeOnDelegatedTarget(t)
                            ;(e._activeTrigger.click = !e._activeTrigger.click),
                                e._isWithActiveTrigger()
                                    ? e._enter(null, e)
                                    : e._leave(null, e)
                        } else {
                            if (this.getTipElement().classList.contains("show"))
                                return void this._leave(null, this)
                            this._enter(null, this)
                        }
                }),
                (a.dispose = function () {
                    clearTimeout(this._timeout),
                        K.off(this._element, this.constructor.EVENT_KEY),
                        K.off(
                            this._element.closest(".modal"),
                            "hide.bs.modal",
                            this._hideModalHandler
                        ),
                        this.tip &&
                            this.tip.parentNode &&
                            this.tip.parentNode.removeChild(this.tip),
                        (this._isEnabled = null),
                        (this._timeout = null),
                        (this._hoverState = null),
                        (this._activeTrigger = null),
                        this._popper && this._popper.destroy(),
                        (this._popper = null),
                        (this.config = null),
                        (this.tip = null),
                        e.prototype.dispose.call(this)
                }),
                (a.show = function () {
                    var e = this
                    if ("none" === this._element.style.display)
                        throw new Error("Please use show on visible elements")
                    if (this.isWithContent() && this._isEnabled) {
                        var n = K.trigger(
                                this._element,
                                this.constructor.Event.SHOW
                            ),
                            i = (function t(e) {
                                if (!document.documentElement.attachShadow)
                                    return null
                                if ("function" == typeof e.getRootNode) {
                                    var n = e.getRootNode()
                                    return n instanceof ShadowRoot ? n : null
                                }
                                return e instanceof ShadowRoot
                                    ? e
                                    : e.parentNode
                                    ? t(e.parentNode)
                                    : null
                            })(this._element),
                            o =
                                null === i
                                    ? this._element.ownerDocument.documentElement.contains(
                                          this._element
                                      )
                                    : i.contains(this._element)
                        if (!n.defaultPrevented && o) {
                            var s = this.getTipElement(),
                                r = c(this.constructor.NAME)
                            s.setAttribute("id", r),
                                this._element.setAttribute(
                                    "aria-describedby",
                                    r
                                ),
                                this.setContent(),
                                this.config.animation && s.classList.add("fade")
                            var a =
                                    "function" == typeof this.config.placement
                                        ? this.config.placement.call(
                                              this,
                                              s,
                                              this._element
                                          )
                                        : this.config.placement,
                                l = this._getAttachment(a)
                            this._addAttachmentClass(l)
                            var u = this._getContainer()
                            k(s, this.constructor.DATA_KEY, this),
                                this._element.ownerDocument.documentElement.contains(
                                    this.tip
                                ) || u.appendChild(s),
                                K.trigger(
                                    this._element,
                                    this.constructor.Event.INSERTED
                                ),
                                (this._popper = t.createPopper(
                                    this._element,
                                    s,
                                    this._getPopperConfig(l)
                                )),
                                s.classList.add("show")
                            var h,
                                d,
                                p =
                                    "function" == typeof this.config.customClass
                                        ? this.config.customClass()
                                        : this.config.customClass
                            p && (h = s.classList).add.apply(h, p.split(" ")),
                                "ontouchstart" in document.documentElement &&
                                    (d = []).concat
                                        .apply(d, document.body.children)
                                        .forEach(function (t) {
                                            K.on(t, "mouseover", function () {})
                                        })
                            var g = function () {
                                var t = e._hoverState
                                ;(e._hoverState = null),
                                    K.trigger(
                                        e._element,
                                        e.constructor.Event.SHOWN
                                    ),
                                    "out" === t && e._leave(null, e)
                            }
                            if (this.tip.classList.contains("fade")) {
                                var _ = f(this.tip)
                                K.one(this.tip, "transitionend", g),
                                    m(this.tip, _)
                            } else g()
                        }
                    }
                }),
                (a.hide = function () {
                    var t = this
                    if (this._popper) {
                        var e = this.getTipElement(),
                            n = function () {
                                "show" !== t._hoverState &&
                                    e.parentNode &&
                                    e.parentNode.removeChild(e),
                                    t._cleanTipClass(),
                                    t._element.removeAttribute(
                                        "aria-describedby"
                                    ),
                                    K.trigger(
                                        t._element,
                                        t.constructor.Event.HIDDEN
                                    ),
                                    t._popper &&
                                        (t._popper.destroy(),
                                        (t._popper = null))
                            }
                        if (
                            !K.trigger(
                                this._element,
                                this.constructor.Event.HIDE
                            ).defaultPrevented
                        ) {
                            var i
                            if (
                                (e.classList.remove("show"),
                                "ontouchstart" in document.documentElement &&
                                    (i = []).concat
                                        .apply(i, document.body.children)
                                        .forEach(function (t) {
                                            return K.off(t, "mouseover", b)
                                        }),
                                (this._activeTrigger.click = !1),
                                (this._activeTrigger.focus = !1),
                                (this._activeTrigger.hover = !1),
                                this.tip.classList.contains("fade"))
                            ) {
                                var o = f(e)
                                K.one(e, "transitionend", n), m(e, o)
                            } else n()
                            this._hoverState = ""
                        }
                    }
                }),
                (a.update = function () {
                    null !== this._popper && this._popper.update()
                }),
                (a.isWithContent = function () {
                    return Boolean(this.getTitle())
                }),
                (a.getTipElement = function () {
                    if (this.tip) return this.tip
                    var t = document.createElement("div")
                    return (
                        (t.innerHTML = this.config.template),
                        (this.tip = t.children[0]),
                        this.tip
                    )
                }),
                (a.setContent = function () {
                    var t = this.getTipElement()
                    this.setElementContent(
                        Q(".tooltip-inner", t),
                        this.getTitle()
                    ),
                        t.classList.remove("fade", "show")
                }),
                (a.setElementContent = function (t, e) {
                    if (null !== t)
                        return "object" == typeof e && g(e)
                            ? (e.jquery && (e = e[0]),
                              void (this.config.html
                                  ? e.parentNode !== t &&
                                    ((t.innerHTML = ""), t.appendChild(e))
                                  : (t.textContent = e.textContent)))
                            : void (this.config.html
                                  ? (this.config.sanitize &&
                                        (e = bt(
                                            e,
                                            this.config.allowList,
                                            this.config.sanitizeFn
                                        )),
                                    (t.innerHTML = e))
                                  : (t.textContent = e))
                }),
                (a.getTitle = function () {
                    var t = this._element.getAttribute("data-bs-original-title")
                    return (
                        t ||
                            (t =
                                "function" == typeof this.config.title
                                    ? this.config.title.call(this._element)
                                    : this.config.title),
                        t
                    )
                }),
                (a.updateAttachment = function (t) {
                    return "right" === t ? "end" : "left" === t ? "start" : t
                }),
                (a._initializeOnDelegatedTarget = function (t, e) {
                    var n = this.constructor.DATA_KEY
                    return (
                        (e = e || L(t.delegateTarget, n)) ||
                            ((e = new this.constructor(
                                t.delegateTarget,
                                this._getDelegateConfig()
                            )),
                            k(t.delegateTarget, n, e)),
                        e
                    )
                }),
                (a._getOffset = function () {
                    var t = this,
                        e = this.config.offset
                    return "string" == typeof e
                        ? e.split(",").map(function (t) {
                              return Number.parseInt(t, 10)
                          })
                        : "function" == typeof e
                        ? function (n) {
                              return e(n, t._element)
                          }
                        : e
                }),
                (a._getPopperConfig = function (t) {
                    var e = this,
                        n = {
                            placement: t,
                            modifiers: [
                                {
                                    name: "flip",
                                    options: {
                                        altBoundary: !0,
                                        fallbackPlacements:
                                            this.config.fallbackPlacements,
                                    },
                                },
                                {
                                    name: "offset",
                                    options: { offset: this._getOffset() },
                                },
                                {
                                    name: "preventOverflow",
                                    options: { boundary: this.config.boundary },
                                },
                                {
                                    name: "arrow",
                                    options: {
                                        element:
                                            "." +
                                            this.constructor.NAME +
                                            "-arrow",
                                    },
                                },
                                {
                                    name: "onChange",
                                    enabled: !0,
                                    phase: "afterWrite",
                                    fn: function (t) {
                                        return e._handlePopperPlacementChange(t)
                                    },
                                },
                            ],
                            onFirstUpdate: function (t) {
                                t.options.placement !== t.placement &&
                                    e._handlePopperPlacementChange(t)
                            },
                        }
                    return s(
                        {},
                        n,
                        "function" == typeof this.config.popperConfig
                            ? this.config.popperConfig(n)
                            : this.config.popperConfig
                    )
                }),
                (a._addAttachmentClass = function (t) {
                    this.getTipElement().classList.add(
                        "bs-tooltip-" + this.updateAttachment(t)
                    )
                }),
                (a._getContainer = function () {
                    return !1 === this.config.container
                        ? document.body
                        : g(this.config.container)
                        ? this.config.container
                        : Q(this.config.container)
                }),
                (a._getAttachment = function (t) {
                    return Tt[t.toUpperCase()]
                }),
                (a._setListeners = function () {
                    var t = this
                    this.config.trigger.split(" ").forEach(function (e) {
                        if ("click" === e)
                            K.on(
                                t._element,
                                t.constructor.Event.CLICK,
                                t.config.selector,
                                function (e) {
                                    return t.toggle(e)
                                }
                            )
                        else if ("manual" !== e) {
                            var n =
                                    "hover" === e
                                        ? t.constructor.Event.MOUSEENTER
                                        : t.constructor.Event.FOCUSIN,
                                i =
                                    "hover" === e
                                        ? t.constructor.Event.MOUSELEAVE
                                        : t.constructor.Event.FOCUSOUT
                            K.on(
                                t._element,
                                n,
                                t.config.selector,
                                function (e) {
                                    return t._enter(e)
                                }
                            ),
                                K.on(
                                    t._element,
                                    i,
                                    t.config.selector,
                                    function (e) {
                                        return t._leave(e)
                                    }
                                )
                        }
                    }),
                        (this._hideModalHandler = function () {
                            t._element && t.hide()
                        }),
                        K.on(
                            this._element.closest(".modal"),
                            "hide.bs.modal",
                            this._hideModalHandler
                        ),
                        this.config.selector
                            ? (this.config = s({}, this.config, {
                                  trigger: "manual",
                                  selector: "",
                              }))
                            : this._fixTitle()
                }),
                (a._fixTitle = function () {
                    var t = this._element.getAttribute("title"),
                        e = typeof this._element.getAttribute(
                            "data-bs-original-title"
                        )
                    ;(t || "string" !== e) &&
                        (this._element.setAttribute(
                            "data-bs-original-title",
                            t || ""
                        ),
                        !t ||
                            this._element.getAttribute("aria-label") ||
                            this._element.textContent ||
                            this._element.setAttribute("aria-label", t),
                        this._element.setAttribute("title", ""))
                }),
                (a._enter = function (t, e) {
                    ;(e = this._initializeOnDelegatedTarget(t, e)),
                        t &&
                            (e._activeTrigger[
                                "focusin" === t.type ? "focus" : "hover"
                            ] = !0),
                        e.getTipElement().classList.contains("show") ||
                        "show" === e._hoverState
                            ? (e._hoverState = "show")
                            : (clearTimeout(e._timeout),
                              (e._hoverState = "show"),
                              e.config.delay && e.config.delay.show
                                  ? (e._timeout = setTimeout(function () {
                                        "show" === e._hoverState && e.show()
                                    }, e.config.delay.show))
                                  : e.show())
                }),
                (a._leave = function (t, e) {
                    ;(e = this._initializeOnDelegatedTarget(t, e)),
                        t &&
                            (e._activeTrigger[
                                "focusout" === t.type ? "focus" : "hover"
                            ] = !1),
                        e._isWithActiveTrigger() ||
                            (clearTimeout(e._timeout),
                            (e._hoverState = "out"),
                            e.config.delay && e.config.delay.hide
                                ? (e._timeout = setTimeout(function () {
                                      "out" === e._hoverState && e.hide()
                                  }, e.config.delay.hide))
                                : e.hide())
                }),
                (a._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger)
                        if (this._activeTrigger[t]) return !0
                    return !1
                }),
                (a._getConfig = function (t) {
                    var e = X.getDataAttributes(this._element)
                    return (
                        Object.keys(e).forEach(function (t) {
                            wt.has(t) && delete e[t]
                        }),
                        t &&
                            "object" == typeof t.container &&
                            t.container.jquery &&
                            (t.container = t.container[0]),
                        "number" ==
                            typeof (t = s(
                                {},
                                this.constructor.Default,
                                e,
                                "object" == typeof t && t ? t : {}
                            )).delay &&
                            (t.delay = { show: t.delay, hide: t.delay }),
                        "number" == typeof t.title &&
                            (t.title = t.title.toString()),
                        "number" == typeof t.content &&
                            (t.content = t.content.toString()),
                        _("tooltip", t, this.constructor.DefaultType),
                        t.sanitize &&
                            (t.template = bt(
                                t.template,
                                t.allowList,
                                t.sanitizeFn
                            )),
                        t
                    )
                }),
                (a._getDelegateConfig = function () {
                    var t = {}
                    if (this.config)
                        for (var e in this.config)
                            this.constructor.Default[e] !== this.config[e] &&
                                (t[e] = this.config[e])
                    return t
                }),
                (a._cleanTipClass = function () {
                    var t = this.getTipElement(),
                        e = t.getAttribute("class").match(yt)
                    null !== e &&
                        e.length > 0 &&
                        e
                            .map(function (t) {
                                return t.trim()
                            })
                            .forEach(function (e) {
                                return t.classList.remove(e)
                            })
                }),
                (a._handlePopperPlacementChange = function (t) {
                    var e = t.state
                    e &&
                        ((this.tip = e.elements.popper),
                        this._cleanTipClass(),
                        this._addAttachmentClass(
                            this._getAttachment(e.placement)
                        ))
                }),
                (i.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = L(this, "bs.tooltip"),
                            n = "object" == typeof t && t
                        if (
                            (e || !/dispose|hide/.test(t)) &&
                            (e || (e = new i(this, n)), "string" == typeof t)
                        ) {
                            if (void 0 === e[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                )
                            e[t]()
                        }
                    })
                }),
                o(i, null, [
                    {
                        key: "Default",
                        get: function () {
                            return At
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return "tooltip"
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.tooltip"
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return kt
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.tooltip"
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return Et
                        },
                    },
                ]),
                i
            )
        })(W)
    T("tooltip", Lt)
    var Ct = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Dt = s({}, Lt.Default, {
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template:
                '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }),
        St = s({}, Lt.DefaultType, { content: "(string|element|function)" }),
        Nt = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover",
        },
        Ot = (function (t) {
            function e() {
                return t.apply(this, arguments) || this
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.isWithContent = function () {
                    return this.getTitle() || this._getContent()
                }),
                (n.setContent = function () {
                    var t = this.getTipElement()
                    this.setElementContent(
                        Q(".popover-header", t),
                        this.getTitle()
                    )
                    var e = this._getContent()
                    "function" == typeof e && (e = e.call(this._element)),
                        this.setElementContent(Q(".popover-body", t), e),
                        t.classList.remove("fade", "show")
                }),
                (n._addAttachmentClass = function (t) {
                    this.getTipElement().classList.add(
                        "bs-popover-" + this.updateAttachment(t)
                    )
                }),
                (n._getContent = function () {
                    return (
                        this._element.getAttribute("data-bs-content") ||
                        this.config.content
                    )
                }),
                (n._cleanTipClass = function () {
                    var t = this.getTipElement(),
                        e = t.getAttribute("class").match(Ct)
                    null !== e &&
                        e.length > 0 &&
                        e
                            .map(function (t) {
                                return t.trim()
                            })
                            .forEach(function (e) {
                                return t.classList.remove(e)
                            })
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        var n = L(this, "bs.popover"),
                            i = "object" == typeof t ? t : null
                        if (
                            (n || !/dispose|hide/.test(t)) &&
                            (n ||
                                ((n = new e(this, i)),
                                k(this, "bs.popover", n)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === n[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                )
                            n[t]()
                        }
                    })
                }),
                o(e, null, [
                    {
                        key: "Default",
                        get: function () {
                            return Dt
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return "popover"
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.popover"
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return Nt
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.popover"
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return St
                        },
                    },
                ]),
                e
            )
        })(Lt)
    T("popover", Ot)
    var It = { offset: 10, method: "auto", target: "" },
        jt = { offset: "number", method: "string", target: "(string|element)" },
        Pt = (function (t) {
            function e(e, n) {
                var i
                return (
                    ((i = t.call(this, e) || this)._scrollElement =
                        "BODY" === e.tagName ? window : e),
                    (i._config = i._getConfig(n)),
                    (i._selector =
                        i._config.target +
                        " .nav-link, " +
                        i._config.target +
                        " .list-group-item, " +
                        i._config.target +
                        " .dropdown-item"),
                    (i._offsets = []),
                    (i._targets = []),
                    (i._activeTarget = null),
                    (i._scrollHeight = 0),
                    K.on(i._scrollElement, "scroll.bs.scrollspy", function () {
                        return i._process()
                    }),
                    i.refresh(),
                    i._process(),
                    i
                )
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.refresh = function () {
                    var t = this,
                        e =
                            this._scrollElement === this._scrollElement.window
                                ? "offset"
                                : "position",
                        n =
                            "auto" === this._config.method
                                ? e
                                : this._config.method,
                        i = "position" === n ? this._getScrollTop() : 0
                    ;(this._offsets = []),
                        (this._targets = []),
                        (this._scrollHeight = this._getScrollHeight()),
                        q(this._selector)
                            .map(function (t) {
                                var e = h(t),
                                    o = e ? Q(e) : null
                                if (o) {
                                    var s = o.getBoundingClientRect()
                                    if (s.width || s.height)
                                        return [X[n](o).top + i, e]
                                }
                                return null
                            })
                            .filter(function (t) {
                                return t
                            })
                            .sort(function (t, e) {
                                return t[0] - e[0]
                            })
                            .forEach(function (e) {
                                t._offsets.push(e[0]), t._targets.push(e[1])
                            })
                }),
                (n.dispose = function () {
                    t.prototype.dispose.call(this),
                        K.off(this._scrollElement, ".bs.scrollspy"),
                        (this._scrollElement = null),
                        (this._config = null),
                        (this._selector = null),
                        (this._offsets = null),
                        (this._targets = null),
                        (this._activeTarget = null),
                        (this._scrollHeight = null)
                }),
                (n._getConfig = function (t) {
                    if (
                        "string" !=
                            typeof (t = s(
                                {},
                                It,
                                "object" == typeof t && t ? t : {}
                            )).target &&
                        g(t.target)
                    ) {
                        var e = t.target.id
                        e || ((e = c("scrollspy")), (t.target.id = e)),
                            (t.target = "#" + e)
                    }
                    return _("scrollspy", t, jt), t
                }),
                (n._getScrollTop = function () {
                    return this._scrollElement === window
                        ? this._scrollElement.pageYOffset
                        : this._scrollElement.scrollTop
                }),
                (n._getScrollHeight = function () {
                    return (
                        this._scrollElement.scrollHeight ||
                        Math.max(
                            document.body.scrollHeight,
                            document.documentElement.scrollHeight
                        )
                    )
                }),
                (n._getOffsetHeight = function () {
                    return this._scrollElement === window
                        ? window.innerHeight
                        : this._scrollElement.getBoundingClientRect().height
                }),
                (n._process = function () {
                    var t = this._getScrollTop() + this._config.offset,
                        e = this._getScrollHeight(),
                        n = this._config.offset + e - this._getOffsetHeight()
                    if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
                        var i = this._targets[this._targets.length - 1]
                        this._activeTarget !== i && this._activate(i)
                    } else {
                        if (
                            this._activeTarget &&
                            t < this._offsets[0] &&
                            this._offsets[0] > 0
                        )
                            return (
                                (this._activeTarget = null), void this._clear()
                            )
                        for (var o = this._offsets.length; o--; )
                            this._activeTarget !== this._targets[o] &&
                                t >= this._offsets[o] &&
                                (void 0 === this._offsets[o + 1] ||
                                    t < this._offsets[o + 1]) &&
                                this._activate(this._targets[o])
                    }
                }),
                (n._activate = function (t) {
                    ;(this._activeTarget = t), this._clear()
                    var e = this._selector.split(",").map(function (e) {
                            return (
                                e +
                                '[data-bs-target="' +
                                t +
                                '"],' +
                                e +
                                '[href="' +
                                t +
                                '"]'
                            )
                        }),
                        n = Q(e.join(","))
                    n.classList.contains("dropdown-item")
                        ? (Q(
                              ".dropdown-toggle",
                              n.closest(".dropdown")
                          ).classList.add("active"),
                          n.classList.add("active"))
                        : (n.classList.add("active"),
                          (function (t, e) {
                              for (
                                  var n = [], i = t.parentNode;
                                  i &&
                                  i.nodeType === Node.ELEMENT_NODE &&
                                  3 !== i.nodeType;

                              )
                                  i.matches(e) && n.push(i), (i = i.parentNode)
                              return n
                          })(n, ".nav, .list-group").forEach(function (t) {
                              $(t, ".nav-link, .list-group-item").forEach(
                                  function (t) {
                                      return t.classList.add("active")
                                  }
                              ),
                                  $(t, ".nav-item").forEach(function (t) {
                                      V(t, ".nav-link").forEach(function (t) {
                                          return t.classList.add("active")
                                      })
                                  })
                          })),
                        K.trigger(
                            this._scrollElement,
                            "activate.bs.scrollspy",
                            { relatedTarget: t }
                        )
                }),
                (n._clear = function () {
                    q(this._selector)
                        .filter(function (t) {
                            return t.classList.contains("active")
                        })
                        .forEach(function (t) {
                            return t.classList.remove("active")
                        })
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        var n = L(this, "bs.scrollspy")
                        if (
                            (n || (n = new e(this, "object" == typeof t && t)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === n[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                )
                            n[t]()
                        }
                    })
                }),
                o(e, null, [
                    {
                        key: "Default",
                        get: function () {
                            return It
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.scrollspy"
                        },
                    },
                ]),
                e
            )
        })(W)
    K.on(window, "load.bs.scrollspy.data-api", function () {
        q('[data-bs-spy="scroll"]').forEach(function (t) {
            return new Pt(t, X.getDataAttributes(t))
        })
    }),
        T("scrollspy", Pt)
    var xt = (function (t) {
        function e() {
            return t.apply(this, arguments) || this
        }
        r(e, t)
        var n = e.prototype
        return (
            (n.show = function () {
                var t = this
                if (
                    !(
                        (this._element.parentNode &&
                            this._element.parentNode.nodeType ===
                                Node.ELEMENT_NODE &&
                            this._element.classList.contains("active")) ||
                        this._element.classList.contains("disabled")
                    )
                ) {
                    var e,
                        n = d(this._element),
                        i = this._element.closest(".nav, .list-group")
                    if (i) {
                        var o =
                            "UL" === i.nodeName || "OL" === i.nodeName
                                ? ":scope > li > .active"
                                : ".active"
                        e = (e = q(o, i))[e.length - 1]
                    }
                    var s = e
                        ? K.trigger(e, "hide.bs.tab", {
                              relatedTarget: this._element,
                          })
                        : null
                    if (
                        !(
                            K.trigger(this._element, "show.bs.tab", {
                                relatedTarget: e,
                            }).defaultPrevented ||
                            (null !== s && s.defaultPrevented)
                        )
                    ) {
                        this._activate(this._element, i)
                        var r = function () {
                            K.trigger(e, "hidden.bs.tab", {
                                relatedTarget: t._element,
                            }),
                                K.trigger(t._element, "shown.bs.tab", {
                                    relatedTarget: e,
                                })
                        }
                        n ? this._activate(n, n.parentNode, r) : r()
                    }
                }
            }),
            (n._activate = function (t, e, n) {
                var i = this,
                    o = (
                        !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                            ? V(e, ".active")
                            : q(":scope > li > .active", e)
                    )[0],
                    s = n && o && o.classList.contains("fade"),
                    r = function () {
                        return i._transitionComplete(t, o, n)
                    }
                if (o && s) {
                    var a = f(o)
                    o.classList.remove("show"),
                        K.one(o, "transitionend", r),
                        m(o, a)
                } else r()
            }),
            (n._transitionComplete = function (t, e, n) {
                if (e) {
                    e.classList.remove("active")
                    var i = Q(":scope > .dropdown-menu .active", e.parentNode)
                    i && i.classList.remove("active"),
                        "tab" === e.getAttribute("role") &&
                            e.setAttribute("aria-selected", !1)
                }
                t.classList.add("active"),
                    "tab" === t.getAttribute("role") &&
                        t.setAttribute("aria-selected", !0),
                    y(t),
                    t.classList.contains("fade") && t.classList.add("show"),
                    t.parentNode &&
                        t.parentNode.classList.contains("dropdown-menu") &&
                        (t.closest(".dropdown") &&
                            q(".dropdown-toggle").forEach(function (t) {
                                return t.classList.add("active")
                            }),
                        t.setAttribute("aria-expanded", !0)),
                    n && n()
            }),
            (e.jQueryInterface = function (t) {
                return this.each(function () {
                    var n = L(this, "bs.tab") || new e(this)
                    if ("string" == typeof t) {
                        if (void 0 === n[t])
                            throw new TypeError('No method named "' + t + '"')
                        n[t]()
                    }
                })
            }),
            o(e, null, [
                {
                    key: "DATA_KEY",
                    get: function () {
                        return "bs.tab"
                    },
                },
            ]),
            e
        )
    })(W)
    K.on(
        document,
        "click.bs.tab.data-api",
        '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        function (t) {
            t.preventDefault(), (L(this, "bs.tab") || new xt(this)).show()
        }
    ),
        T("tab", xt)
    var Ht = { animation: "boolean", autohide: "boolean", delay: "number" },
        Bt = { animation: !0, autohide: !0, delay: 5e3 },
        Mt = (function (t) {
            function e(e, n) {
                var i
                return (
                    ((i = t.call(this, e) || this)._config = i._getConfig(n)),
                    (i._timeout = null),
                    i._setListeners(),
                    i
                )
            }
            r(e, t)
            var n = e.prototype
            return (
                (n.show = function () {
                    var t = this
                    if (
                        !K.trigger(this._element, "show.bs.toast")
                            .defaultPrevented
                    ) {
                        this._clearTimeout(),
                            this._config.animation &&
                                this._element.classList.add("fade")
                        var e = function () {
                            t._element.classList.remove("showing"),
                                t._element.classList.add("show"),
                                K.trigger(t._element, "shown.bs.toast"),
                                t._config.autohide &&
                                    (t._timeout = setTimeout(function () {
                                        t.hide()
                                    }, t._config.delay))
                        }
                        if (
                            (this._element.classList.remove("hide"),
                            y(this._element),
                            this._element.classList.add("showing"),
                            this._config.animation)
                        ) {
                            var n = f(this._element)
                            K.one(this._element, "transitionend", e),
                                m(this._element, n)
                        } else e()
                    }
                }),
                (n.hide = function () {
                    var t = this
                    if (
                        this._element.classList.contains("show") &&
                        !K.trigger(this._element, "hide.bs.toast")
                            .defaultPrevented
                    ) {
                        var e = function () {
                            t._element.classList.add("hide"),
                                K.trigger(t._element, "hidden.bs.toast")
                        }
                        if (
                            (this._element.classList.remove("show"),
                            this._config.animation)
                        ) {
                            var n = f(this._element)
                            K.one(this._element, "transitionend", e),
                                m(this._element, n)
                        } else e()
                    }
                }),
                (n.dispose = function () {
                    this._clearTimeout(),
                        this._element.classList.contains("show") &&
                            this._element.classList.remove("show"),
                        K.off(this._element, "click.dismiss.bs.toast"),
                        t.prototype.dispose.call(this),
                        (this._config = null)
                }),
                (n._getConfig = function (t) {
                    return (
                        (t = s(
                            {},
                            Bt,
                            X.getDataAttributes(this._element),
                            "object" == typeof t && t ? t : {}
                        )),
                        _("toast", t, this.constructor.DefaultType),
                        t
                    )
                }),
                (n._setListeners = function () {
                    var t = this
                    K.on(
                        this._element,
                        "click.dismiss.bs.toast",
                        '[data-bs-dismiss="toast"]',
                        function () {
                            return t.hide()
                        }
                    )
                }),
                (n._clearTimeout = function () {
                    clearTimeout(this._timeout), (this._timeout = null)
                }),
                (e.jQueryInterface = function (t) {
                    return this.each(function () {
                        var n = L(this, "bs.toast")
                        if (
                            (n || (n = new e(this, "object" == typeof t && t)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === n[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                )
                            n[t](this)
                        }
                    })
                }),
                o(e, null, [
                    {
                        key: "DefaultType",
                        get: function () {
                            return Ht
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return Bt
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.toast"
                        },
                    },
                ]),
                e
            )
        })(W)
    return (
        T("toast", Mt),
        {
            Alert: U,
            Button: F,
            Carousel: J,
            Collapse: nt,
            Dropdown: dt,
            Modal: gt,
            Popover: Ot,
            ScrollSpy: Pt,
            Tab: xt,
            Toast: Mt,
            Tooltip: Lt,
        }
    )
})
//# sourceMappingURL=bootstrap.min.js.map

/**
 * Swiper 6.4.14
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 17, 2023
 */

!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : ((e =
              "undefined" != typeof globalThis
                  ? globalThis
                  : e || self).Swiper = t())
})(this, function () {
    "use strict"
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a]
            ;(i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
        }
    }
    function t() {
        return (t =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var a = arguments[t]
                    for (var i in a)
                        Object.prototype.hasOwnProperty.call(a, i) &&
                            (e[i] = a[i])
                }
                return e
            }).apply(this, arguments)
    }
    function a(e) {
        return (
            null !== e &&
            "object" == typeof e &&
            "constructor" in e &&
            e.constructor === Object
        )
    }
    function i(e, t) {
        void 0 === e && (e = {}),
            void 0 === t && (t = {}),
            Object.keys(t).forEach(function (s) {
                void 0 === e[s]
                    ? (e[s] = t[s])
                    : a(t[s]) &&
                      a(e[s]) &&
                      Object.keys(t[s]).length > 0 &&
                      i(e[s], t[s])
            })
    }
    var s = {
        body: {},
        addEventListener: function () {},
        removeEventListener: function () {},
        activeElement: { blur: function () {}, nodeName: "" },
        querySelector: function () {
            return null
        },
        querySelectorAll: function () {
            return []
        },
        getElementById: function () {
            return null
        },
        createEvent: function () {
            return { initEvent: function () {} }
        },
        createElement: function () {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                    return []
                },
            }
        },
        createElementNS: function () {
            return {}
        },
        importNode: function () {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
        },
    }
    function r() {
        var e = "undefined" != typeof document ? document : {}
        return i(e, s), e
    }
    var n = {
        document: s,
        navigator: { userAgent: "" },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
        },
        history: {
            replaceState: function () {},
            pushState: function () {},
            go: function () {},
            back: function () {},
        },
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {},
        removeEventListener: function () {},
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                },
            }
        },
        Image: function () {},
        Date: function () {},
        screen: {},
        setTimeout: function () {},
        clearTimeout: function () {},
        matchMedia: function () {
            return {}
        },
        requestAnimationFrame: function (e) {
            return "undefined" == typeof setTimeout
                ? (e(), null)
                : setTimeout(e, 0)
        },
        cancelAnimationFrame: function (e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        },
    }
    function l() {
        var e = "undefined" != typeof window ? window : {}
        return i(e, n), e
    }
    function o(e) {
        return (o = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
              })(e)
    }
    function d(e, t) {
        return (d =
            Object.setPrototypeOf ||
            function (e, t) {
                return (e.__proto__ = t), e
            })(e, t)
    }
    function p() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1
        if (Reflect.construct.sham) return !1
        if ("function" == typeof Proxy) return !0
        try {
            return (
                Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                ),
                !0
            )
        } catch (e) {
            return !1
        }
    }
    function u(e, t, a) {
        return (u = p()
            ? Reflect.construct
            : function (e, t, a) {
                  var i = [null]
                  i.push.apply(i, t)
                  var s = new (Function.bind.apply(e, i))()
                  return a && d(s, a.prototype), s
              }).apply(null, arguments)
    }
    function c(e) {
        var t = "function" == typeof Map ? new Map() : void 0
        return (c = function (e) {
            if (
                null === e ||
                ((a = e),
                -1 === Function.toString.call(a).indexOf("[native code]"))
            )
                return e
            var a
            if ("function" != typeof e)
                throw new TypeError(
                    "Super expression must either be null or a function"
                )
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e)
                t.set(e, i)
            }
            function i() {
                return u(e, arguments, o(this).constructor)
            }
            return (
                (i.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: i,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                })),
                d(i, e)
            )
        })(e)
    }
    var h = (function (e) {
        var t, a
        function i(t) {
            var a, i, s
            return (
                (a = e.call.apply(e, [this].concat(t)) || this),
                (i = (function (e) {
                    if (void 0 === e)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        )
                    return e
                })(a)),
                (s = i.__proto__),
                Object.defineProperty(i, "__proto__", {
                    get: function () {
                        return s
                    },
                    set: function (e) {
                        s.__proto__ = e
                    },
                }),
                a
            )
        }
        return (
            (a = e),
            ((t = i).prototype = Object.create(a.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = a),
            i
        )
    })(c(Array))
    function v(e) {
        void 0 === e && (e = [])
        var t = []
        return (
            e.forEach(function (e) {
                Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e)
            }),
            t
        )
    }
    function f(e, t) {
        return Array.prototype.filter.call(e, t)
    }
    function m(e, t) {
        var a = l(),
            i = r(),
            s = []
        if (!t && e instanceof h) return e
        if (!e) return new h(s)
        if ("string" == typeof e) {
            var n = e.trim()
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                var o = "div"
                0 === n.indexOf("<li") && (o = "ul"),
                    0 === n.indexOf("<tr") && (o = "tbody"),
                    (0 !== n.indexOf("<td") && 0 !== n.indexOf("<th")) ||
                        (o = "tr"),
                    0 === n.indexOf("<tbody") && (o = "table"),
                    0 === n.indexOf("<option") && (o = "select")
                var d = i.createElement(o)
                d.innerHTML = n
                for (var p = 0; p < d.childNodes.length; p += 1)
                    s.push(d.childNodes[p])
            } else
                s = (function (e, t) {
                    if ("string" != typeof e) return [e]
                    for (
                        var a = [], i = t.querySelectorAll(e), s = 0;
                        s < i.length;
                        s += 1
                    )
                        a.push(i[s])
                    return a
                })(e.trim(), t || i)
        } else if (e.nodeType || e === a || e === i) s.push(e)
        else if (Array.isArray(e)) {
            if (e instanceof h) return e
            s = e
        }
        return new h(
            (function (e) {
                for (var t = [], a = 0; a < e.length; a += 1)
                    -1 === t.indexOf(e[a]) && t.push(e[a])
                return t
            })(s)
        )
    }
    m.fn = h.prototype
    var g,
        y,
        w,
        b = {
            addClass: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = v(
                    t.map(function (e) {
                        return e.split(" ")
                    })
                )
                return (
                    this.forEach(function (e) {
                        var t
                        ;(t = e.classList).add.apply(t, i)
                    }),
                    this
                )
            },
            removeClass: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = v(
                    t.map(function (e) {
                        return e.split(" ")
                    })
                )
                return (
                    this.forEach(function (e) {
                        var t
                        ;(t = e.classList).remove.apply(t, i)
                    }),
                    this
                )
            },
            hasClass: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = v(
                    t.map(function (e) {
                        return e.split(" ")
                    })
                )
                return (
                    f(this, function (e) {
                        return (
                            i.filter(function (t) {
                                return e.classList.contains(t)
                            }).length > 0
                        )
                    }).length > 0
                )
            },
            toggleClass: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = v(
                    t.map(function (e) {
                        return e.split(" ")
                    })
                )
                this.forEach(function (e) {
                    i.forEach(function (t) {
                        e.classList.toggle(t)
                    })
                })
            },
            attr: function (e, t) {
                if (1 === arguments.length && "string" == typeof e)
                    return this[0] ? this[0].getAttribute(e) : void 0
                for (var a = 0; a < this.length; a += 1)
                    if (2 === arguments.length) this[a].setAttribute(e, t)
                    else
                        for (var i in e)
                            (this[a][i] = e[i]), this[a].setAttribute(i, e[i])
                return this
            },
            removeAttr: function (e) {
                for (var t = 0; t < this.length; t += 1)
                    this[t].removeAttribute(e)
                return this
            },
            transform: function (e) {
                for (var t = 0; t < this.length; t += 1)
                    this[t].style.transform = e
                return this
            },
            transition: function (e) {
                for (var t = 0; t < this.length; t += 1)
                    this[t].style.transitionDuration =
                        "string" != typeof e ? e + "ms" : e
                return this
            },
            on: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = t[0],
                    s = t[1],
                    r = t[2],
                    n = t[3]
                function l(e) {
                    var t = e.target
                    if (t) {
                        var a = e.target.dom7EventData || []
                        if ((a.indexOf(e) < 0 && a.unshift(e), m(t).is(s)))
                            r.apply(t, a)
                        else
                            for (
                                var i = m(t).parents(), n = 0;
                                n < i.length;
                                n += 1
                            )
                                m(i[n]).is(s) && r.apply(i[n], a)
                    }
                }
                function o(e) {
                    var t = (e && e.target && e.target.dom7EventData) || []
                    t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
                }
                "function" == typeof t[1] &&
                    ((i = t[0]), (r = t[1]), (n = t[2]), (s = void 0)),
                    n || (n = !1)
                for (var d, p = i.split(" "), u = 0; u < this.length; u += 1) {
                    var c = this[u]
                    if (s)
                        for (d = 0; d < p.length; d += 1) {
                            var h = p[d]
                            c.dom7LiveListeners || (c.dom7LiveListeners = {}),
                                c.dom7LiveListeners[h] ||
                                    (c.dom7LiveListeners[h] = []),
                                c.dom7LiveListeners[h].push({
                                    listener: r,
                                    proxyListener: l,
                                }),
                                c.addEventListener(h, l, n)
                        }
                    else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d]
                            c.dom7Listeners || (c.dom7Listeners = {}),
                                c.dom7Listeners[v] || (c.dom7Listeners[v] = []),
                                c.dom7Listeners[v].push({
                                    listener: r,
                                    proxyListener: o,
                                }),
                                c.addEventListener(v, o, n)
                        }
                }
                return this
            },
            off: function () {
                for (
                    var e = arguments.length, t = new Array(e), a = 0;
                    a < e;
                    a++
                )
                    t[a] = arguments[a]
                var i = t[0],
                    s = t[1],
                    r = t[2],
                    n = t[3]
                "function" == typeof t[1] &&
                    ((i = t[0]), (r = t[1]), (n = t[2]), (s = void 0)),
                    n || (n = !1)
                for (var l = i.split(" "), o = 0; o < l.length; o += 1)
                    for (var d = l[o], p = 0; p < this.length; p += 1) {
                        var u = this[p],
                            c = void 0
                        if (
                            (!s && u.dom7Listeners
                                ? (c = u.dom7Listeners[d])
                                : s &&
                                  u.dom7LiveListeners &&
                                  (c = u.dom7LiveListeners[d]),
                            c && c.length)
                        )
                            for (var h = c.length - 1; h >= 0; h -= 1) {
                                var v = c[h]
                                ;(r && v.listener === r) ||
                                (r &&
                                    v.listener &&
                                    v.listener.dom7proxy &&
                                    v.listener.dom7proxy === r)
                                    ? (u.removeEventListener(
                                          d,
                                          v.proxyListener,
                                          n
                                      ),
                                      c.splice(h, 1))
                                    : r ||
                                      (u.removeEventListener(
                                          d,
                                          v.proxyListener,
                                          n
                                      ),
                                      c.splice(h, 1))
                            }
                    }
                return this
            },
            trigger: function () {
                for (
                    var e = l(), t = arguments.length, a = new Array(t), i = 0;
                    i < t;
                    i++
                )
                    a[i] = arguments[i]
                for (
                    var s = a[0].split(" "), r = a[1], n = 0;
                    n < s.length;
                    n += 1
                )
                    for (var o = s[n], d = 0; d < this.length; d += 1) {
                        var p = this[d]
                        if (e.CustomEvent) {
                            var u = new e.CustomEvent(o, {
                                detail: r,
                                bubbles: !0,
                                cancelable: !0,
                            })
                            ;(p.dom7EventData = a.filter(function (e, t) {
                                return t > 0
                            })),
                                p.dispatchEvent(u),
                                (p.dom7EventData = []),
                                delete p.dom7EventData
                        }
                    }
                return this
            },
            transitionEnd: function (e) {
                var t = this
                return (
                    e &&
                        t.on("transitionend", function a(i) {
                            i.target === this &&
                                (e.call(this, i), t.off("transitionend", a))
                        }),
                    this
                )
            },
            outerWidth: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles()
                        return (
                            this[0].offsetWidth +
                            parseFloat(t.getPropertyValue("margin-right")) +
                            parseFloat(t.getPropertyValue("margin-left"))
                        )
                    }
                    return this[0].offsetWidth
                }
                return null
            },
            outerHeight: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var t = this.styles()
                        return (
                            this[0].offsetHeight +
                            parseFloat(t.getPropertyValue("margin-top")) +
                            parseFloat(t.getPropertyValue("margin-bottom"))
                        )
                    }
                    return this[0].offsetHeight
                }
                return null
            },
            styles: function () {
                var e = l()
                return this[0] ? e.getComputedStyle(this[0], null) : {}
            },
            offset: function () {
                if (this.length > 0) {
                    var e = l(),
                        t = r(),
                        a = this[0],
                        i = a.getBoundingClientRect(),
                        s = t.body,
                        n = a.clientTop || s.clientTop || 0,
                        o = a.clientLeft || s.clientLeft || 0,
                        d = a === e ? e.scrollY : a.scrollTop,
                        p = a === e ? e.scrollX : a.scrollLeft
                    return { top: i.top + d - n, left: i.left + p - o }
                }
                return null
            },
            css: function (e, t) {
                var a,
                    i = l()
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (a = 0; a < this.length; a += 1)
                            for (var s in e) this[a].style[s] = e[s]
                        return this
                    }
                    if (this[0])
                        return i
                            .getComputedStyle(this[0], null)
                            .getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (a = 0; a < this.length; a += 1) this[a].style[e] = t
                    return this
                }
                return this
            },
            each: function (e) {
                return e
                    ? (this.forEach(function (t, a) {
                          e.apply(t, [t, a])
                      }),
                      this)
                    : this
            },
            html: function (e) {
                if (void 0 === e) return this[0] ? this[0].innerHTML : null
                for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e
                return this
            },
            text: function (e) {
                if (void 0 === e)
                    return this[0] ? this[0].textContent.trim() : null
                for (var t = 0; t < this.length; t += 1) this[t].textContent = e
                return this
            },
            is: function (e) {
                var t,
                    a,
                    i = l(),
                    s = r(),
                    n = this[0]
                if (!n || void 0 === e) return !1
                if ("string" == typeof e) {
                    if (n.matches) return n.matches(e)
                    if (n.webkitMatchesSelector)
                        return n.webkitMatchesSelector(e)
                    if (n.msMatchesSelector) return n.msMatchesSelector(e)
                    for (t = m(e), a = 0; a < t.length; a += 1)
                        if (t[a] === n) return !0
                    return !1
                }
                if (e === s) return n === s
                if (e === i) return n === i
                if (e.nodeType || e instanceof h) {
                    for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                        if (t[a] === n) return !0
                    return !1
                }
                return !1
            },
            index: function () {
                var e,
                    t = this[0]
                if (t) {
                    for (e = 0; null !== (t = t.previousSibling); )
                        1 === t.nodeType && (e += 1)
                    return e
                }
            },
            eq: function (e) {
                if (void 0 === e) return this
                var t = this.length
                if (e > t - 1) return m([])
                if (e < 0) {
                    var a = t + e
                    return m(a < 0 ? [] : [this[a]])
                }
                return m([this[e]])
            },
            append: function () {
                for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
                    e = a < 0 || arguments.length <= a ? void 0 : arguments[a]
                    for (var i = 0; i < this.length; i += 1)
                        if ("string" == typeof e) {
                            var s = t.createElement("div")
                            for (s.innerHTML = e; s.firstChild; )
                                this[i].appendChild(s.firstChild)
                        } else if (e instanceof h)
                            for (var n = 0; n < e.length; n += 1)
                                this[i].appendChild(e[n])
                        else this[i].appendChild(e)
                }
                return this
            },
            prepend: function (e) {
                var t,
                    a,
                    i = r()
                for (t = 0; t < this.length; t += 1)
                    if ("string" == typeof e) {
                        var s = i.createElement("div")
                        for (
                            s.innerHTML = e, a = s.childNodes.length - 1;
                            a >= 0;
                            a -= 1
                        )
                            this[t].insertBefore(
                                s.childNodes[a],
                                this[t].childNodes[0]
                            )
                    } else if (e instanceof h)
                        for (a = 0; a < e.length; a += 1)
                            this[t].insertBefore(e[a], this[t].childNodes[0])
                    else this[t].insertBefore(e, this[t].childNodes[0])
                return this
            },
            next: function (e) {
                return this.length > 0
                    ? e
                        ? this[0].nextElementSibling &&
                          m(this[0].nextElementSibling).is(e)
                            ? m([this[0].nextElementSibling])
                            : m([])
                        : this[0].nextElementSibling
                        ? m([this[0].nextElementSibling])
                        : m([])
                    : m([])
            },
            nextAll: function (e) {
                var t = [],
                    a = this[0]
                if (!a) return m([])
                for (; a.nextElementSibling; ) {
                    var i = a.nextElementSibling
                    e ? m(i).is(e) && t.push(i) : t.push(i), (a = i)
                }
                return m(t)
            },
            prev: function (e) {
                if (this.length > 0) {
                    var t = this[0]
                    return e
                        ? t.previousElementSibling &&
                          m(t.previousElementSibling).is(e)
                            ? m([t.previousElementSibling])
                            : m([])
                        : t.previousElementSibling
                        ? m([t.previousElementSibling])
                        : m([])
                }
                return m([])
            },
            prevAll: function (e) {
                var t = [],
                    a = this[0]
                if (!a) return m([])
                for (; a.previousElementSibling; ) {
                    var i = a.previousElementSibling
                    e ? m(i).is(e) && t.push(i) : t.push(i), (a = i)
                }
                return m(t)
            },
            parent: function (e) {
                for (var t = [], a = 0; a < this.length; a += 1)
                    null !== this[a].parentNode &&
                        (e
                            ? m(this[a].parentNode).is(e) &&
                              t.push(this[a].parentNode)
                            : t.push(this[a].parentNode))
                return m(t)
            },
            parents: function (e) {
                for (var t = [], a = 0; a < this.length; a += 1)
                    for (var i = this[a].parentNode; i; )
                        e ? m(i).is(e) && t.push(i) : t.push(i),
                            (i = i.parentNode)
                return m(t)
            },
            closest: function (e) {
                var t = this
                return void 0 === e
                    ? m([])
                    : (t.is(e) || (t = t.parents(e).eq(0)), t)
            },
            find: function (e) {
                for (var t = [], a = 0; a < this.length; a += 1)
                    for (
                        var i = this[a].querySelectorAll(e), s = 0;
                        s < i.length;
                        s += 1
                    )
                        t.push(i[s])
                return m(t)
            },
            children: function (e) {
                for (var t = [], a = 0; a < this.length; a += 1)
                    for (var i = this[a].children, s = 0; s < i.length; s += 1)
                        (e && !m(i[s]).is(e)) || t.push(i[s])
                return m(t)
            },
            filter: function (e) {
                return m(f(this, e))
            },
            remove: function () {
                for (var e = 0; e < this.length; e += 1)
                    this[e].parentNode &&
                        this[e].parentNode.removeChild(this[e])
                return this
            },
        }
    function E(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }
    function x() {
        return Date.now()
    }
    function T(e, t) {
        void 0 === t && (t = "x")
        var a,
            i,
            s,
            r = l(),
            n = r.getComputedStyle(e, null)
        return (
            r.WebKitCSSMatrix
                ? ((i = n.transform || n.webkitTransform).split(",").length >
                      6 &&
                      (i = i
                          .split(", ")
                          .map(function (e) {
                              return e.replace(",", ".")
                          })
                          .join(", ")),
                  (s = new r.WebKitCSSMatrix("none" === i ? "" : i)))
                : (a = (s =
                      n.MozTransform ||
                      n.OTransform ||
                      n.MsTransform ||
                      n.msTransform ||
                      n.transform ||
                      n
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,"))
                      .toString()
                      .split(",")),
            "x" === t &&
                (i = r.WebKitCSSMatrix
                    ? s.m41
                    : 16 === a.length
                    ? parseFloat(a[12])
                    : parseFloat(a[4])),
            "y" === t &&
                (i = r.WebKitCSSMatrix
                    ? s.m42
                    : 16 === a.length
                    ? parseFloat(a[13])
                    : parseFloat(a[5])),
            i || 0
        )
    }
    function C(e) {
        return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            e.constructor === Object
        )
    }
    function S() {
        for (
            var e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
                t = 1;
            t < arguments.length;
            t += 1
        ) {
            var a = t < 0 || arguments.length <= t ? void 0 : arguments[t]
            if (null != a)
                for (
                    var i = Object.keys(Object(a)), s = 0, r = i.length;
                    s < r;
                    s += 1
                ) {
                    var n = i[s],
                        l = Object.getOwnPropertyDescriptor(a, n)
                    void 0 !== l &&
                        l.enumerable &&
                        (C(e[n]) && C(a[n])
                            ? S(e[n], a[n])
                            : !C(e[n]) && C(a[n])
                            ? ((e[n] = {}), S(e[n], a[n]))
                            : (e[n] = a[n]))
                }
        }
        return e
    }
    function M(e, t) {
        Object.keys(t).forEach(function (a) {
            C(t[a]) &&
                Object.keys(t[a]).forEach(function (i) {
                    "function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e))
                }),
                (e[a] = t[a])
        })
    }
    function z() {
        return (
            g ||
                (g = (function () {
                    var e = l(),
                        t = r()
                    return {
                        touch: !!(
                            "ontouchstart" in e ||
                            (e.DocumentTouch && t instanceof e.DocumentTouch)
                        ),
                        pointerEvents:
                            !!e.PointerEvent &&
                            "maxTouchPoints" in e.navigator &&
                            e.navigator.maxTouchPoints >= 0,
                        observer:
                            "MutationObserver" in e ||
                            "WebkitMutationObserver" in e,
                        passiveListener: (function () {
                            var t = !1
                            try {
                                var a = Object.defineProperty({}, "passive", {
                                    get: function () {
                                        t = !0
                                    },
                                })
                                e.addEventListener(
                                    "testPassiveListener",
                                    null,
                                    a
                                )
                            } catch (e) {}
                            return t
                        })(),
                        gestures: "ongesturestart" in e,
                    }
                })()),
            g
        )
    }
    function P(e) {
        return (
            void 0 === e && (e = {}),
            y ||
                (y = (function (e) {
                    var t = (void 0 === e ? {} : e).userAgent,
                        a = z(),
                        i = l(),
                        s = i.navigator.platform,
                        r = t || i.navigator.userAgent,
                        n = { ios: !1, android: !1 },
                        o = i.screen.width,
                        d = i.screen.height,
                        p = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                        u = r.match(/(iPad).*OS\s([\d_]+)/),
                        c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                        h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        v = "Win32" === s,
                        f = "MacIntel" === s
                    return (
                        !u &&
                            f &&
                            a.touch &&
                            [
                                "1024x1366",
                                "1366x1024",
                                "834x1194",
                                "1194x834",
                                "834x1112",
                                "1112x834",
                                "768x1024",
                                "1024x768",
                                "820x1180",
                                "1180x820",
                                "810x1080",
                                "1080x810",
                            ].indexOf(o + "x" + d) >= 0 &&
                            ((u = r.match(/(Version)\/([\d.]+)/)) ||
                                (u = [0, 1, "13_0_0"]),
                            (f = !1)),
                        p && !v && ((n.os = "android"), (n.android = !0)),
                        (u || h || c) && ((n.os = "ios"), (n.ios = !0)),
                        n
                    )
                })(e)),
            y
        )
    }
    function k() {
        return (
            w ||
                (w = (function () {
                    var e,
                        t = l()
                    return {
                        isEdge: !!t.navigator.userAgent.match(/Edge/g),
                        isSafari:
                            ((e = t.navigator.userAgent.toLowerCase()),
                            e.indexOf("safari") >= 0 &&
                                e.indexOf("chrome") < 0 &&
                                e.indexOf("android") < 0),
                        isWebView:
                            /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                                t.navigator.userAgent
                            ),
                    }
                })()),
            w
        )
    }
    Object.keys(b).forEach(function (e) {
        m.fn[e] = b[e]
    })
    var L = {
            name: "resize",
            create: function () {
                var e = this
                S(e, {
                    resize: {
                        resizeHandler: function () {
                            e &&
                                !e.destroyed &&
                                e.initialized &&
                                (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function () {
                            e &&
                                !e.destroyed &&
                                e.initialized &&
                                e.emit("orientationchange")
                        },
                    },
                })
            },
            on: {
                init: function (e) {
                    var t = l()
                    t.addEventListener("resize", e.resize.resizeHandler),
                        t.addEventListener(
                            "orientationchange",
                            e.resize.orientationChangeHandler
                        )
                },
                destroy: function (e) {
                    var t = l()
                    t.removeEventListener("resize", e.resize.resizeHandler),
                        t.removeEventListener(
                            "orientationchange",
                            e.resize.orientationChangeHandler
                        )
                },
            },
        },
        $ = {
            attach: function (e, t) {
                void 0 === t && (t = {})
                var a = l(),
                    i = this,
                    s = new (a.MutationObserver || a.WebkitMutationObserver)(
                        function (e) {
                            if (1 !== e.length) {
                                var t = function () {
                                    i.emit("observerUpdate", e[0])
                                }
                                a.requestAnimationFrame
                                    ? a.requestAnimationFrame(t)
                                    : a.setTimeout(t, 0)
                            } else i.emit("observerUpdate", e[0])
                        }
                    )
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData:
                        void 0 === t.characterData || t.characterData,
                }),
                    i.observer.observers.push(s)
            },
            init: function () {
                var e = this
                if (e.support.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (
                            var t = e.$el.parents(), a = 0;
                            a < t.length;
                            a += 1
                        )
                            e.observer.attach(t[a])
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren,
                    }),
                        e.observer.attach(e.$wrapperEl[0], { attributes: !1 })
                }
            },
            destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect()
                }),
                    (this.observer.observers = [])
            },
        },
        I = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1,
            },
            create: function () {
                M(this, { observer: t({}, $, { observers: [] }) })
            },
            on: {
                init: function (e) {
                    e.observer.init()
                },
                destroy: function (e) {
                    e.observer.destroy()
                },
            },
        }
    function O(e) {
        var t = this,
            a = r(),
            i = l(),
            s = t.touchEventsData,
            n = t.params,
            o = t.touches
        if (!t.animating || !n.preventInteractionOnTransition) {
            var d = e
            d.originalEvent && (d = d.originalEvent)
            var p = m(d.target)
            if (
                "wrapper" !== n.touchEventsTarget ||
                p.closest(t.wrapperEl).length
            )
                if (
                    ((s.isTouchEvent = "touchstart" === d.type),
                    s.isTouchEvent || !("which" in d) || 3 !== d.which)
                )
                    if (!(!s.isTouchEvent && "button" in d && d.button > 0))
                        if (!s.isTouched || !s.isMoved)
                            if (
                                (!!n.noSwipingClass &&
                                    "" !== n.noSwipingClass &&
                                    d.target &&
                                    d.target.shadowRoot &&
                                    e.path &&
                                    e.path[0] &&
                                    (p = m(e.path[0])),
                                n.noSwiping &&
                                    p.closest(
                                        n.noSwipingSelector
                                            ? n.noSwipingSelector
                                            : "." + n.noSwipingClass
                                    )[0])
                            )
                                t.allowClick = !0
                            else if (
                                !n.swipeHandler ||
                                p.closest(n.swipeHandler)[0]
                            ) {
                                ;(o.currentX =
                                    "touchstart" === d.type
                                        ? d.targetTouches[0].pageX
                                        : d.pageX),
                                    (o.currentY =
                                        "touchstart" === d.type
                                            ? d.targetTouches[0].pageY
                                            : d.pageY)
                                var u = o.currentX,
                                    c = o.currentY,
                                    h =
                                        n.edgeSwipeDetection ||
                                        n.iOSEdgeSwipeDetection,
                                    v =
                                        n.edgeSwipeThreshold ||
                                        n.iOSEdgeSwipeThreshold
                                if (h && (u <= v || u >= i.innerWidth - v)) {
                                    if ("prevent" !== h) return
                                    e.preventDefault()
                                }
                                if (
                                    (S(s, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0,
                                    }),
                                    (o.startX = u),
                                    (o.startY = c),
                                    (s.touchStartTime = x()),
                                    (t.allowClick = !0),
                                    t.updateSize(),
                                    (t.swipeDirection = void 0),
                                    n.threshold > 0 &&
                                        (s.allowThresholdMove = !1),
                                    "touchstart" !== d.type)
                                ) {
                                    var f = !0
                                    p.is(s.formElements) && (f = !1),
                                        a.activeElement &&
                                            m(a.activeElement).is(
                                                s.formElements
                                            ) &&
                                            a.activeElement !== p[0] &&
                                            a.activeElement.blur()
                                    var g =
                                        f &&
                                        t.allowTouchMove &&
                                        n.touchStartPreventDefault
                                    ;(!n.touchStartForcePreventDefault && !g) ||
                                        p[0].isContentEditable ||
                                        d.preventDefault()
                                }
                                t.emit("touchStart", d)
                            }
        }
    }
    function A(e) {
        var t = r(),
            a = this,
            i = a.touchEventsData,
            s = a.params,
            n = a.touches,
            l = a.rtlTranslate,
            o = e
        if ((o.originalEvent && (o = o.originalEvent), i.isTouched)) {
            if (!i.isTouchEvent || "touchmove" === o.type) {
                var d =
                        "touchmove" === o.type &&
                        o.targetTouches &&
                        (o.targetTouches[0] || o.changedTouches[0]),
                    p = "touchmove" === o.type ? d.pageX : o.pageX,
                    u = "touchmove" === o.type ? d.pageY : o.pageY
                if (o.preventedByNestedSwiper)
                    return (n.startX = p), void (n.startY = u)
                if (!a.allowTouchMove)
                    return (
                        (a.allowClick = !1),
                        void (
                            i.isTouched &&
                            (S(n, {
                                startX: p,
                                startY: u,
                                currentX: p,
                                currentY: u,
                            }),
                            (i.touchStartTime = x()))
                        )
                    )
                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                    if (a.isVertical()) {
                        if (
                            (u < n.startY && a.translate <= a.maxTranslate()) ||
                            (u > n.startY && a.translate >= a.minTranslate())
                        )
                            return (i.isTouched = !1), void (i.isMoved = !1)
                    } else if (
                        (p < n.startX && a.translate <= a.maxTranslate()) ||
                        (p > n.startX && a.translate >= a.minTranslate())
                    )
                        return
                if (
                    i.isTouchEvent &&
                    t.activeElement &&
                    o.target === t.activeElement &&
                    m(o.target).is(i.formElements)
                )
                    return (i.isMoved = !0), void (a.allowClick = !1)
                if (
                    (i.allowTouchCallbacks && a.emit("touchMove", o),
                    !(o.targetTouches && o.targetTouches.length > 1))
                ) {
                    ;(n.currentX = p), (n.currentY = u)
                    var c = n.currentX - n.startX,
                        h = n.currentY - n.startY
                    if (
                        !(
                            a.params.threshold &&
                            Math.sqrt(Math.pow(c, 2) + Math.pow(h, 2)) <
                                a.params.threshold
                        )
                    ) {
                        var v
                        if (void 0 === i.isScrolling)
                            (a.isHorizontal() && n.currentY === n.startY) ||
                            (a.isVertical() && n.currentX === n.startX)
                                ? (i.isScrolling = !1)
                                : c * c + h * h >= 25 &&
                                  ((v =
                                      (180 *
                                          Math.atan2(
                                              Math.abs(h),
                                              Math.abs(c)
                                          )) /
                                      Math.PI),
                                  (i.isScrolling = a.isHorizontal()
                                      ? v > s.touchAngle
                                      : 90 - v > s.touchAngle))
                        if (
                            (i.isScrolling && a.emit("touchMoveOpposite", o),
                            void 0 === i.startMoving &&
                                ((n.currentX === n.startX &&
                                    n.currentY === n.startY) ||
                                    (i.startMoving = !0)),
                            i.isScrolling)
                        )
                            i.isTouched = !1
                        else if (i.startMoving) {
                            ;(a.allowClick = !1),
                                !s.cssMode &&
                                    o.cancelable &&
                                    o.preventDefault(),
                                s.touchMoveStopPropagation &&
                                    !s.nested &&
                                    o.stopPropagation(),
                                i.isMoved ||
                                    (s.loop && a.loopFix(),
                                    (i.startTranslate = a.getTranslate()),
                                    a.setTransition(0),
                                    a.animating &&
                                        a.$wrapperEl.trigger(
                                            "webkitTransitionEnd transitionend"
                                        ),
                                    (i.allowMomentumBounce = !1),
                                    !s.grabCursor ||
                                        (!0 !== a.allowSlideNext &&
                                            !0 !== a.allowSlidePrev) ||
                                        a.setGrabCursor(!0),
                                    a.emit("sliderFirstMove", o)),
                                a.emit("sliderMove", o),
                                (i.isMoved = !0)
                            var f = a.isHorizontal() ? c : h
                            ;(n.diff = f),
                                (f *= s.touchRatio),
                                l && (f = -f),
                                (a.swipeDirection = f > 0 ? "prev" : "next"),
                                (i.currentTranslate = f + i.startTranslate)
                            var g = !0,
                                y = s.resistanceRatio
                            if (
                                (s.touchReleaseOnEdges && (y = 0),
                                f > 0 && i.currentTranslate > a.minTranslate()
                                    ? ((g = !1),
                                      s.resistance &&
                                          (i.currentTranslate =
                                              a.minTranslate() -
                                              1 +
                                              Math.pow(
                                                  -a.minTranslate() +
                                                      i.startTranslate +
                                                      f,
                                                  y
                                              )))
                                    : f < 0 &&
                                      i.currentTranslate < a.maxTranslate() &&
                                      ((g = !1),
                                      s.resistance &&
                                          (i.currentTranslate =
                                              a.maxTranslate() +
                                              1 -
                                              Math.pow(
                                                  a.maxTranslate() -
                                                      i.startTranslate -
                                                      f,
                                                  y
                                              ))),
                                g && (o.preventedByNestedSwiper = !0),
                                !a.allowSlideNext &&
                                    "next" === a.swipeDirection &&
                                    i.currentTranslate < i.startTranslate &&
                                    (i.currentTranslate = i.startTranslate),
                                !a.allowSlidePrev &&
                                    "prev" === a.swipeDirection &&
                                    i.currentTranslate > i.startTranslate &&
                                    (i.currentTranslate = i.startTranslate),
                                s.threshold > 0)
                            ) {
                                if (
                                    !(
                                        Math.abs(f) > s.threshold ||
                                        i.allowThresholdMove
                                    )
                                )
                                    return void (i.currentTranslate =
                                        i.startTranslate)
                                if (!i.allowThresholdMove)
                                    return (
                                        (i.allowThresholdMove = !0),
                                        (n.startX = n.currentX),
                                        (n.startY = n.currentY),
                                        (i.currentTranslate = i.startTranslate),
                                        void (n.diff = a.isHorizontal()
                                            ? n.currentX - n.startX
                                            : n.currentY - n.startY)
                                    )
                            }
                            s.followFinger &&
                                !s.cssMode &&
                                ((s.freeMode ||
                                    s.watchSlidesProgress ||
                                    s.watchSlidesVisibility) &&
                                    (a.updateActiveIndex(),
                                    a.updateSlidesClasses()),
                                s.freeMode &&
                                    (0 === i.velocities.length &&
                                        i.velocities.push({
                                            position:
                                                n[
                                                    a.isHorizontal()
                                                        ? "startX"
                                                        : "startY"
                                                ],
                                            time: i.touchStartTime,
                                        }),
                                    i.velocities.push({
                                        position:
                                            n[
                                                a.isHorizontal()
                                                    ? "currentX"
                                                    : "currentY"
                                            ],
                                        time: x(),
                                    })),
                                a.updateProgress(i.currentTranslate),
                                a.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", o)
    }
    function D(e) {
        var t = this,
            a = t.touchEventsData,
            i = t.params,
            s = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            l = t.slidesGrid,
            o = t.snapGrid,
            d = e
        if (
            (d.originalEvent && (d = d.originalEvent),
            a.allowTouchCallbacks && t.emit("touchEnd", d),
            (a.allowTouchCallbacks = !1),
            !a.isTouched)
        )
            return (
                a.isMoved && i.grabCursor && t.setGrabCursor(!1),
                (a.isMoved = !1),
                void (a.startMoving = !1)
            )
        i.grabCursor &&
            a.isMoved &&
            a.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1)
        var p,
            u = x(),
            c = u - a.touchStartTime
        if (
            (t.allowClick &&
                (t.updateClickedSlide(d),
                t.emit("tap click", d),
                c < 300 &&
                    u - a.lastClickTime < 300 &&
                    t.emit("doubleTap doubleClick", d)),
            (a.lastClickTime = x()),
            E(function () {
                t.destroyed || (t.allowClick = !0)
            }),
            !a.isTouched ||
                !a.isMoved ||
                !t.swipeDirection ||
                0 === s.diff ||
                a.currentTranslate === a.startTranslate)
        )
            return (
                (a.isTouched = !1), (a.isMoved = !1), void (a.startMoving = !1)
            )
        if (
            ((a.isTouched = !1),
            (a.isMoved = !1),
            (a.startMoving = !1),
            (p = i.followFinger
                ? r
                    ? t.translate
                    : -t.translate
                : -a.currentTranslate),
            !i.cssMode)
        )
            if (i.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex)
                if (p > -t.maxTranslate())
                    return void (t.slides.length < o.length
                        ? t.slideTo(o.length - 1)
                        : t.slideTo(t.slides.length - 1))
                if (i.freeModeMomentum) {
                    if (a.velocities.length > 1) {
                        var h = a.velocities.pop(),
                            v = a.velocities.pop(),
                            f = h.position - v.position,
                            m = h.time - v.time
                        ;(t.velocity = f / m),
                            (t.velocity /= 2),
                            Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                                (t.velocity = 0),
                            (m > 150 || x() - h.time > 300) && (t.velocity = 0)
                    } else t.velocity = 0
                    ;(t.velocity *= i.freeModeMomentumVelocityRatio),
                        (a.velocities.length = 0)
                    var g = 1e3 * i.freeModeMomentumRatio,
                        y = t.velocity * g,
                        w = t.translate + y
                    r && (w = -w)
                    var b,
                        T,
                        C = !1,
                        S =
                            20 *
                            Math.abs(t.velocity) *
                            i.freeModeMomentumBounceRatio
                    if (w < t.maxTranslate())
                        i.freeModeMomentumBounce
                            ? (w + t.maxTranslate() < -S &&
                                  (w = t.maxTranslate() - S),
                              (b = t.maxTranslate()),
                              (C = !0),
                              (a.allowMomentumBounce = !0))
                            : (w = t.maxTranslate()),
                            i.loop && i.centeredSlides && (T = !0)
                    else if (w > t.minTranslate())
                        i.freeModeMomentumBounce
                            ? (w - t.minTranslate() > S &&
                                  (w = t.minTranslate() + S),
                              (b = t.minTranslate()),
                              (C = !0),
                              (a.allowMomentumBounce = !0))
                            : (w = t.minTranslate()),
                            i.loop && i.centeredSlides && (T = !0)
                    else if (i.freeModeSticky) {
                        for (var M, z = 0; z < o.length; z += 1)
                            if (o[z] > -w) {
                                M = z
                                break
                            }
                        w = -(w =
                            Math.abs(o[M] - w) < Math.abs(o[M - 1] - w) ||
                            "next" === t.swipeDirection
                                ? o[M]
                                : o[M - 1])
                    }
                    if (
                        (T &&
                            t.once("transitionEnd", function () {
                                t.loopFix()
                            }),
                        0 !== t.velocity)
                    ) {
                        if (
                            ((g = r
                                ? Math.abs((-w - t.translate) / t.velocity)
                                : Math.abs((w - t.translate) / t.velocity)),
                            i.freeModeSticky)
                        ) {
                            var P = Math.abs((r ? -w : w) - t.translate),
                                k = t.slidesSizesGrid[t.activeIndex]
                            g =
                                P < k
                                    ? i.speed
                                    : P < 2 * k
                                    ? 1.5 * i.speed
                                    : 2.5 * i.speed
                        }
                    } else if (i.freeModeSticky) return void t.slideToClosest()
                    i.freeModeMomentumBounce && C
                        ? (t.updateProgress(b),
                          t.setTransition(g),
                          t.setTranslate(w),
                          t.transitionStart(!0, t.swipeDirection),
                          (t.animating = !0),
                          n.transitionEnd(function () {
                              t &&
                                  !t.destroyed &&
                                  a.allowMomentumBounce &&
                                  (t.emit("momentumBounce"),
                                  t.setTransition(i.speed),
                                  setTimeout(function () {
                                      t.setTranslate(b),
                                          n.transitionEnd(function () {
                                              t &&
                                                  !t.destroyed &&
                                                  t.transitionEnd()
                                          })
                                  }, 0))
                          }))
                        : t.velocity
                        ? (t.updateProgress(w),
                          t.setTransition(g),
                          t.setTranslate(w),
                          t.transitionStart(!0, t.swipeDirection),
                          t.animating ||
                              ((t.animating = !0),
                              n.transitionEnd(function () {
                                  t && !t.destroyed && t.transitionEnd()
                              })))
                        : t.updateProgress(w),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses()
                } else if (i.freeModeSticky) return void t.slideToClosest()
                ;(!i.freeModeMomentum || c >= i.longSwipesMs) &&
                    (t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses())
            } else {
                for (
                    var L = 0, $ = t.slidesSizesGrid[0], I = 0;
                    I < l.length;
                    I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
                ) {
                    var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
                    void 0 !== l[I + O]
                        ? p >= l[I] &&
                          p < l[I + O] &&
                          ((L = I), ($ = l[I + O] - l[I]))
                        : p >= l[I] &&
                          ((L = I), ($ = l[l.length - 1] - l[l.length - 2]))
                }
                var A = (p - l[L]) / $,
                    D = L < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
                if (c > i.longSwipesMs) {
                    if (!i.longSwipes) return void t.slideTo(t.activeIndex)
                    "next" === t.swipeDirection &&
                        (A >= i.longSwipesRatio
                            ? t.slideTo(L + D)
                            : t.slideTo(L)),
                        "prev" === t.swipeDirection &&
                            (A > 1 - i.longSwipesRatio
                                ? t.slideTo(L + D)
                                : t.slideTo(L))
                } else {
                    if (!i.shortSwipes) return void t.slideTo(t.activeIndex)
                    t.navigation &&
                    (d.target === t.navigation.nextEl ||
                        d.target === t.navigation.prevEl)
                        ? d.target === t.navigation.nextEl
                            ? t.slideTo(L + D)
                            : t.slideTo(L)
                        : ("next" === t.swipeDirection && t.slideTo(L + D),
                          "prev" === t.swipeDirection && t.slideTo(L))
                }
            }
    }
    function G() {
        var e = this,
            t = e.params,
            a = e.el
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint()
            var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid
            ;(e.allowSlideNext = !0),
                (e.allowSlidePrev = !0),
                e.updateSize(),
                e.updateSlides(),
                e.updateSlidesClasses(),
                ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
                e.isEnd &&
                !e.isBeginning &&
                !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0),
                e.autoplay &&
                    e.autoplay.running &&
                    e.autoplay.paused &&
                    e.autoplay.run(),
                (e.allowSlidePrev = s),
                (e.allowSlideNext = i),
                e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }
    function N(e) {
        var t = this
        t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
                t.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation()))
    }
    function B() {
        var e = this,
            t = e.wrapperEl,
            a = e.rtlTranslate
        ;(e.previousTranslate = e.translate),
            e.isHorizontal()
                ? (e.translate = a
                      ? t.scrollWidth - t.offsetWidth - t.scrollLeft
                      : -t.scrollLeft)
                : (e.translate = -t.scrollTop),
            -0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses()
        var i = e.maxTranslate() - e.minTranslate()
        ;(0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress &&
            e.updateProgress(a ? -e.translate : e.translate),
            e.emit("setTranslate", e.translate, !1)
    }
    var H = !1
    function X() {}
    var Y = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            nested: !1,
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: 0.02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1,
        },
        V = {
            modular: {
                useParams: function (e) {
                    var t = this
                    t.modules &&
                        Object.keys(t.modules).forEach(function (a) {
                            var i = t.modules[a]
                            i.params && S(e, i.params)
                        })
                },
                useModules: function (e) {
                    void 0 === e && (e = {})
                    var t = this
                    t.modules &&
                        Object.keys(t.modules).forEach(function (a) {
                            var i = t.modules[a],
                                s = e[a] || {}
                            i.on &&
                                t.on &&
                                Object.keys(i.on).forEach(function (e) {
                                    t.on(e, i.on[e])
                                }),
                                i.create && i.create.bind(t)(s)
                        })
                },
            },
            eventsEmitter: {
                on: function (e, t, a) {
                    var i = this
                    if ("function" != typeof t) return i
                    var s = a ? "unshift" : "push"
                    return (
                        e.split(" ").forEach(function (e) {
                            i.eventsListeners[e] || (i.eventsListeners[e] = []),
                                i.eventsListeners[e][s](t)
                        }),
                        i
                    )
                },
                once: function (e, t, a) {
                    var i = this
                    if ("function" != typeof t) return i
                    function s() {
                        i.off(e, s), s.__emitterProxy && delete s.__emitterProxy
                        for (
                            var a = arguments.length, r = new Array(a), n = 0;
                            n < a;
                            n++
                        )
                            r[n] = arguments[n]
                        t.apply(i, r)
                    }
                    return (s.__emitterProxy = t), i.on(e, s, a)
                },
                onAny: function (e, t) {
                    var a = this
                    if ("function" != typeof e) return a
                    var i = t ? "unshift" : "push"
                    return (
                        a.eventsAnyListeners.indexOf(e) < 0 &&
                            a.eventsAnyListeners[i](e),
                        a
                    )
                },
                offAny: function (e) {
                    var t = this
                    if (!t.eventsAnyListeners) return t
                    var a = t.eventsAnyListeners.indexOf(e)
                    return a >= 0 && t.eventsAnyListeners.splice(a, 1), t
                },
                off: function (e, t) {
                    var a = this
                    return a.eventsListeners
                        ? (e.split(" ").forEach(function (e) {
                              void 0 === t
                                  ? (a.eventsListeners[e] = [])
                                  : a.eventsListeners[e] &&
                                    a.eventsListeners[e].forEach(function (
                                        i,
                                        s
                                    ) {
                                        ;(i === t ||
                                            (i.__emitterProxy &&
                                                i.__emitterProxy === t)) &&
                                            a.eventsListeners[e].splice(s, 1)
                                    })
                          }),
                          a)
                        : a
                },
                emit: function () {
                    var e,
                        t,
                        a,
                        i = this
                    if (!i.eventsListeners) return i
                    for (
                        var s = arguments.length, r = new Array(s), n = 0;
                        n < s;
                        n++
                    )
                        r[n] = arguments[n]
                    "string" == typeof r[0] || Array.isArray(r[0])
                        ? ((e = r[0]), (t = r.slice(1, r.length)), (a = i))
                        : ((e = r[0].events),
                          (t = r[0].data),
                          (a = r[0].context || i)),
                        t.unshift(a)
                    var l = Array.isArray(e) ? e : e.split(" ")
                    return (
                        l.forEach(function (e) {
                            i.eventsAnyListeners &&
                                i.eventsAnyListeners.length &&
                                i.eventsAnyListeners.forEach(function (i) {
                                    i.apply(a, [e].concat(t))
                                }),
                                i.eventsListeners &&
                                    i.eventsListeners[e] &&
                                    i.eventsListeners[e].forEach(function (e) {
                                        e.apply(a, t)
                                    })
                        }),
                        i
                    )
                },
            },
            update: {
                updateSize: function () {
                    var e,
                        t,
                        a = this,
                        i = a.$el
                    ;(e =
                        void 0 !== a.params.width && null !== a.params.width
                            ? a.params.width
                            : i[0].clientWidth),
                        (t =
                            void 0 !== a.params.height &&
                            null !== a.params.height
                                ? a.params.height
                                : i[0].clientHeight),
                        (0 === e && a.isHorizontal()) ||
                            (0 === t && a.isVertical()) ||
                            ((e =
                                e -
                                parseInt(i.css("padding-left") || 0, 10) -
                                parseInt(i.css("padding-right") || 0, 10)),
                            (t =
                                t -
                                parseInt(i.css("padding-top") || 0, 10) -
                                parseInt(i.css("padding-bottom") || 0, 10)),
                            Number.isNaN(e) && (e = 0),
                            Number.isNaN(t) && (t = 0),
                            S(a, {
                                width: e,
                                height: t,
                                size: a.isHorizontal() ? e : t,
                            }))
                },
                updateSlides: function () {
                    var e = this,
                        t = l(),
                        a = e.params,
                        i = e.$wrapperEl,
                        s = e.size,
                        r = e.rtlTranslate,
                        n = e.wrongRTL,
                        o = e.virtual && a.virtual.enabled,
                        d = o ? e.virtual.slides.length : e.slides.length,
                        p = i.children("." + e.params.slideClass),
                        u = o ? e.virtual.slides.length : p.length,
                        c = [],
                        h = [],
                        v = []
                    function f(e, t) {
                        return !a.cssMode || t !== p.length - 1
                    }
                    var m = a.slidesOffsetBefore
                    "function" == typeof m && (m = a.slidesOffsetBefore.call(e))
                    var g = a.slidesOffsetAfter
                    "function" == typeof g && (g = a.slidesOffsetAfter.call(e))
                    var y = e.snapGrid.length,
                        w = e.slidesGrid.length,
                        b = a.spaceBetween,
                        E = -m,
                        x = 0,
                        T = 0
                    if (void 0 !== s) {
                        var C, M
                        "string" == typeof b &&
                            b.indexOf("%") >= 0 &&
                            (b = (parseFloat(b.replace("%", "")) / 100) * s),
                            (e.virtualSize = -b),
                            r
                                ? p.css({ marginLeft: "", marginTop: "" })
                                : p.css({ marginRight: "", marginBottom: "" }),
                            a.slidesPerColumn > 1 &&
                                ((C =
                                    Math.floor(u / a.slidesPerColumn) ===
                                    u / e.params.slidesPerColumn
                                        ? u
                                        : Math.ceil(u / a.slidesPerColumn) *
                                          a.slidesPerColumn),
                                "auto" !== a.slidesPerView &&
                                    "row" === a.slidesPerColumnFill &&
                                    (C = Math.max(
                                        C,
                                        a.slidesPerView * a.slidesPerColumn
                                    )))
                        for (
                            var z,
                                P = a.slidesPerColumn,
                                k = C / P,
                                L = Math.floor(u / a.slidesPerColumn),
                                $ = 0;
                            $ < u;
                            $ += 1
                        ) {
                            M = 0
                            var I = p.eq($)
                            if (a.slidesPerColumn > 1) {
                                var O = void 0,
                                    A = void 0,
                                    D = void 0
                                if (
                                    "row" === a.slidesPerColumnFill &&
                                    a.slidesPerGroup > 1
                                ) {
                                    var G = Math.floor(
                                            $ /
                                                (a.slidesPerGroup *
                                                    a.slidesPerColumn)
                                        ),
                                        N =
                                            $ -
                                            a.slidesPerColumn *
                                                a.slidesPerGroup *
                                                G,
                                        B =
                                            0 === G
                                                ? a.slidesPerGroup
                                                : Math.min(
                                                      Math.ceil(
                                                          (u -
                                                              G *
                                                                  P *
                                                                  a.slidesPerGroup) /
                                                              P
                                                      ),
                                                      a.slidesPerGroup
                                                  )
                                    ;(O =
                                        (A =
                                            N -
                                            (D = Math.floor(N / B)) * B +
                                            G * a.slidesPerGroup) +
                                        (D * C) / P),
                                        I.css({
                                            "-webkit-box-ordinal-group": O,
                                            "-moz-box-ordinal-group": O,
                                            "-ms-flex-order": O,
                                            "-webkit-order": O,
                                            order: O,
                                        })
                                } else
                                    "column" === a.slidesPerColumnFill
                                        ? ((D =
                                              $ - (A = Math.floor($ / P)) * P),
                                          (A > L || (A === L && D === P - 1)) &&
                                              (D += 1) >= P &&
                                              ((D = 0), (A += 1)))
                                        : (A = $ - (D = Math.floor($ / k)) * k)
                                I.css(
                                    "margin-" +
                                        (e.isHorizontal() ? "top" : "left"),
                                    0 !== D &&
                                        a.spaceBetween &&
                                        a.spaceBetween + "px"
                                )
                            }
                            if ("none" !== I.css("display")) {
                                if ("auto" === a.slidesPerView) {
                                    var H = t.getComputedStyle(I[0], null),
                                        X = I[0].style.transform,
                                        Y = I[0].style.webkitTransform
                                    if (
                                        (X && (I[0].style.transform = "none"),
                                        Y &&
                                            (I[0].style.webkitTransform =
                                                "none"),
                                        a.roundLengths)
                                    )
                                        M = e.isHorizontal()
                                            ? I.outerWidth(!0)
                                            : I.outerHeight(!0)
                                    else if (e.isHorizontal()) {
                                        var V = parseFloat(
                                                H.getPropertyValue("width") || 0
                                            ),
                                            F = parseFloat(
                                                H.getPropertyValue(
                                                    "padding-left"
                                                ) || 0
                                            ),
                                            R = parseFloat(
                                                H.getPropertyValue(
                                                    "padding-right"
                                                ) || 0
                                            ),
                                            W = parseFloat(
                                                H.getPropertyValue(
                                                    "margin-left"
                                                ) || 0
                                            ),
                                            q = parseFloat(
                                                H.getPropertyValue(
                                                    "margin-right"
                                                ) || 0
                                            ),
                                            j = H.getPropertyValue("box-sizing")
                                        if (j && "border-box" === j)
                                            M = V + W + q
                                        else {
                                            var _ = I[0],
                                                U = _.clientWidth
                                            M =
                                                V +
                                                F +
                                                R +
                                                W +
                                                q +
                                                (_.offsetWidth - U)
                                        }
                                    } else {
                                        var K = parseFloat(
                                                H.getPropertyValue("height") ||
                                                    0
                                            ),
                                            Z = parseFloat(
                                                H.getPropertyValue(
                                                    "padding-top"
                                                ) || 0
                                            ),
                                            J = parseFloat(
                                                H.getPropertyValue(
                                                    "padding-bottom"
                                                ) || 0
                                            ),
                                            Q = parseFloat(
                                                H.getPropertyValue(
                                                    "margin-top"
                                                ) || 0
                                            ),
                                            ee = parseFloat(
                                                H.getPropertyValue(
                                                    "margin-bottom"
                                                ) || 0
                                            ),
                                            te =
                                                H.getPropertyValue("box-sizing")
                                        if (te && "border-box" === te)
                                            M = K + Q + ee
                                        else {
                                            var ae = I[0],
                                                ie = ae.clientHeight
                                            M =
                                                K +
                                                Z +
                                                J +
                                                Q +
                                                ee +
                                                (ae.offsetHeight - ie)
                                        }
                                    }
                                    X && (I[0].style.transform = X),
                                        Y && (I[0].style.webkitTransform = Y),
                                        a.roundLengths && (M = Math.floor(M))
                                } else
                                    (M =
                                        (s - (a.slidesPerView - 1) * b) /
                                        a.slidesPerView),
                                        a.roundLengths && (M = Math.floor(M)),
                                        p[$] &&
                                            (e.isHorizontal()
                                                ? (p[$].style.width = M + "px")
                                                : (p[$].style.height =
                                                      M + "px"))
                                p[$] && (p[$].swiperSlideSize = M),
                                    v.push(M),
                                    a.centeredSlides
                                        ? ((E = E + M / 2 + x / 2 + b),
                                          0 === x &&
                                              0 !== $ &&
                                              (E = E - s / 2 - b),
                                          0 === $ && (E = E - s / 2 - b),
                                          Math.abs(E) < 0.001 && (E = 0),
                                          a.roundLengths && (E = Math.floor(E)),
                                          T % a.slidesPerGroup == 0 &&
                                              c.push(E),
                                          h.push(E))
                                        : (a.roundLengths &&
                                              (E = Math.floor(E)),
                                          (T -
                                              Math.min(
                                                  e.params.slidesPerGroupSkip,
                                                  T
                                              )) %
                                              e.params.slidesPerGroup ==
                                              0 && c.push(E),
                                          h.push(E),
                                          (E = E + M + b)),
                                    (e.virtualSize += M + b),
                                    (x = M),
                                    (T += 1)
                            }
                        }
                        if (
                            ((e.virtualSize = Math.max(e.virtualSize, s) + g),
                            r &&
                                n &&
                                ("slide" === a.effect ||
                                    "coverflow" === a.effect) &&
                                i.css({
                                    width:
                                        e.virtualSize + a.spaceBetween + "px",
                                }),
                            a.setWrapperSize &&
                                (e.isHorizontal()
                                    ? i.css({
                                          width:
                                              e.virtualSize +
                                              a.spaceBetween +
                                              "px",
                                      })
                                    : i.css({
                                          height:
                                              e.virtualSize +
                                              a.spaceBetween +
                                              "px",
                                      })),
                            a.slidesPerColumn > 1 &&
                                ((e.virtualSize = (M + a.spaceBetween) * C),
                                (e.virtualSize =
                                    Math.ceil(
                                        e.virtualSize / a.slidesPerColumn
                                    ) - a.spaceBetween),
                                e.isHorizontal()
                                    ? i.css({
                                          width:
                                              e.virtualSize +
                                              a.spaceBetween +
                                              "px",
                                      })
                                    : i.css({
                                          height:
                                              e.virtualSize +
                                              a.spaceBetween +
                                              "px",
                                      }),
                                a.centeredSlides))
                        ) {
                            z = []
                            for (var se = 0; se < c.length; se += 1) {
                                var re = c[se]
                                a.roundLengths && (re = Math.floor(re)),
                                    c[se] < e.virtualSize + c[0] && z.push(re)
                            }
                            c = z
                        }
                        if (!a.centeredSlides) {
                            z = []
                            for (var ne = 0; ne < c.length; ne += 1) {
                                var le = c[ne]
                                a.roundLengths && (le = Math.floor(le)),
                                    c[ne] <= e.virtualSize - s && z.push(le)
                            }
                            ;(c = z),
                                Math.floor(e.virtualSize - s) -
                                    Math.floor(c[c.length - 1]) >
                                    1 && c.push(e.virtualSize - s)
                        }
                        if (
                            (0 === c.length && (c = [0]),
                            0 !== a.spaceBetween &&
                                (e.isHorizontal()
                                    ? r
                                        ? p
                                              .filter(f)
                                              .css({ marginLeft: b + "px" })
                                        : p
                                              .filter(f)
                                              .css({ marginRight: b + "px" })
                                    : p
                                          .filter(f)
                                          .css({ marginBottom: b + "px" })),
                            a.centeredSlides && a.centeredSlidesBounds)
                        ) {
                            var oe = 0
                            v.forEach(function (e) {
                                oe += e + (a.spaceBetween ? a.spaceBetween : 0)
                            })
                            var de = (oe -= a.spaceBetween) - s
                            c = c.map(function (e) {
                                return e < 0 ? -m : e > de ? de + g : e
                            })
                        }
                        if (a.centerInsufficientSlides) {
                            var pe = 0
                            if (
                                (v.forEach(function (e) {
                                    pe +=
                                        e +
                                        (a.spaceBetween ? a.spaceBetween : 0)
                                }),
                                (pe -= a.spaceBetween) < s)
                            ) {
                                var ue = (s - pe) / 2
                                c.forEach(function (e, t) {
                                    c[t] = e - ue
                                }),
                                    h.forEach(function (e, t) {
                                        h[t] = e + ue
                                    })
                            }
                        }
                        S(e, {
                            slides: p,
                            snapGrid: c,
                            slidesGrid: h,
                            slidesSizesGrid: v,
                        }),
                            u !== d && e.emit("slidesLengthChange"),
                            c.length !== y &&
                                (e.params.watchOverflow && e.checkOverflow(),
                                e.emit("snapGridLengthChange")),
                            h.length !== w && e.emit("slidesGridLengthChange"),
                            (a.watchSlidesProgress ||
                                a.watchSlidesVisibility) &&
                                e.updateSlidesOffset()
                    }
                },
                updateAutoHeight: function (e) {
                    var t,
                        a = this,
                        i = [],
                        s = 0
                    if (
                        ("number" == typeof e
                            ? a.setTransition(e)
                            : !0 === e && a.setTransition(a.params.speed),
                        "auto" !== a.params.slidesPerView &&
                            a.params.slidesPerView > 1)
                    )
                        if (a.params.centeredSlides)
                            a.visibleSlides.each(function (e) {
                                i.push(e)
                            })
                        else
                            for (
                                t = 0;
                                t < Math.ceil(a.params.slidesPerView);
                                t += 1
                            ) {
                                var r = a.activeIndex + t
                                if (r > a.slides.length) break
                                i.push(a.slides.eq(r)[0])
                            }
                    else i.push(a.slides.eq(a.activeIndex)[0])
                    for (t = 0; t < i.length; t += 1)
                        if (void 0 !== i[t]) {
                            var n = i[t].offsetHeight
                            s = n > s ? n : s
                        }
                    s && a.$wrapperEl.css("height", s + "px")
                },
                updateSlidesOffset: function () {
                    for (var e = this.slides, t = 0; t < e.length; t += 1)
                        e[t].swiperSlideOffset = this.isHorizontal()
                            ? e[t].offsetLeft
                            : e[t].offsetTop
                },
                updateSlidesProgress: function (e) {
                    void 0 === e && (e = (this && this.translate) || 0)
                    var t = this,
                        a = t.params,
                        i = t.slides,
                        s = t.rtlTranslate
                    if (0 !== i.length) {
                        void 0 === i[0].swiperSlideOffset &&
                            t.updateSlidesOffset()
                        var r = -e
                        s && (r = e),
                            i.removeClass(a.slideVisibleClass),
                            (t.visibleSlidesIndexes = []),
                            (t.visibleSlides = [])
                        for (var n = 0; n < i.length; n += 1) {
                            var l = i[n],
                                o =
                                    (r +
                                        (a.centeredSlides
                                            ? t.minTranslate()
                                            : 0) -
                                        l.swiperSlideOffset) /
                                    (l.swiperSlideSize + a.spaceBetween)
                            if (
                                a.watchSlidesVisibility ||
                                (a.centeredSlides && a.autoHeight)
                            ) {
                                var d = -(r - l.swiperSlideOffset),
                                    p = d + t.slidesSizesGrid[n]
                                ;((d >= 0 && d < t.size - 1) ||
                                    (p > 1 && p <= t.size) ||
                                    (d <= 0 && p >= t.size)) &&
                                    (t.visibleSlides.push(l),
                                    t.visibleSlidesIndexes.push(n),
                                    i.eq(n).addClass(a.slideVisibleClass))
                            }
                            l.progress = s ? -o : o
                        }
                        t.visibleSlides = m(t.visibleSlides)
                    }
                },
                updateProgress: function (e) {
                    var t = this
                    if (void 0 === e) {
                        var a = t.rtlTranslate ? -1 : 1
                        e = (t && t.translate && t.translate * a) || 0
                    }
                    var i = t.params,
                        s = t.maxTranslate() - t.minTranslate(),
                        r = t.progress,
                        n = t.isBeginning,
                        l = t.isEnd,
                        o = n,
                        d = l
                    0 === s
                        ? ((r = 0), (n = !0), (l = !0))
                        : ((n = (r = (e - t.minTranslate()) / s) <= 0),
                          (l = r >= 1)),
                        S(t, { progress: r, isBeginning: n, isEnd: l }),
                        (i.watchSlidesProgress ||
                            i.watchSlidesVisibility ||
                            (i.centeredSlides && i.autoHeight)) &&
                            t.updateSlidesProgress(e),
                        n && !o && t.emit("reachBeginning toEdge"),
                        l && !d && t.emit("reachEnd toEdge"),
                        ((o && !n) || (d && !l)) && t.emit("fromEdge"),
                        t.emit("progress", r)
                },
                updateSlidesClasses: function () {
                    var e,
                        t = this,
                        a = t.slides,
                        i = t.params,
                        s = t.$wrapperEl,
                        r = t.activeIndex,
                        n = t.realIndex,
                        l = t.virtual && i.virtual.enabled
                    a.removeClass(
                        i.slideActiveClass +
                            " " +
                            i.slideNextClass +
                            " " +
                            i.slidePrevClass +
                            " " +
                            i.slideDuplicateActiveClass +
                            " " +
                            i.slideDuplicateNextClass +
                            " " +
                            i.slideDuplicatePrevClass
                    ),
                        (e = l
                            ? t.$wrapperEl.find(
                                  "." +
                                      i.slideClass +
                                      '[data-swiper-slide-index="' +
                                      r +
                                      '"]'
                              )
                            : a.eq(r)).addClass(i.slideActiveClass),
                        i.loop &&
                            (e.hasClass(i.slideDuplicateClass)
                                ? s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              ":not(." +
                                              i.slideDuplicateClass +
                                              ')[data-swiper-slide-index="' +
                                              n +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicateActiveClass)
                                : s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              "." +
                                              i.slideDuplicateClass +
                                              '[data-swiper-slide-index="' +
                                              n +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicateActiveClass))
                    var o = e
                        .nextAll("." + i.slideClass)
                        .eq(0)
                        .addClass(i.slideNextClass)
                    i.loop &&
                        0 === o.length &&
                        (o = a.eq(0)).addClass(i.slideNextClass)
                    var d = e
                        .prevAll("." + i.slideClass)
                        .eq(0)
                        .addClass(i.slidePrevClass)
                    i.loop &&
                        0 === d.length &&
                        (d = a.eq(-1)).addClass(i.slidePrevClass),
                        i.loop &&
                            (o.hasClass(i.slideDuplicateClass)
                                ? s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              ":not(." +
                                              i.slideDuplicateClass +
                                              ')[data-swiper-slide-index="' +
                                              o.attr(
                                                  "data-swiper-slide-index"
                                              ) +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicateNextClass)
                                : s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              "." +
                                              i.slideDuplicateClass +
                                              '[data-swiper-slide-index="' +
                                              o.attr(
                                                  "data-swiper-slide-index"
                                              ) +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicateNextClass),
                            d.hasClass(i.slideDuplicateClass)
                                ? s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              ":not(." +
                                              i.slideDuplicateClass +
                                              ')[data-swiper-slide-index="' +
                                              d.attr(
                                                  "data-swiper-slide-index"
                                              ) +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicatePrevClass)
                                : s
                                      .children(
                                          "." +
                                              i.slideClass +
                                              "." +
                                              i.slideDuplicateClass +
                                              '[data-swiper-slide-index="' +
                                              d.attr(
                                                  "data-swiper-slide-index"
                                              ) +
                                              '"]'
                                      )
                                      .addClass(i.slideDuplicatePrevClass)),
                        t.emitSlidesClasses()
                },
                updateActiveIndex: function (e) {
                    var t,
                        a = this,
                        i = a.rtlTranslate ? a.translate : -a.translate,
                        s = a.slidesGrid,
                        r = a.snapGrid,
                        n = a.params,
                        l = a.activeIndex,
                        o = a.realIndex,
                        d = a.snapIndex,
                        p = e
                    if (void 0 === p) {
                        for (var u = 0; u < s.length; u += 1)
                            void 0 !== s[u + 1]
                                ? i >= s[u] &&
                                  i < s[u + 1] - (s[u + 1] - s[u]) / 2
                                    ? (p = u)
                                    : i >= s[u] && i < s[u + 1] && (p = u + 1)
                                : i >= s[u] && (p = u)
                        n.normalizeSlideIndex &&
                            (p < 0 || void 0 === p) &&
                            (p = 0)
                    }
                    if (r.indexOf(i) >= 0) t = r.indexOf(i)
                    else {
                        var c = Math.min(n.slidesPerGroupSkip, p)
                        t = c + Math.floor((p - c) / n.slidesPerGroup)
                    }
                    if ((t >= r.length && (t = r.length - 1), p !== l)) {
                        var h = parseInt(
                            a.slides.eq(p).attr("data-swiper-slide-index") || p,
                            10
                        )
                        S(a, {
                            snapIndex: t,
                            realIndex: h,
                            previousIndex: l,
                            activeIndex: p,
                        }),
                            a.emit("activeIndexChange"),
                            a.emit("snapIndexChange"),
                            o !== h && a.emit("realIndexChange"),
                            (a.initialized || a.params.runCallbacksOnInit) &&
                                a.emit("slideChange")
                    } else
                        t !== d &&
                            ((a.snapIndex = t), a.emit("snapIndexChange"))
                },
                updateClickedSlide: function (e) {
                    var t = this,
                        a = t.params,
                        i = m(e.target).closest("." + a.slideClass)[0],
                        s = !1
                    if (i)
                        for (var r = 0; r < t.slides.length; r += 1)
                            t.slides[r] === i && (s = !0)
                    if (!i || !s)
                        return (
                            (t.clickedSlide = void 0),
                            void (t.clickedIndex = void 0)
                        )
                    ;(t.clickedSlide = i),
                        t.virtual && t.params.virtual.enabled
                            ? (t.clickedIndex = parseInt(
                                  m(i).attr("data-swiper-slide-index"),
                                  10
                              ))
                            : (t.clickedIndex = m(i).index()),
                        a.slideToClickedSlide &&
                            void 0 !== t.clickedIndex &&
                            t.clickedIndex !== t.activeIndex &&
                            t.slideToClickedSlide()
                },
            },
            translate: {
                getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y")
                    var t = this,
                        a = t.params,
                        i = t.rtlTranslate,
                        s = t.translate,
                        r = t.$wrapperEl
                    if (a.virtualTranslate) return i ? -s : s
                    if (a.cssMode) return s
                    var n = T(r[0], e)
                    return i && (n = -n), n || 0
                },
                setTranslate: function (e, t) {
                    var a = this,
                        i = a.rtlTranslate,
                        s = a.params,
                        r = a.$wrapperEl,
                        n = a.wrapperEl,
                        l = a.progress,
                        o = 0,
                        d = 0
                    a.isHorizontal() ? (o = i ? -e : e) : (d = e),
                        s.roundLengths &&
                            ((o = Math.floor(o)), (d = Math.floor(d))),
                        s.cssMode
                            ? (n[
                                  a.isHorizontal() ? "scrollLeft" : "scrollTop"
                              ] = a.isHorizontal() ? -o : -d)
                            : s.virtualTranslate ||
                              r.transform(
                                  "translate3d(" + o + "px, " + d + "px, 0px)"
                              ),
                        (a.previousTranslate = a.translate),
                        (a.translate = a.isHorizontal() ? o : d)
                    var p = a.maxTranslate() - a.minTranslate()
                    ;(0 === p ? 0 : (e - a.minTranslate()) / p) !== l &&
                        a.updateProgress(e),
                        a.emit("setTranslate", a.translate, t)
                },
                minTranslate: function () {
                    return -this.snapGrid[0]
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function (e, t, a, i, s) {
                    void 0 === e && (e = 0),
                        void 0 === t && (t = this.params.speed),
                        void 0 === a && (a = !0),
                        void 0 === i && (i = !0)
                    var r = this,
                        n = r.params,
                        l = r.wrapperEl
                    if (r.animating && n.preventInteractionOnTransition)
                        return !1
                    var o,
                        d = r.minTranslate(),
                        p = r.maxTranslate()
                    if (
                        ((o = i && e > d ? d : i && e < p ? p : e),
                        r.updateProgress(o),
                        n.cssMode)
                    ) {
                        var u,
                            c = r.isHorizontal()
                        if (0 === t) l[c ? "scrollLeft" : "scrollTop"] = -o
                        else if (l.scrollTo)
                            l.scrollTo(
                                (((u = {})[c ? "left" : "top"] = -o),
                                (u.behavior = "smooth"),
                                u)
                            )
                        else l[c ? "scrollLeft" : "scrollTop"] = -o
                        return !0
                    }
                    return (
                        0 === t
                            ? (r.setTransition(0),
                              r.setTranslate(o),
                              a &&
                                  (r.emit("beforeTransitionStart", t, s),
                                  r.emit("transitionEnd")))
                            : (r.setTransition(t),
                              r.setTranslate(o),
                              a &&
                                  (r.emit("beforeTransitionStart", t, s),
                                  r.emit("transitionStart")),
                              r.animating ||
                                  ((r.animating = !0),
                                  r.onTranslateToWrapperTransitionEnd ||
                                      (r.onTranslateToWrapperTransitionEnd =
                                          function (e) {
                                              r &&
                                                  !r.destroyed &&
                                                  e.target === this &&
                                                  (r.$wrapperEl[0].removeEventListener(
                                                      "transitionend",
                                                      r.onTranslateToWrapperTransitionEnd
                                                  ),
                                                  r.$wrapperEl[0].removeEventListener(
                                                      "webkitTransitionEnd",
                                                      r.onTranslateToWrapperTransitionEnd
                                                  ),
                                                  (r.onTranslateToWrapperTransitionEnd =
                                                      null),
                                                  delete r.onTranslateToWrapperTransitionEnd,
                                                  a && r.emit("transitionEnd"))
                                          }),
                                  r.$wrapperEl[0].addEventListener(
                                      "transitionend",
                                      r.onTranslateToWrapperTransitionEnd
                                  ),
                                  r.$wrapperEl[0].addEventListener(
                                      "webkitTransitionEnd",
                                      r.onTranslateToWrapperTransitionEnd
                                  ))),
                        !0
                    )
                },
            },
            transition: {
                setTransition: function (e, t) {
                    var a = this
                    a.params.cssMode || a.$wrapperEl.transition(e),
                        a.emit("setTransition", e, t)
                },
                transitionStart: function (e, t) {
                    void 0 === e && (e = !0)
                    var a = this,
                        i = a.activeIndex,
                        s = a.params,
                        r = a.previousIndex
                    if (!s.cssMode) {
                        s.autoHeight && a.updateAutoHeight()
                        var n = t
                        if (
                            (n ||
                                (n = i > r ? "next" : i < r ? "prev" : "reset"),
                            a.emit("transitionStart"),
                            e && i !== r)
                        ) {
                            if ("reset" === n)
                                return void a.emit("slideResetTransitionStart")
                            a.emit("slideChangeTransitionStart"),
                                "next" === n
                                    ? a.emit("slideNextTransitionStart")
                                    : a.emit("slidePrevTransitionStart")
                        }
                    }
                },
                transitionEnd: function (e, t) {
                    void 0 === e && (e = !0)
                    var a = this,
                        i = a.activeIndex,
                        s = a.previousIndex,
                        r = a.params
                    if (((a.animating = !1), !r.cssMode)) {
                        a.setTransition(0)
                        var n = t
                        if (
                            (n ||
                                (n = i > s ? "next" : i < s ? "prev" : "reset"),
                            a.emit("transitionEnd"),
                            e && i !== s)
                        ) {
                            if ("reset" === n)
                                return void a.emit("slideResetTransitionEnd")
                            a.emit("slideChangeTransitionEnd"),
                                "next" === n
                                    ? a.emit("slideNextTransitionEnd")
                                    : a.emit("slidePrevTransitionEnd")
                        }
                    }
                },
            },
            slide: {
                slideTo: function (e, t, a, i) {
                    if (
                        (void 0 === e && (e = 0),
                        void 0 === t && (t = this.params.speed),
                        void 0 === a && (a = !0),
                        "number" != typeof e && "string" != typeof e)
                    )
                        throw new Error(
                            "The 'index' argument cannot have type other than 'number' or 'string'. [" +
                                typeof e +
                                "] given."
                        )
                    if ("string" == typeof e) {
                        var s = parseInt(e, 10)
                        if (!isFinite(s))
                            throw new Error(
                                "The passed-in 'index' (string) couldn't be converted to 'number'. [" +
                                    e +
                                    "] given."
                            )
                        e = s
                    }
                    var r = this,
                        n = e
                    n < 0 && (n = 0)
                    var l = r.params,
                        o = r.snapGrid,
                        d = r.slidesGrid,
                        p = r.previousIndex,
                        u = r.activeIndex,
                        c = r.rtlTranslate,
                        h = r.wrapperEl
                    if (r.animating && l.preventInteractionOnTransition)
                        return !1
                    var v = Math.min(r.params.slidesPerGroupSkip, n),
                        f = v + Math.floor((n - v) / r.params.slidesPerGroup)
                    f >= o.length && (f = o.length - 1),
                        (u || l.initialSlide || 0) === (p || 0) &&
                            a &&
                            r.emit("beforeSlideChangeStart")
                    var m,
                        g = -o[f]
                    if ((r.updateProgress(g), l.normalizeSlideIndex))
                        for (var y = 0; y < d.length; y += 1) {
                            var w = -Math.floor(100 * g),
                                b = Math.floor(100 * d[y]),
                                E = Math.floor(100 * d[y + 1])
                            void 0 !== d[y + 1]
                                ? w >= b && w < E - (E - b) / 2
                                    ? (n = y)
                                    : w >= b && w < E && (n = y + 1)
                                : w >= b && (n = y)
                        }
                    if (r.initialized && n !== u) {
                        if (
                            !r.allowSlideNext &&
                            g < r.translate &&
                            g < r.minTranslate()
                        )
                            return !1
                        if (
                            !r.allowSlidePrev &&
                            g > r.translate &&
                            g > r.maxTranslate() &&
                            (u || 0) !== n
                        )
                            return !1
                    }
                    if (
                        ((m = n > u ? "next" : n < u ? "prev" : "reset"),
                        (c && -g === r.translate) || (!c && g === r.translate))
                    )
                        return (
                            r.updateActiveIndex(n),
                            l.autoHeight && r.updateAutoHeight(),
                            r.updateSlidesClasses(),
                            "slide" !== l.effect && r.setTranslate(g),
                            "reset" !== m &&
                                (r.transitionStart(a, m),
                                r.transitionEnd(a, m)),
                            !1
                        )
                    if (l.cssMode) {
                        var x,
                            T = r.isHorizontal(),
                            C = -g
                        if (
                            (c && (C = h.scrollWidth - h.offsetWidth - C),
                            0 === t)
                        )
                            h[T ? "scrollLeft" : "scrollTop"] = C
                        else if (h.scrollTo)
                            h.scrollTo(
                                (((x = {})[T ? "left" : "top"] = C),
                                (x.behavior = "smooth"),
                                x)
                            )
                        else h[T ? "scrollLeft" : "scrollTop"] = C
                        return !0
                    }
                    return (
                        0 === t
                            ? (r.setTransition(0),
                              r.setTranslate(g),
                              r.updateActiveIndex(n),
                              r.updateSlidesClasses(),
                              r.emit("beforeTransitionStart", t, i),
                              r.transitionStart(a, m),
                              r.transitionEnd(a, m))
                            : (r.setTransition(t),
                              r.setTranslate(g),
                              r.updateActiveIndex(n),
                              r.updateSlidesClasses(),
                              r.emit("beforeTransitionStart", t, i),
                              r.transitionStart(a, m),
                              r.animating ||
                                  ((r.animating = !0),
                                  r.onSlideToWrapperTransitionEnd ||
                                      (r.onSlideToWrapperTransitionEnd =
                                          function (e) {
                                              r &&
                                                  !r.destroyed &&
                                                  e.target === this &&
                                                  (r.$wrapperEl[0].removeEventListener(
                                                      "transitionend",
                                                      r.onSlideToWrapperTransitionEnd
                                                  ),
                                                  r.$wrapperEl[0].removeEventListener(
                                                      "webkitTransitionEnd",
                                                      r.onSlideToWrapperTransitionEnd
                                                  ),
                                                  (r.onSlideToWrapperTransitionEnd =
                                                      null),
                                                  delete r.onSlideToWrapperTransitionEnd,
                                                  r.transitionEnd(a, m))
                                          }),
                                  r.$wrapperEl[0].addEventListener(
                                      "transitionend",
                                      r.onSlideToWrapperTransitionEnd
                                  ),
                                  r.$wrapperEl[0].addEventListener(
                                      "webkitTransitionEnd",
                                      r.onSlideToWrapperTransitionEnd
                                  ))),
                        !0
                    )
                },
                slideToLoop: function (e, t, a, i) {
                    void 0 === e && (e = 0),
                        void 0 === t && (t = this.params.speed),
                        void 0 === a && (a = !0)
                    var s = this,
                        r = e
                    return (
                        s.params.loop && (r += s.loopedSlides),
                        s.slideTo(r, t, a, i)
                    )
                },
                slideNext: function (e, t, a) {
                    void 0 === e && (e = this.params.speed),
                        void 0 === t && (t = !0)
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n =
                            i.activeIndex < s.slidesPerGroupSkip
                                ? 1
                                : s.slidesPerGroup
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1
                        i.loopFix(),
                            (i._clientLeft = i.$wrapperEl[0].clientLeft)
                    }
                    return i.slideTo(i.activeIndex + n, e, t, a)
                },
                slidePrev: function (e, t, a) {
                    void 0 === e && (e = this.params.speed),
                        void 0 === t && (t = !0)
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n = i.snapGrid,
                        l = i.slidesGrid,
                        o = i.rtlTranslate
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1
                        i.loopFix(),
                            (i._clientLeft = i.$wrapperEl[0].clientLeft)
                    }
                    function d(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    var p = d(o ? i.translate : -i.translate),
                        u = n.map(function (e) {
                            return d(e)
                        })
                    n[u.indexOf(p)]
                    var c,
                        h = n[u.indexOf(p) - 1]
                    return (
                        void 0 === h &&
                            s.cssMode &&
                            n.forEach(function (e) {
                                !h && p >= e && (h = e)
                            }),
                        void 0 !== h &&
                            (c = l.indexOf(h)) < 0 &&
                            (c = i.activeIndex - 1),
                        i.slideTo(c, e, t, a)
                    )
                },
                slideReset: function (e, t, a) {
                    return (
                        void 0 === e && (e = this.params.speed),
                        void 0 === t && (t = !0),
                        this.slideTo(this.activeIndex, e, t, a)
                    )
                },
                slideToClosest: function (e, t, a, i) {
                    void 0 === e && (e = this.params.speed),
                        void 0 === t && (t = !0),
                        void 0 === i && (i = 0.5)
                    var s = this,
                        r = s.activeIndex,
                        n = Math.min(s.params.slidesPerGroupSkip, r),
                        l = n + Math.floor((r - n) / s.params.slidesPerGroup),
                        o = s.rtlTranslate ? s.translate : -s.translate
                    if (o >= s.snapGrid[l]) {
                        var d = s.snapGrid[l]
                        o - d > (s.snapGrid[l + 1] - d) * i &&
                            (r += s.params.slidesPerGroup)
                    } else {
                        var p = s.snapGrid[l - 1]
                        o - p <= (s.snapGrid[l] - p) * i &&
                            (r -= s.params.slidesPerGroup)
                    }
                    return (
                        (r = Math.max(r, 0)),
                        (r = Math.min(r, s.slidesGrid.length - 1)),
                        s.slideTo(r, e, t, a)
                    )
                },
                slideToClickedSlide: function () {
                    var e,
                        t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s =
                            "auto" === a.slidesPerView
                                ? t.slidesPerViewDynamic()
                                : a.slidesPerView,
                        r = t.clickedIndex
                    if (a.loop) {
                        if (t.animating) return
                        ;(e = parseInt(
                            m(t.clickedSlide).attr("data-swiper-slide-index"),
                            10
                        )),
                            a.centeredSlides
                                ? r < t.loopedSlides - s / 2 ||
                                  r > t.slides.length - t.loopedSlides + s / 2
                                    ? (t.loopFix(),
                                      (r = i
                                          .children(
                                              "." +
                                                  a.slideClass +
                                                  '[data-swiper-slide-index="' +
                                                  e +
                                                  '"]:not(.' +
                                                  a.slideDuplicateClass +
                                                  ")"
                                          )
                                          .eq(0)
                                          .index()),
                                      E(function () {
                                          t.slideTo(r)
                                      }))
                                    : t.slideTo(r)
                                : r > t.slides.length - s
                                ? (t.loopFix(),
                                  (r = i
                                      .children(
                                          "." +
                                              a.slideClass +
                                              '[data-swiper-slide-index="' +
                                              e +
                                              '"]:not(.' +
                                              a.slideDuplicateClass +
                                              ")"
                                      )
                                      .eq(0)
                                      .index()),
                                  E(function () {
                                      t.slideTo(r)
                                  }))
                                : t.slideTo(r)
                    } else t.slideTo(r)
                },
            },
            loop: {
                loopCreate: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.$wrapperEl
                    i.children(
                        "." + a.slideClass + "." + a.slideDuplicateClass
                    ).remove()
                    var s = i.children("." + a.slideClass)
                    if (a.loopFillGroupWithBlank) {
                        var n = a.slidesPerGroup - (s.length % a.slidesPerGroup)
                        if (n !== a.slidesPerGroup) {
                            for (var l = 0; l < n; l += 1) {
                                var o = m(t.createElement("div")).addClass(
                                    a.slideClass + " " + a.slideBlankClass
                                )
                                i.append(o)
                            }
                            s = i.children("." + a.slideClass)
                        }
                    }
                    "auto" !== a.slidesPerView ||
                        a.loopedSlides ||
                        (a.loopedSlides = s.length),
                        (e.loopedSlides = Math.ceil(
                            parseFloat(a.loopedSlides || a.slidesPerView, 10)
                        )),
                        (e.loopedSlides += a.loopAdditionalSlides),
                        e.loopedSlides > s.length && (e.loopedSlides = s.length)
                    var d = [],
                        p = []
                    s.each(function (t, a) {
                        var i = m(t)
                        a < e.loopedSlides && p.push(t),
                            a < s.length &&
                                a >= s.length - e.loopedSlides &&
                                d.push(t),
                            i.attr("data-swiper-slide-index", a)
                    })
                    for (var u = 0; u < p.length; u += 1)
                        i.append(
                            m(p[u].cloneNode(!0)).addClass(
                                a.slideDuplicateClass
                            )
                        )
                    for (var c = d.length - 1; c >= 0; c -= 1)
                        i.prepend(
                            m(d[c].cloneNode(!0)).addClass(
                                a.slideDuplicateClass
                            )
                        )
                },
                loopFix: function () {
                    var e = this
                    e.emit("beforeLoopFix")
                    var t,
                        a = e.activeIndex,
                        i = e.slides,
                        s = e.loopedSlides,
                        r = e.allowSlidePrev,
                        n = e.allowSlideNext,
                        l = e.snapGrid,
                        o = e.rtlTranslate
                    ;(e.allowSlidePrev = !0), (e.allowSlideNext = !0)
                    var d = -l[a] - e.getTranslate()
                    if (a < s)
                        (t = i.length - 3 * s + a),
                            (t += s),
                            e.slideTo(t, 0, !1, !0) &&
                                0 !== d &&
                                e.setTranslate(
                                    (o ? -e.translate : e.translate) - d
                                )
                    else if (a >= i.length - s) {
                        ;(t = -i.length + a + s),
                            (t += s),
                            e.slideTo(t, 0, !1, !0) &&
                                0 !== d &&
                                e.setTranslate(
                                    (o ? -e.translate : e.translate) - d
                                )
                    }
                    ;(e.allowSlidePrev = r),
                        (e.allowSlideNext = n),
                        e.emit("loopFix")
                },
                loopDestroy: function () {
                    var e = this,
                        t = e.$wrapperEl,
                        a = e.params,
                        i = e.slides
                    t
                        .children(
                            "." +
                                a.slideClass +
                                "." +
                                a.slideDuplicateClass +
                                ",." +
                                a.slideClass +
                                "." +
                                a.slideBlankClass
                        )
                        .remove(),
                        i.removeAttr("data-swiper-slide-index")
                },
            },
            grabCursor: {
                setGrabCursor: function (e) {
                    var t = this
                    if (
                        !(
                            t.support.touch ||
                            !t.params.simulateTouch ||
                            (t.params.watchOverflow && t.isLocked) ||
                            t.params.cssMode
                        )
                    ) {
                        var a = t.el
                        ;(a.style.cursor = "move"),
                            (a.style.cursor = e
                                ? "-webkit-grabbing"
                                : "-webkit-grab"),
                            (a.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                            (a.style.cursor = e ? "grabbing" : "grab")
                    }
                },
                unsetGrabCursor: function () {
                    var e = this
                    e.support.touch ||
                        (e.params.watchOverflow && e.isLocked) ||
                        e.params.cssMode ||
                        (e.el.style.cursor = "")
                },
            },
            manipulation: {
                appendSlide: function (e) {
                    var t = this,
                        a = t.$wrapperEl,
                        i = t.params
                    if (
                        (i.loop && t.loopDestroy(),
                        "object" == typeof e && "length" in e)
                    )
                        for (var s = 0; s < e.length; s += 1)
                            e[s] && a.append(e[s])
                    else a.append(e)
                    i.loop && t.loopCreate(),
                        (i.observer && t.support.observer) || t.update()
                },
                prependSlide: function (e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex
                    a.loop && t.loopDestroy()
                    var r = s + 1
                    if ("object" == typeof e && "length" in e) {
                        for (var n = 0; n < e.length; n += 1)
                            e[n] && i.prepend(e[n])
                        r = s + e.length
                    } else i.prepend(e)
                    a.loop && t.loopCreate(),
                        (a.observer && t.support.observer) || t.update(),
                        t.slideTo(r, 0, !1)
                },
                addSlide: function (e, t) {
                    var a = this,
                        i = a.$wrapperEl,
                        s = a.params,
                        r = a.activeIndex
                    s.loop &&
                        ((r -= a.loopedSlides),
                        a.loopDestroy(),
                        (a.slides = i.children("." + s.slideClass)))
                    var n = a.slides.length
                    if (e <= 0) a.prependSlide(t)
                    else if (e >= n) a.appendSlide(t)
                    else {
                        for (
                            var l = r > e ? r + 1 : r, o = [], d = n - 1;
                            d >= e;
                            d -= 1
                        ) {
                            var p = a.slides.eq(d)
                            p.remove(), o.unshift(p)
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var u = 0; u < t.length; u += 1)
                                t[u] && i.append(t[u])
                            l = r > e ? r + t.length : r
                        } else i.append(t)
                        for (var c = 0; c < o.length; c += 1) i.append(o[c])
                        s.loop && a.loopCreate(),
                            (s.observer && a.support.observer) || a.update(),
                            s.loop
                                ? a.slideTo(l + a.loopedSlides, 0, !1)
                                : a.slideTo(l, 0, !1)
                    }
                },
                removeSlide: function (e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex
                    a.loop &&
                        ((s -= t.loopedSlides),
                        t.loopDestroy(),
                        (t.slides = i.children("." + a.slideClass)))
                    var r,
                        n = s
                    if ("object" == typeof e && "length" in e) {
                        for (var l = 0; l < e.length; l += 1)
                            (r = e[l]),
                                t.slides[r] && t.slides.eq(r).remove(),
                                r < n && (n -= 1)
                        n = Math.max(n, 0)
                    } else
                        (r = e),
                            t.slides[r] && t.slides.eq(r).remove(),
                            r < n && (n -= 1),
                            (n = Math.max(n, 0))
                    a.loop && t.loopCreate(),
                        (a.observer && t.support.observer) || t.update(),
                        a.loop
                            ? t.slideTo(n + t.loopedSlides, 0, !1)
                            : t.slideTo(n, 0, !1)
                },
                removeAllSlides: function () {
                    for (var e = [], t = 0; t < this.slides.length; t += 1)
                        e.push(t)
                    this.removeSlide(e)
                },
            },
            events: {
                attachEvents: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        l = e.device,
                        o = e.support
                    ;(e.onTouchStart = O.bind(e)),
                        (e.onTouchMove = A.bind(e)),
                        (e.onTouchEnd = D.bind(e)),
                        a.cssMode && (e.onScroll = B.bind(e)),
                        (e.onClick = N.bind(e))
                    var d = !!a.nested
                    if (!o.touch && o.pointerEvents)
                        s.addEventListener(i.start, e.onTouchStart, !1),
                            t.addEventListener(i.move, e.onTouchMove, d),
                            t.addEventListener(i.end, e.onTouchEnd, !1)
                    else {
                        if (o.touch) {
                            var p = !(
                                "touchstart" !== i.start ||
                                !o.passiveListener ||
                                !a.passiveListeners
                            ) && { passive: !0, capture: !1 }
                            s.addEventListener(i.start, e.onTouchStart, p),
                                s.addEventListener(
                                    i.move,
                                    e.onTouchMove,
                                    o.passiveListener
                                        ? { passive: !1, capture: d }
                                        : d
                                ),
                                s.addEventListener(i.end, e.onTouchEnd, p),
                                i.cancel &&
                                    s.addEventListener(
                                        i.cancel,
                                        e.onTouchEnd,
                                        p
                                    ),
                                H ||
                                    (t.addEventListener("touchstart", X),
                                    (H = !0))
                        }
                        ;((a.simulateTouch && !l.ios && !l.android) ||
                            (a.simulateTouch && !o.touch && l.ios)) &&
                            (s.addEventListener(
                                "mousedown",
                                e.onTouchStart,
                                !1
                            ),
                            t.addEventListener("mousemove", e.onTouchMove, d),
                            t.addEventListener("mouseup", e.onTouchEnd, !1))
                    }
                    ;(a.preventClicks || a.preventClicksPropagation) &&
                        s.addEventListener("click", e.onClick, !0),
                        a.cssMode && n.addEventListener("scroll", e.onScroll),
                        a.updateOnWindowResize
                            ? e.on(
                                  l.ios || l.android
                                      ? "resize orientationchange observerUpdate"
                                      : "resize observerUpdate",
                                  G,
                                  !0
                              )
                            : e.on("observerUpdate", G, !0)
                },
                detachEvents: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        l = e.device,
                        o = e.support,
                        d = !!a.nested
                    if (!o.touch && o.pointerEvents)
                        s.removeEventListener(i.start, e.onTouchStart, !1),
                            t.removeEventListener(i.move, e.onTouchMove, d),
                            t.removeEventListener(i.end, e.onTouchEnd, !1)
                    else {
                        if (o.touch) {
                            var p = !(
                                "onTouchStart" !== i.start ||
                                !o.passiveListener ||
                                !a.passiveListeners
                            ) && { passive: !0, capture: !1 }
                            s.removeEventListener(i.start, e.onTouchStart, p),
                                s.removeEventListener(i.move, e.onTouchMove, d),
                                s.removeEventListener(i.end, e.onTouchEnd, p),
                                i.cancel &&
                                    s.removeEventListener(
                                        i.cancel,
                                        e.onTouchEnd,
                                        p
                                    )
                        }
                        ;((a.simulateTouch && !l.ios && !l.android) ||
                            (a.simulateTouch && !o.touch && l.ios)) &&
                            (s.removeEventListener(
                                "mousedown",
                                e.onTouchStart,
                                !1
                            ),
                            t.removeEventListener(
                                "mousemove",
                                e.onTouchMove,
                                d
                            ),
                            t.removeEventListener("mouseup", e.onTouchEnd, !1))
                    }
                    ;(a.preventClicks || a.preventClicksPropagation) &&
                        s.removeEventListener("click", e.onClick, !0),
                        a.cssMode &&
                            n.removeEventListener("scroll", e.onScroll),
                        e.off(
                            l.ios || l.android
                                ? "resize orientationchange observerUpdate"
                                : "resize observerUpdate",
                            G
                        )
                },
            },
            breakpoints: {
                setBreakpoint: function () {
                    var e = this,
                        t = e.activeIndex,
                        a = e.initialized,
                        i = e.loopedSlides,
                        s = void 0 === i ? 0 : i,
                        r = e.params,
                        n = e.$el,
                        l = r.breakpoints
                    if (l && (!l || 0 !== Object.keys(l).length)) {
                        var o = e.getBreakpoint(l)
                        if (o && e.currentBreakpoint !== o) {
                            var d = o in l ? l[o] : void 0
                            d &&
                                [
                                    "slidesPerView",
                                    "spaceBetween",
                                    "slidesPerGroup",
                                    "slidesPerGroupSkip",
                                    "slidesPerColumn",
                                ].forEach(function (e) {
                                    var t = d[e]
                                    void 0 !== t &&
                                        (d[e] =
                                            "slidesPerView" !== e ||
                                            ("AUTO" !== t && "auto" !== t)
                                                ? "slidesPerView" === e
                                                    ? parseFloat(t)
                                                    : parseInt(t, 10)
                                                : "auto")
                                })
                            var p = d || e.originalParams,
                                u = r.slidesPerColumn > 1,
                                c = p.slidesPerColumn > 1
                            u && !c
                                ? (n.removeClass(
                                      r.containerModifierClass +
                                          "multirow " +
                                          r.containerModifierClass +
                                          "multirow-column"
                                  ),
                                  e.emitContainerClasses())
                                : !u &&
                                  c &&
                                  (n.addClass(
                                      r.containerModifierClass + "multirow"
                                  ),
                                  "column" === p.slidesPerColumnFill &&
                                      n.addClass(
                                          r.containerModifierClass +
                                              "multirow-column"
                                      ),
                                  e.emitContainerClasses())
                            var h = p.direction && p.direction !== r.direction,
                                v =
                                    r.loop &&
                                    (p.slidesPerView !== r.slidesPerView || h)
                            h && a && e.changeDirection(),
                                S(e.params, p),
                                S(e, {
                                    allowTouchMove: e.params.allowTouchMove,
                                    allowSlideNext: e.params.allowSlideNext,
                                    allowSlidePrev: e.params.allowSlidePrev,
                                }),
                                (e.currentBreakpoint = o),
                                e.emit("_beforeBreakpoint", p),
                                v &&
                                    a &&
                                    (e.loopDestroy(),
                                    e.loopCreate(),
                                    e.updateSlides(),
                                    e.slideTo(t - s + e.loopedSlides, 0, !1)),
                                e.emit("breakpoint", p)
                        }
                    }
                },
                getBreakpoint: function (e) {
                    var t = l()
                    if (e) {
                        var a = !1,
                            i = Object.keys(e).map(function (e) {
                                if (
                                    "string" == typeof e &&
                                    0 === e.indexOf("@")
                                ) {
                                    var a = parseFloat(e.substr(1))
                                    return {
                                        value: t.innerHeight * a,
                                        point: e,
                                    }
                                }
                                return { value: e, point: e }
                            })
                        i.sort(function (e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        })
                        for (var s = 0; s < i.length; s += 1) {
                            var r = i[s],
                                n = r.point
                            r.value <= t.innerWidth && (a = n)
                        }
                        return a || "max"
                    }
                },
            },
            checkOverflow: {
                checkOverflow: function () {
                    var e = this,
                        t = e.params,
                        a = e.isLocked,
                        i =
                            e.slides.length > 0 &&
                            t.slidesOffsetBefore +
                                t.spaceBetween * (e.slides.length - 1) +
                                e.slides[0].offsetWidth * e.slides.length
                    t.slidesOffsetBefore && t.slidesOffsetAfter && i
                        ? (e.isLocked = i <= e.size)
                        : (e.isLocked = 1 === e.snapGrid.length),
                        (e.allowSlideNext = !e.isLocked),
                        (e.allowSlidePrev = !e.isLocked),
                        a !== e.isLocked &&
                            e.emit(e.isLocked ? "lock" : "unlock"),
                        a &&
                            a !== e.isLocked &&
                            ((e.isEnd = !1),
                            e.navigation && e.navigation.update())
                },
            },
            classes: {
                addClasses: function () {
                    var e,
                        t,
                        a,
                        i = this,
                        s = i.classNames,
                        r = i.params,
                        n = i.rtl,
                        l = i.$el,
                        o = i.device,
                        d = i.support,
                        p =
                            ((e = [
                                "initialized",
                                r.direction,
                                {
                                    "pointer-events":
                                        d.pointerEvents && !d.touch,
                                },
                                { "free-mode": r.freeMode },
                                { autoheight: r.autoHeight },
                                { rtl: n },
                                { multirow: r.slidesPerColumn > 1 },
                                {
                                    "multirow-column":
                                        r.slidesPerColumn > 1 &&
                                        "column" === r.slidesPerColumnFill,
                                },
                                { android: o.android },
                                { ios: o.ios },
                                { "css-mode": r.cssMode },
                            ]),
                            (t = r.containerModifierClass),
                            (a = []),
                            e.forEach(function (e) {
                                "object" == typeof e
                                    ? Object.entries(e).forEach(function (e) {
                                          var i = e[0]
                                          e[1] && a.push(t + i)
                                      })
                                    : "string" == typeof e && a.push(t + e)
                            }),
                            a)
                    l.addClass([].concat(s, p).join(" ")),
                        i.emitContainerClasses()
                },
                removeClasses: function () {
                    var e = this,
                        t = e.$el,
                        a = e.classNames
                    t.removeClass(a.join(" ")), e.emitContainerClasses()
                },
            },
            images: {
                loadImage: function (e, t, a, i, s, r) {
                    var n,
                        o = l()
                    function d() {
                        r && r()
                    }
                    m(e).parent("picture")[0] || (e.complete && s)
                        ? d()
                        : t
                        ? (((n = new o.Image()).onload = d),
                          (n.onerror = d),
                          i && (n.sizes = i),
                          a && (n.srcset = a),
                          t && (n.src = t))
                        : d()
                },
                preloadImages: function () {
                    var e = this
                    function t() {
                        null != e &&
                            e &&
                            !e.destroyed &&
                            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                            e.imagesLoaded === e.imagesToLoad.length &&
                                (e.params.updateOnImagesReady && e.update(),
                                e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img")
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a]
                        e.loadImage(
                            i,
                            i.currentSrc || i.getAttribute("src"),
                            i.srcset || i.getAttribute("srcset"),
                            i.sizes || i.getAttribute("sizes"),
                            !0,
                            t
                        )
                    }
                },
            },
        },
        F = {},
        R = (function () {
            function t() {
                for (
                    var e, a, i = arguments.length, s = new Array(i), r = 0;
                    r < i;
                    r++
                )
                    s[r] = arguments[r]
                if (
                    (1 === s.length &&
                    s[0].constructor &&
                    s[0].constructor === Object
                        ? (a = s[0])
                        : ((e = s[0]), (a = s[1])),
                    a || (a = {}),
                    (a = S({}, a)),
                    e && !a.el && (a.el = e),
                    a.el && m(a.el).length > 1)
                ) {
                    var n = []
                    return (
                        m(a.el).each(function (e) {
                            var i = S({}, a, { el: e })
                            n.push(new t(i))
                        }),
                        n
                    )
                }
                var l = this
                ;(l.support = z()),
                    (l.device = P({ userAgent: a.userAgent })),
                    (l.browser = k()),
                    (l.eventsListeners = {}),
                    (l.eventsAnyListeners = []),
                    void 0 === l.modules && (l.modules = {}),
                    Object.keys(l.modules).forEach(function (e) {
                        var t = l.modules[e]
                        if (t.params) {
                            var i = Object.keys(t.params)[0],
                                s = t.params[i]
                            if ("object" != typeof s || null === s) return
                            if (!(i in a) || !("enabled" in s)) return
                            !0 === a[i] && (a[i] = { enabled: !0 }),
                                "object" != typeof a[i] ||
                                    "enabled" in a[i] ||
                                    (a[i].enabled = !0),
                                a[i] || (a[i] = { enabled: !1 })
                        }
                    })
                var o,
                    d,
                    p = S({}, Y)
                return (
                    l.useParams(p),
                    (l.params = S({}, p, F, a)),
                    (l.originalParams = S({}, l.params)),
                    (l.passedParams = S({}, a)),
                    l.params &&
                        l.params.on &&
                        Object.keys(l.params.on).forEach(function (e) {
                            l.on(e, l.params.on[e])
                        }),
                    l.params && l.params.onAny && l.onAny(l.params.onAny),
                    (l.$ = m),
                    S(l, {
                        el: e,
                        classNames: [],
                        slides: m(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === l.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === l.params.direction
                        },
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: l.params.allowSlideNext,
                        allowSlidePrev: l.params.allowSlidePrev,
                        touchEvents:
                            ((o = [
                                "touchstart",
                                "touchmove",
                                "touchend",
                                "touchcancel",
                            ]),
                            (d = ["mousedown", "mousemove", "mouseup"]),
                            l.support.pointerEvents &&
                                (d = [
                                    "pointerdown",
                                    "pointermove",
                                    "pointerup",
                                ]),
                            (l.touchEventsTouch = {
                                start: o[0],
                                move: o[1],
                                end: o[2],
                                cancel: o[3],
                            }),
                            (l.touchEventsDesktop = {
                                start: d[0],
                                move: d[1],
                                end: d[2],
                            }),
                            l.support.touch || !l.params.simulateTouch
                                ? l.touchEventsTouch
                                : l.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements:
                                "input, select, option, textarea, button, video, label",
                            lastClickTime: x(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0,
                        },
                        allowClick: !0,
                        allowTouchMove: l.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0,
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0,
                    }),
                    l.useModules(),
                    l.emit("_swiper"),
                    l.params.init && l.init(),
                    l
                )
            }
            var a,
                i,
                s,
                r = t.prototype
            return (
                (r.emitContainerClasses = function () {
                    var e = this
                    if (e.params._emitClasses && e.el) {
                        var t = e.el.className.split(" ").filter(function (t) {
                            return (
                                0 === t.indexOf("swiper-container") ||
                                0 === t.indexOf(e.params.containerModifierClass)
                            )
                        })
                        e.emit("_containerClasses", t.join(" "))
                    }
                }),
                (r.getSlideClasses = function (e) {
                    var t = this
                    return e.className
                        .split(" ")
                        .filter(function (e) {
                            return (
                                0 === e.indexOf("swiper-slide") ||
                                0 === e.indexOf(t.params.slideClass)
                            )
                        })
                        .join(" ")
                }),
                (r.emitSlidesClasses = function () {
                    var e = this
                    if (e.params._emitClasses && e.el) {
                        var t = []
                        e.slides.each(function (a) {
                            var i = e.getSlideClasses(a)
                            t.push({ slideEl: a, classNames: i }),
                                e.emit("_slideClass", a, i)
                        }),
                            e.emit("_slideClasses", t)
                    }
                }),
                (r.slidesPerViewDynamic = function () {
                    var e = this,
                        t = e.params,
                        a = e.slides,
                        i = e.slidesGrid,
                        s = e.size,
                        r = e.activeIndex,
                        n = 1
                    if (t.centeredSlides) {
                        for (
                            var l, o = a[r].swiperSlideSize, d = r + 1;
                            d < a.length;
                            d += 1
                        )
                            a[d] &&
                                !l &&
                                ((n += 1),
                                (o += a[d].swiperSlideSize) > s && (l = !0))
                        for (var p = r - 1; p >= 0; p -= 1)
                            a[p] &&
                                !l &&
                                ((n += 1),
                                (o += a[p].swiperSlideSize) > s && (l = !0))
                    } else
                        for (var u = r + 1; u < a.length; u += 1)
                            i[u] - i[r] < s && (n += 1)
                    return n
                }),
                (r.update = function () {
                    var e = this
                    if (e && !e.destroyed) {
                        var t = e.snapGrid,
                            a = e.params
                        a.breakpoints && e.setBreakpoint(),
                            e.updateSize(),
                            e.updateSlides(),
                            e.updateProgress(),
                            e.updateSlidesClasses(),
                            e.params.freeMode
                                ? (i(),
                                  e.params.autoHeight && e.updateAutoHeight())
                                : (("auto" === e.params.slidesPerView ||
                                      e.params.slidesPerView > 1) &&
                                  e.isEnd &&
                                  !e.params.centeredSlides
                                      ? e.slideTo(
                                            e.slides.length - 1,
                                            0,
                                            !1,
                                            !0
                                        )
                                      : e.slideTo(e.activeIndex, 0, !1, !0)) ||
                                  i(),
                            a.watchOverflow &&
                                t !== e.snapGrid &&
                                e.checkOverflow(),
                            e.emit("update")
                    }
                    function i() {
                        var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            a = Math.min(
                                Math.max(t, e.maxTranslate()),
                                e.minTranslate()
                            )
                        e.setTranslate(a),
                            e.updateActiveIndex(),
                            e.updateSlidesClasses()
                    }
                }),
                (r.changeDirection = function (e, t) {
                    void 0 === t && (t = !0)
                    var a = this,
                        i = a.params.direction
                    return (
                        e ||
                            (e =
                                "horizontal" === i ? "vertical" : "horizontal"),
                        e === i ||
                            ("horizontal" !== e && "vertical" !== e) ||
                            (a.$el
                                .removeClass(
                                    "" + a.params.containerModifierClass + i
                                )
                                .addClass(
                                    "" + a.params.containerModifierClass + e
                                ),
                            a.emitContainerClasses(),
                            (a.params.direction = e),
                            a.slides.each(function (t) {
                                "vertical" === e
                                    ? (t.style.width = "")
                                    : (t.style.height = "")
                            }),
                            a.emit("changeDirection"),
                            t && a.update()),
                        a
                    )
                }),
                (r.mount = function (e) {
                    var t = this
                    if (t.mounted) return !0
                    var a,
                        i = m(e || t.params.el)
                    return (
                        !!(e = i[0]) &&
                        ((e.swiper = t),
                        e && e.shadowRoot && e.shadowRoot.querySelector
                            ? ((a = m(
                                  e.shadowRoot.querySelector(
                                      "." + t.params.wrapperClass
                                  )
                              )).children = function (e) {
                                  return i.children(e)
                              })
                            : (a = i.children("." + t.params.wrapperClass)),
                        S(t, {
                            $el: i,
                            el: e,
                            $wrapperEl: a,
                            wrapperEl: a[0],
                            mounted: !0,
                            rtl:
                                "rtl" === e.dir.toLowerCase() ||
                                "rtl" === i.css("direction"),
                            rtlTranslate:
                                "horizontal" === t.params.direction &&
                                ("rtl" === e.dir.toLowerCase() ||
                                    "rtl" === i.css("direction")),
                            wrongRTL: "-webkit-box" === a.css("display"),
                        }),
                        !0)
                    )
                }),
                (r.init = function (e) {
                    var t = this
                    return (
                        t.initialized ||
                            !1 === t.mount(e) ||
                            (t.emit("beforeInit"),
                            t.params.breakpoints && t.setBreakpoint(),
                            t.addClasses(),
                            t.params.loop && t.loopCreate(),
                            t.updateSize(),
                            t.updateSlides(),
                            t.params.watchOverflow && t.checkOverflow(),
                            t.params.grabCursor && t.setGrabCursor(),
                            t.params.preloadImages && t.preloadImages(),
                            t.params.loop
                                ? t.slideTo(
                                      t.params.initialSlide + t.loopedSlides,
                                      0,
                                      t.params.runCallbacksOnInit
                                  )
                                : t.slideTo(
                                      t.params.initialSlide,
                                      0,
                                      t.params.runCallbacksOnInit
                                  ),
                            t.attachEvents(),
                            (t.initialized = !0),
                            t.emit("init"),
                            t.emit("afterInit")),
                        t
                    )
                }),
                (r.destroy = function (e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0)
                    var a,
                        i = this,
                        s = i.params,
                        r = i.$el,
                        n = i.$wrapperEl,
                        l = i.slides
                    return (
                        void 0 === i.params ||
                            i.destroyed ||
                            (i.emit("beforeDestroy"),
                            (i.initialized = !1),
                            i.detachEvents(),
                            s.loop && i.loopDestroy(),
                            t &&
                                (i.removeClasses(),
                                r.removeAttr("style"),
                                n.removeAttr("style"),
                                l &&
                                    l.length &&
                                    l
                                        .removeClass(
                                            [
                                                s.slideVisibleClass,
                                                s.slideActiveClass,
                                                s.slideNextClass,
                                                s.slidePrevClass,
                                            ].join(" ")
                                        )
                                        .removeAttr("style")
                                        .removeAttr("data-swiper-slide-index")),
                            i.emit("destroy"),
                            Object.keys(i.eventsListeners).forEach(function (
                                e
                            ) {
                                i.off(e)
                            }),
                            !1 !== e &&
                                ((i.$el[0].swiper = null),
                                (a = i),
                                Object.keys(a).forEach(function (e) {
                                    try {
                                        a[e] = null
                                    } catch (e) {}
                                    try {
                                        delete a[e]
                                    } catch (e) {}
                                })),
                            (i.destroyed = !0)),
                        null
                    )
                }),
                (t.extendDefaults = function (e) {
                    S(F, e)
                }),
                (t.installModule = function (e) {
                    t.prototype.modules || (t.prototype.modules = {})
                    var a =
                        e.name ||
                        Object.keys(t.prototype.modules).length + "_" + x()
                    t.prototype.modules[a] = e
                }),
                (t.use = function (e) {
                    return Array.isArray(e)
                        ? (e.forEach(function (e) {
                              return t.installModule(e)
                          }),
                          t)
                        : (t.installModule(e), t)
                }),
                (a = t),
                (s = [
                    {
                        key: "extendedDefaults",
                        get: function () {
                            return F
                        },
                    },
                    {
                        key: "defaults",
                        get: function () {
                            return Y
                        },
                    },
                ]),
                (i = null) && e(a.prototype, i),
                s && e(a, s),
                t
            )
        })()
    Object.keys(V).forEach(function (e) {
        Object.keys(V[e]).forEach(function (t) {
            R.prototype[t] = V[e][t]
        })
    }),
        R.use([L, I])
    var W = {
            update: function (e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.params.virtual,
                    l = n.addSlidesBefore,
                    o = n.addSlidesAfter,
                    d = t.virtual,
                    p = d.from,
                    u = d.to,
                    c = d.slides,
                    h = d.slidesGrid,
                    v = d.renderSlide,
                    f = d.offset
                t.updateActiveIndex()
                var m,
                    g,
                    y,
                    w = t.activeIndex || 0
                ;(m = t.rtlTranslate
                    ? "right"
                    : t.isHorizontal()
                    ? "left"
                    : "top"),
                    r
                        ? ((g = Math.floor(i / 2) + s + o),
                          (y = Math.floor(i / 2) + s + l))
                        : ((g = i + (s - 1) + o), (y = s + l))
                var b = Math.max((w || 0) - y, 0),
                    E = Math.min((w || 0) + g, c.length - 1),
                    x = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0)
                function T() {
                    t.updateSlides(),
                        t.updateProgress(),
                        t.updateSlidesClasses(),
                        t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (
                    (S(t.virtual, {
                        from: b,
                        to: E,
                        offset: x,
                        slidesGrid: t.slidesGrid,
                    }),
                    p === b && u === E && !e)
                )
                    return (
                        t.slidesGrid !== h &&
                            x !== f &&
                            t.slides.css(m, x + "px"),
                        void t.updateProgress()
                    )
                if (t.params.virtual.renderExternal)
                    return (
                        t.params.virtual.renderExternal.call(t, {
                            offset: x,
                            from: b,
                            to: E,
                            slides: (function () {
                                for (var e = [], t = b; t <= E; t += 1)
                                    e.push(c[t])
                                return e
                            })(),
                        }),
                        void (t.params.virtual.renderExternalUpdate && T())
                    )
                var C = [],
                    M = []
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove()
                else
                    for (var z = p; z <= u; z += 1)
                        (z < b || z > E) &&
                            t.$wrapperEl
                                .find(
                                    "." +
                                        t.params.slideClass +
                                        '[data-swiper-slide-index="' +
                                        z +
                                        '"]'
                                )
                                .remove()
                for (var P = 0; P < c.length; P += 1)
                    P >= b &&
                        P <= E &&
                        (void 0 === u || e
                            ? M.push(P)
                            : (P > u && M.push(P), P < p && C.push(P)))
                M.forEach(function (e) {
                    t.$wrapperEl.append(v(c[e], e))
                }),
                    C.sort(function (e, t) {
                        return t - e
                    }).forEach(function (e) {
                        t.$wrapperEl.prepend(v(c[e], e))
                    }),
                    t.$wrapperEl.children(".swiper-slide").css(m, x + "px"),
                    T()
            },
            renderSlide: function (e, t) {
                var a = this,
                    i = a.params.virtual
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t]
                var s = i.renderSlide
                    ? m(i.renderSlide.call(a, e, t))
                    : m(
                          '<div class="' +
                              a.params.slideClass +
                              '" data-swiper-slide-index="' +
                              t +
                              '">' +
                              e +
                              "</div>"
                      )
                return (
                    s.attr("data-swiper-slide-index") ||
                        s.attr("data-swiper-slide-index", t),
                    i.cache && (a.virtual.cache[t] = s),
                    s
                )
            },
            appendSlide: function (e) {
                var t = this
                if ("object" == typeof e && "length" in e)
                    for (var a = 0; a < e.length; a += 1)
                        e[a] && t.virtual.slides.push(e[a])
                else t.virtual.slides.push(e)
                t.virtual.update(!0)
            },
            prependSlide: function (e) {
                var t = this,
                    a = t.activeIndex,
                    i = a + 1,
                    s = 1
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1)
                        e[r] && t.virtual.slides.unshift(e[r])
                    ;(i = a + e.length), (s = e.length)
                } else t.virtual.slides.unshift(e)
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache,
                        l = {}
                    Object.keys(n).forEach(function (e) {
                        var t = n[e],
                            a = t.attr("data-swiper-slide-index")
                        a &&
                            t.attr(
                                "data-swiper-slide-index",
                                parseInt(a, 10) + 1
                            ),
                            (l[parseInt(e, 10) + s] = t)
                    }),
                        (t.virtual.cache = l)
                }
                t.virtual.update(!0), t.slideTo(i, 0)
            },
            removeSlide: function (e) {
                var t = this
                if (null != e) {
                    var a = t.activeIndex
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1)
                            t.virtual.slides.splice(e[i], 1),
                                t.params.virtual.cache &&
                                    delete t.virtual.cache[e[i]],
                                e[i] < a && (a -= 1),
                                (a = Math.max(a, 0))
                    else
                        t.virtual.slides.splice(e, 1),
                            t.params.virtual.cache && delete t.virtual.cache[e],
                            e < a && (a -= 1),
                            (a = Math.max(a, 0))
                    t.virtual.update(!0), t.slideTo(a, 0)
                }
            },
            removeAllSlides: function () {
                var e = this
                ;(e.virtual.slides = []),
                    e.params.virtual.cache && (e.virtual.cache = {}),
                    e.virtual.update(!0),
                    e.slideTo(0, 0)
            },
        },
        q = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0,
                },
            },
            create: function () {
                M(this, {
                    virtual: t({}, W, {
                        slides: this.params.virtual.slides,
                        cache: {},
                    }),
                })
            },
            on: {
                beforeInit: function (e) {
                    if (e.params.virtual.enabled) {
                        e.classNames.push(
                            e.params.containerModifierClass + "virtual"
                        )
                        var t = { watchSlidesProgress: !0 }
                        S(e.params, t),
                            S(e.originalParams, t),
                            e.params.initialSlide || e.virtual.update()
                    }
                },
                setTranslate: function (e) {
                    e.params.virtual.enabled && e.virtual.update()
                },
            },
        },
        j = {
            handle: function (e) {
                var t = this,
                    a = l(),
                    i = r(),
                    s = t.rtlTranslate,
                    n = e
                n.originalEvent && (n = n.originalEvent)
                var o = n.keyCode || n.charCode,
                    d = t.params.keyboard.pageUpDown,
                    p = d && 33 === o,
                    u = d && 34 === o,
                    c = 37 === o,
                    h = 39 === o,
                    v = 38 === o,
                    f = 40 === o
                if (
                    !t.allowSlideNext &&
                    ((t.isHorizontal() && h) || (t.isVertical() && f) || u)
                )
                    return !1
                if (
                    !t.allowSlidePrev &&
                    ((t.isHorizontal() && c) || (t.isVertical() && v) || p)
                )
                    return !1
                if (
                    !(
                        n.shiftKey ||
                        n.altKey ||
                        n.ctrlKey ||
                        n.metaKey ||
                        (i.activeElement &&
                            i.activeElement.nodeName &&
                            ("input" ===
                                i.activeElement.nodeName.toLowerCase() ||
                                "textarea" ===
                                    i.activeElement.nodeName.toLowerCase()))
                    )
                ) {
                    if (
                        t.params.keyboard.onlyInViewport &&
                        (p || u || c || h || v || f)
                    ) {
                        var m = !1
                        if (
                            t.$el.parents("." + t.params.slideClass).length >
                                0 &&
                            0 ===
                                t.$el.parents("." + t.params.slideActiveClass)
                                    .length
                        )
                            return
                        var g = a.innerWidth,
                            y = a.innerHeight,
                            w = t.$el.offset()
                        s && (w.left -= t.$el[0].scrollLeft)
                        for (
                            var b = [
                                    [w.left, w.top],
                                    [w.left + t.width, w.top],
                                    [w.left, w.top + t.height],
                                    [w.left + t.width, w.top + t.height],
                                ],
                                E = 0;
                            E < b.length;
                            E += 1
                        ) {
                            var x = b[E]
                            if (
                                x[0] >= 0 &&
                                x[0] <= g &&
                                x[1] >= 0 &&
                                x[1] <= y
                            ) {
                                if (0 === x[0] && 0 === x[1]) continue
                                m = !0
                            }
                        }
                        if (!m) return
                    }
                    t.isHorizontal()
                        ? ((p || u || c || h) &&
                              (n.preventDefault
                                  ? n.preventDefault()
                                  : (n.returnValue = !1)),
                          (((u || h) && !s) || ((p || c) && s)) &&
                              t.slideNext(),
                          (((p || c) && !s) || ((u || h) && s)) &&
                              t.slidePrev())
                        : ((p || u || v || f) &&
                              (n.preventDefault
                                  ? n.preventDefault()
                                  : (n.returnValue = !1)),
                          (u || f) && t.slideNext(),
                          (p || v) && t.slidePrev()),
                        t.emit("keyPress", o)
                }
            },
            enable: function () {
                var e = this,
                    t = r()
                e.keyboard.enabled ||
                    (m(t).on("keydown", e.keyboard.handle),
                    (e.keyboard.enabled = !0))
            },
            disable: function () {
                var e = this,
                    t = r()
                e.keyboard.enabled &&
                    (m(t).off("keydown", e.keyboard.handle),
                    (e.keyboard.enabled = !1))
            },
        },
        _ = {
            name: "keyboard",
            params: {
                keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
            },
            create: function () {
                M(this, { keyboard: t({ enabled: !1 }, j) })
            },
            on: {
                init: function (e) {
                    e.params.keyboard.enabled && e.keyboard.enable()
                },
                destroy: function (e) {
                    e.keyboard.enabled && e.keyboard.disable()
                },
            },
        }
    var U = {
            lastScrollTime: x(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function () {
                return l().navigator.userAgent.indexOf("firefox") > -1
                    ? "DOMMouseScroll"
                    : (function () {
                          var e = r(),
                              t = "onwheel",
                              a = t in e
                          if (!a) {
                              var i = e.createElement("div")
                              i.setAttribute(t, "return;"),
                                  (a = "function" == typeof i.onwheel)
                          }
                          return (
                              !a &&
                                  e.implementation &&
                                  e.implementation.hasFeature &&
                                  !0 !== e.implementation.hasFeature("", "") &&
                                  (a = e.implementation.hasFeature(
                                      "Events.wheel",
                                      "3.0"
                                  )),
                              a
                          )
                      })()
                    ? "wheel"
                    : "mousewheel"
            },
            normalize: function (e) {
                var t = 0,
                    a = 0,
                    i = 0,
                    s = 0
                return (
                    "detail" in e && (a = e.detail),
                    "wheelDelta" in e && (a = -e.wheelDelta / 120),
                    "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
                    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                    "axis" in e &&
                        e.axis === e.HORIZONTAL_AXIS &&
                        ((t = a), (a = 0)),
                    (i = 10 * t),
                    (s = 10 * a),
                    "deltaY" in e && (s = e.deltaY),
                    "deltaX" in e && (i = e.deltaX),
                    e.shiftKey && !i && ((i = s), (s = 0)),
                    (i || s) &&
                        e.deltaMode &&
                        (1 === e.deltaMode
                            ? ((i *= 40), (s *= 40))
                            : ((i *= 800), (s *= 800))),
                    i && !t && (t = i < 1 ? -1 : 1),
                    s && !a && (a = s < 1 ? -1 : 1),
                    { spinX: t, spinY: a, pixelX: i, pixelY: s }
                )
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1
            },
            handle: function (e) {
                var t = e,
                    a = this,
                    i = a.params.mousewheel
                a.params.cssMode && t.preventDefault()
                var s = a.$el
                if (
                    ("container" !== a.params.mousewheel.eventsTarget &&
                        (s = m(a.params.mousewheel.eventsTarget)),
                    !a.mouseEntered &&
                        !s[0].contains(t.target) &&
                        !i.releaseOnEdges)
                )
                    return !0
                t.originalEvent && (t = t.originalEvent)
                var r = 0,
                    n = a.rtlTranslate ? -1 : 1,
                    l = U.normalize(t)
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY)))
                            return !0
                        r = -l.pixelX * n
                    } else {
                        if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX)))
                            return !0
                        r = -l.pixelY
                    }
                else
                    r =
                        Math.abs(l.pixelX) > Math.abs(l.pixelY)
                            ? -l.pixelX * n
                            : -l.pixelY
                if (0 === r) return !0
                i.invert && (r = -r)
                var o = a.getTranslate() + r * i.sensitivity
                if (
                    (o >= a.minTranslate() && (o = a.minTranslate()),
                    o <= a.maxTranslate() && (o = a.maxTranslate()),
                    (!!a.params.loop ||
                        !(o === a.minTranslate() || o === a.maxTranslate())) &&
                        a.params.nested &&
                        t.stopPropagation(),
                    a.params.freeMode)
                ) {
                    var d = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r),
                        },
                        p = a.mousewheel.lastEventBeforeSnap,
                        u =
                            p &&
                            d.time < p.time + 500 &&
                            d.delta <= p.delta &&
                            d.direction === p.direction
                    if (!u) {
                        ;(a.mousewheel.lastEventBeforeSnap = void 0),
                            a.params.loop && a.loopFix()
                        var c = a.getTranslate() + r * i.sensitivity,
                            h = a.isBeginning,
                            v = a.isEnd
                        if (
                            (c >= a.minTranslate() && (c = a.minTranslate()),
                            c <= a.maxTranslate() && (c = a.maxTranslate()),
                            a.setTransition(0),
                            a.setTranslate(c),
                            a.updateProgress(),
                            a.updateActiveIndex(),
                            a.updateSlidesClasses(),
                            ((!h && a.isBeginning) || (!v && a.isEnd)) &&
                                a.updateSlidesClasses(),
                            a.params.freeModeSticky)
                        ) {
                            clearTimeout(a.mousewheel.timeout),
                                (a.mousewheel.timeout = void 0)
                            var f = a.mousewheel.recentWheelEvents
                            f.length >= 15 && f.shift()
                            var g = f.length ? f[f.length - 1] : void 0,
                                y = f[0]
                            if (
                                (f.push(d),
                                g &&
                                    (d.delta > g.delta ||
                                        d.direction !== g.direction))
                            )
                                f.splice(0)
                            else if (
                                f.length >= 15 &&
                                d.time - y.time < 500 &&
                                y.delta - d.delta >= 1 &&
                                d.delta <= 6
                            ) {
                                var w = r > 0 ? 0.8 : 0.2
                                ;(a.mousewheel.lastEventBeforeSnap = d),
                                    f.splice(0),
                                    (a.mousewheel.timeout = E(function () {
                                        a.slideToClosest(
                                            a.params.speed,
                                            !0,
                                            void 0,
                                            w
                                        )
                                    }, 0))
                            }
                            a.mousewheel.timeout ||
                                (a.mousewheel.timeout = E(function () {
                                    ;(a.mousewheel.lastEventBeforeSnap = d),
                                        f.splice(0),
                                        a.slideToClosest(
                                            a.params.speed,
                                            !0,
                                            void 0,
                                            0.5
                                        )
                                }, 500))
                        }
                        if (
                            (u || a.emit("scroll", t),
                            a.params.autoplay &&
                                a.params.autoplayDisableOnInteraction &&
                                a.autoplay.stop(),
                            c === a.minTranslate() || c === a.maxTranslate())
                        )
                            return !0
                    }
                } else {
                    var b = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r),
                            raw: e,
                        },
                        T = a.mousewheel.recentWheelEvents
                    T.length >= 2 && T.shift()
                    var C = T.length ? T[T.length - 1] : void 0
                    if (
                        (T.push(b),
                        C
                            ? (b.direction !== C.direction ||
                                  b.delta > C.delta ||
                                  b.time > C.time + 150) &&
                              a.mousewheel.animateSlider(b)
                            : a.mousewheel.animateSlider(b),
                        a.mousewheel.releaseScroll(b))
                    )
                        return !0
                }
                return (
                    t.preventDefault
                        ? t.preventDefault()
                        : (t.returnValue = !1),
                    !1
                )
            },
            animateSlider: function (e) {
                var t = this,
                    a = l()
                return (
                    !(
                        this.params.mousewheel.thresholdDelta &&
                        e.delta < this.params.mousewheel.thresholdDelta
                    ) &&
                    !(
                        this.params.mousewheel.thresholdTime &&
                        x() - t.mousewheel.lastScrollTime <
                            this.params.mousewheel.thresholdTime
                    ) &&
                    ((e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60) ||
                        (e.direction < 0
                            ? (t.isEnd && !t.params.loop) ||
                              t.animating ||
                              (t.slideNext(), t.emit("scroll", e.raw))
                            : (t.isBeginning && !t.params.loop) ||
                              t.animating ||
                              (t.slidePrev(), t.emit("scroll", e.raw)),
                        (t.mousewheel.lastScrollTime = new a.Date().getTime()),
                        !1))
                )
            },
            releaseScroll: function (e) {
                var t = this,
                    a = t.params.mousewheel
                if (e.direction < 0) {
                    if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0
                } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges)
                    return !0
                return !1
            },
            enable: function () {
                var e = this,
                    t = U.event()
                if (e.params.cssMode)
                    return (
                        e.wrapperEl.removeEventListener(t, e.mousewheel.handle),
                        !0
                    )
                if (!t) return !1
                if (e.mousewheel.enabled) return !1
                var a = e.$el
                return (
                    "container" !== e.params.mousewheel.eventsTarget &&
                        (a = m(e.params.mousewheel.eventsTarget)),
                    a.on("mouseenter", e.mousewheel.handleMouseEnter),
                    a.on("mouseleave", e.mousewheel.handleMouseLeave),
                    a.on(t, e.mousewheel.handle),
                    (e.mousewheel.enabled = !0),
                    !0
                )
            },
            disable: function () {
                var e = this,
                    t = U.event()
                if (e.params.cssMode)
                    return (
                        e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0
                    )
                if (!t) return !1
                if (!e.mousewheel.enabled) return !1
                var a = e.$el
                return (
                    "container" !== e.params.mousewheel.eventsTarget &&
                        (a = m(e.params.mousewheel.eventsTarget)),
                    a.off(t, e.mousewheel.handle),
                    (e.mousewheel.enabled = !1),
                    !0
                )
            },
        },
        K = {
            update: function () {
                var e = this,
                    t = e.params.navigation
                if (!e.params.loop) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl
                    s &&
                        s.length > 0 &&
                        (e.isBeginning
                            ? s.addClass(t.disabledClass)
                            : s.removeClass(t.disabledClass),
                        s[
                            e.params.watchOverflow && e.isLocked
                                ? "addClass"
                                : "removeClass"
                        ](t.lockClass)),
                        i &&
                            i.length > 0 &&
                            (e.isEnd
                                ? i.addClass(t.disabledClass)
                                : i.removeClass(t.disabledClass),
                            i[
                                e.params.watchOverflow && e.isLocked
                                    ? "addClass"
                                    : "removeClass"
                            ](t.lockClass))
                }
            },
            onPrevClick: function (e) {
                var t = this
                e.preventDefault(),
                    (t.isBeginning && !t.params.loop) || t.slidePrev()
            },
            onNextClick: function (e) {
                var t = this
                e.preventDefault(), (t.isEnd && !t.params.loop) || t.slideNext()
            },
            init: function () {
                var e,
                    t,
                    a = this,
                    i = a.params.navigation
                ;(i.nextEl || i.prevEl) &&
                    (i.nextEl &&
                        ((e = m(i.nextEl)),
                        a.params.uniqueNavElements &&
                            "string" == typeof i.nextEl &&
                            e.length > 1 &&
                            1 === a.$el.find(i.nextEl).length &&
                            (e = a.$el.find(i.nextEl))),
                    i.prevEl &&
                        ((t = m(i.prevEl)),
                        a.params.uniqueNavElements &&
                            "string" == typeof i.prevEl &&
                            t.length > 1 &&
                            1 === a.$el.find(i.prevEl).length &&
                            (t = a.$el.find(i.prevEl))),
                    e &&
                        e.length > 0 &&
                        e.on("click", a.navigation.onNextClick),
                    t &&
                        t.length > 0 &&
                        t.on("click", a.navigation.onPrevClick),
                    S(a.navigation, {
                        $nextEl: e,
                        nextEl: e && e[0],
                        $prevEl: t,
                        prevEl: t && t[0],
                    }))
            },
            destroy: function () {
                var e = this,
                    t = e.navigation,
                    a = t.$nextEl,
                    i = t.$prevEl
                a &&
                    a.length &&
                    (a.off("click", e.navigation.onNextClick),
                    a.removeClass(e.params.navigation.disabledClass)),
                    i &&
                        i.length &&
                        (i.off("click", e.navigation.onPrevClick),
                        i.removeClass(e.params.navigation.disabledClass))
            },
        },
        Z = {
            update: function () {
                var e = this,
                    t = e.rtl,
                    a = e.params.pagination
                if (
                    a.el &&
                    e.pagination.el &&
                    e.pagination.$el &&
                    0 !== e.pagination.$el.length
                ) {
                    var i,
                        s =
                            e.virtual && e.params.virtual.enabled
                                ? e.virtual.slides.length
                                : e.slides.length,
                        r = e.pagination.$el,
                        n = e.params.loop
                            ? Math.ceil(
                                  (s - 2 * e.loopedSlides) /
                                      e.params.slidesPerGroup
                              )
                            : e.snapGrid.length
                    if (
                        (e.params.loop
                            ? ((i = Math.ceil(
                                  (e.activeIndex - e.loopedSlides) /
                                      e.params.slidesPerGroup
                              )) >
                                  s - 1 - 2 * e.loopedSlides &&
                                  (i -= s - 2 * e.loopedSlides),
                              i > n - 1 && (i -= n),
                              i < 0 &&
                                  "bullets" !== e.params.paginationType &&
                                  (i = n + i))
                            : (i =
                                  void 0 !== e.snapIndex
                                      ? e.snapIndex
                                      : e.activeIndex || 0),
                        "bullets" === a.type &&
                            e.pagination.bullets &&
                            e.pagination.bullets.length > 0)
                    ) {
                        var l,
                            o,
                            d,
                            p = e.pagination.bullets
                        if (
                            (a.dynamicBullets &&
                                ((e.pagination.bulletSize = p
                                    .eq(0)
                                    [
                                        e.isHorizontal()
                                            ? "outerWidth"
                                            : "outerHeight"
                                    ](!0)),
                                r.css(
                                    e.isHorizontal() ? "width" : "height",
                                    e.pagination.bulletSize *
                                        (a.dynamicMainBullets + 4) +
                                        "px"
                                ),
                                a.dynamicMainBullets > 1 &&
                                    void 0 !== e.previousIndex &&
                                    ((e.pagination.dynamicBulletIndex +=
                                        i - e.previousIndex),
                                    e.pagination.dynamicBulletIndex >
                                    a.dynamicMainBullets - 1
                                        ? (e.pagination.dynamicBulletIndex =
                                              a.dynamicMainBullets - 1)
                                        : e.pagination.dynamicBulletIndex < 0 &&
                                          (e.pagination.dynamicBulletIndex = 0)),
                                (l = i - e.pagination.dynamicBulletIndex),
                                (d =
                                    ((o =
                                        l +
                                        (Math.min(
                                            p.length,
                                            a.dynamicMainBullets
                                        ) -
                                            1)) +
                                        l) /
                                    2)),
                            p.removeClass(
                                a.bulletActiveClass +
                                    " " +
                                    a.bulletActiveClass +
                                    "-next " +
                                    a.bulletActiveClass +
                                    "-next-next " +
                                    a.bulletActiveClass +
                                    "-prev " +
                                    a.bulletActiveClass +
                                    "-prev-prev " +
                                    a.bulletActiveClass +
                                    "-main"
                            ),
                            r.length > 1)
                        )
                            p.each(function (e) {
                                var t = m(e),
                                    s = t.index()
                                s === i && t.addClass(a.bulletActiveClass),
                                    a.dynamicBullets &&
                                        (s >= l &&
                                            s <= o &&
                                            t.addClass(
                                                a.bulletActiveClass + "-main"
                                            ),
                                        s === l &&
                                            t
                                                .prev()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-prev"
                                                )
                                                .prev()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-prev-prev"
                                                ),
                                        s === o &&
                                            t
                                                .next()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-next"
                                                )
                                                .next()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-next-next"
                                                ))
                            })
                        else {
                            var u = p.eq(i),
                                c = u.index()
                            if (
                                (u.addClass(a.bulletActiveClass),
                                a.dynamicBullets)
                            ) {
                                for (
                                    var h = p.eq(l), v = p.eq(o), f = l;
                                    f <= o;
                                    f += 1
                                )
                                    p.eq(f).addClass(
                                        a.bulletActiveClass + "-main"
                                    )
                                if (e.params.loop)
                                    if (c >= p.length - a.dynamicMainBullets) {
                                        for (
                                            var g = a.dynamicMainBullets;
                                            g >= 0;
                                            g -= 1
                                        )
                                            p.eq(p.length - g).addClass(
                                                a.bulletActiveClass + "-main"
                                            )
                                        p.eq(
                                            p.length - a.dynamicMainBullets - 1
                                        ).addClass(
                                            a.bulletActiveClass + "-prev"
                                        )
                                    } else
                                        h
                                            .prev()
                                            .addClass(
                                                a.bulletActiveClass + "-prev"
                                            )
                                            .prev()
                                            .addClass(
                                                a.bulletActiveClass +
                                                    "-prev-prev"
                                            ),
                                            v
                                                .next()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-next"
                                                )
                                                .next()
                                                .addClass(
                                                    a.bulletActiveClass +
                                                        "-next-next"
                                                )
                                else
                                    h
                                        .prev()
                                        .addClass(a.bulletActiveClass + "-prev")
                                        .prev()
                                        .addClass(
                                            a.bulletActiveClass + "-prev-prev"
                                        ),
                                        v
                                            .next()
                                            .addClass(
                                                a.bulletActiveClass + "-next"
                                            )
                                            .next()
                                            .addClass(
                                                a.bulletActiveClass +
                                                    "-next-next"
                                            )
                            }
                        }
                        if (a.dynamicBullets) {
                            var y = Math.min(
                                    p.length,
                                    a.dynamicMainBullets + 4
                                ),
                                w =
                                    (e.pagination.bulletSize * y -
                                        e.pagination.bulletSize) /
                                        2 -
                                    d * e.pagination.bulletSize,
                                b = t ? "right" : "left"
                            p.css(e.isHorizontal() ? b : "top", w + "px")
                        }
                    }
                    if (
                        ("fraction" === a.type &&
                            (r
                                .find("." + a.currentClass)
                                .text(a.formatFractionCurrent(i + 1)),
                            r
                                .find("." + a.totalClass)
                                .text(a.formatFractionTotal(n))),
                        "progressbar" === a.type)
                    ) {
                        var E
                        E = a.progressbarOpposite
                            ? e.isHorizontal()
                                ? "vertical"
                                : "horizontal"
                            : e.isHorizontal()
                            ? "horizontal"
                            : "vertical"
                        var x = (i + 1) / n,
                            T = 1,
                            C = 1
                        "horizontal" === E ? (T = x) : (C = x),
                            r
                                .find("." + a.progressbarFillClass)
                                .transform(
                                    "translate3d(0,0,0) scaleX(" +
                                        T +
                                        ") scaleY(" +
                                        C +
                                        ")"
                                )
                                .transition(e.params.speed)
                    }
                    "custom" === a.type && a.renderCustom
                        ? (r.html(a.renderCustom(e, i + 1, n)),
                          e.emit("paginationRender", r[0]))
                        : e.emit("paginationUpdate", r[0]),
                        r[
                            e.params.watchOverflow && e.isLocked
                                ? "addClass"
                                : "removeClass"
                        ](a.lockClass)
                }
            },
            render: function () {
                var e = this,
                    t = e.params.pagination
                if (
                    t.el &&
                    e.pagination.el &&
                    e.pagination.$el &&
                    0 !== e.pagination.$el.length
                ) {
                    var a =
                            e.virtual && e.params.virtual.enabled
                                ? e.virtual.slides.length
                                : e.slides.length,
                        i = e.pagination.$el,
                        s = ""
                    if ("bullets" === t.type) {
                        var r = e.params.loop
                            ? Math.ceil(
                                  (a - 2 * e.loopedSlides) /
                                      e.params.slidesPerGroup
                              )
                            : e.snapGrid.length
                        e.params.freeMode && !e.params.loop && r > a && (r = a)
                        for (var n = 0; n < r; n += 1)
                            t.renderBullet
                                ? (s += t.renderBullet.call(
                                      e,
                                      n,
                                      t.bulletClass
                                  ))
                                : (s +=
                                      "<" +
                                      t.bulletElement +
                                      ' class="' +
                                      t.bulletClass +
                                      '"></' +
                                      t.bulletElement +
                                      ">")
                        i.html(s),
                            (e.pagination.bullets = i.find(
                                "." + t.bulletClass.replace(/ /g, ".")
                            ))
                    }
                    "fraction" === t.type &&
                        ((s = t.renderFraction
                            ? t.renderFraction.call(
                                  e,
                                  t.currentClass,
                                  t.totalClass
                              )
                            : '<span class="' +
                              t.currentClass +
                              '"></span> / <span class="' +
                              t.totalClass +
                              '"></span>'),
                        i.html(s)),
                        "progressbar" === t.type &&
                            ((s = t.renderProgressbar
                                ? t.renderProgressbar.call(
                                      e,
                                      t.progressbarFillClass
                                  )
                                : '<span class="' +
                                  t.progressbarFillClass +
                                  '"></span>'),
                            i.html(s)),
                        "custom" !== t.type &&
                            e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function () {
                var e = this,
                    t = e.params.pagination
                if (t.el) {
                    var a = m(t.el)
                    0 !== a.length &&
                        (e.params.uniqueNavElements &&
                            "string" == typeof t.el &&
                            a.length > 1 &&
                            (a = e.$el.find(t.el)),
                        "bullets" === t.type &&
                            t.clickable &&
                            a.addClass(t.clickableClass),
                        a.addClass(t.modifierClass + t.type),
                        "bullets" === t.type &&
                            t.dynamicBullets &&
                            (a.addClass(
                                "" + t.modifierClass + t.type + "-dynamic"
                            ),
                            (e.pagination.dynamicBulletIndex = 0),
                            t.dynamicMainBullets < 1 &&
                                (t.dynamicMainBullets = 1)),
                        "progressbar" === t.type &&
                            t.progressbarOpposite &&
                            a.addClass(t.progressbarOppositeClass),
                        t.clickable &&
                            a.on(
                                "click",
                                "." + t.bulletClass.replace(/ /g, "."),
                                function (t) {
                                    t.preventDefault()
                                    var a =
                                        m(this).index() *
                                        e.params.slidesPerGroup
                                    e.params.loop && (a += e.loopedSlides),
                                        e.slideTo(a)
                                }
                            ),
                        S(e.pagination, { $el: a, el: a[0] }))
                }
            },
            destroy: function () {
                var e = this,
                    t = e.params.pagination
                if (
                    t.el &&
                    e.pagination.el &&
                    e.pagination.$el &&
                    0 !== e.pagination.$el.length
                ) {
                    var a = e.pagination.$el
                    a.removeClass(t.hiddenClass),
                        a.removeClass(t.modifierClass + t.type),
                        e.pagination.bullets &&
                            e.pagination.bullets.removeClass(
                                t.bulletActiveClass
                            ),
                        t.clickable &&
                            a.off(
                                "click",
                                "." + t.bulletClass.replace(/ /g, ".")
                            )
                }
            },
        },
        J = {
            setTranslate: function () {
                var e = this
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        l = t.$el,
                        o = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i
                    a
                        ? (p = -p) > 0
                            ? ((d = s - p), (p = 0))
                            : -p + s > r && (d = r + p)
                        : p < 0
                        ? ((d = s + p), (p = 0))
                        : p + s > r && (d = r - p),
                        e.isHorizontal()
                            ? (n.transform("translate3d(" + p + "px, 0, 0)"),
                              (n[0].style.width = d + "px"))
                            : (n.transform("translate3d(0px, " + p + "px, 0)"),
                              (n[0].style.height = d + "px")),
                        o.hide &&
                            (clearTimeout(e.scrollbar.timeout),
                            (l[0].style.opacity = 1),
                            (e.scrollbar.timeout = setTimeout(function () {
                                ;(l[0].style.opacity = 0), l.transition(400)
                            }, 1e3)))
                }
            },
            setTransition: function (e) {
                var t = this
                t.params.scrollbar.el &&
                    t.scrollbar.el &&
                    t.scrollbar.$dragEl.transition(e)
            },
            updateSize: function () {
                var e = this
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el
                    ;(a[0].style.width = ""), (a[0].style.height = "")
                    var s,
                        r = e.isHorizontal()
                            ? i[0].offsetWidth
                            : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        l = n * (r / e.size)
                    ;(s =
                        "auto" === e.params.scrollbar.dragSize
                            ? r * n
                            : parseInt(e.params.scrollbar.dragSize, 10)),
                        e.isHorizontal()
                            ? (a[0].style.width = s + "px")
                            : (a[0].style.height = s + "px"),
                        (i[0].style.display = n >= 1 ? "none" : ""),
                        e.params.scrollbar.hide && (i[0].style.opacity = 0),
                        S(t, {
                            trackSize: r,
                            divider: n,
                            moveDivider: l,
                            dragSize: s,
                        }),
                        t.$el[
                            e.params.watchOverflow && e.isLocked
                                ? "addClass"
                                : "removeClass"
                        ](e.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function (e) {
                return this.isHorizontal()
                    ? "touchstart" === e.type || "touchmove" === e.type
                        ? e.targetTouches[0].clientX
                        : e.clientX
                    : "touchstart" === e.type || "touchmove" === e.type
                    ? e.targetTouches[0].clientY
                    : e.clientY
            },
            setDragPosition: function (e) {
                var t,
                    a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    l = i.trackSize,
                    o = i.dragStartPos
                ;(t =
                    (i.getPointerPosition(e) -
                        r.offset()[a.isHorizontal() ? "left" : "top"] -
                        (null !== o ? o : n / 2)) /
                    (l - n)),
                    (t = Math.max(Math.min(t, 1), 0)),
                    s && (t = 1 - t)
                var d =
                    a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t
                a.updateProgress(d),
                    a.setTranslate(d),
                    a.updateActiveIndex(),
                    a.updateSlidesClasses()
            },
            onDragStart: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl
                ;(t.scrollbar.isTouched = !0),
                    (t.scrollbar.dragStartPos =
                        e.target === n[0] || e.target === n
                            ? i.getPointerPosition(e) -
                              e.target.getBoundingClientRect()[
                                  t.isHorizontal() ? "left" : "top"
                              ]
                            : null),
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.transition(100),
                    n.transition(100),
                    i.setDragPosition(e),
                    clearTimeout(t.scrollbar.dragTimeout),
                    r.transition(0),
                    a.hide && r.css("opacity", 1),
                    t.params.cssMode &&
                        t.$wrapperEl.css("scroll-snap-type", "none"),
                    t.emit("scrollbarDragStart", e)
            },
            onDragMove: function (e) {
                var t = this,
                    a = t.scrollbar,
                    i = t.$wrapperEl,
                    s = a.$el,
                    r = a.$dragEl
                t.scrollbar.isTouched &&
                    (e.preventDefault
                        ? e.preventDefault()
                        : (e.returnValue = !1),
                    a.setDragPosition(e),
                    i.transition(0),
                    s.transition(0),
                    r.transition(0),
                    t.emit("scrollbarDragMove", e))
            },
            onDragEnd: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el
                t.scrollbar.isTouched &&
                    ((t.scrollbar.isTouched = !1),
                    t.params.cssMode &&
                        (t.$wrapperEl.css("scroll-snap-type", ""),
                        s.transition("")),
                    a.hide &&
                        (clearTimeout(t.scrollbar.dragTimeout),
                        (t.scrollbar.dragTimeout = E(function () {
                            r.css("opacity", 0), r.transition(400)
                        }, 1e3))),
                    t.emit("scrollbarDragEnd", e),
                    a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function () {
                var e = this
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        l = e.support,
                        o = a.$el[0],
                        d = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1,
                        },
                        p = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1,
                        }
                    o &&
                        (l.touch
                            ? (o.addEventListener(
                                  i.start,
                                  e.scrollbar.onDragStart,
                                  d
                              ),
                              o.addEventListener(
                                  i.move,
                                  e.scrollbar.onDragMove,
                                  d
                              ),
                              o.addEventListener(
                                  i.end,
                                  e.scrollbar.onDragEnd,
                                  p
                              ))
                            : (o.addEventListener(
                                  s.start,
                                  e.scrollbar.onDragStart,
                                  d
                              ),
                              t.addEventListener(
                                  s.move,
                                  e.scrollbar.onDragMove,
                                  d
                              ),
                              t.addEventListener(
                                  s.end,
                                  e.scrollbar.onDragEnd,
                                  p
                              )))
                }
            },
            disableDraggable: function () {
                var e = this
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        l = e.support,
                        o = a.$el[0],
                        d = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1,
                        },
                        p = !(!l.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1,
                        }
                    o &&
                        (l.touch
                            ? (o.removeEventListener(
                                  i.start,
                                  e.scrollbar.onDragStart,
                                  d
                              ),
                              o.removeEventListener(
                                  i.move,
                                  e.scrollbar.onDragMove,
                                  d
                              ),
                              o.removeEventListener(
                                  i.end,
                                  e.scrollbar.onDragEnd,
                                  p
                              ))
                            : (o.removeEventListener(
                                  s.start,
                                  e.scrollbar.onDragStart,
                                  d
                              ),
                              t.removeEventListener(
                                  s.move,
                                  e.scrollbar.onDragMove,
                                  d
                              ),
                              t.removeEventListener(
                                  s.end,
                                  e.scrollbar.onDragEnd,
                                  p
                              )))
                }
            },
            init: function () {
                var e = this
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = m(i.el)
                    e.params.uniqueNavElements &&
                        "string" == typeof i.el &&
                        s.length > 1 &&
                        1 === a.find(i.el).length &&
                        (s = a.find(i.el))
                    var r = s.find("." + e.params.scrollbar.dragClass)
                    0 === r.length &&
                        ((r = m(
                            '<div class="' +
                                e.params.scrollbar.dragClass +
                                '"></div>'
                        )),
                        s.append(r)),
                        S(t, { $el: s, el: s[0], $dragEl: r, dragEl: r[0] }),
                        i.draggable && t.enableDraggable()
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable()
            },
        },
        Q = {
            setTransform: function (e, t) {
                var a = this.rtl,
                    i = m(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    l = i.attr("data-swiper-parallax-y"),
                    o = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity")
                if (
                    (n || l
                        ? ((n = n || "0"), (l = l || "0"))
                        : this.isHorizontal()
                        ? ((n = r), (l = "0"))
                        : ((l = r), (n = "0")),
                    (n =
                        n.indexOf("%") >= 0
                            ? parseInt(n, 10) * t * s + "%"
                            : n * t * s + "px"),
                    (l =
                        l.indexOf("%") >= 0
                            ? parseInt(l, 10) * t + "%"
                            : l * t + "px"),
                    null != d)
                ) {
                    var p = d - (d - 1) * (1 - Math.abs(t))
                    i[0].style.opacity = p
                }
                if (null == o)
                    i.transform("translate3d(" + n + ", " + l + ", 0px)")
                else {
                    var u = o - (o - 1) * (1 - Math.abs(t))
                    i.transform(
                        "translate3d(" +
                            n +
                            ", " +
                            l +
                            ", 0px) scale(" +
                            u +
                            ")"
                    )
                }
            },
            setTranslate: function () {
                var e = this,
                    t = e.$el,
                    a = e.slides,
                    i = e.progress,
                    s = e.snapGrid
                t
                    .children(
                        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                    )
                    .each(function (t) {
                        e.parallax.setTransform(t, i)
                    }),
                    a.each(function (t, a) {
                        var r = t.progress
                        e.params.slidesPerGroup > 1 &&
                            "auto" !== e.params.slidesPerView &&
                            (r += Math.ceil(a / 2) - i * (s.length - 1)),
                            (r = Math.min(Math.max(r, -1), 1)),
                            m(t)
                                .find(
                                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                                )
                                .each(function (t) {
                                    e.parallax.setTransform(t, r)
                                })
                    })
            },
            setTransition: function (e) {
                void 0 === e && (e = this.params.speed)
                this.$el
                    .find(
                        "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                    )
                    .each(function (t) {
                        var a = m(t),
                            i =
                                parseInt(
                                    a.attr("data-swiper-parallax-duration"),
                                    10
                                ) || e
                        0 === e && (i = 0), a.transition(i)
                    })
            },
        },
        ee = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function (e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture
                if (
                    ((s.fakeGestureTouched = !1),
                    (s.fakeGestureMoved = !1),
                    !a.gestures)
                ) {
                    if (
                        "touchstart" !== e.type ||
                        ("touchstart" === e.type && e.targetTouches.length < 2)
                    )
                        return
                    ;(s.fakeGestureTouched = !0),
                        (r.scaleStart = ee.getDistanceBetweenTouches(e))
                }
                ;(r.$slideEl && r.$slideEl.length) ||
                ((r.$slideEl = m(e.target).closest("." + t.params.slideClass)),
                0 === r.$slideEl.length &&
                    (r.$slideEl = t.slides.eq(t.activeIndex)),
                (r.$imageEl = r.$slideEl.find(
                    "img, svg, canvas, picture, .swiper-zoom-target"
                )),
                (r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass)),
                (r.maxRatio =
                    r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
                0 !== r.$imageWrapEl.length)
                    ? (r.$imageEl && r.$imageEl.transition(0),
                      (t.zoom.isScaling = !0))
                    : (r.$imageEl = void 0)
            },
            onGestureChange: function (e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture
                if (!a.gestures) {
                    if (
                        "touchmove" !== e.type ||
                        ("touchmove" === e.type && e.targetTouches.length < 2)
                    )
                        return
                    ;(s.fakeGestureMoved = !0),
                        (r.scaleMove = ee.getDistanceBetweenTouches(e))
                }
                r.$imageEl && 0 !== r.$imageEl.length
                    ? (a.gestures
                          ? (s.scale = e.scale * s.currentScale)
                          : (s.scale =
                                (r.scaleMove / r.scaleStart) * s.currentScale),
                      s.scale > r.maxRatio &&
                          (s.scale =
                              r.maxRatio -
                              1 +
                              Math.pow(s.scale - r.maxRatio + 1, 0.5)),
                      s.scale < i.minRatio &&
                          (s.scale =
                              i.minRatio +
                              1 -
                              Math.pow(i.minRatio - s.scale + 1, 0.5)),
                      r.$imageEl.transform(
                          "translate3d(0,0,0) scale(" + s.scale + ")"
                      ))
                    : "gesturechange" === e.type && s.onGestureStart(e)
            },
            onGestureEnd: function (e) {
                var t = this,
                    a = t.device,
                    i = t.support,
                    s = t.params.zoom,
                    r = t.zoom,
                    n = r.gesture
                if (!i.gestures) {
                    if (!r.fakeGestureTouched || !r.fakeGestureMoved) return
                    if (
                        "touchend" !== e.type ||
                        ("touchend" === e.type &&
                            e.changedTouches.length < 2 &&
                            !a.android)
                    )
                        return
                    ;(r.fakeGestureTouched = !1), (r.fakeGestureMoved = !1)
                }
                n.$imageEl &&
                    0 !== n.$imageEl.length &&
                    ((r.scale = Math.max(
                        Math.min(r.scale, n.maxRatio),
                        s.minRatio
                    )),
                    n.$imageEl
                        .transition(t.params.speed)
                        .transform("translate3d(0,0,0) scale(" + r.scale + ")"),
                    (r.currentScale = r.scale),
                    (r.isScaling = !1),
                    1 === r.scale && (n.$slideEl = void 0))
            },
            onTouchStart: function (e) {
                var t = this.device,
                    a = this.zoom,
                    i = a.gesture,
                    s = a.image
                i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    (s.isTouched ||
                        (t.android && e.cancelable && e.preventDefault(),
                        (s.isTouched = !0),
                        (s.touchesStart.x =
                            "touchstart" === e.type
                                ? e.targetTouches[0].pageX
                                : e.pageX),
                        (s.touchesStart.y =
                            "touchstart" === e.type
                                ? e.targetTouches[0].pageY
                                : e.pageY)))
            },
            onTouchMove: function (e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity
                if (
                    i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    ((t.allowClick = !1), s.isTouched && i.$slideEl)
                ) {
                    s.isMoved ||
                        ((s.width = i.$imageEl[0].offsetWidth),
                        (s.height = i.$imageEl[0].offsetHeight),
                        (s.startX = T(i.$imageWrapEl[0], "x") || 0),
                        (s.startY = T(i.$imageWrapEl[0], "y") || 0),
                        (i.slideWidth = i.$slideEl[0].offsetWidth),
                        (i.slideHeight = i.$slideEl[0].offsetHeight),
                        i.$imageWrapEl.transition(0),
                        t.rtl &&
                            ((s.startX = -s.startX), (s.startY = -s.startY)))
                    var n = s.width * a.scale,
                        l = s.height * a.scale
                    if (!(n < i.slideWidth && l < i.slideHeight)) {
                        if (
                            ((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
                            (s.maxX = -s.minX),
                            (s.minY = Math.min(i.slideHeight / 2 - l / 2, 0)),
                            (s.maxY = -s.minY),
                            (s.touchesCurrent.x =
                                "touchmove" === e.type
                                    ? e.targetTouches[0].pageX
                                    : e.pageX),
                            (s.touchesCurrent.y =
                                "touchmove" === e.type
                                    ? e.targetTouches[0].pageY
                                    : e.pageY),
                            !s.isMoved && !a.isScaling)
                        ) {
                            if (
                                t.isHorizontal() &&
                                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                                    s.touchesCurrent.x < s.touchesStart.x) ||
                                    (Math.floor(s.maxX) ===
                                        Math.floor(s.startX) &&
                                        s.touchesCurrent.x > s.touchesStart.x))
                            )
                                return void (s.isTouched = !1)
                            if (
                                !t.isHorizontal() &&
                                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                                    s.touchesCurrent.y < s.touchesStart.y) ||
                                    (Math.floor(s.maxY) ===
                                        Math.floor(s.startY) &&
                                        s.touchesCurrent.y > s.touchesStart.y))
                            )
                                return void (s.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(),
                            e.stopPropagation(),
                            (s.isMoved = !0),
                            (s.currentX =
                                s.touchesCurrent.x -
                                s.touchesStart.x +
                                s.startX),
                            (s.currentY =
                                s.touchesCurrent.y -
                                s.touchesStart.y +
                                s.startY),
                            s.currentX < s.minX &&
                                (s.currentX =
                                    s.minX +
                                    1 -
                                    Math.pow(s.minX - s.currentX + 1, 0.8)),
                            s.currentX > s.maxX &&
                                (s.currentX =
                                    s.maxX -
                                    1 +
                                    Math.pow(s.currentX - s.maxX + 1, 0.8)),
                            s.currentY < s.minY &&
                                (s.currentY =
                                    s.minY +
                                    1 -
                                    Math.pow(s.minY - s.currentY + 1, 0.8)),
                            s.currentY > s.maxY &&
                                (s.currentY =
                                    s.maxY -
                                    1 +
                                    Math.pow(s.currentY - s.maxY + 1, 0.8)),
                            r.prevPositionX ||
                                (r.prevPositionX = s.touchesCurrent.x),
                            r.prevPositionY ||
                                (r.prevPositionY = s.touchesCurrent.y),
                            r.prevTime || (r.prevTime = Date.now()),
                            (r.x =
                                (s.touchesCurrent.x - r.prevPositionX) /
                                (Date.now() - r.prevTime) /
                                2),
                            (r.y =
                                (s.touchesCurrent.y - r.prevPositionY) /
                                (Date.now() - r.prevTime) /
                                2),
                            Math.abs(s.touchesCurrent.x - r.prevPositionX) <
                                2 && (r.x = 0),
                            Math.abs(s.touchesCurrent.y - r.prevPositionY) <
                                2 && (r.y = 0),
                            (r.prevPositionX = s.touchesCurrent.x),
                            (r.prevPositionY = s.touchesCurrent.y),
                            (r.prevTime = Date.now()),
                            i.$imageWrapEl.transform(
                                "translate3d(" +
                                    s.currentX +
                                    "px, " +
                                    s.currentY +
                                    "px,0)"
                            )
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved)
                        return (a.isTouched = !1), void (a.isMoved = !1)
                    ;(a.isTouched = !1), (a.isMoved = !1)
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        l = a.currentX + n,
                        o = i.y * r,
                        d = a.currentY + o
                    0 !== i.x && (s = Math.abs((l - a.currentX) / i.x)),
                        0 !== i.y && (r = Math.abs((d - a.currentY) / i.y))
                    var p = Math.max(s, r)
                    ;(a.currentX = l), (a.currentY = d)
                    var u = a.width * e.scale,
                        c = a.height * e.scale
                    ;(a.minX = Math.min(t.slideWidth / 2 - u / 2, 0)),
                        (a.maxX = -a.minX),
                        (a.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
                        (a.maxY = -a.minY),
                        (a.currentX = Math.max(
                            Math.min(a.currentX, a.maxX),
                            a.minX
                        )),
                        (a.currentY = Math.max(
                            Math.min(a.currentY, a.maxY),
                            a.minY
                        )),
                        t.$imageWrapEl
                            .transition(p)
                            .transform(
                                "translate3d(" +
                                    a.currentX +
                                    "px, " +
                                    a.currentY +
                                    "px,0)"
                            )
                }
            },
            onTransitionEnd: function () {
                var e = this,
                    t = e.zoom,
                    a = t.gesture
                a.$slideEl &&
                    e.previousIndex !== e.activeIndex &&
                    (a.$imageEl &&
                        a.$imageEl.transform("translate3d(0,0,0) scale(1)"),
                    a.$imageWrapEl &&
                        a.$imageWrapEl.transform("translate3d(0,0,0)"),
                    (t.scale = 1),
                    (t.currentScale = 1),
                    (a.$slideEl = void 0),
                    (a.$imageEl = void 0),
                    (a.$imageWrapEl = void 0))
            },
            toggle: function (e) {
                var t = this.zoom
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function (e) {
                var t,
                    a,
                    i,
                    s,
                    r,
                    n,
                    o,
                    d,
                    p,
                    u,
                    c,
                    h,
                    v,
                    f,
                    m,
                    g,
                    y = this,
                    w = l(),
                    b = y.zoom,
                    E = y.params.zoom,
                    x = b.gesture,
                    T = b.image
                ;(x.$slideEl ||
                    (y.params.virtual && y.params.virtual.enabled && y.virtual
                        ? (x.$slideEl = y.$wrapperEl.children(
                              "." + y.params.slideActiveClass
                          ))
                        : (x.$slideEl = y.slides.eq(y.activeIndex)),
                    (x.$imageEl = x.$slideEl.find(
                        "img, svg, canvas, picture, .swiper-zoom-target"
                    )),
                    (x.$imageWrapEl = x.$imageEl.parent(
                        "." + E.containerClass
                    ))),
                x.$imageEl && 0 !== x.$imageEl.length) &&
                    (x.$slideEl.addClass("" + E.zoomedSlideClass),
                    void 0 === T.touchesStart.x && e
                        ? ((t =
                              "touchend" === e.type
                                  ? e.changedTouches[0].pageX
                                  : e.pageX),
                          (a =
                              "touchend" === e.type
                                  ? e.changedTouches[0].pageY
                                  : e.pageY))
                        : ((t = T.touchesStart.x), (a = T.touchesStart.y)),
                    (b.scale =
                        x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio),
                    (b.currentScale =
                        x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio),
                    e
                        ? ((m = x.$slideEl[0].offsetWidth),
                          (g = x.$slideEl[0].offsetHeight),
                          (i =
                              x.$slideEl.offset().left + w.scrollX + m / 2 - t),
                          (s = x.$slideEl.offset().top + w.scrollY + g / 2 - a),
                          (o = x.$imageEl[0].offsetWidth),
                          (d = x.$imageEl[0].offsetHeight),
                          (p = o * b.scale),
                          (u = d * b.scale),
                          (v = -(c = Math.min(m / 2 - p / 2, 0))),
                          (f = -(h = Math.min(g / 2 - u / 2, 0))),
                          (r = i * b.scale) < c && (r = c),
                          r > v && (r = v),
                          (n = s * b.scale) < h && (n = h),
                          n > f && (n = f))
                        : ((r = 0), (n = 0)),
                    x.$imageWrapEl
                        .transition(300)
                        .transform("translate3d(" + r + "px, " + n + "px,0)"),
                    x.$imageEl
                        .transition(300)
                        .transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function () {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture
                i.$slideEl ||
                    (e.params.virtual && e.params.virtual.enabled && e.virtual
                        ? (i.$slideEl = e.$wrapperEl.children(
                              "." + e.params.slideActiveClass
                          ))
                        : (i.$slideEl = e.slides.eq(e.activeIndex)),
                    (i.$imageEl = i.$slideEl.find(
                        "img, svg, canvas, picture, .swiper-zoom-target"
                    )),
                    (i.$imageWrapEl = i.$imageEl.parent(
                        "." + a.containerClass
                    ))),
                    i.$imageEl &&
                        0 !== i.$imageEl.length &&
                        ((t.scale = 1),
                        (t.currentScale = 1),
                        i.$imageWrapEl
                            .transition(300)
                            .transform("translate3d(0,0,0)"),
                        i.$imageEl
                            .transition(300)
                            .transform("translate3d(0,0,0) scale(1)"),
                        i.$slideEl.removeClass("" + a.zoomedSlideClass),
                        (i.$slideEl = void 0))
            },
            toggleGestures: function (e) {
                var t = this,
                    a = t.zoom,
                    i = a.slideSelector,
                    s = a.passiveListener
                t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s),
                    t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s),
                    t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s)
            },
            enableGestures: function () {
                this.zoom.gesturesEnabled ||
                    ((this.zoom.gesturesEnabled = !0),
                    this.zoom.toggleGestures("on"))
            },
            disableGestures: function () {
                this.zoom.gesturesEnabled &&
                    ((this.zoom.gesturesEnabled = !1),
                    this.zoom.toggleGestures("off"))
            },
            enable: function () {
                var e = this,
                    t = e.support,
                    a = e.zoom
                if (!a.enabled) {
                    a.enabled = !0
                    var i = !(
                            "touchstart" !== e.touchEvents.start ||
                            !t.passiveListener ||
                            !e.params.passiveListeners
                        ) && { passive: !0, capture: !1 },
                        s = !t.passiveListener || { passive: !1, capture: !0 },
                        r = "." + e.params.slideClass
                    ;(e.zoom.passiveListener = i),
                        (e.zoom.slideSelector = r),
                        t.gestures
                            ? (e.$wrapperEl.on(
                                  e.touchEvents.start,
                                  e.zoom.enableGestures,
                                  i
                              ),
                              e.$wrapperEl.on(
                                  e.touchEvents.end,
                                  e.zoom.disableGestures,
                                  i
                              ))
                            : "touchstart" === e.touchEvents.start &&
                              (e.$wrapperEl.on(
                                  e.touchEvents.start,
                                  r,
                                  a.onGestureStart,
                                  i
                              ),
                              e.$wrapperEl.on(
                                  e.touchEvents.move,
                                  r,
                                  a.onGestureChange,
                                  s
                              ),
                              e.$wrapperEl.on(
                                  e.touchEvents.end,
                                  r,
                                  a.onGestureEnd,
                                  i
                              ),
                              e.touchEvents.cancel &&
                                  e.$wrapperEl.on(
                                      e.touchEvents.cancel,
                                      r,
                                      a.onGestureEnd,
                                      i
                                  )),
                        e.$wrapperEl.on(
                            e.touchEvents.move,
                            "." + e.params.zoom.containerClass,
                            a.onTouchMove,
                            s
                        )
                }
            },
            disable: function () {
                var e = this,
                    t = e.zoom
                if (t.enabled) {
                    var a = e.support
                    e.zoom.enabled = !1
                    var i = !(
                            "touchstart" !== e.touchEvents.start ||
                            !a.passiveListener ||
                            !e.params.passiveListeners
                        ) && { passive: !0, capture: !1 },
                        s = !a.passiveListener || { passive: !1, capture: !0 },
                        r = "." + e.params.slideClass
                    a.gestures
                        ? (e.$wrapperEl.off(
                              e.touchEvents.start,
                              e.zoom.enableGestures,
                              i
                          ),
                          e.$wrapperEl.off(
                              e.touchEvents.end,
                              e.zoom.disableGestures,
                              i
                          ))
                        : "touchstart" === e.touchEvents.start &&
                          (e.$wrapperEl.off(
                              e.touchEvents.start,
                              r,
                              t.onGestureStart,
                              i
                          ),
                          e.$wrapperEl.off(
                              e.touchEvents.move,
                              r,
                              t.onGestureChange,
                              s
                          ),
                          e.$wrapperEl.off(
                              e.touchEvents.end,
                              r,
                              t.onGestureEnd,
                              i
                          ),
                          e.touchEvents.cancel &&
                              e.$wrapperEl.off(
                                  e.touchEvents.cancel,
                                  r,
                                  t.onGestureEnd,
                                  i
                              )),
                        e.$wrapperEl.off(
                            e.touchEvents.move,
                            "." + e.params.zoom.containerClass,
                            t.onTouchMove,
                            s
                        )
                }
            },
        },
        te = {
            loadInSlide: function (e, t) {
                void 0 === t && (t = !0)
                var a = this,
                    i = a.params.lazy
                if (void 0 !== e && 0 !== a.slides.length) {
                    var s =
                            a.virtual && a.params.virtual.enabled
                                ? a.$wrapperEl.children(
                                      "." +
                                          a.params.slideClass +
                                          '[data-swiper-slide-index="' +
                                          e +
                                          '"]'
                                  )
                                : a.slides.eq(e),
                        r = s.find(
                            "." +
                                i.elementClass +
                                ":not(." +
                                i.loadedClass +
                                "):not(." +
                                i.loadingClass +
                                ")"
                        )
                    !s.hasClass(i.elementClass) ||
                        s.hasClass(i.loadedClass) ||
                        s.hasClass(i.loadingClass) ||
                        r.push(s[0]),
                        0 !== r.length &&
                            r.each(function (e) {
                                var r = m(e)
                                r.addClass(i.loadingClass)
                                var n = r.attr("data-background"),
                                    l = r.attr("data-src"),
                                    o = r.attr("data-srcset"),
                                    d = r.attr("data-sizes"),
                                    p = r.parent("picture")
                                a.loadImage(
                                    r[0],
                                    l || n,
                                    o,
                                    d,
                                    !1,
                                    function () {
                                        if (
                                            null != a &&
                                            a &&
                                            (!a || a.params) &&
                                            !a.destroyed
                                        ) {
                                            if (
                                                (n
                                                    ? (r.css(
                                                          "background-image",
                                                          'url("' + n + '")'
                                                      ),
                                                      r.removeAttr(
                                                          "data-background"
                                                      ))
                                                    : (o &&
                                                          (r.attr("srcset", o),
                                                          r.removeAttr(
                                                              "data-srcset"
                                                          )),
                                                      d &&
                                                          (r.attr("sizes", d),
                                                          r.removeAttr(
                                                              "data-sizes"
                                                          )),
                                                      p.length &&
                                                          p
                                                              .children(
                                                                  "source"
                                                              )
                                                              .each(function (
                                                                  e
                                                              ) {
                                                                  var t = m(e)
                                                                  t.attr(
                                                                      "data-srcset"
                                                                  ) &&
                                                                      (t.attr(
                                                                          "srcset",
                                                                          t.attr(
                                                                              "data-srcset"
                                                                          )
                                                                      ),
                                                                      t.removeAttr(
                                                                          "data-srcset"
                                                                      ))
                                                              }),
                                                      l &&
                                                          (r.attr("src", l),
                                                          r.removeAttr(
                                                              "data-src"
                                                          ))),
                                                r
                                                    .addClass(i.loadedClass)
                                                    .removeClass(
                                                        i.loadingClass
                                                    ),
                                                s
                                                    .find(
                                                        "." + i.preloaderClass
                                                    )
                                                    .remove(),
                                                a.params.loop && t)
                                            ) {
                                                var e = s.attr(
                                                    "data-swiper-slide-index"
                                                )
                                                if (
                                                    s.hasClass(
                                                        a.params
                                                            .slideDuplicateClass
                                                    )
                                                ) {
                                                    var u =
                                                        a.$wrapperEl.children(
                                                            '[data-swiper-slide-index="' +
                                                                e +
                                                                '"]:not(.' +
                                                                a.params
                                                                    .slideDuplicateClass +
                                                                ")"
                                                        )
                                                    a.lazy.loadInSlide(
                                                        u.index(),
                                                        !1
                                                    )
                                                } else {
                                                    var c =
                                                        a.$wrapperEl.children(
                                                            "." +
                                                                a.params
                                                                    .slideDuplicateClass +
                                                                '[data-swiper-slide-index="' +
                                                                e +
                                                                '"]'
                                                        )
                                                    a.lazy.loadInSlide(
                                                        c.index(),
                                                        !1
                                                    )
                                                }
                                            }
                                            a.emit(
                                                "lazyImageReady",
                                                s[0],
                                                r[0]
                                            ),
                                                a.params.autoHeight &&
                                                    a.updateAutoHeight()
                                        }
                                    }
                                ),
                                    a.emit("lazyImageLoad", s[0], r[0])
                            })
                }
            },
            load: function () {
                var e = this,
                    t = e.$wrapperEl,
                    a = e.params,
                    i = e.slides,
                    s = e.activeIndex,
                    r = e.virtual && a.virtual.enabled,
                    n = a.lazy,
                    l = a.slidesPerView
                function o(e) {
                    if (r) {
                        if (
                            t.children(
                                "." +
                                    a.slideClass +
                                    '[data-swiper-slide-index="' +
                                    e +
                                    '"]'
                            ).length
                        )
                            return !0
                    } else if (i[e]) return !0
                    return !1
                }
                function d(e) {
                    return r
                        ? m(e).attr("data-swiper-slide-index")
                        : m(e).index()
                }
                if (
                    ("auto" === l && (l = 0),
                    e.lazy.initialImageLoaded ||
                        (e.lazy.initialImageLoaded = !0),
                    e.params.watchSlidesVisibility)
                )
                    t.children("." + a.slideVisibleClass).each(function (t) {
                        var a = r
                            ? m(t).attr("data-swiper-slide-index")
                            : m(t).index()
                        e.lazy.loadInSlide(a)
                    })
                else if (l > 1)
                    for (var p = s; p < s + l; p += 1)
                        o(p) && e.lazy.loadInSlide(p)
                else e.lazy.loadInSlide(s)
                if (n.loadPrevNext)
                    if (
                        l > 1 ||
                        (n.loadPrevNextAmount && n.loadPrevNextAmount > 1)
                    ) {
                        for (
                            var u = n.loadPrevNextAmount,
                                c = l,
                                h = Math.min(s + c + Math.max(u, c), i.length),
                                v = Math.max(s - Math.max(c, u), 0),
                                f = s + l;
                            f < h;
                            f += 1
                        )
                            o(f) && e.lazy.loadInSlide(f)
                        for (var g = v; g < s; g += 1)
                            o(g) && e.lazy.loadInSlide(g)
                    } else {
                        var y = t.children("." + a.slideNextClass)
                        y.length > 0 && e.lazy.loadInSlide(d(y))
                        var w = t.children("." + a.slidePrevClass)
                        w.length > 0 && e.lazy.loadInSlide(d(w))
                    }
            },
            checkInViewOnLoad: function () {
                var e = l(),
                    t = this
                if (t && !t.destroyed) {
                    var a = t.params.lazy.scrollingElement
                            ? m(t.params.lazy.scrollingElement)
                            : m(e),
                        i = a[0] === e,
                        s = i ? e.innerWidth : a[0].offsetWidth,
                        r = i ? e.innerHeight : a[0].offsetHeight,
                        n = t.$el.offset(),
                        o = !1
                    t.rtlTranslate && (n.left -= t.$el[0].scrollLeft)
                    for (
                        var d = [
                                [n.left, n.top],
                                [n.left + t.width, n.top],
                                [n.left, n.top + t.height],
                                [n.left + t.width, n.top + t.height],
                            ],
                            p = 0;
                        p < d.length;
                        p += 1
                    ) {
                        var u = d[p]
                        if (u[0] >= 0 && u[0] <= s && u[1] >= 0 && u[1] <= r) {
                            if (0 === u[0] && 0 === u[1]) continue
                            o = !0
                        }
                    }
                    o
                        ? (t.lazy.load(),
                          a.off("scroll", t.lazy.checkInViewOnLoad))
                        : t.lazy.scrollHandlerAttached ||
                          ((t.lazy.scrollHandlerAttached = !0),
                          a.on("scroll", t.lazy.checkInViewOnLoad))
                }
            },
        },
        ae = {
            LinearSpline: function (e, t) {
                var a,
                    i,
                    s,
                    r,
                    n,
                    l = function (e, t) {
                        for (i = -1, a = e.length; a - i > 1; )
                            e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s)
                        return a
                    }
                return (
                    (this.x = e),
                    (this.y = t),
                    (this.lastIndex = e.length - 1),
                    (this.interpolate = function (e) {
                        return e
                            ? ((n = l(this.x, e)),
                              (r = n - 1),
                              ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                                  (this.x[n] - this.x[r]) +
                                  this.y[r])
                            : 0
                    }),
                    this
                )
            },
            getInterpolateFunction: function (e) {
                var t = this
                t.controller.spline ||
                    (t.controller.spline = t.params.loop
                        ? new ae.LinearSpline(t.slidesGrid, e.slidesGrid)
                        : new ae.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function (e, t) {
                var a,
                    i,
                    s = this,
                    r = s.controller.control,
                    n = s.constructor
                function l(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate
                    "slide" === s.params.controller.by &&
                        (s.controller.getInterpolateFunction(e),
                        (i = -s.controller.spline.interpolate(-t))),
                        (i && "container" !== s.params.controller.by) ||
                            ((a =
                                (e.maxTranslate() - e.minTranslate()) /
                                (s.maxTranslate() - s.minTranslate())),
                            (i =
                                (t - s.minTranslate()) * a + e.minTranslate())),
                        s.params.controller.inverse &&
                            (i = e.maxTranslate() - i),
                        e.updateProgress(i),
                        e.setTranslate(i, s),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1)
                        r[o] !== t && r[o] instanceof n && l(r[o])
                else r instanceof n && t !== r && l(r)
            },
            setTransition: function (e, t) {
                var a,
                    i = this,
                    s = i.constructor,
                    r = i.controller.control
                function n(t) {
                    t.setTransition(e, i),
                        0 !== e &&
                            (t.transitionStart(),
                            t.params.autoHeight &&
                                E(function () {
                                    t.updateAutoHeight()
                                }),
                            t.$wrapperEl.transitionEnd(function () {
                                r &&
                                    (t.params.loop &&
                                        "slide" === i.params.controller.by &&
                                        t.loopFix(),
                                    t.transitionEnd())
                            }))
                }
                if (Array.isArray(r))
                    for (a = 0; a < r.length; a += 1)
                        r[a] !== t && r[a] instanceof s && n(r[a])
                else r instanceof s && t !== r && n(r)
            },
        },
        ie = {
            getRandomNumber: function (e) {
                void 0 === e && (e = 16)
                return "x".repeat(e).replace(/x/g, function () {
                    return Math.round(16 * Math.random()).toString(16)
                })
            },
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e
            },
            makeElNotFocusable: function (e) {
                return e.attr("tabIndex", "-1"), e
            },
            addElRole: function (e, t) {
                return e.attr("role", t), e
            },
            addElRoleDescription: function (e, t) {
                return e.attr("aria-role-description", t), e
            },
            addElControls: function (e, t) {
                return e.attr("aria-controls", t), e
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t), e
            },
            addElId: function (e, t) {
                return e.attr("id", t), e
            },
            addElLive: function (e, t) {
                return e.attr("aria-live", t), e
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function (e) {
                var t = this,
                    a = t.params.a11y
                if (13 === e.keyCode) {
                    var i = m(e.target)
                    t.navigation &&
                        t.navigation.$nextEl &&
                        i.is(t.navigation.$nextEl) &&
                        ((t.isEnd && !t.params.loop) || t.slideNext(),
                        t.isEnd
                            ? t.a11y.notify(a.lastSlideMessage)
                            : t.a11y.notify(a.nextSlideMessage)),
                        t.navigation &&
                            t.navigation.$prevEl &&
                            i.is(t.navigation.$prevEl) &&
                            ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                            t.isBeginning
                                ? t.a11y.notify(a.firstSlideMessage)
                                : t.a11y.notify(a.prevSlideMessage)),
                        t.pagination &&
                            i.is(
                                "." +
                                    t.params.pagination.bulletClass.replace(
                                        / /g,
                                        "."
                                    )
                            ) &&
                            i[0].click()
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function () {
                var e = this
                if (!e.params.loop && e.navigation) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl
                    i &&
                        i.length > 0 &&
                        (e.isBeginning
                            ? (e.a11y.disableEl(i),
                              e.a11y.makeElNotFocusable(i))
                            : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i))),
                        a &&
                            a.length > 0 &&
                            (e.isEnd
                                ? (e.a11y.disableEl(a),
                                  e.a11y.makeElNotFocusable(a))
                                : (e.a11y.enableEl(a),
                                  e.a11y.makeElFocusable(a)))
                }
            },
            updatePagination: function () {
                var e = this,
                    t = e.params.a11y
                e.pagination &&
                    e.params.pagination.clickable &&
                    e.pagination.bullets &&
                    e.pagination.bullets.length &&
                    e.pagination.bullets.each(function (a) {
                        var i = m(a)
                        e.a11y.makeElFocusable(i),
                            e.params.pagination.renderBullet ||
                                (e.a11y.addElRole(i, "button"),
                                e.a11y.addElLabel(
                                    i,
                                    t.paginationBulletMessage.replace(
                                        /\{\{index\}\}/,
                                        i.index() + 1
                                    )
                                ))
                    })
            },
            init: function () {
                var e = this,
                    t = e.params.a11y
                e.$el.append(e.a11y.liveRegion)
                var a = e.$el
                t.containerRoleDescriptionMessage &&
                    e.a11y.addElRoleDescription(
                        a,
                        t.containerRoleDescriptionMessage
                    ),
                    t.containerMessage &&
                        e.a11y.addElLabel(a, t.containerMessage)
                var i,
                    s,
                    r,
                    n = e.$wrapperEl,
                    l =
                        n.attr("id") ||
                        "swiper-wrapper-" + e.a11y.getRandomNumber(16)
                e.a11y.addElId(n, l),
                    (i =
                        e.params.autoplay && e.params.autoplay.enabled
                            ? "off"
                            : "polite"),
                    e.a11y.addElLive(n, i),
                    t.itemRoleDescriptionMessage &&
                        e.a11y.addElRoleDescription(
                            m(e.slides),
                            t.itemRoleDescriptionMessage
                        ),
                    e.a11y.addElRole(m(e.slides), "group"),
                    e.slides.each(function (t) {
                        var a = m(t)
                        e.a11y.addElLabel(
                            a,
                            a.index() + 1 + " / " + e.slides.length
                        )
                    }),
                    e.navigation &&
                        e.navigation.$nextEl &&
                        (s = e.navigation.$nextEl),
                    e.navigation &&
                        e.navigation.$prevEl &&
                        (r = e.navigation.$prevEl),
                    s &&
                        s.length &&
                        (e.a11y.makeElFocusable(s),
                        "BUTTON" !== s[0].tagName &&
                            (e.a11y.addElRole(s, "button"),
                            s.on("keydown", e.a11y.onEnterKey)),
                        e.a11y.addElLabel(s, t.nextSlideMessage),
                        e.a11y.addElControls(s, l)),
                    r &&
                        r.length &&
                        (e.a11y.makeElFocusable(r),
                        "BUTTON" !== r[0].tagName &&
                            (e.a11y.addElRole(r, "button"),
                            r.on("keydown", e.a11y.onEnterKey)),
                        e.a11y.addElLabel(r, t.prevSlideMessage),
                        e.a11y.addElControls(r, l)),
                    e.pagination &&
                        e.params.pagination.clickable &&
                        e.pagination.bullets &&
                        e.pagination.bullets.length &&
                        e.pagination.$el.on(
                            "keydown",
                            "." +
                                e.params.pagination.bulletClass.replace(
                                    / /g,
                                    "."
                                ),
                            e.a11y.onEnterKey
                        )
            },
            destroy: function () {
                var e,
                    t,
                    a = this
                a.a11y.liveRegion &&
                    a.a11y.liveRegion.length > 0 &&
                    a.a11y.liveRegion.remove(),
                    a.navigation &&
                        a.navigation.$nextEl &&
                        (e = a.navigation.$nextEl),
                    a.navigation &&
                        a.navigation.$prevEl &&
                        (t = a.navigation.$prevEl),
                    e && e.off("keydown", a.a11y.onEnterKey),
                    t && t.off("keydown", a.a11y.onEnterKey),
                    a.pagination &&
                        a.params.pagination.clickable &&
                        a.pagination.bullets &&
                        a.pagination.bullets.length &&
                        a.pagination.$el.off(
                            "keydown",
                            "." +
                                a.params.pagination.bulletClass.replace(
                                    / /g,
                                    "."
                                ),
                            a.a11y.onEnterKey
                        )
            },
        },
        se = {
            init: function () {
                var e = this,
                    t = l()
                if (e.params.history) {
                    if (!t.history || !t.history.pushState)
                        return (
                            (e.params.history.enabled = !1),
                            void (e.params.hashNavigation.enabled = !0)
                        )
                    var a = e.history
                    ;(a.initialized = !0),
                        (a.paths = se.getPathValues(e.params.url)),
                        (a.paths.key || a.paths.value) &&
                            (a.scrollToSlide(
                                0,
                                a.paths.value,
                                e.params.runCallbacksOnInit
                            ),
                            e.params.history.replaceState ||
                                t.addEventListener(
                                    "popstate",
                                    e.history.setHistoryPopState
                                ))
                }
            },
            destroy: function () {
                var e = l()
                this.params.history.replaceState ||
                    e.removeEventListener(
                        "popstate",
                        this.history.setHistoryPopState
                    )
            },
            setHistoryPopState: function () {
                var e = this
                ;(e.history.paths = se.getPathValues(e.params.url)),
                    e.history.scrollToSlide(
                        e.params.speed,
                        e.history.paths.value,
                        !1
                    )
            },
            getPathValues: function (e) {
                var t = l(),
                    a = (e ? new URL(e) : t.location).pathname
                        .slice(1)
                        .split("/")
                        .filter(function (e) {
                            return "" !== e
                        }),
                    i = a.length
                return { key: a[i - 2], value: a[i - 1] }
            },
            setHistory: function (e, t) {
                var a = this,
                    i = l()
                if (a.history.initialized && a.params.history.enabled) {
                    var s
                    s = a.params.url ? new URL(a.params.url) : i.location
                    var r = a.slides.eq(t),
                        n = se.slugify(r.attr("data-history"))
                    s.pathname.includes(e) || (n = e + "/" + n)
                    var o = i.history.state
                    ;(o && o.value === n) ||
                        (a.params.history.replaceState
                            ? i.history.replaceState({ value: n }, null, n)
                            : i.history.pushState({ value: n }, null, n))
                }
            },
            slugify: function (e) {
                return e
                    .toString()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "")
                    .replace(/--+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "")
            },
            scrollToSlide: function (e, t, a) {
                var i = this
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s)
                        if (
                            se.slugify(n.attr("data-history")) === t &&
                            !n.hasClass(i.params.slideDuplicateClass)
                        ) {
                            var l = n.index()
                            i.slideTo(l, e, a)
                        }
                    }
                else i.slideTo(0, e, a)
            },
        },
        re = {
            onHashCange: function () {
                var e = this,
                    t = r()
                e.emit("hashChange")
                var a = t.location.hash.replace("#", "")
                if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var i = e.$wrapperEl
                        .children(
                            "." +
                                e.params.slideClass +
                                '[data-hash="' +
                                a +
                                '"]'
                        )
                        .index()
                    if (void 0 === i) return
                    e.slideTo(i)
                }
            },
            setHash: function () {
                var e = this,
                    t = l(),
                    a = r()
                if (
                    e.hashNavigation.initialized &&
                    e.params.hashNavigation.enabled
                )
                    if (
                        e.params.hashNavigation.replaceState &&
                        t.history &&
                        t.history.replaceState
                    )
                        t.history.replaceState(
                            null,
                            null,
                            "#" +
                                e.slides.eq(e.activeIndex).attr("data-hash") ||
                                ""
                        ),
                            e.emit("hashSet")
                    else {
                        var i = e.slides.eq(e.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history")
                        ;(a.location.hash = s || ""), e.emit("hashSet")
                    }
            },
            init: function () {
                var e = this,
                    t = r(),
                    a = l()
                if (
                    !(
                        !e.params.hashNavigation.enabled ||
                        (e.params.history && e.params.history.enabled)
                    )
                ) {
                    e.hashNavigation.initialized = !0
                    var i = t.location.hash.replace("#", "")
                    if (i)
                        for (var s = 0, n = e.slides.length; s < n; s += 1) {
                            var o = e.slides.eq(s)
                            if (
                                (o.attr("data-hash") ||
                                    o.attr("data-history")) === i &&
                                !o.hasClass(e.params.slideDuplicateClass)
                            ) {
                                var d = o.index()
                                e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState &&
                        m(a).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function () {
                var e = l()
                this.params.hashNavigation.watchState &&
                    m(e).off("hashchange", this.hashNavigation.onHashCange)
            },
        },
        ne = {
            run: function () {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay
                t.attr("data-swiper-autoplay") &&
                    (a =
                        t.attr("data-swiper-autoplay") ||
                        e.params.autoplay.delay),
                    clearTimeout(e.autoplay.timeout),
                    (e.autoplay.timeout = E(function () {
                        var t
                        e.params.autoplay.reverseDirection
                            ? e.params.loop
                                ? (e.loopFix(),
                                  (t = e.slidePrev(e.params.speed, !0, !0)),
                                  e.emit("autoplay"))
                                : e.isBeginning
                                ? e.params.autoplay.stopOnLastSlide
                                    ? e.autoplay.stop()
                                    : ((t = e.slideTo(
                                          e.slides.length - 1,
                                          e.params.speed,
                                          !0,
                                          !0
                                      )),
                                      e.emit("autoplay"))
                                : ((t = e.slidePrev(e.params.speed, !0, !0)),
                                  e.emit("autoplay"))
                            : e.params.loop
                            ? (e.loopFix(),
                              (t = e.slideNext(e.params.speed, !0, !0)),
                              e.emit("autoplay"))
                            : e.isEnd
                            ? e.params.autoplay.stopOnLastSlide
                                ? e.autoplay.stop()
                                : ((t = e.slideTo(0, e.params.speed, !0, !0)),
                                  e.emit("autoplay"))
                            : ((t = e.slideNext(e.params.speed, !0, !0)),
                              e.emit("autoplay")),
                            ((e.params.cssMode && e.autoplay.running) ||
                                !1 === t) &&
                                e.autoplay.run()
                    }, a))
            },
            start: function () {
                var e = this
                return (
                    void 0 === e.autoplay.timeout &&
                    !e.autoplay.running &&
                    ((e.autoplay.running = !0),
                    e.emit("autoplayStart"),
                    e.autoplay.run(),
                    !0)
                )
            },
            stop: function () {
                var e = this
                return (
                    !!e.autoplay.running &&
                    void 0 !== e.autoplay.timeout &&
                    (e.autoplay.timeout &&
                        (clearTimeout(e.autoplay.timeout),
                        (e.autoplay.timeout = void 0)),
                    (e.autoplay.running = !1),
                    e.emit("autoplayStop"),
                    !0)
                )
            },
            pause: function (e) {
                var t = this
                t.autoplay.running &&
                    (t.autoplay.paused ||
                        (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
                        (t.autoplay.paused = !0),
                        0 !== e && t.params.autoplay.waitForTransition
                            ? (t.$wrapperEl[0].addEventListener(
                                  "transitionend",
                                  t.autoplay.onTransitionEnd
                              ),
                              t.$wrapperEl[0].addEventListener(
                                  "webkitTransitionEnd",
                                  t.autoplay.onTransitionEnd
                              ))
                            : ((t.autoplay.paused = !1), t.autoplay.run())))
            },
            onVisibilityChange: function () {
                var e = this,
                    t = r()
                "hidden" === t.visibilityState &&
                    e.autoplay.running &&
                    e.autoplay.pause(),
                    "visible" === t.visibilityState &&
                        e.autoplay.paused &&
                        (e.autoplay.run(), (e.autoplay.paused = !1))
            },
            onTransitionEnd: function (e) {
                var t = this
                t &&
                    !t.destroyed &&
                    t.$wrapperEl &&
                    e.target === t.$wrapperEl[0] &&
                    (t.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        t.autoplay.onTransitionEnd
                    ),
                    t.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        t.autoplay.onTransitionEnd
                    ),
                    (t.autoplay.paused = !1),
                    t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            },
        },
        le = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset
                    e.params.virtualTranslate || (s -= e.translate)
                    var r = 0
                    e.isHorizontal() || ((r = s), (s = 0))
                    var n = e.params.fadeEffect.crossFade
                        ? Math.max(1 - Math.abs(i[0].progress), 0)
                        : 1 + Math.min(Math.max(i[0].progress, -1), 0)
                    i.css({ opacity: n }).transform(
                        "translate3d(" + s + "px, " + r + "px, 0px)"
                    )
                }
            },
            setTransition: function (e) {
                var t = this,
                    a = t.slides,
                    i = t.$wrapperEl
                if ((a.transition(e), t.params.virtualTranslate && 0 !== e)) {
                    var s = !1
                    a.transitionEnd(function () {
                        if (!s && t && !t.destroyed) {
                            ;(s = !0), (t.animating = !1)
                            for (
                                var e = [
                                        "webkitTransitionEnd",
                                        "transitionend",
                                    ],
                                    a = 0;
                                a < e.length;
                                a += 1
                            )
                                i.trigger(e[a])
                        }
                    })
                }
            },
        },
        oe = {
            setTranslate: function () {
                var e,
                    t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    l = t.rtlTranslate,
                    o = t.size,
                    d = t.browser,
                    p = t.params.cubeEffect,
                    u = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    h = 0
                p.shadow &&
                    (u
                        ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                              ((e = m(
                                  '<div class="swiper-cube-shadow"></div>'
                              )),
                              i.append(e)),
                          e.css({ height: r + "px" }))
                        : 0 === (e = a.find(".swiper-cube-shadow")).length &&
                          ((e = m('<div class="swiper-cube-shadow"></div>')),
                          a.append(e)))
                for (var v = 0; v < s.length; v += 1) {
                    var f = s.eq(v),
                        g = v
                    c && (g = parseInt(f.attr("data-swiper-slide-index"), 10))
                    var y = 90 * g,
                        w = Math.floor(y / 360)
                    l && ((y = -y), (w = Math.floor(-y / 360)))
                    var b = Math.max(Math.min(f[0].progress, 1), -1),
                        E = 0,
                        x = 0,
                        T = 0
                    g % 4 == 0
                        ? ((E = 4 * -w * o), (T = 0))
                        : (g - 1) % 4 == 0
                        ? ((E = 0), (T = 4 * -w * o))
                        : (g - 2) % 4 == 0
                        ? ((E = o + 4 * w * o), (T = o))
                        : (g - 3) % 4 == 0 &&
                          ((E = -o), (T = 3 * o + 4 * o * w)),
                        l && (E = -E),
                        u || ((x = E), (E = 0))
                    var C =
                        "rotateX(" +
                        (u ? 0 : -y) +
                        "deg) rotateY(" +
                        (u ? y : 0) +
                        "deg) translate3d(" +
                        E +
                        "px, " +
                        x +
                        "px, " +
                        T +
                        "px)"
                    if (
                        (b <= 1 &&
                            b > -1 &&
                            ((h = 90 * g + 90 * b),
                            l && (h = 90 * -g - 90 * b)),
                        f.transform(C),
                        p.slideShadows)
                    ) {
                        var S = u
                                ? f.find(".swiper-slide-shadow-left")
                                : f.find(".swiper-slide-shadow-top"),
                            M = u
                                ? f.find(".swiper-slide-shadow-right")
                                : f.find(".swiper-slide-shadow-bottom")
                        0 === S.length &&
                            ((S = m(
                                '<div class="swiper-slide-shadow-' +
                                    (u ? "left" : "top") +
                                    '"></div>'
                            )),
                            f.append(S)),
                            0 === M.length &&
                                ((M = m(
                                    '<div class="swiper-slide-shadow-' +
                                        (u ? "right" : "bottom") +
                                        '"></div>'
                                )),
                                f.append(M)),
                            S.length && (S[0].style.opacity = Math.max(-b, 0)),
                            M.length && (M[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (
                    (i.css({
                        "-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + o / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + o / 2 + "px",
                        "transform-origin": "50% 50% -" + o / 2 + "px",
                    }),
                    p.shadow)
                )
                    if (u)
                        e.transform(
                            "translate3d(0px, " +
                                (r / 2 + p.shadowOffset) +
                                "px, " +
                                -r / 2 +
                                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                                p.shadowScale +
                                ")"
                        )
                    else {
                        var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                            P =
                                1.5 -
                                (Math.sin((2 * z * Math.PI) / 360) / 2 +
                                    Math.cos((2 * z * Math.PI) / 360) / 2),
                            k = p.shadowScale,
                            L = p.shadowScale / P,
                            $ = p.shadowOffset
                        e.transform(
                            "scale3d(" +
                                k +
                                ", 1, " +
                                L +
                                ") translate3d(0px, " +
                                (n / 2 + $) +
                                "px, " +
                                -n / 2 / L +
                                "px) rotateX(-90deg)"
                        )
                    }
                var I = d.isSafari || d.isWebView ? -o / 2 : 0
                i.transform(
                    "translate3d(0px,0," +
                        I +
                        "px) rotateX(" +
                        (t.isHorizontal() ? 0 : h) +
                        "deg) rotateY(" +
                        (t.isHorizontal() ? -h : 0) +
                        "deg)"
                )
            },
            setTransition: function (e) {
                var t = this,
                    a = t.$el
                t.slides
                    .transition(e)
                    .find(
                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e),
                    t.params.cubeEffect.shadow &&
                        !t.isHorizontal() &&
                        a.find(".swiper-cube-shadow").transition(e)
            },
        },
        de = {
            setTranslate: function () {
                for (
                    var e = this, t = e.slides, a = e.rtlTranslate, i = 0;
                    i < t.length;
                    i += 1
                ) {
                    var s = t.eq(i),
                        r = s[0].progress
                    e.params.flipEffect.limitRotation &&
                        (r = Math.max(Math.min(s[0].progress, 1), -1))
                    var n = -180 * r,
                        l = 0,
                        o = -s[0].swiperSlideOffset,
                        d = 0
                    if (
                        (e.isHorizontal()
                            ? a && (n = -n)
                            : ((d = o), (o = 0), (l = -n), (n = 0)),
                        (s[0].style.zIndex =
                            -Math.abs(Math.round(r)) + t.length),
                        e.params.flipEffect.slideShadows)
                    ) {
                        var p = e.isHorizontal()
                                ? s.find(".swiper-slide-shadow-left")
                                : s.find(".swiper-slide-shadow-top"),
                            u = e.isHorizontal()
                                ? s.find(".swiper-slide-shadow-right")
                                : s.find(".swiper-slide-shadow-bottom")
                        0 === p.length &&
                            ((p = m(
                                '<div class="swiper-slide-shadow-' +
                                    (e.isHorizontal() ? "left" : "top") +
                                    '"></div>'
                            )),
                            s.append(p)),
                            0 === u.length &&
                                ((u = m(
                                    '<div class="swiper-slide-shadow-' +
                                        (e.isHorizontal()
                                            ? "right"
                                            : "bottom") +
                                        '"></div>'
                                )),
                                s.append(u)),
                            p.length && (p[0].style.opacity = Math.max(-r, 0)),
                            u.length && (u[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform(
                        "translate3d(" +
                            o +
                            "px, " +
                            d +
                            "px, 0px) rotateX(" +
                            l +
                            "deg) rotateY(" +
                            n +
                            "deg)"
                    )
                }
            },
            setTransition: function (e) {
                var t = this,
                    a = t.slides,
                    i = t.activeIndex,
                    s = t.$wrapperEl
                if (
                    (a
                        .transition(e)
                        .find(
                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                        )
                        .transition(e),
                    t.params.virtualTranslate && 0 !== e)
                ) {
                    var r = !1
                    a.eq(i).transitionEnd(function () {
                        if (!r && t && !t.destroyed) {
                            ;(r = !0), (t.animating = !1)
                            for (
                                var e = [
                                        "webkitTransitionEnd",
                                        "transitionend",
                                    ],
                                    a = 0;
                                a < e.length;
                                a += 1
                            )
                                s.trigger(e[a])
                        }
                    })
                }
            },
        },
        pe = {
            setTranslate: function () {
                for (
                    var e = this,
                        t = e.width,
                        a = e.height,
                        i = e.slides,
                        s = e.slidesSizesGrid,
                        r = e.params.coverflowEffect,
                        n = e.isHorizontal(),
                        l = e.translate,
                        o = n ? t / 2 - l : a / 2 - l,
                        d = n ? r.rotate : -r.rotate,
                        p = r.depth,
                        u = 0,
                        c = i.length;
                    u < c;
                    u += 1
                ) {
                    var h = i.eq(u),
                        v = s[u],
                        f =
                            ((o - h[0].swiperSlideOffset - v / 2) / v) *
                            r.modifier,
                        g = n ? d * f : 0,
                        y = n ? 0 : d * f,
                        w = -p * Math.abs(f),
                        b = r.stretch
                    "string" == typeof b &&
                        -1 !== b.indexOf("%") &&
                        (b = (parseFloat(r.stretch) / 100) * v)
                    var E = n ? 0 : b * f,
                        x = n ? b * f : 0,
                        T = 1 - (1 - r.scale) * Math.abs(f)
                    Math.abs(x) < 0.001 && (x = 0),
                        Math.abs(E) < 0.001 && (E = 0),
                        Math.abs(w) < 0.001 && (w = 0),
                        Math.abs(g) < 0.001 && (g = 0),
                        Math.abs(y) < 0.001 && (y = 0),
                        Math.abs(T) < 0.001 && (T = 0)
                    var C =
                        "translate3d(" +
                        x +
                        "px," +
                        E +
                        "px," +
                        w +
                        "px)  rotateX(" +
                        y +
                        "deg) rotateY(" +
                        g +
                        "deg) scale(" +
                        T +
                        ")"
                    if (
                        (h.transform(C),
                        (h[0].style.zIndex = 1 - Math.abs(Math.round(f))),
                        r.slideShadows)
                    ) {
                        var S = n
                                ? h.find(".swiper-slide-shadow-left")
                                : h.find(".swiper-slide-shadow-top"),
                            M = n
                                ? h.find(".swiper-slide-shadow-right")
                                : h.find(".swiper-slide-shadow-bottom")
                        0 === S.length &&
                            ((S = m(
                                '<div class="swiper-slide-shadow-' +
                                    (n ? "left" : "top") +
                                    '"></div>'
                            )),
                            h.append(S)),
                            0 === M.length &&
                                ((M = m(
                                    '<div class="swiper-slide-shadow-' +
                                        (n ? "right" : "bottom") +
                                        '"></div>'
                                )),
                                h.append(M)),
                            S.length && (S[0].style.opacity = f > 0 ? f : 0),
                            M.length && (M[0].style.opacity = -f > 0 ? -f : 0)
                    }
                }
            },
            setTransition: function (e) {
                this.slides
                    .transition(e)
                    .find(
                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e)
            },
        },
        ue = {
            init: function () {
                var e = this,
                    t = e.params.thumbs
                if (e.thumbs.initialized) return !1
                e.thumbs.initialized = !0
                var a = e.constructor
                return (
                    t.swiper instanceof a
                        ? ((e.thumbs.swiper = t.swiper),
                          S(e.thumbs.swiper.originalParams, {
                              watchSlidesProgress: !0,
                              slideToClickedSlide: !1,
                          }),
                          S(e.thumbs.swiper.params, {
                              watchSlidesProgress: !0,
                              slideToClickedSlide: !1,
                          }))
                        : C(t.swiper) &&
                          ((e.thumbs.swiper = new a(
                              S({}, t.swiper, {
                                  watchSlidesVisibility: !0,
                                  watchSlidesProgress: !0,
                                  slideToClickedSlide: !1,
                              })
                          )),
                          (e.thumbs.swiperCreated = !0)),
                    e.thumbs.swiper.$el.addClass(
                        e.params.thumbs.thumbsContainerClass
                    ),
                    e.thumbs.swiper.on("tap", e.thumbs.onThumbClick),
                    !0
                )
            },
            onThumbClick: function () {
                var e = this,
                    t = e.thumbs.swiper
                if (t) {
                    var a = t.clickedIndex,
                        i = t.clickedSlide
                    if (
                        !(
                            (i &&
                                m(i).hasClass(
                                    e.params.thumbs.slideThumbActiveClass
                                )) ||
                            null == a
                        )
                    ) {
                        var s
                        if (
                            ((s = t.params.loop
                                ? parseInt(
                                      m(t.clickedSlide).attr(
                                          "data-swiper-slide-index"
                                      ),
                                      10
                                  )
                                : a),
                            e.params.loop)
                        ) {
                            var r = e.activeIndex
                            e.slides
                                .eq(r)
                                .hasClass(e.params.slideDuplicateClass) &&
                                (e.loopFix(),
                                (e._clientLeft = e.$wrapperEl[0].clientLeft),
                                (r = e.activeIndex))
                            var n = e.slides
                                    .eq(r)
                                    .prevAll(
                                        '[data-swiper-slide-index="' + s + '"]'
                                    )
                                    .eq(0)
                                    .index(),
                                l = e.slides
                                    .eq(r)
                                    .nextAll(
                                        '[data-swiper-slide-index="' + s + '"]'
                                    )
                                    .eq(0)
                                    .index()
                            s =
                                void 0 === n
                                    ? l
                                    : void 0 === l
                                    ? n
                                    : l - r < r - n
                                    ? l
                                    : n
                        }
                        e.slideTo(s)
                    }
                }
            },
            update: function (e) {
                var t = this,
                    a = t.thumbs.swiper
                if (a) {
                    var i =
                            "auto" === a.params.slidesPerView
                                ? a.slidesPerViewDynamic()
                                : a.params.slidesPerView,
                        s = t.params.thumbs.autoScrollOffset,
                        r = s && !a.params.loop
                    if (t.realIndex !== a.realIndex || r) {
                        var n,
                            l,
                            o = a.activeIndex
                        if (a.params.loop) {
                            a.slides
                                .eq(o)
                                .hasClass(a.params.slideDuplicateClass) &&
                                (a.loopFix(),
                                (a._clientLeft = a.$wrapperEl[0].clientLeft),
                                (o = a.activeIndex))
                            var d = a.slides
                                    .eq(o)
                                    .prevAll(
                                        '[data-swiper-slide-index="' +
                                            t.realIndex +
                                            '"]'
                                    )
                                    .eq(0)
                                    .index(),
                                p = a.slides
                                    .eq(o)
                                    .nextAll(
                                        '[data-swiper-slide-index="' +
                                            t.realIndex +
                                            '"]'
                                    )
                                    .eq(0)
                                    .index()
                            ;(n =
                                void 0 === d
                                    ? p
                                    : void 0 === p
                                    ? d
                                    : p - o == o - d
                                    ? o
                                    : p - o < o - d
                                    ? p
                                    : d),
                                (l =
                                    t.activeIndex > t.previousIndex
                                        ? "next"
                                        : "prev")
                        } else
                            l =
                                (n = t.realIndex) > t.previousIndex
                                    ? "next"
                                    : "prev"
                        r && (n += "next" === l ? s : -1 * s),
                            a.visibleSlidesIndexes &&
                                a.visibleSlidesIndexes.indexOf(n) < 0 &&
                                (a.params.centeredSlides
                                    ? (n =
                                          n > o
                                              ? n - Math.floor(i / 2) + 1
                                              : n + Math.floor(i / 2) - 1)
                                    : n > o && (n = n - i + 1),
                                a.slideTo(n, e ? 0 : void 0))
                    }
                    var u = 1,
                        c = t.params.thumbs.slideThumbActiveClass
                    if (
                        (t.params.slidesPerView > 1 &&
                            !t.params.centeredSlides &&
                            (u = t.params.slidesPerView),
                        t.params.thumbs.multipleActiveThumbs || (u = 1),
                        (u = Math.floor(u)),
                        a.slides.removeClass(c),
                        a.params.loop ||
                            (a.params.virtual && a.params.virtual.enabled))
                    )
                        for (var h = 0; h < u; h += 1)
                            a.$wrapperEl
                                .children(
                                    '[data-swiper-slide-index="' +
                                        (t.realIndex + h) +
                                        '"]'
                                )
                                .addClass(c)
                    else
                        for (var v = 0; v < u; v += 1)
                            a.slides.eq(t.realIndex + v).addClass(c)
                }
            },
        },
        ce = [
            q,
            _,
            {
                name: "mousewheel",
                params: {
                    mousewheel: {
                        enabled: !1,
                        releaseOnEdges: !1,
                        invert: !1,
                        forceToAxis: !1,
                        sensitivity: 1,
                        eventsTarget: "container",
                        thresholdDelta: null,
                        thresholdTime: null,
                    },
                },
                create: function () {
                    M(this, {
                        mousewheel: {
                            enabled: !1,
                            lastScrollTime: x(),
                            lastEventBeforeSnap: void 0,
                            recentWheelEvents: [],
                            enable: U.enable,
                            disable: U.disable,
                            handle: U.handle,
                            handleMouseEnter: U.handleMouseEnter,
                            handleMouseLeave: U.handleMouseLeave,
                            animateSlider: U.animateSlider,
                            releaseScroll: U.releaseScroll,
                        },
                    })
                },
                on: {
                    init: function (e) {
                        !e.params.mousewheel.enabled &&
                            e.params.cssMode &&
                            e.mousewheel.disable(),
                            e.params.mousewheel.enabled && e.mousewheel.enable()
                    },
                    destroy: function (e) {
                        e.params.cssMode && e.mousewheel.enable(),
                            e.mousewheel.enabled && e.mousewheel.disable()
                    },
                },
            },
            {
                name: "navigation",
                params: {
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock",
                    },
                },
                create: function () {
                    M(this, { navigation: t({}, K) })
                },
                on: {
                    init: function (e) {
                        e.navigation.init(), e.navigation.update()
                    },
                    toEdge: function (e) {
                        e.navigation.update()
                    },
                    fromEdge: function (e) {
                        e.navigation.update()
                    },
                    destroy: function (e) {
                        e.navigation.destroy()
                    },
                    click: function (e, t) {
                        var a,
                            i = e.navigation,
                            s = i.$nextEl,
                            r = i.$prevEl
                        !e.params.navigation.hideOnClick ||
                            m(t.target).is(r) ||
                            m(t.target).is(s) ||
                            (s
                                ? (a = s.hasClass(
                                      e.params.navigation.hiddenClass
                                  ))
                                : r &&
                                  (a = r.hasClass(
                                      e.params.navigation.hiddenClass
                                  )),
                            !0 === a
                                ? e.emit("navigationShow")
                                : e.emit("navigationHide"),
                            s && s.toggleClass(e.params.navigation.hiddenClass),
                            r && r.toggleClass(e.params.navigation.hiddenClass))
                    },
                },
            },
            {
                name: "pagination",
                params: {
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: function (e) {
                            return e
                        },
                        formatFractionTotal: function (e) {
                            return e
                        },
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        modifierClass: "swiper-pagination-",
                        currentClass: "swiper-pagination-current",
                        totalClass: "swiper-pagination-total",
                        hiddenClass: "swiper-pagination-hidden",
                        progressbarFillClass:
                            "swiper-pagination-progressbar-fill",
                        progressbarOppositeClass:
                            "swiper-pagination-progressbar-opposite",
                        clickableClass: "swiper-pagination-clickable",
                        lockClass: "swiper-pagination-lock",
                    },
                },
                create: function () {
                    M(this, { pagination: t({ dynamicBulletIndex: 0 }, Z) })
                },
                on: {
                    init: function (e) {
                        e.pagination.init(),
                            e.pagination.render(),
                            e.pagination.update()
                    },
                    activeIndexChange: function (e) {
                        ;(e.params.loop || void 0 === e.snapIndex) &&
                            e.pagination.update()
                    },
                    snapIndexChange: function (e) {
                        e.params.loop || e.pagination.update()
                    },
                    slidesLengthChange: function (e) {
                        e.params.loop &&
                            (e.pagination.render(), e.pagination.update())
                    },
                    snapGridLengthChange: function (e) {
                        e.params.loop ||
                            (e.pagination.render(), e.pagination.update())
                    },
                    destroy: function (e) {
                        e.pagination.destroy()
                    },
                    click: function (e, t) {
                        e.params.pagination.el &&
                            e.params.pagination.hideOnClick &&
                            e.pagination.$el.length > 0 &&
                            !m(t.target).hasClass(
                                e.params.pagination.bulletClass
                            ) &&
                            (!0 ===
                            e.pagination.$el.hasClass(
                                e.params.pagination.hiddenClass
                            )
                                ? e.emit("paginationShow")
                                : e.emit("paginationHide"),
                            e.pagination.$el.toggleClass(
                                e.params.pagination.hiddenClass
                            ))
                    },
                },
            },
            {
                name: "scrollbar",
                params: {
                    scrollbar: {
                        el: null,
                        dragSize: "auto",
                        hide: !1,
                        draggable: !1,
                        snapOnRelease: !0,
                        lockClass: "swiper-scrollbar-lock",
                        dragClass: "swiper-scrollbar-drag",
                    },
                },
                create: function () {
                    M(this, {
                        scrollbar: t(
                            { isTouched: !1, timeout: null, dragTimeout: null },
                            J
                        ),
                    })
                },
                on: {
                    init: function (e) {
                        e.scrollbar.init(),
                            e.scrollbar.updateSize(),
                            e.scrollbar.setTranslate()
                    },
                    update: function (e) {
                        e.scrollbar.updateSize()
                    },
                    resize: function (e) {
                        e.scrollbar.updateSize()
                    },
                    observerUpdate: function (e) {
                        e.scrollbar.updateSize()
                    },
                    setTranslate: function (e) {
                        e.scrollbar.setTranslate()
                    },
                    setTransition: function (e, t) {
                        e.scrollbar.setTransition(t)
                    },
                    destroy: function (e) {
                        e.scrollbar.destroy()
                    },
                },
            },
            {
                name: "parallax",
                params: { parallax: { enabled: !1 } },
                create: function () {
                    M(this, { parallax: t({}, Q) })
                },
                on: {
                    beforeInit: function (e) {
                        e.params.parallax.enabled &&
                            ((e.params.watchSlidesProgress = !0),
                            (e.originalParams.watchSlidesProgress = !0))
                    },
                    init: function (e) {
                        e.params.parallax.enabled && e.parallax.setTranslate()
                    },
                    setTranslate: function (e) {
                        e.params.parallax.enabled && e.parallax.setTranslate()
                    },
                    setTransition: function (e, t) {
                        e.params.parallax.enabled && e.parallax.setTransition(t)
                    },
                },
            },
            {
                name: "zoom",
                params: {
                    zoom: {
                        enabled: !1,
                        maxRatio: 3,
                        minRatio: 1,
                        toggle: !0,
                        containerClass: "swiper-zoom-container",
                        zoomedSlideClass: "swiper-slide-zoomed",
                    },
                },
                create: function () {
                    var e = this
                    M(e, {
                        zoom: t(
                            {
                                enabled: !1,
                                scale: 1,
                                currentScale: 1,
                                isScaling: !1,
                                gesture: {
                                    $slideEl: void 0,
                                    slideWidth: void 0,
                                    slideHeight: void 0,
                                    $imageEl: void 0,
                                    $imageWrapEl: void 0,
                                    maxRatio: 3,
                                },
                                image: {
                                    isTouched: void 0,
                                    isMoved: void 0,
                                    currentX: void 0,
                                    currentY: void 0,
                                    minX: void 0,
                                    minY: void 0,
                                    maxX: void 0,
                                    maxY: void 0,
                                    width: void 0,
                                    height: void 0,
                                    startX: void 0,
                                    startY: void 0,
                                    touchesStart: {},
                                    touchesCurrent: {},
                                },
                                velocity: {
                                    x: void 0,
                                    y: void 0,
                                    prevPositionX: void 0,
                                    prevPositionY: void 0,
                                    prevTime: void 0,
                                },
                            },
                            ee
                        ),
                    })
                    var a = 1
                    Object.defineProperty(e.zoom, "scale", {
                        get: function () {
                            return a
                        },
                        set: function (t) {
                            if (a !== t) {
                                var i = e.zoom.gesture.$imageEl
                                        ? e.zoom.gesture.$imageEl[0]
                                        : void 0,
                                    s = e.zoom.gesture.$slideEl
                                        ? e.zoom.gesture.$slideEl[0]
                                        : void 0
                                e.emit("zoomChange", t, i, s)
                            }
                            a = t
                        },
                    })
                },
                on: {
                    init: function (e) {
                        e.params.zoom.enabled && e.zoom.enable()
                    },
                    destroy: function (e) {
                        e.zoom.disable()
                    },
                    touchStart: function (e, t) {
                        e.zoom.enabled && e.zoom.onTouchStart(t)
                    },
                    touchEnd: function (e, t) {
                        e.zoom.enabled && e.zoom.onTouchEnd(t)
                    },
                    doubleTap: function (e, t) {
                        e.params.zoom.enabled &&
                            e.zoom.enabled &&
                            e.params.zoom.toggle &&
                            e.zoom.toggle(t)
                    },
                    transitionEnd: function (e) {
                        e.zoom.enabled &&
                            e.params.zoom.enabled &&
                            e.zoom.onTransitionEnd()
                    },
                    slideChange: function (e) {
                        e.zoom.enabled &&
                            e.params.zoom.enabled &&
                            e.params.cssMode &&
                            e.zoom.onTransitionEnd()
                    },
                },
            },
            {
                name: "lazy",
                params: {
                    lazy: {
                        checkInView: !1,
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        scrollingElement: "",
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader",
                    },
                },
                create: function () {
                    M(this, { lazy: t({ initialImageLoaded: !1 }, te) })
                },
                on: {
                    beforeInit: function (e) {
                        e.params.lazy.enabled &&
                            e.params.preloadImages &&
                            (e.params.preloadImages = !1)
                    },
                    init: function (e) {
                        e.params.lazy.enabled &&
                            !e.params.loop &&
                            0 === e.params.initialSlide &&
                            (e.params.lazy.checkInView
                                ? e.lazy.checkInViewOnLoad()
                                : e.lazy.load())
                    },
                    scroll: function (e) {
                        e.params.freeMode &&
                            !e.params.freeModeSticky &&
                            e.lazy.load()
                    },
                    resize: function (e) {
                        e.params.lazy.enabled && e.lazy.load()
                    },
                    scrollbarDragMove: function (e) {
                        e.params.lazy.enabled && e.lazy.load()
                    },
                    transitionStart: function (e) {
                        e.params.lazy.enabled &&
                            (e.params.lazy.loadOnTransitionStart ||
                                (!e.params.lazy.loadOnTransitionStart &&
                                    !e.lazy.initialImageLoaded)) &&
                            e.lazy.load()
                    },
                    transitionEnd: function (e) {
                        e.params.lazy.enabled &&
                            !e.params.lazy.loadOnTransitionStart &&
                            e.lazy.load()
                    },
                    slideChange: function (e) {
                        e.params.lazy.enabled &&
                            e.params.cssMode &&
                            e.lazy.load()
                    },
                },
            },
            {
                name: "controller",
                params: {
                    controller: { control: void 0, inverse: !1, by: "slide" },
                },
                create: function () {
                    M(this, {
                        controller: t(
                            { control: this.params.controller.control },
                            ae
                        ),
                    })
                },
                on: {
                    update: function (e) {
                        e.controller.control &&
                            e.controller.spline &&
                            ((e.controller.spline = void 0),
                            delete e.controller.spline)
                    },
                    resize: function (e) {
                        e.controller.control &&
                            e.controller.spline &&
                            ((e.controller.spline = void 0),
                            delete e.controller.spline)
                    },
                    observerUpdate: function (e) {
                        e.controller.control &&
                            e.controller.spline &&
                            ((e.controller.spline = void 0),
                            delete e.controller.spline)
                    },
                    setTranslate: function (e, t, a) {
                        e.controller.control && e.controller.setTranslate(t, a)
                    },
                    setTransition: function (e, t, a) {
                        e.controller.control && e.controller.setTransition(t, a)
                    },
                },
            },
            {
                name: "a11y",
                params: {
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                        containerMessage: null,
                        containerRoleDescriptionMessage: null,
                        itemRoleDescriptionMessage: null,
                    },
                },
                create: function () {
                    M(this, {
                        a11y: t({}, ie, {
                            liveRegion: m(
                                '<span class="' +
                                    this.params.a11y.notificationClass +
                                    '" aria-live="assertive" aria-atomic="true"></span>'
                            ),
                        }),
                    })
                },
                on: {
                    afterInit: function (e) {
                        e.params.a11y.enabled &&
                            (e.a11y.init(), e.a11y.updateNavigation())
                    },
                    toEdge: function (e) {
                        e.params.a11y.enabled && e.a11y.updateNavigation()
                    },
                    fromEdge: function (e) {
                        e.params.a11y.enabled && e.a11y.updateNavigation()
                    },
                    paginationUpdate: function (e) {
                        e.params.a11y.enabled && e.a11y.updatePagination()
                    },
                    destroy: function (e) {
                        e.params.a11y.enabled && e.a11y.destroy()
                    },
                },
            },
            {
                name: "history",
                params: {
                    history: { enabled: !1, replaceState: !1, key: "slides" },
                },
                create: function () {
                    M(this, { history: t({}, se) })
                },
                on: {
                    init: function (e) {
                        e.params.history.enabled && e.history.init()
                    },
                    destroy: function (e) {
                        e.params.history.enabled && e.history.destroy()
                    },
                    transitionEnd: function (e) {
                        e.history.initialized &&
                            e.history.setHistory(
                                e.params.history.key,
                                e.activeIndex
                            )
                    },
                    slideChange: function (e) {
                        e.history.initialized &&
                            e.params.cssMode &&
                            e.history.setHistory(
                                e.params.history.key,
                                e.activeIndex
                            )
                    },
                },
            },
            {
                name: "hash-navigation",
                params: {
                    hashNavigation: {
                        enabled: !1,
                        replaceState: !1,
                        watchState: !1,
                    },
                },
                create: function () {
                    M(this, { hashNavigation: t({ initialized: !1 }, re) })
                },
                on: {
                    init: function (e) {
                        e.params.hashNavigation.enabled &&
                            e.hashNavigation.init()
                    },
                    destroy: function (e) {
                        e.params.hashNavigation.enabled &&
                            e.hashNavigation.destroy()
                    },
                    transitionEnd: function (e) {
                        e.hashNavigation.initialized &&
                            e.hashNavigation.setHash()
                    },
                    slideChange: function (e) {
                        e.hashNavigation.initialized &&
                            e.params.cssMode &&
                            e.hashNavigation.setHash()
                    },
                },
            },
            {
                name: "autoplay",
                params: {
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !0,
                        stopOnLastSlide: !1,
                        reverseDirection: !1,
                    },
                },
                create: function () {
                    M(this, {
                        autoplay: t({}, ne, { running: !1, paused: !1 }),
                    })
                },
                on: {
                    init: function (e) {
                        e.params.autoplay.enabled &&
                            (e.autoplay.start(),
                            r().addEventListener(
                                "visibilitychange",
                                e.autoplay.onVisibilityChange
                            ))
                    },
                    beforeTransitionStart: function (e, t, a) {
                        e.autoplay.running &&
                            (a || !e.params.autoplay.disableOnInteraction
                                ? e.autoplay.pause(t)
                                : e.autoplay.stop())
                    },
                    sliderFirstMove: function (e) {
                        e.autoplay.running &&
                            (e.params.autoplay.disableOnInteraction
                                ? e.autoplay.stop()
                                : e.autoplay.pause())
                    },
                    touchEnd: function (e) {
                        e.params.cssMode &&
                            e.autoplay.paused &&
                            !e.params.autoplay.disableOnInteraction &&
                            e.autoplay.run()
                    },
                    destroy: function (e) {
                        e.autoplay.running && e.autoplay.stop(),
                            r().removeEventListener(
                                "visibilitychange",
                                e.autoplay.onVisibilityChange
                            )
                    },
                },
            },
            {
                name: "effect-fade",
                params: { fadeEffect: { crossFade: !1 } },
                create: function () {
                    M(this, { fadeEffect: t({}, le) })
                },
                on: {
                    beforeInit: function (e) {
                        if ("fade" === e.params.effect) {
                            e.classNames.push(
                                e.params.containerModifierClass + "fade"
                            )
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                spaceBetween: 0,
                                virtualTranslate: !0,
                            }
                            S(e.params, t), S(e.originalParams, t)
                        }
                    },
                    setTranslate: function (e) {
                        "fade" === e.params.effect &&
                            e.fadeEffect.setTranslate()
                    },
                    setTransition: function (e, t) {
                        "fade" === e.params.effect &&
                            e.fadeEffect.setTransition(t)
                    },
                },
            },
            {
                name: "effect-cube",
                params: {
                    cubeEffect: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    },
                },
                create: function () {
                    M(this, { cubeEffect: t({}, oe) })
                },
                on: {
                    beforeInit: function (e) {
                        if ("cube" === e.params.effect) {
                            e.classNames.push(
                                e.params.containerModifierClass + "cube"
                            ),
                                e.classNames.push(
                                    e.params.containerModifierClass + "3d"
                                )
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                resistanceRatio: 0,
                                spaceBetween: 0,
                                centeredSlides: !1,
                                virtualTranslate: !0,
                            }
                            S(e.params, t), S(e.originalParams, t)
                        }
                    },
                    setTranslate: function (e) {
                        "cube" === e.params.effect &&
                            e.cubeEffect.setTranslate()
                    },
                    setTransition: function (e, t) {
                        "cube" === e.params.effect &&
                            e.cubeEffect.setTransition(t)
                    },
                },
            },
            {
                name: "effect-flip",
                params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
                create: function () {
                    M(this, { flipEffect: t({}, de) })
                },
                on: {
                    beforeInit: function (e) {
                        if ("flip" === e.params.effect) {
                            e.classNames.push(
                                e.params.containerModifierClass + "flip"
                            ),
                                e.classNames.push(
                                    e.params.containerModifierClass + "3d"
                                )
                            var t = {
                                slidesPerView: 1,
                                slidesPerColumn: 1,
                                slidesPerGroup: 1,
                                watchSlidesProgress: !0,
                                spaceBetween: 0,
                                virtualTranslate: !0,
                            }
                            S(e.params, t), S(e.originalParams, t)
                        }
                    },
                    setTranslate: function (e) {
                        "flip" === e.params.effect &&
                            e.flipEffect.setTranslate()
                    },
                    setTransition: function (e, t) {
                        "flip" === e.params.effect &&
                            e.flipEffect.setTransition(t)
                    },
                },
            },
            {
                name: "effect-coverflow",
                params: {
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        scale: 1,
                        modifier: 1,
                        slideShadows: !0,
                    },
                },
                create: function () {
                    M(this, { coverflowEffect: t({}, pe) })
                },
                on: {
                    beforeInit: function (e) {
                        "coverflow" === e.params.effect &&
                            (e.classNames.push(
                                e.params.containerModifierClass + "coverflow"
                            ),
                            e.classNames.push(
                                e.params.containerModifierClass + "3d"
                            ),
                            (e.params.watchSlidesProgress = !0),
                            (e.originalParams.watchSlidesProgress = !0))
                    },
                    setTranslate: function (e) {
                        "coverflow" === e.params.effect &&
                            e.coverflowEffect.setTranslate()
                    },
                    setTransition: function (e, t) {
                        "coverflow" === e.params.effect &&
                            e.coverflowEffect.setTransition(t)
                    },
                },
            },
            {
                name: "thumbs",
                params: {
                    thumbs: {
                        swiper: null,
                        multipleActiveThumbs: !0,
                        autoScrollOffset: 0,
                        slideThumbActiveClass: "swiper-slide-thumb-active",
                        thumbsContainerClass: "swiper-container-thumbs",
                    },
                },
                create: function () {
                    M(this, {
                        thumbs: t({ swiper: null, initialized: !1 }, ue),
                    })
                },
                on: {
                    beforeInit: function (e) {
                        var t = e.params.thumbs
                        t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
                    },
                    slideChange: function (e) {
                        e.thumbs.swiper && e.thumbs.update()
                    },
                    update: function (e) {
                        e.thumbs.swiper && e.thumbs.update()
                    },
                    resize: function (e) {
                        e.thumbs.swiper && e.thumbs.update()
                    },
                    observerUpdate: function (e) {
                        e.thumbs.swiper && e.thumbs.update()
                    },
                    setTransition: function (e, t) {
                        var a = e.thumbs.swiper
                        a && a.setTransition(t)
                    },
                    beforeDestroy: function (e) {
                        var t = e.thumbs.swiper
                        t && e.thumbs.swiperCreated && t && t.destroy()
                    },
                },
            },
        ]
    return R.use(ce), R
})
//# sourceMappingURL=swiper-bundle.min.js.map

/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
;(function ($) {
    $.fn.appear = function (fn, options) {
        var settings = $.extend(
            {
                //arbitrary data to pass to fn
                data: undefined,

                //call fn only on the first appear?
                one: true,

                // X & Y accuracy
                accX: 0,
                accY: 0,
            },
            options
        )

        return this.each(function () {
            var t = $(this)

            //whether the element is currently visible
            t.appeared = false

            if (!fn) {
                //trigger the custom event
                t.trigger("appear", settings.data)
                return
            }

            var w = $(window)

            //fires the appear event when appropriate
            var check = function () {
                //is the element hidden?
                if (!t.is(":visible")) {
                    //it became hidden
                    t.appeared = false
                    return
                }

                //is the element inside the visible window?
                var a = w.scrollLeft()
                var b = w.scrollTop()
                var o = t.offset()
                var x = o.left
                var y = o.top

                var ax = settings.accX
                var ay = settings.accY
                var th = t.height()
                var wh = w.height()
                var tw = t.width()
                var ww = w.width()

                if (
                    y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax
                ) {
                    //trigger the custom event
                    if (!t.appeared) t.trigger("appear", settings.data)
                } else {
                    //it scrolled out of view
                    t.appeared = false
                }
            }

            //create a modified fn with some additional logic
            var modifiedFn = function () {
                //mark the element as visible
                t.appeared = true

                //is this supposed to happen only once?
                if (settings.one) {
                    //remove the check
                    w.unbind("scroll", check)
                    var i = $.inArray(check, $.fn.appear.checks)
                    if (i >= 0) $.fn.appear.checks.splice(i, 1)
                }

                //trigger the original fn
                fn.apply(this, arguments)
            }

            //bind the modified fn to the element
            if (settings.one) t.one("appear", settings.data, modifiedFn)
            else t.bind("appear", settings.data, modifiedFn)

            //check whenever the window scrolls
            w.scroll(check)

            //check whenever the dom changes
            $.fn.appear.checks.push(check)

            //check now
            check()
        })
    }

    //keep a queue of appearance checks
    $.extend($.fn.appear, {
        checks: [],
        timeout: null,

        //process the queue
        checkAll: function () {
            var length = $.fn.appear.checks.length
            if (length > 0) while (length--) $.fn.appear.checks[length]()
        },

        //check the queue asynchronously
        run: function () {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout)
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20)
        },
    })

    //run checks when these methods are called
    $.each(
        [
            "append",
            "prepend",
            "after",
            "before",
            "attr",
            "removeAttr",
            "addClass",
            "removeClass",
            "toggleClass",
            "remove",
            "css",
            "show",
            "hide",
        ],
        function (i, n) {
            var old = $.fn[n]
            if (old) {
                $.fn[n] = function () {
                    var r = old.apply(this, arguments)
                    $.fn.appear.run()
                    return r
                }
            }
        }
    )
})(jQuery)

/*! odometer 0.4.6 */
;(function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G = [].slice
    ;(q = '<span class="odometer-value"></span>'),
        (n =
            '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' +
            q +
            "</span></span>"),
        (d =
            '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' +
            n +
            "</span></span>"),
        (g = '<span class="odometer-formatting-mark"></span>'),
        (c = "(,ddd).dd"),
        (h = /^\(?([^)]*)\)?(?:(.)(d+))?$/),
        (i = 30),
        (f = 2e3),
        (a = 20),
        (j = 2),
        (e = 0.5),
        (k = 1e3 / i),
        (b = 1e3 / a),
        (o =
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),
        (y = document.createElement("div").style),
        (p =
            null != y.transition ||
            null != y.webkitTransition ||
            null != y.mozTransition ||
            null != y.oTransition),
        (w =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame),
        (l =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver),
        (s = function (a) {
            var b
            return (
                (b = document.createElement("div")),
                (b.innerHTML = a),
                b.children[0]
            )
        }),
        (v = function (a, b) {
            return (a.className = a.className.replace(
                new RegExp("(^| )" + b.split(" ").join("|") + "( |$)", "gi"),
                " "
            ))
        }),
        (r = function (a, b) {
            return v(a, b), (a.className += " " + b)
        }),
        (z = function (a, b) {
            var c
            return null != document.createEvent
                ? ((c = document.createEvent("HTMLEvents")),
                  c.initEvent(b, !0, !0),
                  a.dispatchEvent(c))
                : void 0
        }),
        (u = function () {
            var a, b
            return null !=
                (a =
                    null != (b = window.performance)
                        ? "function" == typeof b.now
                            ? b.now()
                            : void 0
                        : void 0)
                ? a
                : +new Date()
        }),
        (x = function (a, b) {
            return (
                null == b && (b = 0),
                b
                    ? ((a *= Math.pow(10, b)),
                      (a += 0.5),
                      (a = Math.floor(a)),
                      (a /= Math.pow(10, b)))
                    : Math.round(a)
            )
        }),
        (A = function (a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        }),
        (t = function (a) {
            return a - x(a)
        }),
        (C = !1),
        (B = function () {
            var a, b, c, d, e
            if (!C && null != window.jQuery) {
                for (
                    C = !0, d = ["html", "text"], e = [], b = 0, c = d.length;
                    c > b;
                    b++
                )
                    (a = d[b]),
                        e.push(
                            (function (a) {
                                var b
                                return (
                                    (b = window.jQuery.fn[a]),
                                    (window.jQuery.fn[a] = function (a) {
                                        var c
                                        return null == a ||
                                            null ==
                                                (null != (c = this[0])
                                                    ? c.odometer
                                                    : void 0)
                                            ? b.apply(this, arguments)
                                            : this[0].odometer.update(a)
                                    })
                                )
                            })(a)
                        )
                return e
            }
        })(),
        setTimeout(B, 0),
        (m = (function () {
            function a(b) {
                var c,
                    d,
                    e,
                    g,
                    h,
                    i,
                    l,
                    m,
                    n,
                    o,
                    p = this
                if (
                    ((this.options = b),
                    (this.el = this.options.el),
                    null != this.el.odometer)
                )
                    return this.el.odometer
                ;(this.el.odometer = this), (m = a.options)
                for (d in m)
                    (g = m[d]), null == this.options[d] && (this.options[d] = g)
                null == (h = this.options).duration && (h.duration = f),
                    (this.MAX_VALUES = (this.options.duration / k / j) | 0),
                    this.resetFormat(),
                    (this.value = this.cleanValue(
                        null != (n = this.options.value) ? n : ""
                    )),
                    this.renderInside(),
                    this.render()
                try {
                    for (
                        o = ["innerHTML", "innerText", "textContent"],
                            i = 0,
                            l = o.length;
                        l > i;
                        i++
                    )
                        (e = o[i]),
                            null != this.el[e] &&
                                !(function (a) {
                                    return Object.defineProperty(p.el, a, {
                                        get: function () {
                                            var b
                                            return "innerHTML" === a
                                                ? p.inside.outerHTML
                                                : null !=
                                                  (b = p.inside.innerText)
                                                ? b
                                                : p.inside.textContent
                                        },
                                        set: function (a) {
                                            return p.update(a)
                                        },
                                    })
                                })(e)
                } catch (q) {
                    ;(c = q), this.watchForMutations()
                }
            }
            return (
                (a.prototype.renderInside = function () {
                    return (
                        (this.inside = document.createElement("div")),
                        (this.inside.className = "odometer-inside"),
                        (this.el.innerHTML = ""),
                        this.el.appendChild(this.inside)
                    )
                }),
                (a.prototype.watchForMutations = function () {
                    var a,
                        b = this
                    if (null != l)
                        try {
                            return (
                                null == this.observer &&
                                    (this.observer = new l(function () {
                                        var a
                                        return (
                                            (a = b.el.innerText),
                                            b.renderInside(),
                                            b.render(b.value),
                                            b.update(a)
                                        )
                                    })),
                                (this.watchMutations = !0),
                                this.startWatchingMutations()
                            )
                        } catch (c) {
                            a = c
                        }
                }),
                (a.prototype.startWatchingMutations = function () {
                    return this.watchMutations
                        ? this.observer.observe(this.el, { childList: !0 })
                        : void 0
                }),
                (a.prototype.stopWatchingMutations = function () {
                    var a
                    return null != (a = this.observer) ? a.disconnect() : void 0
                }),
                (a.prototype.cleanValue = function (a) {
                    var b
                    return (
                        "string" == typeof a &&
                            ((a = a.replace(
                                null != (b = this.format.radix) ? b : ".",
                                "<radix>"
                            )),
                            (a = a.replace(/[.,]/g, "")),
                            (a = a.replace("<radix>", ".")),
                            (a = parseFloat(a, 10) || 0)),
                        x(a, this.format.precision)
                    )
                }),
                (a.prototype.bindTransitionEnd = function () {
                    var a,
                        b,
                        c,
                        d,
                        e,
                        f,
                        g = this
                    if (!this.transitionEndBound) {
                        for (
                            this.transitionEndBound = !0,
                                b = !1,
                                e = o.split(" "),
                                f = [],
                                c = 0,
                                d = e.length;
                            d > c;
                            c++
                        )
                            (a = e[c]),
                                f.push(
                                    this.el.addEventListener(
                                        a,
                                        function () {
                                            return b
                                                ? !0
                                                : ((b = !0),
                                                  setTimeout(function () {
                                                      return (
                                                          g.render(),
                                                          (b = !1),
                                                          z(
                                                              g.el,
                                                              "odometerdone"
                                                          )
                                                      )
                                                  }, 0),
                                                  !0)
                                        },
                                        !1
                                    )
                                )
                        return f
                    }
                }),
                (a.prototype.resetFormat = function () {
                    var a, b, d, e, f, g, i, j
                    if (
                        ((a = null != (i = this.options.format) ? i : c),
                        a || (a = "d"),
                        (d = h.exec(a)),
                        !d)
                    )
                        throw new Error("Odometer: Unparsable digit format")
                    return (
                        (j = d.slice(1, 4)),
                        (g = j[0]),
                        (f = j[1]),
                        (b = j[2]),
                        (e = (null != b ? b.length : void 0) || 0),
                        (this.format = { repeating: g, radix: f, precision: e })
                    )
                }),
                (a.prototype.render = function (a) {
                    var b, c, d, e, f, g, h, i, j, k, l, m
                    for (
                        null == a && (a = this.value),
                            this.stopWatchingMutations(),
                            this.resetFormat(),
                            this.inside.innerHTML = "",
                            g = this.options.theme,
                            b = this.el.className.split(" "),
                            f = [],
                            i = 0,
                            k = b.length;
                        k > i;
                        i++
                    )
                        (c = b[i]),
                            c.length &&
                                ((e = /^odometer-theme-(.+)$/.exec(c))
                                    ? (g = e[1])
                                    : /^odometer(-|$)/.test(c) || f.push(c))
                    for (
                        f.push("odometer"),
                            p || f.push("odometer-no-transitions"),
                            f.push(
                                g
                                    ? "odometer-theme-" + g
                                    : "odometer-auto-theme"
                            ),
                            this.el.className = f.join(" "),
                            this.ribbons = {},
                            this.digits = [],
                            h = !this.format.precision || !t(a) || !1,
                            m = a.toString().split("").reverse(),
                            j = 0,
                            l = m.length;
                        l > j;
                        j++
                    )
                        (d = m[j]), "." === d && (h = !0), this.addDigit(d, h)
                    return this.startWatchingMutations()
                }),
                (a.prototype.update = function (a) {
                    var b,
                        c = this
                    return (
                        (a = this.cleanValue(a)),
                        (b = a - this.value)
                            ? (v(
                                  this.el,
                                  "odometer-animating-up odometer-animating-down odometer-animating"
                              ),
                              b > 0
                                  ? r(this.el, "odometer-animating-up")
                                  : r(this.el, "odometer-animating-down"),
                              this.stopWatchingMutations(),
                              this.animate(a),
                              this.startWatchingMutations(),
                              setTimeout(function () {
                                  return (
                                      c.el.offsetHeight,
                                      r(c.el, "odometer-animating")
                                  )
                              }, 0),
                              (this.value = a))
                            : void 0
                    )
                }),
                (a.prototype.renderDigit = function () {
                    return s(d)
                }),
                (a.prototype.insertDigit = function (a, b) {
                    return null != b
                        ? this.inside.insertBefore(a, b)
                        : this.inside.children.length
                        ? this.inside.insertBefore(a, this.inside.children[0])
                        : this.inside.appendChild(a)
                }),
                (a.prototype.addSpacer = function (a, b, c) {
                    var d
                    return (
                        (d = s(g)),
                        (d.innerHTML = a),
                        c && r(d, c),
                        this.insertDigit(d, b)
                    )
                }),
                (a.prototype.addDigit = function (a, b) {
                    var c, d, e, f
                    if ((null == b && (b = !0), "-" === a))
                        return this.addSpacer(a, null, "odometer-negation-mark")
                    if ("." === a)
                        return this.addSpacer(
                            null != (f = this.format.radix) ? f : ".",
                            null,
                            "odometer-radix-mark"
                        )
                    if (b)
                        for (e = !1; ; ) {
                            if (!this.format.repeating.length) {
                                if (e)
                                    throw new Error(
                                        "Bad odometer format without digits"
                                    )
                                this.resetFormat(), (e = !0)
                            }
                            if (
                                ((c =
                                    this.format.repeating[
                                        this.format.repeating.length - 1
                                    ]),
                                (this.format.repeating =
                                    this.format.repeating.substring(
                                        0,
                                        this.format.repeating.length - 1
                                    )),
                                "d" === c)
                            )
                                break
                            this.addSpacer(c)
                        }
                    return (
                        (d = this.renderDigit()),
                        (d.querySelector(".odometer-value").innerHTML = a),
                        this.digits.push(d),
                        this.insertDigit(d)
                    )
                }),
                (a.prototype.animate = function (a) {
                    return p && "count" !== this.options.animation
                        ? this.animateSlide(a)
                        : this.animateCount(a)
                }),
                (a.prototype.animateCount = function (a) {
                    var c,
                        d,
                        e,
                        f,
                        g,
                        h = this
                    if ((d = +a - this.value))
                        return (
                            (f = e = u()),
                            (c = this.value),
                            (g = function () {
                                var i, j, k
                                return u() - f > h.options.duration
                                    ? ((h.value = a),
                                      h.render(),
                                      void z(h.el, "odometerdone"))
                                    : ((i = u() - e),
                                      i > b &&
                                          ((e = u()),
                                          (k = i / h.options.duration),
                                          (j = d * k),
                                          (c += j),
                                          h.render(Math.round(c))),
                                      null != w ? w(g) : setTimeout(g, b))
                            })()
                        )
                }),
                (a.prototype.getDigitCount = function () {
                    var a, b, c, d, e, f
                    for (
                        d = 1 <= arguments.length ? G.call(arguments, 0) : [],
                            a = e = 0,
                            f = d.length;
                        f > e;
                        a = ++e
                    )
                        (c = d[a]), (d[a] = Math.abs(c))
                    return (
                        (b = Math.max.apply(Math, d)),
                        Math.ceil(Math.log(b + 1) / Math.log(10))
                    )
                }),
                (a.prototype.getFractionalDigitCount = function () {
                    var a, b, c, d, e, f, g
                    for (
                        e = 1 <= arguments.length ? G.call(arguments, 0) : [],
                            b = /^\-?\d*\.(\d*?)0*$/,
                            a = f = 0,
                            g = e.length;
                        g > f;
                        a = ++f
                    )
                        (d = e[a]),
                            (e[a] = d.toString()),
                            (c = b.exec(e[a])),
                            (e[a] = null == c ? 0 : c[1].length)
                    return Math.max.apply(Math, e)
                }),
                (a.prototype.resetDigits = function () {
                    return (
                        (this.digits = []),
                        (this.ribbons = []),
                        (this.inside.innerHTML = ""),
                        this.resetFormat()
                    )
                }),
                (a.prototype.animateSlide = function (a) {
                    var b,
                        c,
                        d,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        s,
                        t,
                        u,
                        v,
                        w,
                        x,
                        y,
                        z,
                        B,
                        C,
                        D,
                        E
                    if (
                        ((s = this.value),
                        (j = this.getFractionalDigitCount(s, a)),
                        j && ((a *= Math.pow(10, j)), (s *= Math.pow(10, j))),
                        (d = a - s))
                    ) {
                        for (
                            this.bindTransitionEnd(),
                                f = this.getDigitCount(s, a),
                                g = [],
                                b = 0,
                                m = v = 0;
                            f >= 0 ? f > v : v > f;
                            m = f >= 0 ? ++v : --v
                        ) {
                            if (
                                ((t = A(s / Math.pow(10, f - m - 1))),
                                (i = A(a / Math.pow(10, f - m - 1))),
                                (h = i - t),
                                Math.abs(h) > this.MAX_VALUES)
                            ) {
                                for (
                                    l = [],
                                        n =
                                            h /
                                            (this.MAX_VALUES +
                                                this.MAX_VALUES * b * e),
                                        c = t;
                                    (h > 0 && i > c) || (0 > h && c > i);

                                )
                                    l.push(Math.round(c)), (c += n)
                                l[l.length - 1] !== i && l.push(i), b++
                            } else
                                l = function () {
                                    E = []
                                    for (
                                        var a = t;
                                        i >= t ? i >= a : a >= i;
                                        i >= t ? a++ : a--
                                    )
                                        E.push(a)
                                    return E
                                }.apply(this)
                            for (m = w = 0, y = l.length; y > w; m = ++w)
                                (k = l[m]), (l[m] = Math.abs(k % 10))
                            g.push(l)
                        }
                        for (
                            this.resetDigits(),
                                D = g.reverse(),
                                m = x = 0,
                                z = D.length;
                            z > x;
                            m = ++x
                        )
                            for (
                                l = D[m],
                                    this.digits[m] ||
                                        this.addDigit(" ", m >= j),
                                    null == (u = this.ribbons)[m] &&
                                        (u[m] = this.digits[m].querySelector(
                                            ".odometer-ribbon-inner"
                                        )),
                                    this.ribbons[m].innerHTML = "",
                                    0 > d && (l = l.reverse()),
                                    o = C = 0,
                                    B = l.length;
                                B > C;
                                o = ++C
                            )
                                (k = l[o]),
                                    (q = document.createElement("div")),
                                    (q.className = "odometer-value"),
                                    (q.innerHTML = k),
                                    this.ribbons[m].appendChild(q),
                                    o === l.length - 1 &&
                                        r(q, "odometer-last-value"),
                                    0 === o && r(q, "odometer-first-value")
                        return (
                            0 > t && this.addDigit("-"),
                            (p = this.inside.querySelector(
                                ".odometer-radix-mark"
                            )),
                            null != p && p.parent.removeChild(p),
                            j
                                ? this.addSpacer(
                                      this.format.radix,
                                      this.digits[j - 1],
                                      "odometer-radix-mark"
                                  )
                                : void 0
                        )
                    }
                }),
                a
            )
        })()),
        (m.options = null != (E = window.odometerOptions) ? E : {}),
        setTimeout(function () {
            var a, b, c, d, e
            if (window.odometerOptions) {
                ;(d = window.odometerOptions), (e = [])
                for (a in d)
                    (b = d[a]),
                        e.push(
                            null != (c = m.options)[a]
                                ? (c = m.options)[a]
                                : (c[a] = b)
                        )
                return e
            }
        }, 0),
        (m.init = function () {
            var a, b, c, d, e, f
            if (null != document.querySelectorAll) {
                for (
                    b = document.querySelectorAll(
                        m.options.selector || ".odometer"
                    ),
                        f = [],
                        c = 0,
                        d = b.length;
                    d > c;
                    c++
                )
                    (a = b[c]),
                        f.push(
                            (a.odometer = new m({
                                el: a,
                                value:
                                    null != (e = a.innerText)
                                        ? e
                                        : a.textContent,
                            }))
                        )
                return f
            }
        }),
        null !=
            (null != (F = document.documentElement) ? F.doScroll : void 0) &&
        null != document.createEventObject
            ? ((D = document.onreadystatechange),
              (document.onreadystatechange = function () {
                  return (
                      "complete" === document.readyState &&
                          m.options.auto !== !1 &&
                          m.init(),
                      null != D ? D.apply(this, arguments) : void 0
                  )
              }))
            : document.addEventListener(
                  "DOMContentLoaded",
                  function () {
                      return m.options.auto !== !1 ? m.init() : void 0
                  },
                  !1
              ),
        "function" == typeof define && define.amd
            ? define(["jquery"], function () {
                  return m
              })
            : typeof exports === !1
            ? (module.exports = m)
            : (window.Odometer = m)
}.call(this))

/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by Hernán Sartorio  */
!(function (e) {
    e.fn.niceSelect = function (t) {
        function s(t) {
            t.after(
                e("<div></div>")
                    .addClass("nice-select")
                    .addClass(t.attr("class") || "")
                    .addClass(t.attr("disabled") ? "disabled" : "")
                    .attr("tabindex", t.attr("disabled") ? null : "0")
                    .html('<span class="current"></span><ul class="list"></ul>')
            )
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected")
            s.find(".current").html(i.data("display") || i.text()),
                n.each(function (t) {
                    var n = e(this),
                        i = n.data("display")
                    s.find("ul").append(
                        e("<li></li>")
                            .attr("data-value", n.val())
                            .attr("data-display", i || null)
                            .addClass(
                                "option" +
                                    (n.is(":selected") ? " selected" : "") +
                                    (n.is(":disabled") ? " disabled" : "")
                            )
                            .html(n.text())
                    )
                })
        }
        if ("string" == typeof t)
            return (
                "update" == t
                    ? this.each(function () {
                          var t = e(this),
                              n = e(this).next(".nice-select"),
                              i = n.hasClass("open")
                          n.length &&
                              (n.remove(), s(t), i && t.next().trigger("click"))
                      })
                    : "destroy" == t
                    ? (this.each(function () {
                          var t = e(this),
                              s = e(this).next(".nice-select")
                          s.length && (s.remove(), t.css("display", ""))
                      }),
                      0 == e(".nice-select").length &&
                          e(document).off(".nice_select"))
                    : console.log('Method "' + t + '" does not exist.'),
                this
            )
        this.hide(),
            this.each(function () {
                var t = e(this)
                t.next().hasClass("nice-select") || s(t)
            }),
            e(document).off(".nice_select"),
            e(document).on("click.nice_select", ".nice-select", function (t) {
                var s = e(this)
                e(".nice-select").not(s).removeClass("open"),
                    s.toggleClass("open"),
                    s.hasClass("open")
                        ? (s.find(".option"),
                          s.find(".focus").removeClass("focus"),
                          s.find(".selected").addClass("focus"))
                        : s.focus()
            }),
            e(document).on("click.nice_select", function (t) {
                0 === e(t.target).closest(".nice-select").length &&
                    e(".nice-select").removeClass("open").find(".option")
            }),
            e(document).on(
                "click.nice_select",
                ".nice-select .option:not(.disabled)",
                function (t) {
                    var s = e(this),
                        n = s.closest(".nice-select")
                    n.find(".selected").removeClass("selected"),
                        s.addClass("selected")
                    var i = s.data("display") || s.text()
                    n.find(".current").text(i),
                        n.prev("select").val(s.data("value")).trigger("change")
                }
            ),
            e(document).on("keydown.nice_select", ".nice-select", function (t) {
                var s = e(this),
                    n = e(s.find(".focus") || s.find(".list .option.selected"))
                if (32 == t.keyCode || 13 == t.keyCode)
                    return (
                        s.hasClass("open")
                            ? n.trigger("click")
                            : s.trigger("click"),
                        !1
                    )
                if (40 == t.keyCode) {
                    if (s.hasClass("open")) {
                        var i = n.nextAll(".option:not(.disabled)").first()
                        i.length > 0 &&
                            (s.find(".focus").removeClass("focus"),
                            i.addClass("focus"))
                    } else s.trigger("click")
                    return !1
                }
                if (38 == t.keyCode) {
                    if (s.hasClass("open")) {
                        var l = n.prevAll(".option:not(.disabled)").first()
                        l.length > 0 &&
                            (s.find(".focus").removeClass("focus"),
                            l.addClass("focus"))
                    } else s.trigger("click")
                    return !1
                }
                if (27 == t.keyCode) s.hasClass("open") && s.trigger("click")
                else if (9 == t.keyCode && s.hasClass("open")) return !1
            })
        var n = document.createElement("a").style
        return (
            (n.cssText = "pointer-events:auto"),
            "auto" !== n.pointerEvents &&
                e("html").addClass("no-csspointerevents"),
            this
        )
    }
})(jQuery)

/*! Select2 4.1.0-beta.1 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (n) {
    "function" == typeof define && define.amd
        ? define(["jquery"], n)
        : "object" == typeof module && module.exports
        ? (module.exports = function (e, t) {
              return (
                  void 0 === t &&
                      (t =
                          "undefined" != typeof window
                              ? require("jquery")
                              : require("jquery")(e)),
                  n(t),
                  t
              )
          })
        : n(jQuery)
})(function (u) {
    var e = (function () {
            if (u && u.fn && u.fn.select2 && u.fn.select2.amd)
                var e = u.fn.select2.amd
            var t, n, i, h, s, o, f, g, m, v, y, _, r, a, b
            function w(e, t) {
                return r.call(e, t)
            }
            function l(e, t) {
                var n,
                    i,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    u,
                    d,
                    p,
                    h = t && t.split("/"),
                    f = y.map,
                    g = (f && f["*"]) || {}
                if (e) {
                    for (
                        o = (e = e.split("/")).length - 1,
                            y.nodeIdCompat &&
                                b.test(e[o]) &&
                                (e[o] = e[o].replace(b, "")),
                            "." === e[0].charAt(0) &&
                                h &&
                                (e = h.slice(0, h.length - 1).concat(e)),
                            u = 0;
                        u < e.length;
                        u++
                    )
                        if ("." === (p = e[u])) e.splice(u, 1), (u -= 1)
                        else if (".." === p) {
                            if (
                                0 === u ||
                                (1 === u && ".." === e[2]) ||
                                ".." === e[u - 1]
                            )
                                continue
                            0 < u && (e.splice(u - 1, 2), (u -= 2))
                        }
                    e = e.join("/")
                }
                if ((h || g) && f) {
                    for (u = (n = e.split("/")).length; 0 < u; u -= 1) {
                        if (((i = n.slice(0, u).join("/")), h))
                            for (d = h.length; 0 < d; d -= 1)
                                if (
                                    (r =
                                        (r = f[h.slice(0, d).join("/")]) &&
                                        r[i])
                                ) {
                                    ;(s = r), (a = u)
                                    break
                                }
                        if (s) break
                        !l && g && g[i] && ((l = g[i]), (c = u))
                    }
                    !s && l && ((s = l), (a = c)),
                        s && (n.splice(0, a, s), (e = n.join("/")))
                }
                return e
            }
            function x(t, n) {
                return function () {
                    var e = a.call(arguments, 0)
                    return (
                        "string" != typeof e[0] &&
                            1 === e.length &&
                            e.push(null),
                        o.apply(h, e.concat([t, n]))
                    )
                }
            }
            function A(t) {
                return function (e) {
                    m[t] = e
                }
            }
            function D(e) {
                if (w(v, e)) {
                    var t = v[e]
                    delete v[e], (_[e] = !0), s.apply(h, t)
                }
                if (!w(m, e) && !w(_, e)) throw new Error("No " + e)
                return m[e]
            }
            function c(e) {
                var t,
                    n = e ? e.indexOf("!") : -1
                return (
                    -1 < n &&
                        ((t = e.substring(0, n)),
                        (e = e.substring(n + 1, e.length))),
                    [t, e]
                )
            }
            function S(e) {
                return e ? c(e) : []
            }
            return (
                (e && e.requirejs) ||
                    (e ? (n = e) : (e = {}),
                    (m = {}),
                    (v = {}),
                    (y = {}),
                    (_ = {}),
                    (r = Object.prototype.hasOwnProperty),
                    (a = [].slice),
                    (b = /\.js$/),
                    (f = function (e, t) {
                        var n,
                            i = c(e),
                            r = i[0],
                            s = t[1]
                        return (
                            (e = i[1]),
                            r && (n = D((r = l(r, s)))),
                            r
                                ? (e =
                                      n && n.normalize
                                          ? n.normalize(
                                                e,
                                                (function (t) {
                                                    return function (e) {
                                                        return l(e, t)
                                                    }
                                                })(s)
                                            )
                                          : l(e, s))
                                : ((r = (i = c((e = l(e, s))))[0]),
                                  (e = i[1]),
                                  r && (n = D(r))),
                            { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
                        )
                    }),
                    (g = {
                        require: function (e) {
                            return x(e)
                        },
                        exports: function (e) {
                            var t = m[e]
                            return void 0 !== t ? t : (m[e] = {})
                        },
                        module: function (e) {
                            return {
                                id: e,
                                uri: "",
                                exports: m[e],
                                config: (function (e) {
                                    return function () {
                                        return (
                                            (y && y.config && y.config[e]) || {}
                                        )
                                    }
                                })(e),
                            }
                        },
                    }),
                    (s = function (e, t, n, i) {
                        var r,
                            s,
                            o,
                            a,
                            l,
                            c,
                            u,
                            d = [],
                            p = typeof n
                        if (
                            ((c = S((i = i || e))),
                            "undefined" == p || "function" == p)
                        ) {
                            for (
                                t =
                                    !t.length && n.length
                                        ? ["require", "exports", "module"]
                                        : t,
                                    l = 0;
                                l < t.length;
                                l += 1
                            )
                                if ("require" === (s = (a = f(t[l], c)).f))
                                    d[l] = g.require(e)
                                else if ("exports" === s)
                                    (d[l] = g.exports(e)), (u = !0)
                                else if ("module" === s) r = d[l] = g.module(e)
                                else if (w(m, s) || w(v, s) || w(_, s))
                                    d[l] = D(s)
                                else {
                                    if (!a.p)
                                        throw new Error(e + " missing " + s)
                                    a.p.load(a.n, x(i, !0), A(s), {}),
                                        (d[l] = m[s])
                                }
                            ;(o = n ? n.apply(m[e], d) : void 0),
                                e &&
                                    (r && r.exports !== h && r.exports !== m[e]
                                        ? (m[e] = r.exports)
                                        : (o === h && u) || (m[e] = o))
                        } else e && (m[e] = n)
                    }),
                    (t =
                        n =
                        o =
                            function (e, t, n, i, r) {
                                if ("string" == typeof e)
                                    return g[e] ? g[e](t) : D(f(e, S(t)).f)
                                if (!e.splice) {
                                    if (
                                        ((y = e).deps && o(y.deps, y.callback),
                                        !t)
                                    )
                                        return
                                    t.splice
                                        ? ((e = t), (t = n), (n = null))
                                        : (e = h)
                                }
                                return (
                                    (t = t || function () {}),
                                    "function" == typeof n &&
                                        ((n = i), (i = r)),
                                    i
                                        ? s(h, e, t, n)
                                        : setTimeout(function () {
                                              s(h, e, t, n)
                                          }, 4),
                                    o
                                )
                            }),
                    (o.config = function (e) {
                        return o(e)
                    }),
                    (t._defined = m),
                    ((i = function (e, t, n) {
                        if ("string" != typeof e)
                            throw new Error(
                                "See almond README: incorrect module build, no module name"
                            )
                        t.splice || ((n = t), (t = [])),
                            w(m, e) || w(v, e) || (v[e] = [e, t, n])
                    }).amd = { jQuery: !0 }),
                    (e.requirejs = t),
                    (e.require = n),
                    (e.define = i)),
                e.define("almond", function () {}),
                e.define("jquery", [], function () {
                    var e = u || $
                    return (
                        null == e &&
                            console &&
                            console.error &&
                            console.error(
                                "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
                            ),
                        e
                    )
                }),
                e.define("select2/utils", ["jquery"], function (s) {
                    var r = {}
                    function u(e) {
                        var t = e.prototype,
                            n = []
                        for (var i in t) {
                            "function" == typeof t[i] &&
                                "constructor" !== i &&
                                n.push(i)
                        }
                        return n
                    }
                    ;(r.Extend = function (e, t) {
                        var n = {}.hasOwnProperty
                        function i() {
                            this.constructor = e
                        }
                        for (var r in t) n.call(t, r) && (e[r] = t[r])
                        return (
                            (i.prototype = t.prototype),
                            (e.prototype = new i()),
                            (e.__super__ = t.prototype),
                            e
                        )
                    }),
                        (r.Decorate = function (i, r) {
                            var e = u(r),
                                t = u(i)
                            function s() {
                                var e = Array.prototype.unshift,
                                    t = r.prototype.constructor.length,
                                    n = i.prototype.constructor
                                0 < t &&
                                    (e.call(arguments, i.prototype.constructor),
                                    (n = r.prototype.constructor)),
                                    n.apply(this, arguments)
                            }
                            ;(r.displayName = i.displayName),
                                (s.prototype = new (function () {
                                    this.constructor = s
                                })())
                            for (var n = 0; n < t.length; n++) {
                                var o = t[n]
                                s.prototype[o] = i.prototype[o]
                            }
                            function a(e) {
                                var t = function () {}
                                e in s.prototype && (t = s.prototype[e])
                                var n = r.prototype[e]
                                return function () {
                                    return (
                                        Array.prototype.unshift.call(
                                            arguments,
                                            t
                                        ),
                                        n.apply(this, arguments)
                                    )
                                }
                            }
                            for (var l = 0; l < e.length; l++) {
                                var c = e[l]
                                s.prototype[c] = a(c)
                            }
                            return s
                        })
                    function e() {
                        this.listeners = {}
                    }
                    ;(e.prototype.on = function (e, t) {
                        ;(this.listeners = this.listeners || {}),
                            e in this.listeners
                                ? this.listeners[e].push(t)
                                : (this.listeners[e] = [t])
                    }),
                        (e.prototype.trigger = function (e) {
                            var t = Array.prototype.slice,
                                n = t.call(arguments, 1)
                            ;(this.listeners = this.listeners || {}),
                                null == n && (n = []),
                                0 === n.length && n.push({}),
                                (n[0]._type = e) in this.listeners &&
                                    this.invoke(
                                        this.listeners[e],
                                        t.call(arguments, 1)
                                    ),
                                "*" in this.listeners &&
                                    this.invoke(this.listeners["*"], arguments)
                        }),
                        (e.prototype.invoke = function (e, t) {
                            for (var n = 0, i = e.length; n < i; n++)
                                e[n].apply(this, t)
                        }),
                        (r.Observable = e),
                        (r.generateChars = function (e) {
                            for (var t = "", n = 0; n < e; n++) {
                                t += Math.floor(36 * Math.random()).toString(36)
                            }
                            return t
                        }),
                        (r.bind = function (e, t) {
                            return function () {
                                e.apply(t, arguments)
                            }
                        }),
                        (r._convertData = function (e) {
                            for (var t in e) {
                                var n = t.split("-"),
                                    i = e
                                if (1 !== n.length) {
                                    for (var r = 0; r < n.length; r++) {
                                        var s = n[r]
                                        ;(s =
                                            s.substring(0, 1).toLowerCase() +
                                            s.substring(1)) in i || (i[s] = {}),
                                            r == n.length - 1 && (i[s] = e[t]),
                                            (i = i[s])
                                    }
                                    delete e[t]
                                }
                            }
                            return e
                        }),
                        (r.hasScroll = function (e, t) {
                            var n = s(t),
                                i = t.style.overflowX,
                                r = t.style.overflowY
                            return (
                                (i !== r ||
                                    ("hidden" !== r && "visible" !== r)) &&
                                ("scroll" === i ||
                                    "scroll" === r ||
                                    n.innerHeight() < t.scrollHeight ||
                                    n.innerWidth() < t.scrollWidth)
                            )
                        }),
                        (r.escapeMarkup = function (e) {
                            var t = {
                                "\\": "&#92;",
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                                "/": "&#47;",
                            }
                            return "string" != typeof e
                                ? e
                                : String(e).replace(
                                      /[&<>"'\/\\]/g,
                                      function (e) {
                                          return t[e]
                                      }
                                  )
                        }),
                        (r.__cache = {})
                    var n = 0
                    return (
                        (r.GetUniqueElementId = function (e) {
                            var t = e.getAttribute("data-select2-id")
                            return (
                                null != t ||
                                    ((t = e.id
                                        ? "select2-data-" + e.id
                                        : "select2-data-" +
                                          (++n).toString() +
                                          "-" +
                                          r.generateChars(4)),
                                    e.setAttribute("data-select2-id", t)),
                                t
                            )
                        }),
                        (r.StoreData = function (e, t, n) {
                            var i = r.GetUniqueElementId(e)
                            r.__cache[i] || (r.__cache[i] = {}),
                                (r.__cache[i][t] = n)
                        }),
                        (r.GetData = function (e, t) {
                            var n = r.GetUniqueElementId(e)
                            return t
                                ? r.__cache[n] && null != r.__cache[n][t]
                                    ? r.__cache[n][t]
                                    : s(e).data(t)
                                : r.__cache[n]
                        }),
                        (r.RemoveData = function (e) {
                            var t = r.GetUniqueElementId(e)
                            null != r.__cache[t] && delete r.__cache[t],
                                e.removeAttribute("data-select2-id")
                        }),
                        (r.copyNonInternalCssClasses = function (e, t) {
                            var n = e.getAttribute("class").trim().split(/\s+/)
                            n = n.filter(function (e) {
                                return 0 === e.indexOf("select2-")
                            })
                            var i = t.getAttribute("class").trim().split(/\s+/)
                            i = i.filter(function (e) {
                                return 0 !== e.indexOf("select2-")
                            })
                            var r = n.concat(i)
                            e.setAttribute("class", r.join(" "))
                        }),
                        r
                    )
                }),
                e.define(
                    "select2/results",
                    ["jquery", "./utils"],
                    function (h, f) {
                        function i(e, t, n) {
                            ;(this.$element = e),
                                (this.data = n),
                                (this.options = t),
                                i.__super__.constructor.call(this)
                        }
                        return (
                            f.Extend(i, f.Observable),
                            (i.prototype.render = function () {
                                var e = h(
                                    '<ul class="select2-results__options" role="listbox"></ul>'
                                )
                                return (
                                    this.options.get("multiple") &&
                                        e.attr("aria-multiselectable", "true"),
                                    (this.$results = e)
                                )
                            }),
                            (i.prototype.clear = function () {
                                this.$results.empty()
                            }),
                            (i.prototype.displayMessage = function (e) {
                                var t = this.options.get("escapeMarkup")
                                this.clear(), this.hideLoading()
                                var n = h(
                                        '<li role="alert" aria-live="assertive" class="select2-results__option"></li>'
                                    ),
                                    i = this.options
                                        .get("translations")
                                        .get(e.message)
                                n.append(t(i(e.args))),
                                    (n[0].className +=
                                        " select2-results__message"),
                                    this.$results.append(n)
                            }),
                            (i.prototype.hideMessages = function () {
                                this.$results
                                    .find(".select2-results__message")
                                    .remove()
                            }),
                            (i.prototype.append = function (e) {
                                this.hideLoading()
                                var t = []
                                if (
                                    null != e.results &&
                                    0 !== e.results.length
                                ) {
                                    e.results = this.sort(e.results)
                                    for (var n = 0; n < e.results.length; n++) {
                                        var i = e.results[n],
                                            r = this.option(i)
                                        t.push(r)
                                    }
                                    this.$results.append(t)
                                } else
                                    0 === this.$results.children().length &&
                                        this.trigger("results:message", {
                                            message: "noResults",
                                        })
                            }),
                            (i.prototype.position = function (e, t) {
                                t.find(".select2-results").append(e)
                            }),
                            (i.prototype.sort = function (e) {
                                return this.options.get("sorter")(e)
                            }),
                            (i.prototype.highlightFirstItem = function () {
                                var e = this.$results.find(
                                        ".select2-results__option--selectable"
                                    ),
                                    t = e.filter(
                                        ".select2-results__option--selected"
                                    )
                                0 < t.length
                                    ? t.first().trigger("mouseenter")
                                    : e.first().trigger("mouseenter"),
                                    this.ensureHighlightVisible()
                            }),
                            (i.prototype.setClasses = function () {
                                var t = this
                                this.data.current(function (e) {
                                    var i = e.map(function (e) {
                                        return e.id.toString()
                                    })
                                    t.$results
                                        .find(
                                            ".select2-results__option--selectable"
                                        )
                                        .each(function () {
                                            var e = h(this),
                                                t = f.GetData(this, "data"),
                                                n = "" + t.id
                                            ;(null != t.element &&
                                                t.element.selected) ||
                                            (null == t.element &&
                                                -1 < i.indexOf(n))
                                                ? (this.classList.add(
                                                      "select2-results__option--selected"
                                                  ),
                                                  e.attr(
                                                      "aria-selected",
                                                      "true"
                                                  ))
                                                : (this.classList.remove(
                                                      "select2-results__option--selected"
                                                  ),
                                                  e.attr(
                                                      "aria-selected",
                                                      "false"
                                                  ))
                                        })
                                })
                            }),
                            (i.prototype.showLoading = function (e) {
                                this.hideLoading()
                                var t = {
                                        disabled: !0,
                                        loading: !0,
                                        text: this.options
                                            .get("translations")
                                            .get("searching")(e),
                                    },
                                    n = this.option(t)
                                ;(n.className += " loading-results"),
                                    this.$results.prepend(n)
                            }),
                            (i.prototype.hideLoading = function () {
                                this.$results.find(".loading-results").remove()
                            }),
                            (i.prototype.option = function (e) {
                                var t = document.createElement("li")
                                t.classList.add("select2-results__option"),
                                    t.classList.add(
                                        "select2-results__option--selectable"
                                    )
                                var n = { role: "option" },
                                    i =
                                        window.Element.prototype.matches ||
                                        window.Element.prototype
                                            .msMatchesSelector ||
                                        window.Element.prototype
                                            .webkitMatchesSelector
                                for (var r in (((null != e.element &&
                                    i.call(e.element, ":disabled")) ||
                                    (null == e.element && e.disabled)) &&
                                    ((n["aria-disabled"] = "true"),
                                    t.classList.remove(
                                        "select2-results__option--selectable"
                                    ),
                                    t.classList.add(
                                        "select2-results__option--disabled"
                                    )),
                                null == e.id &&
                                    t.classList.remove(
                                        "select2-results__option--selectable"
                                    ),
                                null != e._resultId && (t.id = e._resultId),
                                e.title && (t.title = e.title),
                                e.children &&
                                    ((n.role = "group"),
                                    (n["aria-label"] = e.text),
                                    t.classList.remove(
                                        "select2-results__option--selectable"
                                    ),
                                    t.classList.add(
                                        "select2-results__option--group"
                                    )),
                                n)) {
                                    var s = n[r]
                                    t.setAttribute(r, s)
                                }
                                if (e.children) {
                                    var o = h(t),
                                        a = document.createElement("strong")
                                    ;(a.className = "select2-results__group"),
                                        this.template(e, a)
                                    for (
                                        var l = [], c = 0;
                                        c < e.children.length;
                                        c++
                                    ) {
                                        var u = e.children[c],
                                            d = this.option(u)
                                        l.push(d)
                                    }
                                    var p = h("<ul></ul>", {
                                        class: "select2-results__options select2-results__options--nested",
                                    })
                                    p.append(l), o.append(a), o.append(p)
                                } else this.template(e, t)
                                return f.StoreData(t, "data", e), t
                            }),
                            (i.prototype.bind = function (t, e) {
                                var l = this,
                                    n = t.id + "-results"
                                this.$results.attr("id", n),
                                    t.on("results:all", function (e) {
                                        l.clear(),
                                            l.append(e.data),
                                            t.isOpen() &&
                                                (l.setClasses(),
                                                l.highlightFirstItem())
                                    }),
                                    t.on("results:append", function (e) {
                                        l.append(e.data),
                                            t.isOpen() && l.setClasses()
                                    }),
                                    t.on("query", function (e) {
                                        l.hideMessages(), l.showLoading(e)
                                    }),
                                    t.on("select", function () {
                                        t.isOpen() &&
                                            (l.setClasses(),
                                            l.options.get(
                                                "scrollAfterSelect"
                                            ) && l.highlightFirstItem())
                                    }),
                                    t.on("unselect", function () {
                                        t.isOpen() &&
                                            (l.setClasses(),
                                            l.options.get(
                                                "scrollAfterSelect"
                                            ) && l.highlightFirstItem())
                                    }),
                                    t.on("open", function () {
                                        l.$results.attr(
                                            "aria-expanded",
                                            "true"
                                        ),
                                            l.$results.attr(
                                                "aria-hidden",
                                                "false"
                                            ),
                                            l.setClasses(),
                                            l.ensureHighlightVisible()
                                    }),
                                    t.on("close", function () {
                                        l.$results.attr(
                                            "aria-expanded",
                                            "false"
                                        ),
                                            l.$results.attr(
                                                "aria-hidden",
                                                "true"
                                            ),
                                            l.$results.removeAttr(
                                                "aria-activedescendant"
                                            )
                                    }),
                                    t.on("results:toggle", function () {
                                        var e = l.getHighlightedResults()
                                        0 !== e.length && e.trigger("mouseup")
                                    }),
                                    t.on("results:select", function () {
                                        var e = l.getHighlightedResults()
                                        if (0 !== e.length) {
                                            var t = f.GetData(e[0], "data")
                                            e.hasClass(
                                                "select2-results__option--selected"
                                            )
                                                ? l.trigger("close", {})
                                                : l.trigger("select", {
                                                      data: t,
                                                  })
                                        }
                                    }),
                                    t.on("results:previous", function () {
                                        var e = l.getHighlightedResults(),
                                            t = l.$results.find(
                                                ".select2-results__option--selectable"
                                            ),
                                            n = t.index(e)
                                        if (!(n <= 0)) {
                                            var i = n - 1
                                            0 === e.length && (i = 0)
                                            var r = t.eq(i)
                                            r.trigger("mouseenter")
                                            var s = l.$results.offset().top,
                                                o = r.offset().top,
                                                a =
                                                    l.$results.scrollTop() +
                                                    (o - s)
                                            0 === i
                                                ? l.$results.scrollTop(0)
                                                : o - s < 0 &&
                                                  l.$results.scrollTop(a)
                                        }
                                    }),
                                    t.on("results:next", function () {
                                        var e = l.getHighlightedResults(),
                                            t = l.$results.find(
                                                ".select2-results__option--selectable"
                                            ),
                                            n = t.index(e) + 1
                                        if (!(n >= t.length)) {
                                            var i = t.eq(n)
                                            i.trigger("mouseenter")
                                            var r =
                                                    l.$results.offset().top +
                                                    l.$results.outerHeight(!1),
                                                s =
                                                    i.offset().top +
                                                    i.outerHeight(!1),
                                                o =
                                                    l.$results.scrollTop() +
                                                    s -
                                                    r
                                            0 === n
                                                ? l.$results.scrollTop(0)
                                                : r < s &&
                                                  l.$results.scrollTop(o)
                                        }
                                    }),
                                    t.on("results:focus", function (e) {
                                        e.element[0].classList.add(
                                            "select2-results__option--highlighted"
                                        ),
                                            e.element[0].setAttribute(
                                                "aria-selected",
                                                "true"
                                            )
                                    }),
                                    t.on("results:message", function (e) {
                                        l.displayMessage(e)
                                    }),
                                    h.fn.mousewheel &&
                                        this.$results.on(
                                            "mousewheel",
                                            function (e) {
                                                var t = l.$results.scrollTop(),
                                                    n =
                                                        l.$results.get(0)
                                                            .scrollHeight -
                                                        t +
                                                        e.deltaY,
                                                    i =
                                                        0 < e.deltaY &&
                                                        t - e.deltaY <= 0,
                                                    r =
                                                        e.deltaY < 0 &&
                                                        n <= l.$results.height()
                                                i
                                                    ? (l.$results.scrollTop(0),
                                                      e.preventDefault(),
                                                      e.stopPropagation())
                                                    : r &&
                                                      (l.$results.scrollTop(
                                                          l.$results.get(0)
                                                              .scrollHeight -
                                                              l.$results.height()
                                                      ),
                                                      e.preventDefault(),
                                                      e.stopPropagation())
                                            }
                                        ),
                                    this.$results.on(
                                        "mouseup",
                                        ".select2-results__option--selectable",
                                        function (e) {
                                            var t = h(this),
                                                n = f.GetData(this, "data")
                                            t.hasClass(
                                                "select2-results__option--selected"
                                            )
                                                ? l.options.get("multiple")
                                                    ? l.trigger("unselect", {
                                                          originalEvent: e,
                                                          data: n,
                                                      })
                                                    : l.trigger("close", {})
                                                : l.trigger("select", {
                                                      originalEvent: e,
                                                      data: n,
                                                  })
                                        }
                                    ),
                                    this.$results.on(
                                        "mouseenter",
                                        ".select2-results__option--selectable",
                                        function (e) {
                                            var t = f.GetData(this, "data")
                                            l
                                                .getHighlightedResults()
                                                .removeClass(
                                                    "select2-results__option--highlighted"
                                                )
                                                .attr("aria-selected", "false"),
                                                l.trigger("results:focus", {
                                                    data: t,
                                                    element: h(this),
                                                })
                                        }
                                    )
                            }),
                            (i.prototype.getHighlightedResults = function () {
                                return this.$results.find(
                                    ".select2-results__option--highlighted"
                                )
                            }),
                            (i.prototype.destroy = function () {
                                this.$results.remove()
                            }),
                            (i.prototype.ensureHighlightVisible = function () {
                                var e = this.getHighlightedResults()
                                if (0 !== e.length) {
                                    var t = this.$results
                                            .find(
                                                ".select2-results__option--selectable"
                                            )
                                            .index(e),
                                        n = this.$results.offset().top,
                                        i = e.offset().top,
                                        r = this.$results.scrollTop() + (i - n),
                                        s = i - n
                                    ;(r -= 2 * e.outerHeight(!1)),
                                        t <= 2
                                            ? this.$results.scrollTop(0)
                                            : (s >
                                                  this.$results.outerHeight() ||
                                                  s < 0) &&
                                              this.$results.scrollTop(r)
                                }
                            }),
                            (i.prototype.template = function (e, t) {
                                var n = this.options.get("templateResult"),
                                    i = this.options.get("escapeMarkup"),
                                    r = n(e, t)
                                null == r
                                    ? (t.style.display = "none")
                                    : "string" == typeof r
                                    ? (t.innerHTML = i(r))
                                    : h(t).append(r)
                            }),
                            i
                        )
                    }
                ),
                e.define("select2/keys", [], function () {
                    return {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46,
                    }
                }),
                e.define(
                    "select2/selection/base",
                    ["jquery", "../utils", "../keys"],
                    function (n, i, r) {
                        function s(e, t) {
                            ;(this.$element = e),
                                (this.options = t),
                                s.__super__.constructor.call(this)
                        }
                        return (
                            i.Extend(s, i.Observable),
                            (s.prototype.render = function () {
                                var e = n(
                                    '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
                                )
                                return (
                                    (this._tabindex = 0),
                                    null !=
                                    i.GetData(this.$element[0], "old-tabindex")
                                        ? (this._tabindex = i.GetData(
                                              this.$element[0],
                                              "old-tabindex"
                                          ))
                                        : null !=
                                              this.$element.attr("tabindex") &&
                                          (this._tabindex =
                                              this.$element.attr("tabindex")),
                                    e.attr(
                                        "title",
                                        this.$element.attr("title")
                                    ),
                                    e.attr("tabindex", this._tabindex),
                                    e.attr("aria-disabled", "false"),
                                    (this.$selection = e)
                                )
                            }),
                            (s.prototype.bind = function (e, t) {
                                var n = this,
                                    i = e.id + "-results"
                                ;(this.container = e),
                                    this.$selection.on("focus", function (e) {
                                        n.trigger("focus", e)
                                    }),
                                    this.$selection.on("blur", function (e) {
                                        n._handleBlur(e)
                                    }),
                                    this.$selection.on("keydown", function (e) {
                                        n.trigger("keypress", e),
                                            e.which === r.SPACE &&
                                                e.preventDefault()
                                    }),
                                    e.on("results:focus", function (e) {
                                        n.$selection.attr(
                                            "aria-activedescendant",
                                            e.data._resultId
                                        )
                                    }),
                                    e.on("selection:update", function (e) {
                                        n.update(e.data)
                                    }),
                                    e.on("open", function () {
                                        n.$selection.attr(
                                            "aria-expanded",
                                            "true"
                                        ),
                                            n.$selection.attr("aria-owns", i),
                                            n._attachCloseHandler(e)
                                    }),
                                    e.on("close", function () {
                                        n.$selection.attr(
                                            "aria-expanded",
                                            "false"
                                        ),
                                            n.$selection.removeAttr(
                                                "aria-activedescendant"
                                            ),
                                            n.$selection.removeAttr(
                                                "aria-owns"
                                            ),
                                            n.$selection.trigger("focus"),
                                            n._detachCloseHandler(e)
                                    }),
                                    e.on("enable", function () {
                                        n.$selection.attr(
                                            "tabindex",
                                            n._tabindex
                                        ),
                                            n.$selection.attr(
                                                "aria-disabled",
                                                "false"
                                            )
                                    }),
                                    e.on("disable", function () {
                                        n.$selection.attr("tabindex", "-1"),
                                            n.$selection.attr(
                                                "aria-disabled",
                                                "true"
                                            )
                                    })
                            }),
                            (s.prototype._handleBlur = function (e) {
                                var t = this
                                window.setTimeout(function () {
                                    document.activeElement == t.$selection[0] ||
                                        n.contains(
                                            t.$selection[0],
                                            document.activeElement
                                        ) ||
                                        t.trigger("blur", e)
                                }, 1)
                            }),
                            (s.prototype._attachCloseHandler = function (e) {
                                n(document.body).on(
                                    "mousedown.select2." + e.id,
                                    function (e) {
                                        var t = n(e.target).closest(".select2")
                                        n(
                                            ".select2.select2-container--open"
                                        ).each(function () {
                                            this != t[0] &&
                                                i
                                                    .GetData(this, "element")
                                                    .select2("close")
                                        })
                                    }
                                )
                            }),
                            (s.prototype._detachCloseHandler = function (e) {
                                n(document.body).off(
                                    "mousedown.select2." + e.id
                                )
                            }),
                            (s.prototype.position = function (e, t) {
                                t.find(".selection").append(e)
                            }),
                            (s.prototype.destroy = function () {
                                this._detachCloseHandler(this.container)
                            }),
                            (s.prototype.update = function (e) {
                                throw new Error(
                                    "The `update` method must be defined in child classes."
                                )
                            }),
                            (s.prototype.isEnabled = function () {
                                return !this.isDisabled()
                            }),
                            (s.prototype.isDisabled = function () {
                                return this.options.get("disabled")
                            }),
                            s
                        )
                    }
                ),
                e.define(
                    "select2/selection/single",
                    ["jquery", "./base", "../utils", "../keys"],
                    function (e, t, n, i) {
                        function r() {
                            r.__super__.constructor.apply(this, arguments)
                        }
                        return (
                            n.Extend(r, t),
                            (r.prototype.render = function () {
                                var e = r.__super__.render.call(this)
                                return (
                                    e[0].classList.add(
                                        "select2-selection--single"
                                    ),
                                    e.html(
                                        '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                                    ),
                                    e
                                )
                            }),
                            (r.prototype.bind = function (t, e) {
                                var n = this
                                r.__super__.bind.apply(this, arguments)
                                var i = t.id + "-container"
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .attr("id", i)
                                    .attr("role", "textbox")
                                    .attr("aria-readonly", "true"),
                                    this.$selection.attr("aria-labelledby", i),
                                    this.$selection.on(
                                        "mousedown",
                                        function (e) {
                                            1 === e.which &&
                                                n.trigger("toggle", {
                                                    originalEvent: e,
                                                })
                                        }
                                    ),
                                    this.$selection.on(
                                        "focus",
                                        function (e) {}
                                    ),
                                    this.$selection.on("blur", function (e) {}),
                                    t.on("focus", function (e) {
                                        t.isOpen() ||
                                            n.$selection.trigger("focus")
                                    })
                            }),
                            (r.prototype.clear = function () {
                                var e = this.$selection.find(
                                    ".select2-selection__rendered"
                                )
                                e.empty(), e.removeAttr("title")
                            }),
                            (r.prototype.display = function (e, t) {
                                var n = this.options.get("templateSelection")
                                return this.options.get("escapeMarkup")(n(e, t))
                            }),
                            (r.prototype.selectionContainer = function () {
                                return e("<span></span>")
                            }),
                            (r.prototype.update = function (e) {
                                if (0 !== e.length) {
                                    var t = e[0],
                                        n = this.$selection.find(
                                            ".select2-selection__rendered"
                                        ),
                                        i = this.display(t, n)
                                    n.empty().append(i)
                                    var r = t.title || t.text
                                    r
                                        ? n.attr("title", r)
                                        : n.removeAttr("title")
                                } else this.clear()
                            }),
                            r
                        )
                    }
                ),
                e.define(
                    "select2/selection/multiple",
                    ["jquery", "./base", "../utils"],
                    function (r, e, d) {
                        function s(e, t) {
                            s.__super__.constructor.apply(this, arguments)
                        }
                        return (
                            d.Extend(s, e),
                            (s.prototype.render = function () {
                                var e = s.__super__.render.call(this)
                                return (
                                    e[0].classList.add(
                                        "select2-selection--multiple"
                                    ),
                                    e.html(
                                        '<ul class="select2-selection__rendered"></ul>'
                                    ),
                                    e
                                )
                            }),
                            (s.prototype.bind = function (e, t) {
                                var i = this
                                s.__super__.bind.apply(this, arguments)
                                var n = e.id + "-container"
                                this.$selection
                                    .find(".select2-selection__rendered")
                                    .attr("id", n),
                                    this.$selection.on("click", function (e) {
                                        i.trigger("toggle", {
                                            originalEvent: e,
                                        })
                                    }),
                                    this.$selection.on(
                                        "click",
                                        ".select2-selection__choice__remove",
                                        function (e) {
                                            if (!i.isDisabled()) {
                                                var t = r(this).parent(),
                                                    n = d.GetData(t[0], "data")
                                                i.trigger("unselect", {
                                                    originalEvent: e,
                                                    data: n,
                                                })
                                            }
                                        }
                                    ),
                                    this.$selection.on(
                                        "keydown",
                                        ".select2-selection__choice__remove",
                                        function (e) {
                                            i.isDisabled() ||
                                                e.stopPropagation()
                                        }
                                    )
                            }),
                            (s.prototype.clear = function () {
                                var e = this.$selection.find(
                                    ".select2-selection__rendered"
                                )
                                e.empty(), e.removeAttr("title")
                            }),
                            (s.prototype.display = function (e, t) {
                                var n = this.options.get("templateSelection")
                                return this.options.get("escapeMarkup")(n(e, t))
                            }),
                            (s.prototype.selectionContainer = function () {
                                return r(
                                    '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
                                )
                            }),
                            (s.prototype.update = function (e) {
                                if ((this.clear(), 0 !== e.length)) {
                                    for (
                                        var t = [],
                                            n =
                                                this.$selection
                                                    .find(
                                                        ".select2-selection__rendered"
                                                    )
                                                    .attr("id") + "-choice-",
                                            i = 0;
                                        i < e.length;
                                        i++
                                    ) {
                                        var r = e[i],
                                            s = this.selectionContainer(),
                                            o = this.display(r, s),
                                            a = n + d.generateChars(4) + "-"
                                        r.id
                                            ? (a += r.id)
                                            : (a += d.generateChars(4)),
                                            s
                                                .find(
                                                    ".select2-selection__choice__display"
                                                )
                                                .append(o)
                                                .attr("id", a)
                                        var l = r.title || r.text
                                        l && s.attr("title", l)
                                        var c = this.options
                                                .get("translations")
                                                .get("removeItem"),
                                            u = s.find(
                                                ".select2-selection__choice__remove"
                                            )
                                        u.attr("title", c()),
                                            u.attr("aria-label", c()),
                                            u.attr("aria-describedby", a),
                                            d.StoreData(s[0], "data", r),
                                            t.push(s)
                                    }
                                    this.$selection
                                        .find(".select2-selection__rendered")
                                        .append(t)
                                }
                            }),
                            s
                        )
                    }
                ),
                e.define("select2/selection/placeholder", [], function () {
                    function e(e, t, n) {
                        ;(this.placeholder = this.normalizePlaceholder(
                            n.get("placeholder")
                        )),
                            e.call(this, t, n)
                    }
                    return (
                        (e.prototype.normalizePlaceholder = function (e, t) {
                            return (
                                "string" == typeof t &&
                                    (t = { id: "", text: t }),
                                t
                            )
                        }),
                        (e.prototype.createPlaceholder = function (e, t) {
                            var n = this.selectionContainer()
                            return (
                                n.html(this.display(t)),
                                n[0].classList.add(
                                    "select2-selection__placeholder"
                                ),
                                n[0].classList.remove(
                                    "select2-selection__choice"
                                ),
                                n
                            )
                        }),
                        (e.prototype.update = function (e, t) {
                            var n =
                                1 == t.length && t[0].id != this.placeholder.id
                            if (1 < t.length || n) return e.call(this, t)
                            this.clear()
                            var i = this.createPlaceholder(this.placeholder)
                            this.$selection
                                .find(".select2-selection__rendered")
                                .append(i)
                        }),
                        e
                    )
                }),
                e.define(
                    "select2/selection/allowClear",
                    ["jquery", "../keys", "../utils"],
                    function (s, i, a) {
                        function e() {}
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this
                                e.call(this, t, n),
                                    null == this.placeholder &&
                                        this.options.get("debug") &&
                                        window.console &&
                                        console.error &&
                                        console.error(
                                            "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                                        ),
                                    this.$selection.on(
                                        "mousedown",
                                        ".select2-selection__clear",
                                        function (e) {
                                            i._handleClear(e)
                                        }
                                    ),
                                    t.on("keypress", function (e) {
                                        i._handleKeyboardClear(e, t)
                                    })
                            }),
                            (e.prototype._handleClear = function (e, t) {
                                if (!this.isDisabled()) {
                                    var n = this.$selection.find(
                                        ".select2-selection__clear"
                                    )
                                    if (0 !== n.length) {
                                        t.stopPropagation()
                                        var i = a.GetData(n[0], "data"),
                                            r = this.$element.val()
                                        this.$element.val(this.placeholder.id)
                                        var s = { data: i }
                                        if (
                                            (this.trigger("clear", s),
                                            s.prevented)
                                        )
                                            this.$element.val(r)
                                        else {
                                            for (var o = 0; o < i.length; o++)
                                                if (
                                                    ((s = { data: i[o] }),
                                                    this.trigger("unselect", s),
                                                    s.prevented)
                                                )
                                                    return void this.$element.val(
                                                        r
                                                    )
                                            this.$element
                                                .trigger("input")
                                                .trigger("change"),
                                                this.trigger("toggle", {})
                                        }
                                    }
                                }
                            }),
                            (e.prototype._handleKeyboardClear = function (
                                e,
                                t,
                                n
                            ) {
                                n.isOpen() ||
                                    (t.which != i.DELETE &&
                                        t.which != i.BACKSPACE) ||
                                    this._handleClear(t)
                            }),
                            (e.prototype.update = function (e, t) {
                                if (
                                    (e.call(this, t),
                                    this.$selection
                                        .find(".select2-selection__clear")
                                        .remove(),
                                    !(
                                        0 <
                                            this.$selection.find(
                                                ".select2-selection__placeholder"
                                            ).length || 0 === t.length
                                    ))
                                ) {
                                    var n = this.$selection
                                            .find(
                                                ".select2-selection__rendered"
                                            )
                                            .attr("id"),
                                        i = this.options
                                            .get("translations")
                                            .get("removeAllItems"),
                                        r = s(
                                            '<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>'
                                        )
                                    r.attr("title", i()),
                                        r.attr("aria-label", i()),
                                        r.attr("aria-describedby", n),
                                        a.StoreData(r[0], "data", t),
                                        this.$selection.prepend(r)
                                }
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/selection/search",
                    ["jquery", "../utils", "../keys"],
                    function (i, l, c) {
                        function e(e, t, n) {
                            e.call(this, t, n)
                        }
                        return (
                            (e.prototype.render = function (e) {
                                var t = i(
                                    '<span class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
                                )
                                ;(this.$searchContainer = t),
                                    (this.$search = t.find("input")),
                                    this.$search.prop(
                                        "autocomplete",
                                        this.options.get("autocomplete")
                                    )
                                var n = e.call(this)
                                return (
                                    this._transferTabIndex(),
                                    n.append(this.$searchContainer),
                                    n
                                )
                            }),
                            (e.prototype.bind = function (e, t, n) {
                                var i = this,
                                    r = t.id + "-results",
                                    s = t.id + "-container"
                                e.call(this, t, n),
                                    i.$search.attr("aria-describedby", s),
                                    t.on("open", function () {
                                        i.$search.attr("aria-controls", r),
                                            i.$search.trigger("focus")
                                    }),
                                    t.on("close", function () {
                                        i.$search.val(""),
                                            i.resizeSearch(),
                                            i.$search.removeAttr(
                                                "aria-controls"
                                            ),
                                            i.$search.removeAttr(
                                                "aria-activedescendant"
                                            ),
                                            i.$search.trigger("focus")
                                    }),
                                    t.on("enable", function () {
                                        i.$search.prop("disabled", !1),
                                            i._transferTabIndex()
                                    }),
                                    t.on("disable", function () {
                                        i.$search.prop("disabled", !0)
                                    }),
                                    t.on("focus", function (e) {
                                        i.$search.trigger("focus")
                                    }),
                                    t.on("results:focus", function (e) {
                                        e.data._resultId
                                            ? i.$search.attr(
                                                  "aria-activedescendant",
                                                  e.data._resultId
                                              )
                                            : i.$search.removeAttr(
                                                  "aria-activedescendant"
                                              )
                                    }),
                                    this.$selection.on(
                                        "focusin",
                                        ".select2-search--inline",
                                        function (e) {
                                            i.trigger("focus", e)
                                        }
                                    ),
                                    this.$selection.on(
                                        "focusout",
                                        ".select2-search--inline",
                                        function (e) {
                                            i._handleBlur(e)
                                        }
                                    ),
                                    this.$selection.on(
                                        "keydown",
                                        ".select2-search--inline",
                                        function (e) {
                                            if (
                                                (e.stopPropagation(),
                                                i.trigger("keypress", e),
                                                (i._keyUpPrevented =
                                                    e.isDefaultPrevented()),
                                                e.which === c.BACKSPACE &&
                                                    "" === i.$search.val())
                                            ) {
                                                var t = i.$selection
                                                    .find(
                                                        ".select2-selection__choice"
                                                    )
                                                    .last()
                                                if (0 < t.length) {
                                                    var n = l.GetData(
                                                        t[0],
                                                        "data"
                                                    )
                                                    i.searchRemoveChoice(n),
                                                        e.preventDefault()
                                                }
                                            }
                                        }
                                    ),
                                    this.$selection.on(
                                        "click",
                                        ".select2-search--inline",
                                        function (e) {
                                            i.$search.val() &&
                                                e.stopPropagation()
                                        }
                                    )
                                var o = document.documentMode,
                                    a = o && o <= 11
                                this.$selection.on(
                                    "input.searchcheck",
                                    ".select2-search--inline",
                                    function (e) {
                                        a
                                            ? i.$selection.off(
                                                  "input.search input.searchcheck"
                                              )
                                            : i.$selection.off("keyup.search")
                                    }
                                ),
                                    this.$selection.on(
                                        "keyup.search input.search",
                                        ".select2-search--inline",
                                        function (e) {
                                            if (a && "input" === e.type)
                                                i.$selection.off(
                                                    "input.search input.searchcheck"
                                                )
                                            else {
                                                var t = e.which
                                                t != c.SHIFT &&
                                                    t != c.CTRL &&
                                                    t != c.ALT &&
                                                    t != c.TAB &&
                                                    i.handleSearch(e)
                                            }
                                        }
                                    )
                            }),
                            (e.prototype._transferTabIndex = function (e) {
                                this.$search.attr(
                                    "tabindex",
                                    this.$selection.attr("tabindex")
                                ),
                                    this.$selection.attr("tabindex", "-1")
                            }),
                            (e.prototype.createPlaceholder = function (e, t) {
                                this.$search.attr("placeholder", t.text)
                            }),
                            (e.prototype.update = function (e, t) {
                                var n =
                                    this.$search[0] == document.activeElement
                                this.$search.attr("placeholder", ""),
                                    e.call(this, t),
                                    this.resizeSearch(),
                                    n && this.$search.trigger("focus")
                            }),
                            (e.prototype.handleSearch = function () {
                                if (
                                    (this.resizeSearch(), !this._keyUpPrevented)
                                ) {
                                    var e = this.$search.val()
                                    this.trigger("query", { term: e })
                                }
                                this._keyUpPrevented = !1
                            }),
                            (e.prototype.searchRemoveChoice = function (e, t) {
                                this.trigger("unselect", { data: t }),
                                    this.$search.val(t.text),
                                    this.handleSearch()
                            }),
                            (e.prototype.resizeSearch = function () {
                                this.$search.css("width", "25px")
                                var e = "100%"
                                "" === this.$search.attr("placeholder") &&
                                    (e =
                                        0.75 * (this.$search.val().length + 1) +
                                        "em")
                                this.$search.css("width", e)
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/selection/selectionCss",
                    ["../utils"],
                    function (i) {
                        function e() {}
                        return (
                            (e.prototype.render = function (e) {
                                var t = e.call(this),
                                    n =
                                        this.options.get("selectionCssClass") ||
                                        ""
                                return (
                                    -1 !== n.indexOf(":all:") &&
                                        ((n = n.replace(":all:", "")),
                                        i.copyNonInternalCssClasses(
                                            t[0],
                                            this.$element[0]
                                        )),
                                    t.addClass(n),
                                    t
                                )
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/selection/eventRelay",
                    ["jquery"],
                    function (o) {
                        function e() {}
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this,
                                    r = [
                                        "open",
                                        "opening",
                                        "close",
                                        "closing",
                                        "select",
                                        "selecting",
                                        "unselect",
                                        "unselecting",
                                        "clear",
                                        "clearing",
                                    ],
                                    s = [
                                        "opening",
                                        "closing",
                                        "selecting",
                                        "unselecting",
                                        "clearing",
                                    ]
                                e.call(this, t, n),
                                    t.on("*", function (e, t) {
                                        if (-1 !== r.indexOf(e)) {
                                            t = t || {}
                                            var n = o.Event("select2:" + e, {
                                                params: t,
                                            })
                                            i.$element.trigger(n),
                                                -1 !== s.indexOf(e) &&
                                                    (t.prevented =
                                                        n.isDefaultPrevented())
                                        }
                                    })
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/translation",
                    ["jquery", "require"],
                    function (t, n) {
                        function i(e) {
                            this.dict = e || {}
                        }
                        return (
                            (i.prototype.all = function () {
                                return this.dict
                            }),
                            (i.prototype.get = function (e) {
                                return this.dict[e]
                            }),
                            (i.prototype.extend = function (e) {
                                this.dict = t.extend({}, e.all(), this.dict)
                            }),
                            (i._cache = {}),
                            (i.loadPath = function (e) {
                                if (!(e in i._cache)) {
                                    var t = n(e)
                                    i._cache[e] = t
                                }
                                return new i(i._cache[e])
                            }),
                            i
                        )
                    }
                ),
                e.define("select2/diacritics", [], function () {
                    return {
                        "Ⓐ": "A",
                        Ａ: "A",
                        À: "A",
                        Á: "A",
                        Â: "A",
                        Ầ: "A",
                        Ấ: "A",
                        Ẫ: "A",
                        Ẩ: "A",
                        Ã: "A",
                        Ā: "A",
                        Ă: "A",
                        Ằ: "A",
                        Ắ: "A",
                        Ẵ: "A",
                        Ẳ: "A",
                        Ȧ: "A",
                        Ǡ: "A",
                        Ä: "A",
                        Ǟ: "A",
                        Ả: "A",
                        Å: "A",
                        Ǻ: "A",
                        Ǎ: "A",
                        Ȁ: "A",
                        Ȃ: "A",
                        Ạ: "A",
                        Ậ: "A",
                        Ặ: "A",
                        Ḁ: "A",
                        Ą: "A",
                        Ⱥ: "A",
                        Ɐ: "A",
                        Ꜳ: "AA",
                        Æ: "AE",
                        Ǽ: "AE",
                        Ǣ: "AE",
                        Ꜵ: "AO",
                        Ꜷ: "AU",
                        Ꜹ: "AV",
                        Ꜻ: "AV",
                        Ꜽ: "AY",
                        "Ⓑ": "B",
                        Ｂ: "B",
                        Ḃ: "B",
                        Ḅ: "B",
                        Ḇ: "B",
                        Ƀ: "B",
                        Ƃ: "B",
                        Ɓ: "B",
                        "Ⓒ": "C",
                        Ｃ: "C",
                        Ć: "C",
                        Ĉ: "C",
                        Ċ: "C",
                        Č: "C",
                        Ç: "C",
                        Ḉ: "C",
                        Ƈ: "C",
                        Ȼ: "C",
                        Ꜿ: "C",
                        "Ⓓ": "D",
                        Ｄ: "D",
                        Ḋ: "D",
                        Ď: "D",
                        Ḍ: "D",
                        Ḑ: "D",
                        Ḓ: "D",
                        Ḏ: "D",
                        Đ: "D",
                        Ƌ: "D",
                        Ɗ: "D",
                        Ɖ: "D",
                        Ꝺ: "D",
                        Ǳ: "DZ",
                        Ǆ: "DZ",
                        ǲ: "Dz",
                        ǅ: "Dz",
                        "Ⓔ": "E",
                        Ｅ: "E",
                        È: "E",
                        É: "E",
                        Ê: "E",
                        Ề: "E",
                        Ế: "E",
                        Ễ: "E",
                        Ể: "E",
                        Ẽ: "E",
                        Ē: "E",
                        Ḕ: "E",
                        Ḗ: "E",
                        Ĕ: "E",
                        Ė: "E",
                        Ë: "E",
                        Ẻ: "E",
                        Ě: "E",
                        Ȅ: "E",
                        Ȇ: "E",
                        Ẹ: "E",
                        Ệ: "E",
                        Ȩ: "E",
                        Ḝ: "E",
                        Ę: "E",
                        Ḙ: "E",
                        Ḛ: "E",
                        Ɛ: "E",
                        Ǝ: "E",
                        "Ⓕ": "F",
                        Ｆ: "F",
                        Ḟ: "F",
                        Ƒ: "F",
                        Ꝼ: "F",
                        "Ⓖ": "G",
                        Ｇ: "G",
                        Ǵ: "G",
                        Ĝ: "G",
                        Ḡ: "G",
                        Ğ: "G",
                        Ġ: "G",
                        Ǧ: "G",
                        Ģ: "G",
                        Ǥ: "G",
                        Ɠ: "G",
                        Ꞡ: "G",
                        Ᵹ: "G",
                        Ꝿ: "G",
                        "Ⓗ": "H",
                        Ｈ: "H",
                        Ĥ: "H",
                        Ḣ: "H",
                        Ḧ: "H",
                        Ȟ: "H",
                        Ḥ: "H",
                        Ḩ: "H",
                        Ḫ: "H",
                        Ħ: "H",
                        Ⱨ: "H",
                        Ⱶ: "H",
                        Ɥ: "H",
                        "Ⓘ": "I",
                        Ｉ: "I",
                        Ì: "I",
                        Í: "I",
                        Î: "I",
                        Ĩ: "I",
                        Ī: "I",
                        Ĭ: "I",
                        İ: "I",
                        Ï: "I",
                        Ḯ: "I",
                        Ỉ: "I",
                        Ǐ: "I",
                        Ȉ: "I",
                        Ȋ: "I",
                        Ị: "I",
                        Į: "I",
                        Ḭ: "I",
                        Ɨ: "I",
                        "Ⓙ": "J",
                        Ｊ: "J",
                        Ĵ: "J",
                        Ɉ: "J",
                        "Ⓚ": "K",
                        Ｋ: "K",
                        Ḱ: "K",
                        Ǩ: "K",
                        Ḳ: "K",
                        Ķ: "K",
                        Ḵ: "K",
                        Ƙ: "K",
                        Ⱪ: "K",
                        Ꝁ: "K",
                        Ꝃ: "K",
                        Ꝅ: "K",
                        Ꞣ: "K",
                        "Ⓛ": "L",
                        Ｌ: "L",
                        Ŀ: "L",
                        Ĺ: "L",
                        Ľ: "L",
                        Ḷ: "L",
                        Ḹ: "L",
                        Ļ: "L",
                        Ḽ: "L",
                        Ḻ: "L",
                        Ł: "L",
                        Ƚ: "L",
                        Ɫ: "L",
                        Ⱡ: "L",
                        Ꝉ: "L",
                        Ꝇ: "L",
                        Ꞁ: "L",
                        Ǉ: "LJ",
                        ǈ: "Lj",
                        "Ⓜ": "M",
                        Ｍ: "M",
                        Ḿ: "M",
                        Ṁ: "M",
                        Ṃ: "M",
                        Ɱ: "M",
                        Ɯ: "M",
                        "Ⓝ": "N",
                        Ｎ: "N",
                        Ǹ: "N",
                        Ń: "N",
                        Ñ: "N",
                        Ṅ: "N",
                        Ň: "N",
                        Ṇ: "N",
                        Ņ: "N",
                        Ṋ: "N",
                        Ṉ: "N",
                        Ƞ: "N",
                        Ɲ: "N",
                        Ꞑ: "N",
                        Ꞥ: "N",
                        Ǌ: "NJ",
                        ǋ: "Nj",
                        "Ⓞ": "O",
                        Ｏ: "O",
                        Ò: "O",
                        Ó: "O",
                        Ô: "O",
                        Ồ: "O",
                        Ố: "O",
                        Ỗ: "O",
                        Ổ: "O",
                        Õ: "O",
                        Ṍ: "O",
                        Ȭ: "O",
                        Ṏ: "O",
                        Ō: "O",
                        Ṑ: "O",
                        Ṓ: "O",
                        Ŏ: "O",
                        Ȯ: "O",
                        Ȱ: "O",
                        Ö: "O",
                        Ȫ: "O",
                        Ỏ: "O",
                        Ő: "O",
                        Ǒ: "O",
                        Ȍ: "O",
                        Ȏ: "O",
                        Ơ: "O",
                        Ờ: "O",
                        Ớ: "O",
                        Ỡ: "O",
                        Ở: "O",
                        Ợ: "O",
                        Ọ: "O",
                        Ộ: "O",
                        Ǫ: "O",
                        Ǭ: "O",
                        Ø: "O",
                        Ǿ: "O",
                        Ɔ: "O",
                        Ɵ: "O",
                        Ꝋ: "O",
                        Ꝍ: "O",
                        Œ: "OE",
                        Ƣ: "OI",
                        Ꝏ: "OO",
                        Ȣ: "OU",
                        "Ⓟ": "P",
                        Ｐ: "P",
                        Ṕ: "P",
                        Ṗ: "P",
                        Ƥ: "P",
                        Ᵽ: "P",
                        Ꝑ: "P",
                        Ꝓ: "P",
                        Ꝕ: "P",
                        "Ⓠ": "Q",
                        Ｑ: "Q",
                        Ꝗ: "Q",
                        Ꝙ: "Q",
                        Ɋ: "Q",
                        "Ⓡ": "R",
                        Ｒ: "R",
                        Ŕ: "R",
                        Ṙ: "R",
                        Ř: "R",
                        Ȑ: "R",
                        Ȓ: "R",
                        Ṛ: "R",
                        Ṝ: "R",
                        Ŗ: "R",
                        Ṟ: "R",
                        Ɍ: "R",
                        Ɽ: "R",
                        Ꝛ: "R",
                        Ꞧ: "R",
                        Ꞃ: "R",
                        "Ⓢ": "S",
                        Ｓ: "S",
                        ẞ: "S",
                        Ś: "S",
                        Ṥ: "S",
                        Ŝ: "S",
                        Ṡ: "S",
                        Š: "S",
                        Ṧ: "S",
                        Ṣ: "S",
                        Ṩ: "S",
                        Ș: "S",
                        Ş: "S",
                        Ȿ: "S",
                        Ꞩ: "S",
                        Ꞅ: "S",
                        "Ⓣ": "T",
                        Ｔ: "T",
                        Ṫ: "T",
                        Ť: "T",
                        Ṭ: "T",
                        Ț: "T",
                        Ţ: "T",
                        Ṱ: "T",
                        Ṯ: "T",
                        Ŧ: "T",
                        Ƭ: "T",
                        Ʈ: "T",
                        Ⱦ: "T",
                        Ꞇ: "T",
                        Ꜩ: "TZ",
                        "Ⓤ": "U",
                        Ｕ: "U",
                        Ù: "U",
                        Ú: "U",
                        Û: "U",
                        Ũ: "U",
                        Ṹ: "U",
                        Ū: "U",
                        Ṻ: "U",
                        Ŭ: "U",
                        Ü: "U",
                        Ǜ: "U",
                        Ǘ: "U",
                        Ǖ: "U",
                        Ǚ: "U",
                        Ủ: "U",
                        Ů: "U",
                        Ű: "U",
                        Ǔ: "U",
                        Ȕ: "U",
                        Ȗ: "U",
                        Ư: "U",
                        Ừ: "U",
                        Ứ: "U",
                        Ữ: "U",
                        Ử: "U",
                        Ự: "U",
                        Ụ: "U",
                        Ṳ: "U",
                        Ų: "U",
                        Ṷ: "U",
                        Ṵ: "U",
                        Ʉ: "U",
                        "Ⓥ": "V",
                        Ｖ: "V",
                        Ṽ: "V",
                        Ṿ: "V",
                        Ʋ: "V",
                        Ꝟ: "V",
                        Ʌ: "V",
                        Ꝡ: "VY",
                        "Ⓦ": "W",
                        Ｗ: "W",
                        Ẁ: "W",
                        Ẃ: "W",
                        Ŵ: "W",
                        Ẇ: "W",
                        Ẅ: "W",
                        Ẉ: "W",
                        Ⱳ: "W",
                        "Ⓧ": "X",
                        Ｘ: "X",
                        Ẋ: "X",
                        Ẍ: "X",
                        "Ⓨ": "Y",
                        Ｙ: "Y",
                        Ỳ: "Y",
                        Ý: "Y",
                        Ŷ: "Y",
                        Ỹ: "Y",
                        Ȳ: "Y",
                        Ẏ: "Y",
                        Ÿ: "Y",
                        Ỷ: "Y",
                        Ỵ: "Y",
                        Ƴ: "Y",
                        Ɏ: "Y",
                        Ỿ: "Y",
                        "Ⓩ": "Z",
                        Ｚ: "Z",
                        Ź: "Z",
                        Ẑ: "Z",
                        Ż: "Z",
                        Ž: "Z",
                        Ẓ: "Z",
                        Ẕ: "Z",
                        Ƶ: "Z",
                        Ȥ: "Z",
                        Ɀ: "Z",
                        Ⱬ: "Z",
                        Ꝣ: "Z",
                        "ⓐ": "a",
                        ａ: "a",
                        ẚ: "a",
                        à: "a",
                        á: "a",
                        â: "a",
                        ầ: "a",
                        ấ: "a",
                        ẫ: "a",
                        ẩ: "a",
                        ã: "a",
                        ā: "a",
                        ă: "a",
                        ằ: "a",
                        ắ: "a",
                        ẵ: "a",
                        ẳ: "a",
                        ȧ: "a",
                        ǡ: "a",
                        ä: "a",
                        ǟ: "a",
                        ả: "a",
                        å: "a",
                        ǻ: "a",
                        ǎ: "a",
                        ȁ: "a",
                        ȃ: "a",
                        ạ: "a",
                        ậ: "a",
                        ặ: "a",
                        ḁ: "a",
                        ą: "a",
                        ⱥ: "a",
                        ɐ: "a",
                        ꜳ: "aa",
                        æ: "ae",
                        ǽ: "ae",
                        ǣ: "ae",
                        ꜵ: "ao",
                        ꜷ: "au",
                        ꜹ: "av",
                        ꜻ: "av",
                        ꜽ: "ay",
                        "ⓑ": "b",
                        ｂ: "b",
                        ḃ: "b",
                        ḅ: "b",
                        ḇ: "b",
                        ƀ: "b",
                        ƃ: "b",
                        ɓ: "b",
                        "ⓒ": "c",
                        ｃ: "c",
                        ć: "c",
                        ĉ: "c",
                        ċ: "c",
                        č: "c",
                        ç: "c",
                        ḉ: "c",
                        ƈ: "c",
                        ȼ: "c",
                        ꜿ: "c",
                        ↄ: "c",
                        "ⓓ": "d",
                        ｄ: "d",
                        ḋ: "d",
                        ď: "d",
                        ḍ: "d",
                        ḑ: "d",
                        ḓ: "d",
                        ḏ: "d",
                        đ: "d",
                        ƌ: "d",
                        ɖ: "d",
                        ɗ: "d",
                        ꝺ: "d",
                        ǳ: "dz",
                        ǆ: "dz",
                        "ⓔ": "e",
                        ｅ: "e",
                        è: "e",
                        é: "e",
                        ê: "e",
                        ề: "e",
                        ế: "e",
                        ễ: "e",
                        ể: "e",
                        ẽ: "e",
                        ē: "e",
                        ḕ: "e",
                        ḗ: "e",
                        ĕ: "e",
                        ė: "e",
                        ë: "e",
                        ẻ: "e",
                        ě: "e",
                        ȅ: "e",
                        ȇ: "e",
                        ẹ: "e",
                        ệ: "e",
                        ȩ: "e",
                        ḝ: "e",
                        ę: "e",
                        ḙ: "e",
                        ḛ: "e",
                        ɇ: "e",
                        ɛ: "e",
                        ǝ: "e",
                        "ⓕ": "f",
                        ｆ: "f",
                        ḟ: "f",
                        ƒ: "f",
                        ꝼ: "f",
                        "ⓖ": "g",
                        ｇ: "g",
                        ǵ: "g",
                        ĝ: "g",
                        ḡ: "g",
                        ğ: "g",
                        ġ: "g",
                        ǧ: "g",
                        ģ: "g",
                        ǥ: "g",
                        ɠ: "g",
                        ꞡ: "g",
                        ᵹ: "g",
                        ꝿ: "g",
                        "ⓗ": "h",
                        ｈ: "h",
                        ĥ: "h",
                        ḣ: "h",
                        ḧ: "h",
                        ȟ: "h",
                        ḥ: "h",
                        ḩ: "h",
                        ḫ: "h",
                        ẖ: "h",
                        ħ: "h",
                        ⱨ: "h",
                        ⱶ: "h",
                        ɥ: "h",
                        ƕ: "hv",
                        "ⓘ": "i",
                        ｉ: "i",
                        ì: "i",
                        í: "i",
                        î: "i",
                        ĩ: "i",
                        ī: "i",
                        ĭ: "i",
                        ï: "i",
                        ḯ: "i",
                        ỉ: "i",
                        ǐ: "i",
                        ȉ: "i",
                        ȋ: "i",
                        ị: "i",
                        į: "i",
                        ḭ: "i",
                        ɨ: "i",
                        ı: "i",
                        "ⓙ": "j",
                        ｊ: "j",
                        ĵ: "j",
                        ǰ: "j",
                        ɉ: "j",
                        "ⓚ": "k",
                        ｋ: "k",
                        ḱ: "k",
                        ǩ: "k",
                        ḳ: "k",
                        ķ: "k",
                        ḵ: "k",
                        ƙ: "k",
                        ⱪ: "k",
                        ꝁ: "k",
                        ꝃ: "k",
                        ꝅ: "k",
                        ꞣ: "k",
                        "ⓛ": "l",
                        ｌ: "l",
                        ŀ: "l",
                        ĺ: "l",
                        ľ: "l",
                        ḷ: "l",
                        ḹ: "l",
                        ļ: "l",
                        ḽ: "l",
                        ḻ: "l",
                        ſ: "l",
                        ł: "l",
                        ƚ: "l",
                        ɫ: "l",
                        ⱡ: "l",
                        ꝉ: "l",
                        ꞁ: "l",
                        ꝇ: "l",
                        ǉ: "lj",
                        "ⓜ": "m",
                        ｍ: "m",
                        ḿ: "m",
                        ṁ: "m",
                        ṃ: "m",
                        ɱ: "m",
                        ɯ: "m",
                        "ⓝ": "n",
                        ｎ: "n",
                        ǹ: "n",
                        ń: "n",
                        ñ: "n",
                        ṅ: "n",
                        ň: "n",
                        ṇ: "n",
                        ņ: "n",
                        ṋ: "n",
                        ṉ: "n",
                        ƞ: "n",
                        ɲ: "n",
                        ŉ: "n",
                        ꞑ: "n",
                        ꞥ: "n",
                        ǌ: "nj",
                        "ⓞ": "o",
                        ｏ: "o",
                        ò: "o",
                        ó: "o",
                        ô: "o",
                        ồ: "o",
                        ố: "o",
                        ỗ: "o",
                        ổ: "o",
                        õ: "o",
                        ṍ: "o",
                        ȭ: "o",
                        ṏ: "o",
                        ō: "o",
                        ṑ: "o",
                        ṓ: "o",
                        ŏ: "o",
                        ȯ: "o",
                        ȱ: "o",
                        ö: "o",
                        ȫ: "o",
                        ỏ: "o",
                        ő: "o",
                        ǒ: "o",
                        ȍ: "o",
                        ȏ: "o",
                        ơ: "o",
                        ờ: "o",
                        ớ: "o",
                        ỡ: "o",
                        ở: "o",
                        ợ: "o",
                        ọ: "o",
                        ộ: "o",
                        ǫ: "o",
                        ǭ: "o",
                        ø: "o",
                        ǿ: "o",
                        ɔ: "o",
                        ꝋ: "o",
                        ꝍ: "o",
                        ɵ: "o",
                        œ: "oe",
                        ƣ: "oi",
                        ȣ: "ou",
                        ꝏ: "oo",
                        "ⓟ": "p",
                        ｐ: "p",
                        ṕ: "p",
                        ṗ: "p",
                        ƥ: "p",
                        ᵽ: "p",
                        ꝑ: "p",
                        ꝓ: "p",
                        ꝕ: "p",
                        "ⓠ": "q",
                        ｑ: "q",
                        ɋ: "q",
                        ꝗ: "q",
                        ꝙ: "q",
                        "ⓡ": "r",
                        ｒ: "r",
                        ŕ: "r",
                        ṙ: "r",
                        ř: "r",
                        ȑ: "r",
                        ȓ: "r",
                        ṛ: "r",
                        ṝ: "r",
                        ŗ: "r",
                        ṟ: "r",
                        ɍ: "r",
                        ɽ: "r",
                        ꝛ: "r",
                        ꞧ: "r",
                        ꞃ: "r",
                        "ⓢ": "s",
                        ｓ: "s",
                        ß: "s",
                        ś: "s",
                        ṥ: "s",
                        ŝ: "s",
                        ṡ: "s",
                        š: "s",
                        ṧ: "s",
                        ṣ: "s",
                        ṩ: "s",
                        ș: "s",
                        ş: "s",
                        ȿ: "s",
                        ꞩ: "s",
                        ꞅ: "s",
                        ẛ: "s",
                        "ⓣ": "t",
                        ｔ: "t",
                        ṫ: "t",
                        ẗ: "t",
                        ť: "t",
                        ṭ: "t",
                        ț: "t",
                        ţ: "t",
                        ṱ: "t",
                        ṯ: "t",
                        ŧ: "t",
                        ƭ: "t",
                        ʈ: "t",
                        ⱦ: "t",
                        ꞇ: "t",
                        ꜩ: "tz",
                        "ⓤ": "u",
                        ｕ: "u",
                        ù: "u",
                        ú: "u",
                        û: "u",
                        ũ: "u",
                        ṹ: "u",
                        ū: "u",
                        ṻ: "u",
                        ŭ: "u",
                        ü: "u",
                        ǜ: "u",
                        ǘ: "u",
                        ǖ: "u",
                        ǚ: "u",
                        ủ: "u",
                        ů: "u",
                        ű: "u",
                        ǔ: "u",
                        ȕ: "u",
                        ȗ: "u",
                        ư: "u",
                        ừ: "u",
                        ứ: "u",
                        ữ: "u",
                        ử: "u",
                        ự: "u",
                        ụ: "u",
                        ṳ: "u",
                        ų: "u",
                        ṷ: "u",
                        ṵ: "u",
                        ʉ: "u",
                        "ⓥ": "v",
                        ｖ: "v",
                        ṽ: "v",
                        ṿ: "v",
                        ʋ: "v",
                        ꝟ: "v",
                        ʌ: "v",
                        ꝡ: "vy",
                        "ⓦ": "w",
                        ｗ: "w",
                        ẁ: "w",
                        ẃ: "w",
                        ŵ: "w",
                        ẇ: "w",
                        ẅ: "w",
                        ẘ: "w",
                        ẉ: "w",
                        ⱳ: "w",
                        "ⓧ": "x",
                        ｘ: "x",
                        ẋ: "x",
                        ẍ: "x",
                        "ⓨ": "y",
                        ｙ: "y",
                        ỳ: "y",
                        ý: "y",
                        ŷ: "y",
                        ỹ: "y",
                        ȳ: "y",
                        ẏ: "y",
                        ÿ: "y",
                        ỷ: "y",
                        ẙ: "y",
                        ỵ: "y",
                        ƴ: "y",
                        ɏ: "y",
                        ỿ: "y",
                        "ⓩ": "z",
                        ｚ: "z",
                        ź: "z",
                        ẑ: "z",
                        ż: "z",
                        ž: "z",
                        ẓ: "z",
                        ẕ: "z",
                        ƶ: "z",
                        ȥ: "z",
                        ɀ: "z",
                        ⱬ: "z",
                        ꝣ: "z",
                        Ά: "Α",
                        Έ: "Ε",
                        Ή: "Η",
                        Ί: "Ι",
                        Ϊ: "Ι",
                        Ό: "Ο",
                        Ύ: "Υ",
                        Ϋ: "Υ",
                        Ώ: "Ω",
                        ά: "α",
                        έ: "ε",
                        ή: "η",
                        ί: "ι",
                        ϊ: "ι",
                        ΐ: "ι",
                        ό: "ο",
                        ύ: "υ",
                        ϋ: "υ",
                        ΰ: "υ",
                        ώ: "ω",
                        ς: "σ",
                        "’": "'",
                    }
                }),
                e.define("select2/data/base", ["../utils"], function (i) {
                    function n(e, t) {
                        n.__super__.constructor.call(this)
                    }
                    return (
                        i.Extend(n, i.Observable),
                        (n.prototype.current = function (e) {
                            throw new Error(
                                "The `current` method must be defined in child classes."
                            )
                        }),
                        (n.prototype.query = function (e, t) {
                            throw new Error(
                                "The `query` method must be defined in child classes."
                            )
                        }),
                        (n.prototype.bind = function (e, t) {}),
                        (n.prototype.destroy = function () {}),
                        (n.prototype.generateResultId = function (e, t) {
                            var n = e.id + "-result-"
                            return (
                                (n += i.generateChars(4)),
                                null != t.id
                                    ? (n += "-" + t.id.toString())
                                    : (n += "-" + i.generateChars(4)),
                                n
                            )
                        }),
                        n
                    )
                }),
                e.define(
                    "select2/data/select",
                    ["./base", "../utils", "jquery"],
                    function (e, l, c) {
                        function n(e, t) {
                            ;(this.$element = e),
                                (this.options = t),
                                n.__super__.constructor.call(this)
                        }
                        return (
                            l.Extend(n, e),
                            (n.prototype.current = function (e) {
                                var t = this
                                e(
                                    Array.prototype.map.call(
                                        this.$element[0].querySelectorAll(
                                            ":checked"
                                        ),
                                        function (e) {
                                            return t.item(c(e))
                                        }
                                    )
                                )
                            }),
                            (n.prototype.select = function (r) {
                                var s = this
                                if (
                                    ((r.selected = !0),
                                    null != r.element &&
                                        "option" ===
                                            r.element.tagName.toLowerCase())
                                )
                                    return (
                                        (r.element.selected = !0),
                                        void this.$element
                                            .trigger("input")
                                            .trigger("change")
                                    )
                                if (this.$element.prop("multiple"))
                                    this.current(function (e) {
                                        var t = []
                                        ;(r = [r]).push.apply(r, e)
                                        for (var n = 0; n < r.length; n++) {
                                            var i = r[n].id
                                            ;-1 === t.indexOf(i) && t.push(i)
                                        }
                                        s.$element.val(t),
                                            s.$element
                                                .trigger("input")
                                                .trigger("change")
                                    })
                                else {
                                    var e = r.id
                                    this.$element.val(e),
                                        this.$element
                                            .trigger("input")
                                            .trigger("change")
                                }
                            }),
                            (n.prototype.unselect = function (r) {
                                var s = this
                                if (this.$element.prop("multiple")) {
                                    if (
                                        ((r.selected = !1),
                                        null != r.element &&
                                            "option" ===
                                                r.element.tagName.toLowerCase())
                                    )
                                        return (
                                            (r.element.selected = !1),
                                            void this.$element
                                                .trigger("input")
                                                .trigger("change")
                                        )
                                    this.current(function (e) {
                                        for (
                                            var t = [], n = 0;
                                            n < e.length;
                                            n++
                                        ) {
                                            var i = e[n].id
                                            i !== r.id &&
                                                -1 === t.indexOf(i) &&
                                                t.push(i)
                                        }
                                        s.$element.val(t),
                                            s.$element
                                                .trigger("input")
                                                .trigger("change")
                                    })
                                }
                            }),
                            (n.prototype.bind = function (e, t) {
                                var n = this
                                ;(this.container = e).on(
                                    "select",
                                    function (e) {
                                        n.select(e.data)
                                    }
                                ),
                                    e.on("unselect", function (e) {
                                        n.unselect(e.data)
                                    })
                            }),
                            (n.prototype.destroy = function () {
                                this.$element.find("*").each(function () {
                                    l.RemoveData(this)
                                })
                            }),
                            (n.prototype.query = function (i, e) {
                                var r = [],
                                    s = this
                                this.$element.children().each(function () {
                                    if (
                                        "option" ===
                                            this.tagName.toLowerCase() ||
                                        "optgroup" ===
                                            this.tagName.toLowerCase()
                                    ) {
                                        var e = c(this),
                                            t = s.item(e),
                                            n = s.matches(i, t)
                                        null !== n && r.push(n)
                                    }
                                }),
                                    e({ results: r })
                            }),
                            (n.prototype.addOptions = function (e) {
                                this.$element.append(e)
                            }),
                            (n.prototype.option = function (e) {
                                var t
                                e.children
                                    ? ((t =
                                          document.createElement(
                                              "optgroup"
                                          )).label = e.text)
                                    : void 0 !==
                                      (t = document.createElement("option"))
                                          .textContent
                                    ? (t.textContent = e.text)
                                    : (t.innerText = e.text),
                                    void 0 !== e.id && (t.value = e.id),
                                    e.disabled && (t.disabled = !0),
                                    e.selected && (t.selected = !0),
                                    e.title && (t.title = e.title)
                                var n = this._normalizeItem(e)
                                return (
                                    (n.element = t),
                                    l.StoreData(t, "data", n),
                                    c(t)
                                )
                            }),
                            (n.prototype.item = function (e) {
                                var t = {}
                                if (null != (t = l.GetData(e[0], "data")))
                                    return t
                                var n = e[0]
                                if ("option" === n.tagName.toLowerCase())
                                    t = {
                                        id: e.val(),
                                        text: e.text(),
                                        disabled: e.prop("disabled"),
                                        selected: e.prop("selected"),
                                        title: e.prop("title"),
                                    }
                                else if (
                                    "optgroup" === n.tagName.toLowerCase()
                                ) {
                                    t = {
                                        text: e.prop("label"),
                                        children: [],
                                        title: e.prop("title"),
                                    }
                                    for (
                                        var i = e.children("option"),
                                            r = [],
                                            s = 0;
                                        s < i.length;
                                        s++
                                    ) {
                                        var o = c(i[s]),
                                            a = this.item(o)
                                        r.push(a)
                                    }
                                    t.children = r
                                }
                                return (
                                    ((t = this._normalizeItem(t)).element =
                                        e[0]),
                                    l.StoreData(e[0], "data", t),
                                    t
                                )
                            }),
                            (n.prototype._normalizeItem = function (e) {
                                e !== Object(e) && (e = { id: e, text: e })
                                return (
                                    null !=
                                        (e = c.extend({}, { text: "" }, e))
                                            .id && (e.id = e.id.toString()),
                                    null != e.text &&
                                        (e.text = e.text.toString()),
                                    null == e._resultId &&
                                        e.id &&
                                        null != this.container &&
                                        (e._resultId = this.generateResultId(
                                            this.container,
                                            e
                                        )),
                                    c.extend(
                                        {},
                                        { selected: !1, disabled: !1 },
                                        e
                                    )
                                )
                            }),
                            (n.prototype.matches = function (e, t) {
                                return this.options.get("matcher")(e, t)
                            }),
                            n
                        )
                    }
                ),
                e.define(
                    "select2/data/array",
                    ["./select", "../utils", "jquery"],
                    function (e, t, f) {
                        function i(e, t) {
                            ;(this._dataToConvert = t.get("data") || []),
                                i.__super__.constructor.call(this, e, t)
                        }
                        return (
                            t.Extend(i, e),
                            (i.prototype.bind = function (e, t) {
                                i.__super__.bind.call(this, e, t),
                                    this.addOptions(
                                        this.convertToOptions(
                                            this._dataToConvert
                                        )
                                    )
                            }),
                            (i.prototype.select = function (n) {
                                var e = this.$element
                                    .find("option")
                                    .filter(function (e, t) {
                                        return t.value == n.id.toString()
                                    })
                                0 === e.length &&
                                    ((e = this.option(n)), this.addOptions(e)),
                                    i.__super__.select.call(this, n)
                            }),
                            (i.prototype.convertToOptions = function (e) {
                                var t = this,
                                    n = this.$element.find("option"),
                                    i = n
                                        .map(function () {
                                            return t.item(f(this)).id
                                        })
                                        .get(),
                                    r = []
                                function s(e) {
                                    return function () {
                                        return f(this).val() == e.id
                                    }
                                }
                                for (var o = 0; o < e.length; o++) {
                                    var a = this._normalizeItem(e[o])
                                    if (0 <= i.indexOf(a.id)) {
                                        var l = n.filter(s(a)),
                                            c = this.item(l),
                                            u = f.extend(!0, {}, a, c),
                                            d = this.option(u)
                                        l.replaceWith(d)
                                    } else {
                                        var p = this.option(a)
                                        if (a.children) {
                                            var h = this.convertToOptions(
                                                a.children
                                            )
                                            p.append(h)
                                        }
                                        r.push(p)
                                    }
                                }
                                return r
                            }),
                            i
                        )
                    }
                ),
                e.define(
                    "select2/data/ajax",
                    ["./array", "../utils", "jquery"],
                    function (e, t, s) {
                        function n(e, t) {
                            ;(this.ajaxOptions = this._applyDefaults(
                                t.get("ajax")
                            )),
                                null != this.ajaxOptions.processResults &&
                                    (this.processResults =
                                        this.ajaxOptions.processResults),
                                n.__super__.constructor.call(this, e, t)
                        }
                        return (
                            t.Extend(n, e),
                            (n.prototype._applyDefaults = function (e) {
                                var t = {
                                    data: function (e) {
                                        return s.extend({}, e, { q: e.term })
                                    },
                                    transport: function (e, t, n) {
                                        var i = s.ajax(e)
                                        return i.then(t), i.fail(n), i
                                    },
                                }
                                return s.extend({}, t, e, !0)
                            }),
                            (n.prototype.processResults = function (e) {
                                return e
                            }),
                            (n.prototype.query = function (n, i) {
                                var r = this
                                null != this._request &&
                                    (s.isFunction(this._request.abort) &&
                                        this._request.abort(),
                                    (this._request = null))
                                var t = s.extend(
                                    { type: "GET" },
                                    this.ajaxOptions
                                )
                                function e() {
                                    var e = t.transport(
                                        t,
                                        function (e) {
                                            var t = r.processResults(e, n)
                                            r.options.get("debug") &&
                                                window.console &&
                                                console.error &&
                                                ((t &&
                                                    t.results &&
                                                    Array.isArray(t.results)) ||
                                                    console.error(
                                                        "Select2: The AJAX results did not return an array in the `results` key of the response."
                                                    )),
                                                i(t)
                                        },
                                        function () {
                                            ;("status" in e &&
                                                (0 === e.status ||
                                                    "0" === e.status)) ||
                                                r.trigger("results:message", {
                                                    message: "errorLoading",
                                                })
                                        }
                                    )
                                    r._request = e
                                }
                                "function" == typeof t.url &&
                                    (t.url = t.url.call(this.$element, n)),
                                    "function" == typeof t.data &&
                                        (t.data = t.data.call(
                                            this.$element,
                                            n
                                        )),
                                    this.ajaxOptions.delay && null != n.term
                                        ? (this._queryTimeout &&
                                              window.clearTimeout(
                                                  this._queryTimeout
                                              ),
                                          (this._queryTimeout =
                                              window.setTimeout(
                                                  e,
                                                  this.ajaxOptions.delay
                                              )))
                                        : e()
                            }),
                            n
                        )
                    }
                ),
                e.define("select2/data/tags", ["jquery"], function (t) {
                    function e(e, t, n) {
                        var i = n.get("tags"),
                            r = n.get("createTag")
                        void 0 !== r && (this.createTag = r)
                        var s = n.get("insertTag")
                        if (
                            (void 0 !== s && (this.insertTag = s),
                            e.call(this, t, n),
                            Array.isArray(i))
                        )
                            for (var o = 0; o < i.length; o++) {
                                var a = i[o],
                                    l = this._normalizeItem(a),
                                    c = this.option(l)
                                this.$element.append(c)
                            }
                    }
                    return (
                        (e.prototype.query = function (e, c, u) {
                            var d = this
                            this._removeOldTags(),
                                null != c.term && null == c.page
                                    ? e.call(this, c, function e(t, n) {
                                          for (
                                              var i = t.results, r = 0;
                                              r < i.length;
                                              r++
                                          ) {
                                              var s = i[r],
                                                  o =
                                                      null != s.children &&
                                                      !e(
                                                          {
                                                              results:
                                                                  s.children,
                                                          },
                                                          !0
                                                      )
                                              if (
                                                  (
                                                      s.text || ""
                                                  ).toUpperCase() ===
                                                      (
                                                          c.term || ""
                                                      ).toUpperCase() ||
                                                  o
                                              )
                                                  return (
                                                      !n &&
                                                      ((t.data = i), void u(t))
                                                  )
                                          }
                                          if (n) return !0
                                          var a = d.createTag(c)
                                          if (null != a) {
                                              var l = d.option(a)
                                              l.attr("data-select2-tag", !0),
                                                  d.addOptions([l]),
                                                  d.insertTag(i, a)
                                          }
                                          ;(t.results = i), u(t)
                                      })
                                    : e.call(this, c, u)
                        }),
                        (e.prototype.createTag = function (e, t) {
                            if (null == t.term) return null
                            var n = t.term.trim()
                            return "" === n ? null : { id: n, text: n }
                        }),
                        (e.prototype.insertTag = function (e, t, n) {
                            t.unshift(n)
                        }),
                        (e.prototype._removeOldTags = function (e) {
                            this.$element
                                .find("option[data-select2-tag]")
                                .each(function () {
                                    this.selected || t(this).remove()
                                })
                        }),
                        e
                    )
                }),
                e.define("select2/data/tokenizer", ["jquery"], function (d) {
                    function e(e, t, n) {
                        var i = n.get("tokenizer")
                        void 0 !== i && (this.tokenizer = i), e.call(this, t, n)
                    }
                    return (
                        (e.prototype.bind = function (e, t, n) {
                            e.call(this, t, n),
                                (this.$search =
                                    t.dropdown.$search ||
                                    t.selection.$search ||
                                    n.find(".select2-search__field"))
                        }),
                        (e.prototype.query = function (e, t, n) {
                            var i = this
                            t.term = t.term || ""
                            var r = this.tokenizer(
                                t,
                                this.options,
                                function (e) {
                                    var t = i._normalizeItem(e)
                                    if (
                                        !i.$element
                                            .find("option")
                                            .filter(function () {
                                                return d(this).val() === t.id
                                            }).length
                                    ) {
                                        var n = i.option(t)
                                        n.attr("data-select2-tag", !0),
                                            i._removeOldTags(),
                                            i.addOptions([n])
                                    }
                                    !(function (e) {
                                        i.trigger("select", { data: e })
                                    })(t)
                                }
                            )
                            r.term !== t.term &&
                                (this.$search.length &&
                                    (this.$search.val(r.term),
                                    this.$search.trigger("focus")),
                                (t.term = r.term)),
                                e.call(this, t, n)
                        }),
                        (e.prototype.tokenizer = function (e, t, n, i) {
                            for (
                                var r = n.get("tokenSeparators") || [],
                                    s = t.term,
                                    o = 0,
                                    a =
                                        this.createTag ||
                                        function (e) {
                                            return { id: e.term, text: e.term }
                                        };
                                o < s.length;

                            ) {
                                var l = s[o]
                                if (-1 !== r.indexOf(l)) {
                                    var c = s.substr(0, o),
                                        u = a(d.extend({}, t, { term: c }))
                                    null != u
                                        ? (i(u),
                                          (s = s.substr(o + 1) || ""),
                                          (o = 0))
                                        : o++
                                } else o++
                            }
                            return { term: s }
                        }),
                        e
                    )
                }),
                e.define("select2/data/minimumInputLength", [], function () {
                    function e(e, t, n) {
                        ;(this.minimumInputLength =
                            n.get("minimumInputLength")),
                            e.call(this, t, n)
                    }
                    return (
                        (e.prototype.query = function (e, t, n) {
                            ;(t.term = t.term || ""),
                                t.term.length < this.minimumInputLength
                                    ? this.trigger("results:message", {
                                          message: "inputTooShort",
                                          args: {
                                              minimum: this.minimumInputLength,
                                              input: t.term,
                                              params: t,
                                          },
                                      })
                                    : e.call(this, t, n)
                        }),
                        e
                    )
                }),
                e.define("select2/data/maximumInputLength", [], function () {
                    function e(e, t, n) {
                        ;(this.maximumInputLength =
                            n.get("maximumInputLength")),
                            e.call(this, t, n)
                    }
                    return (
                        (e.prototype.query = function (e, t, n) {
                            ;(t.term = t.term || ""),
                                0 < this.maximumInputLength &&
                                t.term.length > this.maximumInputLength
                                    ? this.trigger("results:message", {
                                          message: "inputTooLong",
                                          args: {
                                              maximum: this.maximumInputLength,
                                              input: t.term,
                                              params: t,
                                          },
                                      })
                                    : e.call(this, t, n)
                        }),
                        e
                    )
                }),
                e.define(
                    "select2/data/maximumSelectionLength",
                    [],
                    function () {
                        function e(e, t, n) {
                            ;(this.maximumSelectionLength = n.get(
                                "maximumSelectionLength"
                            )),
                                e.call(this, t, n)
                        }
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this
                                e.call(this, t, n),
                                    t.on("select", function () {
                                        i._checkIfMaximumSelected()
                                    })
                            }),
                            (e.prototype.query = function (e, t, n) {
                                var i = this
                                this._checkIfMaximumSelected(function () {
                                    e.call(i, t, n)
                                })
                            }),
                            (e.prototype._checkIfMaximumSelected = function (
                                e,
                                n
                            ) {
                                var i = this
                                this.current(function (e) {
                                    var t = null != e ? e.length : 0
                                    0 < i.maximumSelectionLength &&
                                    t >= i.maximumSelectionLength
                                        ? i.trigger("results:message", {
                                              message: "maximumSelected",
                                              args: {
                                                  maximum:
                                                      i.maximumSelectionLength,
                                              },
                                          })
                                        : n && n()
                                })
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/dropdown",
                    ["jquery", "./utils"],
                    function (t, e) {
                        function n(e, t) {
                            ;(this.$element = e),
                                (this.options = t),
                                n.__super__.constructor.call(this)
                        }
                        return (
                            e.Extend(n, e.Observable),
                            (n.prototype.render = function () {
                                var e = t(
                                    '<span class="select2-dropdown"><span class="select2-results"></span></span>'
                                )
                                return (
                                    e.attr("dir", this.options.get("dir")),
                                    (this.$dropdown = e)
                                )
                            }),
                            (n.prototype.bind = function () {}),
                            (n.prototype.position = function (e, t) {}),
                            (n.prototype.destroy = function () {
                                this.$dropdown.remove()
                            }),
                            n
                        )
                    }
                ),
                e.define("select2/dropdown/search", ["jquery"], function (s) {
                    function e() {}
                    return (
                        (e.prototype.render = function (e) {
                            var t = e.call(this),
                                n = s(
                                    '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
                                )
                            return (
                                (this.$searchContainer = n),
                                (this.$search = n.find("input")),
                                this.$search.prop(
                                    "autocomplete",
                                    this.options.get("autocomplete")
                                ),
                                t.prepend(n),
                                t
                            )
                        }),
                        (e.prototype.bind = function (e, t, n) {
                            var i = this,
                                r = t.id + "-results"
                            e.call(this, t, n),
                                this.$search.on("keydown", function (e) {
                                    i.trigger("keypress", e),
                                        (i._keyUpPrevented =
                                            e.isDefaultPrevented())
                                }),
                                this.$search.on("input", function (e) {
                                    s(this).off("keyup")
                                }),
                                this.$search.on("keyup input", function (e) {
                                    i.handleSearch(e)
                                }),
                                t.on("open", function () {
                                    i.$search.attr("tabindex", 0),
                                        i.$search.attr("aria-controls", r),
                                        i.$search.trigger("focus"),
                                        window.setTimeout(function () {
                                            i.$search.trigger("focus")
                                        }, 0)
                                }),
                                t.on("close", function () {
                                    i.$search.attr("tabindex", -1),
                                        i.$search.removeAttr("aria-controls"),
                                        i.$search.removeAttr(
                                            "aria-activedescendant"
                                        ),
                                        i.$search.val(""),
                                        i.$search.trigger("blur")
                                }),
                                t.on("focus", function () {
                                    t.isOpen() || i.$search.trigger("focus")
                                }),
                                t.on("results:all", function (e) {
                                    ;(null != e.query.term &&
                                        "" !== e.query.term) ||
                                        (i.showSearch(e)
                                            ? i.$searchContainer[0].classList.remove(
                                                  "select2-search--hide"
                                              )
                                            : i.$searchContainer[0].classList.add(
                                                  "select2-search--hide"
                                              ))
                                }),
                                t.on("results:focus", function (e) {
                                    e.data._resultId
                                        ? i.$search.attr(
                                              "aria-activedescendant",
                                              e.data._resultId
                                          )
                                        : i.$search.removeAttr(
                                              "aria-activedescendant"
                                          )
                                })
                        }),
                        (e.prototype.handleSearch = function (e) {
                            if (!this._keyUpPrevented) {
                                var t = this.$search.val()
                                this.trigger("query", { term: t })
                            }
                            this._keyUpPrevented = !1
                        }),
                        (e.prototype.showSearch = function (e, t) {
                            return !0
                        }),
                        e
                    )
                }),
                e.define("select2/dropdown/hidePlaceholder", [], function () {
                    function e(e, t, n, i) {
                        ;(this.placeholder = this.normalizePlaceholder(
                            n.get("placeholder")
                        )),
                            e.call(this, t, n, i)
                    }
                    return (
                        (e.prototype.append = function (e, t) {
                            ;(t.results = this.removePlaceholder(t.results)),
                                e.call(this, t)
                        }),
                        (e.prototype.normalizePlaceholder = function (e, t) {
                            return (
                                "string" == typeof t &&
                                    (t = { id: "", text: t }),
                                t
                            )
                        }),
                        (e.prototype.removePlaceholder = function (e, t) {
                            for (
                                var n = t.slice(0), i = t.length - 1;
                                0 <= i;
                                i--
                            ) {
                                var r = t[i]
                                this.placeholder.id === r.id && n.splice(i, 1)
                            }
                            return n
                        }),
                        e
                    )
                }),
                e.define(
                    "select2/dropdown/infiniteScroll",
                    ["jquery"],
                    function (n) {
                        function e(e, t, n, i) {
                            ;(this.lastParams = {}),
                                e.call(this, t, n, i),
                                (this.$loadingMore = this.createLoadingMore()),
                                (this.loading = !1)
                        }
                        return (
                            (e.prototype.append = function (e, t) {
                                this.$loadingMore.remove(),
                                    (this.loading = !1),
                                    e.call(this, t),
                                    this.showLoadingMore(t) &&
                                        (this.$results.append(
                                            this.$loadingMore
                                        ),
                                        this.loadMoreIfNeeded())
                            }),
                            (e.prototype.bind = function (e, t, n) {
                                var i = this
                                e.call(this, t, n),
                                    t.on("query", function (e) {
                                        ;(i.lastParams = e), (i.loading = !0)
                                    }),
                                    t.on("query:append", function (e) {
                                        ;(i.lastParams = e), (i.loading = !0)
                                    }),
                                    this.$results.on(
                                        "scroll",
                                        this.loadMoreIfNeeded.bind(this)
                                    )
                            }),
                            (e.prototype.loadMoreIfNeeded = function () {
                                var e = n.contains(
                                    document.documentElement,
                                    this.$loadingMore[0]
                                )
                                if (!this.loading && e) {
                                    var t =
                                        this.$results.offset().top +
                                        this.$results.outerHeight(!1)
                                    this.$loadingMore.offset().top +
                                        this.$loadingMore.outerHeight(!1) <=
                                        t + 50 && this.loadMore()
                                }
                            }),
                            (e.prototype.loadMore = function () {
                                this.loading = !0
                                var e = n.extend(
                                    {},
                                    { page: 1 },
                                    this.lastParams
                                )
                                e.page++, this.trigger("query:append", e)
                            }),
                            (e.prototype.showLoadingMore = function (e, t) {
                                return t.pagination && t.pagination.more
                            }),
                            (e.prototype.createLoadingMore = function () {
                                var e = n(
                                        '<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'
                                    ),
                                    t = this.options
                                        .get("translations")
                                        .get("loadingMore")
                                return e.html(t(this.lastParams)), e
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/dropdown/attachBody",
                    ["jquery", "../utils"],
                    function (f, a) {
                        function e(e, t, n) {
                            ;(this.$dropdownParent = f(
                                n.get("dropdownParent") || document.body
                            )),
                                e.call(this, t, n)
                        }
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this
                                e.call(this, t, n),
                                    t.on("open", function () {
                                        i._showDropdown(),
                                            i._attachPositioningHandler(t),
                                            i._bindContainerResultHandlers(t)
                                    }),
                                    t.on("close", function () {
                                        i._hideDropdown(),
                                            i._detachPositioningHandler(t)
                                    }),
                                    this.$dropdownContainer.on(
                                        "mousedown",
                                        function (e) {
                                            e.stopPropagation()
                                        }
                                    )
                            }),
                            (e.prototype.destroy = function (e) {
                                e.call(this), this.$dropdownContainer.remove()
                            }),
                            (e.prototype.position = function (e, t, n) {
                                t.attr("class", n.attr("class")),
                                    t[0].classList.remove("select2"),
                                    t[0].classList.add(
                                        "select2-container--open"
                                    ),
                                    t.css({
                                        position: "absolute",
                                        top: -999999,
                                    }),
                                    (this.$container = n)
                            }),
                            (e.prototype.render = function (e) {
                                var t = f("<span></span>"),
                                    n = e.call(this)
                                return (
                                    t.append(n), (this.$dropdownContainer = t)
                                )
                            }),
                            (e.prototype._hideDropdown = function (e) {
                                this.$dropdownContainer.detach()
                            }),
                            (e.prototype._bindContainerResultHandlers =
                                function (e, t) {
                                    if (!this._containerResultsHandlersBound) {
                                        var n = this
                                        t.on("results:all", function () {
                                            n._positionDropdown(),
                                                n._resizeDropdown()
                                        }),
                                            t.on("results:append", function () {
                                                n._positionDropdown(),
                                                    n._resizeDropdown()
                                            }),
                                            t.on(
                                                "results:message",
                                                function () {
                                                    n._positionDropdown(),
                                                        n._resizeDropdown()
                                                }
                                            ),
                                            t.on("select", function () {
                                                n._positionDropdown(),
                                                    n._resizeDropdown()
                                            }),
                                            t.on("unselect", function () {
                                                n._positionDropdown(),
                                                    n._resizeDropdown()
                                            }),
                                            (this._containerResultsHandlersBound =
                                                !0)
                                    }
                                }),
                            (e.prototype._attachPositioningHandler = function (
                                e,
                                t
                            ) {
                                var n = this,
                                    i = "scroll.select2." + t.id,
                                    r = "resize.select2." + t.id,
                                    s = "orientationchange.select2." + t.id,
                                    o = this.$container
                                        .parents()
                                        .filter(a.hasScroll)
                                o.each(function () {
                                    a.StoreData(
                                        this,
                                        "select2-scroll-position",
                                        {
                                            x: f(this).scrollLeft(),
                                            y: f(this).scrollTop(),
                                        }
                                    )
                                }),
                                    o.on(i, function (e) {
                                        var t = a.GetData(
                                            this,
                                            "select2-scroll-position"
                                        )
                                        f(this).scrollTop(t.y)
                                    }),
                                    f(window).on(
                                        i + " " + r + " " + s,
                                        function (e) {
                                            n._positionDropdown(),
                                                n._resizeDropdown()
                                        }
                                    )
                            }),
                            (e.prototype._detachPositioningHandler = function (
                                e,
                                t
                            ) {
                                var n = "scroll.select2." + t.id,
                                    i = "resize.select2." + t.id,
                                    r = "orientationchange.select2." + t.id
                                this.$container
                                    .parents()
                                    .filter(a.hasScroll)
                                    .off(n),
                                    f(window).off(n + " " + i + " " + r)
                            }),
                            (e.prototype._positionDropdown = function () {
                                var e = f(window),
                                    t = this.$dropdown[0].classList.contains(
                                        "select2-dropdown--above"
                                    ),
                                    n = this.$dropdown[0].classList.contains(
                                        "select2-dropdown--below"
                                    ),
                                    i = null,
                                    r = this.$container.offset()
                                r.bottom =
                                    r.top + this.$container.outerHeight(!1)
                                var s = {
                                    height: this.$container.outerHeight(!1),
                                }
                                ;(s.top = r.top), (s.bottom = r.top + s.height)
                                var o = this.$dropdown.outerHeight(!1),
                                    a = e.scrollTop(),
                                    l = e.scrollTop() + e.height(),
                                    c = a < r.top - o,
                                    u = l > r.bottom + o,
                                    d = { left: r.left, top: s.bottom },
                                    p = this.$dropdownParent
                                "static" === p.css("position") &&
                                    (p = p.offsetParent())
                                var h = { top: 0, left: 0 }
                                ;(f.contains(document.body, p[0]) ||
                                    p[0].isConnected) &&
                                    (h = p.offset()),
                                    (d.top -= h.top),
                                    (d.left -= h.left),
                                    t || n || (i = "below"),
                                    u || !c || t
                                        ? !c && u && t && (i = "below")
                                        : (i = "above"),
                                    ("above" == i || (t && "below" !== i)) &&
                                        (d.top = s.top - h.top - o),
                                    null != i &&
                                        (this.$dropdown[0].classList.remove(
                                            "select2-dropdown--below"
                                        ),
                                        this.$dropdown[0].classList.remove(
                                            "select2-dropdown--above"
                                        ),
                                        this.$dropdown[0].classList.add(
                                            "select2-dropdown--" + i
                                        ),
                                        this.$container[0].classList.remove(
                                            "select2-container--below"
                                        ),
                                        this.$container[0].classList.remove(
                                            "select2-container--above"
                                        ),
                                        this.$container[0].classList.add(
                                            "select2-container--" + i
                                        )),
                                    this.$dropdownContainer.css(d)
                            }),
                            (e.prototype._resizeDropdown = function () {
                                var e = {
                                    width:
                                        this.$container.outerWidth(!1) + "px",
                                }
                                this.options.get("dropdownAutoWidth") &&
                                    ((e.minWidth = e.width),
                                    (e.position = "relative"),
                                    (e.width = "auto")),
                                    this.$dropdown.css(e)
                            }),
                            (e.prototype._showDropdown = function (e) {
                                this.$dropdownContainer.appendTo(
                                    this.$dropdownParent
                                ),
                                    this._positionDropdown(),
                                    this._resizeDropdown()
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/dropdown/minimumResultsForSearch",
                    [],
                    function () {
                        function e(e, t, n, i) {
                            ;(this.minimumResultsForSearch = n.get(
                                "minimumResultsForSearch"
                            )),
                                this.minimumResultsForSearch < 0 &&
                                    (this.minimumResultsForSearch = 1 / 0),
                                e.call(this, t, n, i)
                        }
                        return (
                            (e.prototype.showSearch = function (e, t) {
                                return (
                                    !(
                                        (function e(t) {
                                            for (
                                                var n = 0, i = 0;
                                                i < t.length;
                                                i++
                                            ) {
                                                var r = t[i]
                                                r.children
                                                    ? (n += e(r.children))
                                                    : n++
                                            }
                                            return n
                                        })(t.data.results) <
                                        this.minimumResultsForSearch
                                    ) && e.call(this, t)
                                )
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/dropdown/selectOnClose",
                    ["../utils"],
                    function (s) {
                        function e() {}
                        return (
                            (e.prototype.bind = function (e, t, n) {
                                var i = this
                                e.call(this, t, n),
                                    t.on("close", function (e) {
                                        i._handleSelectOnClose(e)
                                    })
                            }),
                            (e.prototype._handleSelectOnClose = function (
                                e,
                                t
                            ) {
                                if (t && null != t.originalSelect2Event) {
                                    var n = t.originalSelect2Event
                                    if (
                                        "select" === n._type ||
                                        "unselect" === n._type
                                    )
                                        return
                                }
                                var i = this.getHighlightedResults()
                                if (!(i.length < 1)) {
                                    var r = s.GetData(i[0], "data")
                                    ;(null != r.element &&
                                        r.element.selected) ||
                                        (null == r.element && r.selected) ||
                                        this.trigger("select", { data: r })
                                }
                            }),
                            e
                        )
                    }
                ),
                e.define("select2/dropdown/closeOnSelect", [], function () {
                    function e() {}
                    return (
                        (e.prototype.bind = function (e, t, n) {
                            var i = this
                            e.call(this, t, n),
                                t.on("select", function (e) {
                                    i._selectTriggered(e)
                                }),
                                t.on("unselect", function (e) {
                                    i._selectTriggered(e)
                                })
                        }),
                        (e.prototype._selectTriggered = function (e, t) {
                            var n = t.originalEvent
                            ;(n && (n.ctrlKey || n.metaKey)) ||
                                this.trigger("close", {
                                    originalEvent: n,
                                    originalSelect2Event: t,
                                })
                        }),
                        e
                    )
                }),
                e.define(
                    "select2/dropdown/dropdownCss",
                    ["../utils"],
                    function (i) {
                        function e() {}
                        return (
                            (e.prototype.render = function (e) {
                                var t = e.call(this),
                                    n =
                                        this.options.get("dropdownCssClass") ||
                                        ""
                                return (
                                    -1 !== n.indexOf(":all:") &&
                                        ((n = n.replace(":all:", "")),
                                        i.copyNonInternalCssClasses(
                                            t[0],
                                            this.$element[0]
                                        )),
                                    t.addClass(n),
                                    t
                                )
                            }),
                            e
                        )
                    }
                ),
                e.define("select2/i18n/en", [], function () {
                    return {
                        errorLoading: function () {
                            return "The results could not be loaded."
                        },
                        inputTooLong: function (e) {
                            var t = e.input.length - e.maximum,
                                n = "Please delete " + t + " character"
                            return 1 != t && (n += "s"), n
                        },
                        inputTooShort: function (e) {
                            return (
                                "Please enter " +
                                (e.minimum - e.input.length) +
                                " or more characters"
                            )
                        },
                        loadingMore: function () {
                            return "Loading more results…"
                        },
                        maximumSelected: function (e) {
                            var t = "You can only select " + e.maximum + " item"
                            return 1 != e.maximum && (t += "s"), t
                        },
                        noResults: function () {
                            return "No results found"
                        },
                        searching: function () {
                            return "Searching…"
                        },
                        removeAllItems: function () {
                            return "Remove all items"
                        },
                        removeItem: function () {
                            return "Remove item"
                        },
                    }
                }),
                e.define(
                    "select2/defaults",
                    [
                        "jquery",
                        "./results",
                        "./selection/single",
                        "./selection/multiple",
                        "./selection/placeholder",
                        "./selection/allowClear",
                        "./selection/search",
                        "./selection/selectionCss",
                        "./selection/eventRelay",
                        "./utils",
                        "./translation",
                        "./diacritics",
                        "./data/select",
                        "./data/array",
                        "./data/ajax",
                        "./data/tags",
                        "./data/tokenizer",
                        "./data/minimumInputLength",
                        "./data/maximumInputLength",
                        "./data/maximumSelectionLength",
                        "./dropdown",
                        "./dropdown/search",
                        "./dropdown/hidePlaceholder",
                        "./dropdown/infiniteScroll",
                        "./dropdown/attachBody",
                        "./dropdown/minimumResultsForSearch",
                        "./dropdown/selectOnClose",
                        "./dropdown/closeOnSelect",
                        "./dropdown/dropdownCss",
                        "./i18n/en",
                    ],
                    function (
                        l,
                        s,
                        o,
                        a,
                        c,
                        u,
                        d,
                        p,
                        h,
                        f,
                        g,
                        t,
                        m,
                        v,
                        y,
                        _,
                        b,
                        $,
                        w,
                        x,
                        A,
                        D,
                        S,
                        E,
                        O,
                        C,
                        L,
                        T,
                        q,
                        e
                    ) {
                        function n() {
                            this.reset()
                        }
                        return (
                            (n.prototype.apply = function (e) {
                                if (
                                    (null ==
                                        (e = l.extend(!0, {}, this.defaults, e))
                                            .dataAdapter &&
                                        (null != e.ajax
                                            ? (e.dataAdapter = y)
                                            : null != e.data
                                            ? (e.dataAdapter = v)
                                            : (e.dataAdapter = m),
                                        0 < e.minimumInputLength &&
                                            (e.dataAdapter = f.Decorate(
                                                e.dataAdapter,
                                                $
                                            )),
                                        0 < e.maximumInputLength &&
                                            (e.dataAdapter = f.Decorate(
                                                e.dataAdapter,
                                                w
                                            )),
                                        0 < e.maximumSelectionLength &&
                                            (e.dataAdapter = f.Decorate(
                                                e.dataAdapter,
                                                x
                                            )),
                                        e.tags &&
                                            (e.dataAdapter = f.Decorate(
                                                e.dataAdapter,
                                                _
                                            )),
                                        (null == e.tokenSeparators &&
                                            null == e.tokenizer) ||
                                            (e.dataAdapter = f.Decorate(
                                                e.dataAdapter,
                                                b
                                            ))),
                                    null == e.resultsAdapter &&
                                        ((e.resultsAdapter = s),
                                        null != e.ajax &&
                                            (e.resultsAdapter = f.Decorate(
                                                e.resultsAdapter,
                                                E
                                            )),
                                        null != e.placeholder &&
                                            (e.resultsAdapter = f.Decorate(
                                                e.resultsAdapter,
                                                S
                                            )),
                                        e.selectOnClose &&
                                            (e.resultsAdapter = f.Decorate(
                                                e.resultsAdapter,
                                                L
                                            ))),
                                    null == e.dropdownAdapter)
                                ) {
                                    if (e.multiple) e.dropdownAdapter = A
                                    else {
                                        var t = f.Decorate(A, D)
                                        e.dropdownAdapter = t
                                    }
                                    0 !== e.minimumResultsForSearch &&
                                        (e.dropdownAdapter = f.Decorate(
                                            e.dropdownAdapter,
                                            C
                                        )),
                                        e.closeOnSelect &&
                                            (e.dropdownAdapter = f.Decorate(
                                                e.dropdownAdapter,
                                                T
                                            )),
                                        null != e.dropdownCssClass &&
                                            (e.dropdownAdapter = f.Decorate(
                                                e.dropdownAdapter,
                                                q
                                            )),
                                        (e.dropdownAdapter = f.Decorate(
                                            e.dropdownAdapter,
                                            O
                                        ))
                                }
                                null == e.selectionAdapter &&
                                    (e.multiple
                                        ? (e.selectionAdapter = a)
                                        : (e.selectionAdapter = o),
                                    null != e.placeholder &&
                                        (e.selectionAdapter = f.Decorate(
                                            e.selectionAdapter,
                                            c
                                        )),
                                    e.allowClear &&
                                        (e.selectionAdapter = f.Decorate(
                                            e.selectionAdapter,
                                            u
                                        )),
                                    e.multiple &&
                                        (e.selectionAdapter = f.Decorate(
                                            e.selectionAdapter,
                                            d
                                        )),
                                    null != e.selectionCssClass &&
                                        (e.selectionAdapter = f.Decorate(
                                            e.selectionAdapter,
                                            p
                                        )),
                                    (e.selectionAdapter = f.Decorate(
                                        e.selectionAdapter,
                                        h
                                    ))),
                                    (e.language = this._resolveLanguage(
                                        e.language
                                    )),
                                    e.language.push("en")
                                for (
                                    var n = [], i = 0;
                                    i < e.language.length;
                                    i++
                                ) {
                                    var r = e.language[i]
                                    ;-1 === n.indexOf(r) && n.push(r)
                                }
                                return (
                                    (e.language = n),
                                    (e.translations = this._processTranslations(
                                        e.language,
                                        e.debug
                                    )),
                                    e
                                )
                            }),
                            (n.prototype.reset = function () {
                                function a(e) {
                                    return e.replace(
                                        /[^\u0000-\u007E]/g,
                                        function (e) {
                                            return t[e] || e
                                        }
                                    )
                                }
                                this.defaults = {
                                    amdLanguageBase: "./i18n/",
                                    autocomplete: "off",
                                    closeOnSelect: !0,
                                    debug: !1,
                                    dropdownAutoWidth: !1,
                                    escapeMarkup: f.escapeMarkup,
                                    language: {},
                                    matcher: function e(t, n) {
                                        if (
                                            null == t.term ||
                                            "" === t.term.trim()
                                        )
                                            return n
                                        if (
                                            n.children &&
                                            0 < n.children.length
                                        ) {
                                            for (
                                                var i = l.extend(!0, {}, n),
                                                    r = n.children.length - 1;
                                                0 <= r;
                                                r--
                                            )
                                                null == e(t, n.children[r]) &&
                                                    i.children.splice(r, 1)
                                            return 0 < i.children.length
                                                ? i
                                                : e(t, i)
                                        }
                                        var s = a(n.text).toUpperCase(),
                                            o = a(t.term).toUpperCase()
                                        return -1 < s.indexOf(o) ? n : null
                                    },
                                    minimumInputLength: 0,
                                    maximumInputLength: 0,
                                    maximumSelectionLength: 0,
                                    minimumResultsForSearch: 0,
                                    selectOnClose: !1,
                                    scrollAfterSelect: !1,
                                    sorter: function (e) {
                                        return e
                                    },
                                    templateResult: function (e) {
                                        return e.text
                                    },
                                    templateSelection: function (e) {
                                        return e.text
                                    },
                                    theme: "default",
                                    width: "resolve",
                                }
                            }),
                            (n.prototype.applyFromElement = function (e, t) {
                                var n = e.language,
                                    i = this.defaults.language,
                                    r = t.prop("lang"),
                                    s = t.closest("[lang]").prop("lang"),
                                    o = Array.prototype.concat.call(
                                        this._resolveLanguage(r),
                                        this._resolveLanguage(n),
                                        this._resolveLanguage(i),
                                        this._resolveLanguage(s)
                                    )
                                return (e.language = o), e
                            }),
                            (n.prototype._resolveLanguage = function (e) {
                                if (!e) return []
                                if (l.isEmptyObject(e)) return []
                                if (l.isPlainObject(e)) return [e]
                                var t
                                t = Array.isArray(e) ? e : [e]
                                for (var n = [], i = 0; i < t.length; i++)
                                    if (
                                        (n.push(t[i]),
                                        "string" == typeof t[i] &&
                                            0 < t[i].indexOf("-"))
                                    ) {
                                        var r = t[i].split("-")[0]
                                        n.push(r)
                                    }
                                return n
                            }),
                            (n.prototype._processTranslations = function (
                                e,
                                t
                            ) {
                                for (
                                    var n = new g(), i = 0;
                                    i < e.length;
                                    i++
                                ) {
                                    var r = new g(),
                                        s = e[i]
                                    if ("string" == typeof s)
                                        try {
                                            r = g.loadPath(s)
                                        } catch (e) {
                                            try {
                                                ;(s =
                                                    this.defaults
                                                        .amdLanguageBase + s),
                                                    (r = g.loadPath(s))
                                            } catch (e) {
                                                t &&
                                                    window.console &&
                                                    console.warn &&
                                                    console.warn(
                                                        'Select2: The language file for "' +
                                                            s +
                                                            '" could not be automatically loaded. A fallback will be used instead.'
                                                    )
                                            }
                                        }
                                    else r = l.isPlainObject(s) ? new g(s) : s
                                    n.extend(r)
                                }
                                return n
                            }),
                            (n.prototype.set = function (e, t) {
                                var n = {}
                                n[l.camelCase(e)] = t
                                var i = f._convertData(n)
                                l.extend(!0, this.defaults, i)
                            }),
                            new n()
                        )
                    }
                ),
                e.define(
                    "select2/options",
                    ["jquery", "./defaults", "./utils"],
                    function (d, n, p) {
                        function e(e, t) {
                            ;(this.options = e),
                                null != t && this.fromElement(t),
                                null != t &&
                                    (this.options = n.applyFromElement(
                                        this.options,
                                        t
                                    )),
                                (this.options = n.apply(this.options))
                        }
                        return (
                            (e.prototype.fromElement = function (e) {
                                var t = ["select2"]
                                null == this.options.multiple &&
                                    (this.options.multiple =
                                        e.prop("multiple")),
                                    null == this.options.disabled &&
                                        (this.options.disabled =
                                            e.prop("disabled")),
                                    null == this.options.autocomplete &&
                                        e.prop("autocomplete") &&
                                        (this.options.autocomplete =
                                            e.prop("autocomplete")),
                                    null == this.options.dir &&
                                        (e.prop("dir")
                                            ? (this.options.dir = e.prop("dir"))
                                            : e.closest("[dir]").prop("dir")
                                            ? (this.options.dir = e
                                                  .closest("[dir]")
                                                  .prop("dir"))
                                            : (this.options.dir = "ltr")),
                                    e.prop("disabled", this.options.disabled),
                                    e.prop("multiple", this.options.multiple),
                                    p.GetData(e[0], "select2Tags") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn(
                                                'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                                            ),
                                        p.StoreData(
                                            e[0],
                                            "data",
                                            p.GetData(e[0], "select2Tags")
                                        ),
                                        p.StoreData(e[0], "tags", !0)),
                                    p.GetData(e[0], "ajaxUrl") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn(
                                                "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                                            ),
                                        e.attr(
                                            "ajax--url",
                                            p.GetData(e[0], "ajaxUrl")
                                        ),
                                        p.StoreData(
                                            e[0],
                                            "ajax-Url",
                                            p.GetData(e[0], "ajaxUrl")
                                        ))
                                var n = {}
                                function i(e, t) {
                                    return t.toUpperCase()
                                }
                                for (
                                    var r = 0;
                                    r < e[0].attributes.length;
                                    r++
                                ) {
                                    var s = e[0].attributes[r].name,
                                        o = "data-"
                                    if (s.substr(0, o.length) == o) {
                                        var a = s.substring(o.length),
                                            l = p.GetData(e[0], a)
                                        n[a.replace(/-([a-z])/g, i)] = l
                                    }
                                }
                                d.fn.jquery &&
                                    "1." == d.fn.jquery.substr(0, 2) &&
                                    e[0].dataset &&
                                    (n = d.extend(!0, {}, e[0].dataset, n))
                                var c = d.extend(!0, {}, p.GetData(e[0]), n)
                                for (var u in (c = p._convertData(c)))
                                    -1 < t.indexOf(u) ||
                                        (d.isPlainObject(this.options[u])
                                            ? d.extend(this.options[u], c[u])
                                            : (this.options[u] = c[u]))
                                return this
                            }),
                            (e.prototype.get = function (e) {
                                return this.options[e]
                            }),
                            (e.prototype.set = function (e, t) {
                                this.options[e] = t
                            }),
                            e
                        )
                    }
                ),
                e.define(
                    "select2/core",
                    ["jquery", "./options", "./utils", "./keys"],
                    function (t, c, u, i) {
                        var d = function (e, t) {
                            null != u.GetData(e[0], "select2") &&
                                u.GetData(e[0], "select2").destroy(),
                                (this.$element = e),
                                (this.id = this._generateId(e)),
                                (t = t || {}),
                                (this.options = new c(t, e)),
                                d.__super__.constructor.call(this)
                            var n = e.attr("tabindex") || 0
                            u.StoreData(e[0], "old-tabindex", n),
                                e.attr("tabindex", "-1")
                            var i = this.options.get("dataAdapter")
                            this.dataAdapter = new i(e, this.options)
                            var r = this.render()
                            this._placeContainer(r)
                            var s = this.options.get("selectionAdapter")
                            ;(this.selection = new s(e, this.options)),
                                (this.$selection = this.selection.render()),
                                this.selection.position(this.$selection, r)
                            var o = this.options.get("dropdownAdapter")
                            ;(this.dropdown = new o(e, this.options)),
                                (this.$dropdown = this.dropdown.render()),
                                this.dropdown.position(this.$dropdown, r)
                            var a = this.options.get("resultsAdapter")
                            ;(this.results = new a(
                                e,
                                this.options,
                                this.dataAdapter
                            )),
                                (this.$results = this.results.render()),
                                this.results.position(
                                    this.$results,
                                    this.$dropdown
                                )
                            var l = this
                            this._bindAdapters(),
                                this._registerDomEvents(),
                                this._registerDataEvents(),
                                this._registerSelectionEvents(),
                                this._registerDropdownEvents(),
                                this._registerResultsEvents(),
                                this._registerEvents(),
                                this.dataAdapter.current(function (e) {
                                    l.trigger("selection:update", { data: e })
                                }),
                                e[0].classList.add("select2-hidden-accessible"),
                                e.attr("aria-hidden", "true"),
                                this._syncAttributes(),
                                u.StoreData(e[0], "select2", this),
                                e.data("select2", this)
                        }
                        return (
                            u.Extend(d, u.Observable),
                            (d.prototype._generateId = function (e) {
                                return (
                                    "select2-" +
                                    (null != e.attr("id")
                                        ? e.attr("id")
                                        : null != e.attr("name")
                                        ? e.attr("name") +
                                          "-" +
                                          u.generateChars(2)
                                        : u.generateChars(4)
                                    ).replace(/(:|\.|\[|\]|,)/g, "")
                                )
                            }),
                            (d.prototype._placeContainer = function (e) {
                                e.insertAfter(this.$element)
                                var t = this._resolveWidth(
                                    this.$element,
                                    this.options.get("width")
                                )
                                null != t && e.css("width", t)
                            }),
                            (d.prototype._resolveWidth = function (e, t) {
                                var n =
                                    /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i
                                if ("resolve" == t) {
                                    var i = this._resolveWidth(e, "style")
                                    return null != i
                                        ? i
                                        : this._resolveWidth(e, "element")
                                }
                                if ("element" == t) {
                                    var r = e.outerWidth(!1)
                                    return r <= 0 ? "auto" : r + "px"
                                }
                                if ("style" != t)
                                    return "computedstyle" != t
                                        ? t
                                        : window.getComputedStyle(e[0]).width
                                var s = e.attr("style")
                                if ("string" != typeof s) return null
                                for (
                                    var o = s.split(";"), a = 0, l = o.length;
                                    a < l;
                                    a += 1
                                ) {
                                    var c = o[a].replace(/\s/g, "").match(n)
                                    if (null !== c && 1 <= c.length) return c[1]
                                }
                                return null
                            }),
                            (d.prototype._bindAdapters = function () {
                                this.dataAdapter.bind(this, this.$container),
                                    this.selection.bind(this, this.$container),
                                    this.dropdown.bind(this, this.$container),
                                    this.results.bind(this, this.$container)
                            }),
                            (d.prototype._registerDomEvents = function () {
                                var t = this
                                this.$element.on("change.select2", function () {
                                    t.dataAdapter.current(function (e) {
                                        t.trigger("selection:update", {
                                            data: e,
                                        })
                                    })
                                }),
                                    this.$element.on(
                                        "focus.select2",
                                        function (e) {
                                            t.trigger("focus", e)
                                        }
                                    ),
                                    (this._syncA = u.bind(
                                        this._syncAttributes,
                                        this
                                    )),
                                    (this._syncS = u.bind(
                                        this._syncSubtree,
                                        this
                                    )),
                                    (this._observer =
                                        new window.MutationObserver(function (
                                            e
                                        ) {
                                            t._syncA(), t._syncS(e)
                                        })),
                                    this._observer.observe(this.$element[0], {
                                        attributes: !0,
                                        childList: !0,
                                        subtree: !1,
                                    })
                            }),
                            (d.prototype._registerDataEvents = function () {
                                var n = this
                                this.dataAdapter.on("*", function (e, t) {
                                    n.trigger(e, t)
                                })
                            }),
                            (d.prototype._registerSelectionEvents =
                                function () {
                                    var n = this,
                                        i = ["toggle", "focus"]
                                    this.selection.on("toggle", function () {
                                        n.toggleDropdown()
                                    }),
                                        this.selection.on(
                                            "focus",
                                            function (e) {
                                                n.focus(e)
                                            }
                                        ),
                                        this.selection.on("*", function (e, t) {
                                            ;-1 === i.indexOf(e) &&
                                                n.trigger(e, t)
                                        })
                                }),
                            (d.prototype._registerDropdownEvents = function () {
                                var n = this
                                this.dropdown.on("*", function (e, t) {
                                    n.trigger(e, t)
                                })
                            }),
                            (d.prototype._registerResultsEvents = function () {
                                var n = this
                                this.results.on("*", function (e, t) {
                                    n.trigger(e, t)
                                })
                            }),
                            (d.prototype._registerEvents = function () {
                                var n = this
                                this.on("open", function () {
                                    n.$container[0].classList.add(
                                        "select2-container--open"
                                    )
                                }),
                                    this.on("close", function () {
                                        n.$container[0].classList.remove(
                                            "select2-container--open"
                                        )
                                    }),
                                    this.on("enable", function () {
                                        n.$container[0].classList.remove(
                                            "select2-container--disabled"
                                        )
                                    }),
                                    this.on("disable", function () {
                                        n.$container[0].classList.add(
                                            "select2-container--disabled"
                                        )
                                    }),
                                    this.on("blur", function () {
                                        n.$container[0].classList.remove(
                                            "select2-container--focus"
                                        )
                                    }),
                                    this.on("query", function (t) {
                                        n.isOpen() || n.trigger("open", {}),
                                            this.dataAdapter.query(
                                                t,
                                                function (e) {
                                                    n.trigger("results:all", {
                                                        data: e,
                                                        query: t,
                                                    })
                                                }
                                            )
                                    }),
                                    this.on("query:append", function (t) {
                                        this.dataAdapter.query(t, function (e) {
                                            n.trigger("results:append", {
                                                data: e,
                                                query: t,
                                            })
                                        })
                                    }),
                                    this.on("keypress", function (e) {
                                        var t = e.which
                                        n.isOpen()
                                            ? t === i.ESC ||
                                              t === i.TAB ||
                                              (t === i.UP && e.altKey)
                                                ? (n.close(e),
                                                  e.preventDefault())
                                                : t === i.ENTER
                                                ? (n.trigger(
                                                      "results:select",
                                                      {}
                                                  ),
                                                  e.preventDefault())
                                                : t === i.SPACE && e.ctrlKey
                                                ? (n.trigger(
                                                      "results:toggle",
                                                      {}
                                                  ),
                                                  e.preventDefault())
                                                : t === i.UP
                                                ? (n.trigger(
                                                      "results:previous",
                                                      {}
                                                  ),
                                                  e.preventDefault())
                                                : t === i.DOWN &&
                                                  (n.trigger(
                                                      "results:next",
                                                      {}
                                                  ),
                                                  e.preventDefault())
                                            : (t === i.ENTER ||
                                                  t === i.SPACE ||
                                                  (t === i.DOWN && e.altKey)) &&
                                              (n.open(), e.preventDefault())
                                    })
                            }),
                            (d.prototype._syncAttributes = function () {
                                this.options.set(
                                    "disabled",
                                    this.$element.prop("disabled")
                                ),
                                    this.isDisabled()
                                        ? (this.isOpen() && this.close(),
                                          this.trigger("disable", {}))
                                        : this.trigger("enable", {})
                            }),
                            (d.prototype._isChangeMutation = function (e) {
                                var t = this
                                if (e.addedNodes && 0 < e.addedNodes.length)
                                    for (
                                        var n = 0;
                                        n < e.addedNodes.length;
                                        n++
                                    ) {
                                        if (e.addedNodes[n].selected) return !0
                                    }
                                else {
                                    if (
                                        e.removedNodes &&
                                        0 < e.removedNodes.length
                                    )
                                        return !0
                                    if (Array.isArray(e))
                                        return e.some(function (e) {
                                            return t._isChangeMutation(e)
                                        })
                                }
                                return !1
                            }),
                            (d.prototype._syncSubtree = function (e) {
                                var t = this._isChangeMutation(e),
                                    n = this
                                t &&
                                    this.dataAdapter.current(function (e) {
                                        n.trigger("selection:update", {
                                            data: e,
                                        })
                                    })
                            }),
                            (d.prototype.trigger = function (e, t) {
                                var n = d.__super__.trigger,
                                    i = {
                                        open: "opening",
                                        close: "closing",
                                        select: "selecting",
                                        unselect: "unselecting",
                                        clear: "clearing",
                                    }
                                if ((void 0 === t && (t = {}), e in i)) {
                                    var r = i[e],
                                        s = { prevented: !1, name: e, args: t }
                                    if ((n.call(this, r, s), s.prevented))
                                        return void (t.prevented = !0)
                                }
                                n.call(this, e, t)
                            }),
                            (d.prototype.toggleDropdown = function () {
                                this.isDisabled() ||
                                    (this.isOpen() ? this.close() : this.open())
                            }),
                            (d.prototype.open = function () {
                                this.isOpen() ||
                                    this.isDisabled() ||
                                    this.trigger("query", {})
                            }),
                            (d.prototype.close = function (e) {
                                this.isOpen() &&
                                    this.trigger("close", { originalEvent: e })
                            }),
                            (d.prototype.isEnabled = function () {
                                return !this.isDisabled()
                            }),
                            (d.prototype.isDisabled = function () {
                                return this.options.get("disabled")
                            }),
                            (d.prototype.isOpen = function () {
                                return this.$container[0].classList.contains(
                                    "select2-container--open"
                                )
                            }),
                            (d.prototype.hasFocus = function () {
                                return this.$container[0].classList.contains(
                                    "select2-container--focus"
                                )
                            }),
                            (d.prototype.focus = function (e) {
                                this.hasFocus() ||
                                    (this.$container[0].classList.add(
                                        "select2-container--focus"
                                    ),
                                    this.trigger("focus", {}))
                            }),
                            (d.prototype.enable = function (e) {
                                this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn(
                                        'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                                    ),
                                    (null != e && 0 !== e.length) || (e = [!0])
                                var t = !e[0]
                                this.$element.prop("disabled", t)
                            }),
                            (d.prototype.data = function () {
                                this.options.get("debug") &&
                                    0 < arguments.length &&
                                    window.console &&
                                    console.warn &&
                                    console.warn(
                                        'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                                    )
                                var t = []
                                return (
                                    this.dataAdapter.current(function (e) {
                                        t = e
                                    }),
                                    t
                                )
                            }),
                            (d.prototype.val = function (e) {
                                if (
                                    (this.options.get("debug") &&
                                        window.console &&
                                        console.warn &&
                                        console.warn(
                                            'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                                        ),
                                    null == e || 0 === e.length)
                                )
                                    return this.$element.val()
                                var t = e[0]
                                Array.isArray(t) &&
                                    (t = t.map(function (e) {
                                        return e.toString()
                                    })),
                                    this.$element
                                        .val(t)
                                        .trigger("input")
                                        .trigger("change")
                            }),
                            (d.prototype.destroy = function () {
                                this.$container.remove(),
                                    this._observer.disconnect(),
                                    (this._observer = null),
                                    (this._syncA = null),
                                    (this._syncS = null),
                                    this.$element.off(".select2"),
                                    this.$element.attr(
                                        "tabindex",
                                        u.GetData(
                                            this.$element[0],
                                            "old-tabindex"
                                        )
                                    ),
                                    this.$element[0].classList.remove(
                                        "select2-hidden-accessible"
                                    ),
                                    this.$element.attr("aria-hidden", "false"),
                                    u.RemoveData(this.$element[0]),
                                    this.$element.removeData("select2"),
                                    this.dataAdapter.destroy(),
                                    this.selection.destroy(),
                                    this.dropdown.destroy(),
                                    this.results.destroy(),
                                    (this.dataAdapter = null),
                                    (this.selection = null),
                                    (this.dropdown = null),
                                    (this.results = null)
                            }),
                            (d.prototype.render = function () {
                                var e = t(
                                    '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
                                )
                                return (
                                    e.attr("dir", this.options.get("dir")),
                                    (this.$container = e),
                                    this.$container[0].classList.add(
                                        "select2-container--" +
                                            this.options.get("theme")
                                    ),
                                    u.StoreData(e[0], "element", this.$element),
                                    e
                                )
                            }),
                            d
                        )
                    }
                ),
                e.define("jquery-mousewheel", ["jquery"], function (e) {
                    return e
                }),
                e.define(
                    "jquery.select2",
                    [
                        "jquery",
                        "jquery-mousewheel",
                        "./select2/core",
                        "./select2/defaults",
                        "./select2/utils",
                    ],
                    function (r, e, s, t, o) {
                        if (null == r.fn.select2) {
                            var a = ["open", "close", "destroy"]
                            r.fn.select2 = function (t) {
                                if ("object" == typeof (t = t || {}))
                                    return (
                                        this.each(function () {
                                            var e = r.extend(!0, {}, t)
                                            new s(r(this), e)
                                        }),
                                        this
                                    )
                                if ("string" != typeof t)
                                    throw new Error(
                                        "Invalid arguments for Select2: " + t
                                    )
                                var n,
                                    i = Array.prototype.slice.call(arguments, 1)
                                return (
                                    this.each(function () {
                                        var e = o.GetData(this, "select2")
                                        null == e &&
                                            window.console &&
                                            console.error &&
                                            console.error(
                                                "The select2('" +
                                                    t +
                                                    "') method was called on an element that is not using Select2."
                                            ),
                                            (n = e[t].apply(e, i))
                                    }),
                                    -1 < a.indexOf(t) ? this : n
                                )
                            }
                        }
                        return (
                            null == r.fn.select2.defaults &&
                                (r.fn.select2.defaults = t),
                            s
                        )
                    }
                ),
                { define: e.define, require: e.require }
            )
        })(),
        t = e.require("jquery.select2")
    return (u.fn.select2.amd = e), t
})

// Ion.RangeSlider, 2.3.1, © Denis Ineshin, 2010 - 2019, IonDen.com, Build date: 2019-12-19 16:56:44
!(function (i) {
    ;("undefined" != typeof jQuery && jQuery) ||
    "function" != typeof define ||
    !define.amd
        ? ("undefined" != typeof jQuery && jQuery) || "object" != typeof exports
            ? i(jQuery, document, window, navigator)
            : i(require("jquery"), document, window, navigator)
        : define(["jquery"], function (t) {
              return i(t, document, window, navigator)
          })
})(function (a, c, l, t, _) {
    "use strict"
    var i,
        s,
        o = 0,
        e =
            ((i = t.userAgent),
            (s = /msie\s\d+/i),
            0 < i.search(s) &&
                s.exec(i).toString().split(" ")[1] < 9 &&
                (a("html").addClass("lt-ie9"), !0))
    Function.prototype.bind ||
        (Function.prototype.bind = function (o) {
            var e = this,
                h = [].slice
            if ("function" != typeof e) throw new TypeError()
            var r = h.call(arguments, 1),
                n = function () {
                    if (this instanceof n) {
                        var t = function () {}
                        t.prototype = e.prototype
                        var i = new t(),
                            s = e.apply(i, r.concat(h.call(arguments)))
                        return Object(s) === s ? s : i
                    }
                    return e.apply(o, r.concat(h.call(arguments)))
                }
            return n
        }),
        Array.prototype.indexOf ||
            (Array.prototype.indexOf = function (t, i) {
                var s
                if (null == this)
                    throw new TypeError('"this" is null or not defined')
                var o = Object(this),
                    e = o.length >>> 0
                if (0 == e) return -1
                var h = +i || 0
                if ((Math.abs(h) === 1 / 0 && (h = 0), e <= h)) return -1
                for (s = Math.max(0 <= h ? h : e - Math.abs(h), 0); s < e; ) {
                    if (s in o && o[s] === t) return s
                    s++
                }
                return -1
            })
    function h(t, i, s) {
        ;(this.VERSION = "2.3.1"),
            (this.input = t),
            (this.plugin_count = s),
            (this.current_plugin = 0),
            (this.calc_count = 0),
            (this.update_tm = 0),
            (this.old_from = 0),
            (this.old_to = 0),
            (this.old_min_interval = null),
            (this.raf_id = null),
            (this.dragging = !1),
            (this.force_redraw = !1),
            (this.no_diapason = !1),
            (this.has_tab_index = !0),
            (this.is_key = !1),
            (this.is_update = !1),
            (this.is_start = !0),
            (this.is_finish = !1),
            (this.is_active = !1),
            (this.is_resize = !1),
            (this.is_click = !1),
            (i = i || {}),
            (this.$cache = {
                win: a(l),
                body: a(c.body),
                input: a(t),
                cont: null,
                rs: null,
                min: null,
                max: null,
                from: null,
                to: null,
                single: null,
                bar: null,
                line: null,
                s_single: null,
                s_from: null,
                s_to: null,
                shad_single: null,
                shad_from: null,
                shad_to: null,
                edge: null,
                grid: null,
                grid_labels: [],
            }),
            (this.coords = {
                x_gap: 0,
                x_pointer: 0,
                w_rs: 0,
                w_rs_old: 0,
                w_handle: 0,
                p_gap: 0,
                p_gap_left: 0,
                p_gap_right: 0,
                p_step: 0,
                p_pointer: 0,
                p_handle: 0,
                p_single_fake: 0,
                p_single_real: 0,
                p_from_fake: 0,
                p_from_real: 0,
                p_to_fake: 0,
                p_to_real: 0,
                p_bar_x: 0,
                p_bar_w: 0,
                grid_gap: 0,
                big_num: 0,
                big: [],
                big_w: [],
                big_p: [],
                big_x: [],
            }),
            (this.labels = {
                w_min: 0,
                w_max: 0,
                w_from: 0,
                w_to: 0,
                w_single: 0,
                p_min: 0,
                p_max: 0,
                p_from_fake: 0,
                p_from_left: 0,
                p_to_fake: 0,
                p_to_left: 0,
                p_single_fake: 0,
                p_single_left: 0,
            })
        var o,
            e,
            h,
            r = this.$cache.input,
            n = r.prop("value")
        for (h in ((o = {
            skin: "flat",
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !0,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " — ",
            input_values_separator: ";",
            disable: !1,
            block: !1,
            extra_classes: "",
            scope: null,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null,
        }),
        "INPUT" !== r[0].nodeName &&
            console &&
            console.warn &&
            console.warn("Base element should be <input>!", r[0]),
        ((e = {
            skin: r.data("skin"),
            type: r.data("type"),
            min: r.data("min"),
            max: r.data("max"),
            from: r.data("from"),
            to: r.data("to"),
            step: r.data("step"),
            min_interval: r.data("minInterval"),
            max_interval: r.data("maxInterval"),
            drag_interval: r.data("dragInterval"),
            values: r.data("values"),
            from_fixed: r.data("fromFixed"),
            from_min: r.data("fromMin"),
            from_max: r.data("fromMax"),
            from_shadow: r.data("fromShadow"),
            to_fixed: r.data("toFixed"),
            to_min: r.data("toMin"),
            to_max: r.data("toMax"),
            to_shadow: r.data("toShadow"),
            prettify_enabled: r.data("prettifyEnabled"),
            prettify_separator: r.data("prettifySeparator"),
            force_edges: r.data("forceEdges"),
            keyboard: r.data("keyboard"),
            grid: r.data("grid"),
            grid_margin: r.data("gridMargin"),
            grid_num: r.data("gridNum"),
            grid_snap: r.data("gridSnap"),
            hide_min_max: r.data("hideMinMax"),
            hide_from_to: r.data("hideFromTo"),
            prefix: r.data("prefix"),
            postfix: r.data("postfix"),
            max_postfix: r.data("maxPostfix"),
            decorate_both: r.data("decorateBoth"),
            values_separator: r.data("valuesSeparator"),
            input_values_separator: r.data("inputValuesSeparator"),
            disable: r.data("disable"),
            block: r.data("block"),
            extra_classes: r.data("extraClasses"),
        }).values = e.values && e.values.split(",")),
        e))
            e.hasOwnProperty(h) && ((e[h] !== _ && "" !== e[h]) || delete e[h])
        n !== _ &&
            "" !== n &&
            ((n = n.split(
                e.input_values_separator || i.input_values_separator || ";"
            ))[0] &&
                n[0] == +n[0] &&
                (n[0] = +n[0]),
            n[1] && n[1] == +n[1] && (n[1] = +n[1]),
            i && i.values && i.values.length
                ? ((o.from = n[0] && i.values.indexOf(n[0])),
                  (o.to = n[1] && i.values.indexOf(n[1])))
                : ((o.from = n[0] && +n[0]), (o.to = n[1] && +n[1]))),
            a.extend(o, i),
            a.extend(o, e),
            (this.options = o),
            (this.update_check = {}),
            this.validate(),
            (this.result = {
                input: this.$cache.input,
                slider: null,
                min: this.options.min,
                max: this.options.max,
                from: this.options.from,
                from_percent: 0,
                from_value: null,
                to: this.options.to,
                to_percent: 0,
                to_value: null,
            }),
            this.init()
    }
    ;(h.prototype = {
        init: function (t) {
            ;(this.no_diapason = !1),
                (this.coords.p_step = this.convertToPercent(
                    this.options.step,
                    !0
                )),
                (this.target = "base"),
                this.toggleInput(),
                this.append(),
                this.setMinMax(),
                t
                    ? ((this.force_redraw = !0),
                      this.calc(!0),
                      this.callOnUpdate())
                    : ((this.force_redraw = !0),
                      this.calc(!0),
                      this.callOnStart()),
                this.updateScene()
        },
        append: function () {
            var t =
                '<span class="irs irs--' +
                this.options.skin +
                " js-irs-" +
                this.plugin_count +
                " " +
                this.options.extra_classes +
                '"></span>'
            this.$cache.input.before(t),
                this.$cache.input.prop("readonly", !0),
                (this.$cache.cont = this.$cache.input.prev()),
                (this.result.slider = this.$cache.cont),
                this.$cache.cont.html(
                    '<span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span>'
                ),
                (this.$cache.rs = this.$cache.cont.find(".irs")),
                (this.$cache.min = this.$cache.cont.find(".irs-min")),
                (this.$cache.max = this.$cache.cont.find(".irs-max")),
                (this.$cache.from = this.$cache.cont.find(".irs-from")),
                (this.$cache.to = this.$cache.cont.find(".irs-to")),
                (this.$cache.single = this.$cache.cont.find(".irs-single")),
                (this.$cache.line = this.$cache.cont.find(".irs-line")),
                (this.$cache.grid = this.$cache.cont.find(".irs-grid")),
                "single" === this.options.type
                    ? (this.$cache.cont.append(
                          '<span class="irs-bar irs-bar--single"></span><span class="irs-shadow shadow-single"></span><span class="irs-handle single"><i></i><i></i><i></i></span>'
                      ),
                      (this.$cache.bar = this.$cache.cont.find(".irs-bar")),
                      (this.$cache.edge =
                          this.$cache.cont.find(".irs-bar-edge")),
                      (this.$cache.s_single = this.$cache.cont.find(".single")),
                      (this.$cache.from[0].style.visibility = "hidden"),
                      (this.$cache.to[0].style.visibility = "hidden"),
                      (this.$cache.shad_single =
                          this.$cache.cont.find(".shadow-single")))
                    : (this.$cache.cont.append(
                          '<span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-handle from"><i></i><i></i><i></i></span><span class="irs-handle to"><i></i><i></i><i></i></span>'
                      ),
                      (this.$cache.bar = this.$cache.cont.find(".irs-bar")),
                      (this.$cache.s_from = this.$cache.cont.find(".from")),
                      (this.$cache.s_to = this.$cache.cont.find(".to")),
                      (this.$cache.shad_from =
                          this.$cache.cont.find(".shadow-from")),
                      (this.$cache.shad_to =
                          this.$cache.cont.find(".shadow-to")),
                      this.setTopHandler()),
                this.options.hide_from_to &&
                    ((this.$cache.from[0].style.display = "none"),
                    (this.$cache.to[0].style.display = "none"),
                    (this.$cache.single[0].style.display = "none")),
                this.appendGrid(),
                this.options.disable
                    ? (this.appendDisableMask(),
                      (this.$cache.input[0].disabled = !0))
                    : ((this.$cache.input[0].disabled = !1),
                      this.removeDisableMask(),
                      this.bindEvents()),
                this.options.disable ||
                    (this.options.block
                        ? this.appendDisableMask()
                        : this.removeDisableMask()),
                this.options.drag_interval &&
                    (this.$cache.bar[0].style.cursor = "ew-resize")
        },
        setTopHandler: function () {
            var t = this.options.min,
                i = this.options.max,
                s = this.options.from,
                o = this.options.to
            t < s && o === i
                ? this.$cache.s_from.addClass("type_last")
                : o < i && this.$cache.s_to.addClass("type_last")
        },
        changeLevel: function (t) {
            switch (t) {
                case "single":
                    ;(this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_single_fake
                    )),
                        this.$cache.s_single.addClass("state_hover")
                    break
                case "from":
                    ;(this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_from_fake
                    )),
                        this.$cache.s_from.addClass("state_hover"),
                        this.$cache.s_from.addClass("type_last"),
                        this.$cache.s_to.removeClass("type_last")
                    break
                case "to":
                    ;(this.coords.p_gap = this.toFixed(
                        this.coords.p_pointer - this.coords.p_to_fake
                    )),
                        this.$cache.s_to.addClass("state_hover"),
                        this.$cache.s_to.addClass("type_last"),
                        this.$cache.s_from.removeClass("type_last")
                    break
                case "both":
                    ;(this.coords.p_gap_left = this.toFixed(
                        this.coords.p_pointer - this.coords.p_from_fake
                    )),
                        (this.coords.p_gap_right = this.toFixed(
                            this.coords.p_to_fake - this.coords.p_pointer
                        )),
                        this.$cache.s_to.removeClass("type_last"),
                        this.$cache.s_from.removeClass("type_last")
            }
        },
        appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>'),
                this.$cache.cont.addClass("irs-disabled")
        },
        removeDisableMask: function () {
            this.$cache.cont.remove(".irs-disable-mask"),
                this.$cache.cont.removeClass("irs-disabled")
        },
        remove: function () {
            this.$cache.cont.remove(),
                (this.$cache.cont = null),
                this.$cache.line.off("keydown.irs_" + this.plugin_count),
                this.$cache.body.off("touchmove.irs_" + this.plugin_count),
                this.$cache.body.off("mousemove.irs_" + this.plugin_count),
                this.$cache.win.off("touchend.irs_" + this.plugin_count),
                this.$cache.win.off("mouseup.irs_" + this.plugin_count),
                e &&
                    (this.$cache.body.off("mouseup.irs_" + this.plugin_count),
                    this.$cache.body.off(
                        "mouseleave.irs_" + this.plugin_count
                    )),
                (this.$cache.grid_labels = []),
                (this.coords.big = []),
                (this.coords.big_w = []),
                (this.coords.big_p = []),
                (this.coords.big_x = []),
                cancelAnimationFrame(this.raf_id)
        },
        bindEvents: function () {
            this.no_diapason ||
                (this.$cache.body.on(
                    "touchmove.irs_" + this.plugin_count,
                    this.pointerMove.bind(this)
                ),
                this.$cache.body.on(
                    "mousemove.irs_" + this.plugin_count,
                    this.pointerMove.bind(this)
                ),
                this.$cache.win.on(
                    "touchend.irs_" + this.plugin_count,
                    this.pointerUp.bind(this)
                ),
                this.$cache.win.on(
                    "mouseup.irs_" + this.plugin_count,
                    this.pointerUp.bind(this)
                ),
                this.$cache.line.on(
                    "touchstart.irs_" + this.plugin_count,
                    this.pointerClick.bind(this, "click")
                ),
                this.$cache.line.on(
                    "mousedown.irs_" + this.plugin_count,
                    this.pointerClick.bind(this, "click")
                ),
                this.$cache.line.on(
                    "focus.irs_" + this.plugin_count,
                    this.pointerFocus.bind(this)
                ),
                this.options.drag_interval && "double" === this.options.type
                    ? (this.$cache.bar.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "both")
                      ),
                      this.$cache.bar.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "both")
                      ))
                    : (this.$cache.bar.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.bar.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      )),
                "single" === this.options.type
                    ? (this.$cache.single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.s_single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.shad_single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.s_single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "single")
                      ),
                      this.$cache.edge.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ))
                    : (this.$cache.single.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, null)
                      ),
                      this.$cache.single.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, null)
                      ),
                      this.$cache.from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.s_from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.s_to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.shad_from.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_to.on(
                          "touchstart.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.s_from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "from")
                      ),
                      this.$cache.to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.s_to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerDown.bind(this, "to")
                      ),
                      this.$cache.shad_from.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      ),
                      this.$cache.shad_to.on(
                          "mousedown.irs_" + this.plugin_count,
                          this.pointerClick.bind(this, "click")
                      )),
                this.options.keyboard &&
                    this.$cache.line.on(
                        "keydown.irs_" + this.plugin_count,
                        this.key.bind(this, "keyboard")
                    ),
                e &&
                    (this.$cache.body.on(
                        "mouseup.irs_" + this.plugin_count,
                        this.pointerUp.bind(this)
                    ),
                    this.$cache.body.on(
                        "mouseleave.irs_" + this.plugin_count,
                        this.pointerUp.bind(this)
                    )))
        },
        pointerFocus: function (t) {
            var i, s
            this.target ||
                ((i = (s =
                    "single" === this.options.type
                        ? this.$cache.single
                        : this.$cache.from).offset().left),
                (i += s.width() / 2 - 1),
                this.pointerClick("single", {
                    preventDefault: function () {},
                    pageX: i,
                }))
        },
        pointerMove: function (t) {
            if (this.dragging) {
                var i =
                    t.pageX ||
                    (t.originalEvent.touches &&
                        t.originalEvent.touches[0].pageX)
                ;(this.coords.x_pointer = i - this.coords.x_gap), this.calc()
            }
        },
        pointerUp: function (t) {
            this.current_plugin === this.plugin_count &&
                this.is_active &&
                ((this.is_active = !1),
                this.$cache.cont
                    .find(".state_hover")
                    .removeClass("state_hover"),
                (this.force_redraw = !0),
                e && a("*").prop("unselectable", !1),
                this.updateScene(),
                this.restoreOriginalMinInterval(),
                (a.contains(this.$cache.cont[0], t.target) || this.dragging) &&
                    this.callOnFinish(),
                (this.dragging = !1))
        },
        pointerDown: function (t, i) {
            i.preventDefault()
            var s =
                i.pageX ||
                (i.originalEvent.touches && i.originalEvent.touches[0].pageX)
            2 !== i.button &&
                ("both" === t && this.setTempMinInterval(),
                (t = t || this.target || "from"),
                (this.current_plugin = this.plugin_count),
                (this.target = t),
                (this.is_active = !0),
                (this.dragging = !0),
                (this.coords.x_gap = this.$cache.rs.offset().left),
                (this.coords.x_pointer = s - this.coords.x_gap),
                this.calcPointerPercent(),
                this.changeLevel(t),
                e && a("*").prop("unselectable", !0),
                this.$cache.line.trigger("focus"),
                this.updateScene())
        },
        pointerClick: function (t, i) {
            i.preventDefault()
            var s =
                i.pageX ||
                (i.originalEvent.touches && i.originalEvent.touches[0].pageX)
            2 !== i.button &&
                ((this.current_plugin = this.plugin_count),
                (this.target = t),
                (this.is_click = !0),
                (this.coords.x_gap = this.$cache.rs.offset().left),
                (this.coords.x_pointer = +(s - this.coords.x_gap).toFixed()),
                (this.force_redraw = !0),
                this.calc(),
                this.$cache.line.trigger("focus"))
        },
        key: function (t, i) {
            if (
                !(
                    this.current_plugin !== this.plugin_count ||
                    i.altKey ||
                    i.ctrlKey ||
                    i.shiftKey ||
                    i.metaKey
                )
            ) {
                switch (i.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        i.preventDefault(), this.moveByKey(!1)
                        break
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        i.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        },
        moveByKey: function (t) {
            var i = this.coords.p_pointer,
                s = (this.options.max - this.options.min) / 100
            ;(s = this.options.step / s),
                t ? (i += s) : (i -= s),
                (this.coords.x_pointer = this.toFixed(
                    (this.coords.w_rs / 100) * i
                )),
                (this.is_key = !0),
                this.calc()
        },
        setMinMax: function () {
            if (this.options) {
                if (this.options.hide_min_max)
                    return (
                        (this.$cache.min[0].style.display = "none"),
                        void (this.$cache.max[0].style.display = "none")
                    )
                if (this.options.values.length)
                    this.$cache.min.html(
                        this.decorate(this.options.p_values[this.options.min])
                    ),
                        this.$cache.max.html(
                            this.decorate(
                                this.options.p_values[this.options.max]
                            )
                        )
                else {
                    var t = this._prettify(this.options.min),
                        i = this._prettify(this.options.max)
                    ;(this.result.min_pretty = t),
                        (this.result.max_pretty = i),
                        this.$cache.min.html(
                            this.decorate(t, this.options.min)
                        ),
                        this.$cache.max.html(this.decorate(i, this.options.max))
                }
                ;(this.labels.w_min = this.$cache.min.outerWidth(!1)),
                    (this.labels.w_max = this.$cache.max.outerWidth(!1))
            }
        },
        setTempMinInterval: function () {
            var t = this.result.to - this.result.from
            null === this.old_min_interval &&
                (this.old_min_interval = this.options.min_interval),
                (this.options.min_interval = t)
        },
        restoreOriginalMinInterval: function () {
            null !== this.old_min_interval &&
                ((this.options.min_interval = this.old_min_interval),
                (this.old_min_interval = null))
        },
        calc: function (t) {
            if (
                this.options &&
                (this.calc_count++,
                (10 !== this.calc_count && !t) ||
                    ((this.calc_count = 0),
                    (this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
                    this.calcHandlePercent()),
                this.coords.w_rs)
            ) {
                this.calcPointerPercent()
                var i = this.getHandleX()
                switch (
                    ("both" === this.target &&
                        ((this.coords.p_gap = 0), (i = this.getHandleX())),
                    "click" === this.target &&
                        ((this.coords.p_gap = this.coords.p_handle / 2),
                        (i = this.getHandleX()),
                        this.options.drag_interval
                            ? (this.target = "both_one")
                            : (this.target = this.chooseHandle(i))),
                    this.target)
                ) {
                    case "base":
                        var s = (this.options.max - this.options.min) / 100,
                            o = (this.result.from - this.options.min) / s,
                            e = (this.result.to - this.options.min) / s
                        ;(this.coords.p_single_real = this.toFixed(o)),
                            (this.coords.p_from_real = this.toFixed(o)),
                            (this.coords.p_to_real = this.toFixed(e)),
                            (this.coords.p_single_real = this.checkDiapason(
                                this.coords.p_single_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            )),
                            (this.coords.p_single_fake =
                                this.convertToFakePercent(
                                    this.coords.p_single_real
                                )),
                            (this.coords.p_from_fake =
                                this.convertToFakePercent(
                                    this.coords.p_from_real
                                )),
                            (this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            )),
                            (this.target = null)
                        break
                    case "single":
                        if (this.options.from_fixed) break
                        ;(this.coords.p_single_real =
                            this.convertToRealPercent(i)),
                            (this.coords.p_single_real = this.calcWithStep(
                                this.coords.p_single_real
                            )),
                            (this.coords.p_single_real = this.checkDiapason(
                                this.coords.p_single_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_single_fake =
                                this.convertToFakePercent(
                                    this.coords.p_single_real
                                ))
                        break
                    case "from":
                        if (this.options.from_fixed) break
                        ;(this.coords.p_from_real =
                            this.convertToRealPercent(i)),
                            (this.coords.p_from_real = this.calcWithStep(
                                this.coords.p_from_real
                            )),
                            this.coords.p_from_real > this.coords.p_to_real &&
                                (this.coords.p_from_real =
                                    this.coords.p_to_real),
                            (this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_from_real = this.checkMinInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            )),
                            (this.coords.p_from_real = this.checkMaxInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            )),
                            (this.coords.p_from_fake =
                                this.convertToFakePercent(
                                    this.coords.p_from_real
                                ))
                        break
                    case "to":
                        if (this.options.to_fixed) break
                        ;(this.coords.p_to_real = this.convertToRealPercent(i)),
                            (this.coords.p_to_real = this.calcWithStep(
                                this.coords.p_to_real
                            )),
                            this.coords.p_to_real < this.coords.p_from_real &&
                                (this.coords.p_to_real =
                                    this.coords.p_from_real),
                            (this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            )),
                            (this.coords.p_to_real = this.checkMinInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            )),
                            (this.coords.p_to_real = this.checkMaxInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            )),
                            (this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            ))
                        break
                    case "both":
                        if (this.options.from_fixed || this.options.to_fixed)
                            break
                        ;(i = this.toFixed(i + 0.001 * this.coords.p_handle)),
                            (this.coords.p_from_real =
                                this.convertToRealPercent(i) -
                                this.coords.p_gap_left),
                            (this.coords.p_from_real = this.calcWithStep(
                                this.coords.p_from_real
                            )),
                            (this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_from_real = this.checkMinInterval(
                                this.coords.p_from_real,
                                this.coords.p_to_real,
                                "from"
                            )),
                            (this.coords.p_from_fake =
                                this.convertToFakePercent(
                                    this.coords.p_from_real
                                )),
                            (this.coords.p_to_real =
                                this.convertToRealPercent(i) +
                                this.coords.p_gap_right),
                            (this.coords.p_to_real = this.calcWithStep(
                                this.coords.p_to_real
                            )),
                            (this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            )),
                            (this.coords.p_to_real = this.checkMinInterval(
                                this.coords.p_to_real,
                                this.coords.p_from_real,
                                "to"
                            )),
                            (this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            ))
                        break
                    case "both_one":
                        if (this.options.from_fixed || this.options.to_fixed)
                            break
                        var h = this.convertToRealPercent(i),
                            r = this.result.from_percent,
                            n = this.result.to_percent - r,
                            a = n / 2,
                            c = h - a,
                            l = h + a
                        c < 0 && (l = (c = 0) + n),
                            100 < l && (c = (l = 100) - n),
                            (this.coords.p_from_real = this.calcWithStep(c)),
                            (this.coords.p_from_real = this.checkDiapason(
                                this.coords.p_from_real,
                                this.options.from_min,
                                this.options.from_max
                            )),
                            (this.coords.p_from_fake =
                                this.convertToFakePercent(
                                    this.coords.p_from_real
                                )),
                            (this.coords.p_to_real = this.calcWithStep(l)),
                            (this.coords.p_to_real = this.checkDiapason(
                                this.coords.p_to_real,
                                this.options.to_min,
                                this.options.to_max
                            )),
                            (this.coords.p_to_fake = this.convertToFakePercent(
                                this.coords.p_to_real
                            ))
                }
                "single" === this.options.type
                    ? ((this.coords.p_bar_x = this.coords.p_handle / 2),
                      (this.coords.p_bar_w = this.coords.p_single_fake),
                      (this.result.from_percent = this.coords.p_single_real),
                      (this.result.from = this.convertToValue(
                          this.coords.p_single_real
                      )),
                      (this.result.from_pretty = this._prettify(
                          this.result.from
                      )),
                      this.options.values.length &&
                          (this.result.from_value =
                              this.options.values[this.result.from]))
                    : ((this.coords.p_bar_x = this.toFixed(
                          this.coords.p_from_fake + this.coords.p_handle / 2
                      )),
                      (this.coords.p_bar_w = this.toFixed(
                          this.coords.p_to_fake - this.coords.p_from_fake
                      )),
                      (this.result.from_percent = this.coords.p_from_real),
                      (this.result.from = this.convertToValue(
                          this.coords.p_from_real
                      )),
                      (this.result.from_pretty = this._prettify(
                          this.result.from
                      )),
                      (this.result.to_percent = this.coords.p_to_real),
                      (this.result.to = this.convertToValue(
                          this.coords.p_to_real
                      )),
                      (this.result.to_pretty = this._prettify(this.result.to)),
                      this.options.values.length &&
                          ((this.result.from_value =
                              this.options.values[this.result.from]),
                          (this.result.to_value =
                              this.options.values[this.result.to]))),
                    this.calcMinMax(),
                    this.calcLabels()
            }
        },
        calcPointerPercent: function () {
            this.coords.w_rs
                ? (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer)
                      ? (this.coords.x_pointer = 0)
                      : this.coords.x_pointer > this.coords.w_rs &&
                        (this.coords.x_pointer = this.coords.w_rs),
                  (this.coords.p_pointer = this.toFixed(
                      (this.coords.x_pointer / this.coords.w_rs) * 100
                  )))
                : (this.coords.p_pointer = 0)
        },
        convertToRealPercent: function (t) {
            return (t / (100 - this.coords.p_handle)) * 100
        },
        convertToFakePercent: function (t) {
            return (t / 100) * (100 - this.coords.p_handle)
        },
        getHandleX: function () {
            var t = 100 - this.coords.p_handle,
                i = this.toFixed(this.coords.p_pointer - this.coords.p_gap)
            return i < 0 ? (i = 0) : t < i && (i = t), i
        },
        calcHandlePercent: function () {
            "single" === this.options.type
                ? (this.coords.w_handle = this.$cache.s_single.outerWidth(!1))
                : (this.coords.w_handle = this.$cache.s_from.outerWidth(!1)),
                (this.coords.p_handle = this.toFixed(
                    (this.coords.w_handle / this.coords.w_rs) * 100
                ))
        },
        chooseHandle: function (t) {
            return "single" === this.options.type
                ? "single"
                : this.coords.p_from_real +
                      (this.coords.p_to_real - this.coords.p_from_real) / 2 <=
                  t
                ? this.options.to_fixed
                    ? "from"
                    : "to"
                : this.options.from_fixed
                ? "to"
                : "from"
        },
        calcMinMax: function () {
            this.coords.w_rs &&
                ((this.labels.p_min =
                    (this.labels.w_min / this.coords.w_rs) * 100),
                (this.labels.p_max =
                    (this.labels.w_max / this.coords.w_rs) * 100))
        },
        calcLabels: function () {
            this.coords.w_rs &&
                !this.options.hide_from_to &&
                ("single" === this.options.type
                    ? ((this.labels.w_single = this.$cache.single.outerWidth(
                          !1
                      )),
                      (this.labels.p_single_fake =
                          (this.labels.w_single / this.coords.w_rs) * 100),
                      (this.labels.p_single_left =
                          this.coords.p_single_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_single_fake / 2))
                    : ((this.labels.w_from = this.$cache.from.outerWidth(!1)),
                      (this.labels.p_from_fake =
                          (this.labels.w_from / this.coords.w_rs) * 100),
                      (this.labels.p_from_left =
                          this.coords.p_from_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_from_fake / 2),
                      (this.labels.p_from_left = this.toFixed(
                          this.labels.p_from_left
                      )),
                      (this.labels.p_from_left = this.checkEdges(
                          this.labels.p_from_left,
                          this.labels.p_from_fake
                      )),
                      (this.labels.w_to = this.$cache.to.outerWidth(!1)),
                      (this.labels.p_to_fake =
                          (this.labels.w_to / this.coords.w_rs) * 100),
                      (this.labels.p_to_left =
                          this.coords.p_to_fake +
                          this.coords.p_handle / 2 -
                          this.labels.p_to_fake / 2),
                      (this.labels.p_to_left = this.toFixed(
                          this.labels.p_to_left
                      )),
                      (this.labels.p_to_left = this.checkEdges(
                          this.labels.p_to_left,
                          this.labels.p_to_fake
                      )),
                      (this.labels.w_single = this.$cache.single.outerWidth(
                          !1
                      )),
                      (this.labels.p_single_fake =
                          (this.labels.w_single / this.coords.w_rs) * 100),
                      (this.labels.p_single_left =
                          (this.labels.p_from_left +
                              this.labels.p_to_left +
                              this.labels.p_to_fake) /
                              2 -
                          this.labels.p_single_fake / 2),
                      (this.labels.p_single_left = this.toFixed(
                          this.labels.p_single_left
                      ))),
                (this.labels.p_single_left = this.checkEdges(
                    this.labels.p_single_left,
                    this.labels.p_single_fake
                )))
        },
        updateScene: function () {
            this.raf_id &&
                (cancelAnimationFrame(this.raf_id), (this.raf_id = null)),
                clearTimeout(this.update_tm),
                (this.update_tm = null),
                this.options &&
                    (this.drawHandles(),
                    this.is_active
                        ? (this.raf_id = requestAnimationFrame(
                              this.updateScene.bind(this)
                          ))
                        : (this.update_tm = setTimeout(
                              this.updateScene.bind(this),
                              300
                          )))
        },
        drawHandles: function () {
            ;(this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
                this.coords.w_rs &&
                    (this.coords.w_rs !== this.coords.w_rs_old &&
                        ((this.target = "base"), (this.is_resize = !0)),
                    (this.coords.w_rs === this.coords.w_rs_old &&
                        !this.force_redraw) ||
                        (this.setMinMax(),
                        this.calc(!0),
                        this.drawLabels(),
                        this.options.grid &&
                            (this.calcGridMargin(), this.calcGridLabels()),
                        (this.force_redraw = !0),
                        (this.coords.w_rs_old = this.coords.w_rs),
                        this.drawShadow()),
                    this.coords.w_rs &&
                        (this.dragging || this.force_redraw || this.is_key) &&
                        ((this.old_from !== this.result.from ||
                            this.old_to !== this.result.to ||
                            this.force_redraw ||
                            this.is_key) &&
                            (this.drawLabels(),
                            (this.$cache.bar[0].style.left =
                                this.coords.p_bar_x + "%"),
                            (this.$cache.bar[0].style.width =
                                this.coords.p_bar_w + "%"),
                            "single" === this.options.type
                                ? ((this.$cache.bar[0].style.left = 0),
                                  (this.$cache.bar[0].style.width =
                                      this.coords.p_bar_w +
                                      this.coords.p_bar_x +
                                      "%"),
                                  (this.$cache.s_single[0].style.left =
                                      this.coords.p_single_fake + "%"))
                                : ((this.$cache.s_from[0].style.left =
                                      this.coords.p_from_fake + "%"),
                                  (this.$cache.s_to[0].style.left =
                                      this.coords.p_to_fake + "%"),
                                  (this.old_from === this.result.from &&
                                      !this.force_redraw) ||
                                      (this.$cache.from[0].style.left =
                                          this.labels.p_from_left + "%"),
                                  (this.old_to === this.result.to &&
                                      !this.force_redraw) ||
                                      (this.$cache.to[0].style.left =
                                          this.labels.p_to_left + "%")),
                            (this.$cache.single[0].style.left =
                                this.labels.p_single_left + "%"),
                            this.writeToInput(),
                            (this.old_from === this.result.from &&
                                this.old_to === this.result.to) ||
                                this.is_start ||
                                (this.$cache.input.trigger("change"),
                                this.$cache.input.trigger("input")),
                            (this.old_from = this.result.from),
                            (this.old_to = this.result.to),
                            this.is_resize ||
                                this.is_update ||
                                this.is_start ||
                                this.is_finish ||
                                this.callOnChange(),
                            (this.is_key || this.is_click) &&
                                ((this.is_key = !1),
                                (this.is_click = !1),
                                this.callOnFinish()),
                            (this.is_update = !1),
                            (this.is_resize = !1),
                            (this.is_finish = !1)),
                        (this.is_start = !1),
                        (this.is_key = !1),
                        (this.is_click = !1),
                        (this.force_redraw = !1)))
        },
        drawLabels: function () {
            if (this.options) {
                var t,
                    i,
                    s,
                    o,
                    e,
                    h = this.options.values.length,
                    r = this.options.p_values
                if (!this.options.hide_from_to)
                    if ("single" === this.options.type)
                        (t = h
                            ? this.decorate(r[this.result.from])
                            : ((o = this._prettify(this.result.from)),
                              this.decorate(o, this.result.from))),
                            this.$cache.single.html(t),
                            this.calcLabels(),
                            this.labels.p_single_left < this.labels.p_min + 1
                                ? (this.$cache.min[0].style.visibility =
                                      "hidden")
                                : (this.$cache.min[0].style.visibility =
                                      "visible"),
                            this.labels.p_single_left +
                                this.labels.p_single_fake >
                            100 - this.labels.p_max - 1
                                ? (this.$cache.max[0].style.visibility =
                                      "hidden")
                                : (this.$cache.max[0].style.visibility =
                                      "visible")
                    else {
                        ;(s = h
                            ? (this.options.decorate_both
                                  ? ((t = this.decorate(r[this.result.from])),
                                    (t += this.options.values_separator),
                                    (t += this.decorate(r[this.result.to])))
                                  : (t = this.decorate(
                                        r[this.result.from] +
                                            this.options.values_separator +
                                            r[this.result.to]
                                    )),
                              (i = this.decorate(r[this.result.from])),
                              this.decorate(r[this.result.to]))
                            : ((o = this._prettify(this.result.from)),
                              (e = this._prettify(this.result.to)),
                              this.options.decorate_both
                                  ? ((t = this.decorate(o, this.result.from)),
                                    (t += this.options.values_separator),
                                    (t += this.decorate(e, this.result.to)))
                                  : (t = this.decorate(
                                        o + this.options.values_separator + e,
                                        this.result.to
                                    )),
                              (i = this.decorate(o, this.result.from)),
                              this.decorate(e, this.result.to))),
                            this.$cache.single.html(t),
                            this.$cache.from.html(i),
                            this.$cache.to.html(s),
                            this.calcLabels()
                        var n = Math.min(
                                this.labels.p_single_left,
                                this.labels.p_from_left
                            ),
                            a =
                                this.labels.p_single_left +
                                this.labels.p_single_fake,
                            c = this.labels.p_to_left + this.labels.p_to_fake,
                            l = Math.max(a, c)
                        this.labels.p_from_left + this.labels.p_from_fake >=
                        this.labels.p_to_left
                            ? ((this.$cache.from[0].style.visibility =
                                  "hidden"),
                              (this.$cache.to[0].style.visibility = "hidden"),
                              (this.$cache.single[0].style.visibility =
                                  "visible"),
                              (l =
                                  this.result.from === this.result.to
                                      ? ("from" === this.target
                                            ? (this.$cache.from[0].style.visibility =
                                                  "visible")
                                            : "to" === this.target
                                            ? (this.$cache.to[0].style.visibility =
                                                  "visible")
                                            : this.target ||
                                              (this.$cache.from[0].style.visibility =
                                                  "visible"),
                                        (this.$cache.single[0].style.visibility =
                                            "hidden"),
                                        c)
                                      : ((this.$cache.from[0].style.visibility =
                                            "hidden"),
                                        (this.$cache.to[0].style.visibility =
                                            "hidden"),
                                        (this.$cache.single[0].style.visibility =
                                            "visible"),
                                        Math.max(a, c))))
                            : ((this.$cache.from[0].style.visibility =
                                  "visible"),
                              (this.$cache.to[0].style.visibility = "visible"),
                              (this.$cache.single[0].style.visibility =
                                  "hidden")),
                            n < this.labels.p_min + 1
                                ? (this.$cache.min[0].style.visibility =
                                      "hidden")
                                : (this.$cache.min[0].style.visibility =
                                      "visible"),
                            l > 100 - this.labels.p_max - 1
                                ? (this.$cache.max[0].style.visibility =
                                      "hidden")
                                : (this.$cache.max[0].style.visibility =
                                      "visible")
                    }
            }
        },
        drawShadow: function () {
            var t,
                i,
                s,
                o,
                e = this.options,
                h = this.$cache,
                r = "number" == typeof e.from_min && !isNaN(e.from_min),
                n = "number" == typeof e.from_max && !isNaN(e.from_max),
                a = "number" == typeof e.to_min && !isNaN(e.to_min),
                c = "number" == typeof e.to_max && !isNaN(e.to_max)
            "single" === e.type
                ? e.from_shadow && (r || n)
                    ? ((t = this.convertToPercent(r ? e.from_min : e.min)),
                      (i = this.convertToPercent(n ? e.from_max : e.max) - t),
                      (t = this.toFixed(t - (this.coords.p_handle / 100) * t)),
                      (i = this.toFixed(i - (this.coords.p_handle / 100) * i)),
                      (t += this.coords.p_handle / 2),
                      (h.shad_single[0].style.display = "block"),
                      (h.shad_single[0].style.left = t + "%"),
                      (h.shad_single[0].style.width = i + "%"))
                    : (h.shad_single[0].style.display = "none")
                : (e.from_shadow && (r || n)
                      ? ((t = this.convertToPercent(r ? e.from_min : e.min)),
                        (i = this.convertToPercent(n ? e.from_max : e.max) - t),
                        (t = this.toFixed(
                            t - (this.coords.p_handle / 100) * t
                        )),
                        (i = this.toFixed(
                            i - (this.coords.p_handle / 100) * i
                        )),
                        (t += this.coords.p_handle / 2),
                        (h.shad_from[0].style.display = "block"),
                        (h.shad_from[0].style.left = t + "%"),
                        (h.shad_from[0].style.width = i + "%"))
                      : (h.shad_from[0].style.display = "none"),
                  e.to_shadow && (a || c)
                      ? ((s = this.convertToPercent(a ? e.to_min : e.min)),
                        (o = this.convertToPercent(c ? e.to_max : e.max) - s),
                        (s = this.toFixed(
                            s - (this.coords.p_handle / 100) * s
                        )),
                        (o = this.toFixed(
                            o - (this.coords.p_handle / 100) * o
                        )),
                        (s += this.coords.p_handle / 2),
                        (h.shad_to[0].style.display = "block"),
                        (h.shad_to[0].style.left = s + "%"),
                        (h.shad_to[0].style.width = o + "%"))
                      : (h.shad_to[0].style.display = "none"))
        },
        writeToInput: function () {
            "single" === this.options.type
                ? (this.options.values.length
                      ? this.$cache.input.prop("value", this.result.from_value)
                      : this.$cache.input.prop("value", this.result.from),
                  this.$cache.input.data("from", this.result.from))
                : (this.options.values.length
                      ? this.$cache.input.prop(
                            "value",
                            this.result.from_value +
                                this.options.input_values_separator +
                                this.result.to_value
                        )
                      : this.$cache.input.prop(
                            "value",
                            this.result.from +
                                this.options.input_values_separator +
                                this.result.to
                        ),
                  this.$cache.input.data("from", this.result.from),
                  this.$cache.input.data("to", this.result.to))
        },
        callOnStart: function () {
            this.writeToInput(),
                this.options.onStart &&
                    "function" == typeof this.options.onStart &&
                    (this.options.scope
                        ? this.options.onStart.call(
                              this.options.scope,
                              this.result
                          )
                        : this.options.onStart(this.result))
        },
        callOnChange: function () {
            this.writeToInput(),
                this.options.onChange &&
                    "function" == typeof this.options.onChange &&
                    (this.options.scope
                        ? this.options.onChange.call(
                              this.options.scope,
                              this.result
                          )
                        : this.options.onChange(this.result))
        },
        callOnFinish: function () {
            this.writeToInput(),
                this.options.onFinish &&
                    "function" == typeof this.options.onFinish &&
                    (this.options.scope
                        ? this.options.onFinish.call(
                              this.options.scope,
                              this.result
                          )
                        : this.options.onFinish(this.result))
        },
        callOnUpdate: function () {
            this.writeToInput(),
                this.options.onUpdate &&
                    "function" == typeof this.options.onUpdate &&
                    (this.options.scope
                        ? this.options.onUpdate.call(
                              this.options.scope,
                              this.result
                          )
                        : this.options.onUpdate(this.result))
        },
        toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input"),
                this.has_tab_index
                    ? this.$cache.input.prop("tabindex", -1)
                    : this.$cache.input.removeProp("tabindex"),
                (this.has_tab_index = !this.has_tab_index)
        },
        convertToPercent: function (t, i) {
            var s,
                o = this.options.max - this.options.min,
                e = o / 100
            return o
                ? ((s = (i ? t : t - this.options.min) / e), this.toFixed(s))
                : ((this.no_diapason = !0), 0)
        },
        convertToValue: function (t) {
            var i,
                s,
                o = this.options.min,
                e = this.options.max,
                h = o.toString().split(".")[1],
                r = e.toString().split(".")[1],
                n = 0,
                a = 0
            if (0 === t) return this.options.min
            if (100 === t) return this.options.max
            h && (n = i = h.length),
                r && (n = s = r.length),
                i && s && (n = s <= i ? i : s),
                o < 0 &&
                    ((o = +(o + (a = Math.abs(o))).toFixed(n)),
                    (e = +(e + a).toFixed(n)))
            var c,
                l = ((e - o) / 100) * t + o,
                _ = this.options.step.toString().split(".")[1]
            return (
                (l = _
                    ? +l.toFixed(_.length)
                    : ((l /= this.options.step),
                      +(l *= this.options.step).toFixed(0))),
                a && (l -= a),
                (c = _ ? +l.toFixed(_.length) : this.toFixed(l)) <
                this.options.min
                    ? (c = this.options.min)
                    : c > this.options.max && (c = this.options.max),
                c
            )
        },
        calcWithStep: function (t) {
            var i = Math.round(t / this.coords.p_step) * this.coords.p_step
            return 100 < i && (i = 100), 100 === t && (i = 100), this.toFixed(i)
        },
        checkMinInterval: function (t, i, s) {
            var o,
                e,
                h = this.options
            return h.min_interval
                ? ((o = this.convertToValue(t)),
                  (e = this.convertToValue(i)),
                  "from" === s
                      ? e - o < h.min_interval && (o = e - h.min_interval)
                      : o - e < h.min_interval && (o = e + h.min_interval),
                  this.convertToPercent(o))
                : t
        },
        checkMaxInterval: function (t, i, s) {
            var o,
                e,
                h = this.options
            return h.max_interval
                ? ((o = this.convertToValue(t)),
                  (e = this.convertToValue(i)),
                  "from" === s
                      ? e - o > h.max_interval && (o = e - h.max_interval)
                      : o - e > h.max_interval && (o = e + h.max_interval),
                  this.convertToPercent(o))
                : t
        },
        checkDiapason: function (t, i, s) {
            var o = this.convertToValue(t),
                e = this.options
            return (
                "number" != typeof i && (i = e.min),
                "number" != typeof s && (s = e.max),
                o < i && (o = i),
                s < o && (o = s),
                this.convertToPercent(o)
            )
        },
        toFixed: function (t) {
            return +(t = t.toFixed(20))
        },
        _prettify: function (t) {
            return this.options.prettify_enabled
                ? this.options.prettify &&
                  "function" == typeof this.options.prettify
                    ? this.options.prettify(t)
                    : this.prettify(t)
                : t
        },
        prettify: function (t) {
            return t
                .toString()
                .replace(
                    /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                    "$1" + this.options.prettify_separator
                )
        },
        checkEdges: function (t, i) {
            return (
                this.options.force_edges &&
                    (t < 0 ? (t = 0) : 100 - i < t && (t = 100 - i)),
                this.toFixed(t)
            )
        },
        validate: function () {
            var t,
                i,
                s = this.options,
                o = this.result,
                e = s.values,
                h = e.length
            if (
                ("string" == typeof s.min && (s.min = +s.min),
                "string" == typeof s.max && (s.max = +s.max),
                "string" == typeof s.from && (s.from = +s.from),
                "string" == typeof s.to && (s.to = +s.to),
                "string" == typeof s.step && (s.step = +s.step),
                "string" == typeof s.from_min && (s.from_min = +s.from_min),
                "string" == typeof s.from_max && (s.from_max = +s.from_max),
                "string" == typeof s.to_min && (s.to_min = +s.to_min),
                "string" == typeof s.to_max && (s.to_max = +s.to_max),
                "string" == typeof s.grid_num && (s.grid_num = +s.grid_num),
                s.max < s.min && (s.max = s.min),
                h)
            )
                for (
                    s.p_values = [],
                        s.min = 0,
                        s.max = h - 1,
                        s.step = 1,
                        s.grid_num = s.max,
                        s.grid_snap = !0,
                        i = 0;
                    i < h;
                    i++
                )
                    (t = +e[i]),
                        (t = isNaN(t) ? e[i] : ((e[i] = t), this._prettify(t))),
                        s.p_values.push(t)
            ;("number" == typeof s.from && !isNaN(s.from)) || (s.from = s.min),
                ("number" == typeof s.to && !isNaN(s.to)) || (s.to = s.max),
                "single" === s.type
                    ? (s.from < s.min && (s.from = s.min),
                      s.from > s.max && (s.from = s.max))
                    : (s.from < s.min && (s.from = s.min),
                      s.from > s.max && (s.from = s.max),
                      s.to < s.min && (s.to = s.min),
                      s.to > s.max && (s.to = s.max),
                      this.update_check.from &&
                          (this.update_check.from !== s.from &&
                              s.from > s.to &&
                              (s.from = s.to),
                          this.update_check.to !== s.to &&
                              s.to < s.from &&
                              (s.to = s.from)),
                      s.from > s.to && (s.from = s.to),
                      s.to < s.from && (s.to = s.from)),
                ("number" != typeof s.step ||
                    isNaN(s.step) ||
                    !s.step ||
                    s.step < 0) &&
                    (s.step = 1),
                "number" == typeof s.from_min &&
                    s.from < s.from_min &&
                    (s.from = s.from_min),
                "number" == typeof s.from_max &&
                    s.from > s.from_max &&
                    (s.from = s.from_max),
                "number" == typeof s.to_min &&
                    s.to < s.to_min &&
                    (s.to = s.to_min),
                "number" == typeof s.to_max &&
                    s.from > s.to_max &&
                    (s.to = s.to_max),
                o &&
                    (o.min !== s.min && (o.min = s.min),
                    o.max !== s.max && (o.max = s.max),
                    (o.from < o.min || o.from > o.max) && (o.from = s.from),
                    (o.to < o.min || o.to > o.max) && (o.to = s.to)),
                ("number" != typeof s.min_interval ||
                    isNaN(s.min_interval) ||
                    !s.min_interval ||
                    s.min_interval < 0) &&
                    (s.min_interval = 0),
                ("number" != typeof s.max_interval ||
                    isNaN(s.max_interval) ||
                    !s.max_interval ||
                    s.max_interval < 0) &&
                    (s.max_interval = 0),
                s.min_interval &&
                    s.min_interval > s.max - s.min &&
                    (s.min_interval = s.max - s.min),
                s.max_interval &&
                    s.max_interval > s.max - s.min &&
                    (s.max_interval = s.max - s.min)
        },
        decorate: function (t, i) {
            var s = "",
                o = this.options
            return (
                o.prefix && (s += o.prefix),
                (s += t),
                o.max_postfix &&
                    (o.values.length && t === o.p_values[o.max]
                        ? ((s += o.max_postfix), o.postfix && (s += " "))
                        : i === o.max &&
                          ((s += o.max_postfix), o.postfix && (s += " "))),
                o.postfix && (s += o.postfix),
                s
            )
        },
        updateFrom: function () {
            ;(this.result.from = this.options.from),
                (this.result.from_percent = this.convertToPercent(
                    this.result.from
                )),
                (this.result.from_pretty = this._prettify(this.result.from)),
                this.options.values &&
                    (this.result.from_value =
                        this.options.values[this.result.from])
        },
        updateTo: function () {
            ;(this.result.to = this.options.to),
                (this.result.to_percent = this.convertToPercent(
                    this.result.to
                )),
                (this.result.to_pretty = this._prettify(this.result.to)),
                this.options.values &&
                    (this.result.to_value = this.options.values[this.result.to])
        },
        updateResult: function () {
            ;(this.result.min = this.options.min),
                (this.result.max = this.options.max),
                this.updateFrom(),
                this.updateTo()
        },
        appendGrid: function () {
            if (this.options.grid) {
                var t,
                    i,
                    s,
                    o,
                    e,
                    h,
                    r = this.options,
                    n = r.max - r.min,
                    a = r.grid_num,
                    c = 0,
                    l = 4,
                    _ = ""
                for (
                    this.calcGridMargin(),
                        r.grid_snap && (a = n / r.step),
                        50 < a && (a = 50),
                        s = this.toFixed(100 / a),
                        4 < a && (l = 3),
                        7 < a && (l = 2),
                        14 < a && (l = 1),
                        28 < a && (l = 0),
                        t = 0;
                    t < a + 1;
                    t++
                ) {
                    for (
                        o = l,
                            100 < (c = this.toFixed(s * t)) && (c = 100),
                            e =
                                ((this.coords.big[t] = c) - s * (t - 1)) /
                                (o + 1),
                            i = 1;
                        i <= o && 0 !== c;
                        i++
                    )
                        _ +=
                            '<span class="irs-grid-pol small" style="left: ' +
                            this.toFixed(c - e * i) +
                            '%"></span>'
                    ;(_ +=
                        '<span class="irs-grid-pol" style="left: ' +
                        c +
                        '%"></span>'),
                        (h = this.convertToValue(c)),
                        (_ +=
                            '<span class="irs-grid-text js-grid-text-' +
                            t +
                            '" style="left: ' +
                            c +
                            '%">' +
                            (h = r.values.length
                                ? r.p_values[h]
                                : this._prettify(h)) +
                            "</span>")
                }
                ;(this.coords.big_num = Math.ceil(a + 1)),
                    this.$cache.cont.addClass("irs-with-grid"),
                    this.$cache.grid.html(_),
                    this.cacheGridLabels()
            }
        },
        cacheGridLabels: function () {
            var t,
                i,
                s = this.coords.big_num
            for (i = 0; i < s; i++)
                (t = this.$cache.grid.find(".js-grid-text-" + i)),
                    this.$cache.grid_labels.push(t)
            this.calcGridLabels()
        },
        calcGridLabels: function () {
            var t,
                i,
                s = [],
                o = [],
                e = this.coords.big_num
            for (t = 0; t < e; t++)
                (this.coords.big_w[t] = this.$cache.grid_labels[t].outerWidth(
                    !1
                )),
                    (this.coords.big_p[t] = this.toFixed(
                        (this.coords.big_w[t] / this.coords.w_rs) * 100
                    )),
                    (this.coords.big_x[t] = this.toFixed(
                        this.coords.big_p[t] / 2
                    )),
                    (s[t] = this.toFixed(
                        this.coords.big[t] - this.coords.big_x[t]
                    )),
                    (o[t] = this.toFixed(s[t] + this.coords.big_p[t]))
            for (
                this.options.force_edges &&
                    (s[0] < -this.coords.grid_gap &&
                        ((s[0] = -this.coords.grid_gap),
                        (o[0] = this.toFixed(s[0] + this.coords.big_p[0])),
                        (this.coords.big_x[0] = this.coords.grid_gap)),
                    o[e - 1] > 100 + this.coords.grid_gap &&
                        ((o[e - 1] = 100 + this.coords.grid_gap),
                        (s[e - 1] = this.toFixed(
                            o[e - 1] - this.coords.big_p[e - 1]
                        )),
                        (this.coords.big_x[e - 1] = this.toFixed(
                            this.coords.big_p[e - 1] - this.coords.grid_gap
                        )))),
                    this.calcGridCollision(2, s, o),
                    this.calcGridCollision(4, s, o),
                    t = 0;
                t < e;
                t++
            )
                (i = this.$cache.grid_labels[t][0]),
                    this.coords.big_x[t] !== Number.POSITIVE_INFINITY &&
                        (i.style.marginLeft = -this.coords.big_x[t] + "%")
        },
        calcGridCollision: function (t, i, s) {
            var o,
                e,
                h,
                r = this.coords.big_num
            for (o = 0; o < r && !(r <= (e = o + t / 2)); o += t)
                (h = this.$cache.grid_labels[e][0]),
                    s[o] <= i[e]
                        ? (h.style.visibility = "visible")
                        : (h.style.visibility = "hidden")
        },
        calcGridMargin: function () {
            this.options.grid_margin &&
                ((this.coords.w_rs = this.$cache.rs.outerWidth(!1)),
                this.coords.w_rs &&
                    ("single" === this.options.type
                        ? (this.coords.w_handle =
                              this.$cache.s_single.outerWidth(!1))
                        : (this.coords.w_handle = this.$cache.s_from.outerWidth(
                              !1
                          )),
                    (this.coords.p_handle = this.toFixed(
                        (this.coords.w_handle / this.coords.w_rs) * 100
                    )),
                    (this.coords.grid_gap = this.toFixed(
                        this.coords.p_handle / 2 - 0.1
                    )),
                    (this.$cache.grid[0].style.width =
                        this.toFixed(100 - this.coords.p_handle) + "%"),
                    (this.$cache.grid[0].style.left =
                        this.coords.grid_gap + "%")))
        },
        update: function (t) {
            this.input &&
                ((this.is_update = !0),
                (this.options.from = this.result.from),
                (this.options.to = this.result.to),
                (this.update_check.from = this.result.from),
                (this.update_check.to = this.result.to),
                (this.options = a.extend(this.options, t)),
                this.validate(),
                this.updateResult(t),
                this.toggleInput(),
                this.remove(),
                this.init(!0))
        },
        reset: function () {
            this.input && (this.updateResult(), this.update())
        },
        destroy: function () {
            this.input &&
                (this.toggleInput(),
                this.$cache.input.prop("readonly", !1),
                a.data(this.input, "ionRangeSlider", null),
                this.remove(),
                (this.input = null),
                (this.options = null))
        },
    }),
        (a.fn.ionRangeSlider = function (t) {
            return this.each(function () {
                a.data(this, "ionRangeSlider") ||
                    a.data(this, "ionRangeSlider", new h(this, t, o++))
            })
        }),
        (function () {
            for (
                var h = 0, t = ["ms", "moz", "webkit", "o"], i = 0;
                i < t.length && !l.requestAnimationFrame;
                ++i
            )
                (l.requestAnimationFrame = l[t[i] + "RequestAnimationFrame"]),
                    (l.cancelAnimationFrame =
                        l[t[i] + "CancelAnimationFrame"] ||
                        l[t[i] + "CancelRequestAnimationFrame"])
            l.requestAnimationFrame ||
                (l.requestAnimationFrame = function (t, i) {
                    var s = new Date().getTime(),
                        o = Math.max(0, 16 - (s - h)),
                        e = l.setTimeout(function () {
                            t(s + o)
                        }, o)
                    return (h = s + o), e
                }),
                l.cancelAnimationFrame ||
                    (l.cancelAnimationFrame = function (t) {
                        clearTimeout(t)
                    })
        })()
})

/*!
	Zoom 1.7.21
	license: MIT
	http://www.jacklmoore.com/zoom
*/
;(function (o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1,
    }
    ;(o.zoom = function (t, n, e, i) {
        var u,
            c,
            a,
            r,
            m,
            l,
            s,
            f = o(t),
            h = f.css("position"),
            d = o(n)
        return (
            (t.style.position = /(absolute|fixed)/.test(h) ? h : "relative"),
            (t.style.overflow = "hidden"),
            (e.style.width = e.style.height = ""),
            o(e)
                .addClass("zoomImg")
                .css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: e.width * i,
                    height: e.height * i,
                    border: "none",
                    maxWidth: "none",
                    maxHeight: "none",
                })
                .appendTo(t),
            {
                init: function () {
                    ;(c = f.outerWidth()),
                        (u = f.outerHeight()),
                        n === t
                            ? ((r = c), (a = u))
                            : ((r = d.outerWidth()), (a = d.outerHeight())),
                        (m = (e.width - c) / r),
                        (l = (e.height - u) / a),
                        (s = d.offset())
                },
                move: function (o) {
                    var t = o.pageX - s.left,
                        n = o.pageY - s.top
                    ;(n = Math.max(Math.min(n, a), 0)),
                        (t = Math.max(Math.min(t, r), 0)),
                        (e.style.left = t * -m + "px"),
                        (e.style.top = n * -l + "px")
                },
            }
        )
    }),
        (o.fn.zoom = function (n) {
            return this.each(function () {
                var e = o.extend({}, t, n || {}),
                    i = (e.target && o(e.target)[0]) || this,
                    u = this,
                    c = o(u),
                    a = document.createElement("img"),
                    r = o(a),
                    m = "mousemove.zoom",
                    l = !1,
                    s = !1
                if (!e.url) {
                    var f = u.querySelector("img")
                    if (
                        (f &&
                            (e.url =
                                f.getAttribute("data-src") ||
                                f.currentSrc ||
                                f.src),
                        !e.url)
                    )
                        return
                }
                c.one(
                    "zoom.destroy",
                    function (o, t) {
                        c.off(".zoom"),
                            (i.style.position = o),
                            (i.style.overflow = t),
                            (a.onload = null),
                            r.remove()
                    }.bind(this, i.style.position, i.style.overflow)
                ),
                    (a.onload = function () {
                        function t(t) {
                            f.init(),
                                f.move(t),
                                r
                                    .stop()
                                    .fadeTo(
                                        o.support.opacity ? e.duration : 0,
                                        1,
                                        o.isFunction(e.onZoomIn)
                                            ? e.onZoomIn.call(a)
                                            : !1
                                    )
                        }
                        function n() {
                            r.stop().fadeTo(
                                e.duration,
                                0,
                                o.isFunction(e.onZoomOut)
                                    ? e.onZoomOut.call(a)
                                    : !1
                            )
                        }
                        var f = o.zoom(i, u, a, e.magnify)
                        "grab" === e.on
                            ? c.on("mousedown.zoom", function (e) {
                                  1 === e.which &&
                                      (o(document).one(
                                          "mouseup.zoom",
                                          function () {
                                              n(), o(document).off(m, f.move)
                                          }
                                      ),
                                      t(e),
                                      o(document).on(m, f.move),
                                      e.preventDefault())
                              })
                            : "click" === e.on
                            ? c.on("click.zoom", function (e) {
                                  return l
                                      ? void 0
                                      : ((l = !0),
                                        t(e),
                                        o(document).on(m, f.move),
                                        o(document).one(
                                            "click.zoom",
                                            function () {
                                                n(),
                                                    (l = !1),
                                                    o(document).off(m, f.move)
                                            }
                                        ),
                                        !1)
                              })
                            : "toggle" === e.on
                            ? c.on("click.zoom", function (o) {
                                  l ? n() : t(o), (l = !l)
                              })
                            : "mouseover" === e.on &&
                              (f.init(),
                              c
                                  .on("mouseenter.zoom", t)
                                  .on("mouseleave.zoom", n)
                                  .on(m, f.move)),
                            e.touch &&
                                c
                                    .on("touchstart.zoom", function (o) {
                                        o.preventDefault(),
                                            s
                                                ? ((s = !1), n())
                                                : ((s = !0),
                                                  t(
                                                      o.originalEvent
                                                          .touches[0] ||
                                                          o.originalEvent
                                                              .changedTouches[0]
                                                  ))
                                    })
                                    .on("touchmove.zoom", function (o) {
                                        o.preventDefault(),
                                            f.move(
                                                o.originalEvent.touches[0] ||
                                                    o.originalEvent
                                                        .changedTouches[0]
                                            )
                                    })
                                    .on("touchend.zoom", function (o) {
                                        o.preventDefault(), s && ((s = !1), n())
                                    }),
                            o.isFunction(e.callback) && e.callback.call(a)
                    }),
                    a.setAttribute("role", "presentation"),
                    (a.alt = ""),
                    (a.src = e.url)
            })
        }),
        (o.fn.zoom.defaults = t)
})(window.jQuery)

$(function () {
    // Get the form.
    var form = $("#contact-form")

    // Get the messages div.
    var formMessages = $(".form-message")

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault()

        // Serialize the form data.
        var formData = $(form).serialize()

        // Submit the form using AJAX.
        $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData,
        })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass("error")
                $(formMessages).addClass("success")

                // Set the message text.
                $(formMessages).text(response)

                // Clear the form.
                $("#contact-form input,#contact-form textarea").val("")
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass("success")
                $(formMessages).addClass("error")

                // Set the message text.
                if (data.responseText !== "") {
                    $(formMessages).text(data.responseText)
                } else {
                    $(formMessages).text(
                        "Oops! An error occured and your message could not be sent."
                    )
                }
            })
    })
})

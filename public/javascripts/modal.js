! function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof module && module.exports ? module.exports = b() : a.picoModal = b()
}(this, function() {
    "use strict";

    function a(a) {
        return "object" == typeof Node ? a instanceof Node : a && "object" == typeof a && "number" == typeof a.nodeType
    }

    function b(a) {
        return "string" == typeof a
    }

    function c() {
        var a = [];
        return {
            watch: a.push.bind(a),
            trigger: function(b, c) {
                for (var d = !0, e = {
                        detail: c,
                        preventDefault: function() {
                            d = !1
                        }
                    }, f = 0; f < a.length; f++) a[f](b, e);
                return d
            }
        }
    }

    function d(a) {
        return "none" === window.getComputedStyle(a).display
    }

    function e(a) {
        this.elem = a
    }

    function f(a, b) {
        return e.make(a("parent")).clazz("pico-overlay").clazz(a("overlayClass", "")).stylize({
            display: "none",
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            zIndex: 1e4
        }).stylize(a("overlayStyles", {
            opacity: .5,
            background: "#000"
        })).onClick(function() {
            a("overlayClose", !0) && b()
        })
    }

    function g(a, b) {
        var c = a("width", "auto");
        "number" == typeof c && (c = "" + c + "px");
        var d = a("modalId", "pico-" + l++),
            f = e.make(a("parent")).clazz("pico-content").clazz(a("modalClass", "")).stylize({
                display: "none",
                position: "fixed",
                zIndex: 10001,
                left: "50%",
                top: "38.1966%",
                maxHeight: "90%",
                boxSizing: "border-box",
                width: c,
                "-ms-transform": "translate(-50%,-38.1966%)",
                "-moz-transform": "translate(-50%,-38.1966%)",
                "-webkit-transform": "translate(-50%,-38.1966%)",
                "-o-transform": "translate(-50%,-38.1966%)",
                transform: "translate(-50%,-38.1966%)"
            }).stylize(a("modalStyles", {
                overflow: "auto",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px"
            })).html(a("content")).attr("id", d).attr("role", "dialog").attr("aria-labelledby", a("ariaLabelledBy")).attr("aria-describedby", a("ariaDescribedBy", d)).onClick(function(a) {
                var c = new e(a.target).anyAncestor(function(a) {
                    return /\bpico-close\b/.test(a.elem.className)
                });
                c && b()
            });
        return f
    }

    function h(a, b) {
        return b("closeButton", !0) ? a.child("button").html(b("closeHtml", "&#xD7;")).clazz("pico-close").clazz(b("closeClass", "")).stylize(b("closeStyles", {
            borderRadius: "2px",
            border: 0,
            padding: 0,
            cursor: "pointer",
            height: "15px",
            width: "15px",
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "15px",
            background: "#CCC"
        })).attr("aria-label", b("close-label", "Close")) : void 0
    }

    function i(a) {
        return function() {
            return a().elem
        }
    }

    function j(a, b) {
        function c(a, b) {
            var c = a.msMatchesSelector || a.webkitMatchesSelector || a.matches;
            return c.call(a, b)
        }

        function e(a) {
            return d(a) || c(a, ":disabled") || a.hasAttribute("contenteditable") ? !1 : a.hasAttribute("tabindex") || c(a, "input,select,textarea,button,a[href],area[href],iframe")
        }

        function f(a) {
            for (var b = a.getElementsByTagName("*"), c = 0; c < b.length; c++)
                if (e(b[c])) return b[c]
        }

        function g(a) {
            for (var b = a.getElementsByTagName("*"), c = b.length; c--;)
                if (e(b[c])) return b[c]
        }
        var h;
        a.beforeShow(function() {
            h = document.activeElement
        }), a.afterShow(function() {
            if (b()) {
                var c = f(a.modalElem());
                c && c.focus()
            }
        }), a.afterClose(function() {
            b() && h && h.focus(), h = null
        }), n.watch(function(c) {
            if (b() && a.isVisible()) {
                var d = f(a.modalElem()),
                    e = g(a.modalElem()),
                    h = c.shiftKey ? d : e;
                h === document.activeElement && ((c.shiftKey ? e : d).focus(), c.preventDefault())
            }
        })
    }

    function k(a, b) {
        var c, d = new e(document.body);
        a.beforeShow(function() {
            c = d.elem.style.overflow, b() && d.stylize({
                overflow: "hidden"
            })
        }), a.afterClose(function() {
            d.stylize({
                overflow: c
            })
        })
    }
    e.make = function(a, b) {
        "string" == typeof a && (a = document.querySelector(a));
        var c = document.createElement(b || "div");
        return (a || document.body).appendChild(c), new e(c)
    }, e.prototype = {
        child: function(a) {
            return e.make(this.elem, a)
        },
        stylize: function(a) {
            a = a || {}, "undefined" != typeof a.opacity && (a.filter = "alpha(opacity=" + 100 * a.opacity + ")");
            for (var b in a) a.hasOwnProperty(b) && (this.elem.style[b] = a[b]);
            return this
        },
        clazz: function(a) {
            return this.elem.className += " " + a, this
        },
        html: function(b) {
            return a(b) ? this.elem.appendChild(b) : this.elem.innerHTML = b, this
        },
        onClick: function(a) {
            return this.elem.addEventListener("click", a), this
        },
        destroy: function() {
            this.elem.parentNode.removeChild(this.elem)
        },
        hide: function() {
            this.elem.style.display = "none"
        },
        show: function() {
            this.elem.style.display = "block"
        },
        attr: function(a, b) {
            return void 0 !== b && this.elem.setAttribute(a, b), this
        },
        anyAncestor: function(a) {
            for (var b = this.elem; b;) {
                if (a(new e(b))) return !0;
                b = b.parentNode
            }
            return !1
        },
        isVisible: function() {
            return !d(this.elem)
        }
    };
    var l = 1,
        m = c(),
        n = c();
    return document.documentElement.addEventListener("keydown", function(a) {
            var b = a.which || a.keyCode;
            27 === b ? m.trigger() : 9 === b && n.trigger(a)
        }),
        function(d) {
            function e(a, b) {
                var c = d[a];
                return "function" == typeof c && (c = c(b)), void 0 === c ? b : c
            }

            function l(a) {
                y().hide(), x().hide(), w.trigger(q, a)
            }

            function n(a) {
                v.trigger(q, a) && l(a)
            }

            function o(a) {
                return function() {
                    return a.apply(this, arguments), q
                }
            }

            function p(a, b) {
                if (!r) {
                    var c = g(e, n);
                    r = {
                        modal: c,
                        overlay: f(e, n),
                        close: h(c, e)
                    }, s.trigger(q, b)
                }
                return r[a]
            }(b(d) || a(d)) && (d = {
                content: d
            });
            var q, r, s = c(),
                t = c(),
                u = c(),
                v = c(),
                w = c(),
                x = p.bind(window, "modal"),
                y = p.bind(window, "overlay"),
                z = p.bind(window, "close");
            return q = {
                modalElem: i(x),
                closeElem: i(z),
                overlayElem: i(y),
                buildDom: o(p.bind(null, null)),
                isVisible: function() {
                    return !!(r && x && x().isVisible())
                },
                show: function(a) {
                    return t.trigger(q, a) && (y().show(), z(), x().show(), u.trigger(q, a)), this
                },
                close: o(n),
                forceClose: o(l),
                destroy: function() {
                    x().destroy(), y().destroy(), y = x = z = void 0
                },
                options: function(a) {
                    Object.keys(a).map(function(b) {
                        d[b] = a[b]
                    })
                },
                afterCreate: o(s.watch),
                beforeShow: o(t.watch),
                afterShow: o(u.watch),
                beforeClose: o(v.watch),
                afterClose: o(w.watch)
            }, j(q, e.bind(null, "focus", !0)), k(q, e.bind(null, "bodyOverflow", !0)), m.watch(function() {
                e("escCloses", !0) && q.isVisible() && q.close()
            }), q
        }
});

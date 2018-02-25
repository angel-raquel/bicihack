!(function(e) {
  function t(o) {
    if (n[o]) return n[o].exports;
    var a = (n[o] = { exports: {}, id: o, loaded: !1 });
    return e[o].call(a.exports, a, a.exports, t), (a.loaded = !0), a.exports;
  }
  var n = {};
  return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
  function(e, t) {
    function n(e) {
      var t,
        n = /\+/g,
        o = /([^&=]+)=?([^&]*)/g,
        a = function(e) {
          return decodeURIComponent(e.replace(n, " "));
        },
        i = e;
      for (urlParams = {}; (t = o.exec(i)); ) urlParams[a(t[1])] = a(t[2]);
      return urlParams;
    }
    function o() {}
    function a(e) {
      for (
        var t = e.getElementsByTagName("coordinates"), n = [], o = 0;
        o < t.length;
        o++
      )
        for (
          var a = t[o].firstChild.nodeValue.trim(),
            i = a.split(/0[\s\n]/),
            s = 0,
            r = i.length;
          s < r;
          s++
        ) {
          var l = e.createElement("latLng");
          l.setAttribute("lon", i[s].split(",")[0].trim()),
            l.setAttribute("lat", i[s].split(",")[1].trim()),
            n.push(l);
        }
      return n;
    }
    function i(e) {
      try {
        var t = new FileReader();
        (t.onload = function() {
          var n = t.result;
          window.DOMParser
            ? (xmlDoc = new DOMParser().parseFromString(n, "text/xml"))
            : ((xmlDoc = new ActiveXObject("Microsoft.XMLDOM")),
              (xmlDoc.async = !1),
              xmlDoc.loadXML(n));
          var o = xmlDoc.getElementsByTagName("trkpt");
          0 === o.length &&
            (o = xmlDoc.getElementsByTagNameNS(
              "http://www.garmin.com/xmlschemas/GpxExtensions/v3",
              "rpt"
            )),
            0 === o.length && (o = xmlDoc.getElementsByTagName("rtept")),
            0 === o.length && (o = xmlDoc.getElementsByTagName("wpt")),
            0 === o.length && (o = a(xmlDoc));
          for (var i = [], r = 0, l = o.length; r < l; r++)
            i.push(
              new google.maps.LatLng(
                1 * o[r].getAttribute("lat"),
                o[r].getAttribute("lon")
              )
            );
          0 === i.length
            ? s("No waypoints found in provided file.")
            : ("" !== document.getElementById("routename").value
                ? (document.getElementById(
                    "route-name-label"
                  ).innerHTML = document.getElementById("routename").value)
                : (document.getElementById("route-name-label").innerHTML =
                    e.value),
              c({ route: { overview_path: i } }));
        }),
          t.readAsText(e.files[0]);
      } catch (e) {
        s("Error uploading file, please try a new file or a new browser.");
      }
    }
    function s(e) {
      (document.getElementById("statusbox").style.display = "block"),
        (document.getElementById("statusbox").innerHTML = e),
        (document.getElementById("stage").style.display = "none"),
        $(document.body).scrollTop(0);
    }
    function r() {
      document.getElementById("statusbox").style.display = "none";
    }
    function l() {
      return google.maps.TravelMode[$("#travelmode").val()];
    }
    function d() {
      ga("send", {
        hitType: "event",
        eventCategory: "movie",
        eventAction: "framesLoading",
        eventLabel: u.getTotalFrames()
      });
    }
    function c(e) {
      null !== u && u.dispose(),
        (u = new google.maps.StreetViewPlayer(
          $.extend(e, {
            movieCanvas: document.getElementById("draw"),
            mapCanvas: document.getElementById("map"),
            travelMode: l(),
            fps: document.getElementById("fps").value,
            onLoading: function() {
              (document.getElementById("stage").style.display = "block"),
                (document.getElementById("draw").className = "loading"),
                (document.getElementById("controls").style.visibility =
                  "hidden"),
                $(document.body).scrollTop($("#stage").offset().top);
            },
            onError: function(e) {
              s(e);
            },
            onPlay: function() {
              d(),
                (document.getElementById("draw").className = ""),
                (document.getElementById("controls").style.visibility =
                  "visible"),
                (document.getElementById("route-distance").innerHTML =
                  Math.round(100 * u.getRouteDistance()) / 100 + "km");
            },
            onProgress: function(e) {
              (document.getElementById("progressbar").style.width =
                e.loaded + "%"),
                (document.getElementById("bufferbar").style.width =
                  Math.min(100 - e.loaded, e.buffer) + "%");
            }
          })
        ));
    }
    var u = null;
    $(function() {
      google.charts.load("current", { packages: ["corechart"] }),
        ga("set", "metric1", "FramesPerRoute"),
        $("#progress").mousedown(function(e) {
          if (
            e.target === $("#progressbar")[0] ||
            e.target === $("#bufferbar")[0]
          ) {
            var t = $("#progress"),
              n = Math.floor(
                u.getTotalVertices() * ((e.pageX - t.offset().left) / t.width())
              );
            u.setProgress(n, o);
          }
        });
      var e = window.location.hash || window.location.search;
      if (e && e.length) {
        var t = n(e.substring(1));
        "undefined" != typeof t.origin &&
          (document.getElementById("origin").value = t.origin),
          "undefined" != typeof t.destination &&
            (document.getElementById("destination").value = t.destination),
          "undefined" != typeof t.advanced &&
            ((document.getElementById("advanced").checked = !0),
            showAdvanced()),
          "undefined" != typeof t.fps &&
            (document.getElementById("fps").value = t.fps),
          "undefined" != typeof t.travelmode &&
            $("#travelmode").val(t.travelmode),
          "undefined" != typeof t.rn &&
            (document.getElementById("routename").value = t.rn),
          initMovie();
      }
    }),
      (window.pauseMovie = function(e) {
        u.getPaused() === !1
          ? (u.setPaused(!0),
            (e.title = "Play"),
            (e.firstChild.className = "glyphicon glyphicon-play"))
          : (u.setPaused(!1),
            (e.title = "Pause"),
            (e.firstChild.className = "glyphicon glyphicon-pause"));
      }),
      (window.fullScreen = function() {
        var e = document.getElementById("draw");
        e.requestFullscreen
          ? e.requestFullscreen()
          : e.msRequestFullscreen
            ? e.msRequestFullscreen()
            : e.mozRequestFullScreen
              ? e.mozRequestFullScreen()
              : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
      }),
      $(function() {
        $("#downloadModal").on("shown.bs.modal", function() {
          u.buildMovie();
        });
      }),
      (window.initMovie = function() {
        var e = document.getElementById("origin"),
          t = document.getElementById("destination"),
          n = document.getElementById("gxp-file");
        return (
          r(),
          "" !== n.value
            ? void i(n)
            : "" === e.value
              ? void s("Origin field is required.")
              : "" === t.value
                ? void s("Destination field is required.")
                : ("" !== document.getElementById("routename").value
                    ? (document.getElementById(
                        "route-name-label"
                      ).innerHTML = document.getElementById("routename").value)
                    : (document.getElementById("route-name-label").innerHTML =
                        e.value + " to " + t.value),
                  void c({ origin: e.value, destination: t.value }))
        );
      }),
      (window.speedUpMovie = function() {
        u.setFPS(u.getFPS() + 1);
      }),
      (window.slowDownMovie = function() {
        u.setFPS(u.getFPS() - 1);
      }),
      (window.buildLink = function() {
        window.location = "#" + $("#mainform").serialize();
      }),
      (window.showAdvanced = function() {
        $("#advanced-area").removeClass("hidden");
      }),
      (window.hideAdvanced = function() {
        $("#advanced-area").addClass("hidden");
      }),
      (window.getShareURL = function() {
        return (
          window.location.protocol +
          "//" +
          window.location.hostname +
          (window.location.port ? ":" + window.location.port : "") +
          window.location.pathname +
          (window.location.hash || window.location.search).replace("#", "?")
        );
      }),
      (window.shareMovie = function() {
        document.getElementById("routeURL").value = getShareURL();
      }),
      (window.toggleAdvanced = function(e) {
        buildLink(), e.checked ? showAdvanced() : hideAdvanced();
      }),
      (google.maps.StreetViewPlayer = function(e) {
        function t(e) {
          return e * (Math.PI / 180);
        }
        function n(e, n) {
          var o = t(e.lat()),
            a = t(n.lat()),
            i = t(n.lng()) - t(e.lng());
          return (
            (180 *
              Math.atan2(
                Math.sin(i) * Math.cos(a),
                Math.cos(o) * Math.sin(a) -
                  Math.sin(o) * Math.cos(a) * Math.cos(i)
              ) /
              Math.PI +
              360) %
            360
          );
        }
        function a(e, n) {
          var o = t(n.lat() - e.lat()),
            a = t(n.lng() - e.lng()),
            i =
              Math.sin(o / 2) * Math.sin(o / 2) +
              Math.cos(t(e.lat())) *
                Math.cos(t(n.lat())) *
                Math.sin(a / 2) *
                Math.sin(a / 2),
            s = 2 * Math.atan2(Math.sqrt(i), Math.sqrt(1 - i));
          return 6371 * s;
        }
        function i() {
          null !== q.config.onLoading &&
            q.config.onLoading instanceof Function &&
            q.config.onLoading.call(this),
            q.setProgress(0, o);
        }
        function s(e) {
          (R = e.length), d(0, e);
        }
        function r(e) {
          return (
            e &&
            e.copyright &&
            e.copyright.toUpperCase().indexOf("GOOGLE") !== -1
          );
        }
        function l(e, t, n, o) {
          "OK" === o && r(n)
            ? ((t[e].panoData = n),
              setTimeout(d.bind(this, ++e, t), 500 / B),
              e > 0 &&
                (_.push(new H(t[e - 1], t[e])),
                F++,
                L === !1 &&
                  ((L = !0),
                  null !== q.config.onPlay &&
                    q.config.onPlay instanceof Function &&
                    q.config.onPlay.call(this))))
            : (t.splice(e, 1), R--, setTimeout(d.bind(this, e, t), 500 / B));
        }
        function d(e, t) {
          e < R && M.getPanoramaByLocation(t[e], P, l.bind(this, e, t));
        }
        function c() {
          var e = this;
          if (
            ((D = null),
            (L = !1),
            i.call(e),
            "undefined" == typeof this.config.route)
          )
            new google.maps.DirectionsService().route(
              {
                origin: this.config.origin,
                destination: this.config.destination,
                travelMode: this.config.travelMode
              },
              function(t, n) {
                if (n === google.maps.DirectionsStatus.OK) {
                  for (
                    var o = [], i = 0, s = t.routes[0].legs.length;
                    i < s;
                    i++
                  )
                    for (
                      var r = 0, l = t.routes[0].legs[i].steps.length;
                      r < l;
                      r++
                    )
                      for (
                        var d = 0,
                          u = t.routes[0].legs[i].steps[r].lat_lngs.length;
                        d < u;
                        d++
                      )
                        o.push(t.routes[0].legs[i].steps[r].lat_lngs[d]);
                  for (var i = 1, s = o.length; i < s; i++)
                    a(o[i], o[i - 1]) < 0.009 && (o.splice(i--, 1), s--);
                  m({ overview_path: o }),
                    null === x &&
                      ((x = new google.maps.DirectionsRenderer()), x.setMap(S)),
                    x.setDirections(t);
                } else
                  n === google.maps.DirectionsStatus.ZERO_RESULTS
                    ? "BICYCLING" === e.config.travelMode
                      ? ((e.config.travelMode = "DRIVING"),
                        $("#travelmode").val("DRIVING"),
                        setTimeout(function() {
                          c.call(e);
                        }, 1))
                      : e.config.onError.call(
                          this,
                          e.config.travelMode +
                            " is not available for this route, please select a different mode of travel under 'Advanced Options'"
                        )
                    : null != e.config.onError &&
                      e.config.onError instanceof Function &&
                      e.config.onError.call(
                        this,
                        "Error pulling directions for movie, please try again."
                      );
              }
            );
          else {
            m(this.config.route);
            var t = new google.maps.Polyline({
              path: this.config.route.overview_path,
              geodesic: !0,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2
            });
            t.setMap(S);
          }
        }
        function u(e) {
          for (var t = 0, n = 1, o = e.length; n < o; n++)
            t += a(e[n], e[n - 1]);
          return t;
        }
        function g(e) {
          if (!google.visualization || !google.visualization.ColumnChart)
            return void google.charts.setOnLoadCallback(g.bind(this, e));
          var t = [];
          if (e.overview_path.length > 50)
            for (
              var n = Math.ceil(e.overview_path.length / 50), o = 0;
              o < e.overview_path.length;
              o += n
            )
              t.push(e.overview_path[o]);
          else t = e.overview_path;
          b.getElevationAlongPath(
            { path: t, samples: Math.floor(10 * O) },
            function(e, t) {
              var n = document.getElementById("elevation_chart");
              if ("OK" !== t) return void (n.innerHTML = "");
              var o = new google.visualization.ColumnChart(n),
                a = new google.visualization.DataTable();
              a.addColumn("string", "Sample"),
                a.addColumn("number", "Elevation");
              for (var i = 0; i < e.length; i++) {
                var s = i % 10 === 0 ? Math.floor(i / 10) + "km" : "";
                a.addRow([s, e[i].elevation]);
              }
              o.draw(a, {
                height: 150,
                legend: "none",
                titleY: "Elevation (m)"
              });
            }
          );
        }
        function m(e) {
          (k = !0),
            (_ = []),
            (F = 0),
            (C = 0),
            (O = u(e.overview_path)),
            s(e.overview_path),
            null === S &&
              ((S = new google.maps.Map(q.config.mapCanvas, {
                zoom: 14,
                center: e.overview_path[0],
                mapTypeId: google.maps.MapTypeId.ROADMAP
              })),
              (D = new google.maps.Marker({
                map: S,
                location: e.overview_path[0],
                visible: !0
              }))),
            g(e),
            q.setPaused(!1);
        }
        function h(e, t) {
          return parseInt(Math.floor(e * t / 512));
        }
        function f(e, t, n, o, a, i) {
          for (var s = a.getImageData(), r = 0, l = s.length; r < l; r++)
            try {
              i.drawImage(
                a.m_aImages[r],
                0,
                0,
                512,
                512,
                h(s[r].left, e),
                0,
                e,
                t
              );
            } catch (e) {
              console.error("Failed to draw image", e);
            }
        }
        function v(e, t) {
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
            ? ((N.height = screen.availHeight), (N.width = screen.availWidth))
            : ((N.width = N.parentNode.offsetWidth), (N.height = 700)),
            0 === e.m_aImages.length
              ? e.getLoadedImages(function(n, o) {
                  (e.m_aImages = o), f(N.width, N.height, 512, 512, e, A), t();
                })
              : (f(N.width, N.height, 512, 512, e, A), t()),
            D.setPosition(e.getPosition());
        }
        function p() {
          T = setTimeout(w, (1e3 / B) >> 0);
        }
        function w() {
          k === !1 &&
            (C >= F
              ? q.setProgress(F, p)
              : k === !1 &&
                F > 0 &&
                C <= F &&
                q.setProgress(C, function() {
                  C++, p();
                }));
        }
        function y() {
          C + 1 < _.length && _[C + 1].loadImages();
        }
        function I() {
          var e = document.getElementById("export-width");
          return e ? 1 * e.value : 512;
        }
        function E() {
          var e = document.getElementById("export-height");
          return e ? 1 * e.value : 512;
        }
        (this.config = e), (this.config.movieCanvas.innerHTML = "");
        var M = new google.maps.StreetViewService(),
          b = new google.maps.ElevationService(),
          _ = [],
          P = 50,
          B = 20,
          C = 0,
          S = null,
          x = null,
          L = !0,
          D = null,
          T = 0,
          F = 0,
          R = 0,
          k = !0,
          O = 0,
          N = document.getElementById("draw"),
          A = N.getContext("2d"),
          q = this;
        "undefined" == typeof this.config.fps ||
          isNaN(parseInt(this.config.fps)) ||
          (B = 1 * this.config.fps);
        var H = function(e, t) {
          (this.m_pPanoData = e.panoData),
            (this.m_sPanoId = this.m_pPanoData.location.pano),
            (this.m_iCameraYaw = this.m_pPanoData.tiles.centerHeading),
            (this.m_iNextYaw = n(e, t)),
            (this.m_aImages = []),
            (this.m_aCanvasStyles = null);
          var o = this.m_iNextYaw - this.m_iCameraYaw;
          o < 0 ? (o += 360) : o > 360 && (o -= 360);
          var a = (896 + o * (1664 / 360)) >> 0;
          a > 1664 && (a -= 1664),
            (this.m_iCanvasOffset = a),
            a >> 8 === 0
              ? (this.m_aCanvasStyles = [2, 3, 0])
              : 256 === a
                ? (this.m_aCanvasStyles = [0])
                : (a - 256) >> 9 === 0
                  ? (this.m_aCanvasStyles = [0, 1])
                  : 768 === a
                    ? (this.m_aCanvasStyles = [1])
                    : (a - 768) >> 9 === 0
                      ? (this.m_aCanvasStyles = [1, 2])
                      : 1280 === a
                        ? (this.m_aCanvasStyles = [2])
                        : (this.m_aCanvasStyles = [2, 3]);
        };
        (H.prototype.loadImages = function() {
          for (var e = this.m_aCanvasStyles, t = 0, n = e.length; t < n; t++)
            this.m_aImages.push(this.getImage(e[t], 0));
        }),
          (H.prototype.getLoadedImages = function(e) {
            for (
              var t = [], n = this.m_aCanvasStyles, o = 0, a = n.length;
              o < a;
              o++
            )
              t.push(this.getImage.bind(this, n[o], 0));
            async.parallel(t, e);
          }),
          (H.prototype.getImage = function(e, t, n) {
            var o = new Image();
            return (
              n &&
                (o.onload = function() {
                  n(null, o);
                }),
              (o.crossOrigin = "Anonymous"),
              (o.src =
                "http://cbk0.google.com/cbk?output=tile&panoid=" +
                this.m_sPanoId +
                "&zoom=2&x=" +
                e +
                "&y=" +
                t +
                "&cb_client=api&fover=0&onerr=3"),
              o
            );
          }),
          (H.prototype.getImageData = function() {
            var e = this.m_iCanvasOffset,
              t = this.m_aCanvasStyles;
            if (3 === t.length) {
              var n = 384 + e;
              return [
                { left: -n, image: this.m_aImages[0].src },
                {
                  left: -n + 512,
                  width: "128px",
                  image: this.m_aImages[1].src
                },
                { left: -n + 640, image: this.m_aImages[2].src }
              ];
            }
            if (1 === t.length)
              return [{ left: 0, image: this.m_aImages[0].src }];
            var n = e - 256 * (2 * t[0] + 1);
            return [
              { left: -n, image: this.m_aImages[0].src },
              { left: -n + 512, image: this.m_aImages[1].src }
            ];
          }),
          (H.prototype.getPosition = function() {
            return this.m_pPanoData.location.latLng;
          }),
          (this.dispose = function() {
            clearTimeout(T);
          }),
          (this.setSensitivity = function(e) {
            P = e;
          }),
          (this.getSensitivity = function() {
            return P;
          }),
          (this.getRouteDistance = function() {
            return O;
          }),
          (this.setFPS = function(e) {
            B = Math.max(1, e);
          }),
          (this.getFPS = function() {
            return B;
          }),
          (this.setProgress = function(e, t) {
            (C = e),
              C >= 0 && C < _.length ? (y(), v(_[C], t)) : t(),
              q.config.onProgress.call(this, {
                loaded: parseInt(100 * C / (R - 1)),
                buffer: parseInt(100 * ((F - C) / (R - 1)))
              });
          }),
          (this.setPaused = function(e) {
            (k = e), e === !1 && w.call(q);
          }),
          (this.getPaused = function() {
            return k;
          }),
          (this.getTotalVertices = function() {
            return R;
          }),
          (this.getTotalFrames = function() {
            return F;
          }),
          (this.buildMovie = function() {
            function e(e) {
              var t = document.createElement("canvas");
              (t.width = n), (t.height = o);
              var i = t.getContext("2d");
              f(n, o, 512, 512, e, i), a.addFrame(t, { delay: 1e3 });
            }
            function t(n) {
              n >= _.length
                ? a.render()
                : _[n].getLoadedImages(function(o, a) {
                    (_[n].m_aImages = a), e(_[n]), t(n + 1);
                  });
            }
            var n = I(),
              o = E(),
              a = new GIF({
                workers: 2,
                workerScript: "js/gif.worker.js",
                quality: 10,
                width: n,
                height: o
              });
            document.getElementById("downloadResult").innerHTML = "";
            var i = document.getElementById("downloadProgress");
            a.on("progress", function(e) {
              i.style.width = parseInt(100 * e) + "%";
            }),
              a.on("finished", function(e) {
                var t = new Image();
                (t.src = URL.createObjectURL(e)),
                  document.getElementById("downloadResult").appendChild(t),
                  ga("send", "event", "videos", "download", _.length);
              }),
              t(0);
          }),
          c.call(this);
      });
  }
]);

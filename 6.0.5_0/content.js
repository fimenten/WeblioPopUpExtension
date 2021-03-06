function WeblioExtensions() {
    //ここから
    function sendGAS(word) {
        var data = {
            "event": {
                "type": "name_of_event",
                "event_ts": "1234567890.123456",
                "user": "WEBLIOEXTENSION",
                "text": word,
                "U1": "BEU4JASCR",
                "U2": "8nSRjJogXcdhLt5i46gVMAS5",
            },
            "type": "event_callback",
            "authed_users": [
                "UXXXXXXX1",
                "UXXXXXXX2"
            ],
        }
        var json = data;

//送信先を指定
        var url = 'https://script.google.com/macros/s/AKfycbyFVmKHr9qV_qk9Cj17fxVBcJDk3T7Z5Bppg1u-0sidrG2BH-uh/exec'

        var options =
            {
                "method": "POST",
                "data": json,
                "Content-Type": "application/json"

            };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json),

        })
    }

//ここまで
    function posEl(x, y) {
        this.x = x;
        this.y = y
    }

    var wBox;
    var preDoc;
    var mvDoc;
    var ps = new posEl(0, 0);
    var mv = new posEl(0, 0);
    var preMv = new posEl(0, 0);
    var isShow = false;
    var preWd = "";
    var shwWd = "";
    var cnd = null;
    var delCnt = 0;
    var isDel = false;
    var dnAlt = false;
    var inId = "";
    var frameDoc;
    var boxDoc;
    var parentPs = new posEl(0, 0);
    var parentPsIf = new posEl(0, 0);
    var currentPs = new posEl(0, 0);
    var rLng = new RegExp("[ -~]+");
    var rUrl = new RegExp("[\r\n	]");
    var toString = Object.prototype.toString;
    var heightBase = 85;
    var act = "sel_mou";
    var actRs = "sml";
    var actHi = "hsS";
    var actAs = "acSh";
    var actOp = "op";
    var actTm = 800;
    var opul;

    if (encodeURIComponent) {
        opul = encodeURIComponent(chrome.extension.getURL("options.html"))
    } else {
        opul = escape(chrome.extension.getURL("options.html"))
    }
    var connection = chrome.extension.connect();
    connection.postMessage({reld: "init"});
    connection.onMessage.addListener(function (info) {
        if (!info.r_al) return;
        var fav_al_prm = info.r_al + "" || "";
        var fav_al = fav_al_prm.split(",");
        act = info.r_act || "sel_mou";
        actHi = fav_al[3] || "hsS";
        actRs = fav_al[2] || "sml";
        if (actRs != "sml") {
            heightBase = 210
        } else {
            heightBase = 85
        }
        actAs = fav_al[6] || "acSh";
        actOp = fav_al[7] || "op";
        var actTmTmp = fav_al[4] || 800;
        if (act != "sel" && act != "sel_ekey" && act != "sel_mou") actTmTmp = 1500;
        if (inId == "" || actTmTmp != actTm) {
            clearInterval(inId);
            inId = setInterval(weblioObj.Interval, actTmTmp)
        }
        actTm = actTmTmp
    });
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        connection.postMessage({reld: "init"})
    });
    this.OnLoadHandler = function (e) {
        connection.postMessage({reld: "init"});
        if (inId != "") clearInterval(inId);
        inId = setInterval(weblioObj.Interval, actTm);
        reLoad()
    };
    this.KeyUpHandler = function (e) {
        dnAlt = false;
        if (act != "e_key" && act != "sel_ekey") return;
        if (actHi == "hsN" && location.href.indexOf("https://") == 0) return;
        var x = "";
        if (document.all) {
            x = window.event.keyCode
        } else {
            x = e.keyCode
        }
        if (x == "17" && act == "sel_ekey" && !isShow && shwWd.length > 0) {
            var wind = e.currentTarget.window;
            if (!wind) wind = e.currentTarget;
            if ((wind.getSelection() + "").length > 0) return;
            var url = "//api.weblio.jp/act/quote/v_1_0/e/?q=";

            if (encodeURIComponent) {
                url += encodeURIComponent(shwWd)
            } else {
                url += escape(shwWd)
            }
            url += "&type=" + (actRs == "lg" ? "elarge" : "emicro");
            if (opul) url += "&opul=" + opul;
            wBox = createBox(wBox, url, ps, e);
            isShow = true;
            shwWd = "";
            preMv.x = mv.x;
            preMv.y = mv.y
        } else if (x == "17" && act == "e_key" && !isShow) {
            fetchBox(e)
        } else if (x == "17" && act == "sel_ekey" || x == "17" && act == "e_key") {
            delBx(e)
        }
                    sendGAS(shwWd)

        
    };
    this.KeyDownHandler = function (e) {
        var x = "";
        if (document.all) {
            x = window.event.keyCode
        } else {
            x = e.keyCode
        }
        if (actOp == "op" && dnAlt && x == "87") connection.postMessage({ktp: "op"});
        if (x == "18") dnAlt = true
    };
    this.Interval = function (e) {
        if (shwWd.length == 0) connection.postMessage({reld: "init"});
        if (act != "sel" && act != "sel_ekey" && act != "sel_mou") return;
        var weblioObjFlg = localStorage["weblioObjFlg"];
        if (isDel) {
            if (weblioObjFlg && weblioObjFlg == 1) return;
            if (delCnt > 0) {
                if (act != "sel_ekey") delBx(e);
                isDel = false;
                delCnt = 0
            }
            if (preMv.x - mv.x > 5 || preMv.x - mv.x < -120 || preMv.y - mv.y > 5 || preMv.y - mv.y < -50) {
                if (act != "sel_ekey") delBx(e);
                isDel = false
            } else {
                ++delCnt
            }
        }
        if (act == "sel_ekey") {
            if (!isShow && shwWd.length == 0 && preWd.length > 0) {
                shwWd = preWd;
                preWd = ""
            }
            return
        }
        if (shwWd.length > 0 && !isShow) {
            var url = "//api.weblio.jp/act/quote/v_1_0/e/?q=";
            if (encodeURIComponent) {
                url += encodeURIComponent(shwWd)
            } else {
                url += escape(shwWd)
            }
            url += "&type=" + (actRs == "lg" ? "elarge" : "emicro");
            if (opul) url += "&opul=" + opul;
            wBox = createBox(wBox, url, ps, e);
            isShow = true;
            shwWd = "";
            preMv.x = mv.x;
            preMv.y = mv.y
        }
    };
    this.MouseMoveHandler = function (e) {
        dnAlt = false;
        if (act == "none") return;
        if (actHi == "hsN" && location.href.indexOf("https://") == 0) return;
        var wind = e.currentTarget.window;
        if (!wind) wind = e.currentTarget;
        if (mv.x && mv.x == e.pageX) return;
        ps.x = 7 + e.pageX;
        ps.y = 7 + e.pageY;
        mv.x = e.pageX;
        mv.y = e.pageY;
        if (boxDoc == e.currentTarget) {
            parentPs.x = 7 + e.pageX - e.screenX;
            parentPs.y = 7 + e.pageY - e.screenY
        }
        if (boxDoc == e.currentTarget.document) {
            parentPsIf.x = 7 + e.pageX;
            parentPsIf.y = 7 + e.pageY
        }
        currentPs.x = e.screenX;
        currentPs.y = e.screenY;
        mvDoc = null;
        var doc = fetchDc(e);
        mvDoc = doc;
        var q = wind.getSelection() + "";
        if (q.length == 0 && (act == "sel" || act == "sel_ekey" || act == "sel_mou")) catchWord(e, doc); else if (q.length > 0 && (act == "sel" || act == "sel_ekey" || act == "sel_mou") && toString.call(doc.activeElement) === "[object HTMLInputElement]") catchWord(e, doc)
    };
    this.MouseUpHandler = function (e) {
        if (typeof wBox != "undefined" && isShow) {
            var doc = fetchPt(e);
            wBox.style.display = "none";
            wBox.removeEventListener("onmouseover", mOverFlg, false);
            wBox.removeEventListener("onmouseout", mOutFlg, false);
            if (preDoc) preDoc.body.removeChild(wBox); else if (doc) doc.body.removeChild(wBox);
            preDoc = null;
            isShow = false;
            preWd = "";
            cnd = null
        }
        if (cnd != null) {
            cnd = null;
            return
        }
        if (act != "mou" && act != "sel_mou" || e.button == 2) return;
        if (actHi == "hsN" && location.href.indexOf("https://") == 0) return;
        fetchBox(e)
    };

    function fetchBox(e) {
        var wind = e.currentTarget.window;
        if (!wind) wind = e.currentTarget;
        var doc = fetchPt(e);
        if (!isShow) {
            if (typeof wBox != "undefined") {
                wBox.style.display = "none"
            }
            var q = fetchQry(e, wind.getSelection() + "", doc);
            if (q.length == 0) return;
            if (toString.call(doc.activeElement) === "[object HTMLInputElement]") return;
            var url = "//api.weblio.jp/act/quote/v_1_0/e/?q=";
            if (encodeURIComponent) {
                url += encodeURIComponent(q)
            } else {
                url += escape(q)
            }
            url += "&type=" + (actRs == "lg" ? "elarge" : "emicro");
            if (opul) url += "&opul=" + opul;
            wBox = createBox(wBox, url, ps, e);
            isShow = true;
            shwWd = ""
        }
    }

    function fetchDc(e) {
        var doc = document;
        if (e) doc = e.currentTarget.document;
        if (!doc) doc = e.currentTarget;
        if (mvDoc) doc = mvDoc;
        return doc
    }

    function fetchPt(e) {
        var doc = document;
        if (e) doc = e.currentTarget.document;
        if (!doc) doc = e.currentTarget;
        if (mvDoc) doc = mvDoc;
        if (typeof frameDoc != "undefined") {
            if (doc.width < 322 || doc.height < heightBase) {
                if (typeof boxDoc != "undefined") {
                    doc = boxDoc;
                    if (parentPs.x > 0 || parentPs.y > 0) {
                        ps.x = parentPs.x + currentPs.x;
                        ps.y = parentPs.y + currentPs.y
                    } else if (parentPsIf.x > 0 || parentPsIf.y > 0) {
                        ps.x = parentPsIf.x;
                        ps.y = parentPsIf.y
                    }
                }
            }
        }
        return doc
    }

    function fetchQry(e, q, doc) {
        q = q.replace(rUrl, "");
        q = q.replace(/^\s+/g, "");
        if (q.length == 0 || rJp(q) || rExt(q) || q.length > 4e3) return "";
        if (act != "mou" && act != "sel_mou" && act != "e_key" && q.length > 50) return "";
        if (act == "e_key") {
            return q
        }
        if (cnd == null) cnd = doc.elementFromPoint(e.clientX, e.clientY);
        if (cnd.tagName == "A" || cnd.parentNode.tagName == "A") {
            if (actAs != "acSh") {
                return ""
            }
        }
        return q
    }

    function createBox(wBox, url, ps, e) {
        var doc = fetchPt(e);
        if (typeof wBox != "undefined" && isShow) {
            wBox.style.display = "none";
            wBox.removeEventListener("onmouseover", mOverFlg, false);
            wBox.removeEventListener("onmouseout", mOutFlg, false);
            if (preDoc) preDoc.body.removeChild(wBox); else if (doc) doc.body.removeChild(wBox);
            preDoc = null;
            wBox = null;
            shwWd = ""
        }
        wBox = document.createElement("div");
        wBox.setAttribute("id", "extensionsWeblioEjBx");
        wBox.style.position = "absolute";
        wBox.style.zIndex = 2147483647;
        if (ps.x + 392 > innerWidth) {
            ps.x = innerWidth - 400
        }
        var codp = currentPs.y - 35;
        if (actRs != "sml") {
            codp = currentPs.y + 88
        }
        if (innerHeight < codp) {
            ps.y -= heightBase + 15
        }
        if (ps.x < 0) {
            ps.x = 0
        }
        if (ps.y < 0) {
            ps.y = 0
        }
        wBox.style.left = ps.x + "px";
        wBox.style.top = ps.y + "px";
        wBox.innerHTML = '<iframe src="' + url + '" name="weblioExtensionsFrame" width="380" height="' + (heightBase - 5) + '" border="0" frameborder="0" scrolling="no"></iframe>';
        wBox.onmouseover = mOverFlg;
        wBox.onmouseout = mOutFlg;
        doc.body.appendChild(wBox);
        preDoc = doc;
        return wBox
    }

    function mOverFlg() {
        localStorage["weblioObjFlg"] = 1
    }

    function mOutFlg() {
        localStorage["weblioObjFlg"] = 2
    }

    function reLoad() {
        var weblioFrmObj = document.getElementsByTagName("frame");
        var weblioIFrmObj = document.getElementsByTagName("iframe");
        if (weblioFrmObj.length > 0) reflexF(document);
        if (weblioIFrmObj.length > 0) reflexIF(document)
    }

    function reflexF(obj) {
        var frmObj = obj.getElementsByTagName("frame");
        if (typeof frmObj == "undefined" || frmObj.length == 0) return;
        for (var i = 0; i < frmObj.length; i++) {
            try {
                if (!frmObj[i]) continue;
                var fObj = frmObj[i].contentDocument;
                if (frmObj[i].contentWindow) fObj = frmObj[i].contentWindow.document;
                if (!fObj) continue;
                frameDoc = fObj;
                if (frameDoc.width >= 322 && frameDoc.height >= heightBase) {
                    boxDoc = frameDoc
                }
                fObj.addEventListener("mousemove", weblioObj.MouseMoveHandler, false);
                fObj.addEventListener("mouseup", weblioObj.MouseUpHandler, false);
                fObj.addEventListener("keyup", weblioObj.KeyUpHandler, false);
                fObj.addEventListener("keydown", weblioObj.KeyDownHandler, false);
                reflexF(fObj)
            } catch (e) {
            }
        }
    }

    function reflexIF(obj) {
        var iFrmObj = obj.getElementsByTagName("iframe");
        if (typeof iFrmObj == "undefined" || iFrmObj.length == 0) return;
        if (typeof boxDoc == "undefined") {
            boxDoc = document
        }
        for (var i = 0; i < iFrmObj.length; i++) {
            try {
                if (!iFrmObj[i]) continue;
                if (!iFrmObj[i].contentDocument) continue;
                var iFObj = iFrmObj[i].contentDocument;
                if (iFrmObj[i].contentWindow) iFObj = iFrmObj[i].contentWindow.document;
                if (!iFObj) continue;
                frameDoc = iFrmObj[i];
                iFObj.addEventListener("mousemove", weblioObj.MouseMoveHandler, false);
                iFObj.addEventListener("mouseup", weblioObj.MouseUpHandler, false);
                iFObj.addEventListener("keyup", weblioObj.KeyUpHandler, false);
                iFObj.addEventListener("keydown", weblioObj.KeyDownHandler, false);
                reflexIF(iFObj)
            } catch (e) {
            }
        }
    }

    function rJp(str) {
        var jObj = str.replace(rLng, "");
        for (var i = 0; i < jObj.length; ++i) {
            var cd = jObj.charCodeAt(i);
            if (cd > 1169 && cd < 8208) {
                return true
            }
            if (cd > 12343) {
                return true
            }
        }
        return false
    }

    function rExtJp(str) {
        for (var i = 0; i < str.length; ++i) {
            var cd = str.charCodeAt(i);
            if (cd < 64) {
                return true
            }
            if (cd > 126 && cd < 191) {
                return true
            }
            if (cd > 511 && cd < 901) {
                return true
            }
            if (cd > 8208) {
                return true
            }
        }
        return false
    }

    function rExt(str) {
        if (str.indexOf("@") > 0) return true;
        if (str.indexOf("://") > 0) return true;
        return false
    }

    function delBx(e) {
        if (act != "sel" && act != "sel_ekey" && act != "sel_mou" && act != "e_key") return;
        var doc = fetchPt(e);
        if (typeof wBox != "undefined" && isShow) {
            wBox.style.display = "none";
            wBox.removeEventListener("onmouseover", mOverFlg, false);
            wBox.removeEventListener("onmouseout", mOutFlg, false);
            if (preDoc) preDoc.body.removeChild(wBox); else if (doc) doc.body.removeChild(wBox);
            preDoc = null;
            isShow = false
        }
    }

    function del() {
        if (act != "sel" && act != "sel_ekey" && act != "sel_mou") return;
        if (typeof wBox != "undefined" && isShow) isDel = true;
        preWd = "";
        shwWd = ""
    }

    function catchWord(e, doc) {
        if (doc.caretRangeFromPoint) {
            var word = "";
            var range = doc.caretRangeFromPoint(e.clientX, e.clientY);
            var node = range.startContainer;
            var onmousetext = node.textContent;
            var mouseoffset = range.startOffset;
            var pnd = node.parentNode;
            if (pnd.tagName == "A" || pnd.parentNode.tagName == "A") {
                if (actAs != "acSh") {
                    del();
                    return
                }
            }
            if (node.nodeType == 3 && node.parentNode == doc.elementFromPoint(e.clientX, e.clientY)) {
                if (!onmousetext[mouseoffset] || onmousetext[mouseoffset].search(/[\s,.:!"]/) != -1 || rExtJp(onmousetext[mouseoffset])) {
                    del();
                    return
                }
                if (mouseoffset < onmousetext.length) {
                    for (var stOffs = mouseoffset; stOffs > 0; --stOffs) {
                        if (onmousetext[stOffs - 1].search(/[\s,.:!"]/) != -1 || rExtJp(onmousetext[stOffs - 1])) break
                    }
                    for (var enOffs = mouseoffset; enOffs < onmousetext.length - 1; ++enOffs) {
                        if (onmousetext[enOffs + 1].search(/[\s,.:!"]/) != -1 || rExtJp(onmousetext[enOffs + 1])) break
                    }
                    for (var i = stOffs; i <= enOffs; ++i) word += onmousetext[i]
                }
                if (word.length > 0 && (preWd != word || act == "sel_ekey")) {
                    isDel = true;
                    var q = fetchQry(e, word, doc);
                    if (q.length == 0) return;
                    shwWd = q;
                    preWd = word;
                    word = ""
                }
            } else {
                del()
            }
        }
    }
}

localStorage["weblioObjFlg"] = 0;
var weblioObj = new WeblioExtensions;
window.addEventListener("load", weblioObj.OnLoadHandler, true);
window.addEventListener("mousemove", weblioObj.MouseMoveHandler, true);
window.addEventListener("mouseup", weblioObj.MouseUpHandler, true);
window.addEventListener("keyup", weblioObj.KeyUpHandler, true);
window.addEventListener("keydown", weblioObj.KeyDownHandler, true);
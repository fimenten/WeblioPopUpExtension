var onloadTime = (new Date).getTime();
onLoadHandler = function (e) {
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    var rdATm = document.chFormTm.act;
    if (!rdAct || !rdActPr || !rdATm) return;
    var fav_al = (localStorage["fav_al"] + "").split(",");
    var fav_act_pr = fav_al[0] || "";
    var fav_act = fav_al[1] || "";
    var fav_act_tm = fav_al[4] || "";
    if (!fav_act_pr) rdActPr[0].checked = true;
    if (!fav_act) rdAct[3].checked = true;
    if (!fav_act_tm) rdATm[1].checked = true;
    if (fav_act_pr == "none") {
        rdActPr[1].checked = true
    } else {
        rdActPr[0].checked = true
    }
    for (var i = 0; i < rdAct.length; ++i) {
        if (rdAct[i].value == fav_act) {
            rdAct[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdATm.length; ++i) {
        if (rdATm[i].value == fav_act_tm) {
            rdATm[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdActPr.length; ++i) {
        rdActPr[i].addEventListener("click", ch_options, false)
    }
    var fObj = document.fh;
    if (fObj) fObj.query.focus();
    ch_options();
    document.getElementById("searchForm").addEventListener("submit", searchKeyword, false);
    document.getElementById("pUpStatus").addEventListener("click", update_status, false);
    document.getElementById("pClStatus").addEventListener("click", cancel_status, false);
    document.getElementById("pUpOpts").addEventListener("click", move_options, false);
    chrome.runtime.getPlatformInfo(function (info) {
        if (info.os === "mac") {
            setTimeout(function () {
                var width = document.body.clientWidth + 1;
                document.body.style.width = width.toString() + "px"
            }, 200)
        }
    })
};

function searchKeyword(event) {
    event.preventDefault();
    var target = event.target["searchKeyword"] || {value: ""};
    var keyword = target.value || "";
    if (keyword === "") {
        return
    }
    rdtxt({selectionText: keyword}, {})
}

function ch_options() {
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    var rdATm = document.chFormTm.act;
    if (!rdAct || !rdActPr || !rdATm) return;
    var swFlg = rdActPr[0].checked;
    for (var i = 0; i < rdAct.length; ++i) {
        if (!swFlg) rdAct[i].disabled = true; else rdAct[i].disabled = false
    }
    for (var i = 0; i < rdATm.length; ++i) {
        if (!swFlg) rdATm[i].disabled = true; else rdATm[i].disabled = false
    }
}

function update_status() {
    var fav_al = (localStorage["fav_al"] + "").split(",");
    var actPr = fav_al[0] || "";
    var act = fav_al[1] || "";
    var actRs = fav_al[2] || "";
    var actHi = fav_al[3] || "";
    var actTm = fav_al[4] || "";
    var actCt = fav_al[5] || "";
    var actAs = fav_al[6] || "";
    var actOp = fav_al[7] || "";
    var actTr = fav_al[8] || "";
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    var rdATm = document.chFormTm.act;
    if (!rdAct || !rdActPr || !rdATm) return;
    if (rdActPr && rdActPr[1].checked) {
        actPr = "none";
        chrome.browserAction.setIcon({path: "icon16_off.png"})
    } else {
        actPr = "on";
        chrome.browserAction.setIcon({path: "icon16.png"})
    }
    for (var i = 0; i < rdAct.length; ++i) {
        if (rdAct[i].checked) {
            act = rdAct[i].value;
            break
        }
    }
    for (var i = 0; i < rdATm.length; ++i) {
        if (rdATm[i].checked) {
            actTm = rdATm[i].value;
            break
        }
    }
    localStorage["fav_al"] = actPr + "," + act + "," + actRs + "," + actHi + "," + actTm + "," + actCt + "," + actAs + "," + actOp + "," + actTr;
    var wBox = document.createElement("p");
    var statusHd = document.getElementById("statusHd");
    if (statusHd) {
        wBox.innerHTML = "保存しています...";
        setTimeout(function () {
            if (wBox) statusHd.removeChild(wBox);
            window.close()
        }, 750)
    }
    statusHd.appendChild(wBox)
}

function cancel_status() {
    window.close()
}

function move_options() {
    window.open(chrome.extension.getURL("options.html"))
}

function trans_post() {
    var tsForm = document.forms["translate"];
    if (!tsForm) return false;
    if (tsForm.originalText.value.length > 4e3) {
        alert("入力できる文字数は4000文字までです");
        return false
    }
    if (onloadTime) {
        tsForm.tm.value = (new Date).getTime() - onloadTime
    }
    if (_gaq) _gaq.push(["_trackEvent", "click", "text_area"]);
    tsForm.submit()
}

window.addEventListener("load", onLoadHandler, true);
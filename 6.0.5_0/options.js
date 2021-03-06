function save_options() {
    var actPr;
    var act;
    var actRs;
    var actHi;
    var actTm;
    var actCt;
    var actAs;
    var actOp;
    var actTr;
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    var rdARs = document.chFormRs.act;
    var rdAHi = document.chFormHi.act;
    var rdATm = document.chFormTm.act;
    var rdActCt = document.chFormCt.act;
    var rdActAs = document.chFormAs.act;
    var rdActOp = document.chFormOp.act;
    var rdActTr = document.chFormTr.act;
    if (rdActPr && rdActPr[1].checked) {
        actPr = "none"
    } else {
        actPr = ""
    }
    for (var i = 0; i < rdAct.length; ++i) {
        if (rdAct[i].checked) {
            act = rdAct[i].value;
            break
        }
    }
    for (var i = 0; i < rdARs.length; ++i) {
        if (rdARs[i].checked) {
            actRs = rdARs[i].value;
            break
        }
    }
    for (var i = 0; i < rdAHi.length; ++i) {
        if (rdAHi[i].checked) {
            actHi = rdAHi[i].value;
            break
        }
    }
    for (var i = 0; i < rdATm.length; ++i) {
        if (rdATm[i].checked) {
            actTm = rdATm[i].value;
            break
        }
    }
    for (var i = 0; i < rdActCt.length; ++i) {
        if (rdActCt[i].checked) {
            actCt = rdActCt[i].value;
            break
        }
    }
    for (var i = 0; i < rdActAs.length; ++i) {
        if (rdActAs[i].checked) {
            actAs = rdActAs[i].value;
            break
        }
    }
    for (var i = 0; i < rdActOp.length; ++i) {
        if (rdActOp[i].checked) {
            actOp = rdActOp[i].value;
            break
        }
    }
    for (var i = 0; i < rdActTr.length; ++i) {
        if (rdActTr[i].checked) {
            actTr = rdActTr[i].value;
            break
        }
    }
    localStorage["fav_al"] = actPr + "," + act + "," + actRs + "," + actHi + "," + actTm + "," + actCt + "," + actAs + "," + actOp + "," + actTr;
    var status = document.getElementById("status");
    var statusHd = document.getElementById("statusHd");
    if (status && statusHd) {
        status.innerHTML = "保存しています...";
        statusHd.innerHTML = "保存しています...";
        setTimeout(function () {
            status.innerHTML = "";
            statusHd.innerHTML = ""
        }, 750)
    }
}

function restore_options() {
    var fav_al = (localStorage["fav_al"] + "").split(",");
    var fav_act_pr = fav_al[0] || "";
    var fav_act = fav_al[1] || "";
    var fav_act_rs = fav_al[2] || "";
    var fav_act_hi = fav_al[3] || "";
    var fav_act_tm = fav_al[4] || "";
    var fav_act_ct = fav_al[5] || "";
    var fav_act_as = fav_al[6] || "";
    var fav_act_op = fav_al[7] || "";
    var fav_act_tr = fav_al[8] || "";
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    var rdARs = document.chFormRs.act;
    var rdAHi = document.chFormHi.act;
    var rdATm = document.chFormTm.act;
    var rdActCt = document.chFormCt.act;
    var rdActAs = document.chFormAs.act;
    var rdActOp = document.chFormOp.act;
    var rdActTr = document.chFormTr.act;
    if (!fav_act_pr) rdActPr[0].checked = true;
    if (!fav_act) rdAct[3].checked = true;
    if (!fav_act_rs) rdARs[0].checked = true;
    if (!fav_act_hi) rdAHi[1].checked = true;
    if (!fav_act_tm) rdATm[1].checked = true;
    if (!fav_act_ct) rdActCt[0].checked = true;
    if (!fav_act_as) rdActAs[0].checked = true;
    if (!fav_act_op) rdActOp[0].checked = true;
    if (!fav_act_tr) rdActTr[0].checked = true;
    if (fav_act_pr == "none") {
        rdActPr[1].checked = true;
        for (var i = 0; i < rdAct.length; ++i) {
            rdAct[i].disabled = true
        }
    } else {
        rdActPr[0].checked = true
    }
    for (var i = 0; i < rdAct.length; ++i) {
        if (rdAct[i].value == fav_act) {
            rdAct[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdARs.length; ++i) {
        if (rdARs[i].value == fav_act_rs) {
            rdARs[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdAHi.length; ++i) {
        if (rdAHi[i].value == fav_act_hi) {
            rdAHi[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdATm.length; ++i) {
        if (rdATm[i].value == fav_act_tm) {
            rdATm[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdActCt.length; ++i) {
        if (rdActCt[i].value == fav_act_ct) {
            rdActCt[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdActAs.length; ++i) {
        if (rdActAs[i].value == fav_act_as) {
            rdActAs[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdActOp.length; ++i) {
        if (rdActOp[i].value == fav_act_op) {
            rdActOp[i].checked = true;
            break
        }
    }
    for (var i = 0; i < rdActTr.length; ++i) {
        if (rdActTr[i].value == fav_act_tr) {
            rdActTr[i].checked = true;
            break
        }
    }
    ch_options();
    ch_as_options()
}

function ch_options() {
    var rdActPr = document.chFormPr.act;
    var rdAct = document.chForm.act;
    if (!rdAct || !rdActPr) return;
    var swFlg = rdActPr[0].checked;
    for (var i = 0; i < rdAct.length; ++i) {
        if (!swFlg) rdAct[i].disabled = true; else rdAct[i].disabled = false
    }
}

function ch_as_options() {
    var rdAct = document.chForm.act;
    var rdActAs = document.chFormAs.act;
    if (!rdAct || !rdActAs) return;
    var swFlg = rdAct.length > 2 ? rdAct[2].checked || rdAct[4].checked : false;
    for (var i = 0; i < rdActAs.length; ++i) {
        if (swFlg) rdActAs[i].disabled = true; else rdActAs[i].disabled = false
    }
}

var rdActPr = document.chFormPr.act;
if (rdActPr) {
    for (var i = 0; i < rdActPr.length; ++i) {
        rdActPr[i].addEventListener("click", ch_options, false)
    }
}
var rdAct = document.chForm.act;
if (rdAct) {
    for (var i = 0; i < rdAct.length; ++i) {
        rdAct[i].addEventListener("click", ch_as_options, false)
    }
}

function ch_tab_pp() {
    document.getElementById("tabPp").style.display = "block";
    document.getElementById("tabSw").style.display = "none";
    document.getElementById("tabOt").style.display = "none"
}

function ch_tab_sw() {
    document.getElementById("tabPp").style.display = "none";
    document.getElementById("tabSw").style.display = "block";
    document.getElementById("tabOt").style.display = "none"
}

function ch_tab_ot() {
    document.getElementById("tabPp").style.display = "none";
    document.getElementById("tabSw").style.display = "none";
    document.getElementById("tabOt").style.display = "block"
}

window.addEventListener("load", restore_options, false);
document.getElementById("opBtnHd").addEventListener("click", save_options, false);
document.getElementById("opBtnCnclHd").addEventListener("click", restore_options, false);
document.getElementById("opBtn").addEventListener("click", save_options, false);
document.getElementById("opBtnCncl").addEventListener("click", restore_options, false);
for (var i = 0; i < 3; ++i) {
    document.getElementById("tabPp" + i).addEventListener("click", ch_tab_pp, false);
    document.getElementById("tabSw" + i).addEventListener("click", ch_tab_sw, false);
    document.getElementById("tabOt" + i).addEventListener("click", ch_tab_ot, false)
}
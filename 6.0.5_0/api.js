function rdtxt(info, tab) {
    var properties = {};
    var q = fetchQry(info.selectionText) || "";
    if (q.length > 0 && q.length < 100) {
        properties["url"] = "http://ejje.weblio.jp/content/" + encodeURL(q).replace(/%2f/g, "/");
        if (chrome.tabs) {
            chrome.tabs.create(properties)
        } else {
            window.open(properties["url"])
        }
    }
}

function rdTrtxt(info, tab) {
    var onloadTime = (new Date).getTime();
    var properties = {};
    var q = fetchQry(info.selectionText) || "";
    var inputTime = "";
    if (onloadTime) {
        inputTime = (new Date).getTime() - onloadTime
    }
    if (_gaq) _gaq.push(["_trackEvent", "click", "context_menu"]);
    if (q.length > 0 && q.length < 2e3) {
        properties["url"] = "http://translate.weblio.jp/?originalText=" + encodeURL(q).replace(/%2f/g, "/") + "&lp=EJ&tm=" + inputTime;
        chrome.tabs.create(properties)
    }
}

function fetchQry(q) {
    var rUrl = new RegExp("[\r\n	]");
    q = q.replace(rUrl, "");
    q = q.replace(/^\s+/g, "");
    if (q.length == 0 || q.length > 1e3) return "";
    return q
}

function escapeQry(q) {
    q = q.replace(/\r?\n/g, "");
    q = q.replace(/\\/g, "\\\\");
    q = q.replace(/"/g, '\\"');
    q = q.replace(/'/g, "\\'");
    q = q.replace(/</g, "\\x3c");
    q = q.replace(/>/g, "\\x3e");
    return q
}

function encodeURL(q) {
    var c = "";
    var uc = "";
    var s = "";
    for (var i = 0; i < q.length; i++) {
        c = q.charAt(i);
        uc = q.charCodeAt(i);
        if (uc == 42 || uc == 45 || uc == 46 || uc == 95 || uc >= 48 && uc <= 57 || uc >= 65 && uc <= 90 || uc >= 97 && uc <= 122) {
            s += c
        } else {
            if (uc == 32) {
                s += "+"
            } else if (uc >= 0 && uc <= 127) {
                c = "0" + uc.toString(16);
                s += "%" + c.substr(c.length - 2)
            } else if (uc > 2097151) {
                s += "%" + (240 + ((uc & 1835008) >> 18)).toString(16);
                s += "%" + (128 + ((uc & 258048) >> 12)).toString(16);
                s += "%" + (128 + ((uc & 4032) >> 6)).toString(16);
                s += "%" + (128 + (uc & 63)).toString(16)
            } else if (uc > 2047) {
                s += "%" + (224 + ((uc & 61440) >> 12)).toString(16);
                s += "%" + (128 + ((uc & 4032) >> 6)).toString(16);
                s += "%" + (128 + (uc & 63)).toString(16)
            } else {
                s += "%" + (192 + ((uc & 1984) >> 6)).toString(16);
                s += "%" + (128 + (uc & 63)).toString(16)
            }
        }
    }
    return s
}
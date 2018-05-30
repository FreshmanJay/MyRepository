/**
 * Created by Jay-wang on 2018/5/30.
 */
/*1.原生Ajax请求的封装*/
ajax({
    url: "./TestXHR.aspx",              //请求地址
    type: "POST",                       //请求方式
    data: { name: "super", age: 20 },        //请求参数
    dataType: "json",
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
});

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}

/*2.原生JS的JSONP请求封装*/
function jsonp(options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    var params = formatParams(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({ message: "超时" });
        }, time);
    }
};

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&');
}

/*3.移动滚动条 IE 5.5+ */
function ready(readyFn) {
    //非IE浏览器
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            readyFn && readyFn();
        }, false);
    } else {
        //方案1和2  哪个快用哪一个
        var bReady = false;
        //方案1
        document.attachEvent('onreadystatechange', function () {
            if (bReady) {
                return;
            }
            if (document.readyState == 'complete' || document.readyState == "interactive") {
                bReady = true;
                readyFn && readyFn();
            };
        });

        //方案2
        //jquery也会担心doScroll会在iframe内失效，此处是判断当前页是否被放在了iframe里
        if (!window.frameElement) {
            setTimeout(checkDoScroll, 1);
        }
        function checkDoScroll() {
            try {
                document.documentElement.doScroll("left");
                if (bReady) {
                    return;
                }
                bReady = true;
                readyFn && readyFn();
            }
            catch (e) {
                // 不断检查 doScroll 是否可用 - DOM结构是否加载完成
                setTimeout(checkDoScroll, 1);
            }
        };
    }
};

/*4.下面附多一个在stackoverflow的高分回答结合上面的代码，给出get和post的两种不同请求方法：*/
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, method, data, success,fail,async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            var status = x.status;
            if (status >= 200 && status < 300) {
                success && success(x.responseText,x.responseXML)
            } else {
                fail && fail(status);
            }

        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), 'GET', null, success, fail, async)
};

ajax.post = function (url, data, callback, fail, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url,'POST', query.join('&'), success, fail, async)
};

使用方法：GET

ajax.get('/test.php', {foo: 'bar'}, function(response,xml) {
        //success
    },
    function(status){
        //fail
    });

POST

ajax.post('/test.php', {foo: 'bar'}, function(response,xml) {
    //succcess

    },function(status){
    //fail

});

;!function () {
  window.baseController = {
    init: function () {
      this.mounted(this).handleBind(this);
    },
    getData: function (url, type, param, callback, loading) {
      var index;
      
      if (loading == false) {
        index = null;
      } else {
        index = layer.load(1);
      }
      
      
      var params = $.extend({}, param);
      
      $.ajax({
        type: type,
        url: "/" + url,
        data: params,
        dataType: dataTypeXpx,
        xhrFields: {withCredentials: true},
        success: function (data) {
          typeof callback == 'function' && callback(data);
          layer.close(index);
          return false;
        },
        error: function () {
          layer.close(index);
          layer.msg('网络出现问题，请重试！');
          return false;
        }
      });
    },
    mounted: function (opt) {
      
      
      return this;
    },
    handleBind: function (opt) {
      return this;
    },
  }, $(function () {
    baseController.init();
  })
}();

(function (window) {
  Util = {
    /**
     * 设置cookie
     * @param name
     * @param value
     * @param time
     * @param domain
     * @returns {boolean}
     */
    setCookie: function (name, value, time, domain) {
      domain = domain ? ";domain=" + domain : "";
      var Days = time;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/" + domain;
      return true;
    },
    /**
     * 获取cookie
     * @param name
     * @returns {*}
     */
    getCookie: function (name) {
      var strCookie = document.cookie;
      var arrCookie = strCookie.split("; ");
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (name == arr[0]) {
          return arr[1];
        }
      }
      return "";
    },
    /**
     * 删除cookie
     * @param name
     */
    delCookie: function (name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    /**
     * 获取参数
     * @param value
     * @returns {*}
     */
    getRequest: function (value) {
      if (window.location.pathname == "/s/") {
        var url = unescape(location.search);
      } else {
        var url = decodeURI(location.search);
      }
      var object = {};
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          object[strs[i].split("=")[0]] = strs[i].split("=")[1]
        }
      }
      return object[value];
    }
  };
  if (typeof define === "function" && define.amd) {
    return Util;
  } else {
    window.Util = Util;
  }
})(window);




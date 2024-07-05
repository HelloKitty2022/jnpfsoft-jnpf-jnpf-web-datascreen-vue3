import { validatenull } from '@/echart/util'
export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
export const createFile = () => {
  return {
    title: "文件夹",
    name: "文件夹",
    index: uuid(),
    menu: true,
    display: false,
    lock: false,
    children: []
  }
}
export const compare = (propertyName) => {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  }
}

export const funEval = (value) => {
  return new Function("return " + value + ";")();
}


export const getFunction = (fun, def) => {
  if (!validatenull(fun)) {
    try {
      return funEval(fun)
    } catch {
      return () => { }
    }
  } else if (def) return () => { }
}
export const getJson = (str) => {
  if (validatenull(str)) return {};
  else if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch {
      return {}
    }
  } else {
    return str;
  }
}
export const checkUrl = (url) => {
  var reg = /http(s)?:\/\/([\w-.]+)+(:[0-9]+)?.*$/;
  if (!reg.test(url)) {
    return false;
  }
  else {
    return true
  }
}
export const loadScript = (type = 'js', url, dom = "body") => {
  let flag = false;
  return new Promise((resolve) => {
    const head = dom == 'head' ? document.getElementsByTagName('head')[0] : document.body;
    for (let i = 0; i < head.children.length; i++) {
      let ele = head.children[i]
      if ((ele.src || '').indexOf(url) !== -1) {
        flag = true;
        resolve();
      }
    }
    if (flag) return;
    let script;
    if (type === 'js') {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
    } else if (type === 'css') {
      script = document.createElement('link');
      script.rel = 'stylesheet';
      script.type = 'text/css';
      script.href = url;
    }
    head.appendChild(script);
    script.onload = function () {
      resolve();
    };
  });
};

export const dataURLtoFile = (base64, filename) => {
  var arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const getUrlParam = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}
export const computedUrl = (baseUri, imgUri, staticUri = '/DataV') => {
  if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(imgUri)) {
    return imgUri;
  }
  if (/^(data)\S*/.test(imgUri)) {
    return imgUri;
  }
  if (/^\/(DataV)\S*/.test(imgUri)) {
    return imgUri;
  }
  if (/^\/(img)\S*/.test(imgUri)) {
    return staticUri + imgUri;
  }
  if (/^\/(api)\S*/.test(imgUri)) {
    return baseUri + imgUri;
  }
  if (/^\/(dev)\S*/.test(imgUri)) {
    return imgUri;
  }
  return imgUri;
}
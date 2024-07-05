/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen () {
    callback()
  }
  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
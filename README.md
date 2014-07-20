# jquery-mousewheel [![spm version](http://spmjs.io/badge/jquery-mousewheel)](http://spmjs.io/package/jquery-mousewheel)

AUTHOR WEBSITE: [http://ydr.me/](http://ydr.me/)

jquery.fn.mousewheel 鼠标滚动事件

**五星提示：当前脚本未作优化、未完工，请勿用在生产环境**

__IT IS [A SPM PACKAGE](http://spmjs.io/package/jquery-mousewheel).__




#USAGE
```
var $ = require('jquery');
require('jquery-mousewheel')($);

$("#demo").mousewheel(settings);
```



#OPTIONS
```
$.fn.mousewheel.defaults = {
    // 延时监听滚动停止事件的时间（单位毫秒）
    timeout: 456,
    // 是否阻止默认事件，默认true
    isPreventDefault: !0,
    // 开始滚动回调
    // this：element
    onmousewheelstart: $.noop,
    // 正在滚动回调
    // this：element
    // 参数1：滚动的方向，1：上，-1：下
    onmousewheel: $.noop,
    // 滚动停止回调
    // this：element
    onmousewheelend: $.noop
};
```

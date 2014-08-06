/*!
 * jquery.fn.mousewheel
 * @author ydr.me
 * @version 1.2
 * 2014年7月3日17:09:46
 */







module.exports = function($){
    'use strict';

    var udf,
        datakey = 'jquery-mousewheel',
        eventType = 'wheel mousewheel DOMMouseScroll MozMousePixelScroll',
        defaults = {
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

    $.fn.mousewheel = function(settings) {
        if ($.isFunction(settings)) settings = {
            onmousewheel: settings
        };

        // 当前第1个参数为字符串
        var run = $.type(settings) === 'string',
            // 获取运行方法时的其他参数
            args = [].slice.call(arguments, 1),
            // 复制默认配置
            options = $.extend({}, defaults),
            // 运行实例化方法的元素
            $element,
            // 实例化对象
            instance;

        // 运行实例化方法，第1个字符不能是“_”
        // 下划线开始的方法皆为私有方法
        if (run && run[0] !== '_') {
            if(!this.length) return;
            
            // 只取集合中的第1个元素
            $element = $(this[0]);

            // 获取保存的实例化对象
            instance = $element.data(datakey);

            // 若未保存实例化对象，则先保存实例化对象
            if (!instance) $element.data(datakey, instance = new Constructor($element[0], options)._init());

            // 防止与静态方法重合，只运行原型上的方法
            // 返回原型方法结果，否则返回undefined
            return Constructor.prototype[settings] ? Constructor.prototype[settings].apply(instance, args) : udf;
        }
        // instantiation options
        else if (!run) {
            // 合并参数
            options = $.extend(options, settings);
        }

        return this.each(function() {
            var element = this,
                instance = $(element).data(datakey);

            // 如果没有保存实例
            if (!instance) {
                // 保存实例
                $(element).data(datakey, instance = new Constructor(element, options)._init());
            }
        });
    };


    function Constructor(element, options) {
        var that = this;
        that.$element = $(element);
        that.options = options;
        that.wheelLength = 0;
    }

    Constructor.prototype = {
        /**
         * 初始化
         * @return this
         * @version 1.0
         * 2014年7月3日17:58:35
         */
        _init: function() {
            var that = this,
                $element = that.$element,
                element = $element[0],
                options = that.options;

            $element.bind(eventType, function(e) {
                e = e.originalEvent || e;

                var wheelDeltaY = 0;

                // chrome
                if ('wheelDeltaY' in e) {
                    wheelDeltaY = e.wheelDeltaY > 0 ? 1 : -1;
                }
                // ie9/firefox
                else if ('deltaY' in e) {
                    wheelDeltaY = e.deltaY > 0 ? -1 : 1;
                }
                // ie8/ie7/ie6
                else if ('wheelDelta' in e) {
                    wheelDeltaY = e.wheelDelta > 0 ? 1 : -1;
                }


                if (wheelDeltaY) {
                    that._reset();

                    that.wheelLength += wheelDeltaY;
                    that.timeid = setTimeout(function() {
                        options.onmousewheelend.call(element, that.wheelLength);
                        that.wheelLength = 0;
                        that.is = !1;
                    }, options.timeout);

                    if (!that.is) {
                        that.is = !0;
                        options.onmousewheelstart.call(element);
                    }

                    options.onmousewheel.call(element, wheelDeltaY);
                }

                if (options.isPreventDefault) e.preventDefault();
            });

            return that;
        },

        /**
         * 重置延迟
         * @return undefined
         * @version 1.0
         * 2014年7月3日17:58:54
         */
        _reset: function() {
            var that = this;
            if (that.timeid) clearTimeout(that.timeid);
            that.timeid = 0;
        },



        /**
         * 是否阻止默认事件
         * @param  {Boolean} isPreventDefault 是否，布尔值
         * @return undefined
         * @version 1.0
         * 2014年7月3日18:00:50
         */
        preventDefault: function(isPreventDefault) {
            this.options.isPreventDefault = !! isPreventDefault;
        },


        /**
         * 设置或获取选项
         * @param  {String/Object} key 键或键值对
         * @param  {*}             val 值
         * @return 获取时返回键值，否则返回this
         * @version 1.0
         * 2014年7月3日20:08:16
         */
        options: function(key, val) {
            // get
            if ($.type(key) === 'string' && val === udf) return this.options[key];

            var map = {};
            if ($.type(key) === 'object') map = key;
            else map[key] = val;

            this.options = $.extend(this.options, map);
        }
    };
};

;(function ($) {
    $.fn.extend({
        alterBgColor:function (options) {
            options = $.extend({
                odd:"odd",
                even:"even",
                selected:"selected"
            },options);//options为传递的参数
            $("tbody>tr:odd",this).addClass(options.odd);
            $("tbody>tr:even",this).addClass(options.even);
            $("tbody>tr",this).click(function () {
                //判断当前是否被选中
                var hasSelected = $(this).hasClass(options.selected);
                //如果选中就移除，如果没有就加上
                $(this)[hasSelected?"removeClass":"addClass"](options.selected)
                    //查找内部的checkbox，设置对应的属性
                    .find(":checkbox").attr('checked',!hasSelected);
            });
            //如果单选框默认是这样选择的，则高色
            $("tbody>tr:has(:checked)",this).addClass(options.selected);
            return this//返回this 使方法可链
        }
    });
})(jQuery);
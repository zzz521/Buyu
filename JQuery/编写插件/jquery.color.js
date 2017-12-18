;(function ($) {
    $.fn.extend({
        "color":function (value) {
            //这里写插件代码
            if(value == undefined){
                return this.css("color");
            }else{
                return this.css("color",value);
            }
        },
        "border":function () {
            //编写多个插件可以这样写
        }

    });

})(jQuery);
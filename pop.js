 (function () {
     var key = 0;
     $.extend({
         pop: function (opt) {
             function Pop() {
                 var opts = opt || {};
                 this.init(opts);
             }
             Pop.prototype.init = function (opts) {
                 // 初始化数据
                 var defaultOption = this.defaultOptions();
                 this.opts = $.extend({}, defaultOption, opts);
                 this.direction();
             };
             Pop.prototype.defaultOptions = function () {
                 var defaultOptions = {
                     titles: 'title!',
                     contents: 'You have many options to position and animate your jBoxes!',
                     position: 'topright', // topright|lowerleft|lowerright|none
                     colors: 'black' // green|blue|red|yellow|black
                 }
                 return defaultOptions;
             };
             // 弹窗出现的位置
             Pop.prototype.direction = function () {
                 var _this = this;
                 _this.opts.position === "topright" ? _this.topright() : _this.opts.position === "lowerleft" ? _this.lowerleft() : _this.lowerright();

             };
             Pop.prototype.topright = function () {
                 $.each($(".animation"), function (index, el) {
                     var h = $(el).height() + $(el).offset().top + 10;
                     $(el).animate({
                         'top': h,
                     }, 100);

                 });
                 this.creatHtml('animation');
                 if ($(".animation").length) {
                     this.close("animation");
                 }
             };
             Pop.prototype.lowerleft = function () {
                 $.each($(".animationleft"), function (index, el) {
                     var h = $(window).innerHeight() - $(el).offset().top + 20 + 'px';
                     $(el).animate({
                         'bottom': h,
                     }, 300);

                 });
                 this.creatHtml('animationleft jBox-NoticeBorder');
                 if ($(".animationleft").length) {
                     this.close("animationleft");
                 }
             };
             Pop.prototype.lowerright = function () {
                 this.creatHtml('animationright');
                 if ($(".animationright").length) {
                     this.close("animationright");
                 }

             };
             Pop.prototype.creatHtml = function (pos) {
                 var _this = this;
                 this.tpl = '<div id = "jBoxI' + key + '"class ="' + pos + ' jBox-wrapper jBox-Notice  jBox-Notice-color jBox-Notice-' + this.opts.colors + '"style = "z-index:' + key + '" >';
                 this.tpl += '<div class ="jBox-container" >';
                 this.tpl += '<div class ="jBox-title"><div>' + this.opts.titles + '</div></div>';
                 this.tpl += '<div class = "jBox-content"style = "width: auto; height: auto;"> ' + this.opts.contents + key + ' </div></div></div>';
                 $("body").prepend($(_this.tpl));
                 key++;
             };
             // 关闭弹窗
             Pop.prototype.close = function (name) {
                 $.each($("." + name), function (index, el) {
                     setTimeout(function () {
                         $(el).addClass(name + '-close')
                     }, 3000);
                 });
             };

             return new Pop();
         }
     });
 }());
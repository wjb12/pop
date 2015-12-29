 var key = 0;
 (function () {
     $.extend({
         pop: function (opt) {
             function Pop() {
                 var opts = opt || {};
                 this.init(opts);
             }
             Pop.prototype.init = function (opts) {
                 // 初始化数据
                 var defaultOption = this.defaultOptions();
                 this.titles = opts.titles || defaultOption.titles;
                 this.contents = opts.contents || defaultOption.contents;
                 this.position = opts.position || defaultOption.position;
                 this.colors = opts.colors || defaultOption.colors;
                 this.direction();
             };
             Pop.prototype.defaultOptions = function () {
                 var o = {
                     titles: 'title!',
                     contents: 'You have many options to position and animate your jBoxes!',
                     position: 'topright', // topright|lowerleft|lowerright|none
                     colors: '' // green|blue|red|yellow|black
                 }
                 return o;
             };
             // 打开弹窗
             Pop.prototype.open = function () {
                 var _this = this;
                 key++;
                 $("body").prepend($(_this.tpl));
             };
             // 弹窗出现的位置
             Pop.prototype.direction = function () {
                 var _this = this;
                 _this.position === "topright" ? _this.topright() : _this.position === "lowerleft" ? _this.lowerleft() : _this.lowerright();

             };
             Pop.prototype.topright = function () {
                 $.each($(".animation"), function (index, el) {
                     var h = $(el).height() + $(el).offset().top + 10;
                     $(el).animate({
                         'top': h,
                     }, 100);

                 });
                 this.tpl = '<div id="jBoxI' + key + '"class="jBox-wrapper animation jBox-Notice jBox-Default jBox-Notice-color jBox-Notice-' + this.colors + '"style="right:0;"><div class ="jBox-container"><div class="jBox-content">' + this.contents + key + '</div></div></div>';
                 this.open();
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
                 this.tpl = '<div id = "jBoxI' + key + '"class ="Box-wrapper animationleft jBox-Notice jBox-NoticeBorder jBox-hasTitle jBox-Notice-color jBox-Notice-' + this.colors + '"style="left: 20px;bottom: 20px;display: block; opacity: 1;"" ><div class ="jBox-container" ><div class ="jBox-title"><div>' + this.titles + '</div></div><div class = "jBox-content"style = "width: auto; height: auto;"> ' + this.contents + key + ' </div></div> </div>';
                 this.open();
                 if ($(".animationleft").length) {
                     this.close("animationleft");
                 }
             };
             Pop.prototype.lowerright = function () {
                 this.tpl = '<div id = "jBoxI' + key + '"class ="jBox-wrapper animationright jBox-Notice jBox-Default jBox-Notice-color jBox-Notice-' + this.colors + '"style = "right: 20px; bottom: 20px; display: block; opacity: 1;z-index:' + key + '" ><div class ="jBox-container" ><div class ="jBox-title"><div>' + this.titles + '</div></div><div class = "jBox-content"style = "width: auto; height: auto;"> ' + this.contents + key + ' </div></div> </div>';
                 this.open();
                 if ($(".animationright").length) {
                     this.close("animationright");
                 }

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
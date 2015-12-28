 var key = 0;
 var num = 0;
 $.extend({
     pop: function (opt) {

         function Pop() {
             var opt = opt || {};
             this.init(opt);
         }
         Pop.prototype.init = function (opt) {
             var defaultOption = this.defaultOptions();
             this.titles = opt.titles || defaultOption.titles;
             this.contents = opt.contents || defaultOption.contents;
             this.position = opt.position || defaultOption.position;
             this.colors = opt.colors || defaultOption.colors;
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
             _this.tpl = '<div id="jBoxI' + key + '"class="jBox-wrapper animation jBox-Notice jBox-Default jBox-Notice-color jBox-Notice-' + this.colors + '"style="' + _this.styles + '"><div class ="jBox-container"><div class="jBox-content">' + this.contents + key + '</div></div></div>';
             key++;
             $("body").prepend($(_this.tpl));

             var timer;
             if ($(".animation").length) {
                 var timer = setInterval(_this.close, 1000);
             } else {
                 clearInterval(timer);
             }
         };
         Pop.prototype.direction = function () {
             var _this = this;
             _this.dealColor();
             _this.position === "topright" ? _this.topright() : _this.position === "lowerleft" ? _this.lowerleft() : _this.lowerright();

         };
         Pop.prototype.topright = function () {
             var thisBox = $(".jBox-wrapper").eq(key - 1);
             var topMargin = 20;
             var topOffeset = thisBox.offset.y || 0;
             var Gettop = topMargin + topOffeset;
             console.log(topMargin, topOffeset);
             this.styles = "right:0;top:" + Gettop + 'px;';
             console.log(this.styles);
             this.open();
             // alert(1);
         };
         Pop.prototype.lowerleft = function () {

         };
         Pop.prototype.lowerright = function () {

         };

         // 处理颜色
         Pop.prototype.dealColor = function () {
             var _this = this;
             var colorArr = ["green", "blue", "red", "yellow", "black"];
             num++;
             if (num == 4) {
                 num = 0;
             }
             _this.colors = colorArr[num];


         }

         // 关闭弹窗
         Pop.prototype.close = function () {
             $.each($(".animation"), function (index, el) {
                 $("#boxWrap .animation").eq(index).addClass('animation-close');
             });
         };

         return new Pop();
     }
 });
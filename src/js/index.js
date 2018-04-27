require("../style/index.less");
require("../style/common/basic.less");
require("jquery")
$(function(){
    $("#button").on("click",function(){
        alert("11111")
    })
    $("#listButton").on("click",function(){
        location.href="./list.html"
    })
    let slideBox = $(".slideBox");
    let ul = slideBox.find("ul");
    let oneWidth = slideBox.find("ul li").eq(0).width();
    let number = slideBox.find(".spanBox span");            //注意分号 和逗号的用法
    let timer = null;
    let sw = 0;                    
    //每个span绑定click事件，完成切换颜色和动画，以及读取参数值
    number.on("click",function (){
    $(this).addClass("active").siblings("span").removeClass("active");
    sw=$(this).index();
    ul.animate({
           "right":oneWidth*sw,    //ul标签的动画为向左移动；
        });
    });
   //定时器的使用，自动开始
   timer = setInterval(function (){
       sw++;
       if(sw==number.length){sw=0};
       number.eq(sw).trigger("click");
       },2000);
   //hover事件完成悬停和，左右图标的动画效果
   slideBox.hover(function(){
       clearInterval(timer);
       },function(){
       timer = setInterval(function (){
       sw++;
       if(sw==number.length){sw=0};
       number.eq(sw).trigger("click");
       },2000);
    })
})
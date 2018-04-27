// require("../style/list.less");
require("jquery")

$(function(){
    $("#addButton").on("click",function(){
        $("ul").append("<li>Strawberry</li>");
    })
})
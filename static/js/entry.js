$(document).ready(function (event) {
    $(".content").hide()
    $("h3").click(function (){
        console.log($(this).next())
        $(this).next(".content").slideToggle()
    })
});
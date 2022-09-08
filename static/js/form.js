function animate($) {
    $.show()
    $first = $.children().first()
    $sib = $first.siblings()
    $sib.hide()
    showAllElements($first)
}

$(document).ready(function () {

    $btn = $("#next")

    $("div").not(".container").hide()
    animate($(".active"))
    $("#date").append(new Date().toUTCString().slice(0, 16))

    $btn.click(function () {
        $curr = $(".active")
        $curr.fadeOut(200)

        $next = $curr.siblings().first()

        if ($next.is("form")) {
            $next.show()
            $next = $next.children().first()
        }
        $curr.hide().removeClass("active")
        $next.addClass("active")
        animate($next)

    })

    $("input[name=mood]").change(function (){
        svg=$(this).parent().find("path")
        $("path").attr("fill", "#F1F1F1")
            if ($(this).prop("value")==="good")
                svg.attr("fill", "#78FFF7")
            else if ($(this).prop("value")=== "meh")
                svg.attr("fill", "#F8FF78")
            else
                svg.attr("fill", "#FF6161")
    })
});

function animate($) {
    if (!$.hasClass("animOver")) {
        $.show()
        $el = $.children()
        $el.hide()
        showAllElements($el.first(), $.html())
        $.addClass("animOver")
    } else {
        $.fadeIn()
    }
}

$(document).ready(function () {
    $("#date").append(new Date().toUTCString().slice(0, 16))
    let $nextbtn = $("#next")
    let $backbtn = $("#back"), newLi
    $backbtn.hide()
    $("div").not(".container").hide()
    animate($(".active"))

    $nextbtn.click(function () {
        $curr = $(".active")

        $fields = $curr.find("input[type=text]")
        $fields.each(function (event) {
            if ($(this).val().length === 0) {
                $war = $(".warning")
                $war.show()
                setTimeout(()=> $war.fadeOut(), 3000)
                event.stopPropagation()
                event.preventDefault()
            }
        })

        $curr.fadeOut(200)
        $next = $curr.next()

        if ($next.is("form")) {
            $next.show()
            $next = $next.children().first()
            $backbtn.show()
        }
        $curr.hide().removeClass("active")
        $next.addClass("active")
        animate($next)


    })

    $backbtn.click(function () {
        $curr = $(".active")
        $curr.show()
        $curr.fadeOut(200)
        $prev = $curr.prev()

        if ($prev.length === 0) {
            $prev = $curr.parent().prev()
        }

        $curr.hide().removeClass("active")
        $prev.addClass("active")
        $prev.fadeIn("slow")

    })


    $(".radio-group").on("change", "input[name=mood]",function () {
        svg = $(this).parent().find("path")
        $("path").attr("fill", "#F1F1F1")
        if ($(this).prop("value") === "good") {
            svg.attr("fill", "#78FFF7")
        } else if ($(this).prop("value") === "meh") {
            svg.attr("fill", "#F8FF78")
        } else {
            svg.attr("fill", "#FF6161")
        }
    })

    $(".form-group").on("click", ".add-new",function () {
        console.log("click")
        newLi = document.createElement("li")
        $parent = $(this).parent().parent()
        newLi.innerHTML = "<input type='text' name="+$parent.attr("name")+">"
        $parent.prepend(newLi)
    })
});

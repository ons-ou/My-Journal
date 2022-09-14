//show the currently active div
function animate($) {
    if (!$.hasClass("animOver")) {
        $.show()
        $el = $.children()
        $el.hide()
        html = $.html()
        showAllElements($el.first(), html)
        $.addClass("animOver")
    } else {
        $.fadeIn()
    }
}

function getInput(n){
    $f = $("input[name="+n+"], textarea[name="+n+"]")
    res=""
    $f.each(function (){
        if (res!=="")
            res+=" \n "
        res+= $(this).val()
    })
    return res
}

$(document).ready(function (event) {
    $("#date").append(new Date().toUTCString().slice(0, 16))

    let $nextbtn = $("#next")
    let $backbtn = $("#back"), newLi

    $backbtn.hide()
    $("div").not(".container").hide()
    animate($(".active"))

    //on button click move to the next div
    $nextbtn.click(function () {
        $curr = $(".active")

        $fields = $curr.find("input[type=text]")
        //if a text field is empty show warning toast message and don't move to next div
        $fields.each(function () {
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

        // show submit button instead of next button if reached the final button
        if ($next.next().attr("id")==="submit"){
            $(this).hide()
            $("#submit").show()
        }

        if ($next.is("form")) {
            $next.show()
            $next = $next.children().first()
            $backbtn.show()
        }

        $curr.hide().removeClass("active")
        $next.addClass("active")
        animate($next)

    })

    //on button click go back to past div
    $backbtn.click(function () {
        $curr = $(".active")
        $curr.show()
        $curr.fadeOut(200)
        $prev = $curr.prev()

        if ($prev.length === 0) {
            $prev = $curr.parent().prev()
        }

        if ($curr.next().attr("id")==="submit"){
            $nextbtn.show()
            $("#submit").hide()
        }

        $curr.hide().removeClass("active")
        $prev.addClass("active")
        $prev.fadeIn("slow")

    })

    //change the color of the checked radio button
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

    //add a new text input on button click
    $(".form-question").on("click", ".add-new",function () {
        newLi = document.createElement("li")
        $parent = $(this).parent().parent()
        newLi.innerHTML = "<input type='text' name="+$parent.attr("name")+">"
        $parent.prepend(newLi)
    })

   //send post request on form submit
    $("form").submit(function (e) {
        e.preventDefault()
        moo = $("[name=mood]:checked").attr("value")
        tab = ["goals", "thanks", "tries", "thoughts"]

        for (var i = 0; i < tab.length; i++)
            tab[i] = getInput(tab[i])

        $.ajax({
            url: "/entries",
            contentType: "application/json",
            type: "Post",
            dataType: "json",
            async: true,
            data: JSON.stringify({
                mood: moo,
                goals: tab[0],
                thanks: tab[1],
                tries: tab[2],
                thoughts: tab[3]
            }),
            success: function (response) {
                console.log(response)
                window.location.href='/entries'
            },
            error: function (msg){
                console.log(msg)
            }
        })
    })
});

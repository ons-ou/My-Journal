jQuery.fn.extend({
    // write letter by letter
    showText: function () {
        var $deferred = new $.Deferred();
        $letters = this.text().split('')
        $el = this
        this.text("")
        setInterval(() => {
            if ($letters.length === 0) {
                clearInterval();
                $deferred.resolve();
            } else {
                if ($el === this)
                    this.text(this.text() + $letters.shift())
            }
        }, 100);
        return $deferred.promise();
    },
});

function animate(el) {
    $cont = $(el)
    $(".container").hide()
    $cont.show()
    $first = $cont.children().first()
    $first.siblings().hide()
    $sib = $first.siblings()
    $first.showText().promise().then(() =>
        $sib.each(() => $sib.fadeIn("slow")))
}

$(document).ready(function () {
    animate(".cont-1")

    //toDo: implement login
    $("#user").click((e) => {
        e.preventDefault();
    })

    $("#guest").click((e) => {
        e.preventDefault()
        $.ajax({
            type: "get",
            url: "/",
            data: {
                id: "guest",
                div: "cont-2"
            },
            success: function (response) {
                animate("." + response)
            }
            , error: function () {
                alert('error');
            }
        })
    });
});

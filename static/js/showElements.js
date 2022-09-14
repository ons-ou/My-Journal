jQuery.fn.extend({
    // write letter by letter
    showText: function () {
        var deferred = new $.Deferred();
        this.show()
        $letters = this.text().split('')
        $el = this
        this.text("")
        setInterval(() => {
            if ($letters.length === 0) {
                clearInterval();
                deferred.resolve();
            } else {
                if ($el === this)
                    this.append($letters.shift())
            }
        }, 60);
        return deferred.promise();
    },
});

//show all the elements in a div one by one
showAllElements = function (element, $html) {
    $next=element.next();

    if (element.is("h1") || element.is("h2") || element.is("p"))
        element.showText().promise().done(() => {
            showAllElements($next)
        })
    else
        element.fadeIn("slow", ()=> showAllElements($next))

    $(document).on('keypress',function(e) {
            if(e.which === 115) {
                if ($html)
                    $html= $html.replaceAll("display: none;","")
                element.parent().html($html)

    }});

    $("button").on("click", function() {
        if ($html)
            $html= $html.replaceAll("display: none;","")
        element.parent().html($html)

    })
}



//on click close toast message
$(document).ready(function () {
    $(".close-btn").click(function () {
        $(this).parent().hide()
    })
})
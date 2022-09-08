jQuery.fn.extend({
    // write letter by letter
    showText: function () {
        var $deferred = new $.Deferred();
        this.show()
        $letters = this.text().split('')
        $el = this
        this.text("")
        setInterval(() => {
            if ($letters.length === 0) {
                clearInterval();
                $deferred.resolve();
            } else {
                if ($el === this)
                    this.append($letters.shift())
            }
        }, 60);
        return $deferred.promise();
    },
});

showAllElements = function (element){
    $next=element.next();
    console.log($next)

    if (element.is("h1") || element.is("h2") || element.is("p"))
        element.showText().promise().then(() => {
            showAllElements($next)
        });
    else
        element.fadeIn("slow", ()=> showAllElements($next))
}
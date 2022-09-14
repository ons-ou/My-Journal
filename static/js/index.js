$(document).ready(function () {
    $cont = $(".container").children()
    $cont.hide()
    $first=$cont.first()
    showAllElements($first, $first.parent().html())
});

$(document).ready(function () {
    $cont = $(".container").children()
    $cont.hide()
    $first=$cont.first()
    showAllElements($first, $first.parent().html())


    //toDo: implement login
    $("#user").click((e) => {
        e.preventDefault();
    })
});

$(document).ready(function () {
    $cont = $(".container").children()
    $cont.hide()
    $first=$cont.first()
    $btn = $(".btn-acc")
    showAllElements($first)


    //toDo: implement login
    $("#user").click((e) => {
        e.preventDefault();
    })
});

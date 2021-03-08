    var list;
    var input;
    const card = "<input class=\"check\" type=\"checkbox\">\n" +
        "<span class=\"itemText\"></span>\n" +
"<button class=\"delete zmdi zmdi-delete\"></button>\n"


function addItem() {
    if (input.value !== "") {
        let newCard = document.createElement("div");
        newCard.setAttribute("class", "card");
        newCard.innerHTML = card;
        newCard.getElementsByClassName("itemText").item(0).innerHTML = input.value;
        $(newCard).children(".delete").click(deleteItem);
        $(newCard).children(".check").change(checkDoneEvent)
        list.appendChild(newCard); //todo add blip effect to card being added
        input.value = "";
    } else {
        //todo error notif. Button shake and color red, with text bubble?
    }
}


function checkDoneEvent() {
    // var itemText = $(this).closest(".card").contents(".itemText").html;
    let text = $(this).siblings(".itemText");
    if ($(this).is(":checked")) {
        text.css("text-decoration", "line-through").css("color", "#aaaaaa");
    } else {
        text.css("text-decoration", "none").css("color", "black")
    }
}

function deleteItem() {
    $(this).parent(".card").remove();


}

$(document).ready(function () {
    list = document.getElementById("list");
    input = document.getElementById("todoInput");
    $("#confirmEntry").click(addItem);
    $("#todoInput").change(addItem);
    //todo change checkDone to trigger on box value, not event?
    $(".check").change(checkDoneEvent);
    $(".delete").click(deleteItem)

});

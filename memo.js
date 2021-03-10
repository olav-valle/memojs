var list;
var input;

// Item card HTML
const card = "<input class=\"check\" type=\"checkbox\">\n" +
    "<span class=\"itemText\"></span>\n" +
    "<button class=\"delete zmdi zmdi-delete\"></button>\n";

const priMenu =
    "<div id=\"priDropdown\">\n" +
    "    <div class=\"dropMenu\">\n" +
    "        <span>Priority:</span>\n" +
    "        <button class=\"priButton priTop\">Top</button>\n" +
    "        <button class=\"priButton priMid\">Normal</button>\n" +
    "        <button class=\"priButton priLow\">Low</button>\n" +
    "    </div>\n" +
    "</div>"


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
    //todo  change/add class on card at change?
    // var itemText = $(this).closest(".card").contents(".itemText").html;
    let text = $(this).siblings(".itemText");
    if ($(this).is(":checked")) {
        text.css("text-decoration", "line-through").css("color", "#aaaaaa");
    } else {
        text.css("text-decoration", "none").css("color", "black")
    }
}

function setDoneClass() {
    if ($(this).is(":checked")) {
        // $(this).siblings(".itemText").addClass("done");
        $(this).parent(".card").addClass("done");

    } else {
        $(this).parent(".card").removeClass("done");
        // $(this).siblings(".itemText").removeClass("done");
    }
}

function showPriMenu() {
    // the menu div
    let div = $("#priDropdown");
    // $(this).append(priMenu);

    //if hidden, we show
    //position of button that was clicked
    let offset = {left: 0, top: 0};

    if ($("#priDropdown:visible").length == 0) {
        $(div).toggle(true);
        // adjust menu to extend from lower left of button
        offset = $(this).offset();
        let leftOffset = $(div).children(".dropMenu").width()
        offset.left -= leftOffset;
        offset.top += $(this).height();
    } else {
        $(div).toggle(false);
    }

    $(div).offset(offset);

}

function hidePriMenu() {

    let $button = $(".priStar");
    let $div = $("#priDropdown");
    if (!$button.is(event.target)){
        $div.offset({left: 0, top: 0});
        $div.toggle(false);
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
    $(".check").change(setDoneClass);
    $(".delete").click(deleteItem);
    $(document).click(hidePriMenu);
    $(".priStar").click(showPriMenu);

});

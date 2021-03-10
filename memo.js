var list;
var input;

// Item card HTML
const card =
    "        <div class=\"card\">\n" +
    "            <input class=\"check\" type=\"checkbox\">\n" +
    "            <span class=\"itemText\"></span>\n" +
    "            <button class=\"priStar zmdi zmdi-star-outline\" title=\"Select priority level.\"></button>\n" +
    "            <button class=\"delete zmdi zmdi-delete\" title=\"Delete\"></button>\n" +
    "        </div>"

const priMenu =
    "<div id=\"priDropdown\">\n" +
    "    <div class=\"dropMenu\">\n" +
    "        <span>Priority:</span>\n" +
    "        <button class=\"priButton priTop\">Top</button>\n" +
    "        <button class=\"priButton priMid\">Normal</button>\n" +
    "        <button class=\"priButton priLow\">Low</button>\n" +
    "        <button class=\"priButton priNo\">Remove</button>\n" +
    "    </div>\n" +
    "</div>"


function addItem() {
    if (input.value !== "") {
        let newCard = $(card).appendTo("#list");
        $(newCard).children(".itemText").html(input.value);
        //set button reactions
        $(newCard).children(".delete").click(deleteItem);
        $(newCard).children(".check").change(checkDoneEvent)
        $(newCard).children(".priStar").click(showPriMenu)

        // list.appendChild(newCard); //todo add blip effect to card being added
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
    //fixme this sets class on buttons as well as text
    if ($(this).is(":checked")) {
        // $(this).siblings(".itemText").addClass("done");
        $(this).parent(".card").addClass("done");

    } else {
        $(this).parent(".card").removeClass("done");
        // $(this).siblings(".itemText").removeClass("done");
    }
}

function showPriMenu() {
    $("#priDropdown").remove();
    // the menu div
    $(this).append(priMenu);
    let div = $("#priDropdown");

    let offset = $(this).offset();
    let leftOffset = $(div).children(".dropMenu").width()
    offset.left -= leftOffset;
    offset.top += $(this).height();

    $(div).offset(offset);
    $(".priButton").click(setCardPriority)


}

function hidePriMenu() {
    let $button = $(".priStar");
    if (!$button.is(event.target)) {
        $("#priDropdown").remove();
    }
}

// sets colour of card
function setCardPriority() {
    //fixme do this by adding a .class to element?
    //  css with flex box ordering rules based on priority

    let color = $(this).css("background-color");
    let parent = $(this).parents(".card").get(0);

    $(parent).css("background-color", color);
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
    $(".priButton").click(setCardPriority)

});

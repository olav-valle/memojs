var input;

//todo figure out whether it's better to have these elements present in the actual HTML,
// or if there's some other, better way?

// Item card HTML
const card =
    "        <div class=\"card\">\n" +
    "            <input class=\"check\" type=\"checkbox\">\n" +
    "            <span class=\"itemText\" contenteditable=\"true\"></span>\n" +
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

function addCard() {
    if (input.value !== "") {
        let newCard = $(card).appendTo("#list");
        $(newCard).children(".itemText").html(input.value);
        //set button reactions
        $(newCard).children(".delete").click(deleteCard);
        $(newCard).children(".check").change(checkDoneEvent)
        $(newCard).children(".priStar").click(showPriorityMenu)

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

function toggleCardDoneClass() {
    //fixme this sets class on buttons as well as text
    if ($(this).is(":checked")) {
        // $(this).siblings(".itemText").addClass("done");
        $(this).parent(".card").addClass("done");

    } else {
        $(this).parent(".card").removeClass("done");
        // $(this).siblings(".itemText").removeClass("done");
    }
}

function showPriorityMenu() {
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

function hidePriorityMenu() {
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


function deleteCard() {
    $(this).parent(".card").remove();
}

$(document).ready(function () {
    input = document.getElementById("todoInput");
    // Text input and card creation events
    $("#confirmEntry").click(addCard);
    $("#todoInput").change(addCard);

    // Mark a card as "done", striking through text and fading the card
    //todo change checkDone to trigger on box value, not event?
    // change checkbox to button/icon, and add/remove a .class?
    $(".check").change(toggleCardDoneClass);

    // Delete a specific card
    $(".delete").click(deleteCard);

    // Handlers for setting card priority
    $(document).click(hidePriorityMenu);
    $(".priStar").click(showPriorityMenu);
    $(".priButton").click(setCardPriority)

});

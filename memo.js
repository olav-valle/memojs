var input;

//todo figure out whether it's better to have these elements present in the actual HTML,
// or if there's some other, better way?

// Item card HTML
const card =
    "        <div class=\"card\">\n" +
    "            <button class=\"checkButton zmdi zmdi-check\"></button>" +
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
    "        <button class=\"priButton priNo\">None</button>\n" +
    "    </div>\n" +
    "</div>"


function newCard() {
    let newCard = $(card).appendTo("#list");
    //set button reactions
    $(newCard).children(".checkButton").hover(hoverOnCheckDone);
    $(newCard).children(".checkButton").click(toggleCardDoneClass);
    $(newCard).children(".priStar").click(showPriorityMenu)
    $(newCard).children(".delete").click(deleteCard);
    $(newCard).children(".checkButton").click(toggleCardDoneClass())

    // list.appendChild(newCard); //todo add blip effect to card being added
    $(newCard).children(".itemText").focus();
}

// hover effect handler for checkmark button
function hoverOnCheckDone() {
    $(this).toggleClass("checkButtonHover");
}
// Toggle the .done class on a .card, and toggle the checkmark icon.
function toggleCardDoneClass() {
    $(this).parent(".card").toggleClass("done");
    $(this).toggleClass("zmdi-check-circle").toggleClass("zmdi-check");
}

// Show the priority select dropdown menu
function showPriorityMenu() {

    // remove existing menu div
    //let div =
    $("#priDropdown").remove();
    //.end().appendTo($(this))

    // append the menu div to the clicked element
    let div = $(priMenu).appendTo($(this));

    // change the offset of the menu from clicked element
    let offset = $(this).offset();
    offset.top += ($(this) // below element
        .height() * 0.5);
    offset.left -= ($(div) // Extend to the left
        .children(".dropMenu")
        .width() - ($(this).width()*0.5));
    $(div).offset(offset).show();

    $(".priButton").click(setCardPriority)


}

function hidePriorityMenu() {
    // todo look into e.stopPropagation to bypass need for button check?
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

// Remove all .card elements that are marked as done.

function deleteAllDone() {
    $(".card").filter(".done").remove();
}




$(document).ready(function () {
    input = document.getElementById("todoInput");
    // Text input and card creation events
    $("#newMemo").click(newCard);
    $("#deleteDone").click(deleteAllDone)

    // Mark a card as "done", striking through text
    // and fading the card


    // new check done handlers
    $(".checkButton").hover(hoverOnCheckDone).click(toggleCardDoneClass);


    // Delete a specific card
    $(".delete").click(deleteCard);

    // Handlers for setting card priority
    $(document).click(hidePriorityMenu);
    $(".priStar").click(showPriorityMenu);
    $(".priButton").click(setCardPriority)

});

//todo figure out whether it's better to have these elements present in the actual HTML,
// or if there's some other, better way?

// Item card HTML
const card =
    "        <div class=\"card\">\n" +
    "            <button class=\"cardButton checkBtn checkDone zmdi zmdi-check\"></button>" +
    "            <span class=\"itemText\" contenteditable=\"true\"></span>\n" +
    "            <button class=\"cardButton priStarBtn zmdi zmdi-star-outline\" title=\"Select priority level.\"></button>\n" +
    "            <button class=\"cardButton deleteBtn zmdi zmdi-delete\" title=\"Delete\"></button>\n" +
    "        </div>"
// Priority select dropdown menu
const priMenu =
    "<div id=\"priDropdown\">\n" +
    "    <div class=\"dropMenu\">\n" +
    "        <span>Priority:</span>\n" +
    "        <button class=\"priMenuBtn priTop\">Top</button>\n" +
    "        <button class=\"priMenuBtn priMid\">Normal</button>\n" +
    "        <button class=\"priMenuBtn priLow\">Low</button>\n" +
    "        <button class=\"priMenuBtn priNone\">None</button>\n" +
    "    </div>\n" +
    "</div>"


// Adds a new card element to the DOM,
// placing it inside the #list element,
// setting event handlers for all buttons on card,
// and finishing with input caret inside card text box.
function newCard() {
    $(card)
        // add card to the list
        .appendTo("#list")
        // Move keyboard input caret to text box of new card
        .children(".itemText")
        .focus();

}

// hover effect handler for checkmark button
function hoverOnCheckDone() {
    $(this).toggleClass("checkButtonHover");
}

// Toggle the .done class on a .card, and toggle the checkmark icon.
function toggleCardDoneClass() {
    event.stopPropagation();
    $(this).parent(".card").toggleClass("done");
    $(this).toggleClass("zmdi-check-circle").toggleClass("zmdi-check");
}

// Show the priority select dropdown menu
function showPriorityMenu(event) {
    // Stop body element from triggering its hidePriorityMenu function

    // Remove existing menu div
    $("#priDropdown").remove();

    // Append the menu div to the clicked element
    let div = $(priMenu).appendTo($(this));
    //todo can we avoid the need to assign the menu element to a variable, and still reference it from offset()?

    // Set menu offset to below-left of mouse cursor position
    $(div)
        .offset({
            left: (event.pageX - $(div).find(".dropMenu").innerWidth()),
            top: event.pageY
        })
    event.stopImmediatePropagation();

}


// Remove any #priDropdown elements in the DOM
function hidePriorityMenu(event) {
    //only run if event has not been stopped by lower element
    if(!(event.isImmediatePropagationStopped())){
        $("#priDropdown").detach();
    }

}

// sets colour of card
function setCardPriority(event) {
    //fixme do this by adding a .class to element?
    //  css with flex box ordering rules based on priority

    // Stop priority select event from propagating up to .priStar parent
    $(this)
        .parents(".card")
        .css("background-color", $(this).css("background-color"));
    $("#priDropdown").detach();
    event.stopPropagation();
}

// Deletes the parent .card element of the event target
function deleteCard() {
    $(this).parent(".card").remove();
}

// Remove all .card elements that are marked as done.
function deleteAllDone() {
    $(".card").filter(".done").remove();
}

// Set event handlers for application elements.
// todo: investigate performance issues related to binding event handlers this way.
//  Using delegation is recommended, but not to elements too "far away",
//  i.e. high up in the DOM tree from the event target.
//  The jQuery API docs for on() (https://api.jquery.com/on/) suggest
//  avoiding overuse of document as delegation target.
//  Perhaps change card buttons delegate to .card, header buttons to header etc..?
$(document)
    .click(hidePriorityMenu)
    // .on("click", "html", hidePriorityMenu)
    .on("click", "#newMemo", newCard)
    .on("click", "#deleteDone", deleteAllDone)
    .on("hover", ".checkBtn", hoverOnCheckDone)
    .on("click", ".checkBtn", toggleCardDoneClass)
    .on("click", ".priStarBtn", showPriorityMenu)
    .on("click", ".priMenuBtn", setCardPriority)
    .on("click", ".deleteBtn", deleteCard);


$(document).ready(function () {

});

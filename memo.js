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
// Priority select dropdown menu
const priMenu =
    "<div id=\"priDropdown\">\n" +
    "    <div class=\"dropMenu\">\n" +
    "        <span>Priority:</span>\n" +
    "        <button class=\"priButton priTop\">Top</button>\n" +
    "        <button class=\"priButton priMid\">Normal</button>\n" +
    "        <button class=\"priButton priLow\">Low</button>\n" +
    "        <button class=\"priButton priNone\">None</button>\n" +
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
        .children(".checkButton")
        .hover(hoverOnCheckDone)
        .end()
        // Set functions for all card buttons
        .children(".checkButton")
        .click(toggleCardDoneClass)
        .end()
        .children(".priStar")
        .click(showPriorityMenu)
        .end()
        .children(".delete")
        .click(deleteCard)
        .end()
        .children(".checkButton")
        .click(toggleCardDoneClass)
        .end()
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
    $(this).parent(".card").toggleClass("done");
    $(this).toggleClass("zmdi-check-circle").toggleClass("zmdi-check");
}

// Show the priority select dropdown menu
function showPriorityMenu() {
    // Stop body element from triggering its hidePriorityMenu function
    event.stopPropagation();

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
        .find(".priButton")
        .click(setCardPriority)
}


// Remove any #priDropdown elements in the DOM
function hidePriorityMenu() {
    $("#priDropdown").detach();

}

// sets colour of card
function setCardPriority() {
    //fixme do this by adding a .class to element?
    //  css with flex box ordering rules based on priority

    // Stop priority select event from propagating up to .priStar parent
    // and triggering showPriorityMenu
    event.stopPropagation();
    $(this)
        .parents(".card")
        .css("background-color", $(this).css("background-color"));
}

// Deletes the parent .card element of the event target
function deleteCard() {
    $(this).parent(".card").remove();
}

// Remove all .card elements that are marked as done.
function deleteAllDone() {
    $(".card").filter(".done").remove();
}

// Set handlers for application elements present at document load.
$(document).ready(function () {

    //todo Can we change these to use event handling delegation?
    // From my understanding this should let us remove all the parts of
    // the application code where we are attaching handlers to new
    // elements (e.g. in newCard, with all the buttons).
    // This would greatly improve cohesion, and increase
    // maintainability by collecting all handler assignments to one place.

    // and card creation events
    $("#newMemo").click(newCard);
    $("#deleteDone").click(deleteAllDone);

    // Mark a card as "done", striking through text
    // and fading the card


    // new check done handlers
    $(".checkButton")
        .hover(hoverOnCheckDone)
        .click(toggleCardDoneClass);


    // Delete a specific card
    $(".delete").click(deleteCard);

    // Handlers for setting card priority
    $(document).click(hidePriorityMenu);
    $(".priStar").click(showPriorityMenu);
    // $(".priButton").click(setCardPriority);

});

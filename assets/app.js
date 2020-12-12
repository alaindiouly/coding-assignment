//*********A NOTE ON VARIABLES***************
// Declaring the variables as VAR (instead of declaring them locally with LET or CONST) in order to access them as much as possible from the Window global environment, for testing purposes, by calling them directly from the console
// aware than the NAMESPACE may become crowded though!

// kept those two variables here (used for searching contacts and sorting them) for easy access
var arr = [];
var searchTerm = "";
/* $(".filterBox").hide();*/

/////////////////////////////////////////////
////////////////EVENT LISTENERS//////////////

$(document).ready(function () {
  ////////////////////////////////////////////
  //////////////BUTTON EVENTS/////////////////
  $("#openBtn").click(function () {
    showpopup();
  });

  $(".closeBtn").click(function () {
    hidepopup();
    hideSearch();
  });

  $("#overlay").click(function () {
    hidepopup();
    hideSearch();
  });

  // delete contact event
  //DOM element which does not exist yet
  //passing an EXISTING container as selector, and the (future) TARGET as second argument after event
  //using the ON() method
  $(".cardBox").on("click", ".deleteBtn", function () {
    // assigning the parent of this to a new variable in order to remove the parent and the div itself
    var $parent = $(this).parent();
    $parent.remove();
  });

  ////////////////////////////////////////////
  ///////////////////SEARCH///////////////////
  $(".searchBox").on("submit", function (event) {
    event.preventDefault();

    // ***TESTER toLowerCase
    searchTerm = $(this).find("[name=search]").val();

    // cloning the found contact in order to delete the clone later on (and not the original on the contact list!)
    let $newResult = $(".card:contains('" + searchTerm + "')").clone();

    // if no result found, print an error message
    // otherwise put result into search popup
    if ($newResult.length <= 0) {
      $("<div>")
        .appendTo(".resultBox")
        .addClass("cardResult")
        .text("No results in your contacts");
    } else {
      $newResult.appendTo(".resultBox").addClass("cardResult");
    }

    //removing the delete button from the search result

    $newResult.children(".deleteBtn").remove();

    //    console.log("this: ", $(this));
    //  console.log("$newResult[0].children :", //$newResult.children(".deleteBtn"));

    // show the search popup
    showSearch();
  });

  ///////////////////////////////////////////////
  //////////////////POPUP FORM///////////////////
  $(".popup-container").on("submit", function (event) {
    event.preventDefault();

    var name = $(this).find("[name=name]").val();
    var surname = $(this).find("[name=surname]").val();
    var phone = $(this).find("[name=phone]").val();
    var address = $(this).find("[name=address]").val();

    // Putting the FIRSTNAMES in an array
    // Sorting Them
    // getting the index of the new entry
    arr.push(name);
    arr.sort();
    let index = arr.indexOf(name);

    // Creating a new contact card
    let $newEntry = $("<div>");
    $newEntry.append($("<span>").text(name).addClass("name nameFilter"));
    $newEntry.append(
      $("<span>").text(surname).addClass("surname surnameFilter")
    );
    $newEntry.append($("<span>").text(phone).addClass("phone phoneFilter"));
    $newEntry.append(
      $("<span>").text(address).addClass("address addressFilter")
    );
    $newEntry.append($("<button>").text("Del").addClass("deleteBtn"));
    $newEntry
      .children(".deleteBtn")
      .append($("<span>"))
      .addClass("material-icons md-24 material-icons-outlined")
      .text("delete_forever");

    $newEntry.addClass("card");

    $newEntry.hover(
      function () {
        $newEntry.css("background-color", "lightgray");
      },
      function () {
        $newEntry.css("background-color", "white");
      }
    );

    // ***********Sorting the contacts ********
    // counting the number of existing contacts  by calling the length property of the element $(".card")
    // if the contact list is empty, just append to container (."cardBox")
    // if the index of the new entry is inferior to the length of the contact lists, insert BEFORE the exsiting contact at Idex by calling the eq() method
    // otherwise, i.e. if name is Zoé e.g., append it to the end of the contact list

    if ($(".card").length === 0) {
      $newEntry.appendTo(".cardBox");
    } else if (index < $(".card").length) {
      $(".card").eq(index).before($newEntry);
    } else {
      $newEntry.appendTo(".cardBox");
    }

    hidepopup();
  });
});
//////////////END OF EVENT LISTENERS/////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
///////////////POPUP FUNCTIONS (OPEN/CLOSE)//////

function showpopup() {
  $("#popup").fadeIn();
  $("#overlay").fadeIn();
  $("#popup").css({ visibility: "visible", display: "block" });
  $("#overlay").css({ visibility: "visible", display: "block" });
}

function hidepopup() {
  $("#popup").fadeOut();
  $("#overlay").fadeOut();
  $("#popup").css({ visibility: "hidden", display: "none" });
  $("#overlay").css({ visibility: "hidden", display: "none" });
  $(".popup-container").trigger("reset");
}

function showSearch() {
  $("#result").fadeIn();
  $("#overlay").fadeIn();
  $("#result").css({ visibility: "visible", display: "block" });
  $("#overlay").css({ visibility: "visible", display: "block" });
}

function hideSearch() {
  $("#result").fadeOut();
  $("#overlay").fadeOut();
  $("#result").css({ visibility: "hidden", display: "none" });
  $("#overlay").css({ visibility: "hidden", display: "none" });
  $(".searchBox").trigger("reset");

  // deleting the search result from the popup
  $(".cardResult").remove();
}

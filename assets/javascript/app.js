//scroll on hover for the gif result
//scroll-right
$(".arrow-right").mouseover(function() {
  event.preventDefault();
  console.log("hover");

  $(".Gif-result").animate({ scrollLeft: "+=200" }, 500);
});

//scroll-left
$(".arrow-left").mouseover(function() {
  event.preventDefault();
  console.log("hover");

  $(".Gif-result").animate({ scrollLeft: "-=200" }, 500);
});

//zoom in and out on hover for any gif in the gifresult
function pulse() {
  $(".Gif-container").mouseover(function() {
    event.preventDefault();
    console.log("zoom");
    $(this)
      .addClass("animated pulse ")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
          $(this).removeClass("animated pulse ");
        }
      );
  });
}

//zoom in for any of the favs
function zoomin() {
  $(".Gif-favs").mouseover(function() {
    event.preventDefault();
    $(this)
      .addClass("animated pulse ")
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
          $(this).removeClass("animated pulse ");
        }
      );
  });
}

// start the actual code
//define preset topics
var topics = ["kids", "pets", "brownies", "friends", "sports"];

// create arrays for newly created favs
var favourits = [];

function displayTopics() {
  var newTopic = $(this).attr("data-name");
  var queryURL =
    "https:////api.giphy.com/v1/gifs/search?api_key=2lF9sKMxxHfZIY0plsOMnxN63wpaqwix&q=" +
    newTopic +
    "&limit=10&offset=0&rating=G&lang=en";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".Gif-result").empty();
    console.log("clicked");
    console.log(response.data[0].images.original.url);
    for (i = 0; i < response.data.length; i++) {
      console.log(response.data[i].images.original.url);
      console.log(gifinfo);
      var gif = $(
        "<img class='img-fluid Gif-Individual opacity' src='" +
          response.data[i].images.original_still.url +
          "'data-still='" +
          response.data[i].images.original_still.url +
          "'data-animate='" +
          response.data[i].images.original.url +
          "'data-state='" +
          "'still'" +
          "'>"
      );
      // var download = $(
      //   " <img class='download' src='assets/images/download.png'/>"
      // );
      // download.attr("downloadURL", response.data[i].images.original.url);

      var divTopicContainer = $(
        "<div class='Gif-container' favSrc='" +
          response.data[i].images.original.url +
          "'></div>"
      );
      var gifinfo = $("<div class = 'data-screen'></div>");
      var h6 = $(
        "<h6>" +
          response.data[i].title +
          "   Rating: " +
          response.data[i].rating.toUpperCase() +
          "</h6>"
      );
      divTopicContainer.append(gif, gifinfo, h6);
      $(".Gif-result").prepend(divTopicContainer);
    }
    pulse();
    animate();
    AddToFavs();
  });
}

//Listen for enter on input text
$("#Gif-input").keypress(function(element) {
  if (element.which == 13) {
    event.preventDefault();
    var topic = $("#Gif-input")
      .val()
      .trim();
    //search if topic already added and add it to buttons if it new
    search(topic);
  }
});

// function to search if topic already exists
function search(topic) {
  if (jQuery.inArray(topic, topics) != -1) {
    console.log("is in array");
    alert("search already exists, try something new!");
  } else {
    topics.push(topic);
    renderButtons();
  }
}

//event listner for  still and animated
function animate() {
  $(".Gif-Individual").on("click", function() {
    console.log("im clicking");
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}

// function to search favourits
function searchf(myfavSrc) {
  if (jQuery.inArray(myfavSrc, favourits) != -1) {
    console.log("is in array");
    alert("Fav already there!");
  } else {
    favourits.push(myfavSrc);
    var favAdded = $(
      "<img class='img-fluid Gif-favs download' src='" + myfavSrc + "'>"
    );
    $(".Inner-favs").prepend(favAdded);
    download();
  }
}

//function to add to favourits
function AddToFavs() {
  $(".Gif-container").on("dblclick", function(event) {
    event.preventDefault();
    console.log("picking fav");
    var myfavSrc = $(this).attr("favSrc");
    console.log(myfavSrc);
<<<<<<< HEAD
    var favAdded = $(
      "<img class='img-fluid Gif-favs download' src='" + myfavSrc + "'>"
    );
    $(".Inner-favs").prepend(favAdded);
    download();
=======
    searchf(myfavSrc);
>>>>>>> 1233b38b95bdb58465165e03ee276ef7705366bd
  });
}

//function to download gif
function download() {
  $(".download").on("dblclick", function(e) {
    e.preventDefault();
    console.log("let's download");
    window.location.href = $(this).attr("src");
  });
}

// Function for displaying topic data
function renderButtons() {
  $(".Initial-buttons").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-secondary Initial-button");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $(".Initial-buttons").append(a);
  }
}

// function handles for adding topic to buttons
$("#search-Gif").on("click", function(event) {
  event.preventDefault();
  var topic = $("#Gif-input")
    .val()
    .trim();

  search(topic);
});

// Adding a click event listener to all elements with a class of "Initial-button"
$(document).on("click", ".Initial-button", displayTopics);

// Calling the renderButtons function to display the intial buttons
renderButtons();


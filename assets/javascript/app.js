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
  //   $(".arrow-left").animate({
  //     width: 60
  //   });

  $(".Gif-result").animate({ scrollLeft: "-=200" }, 500);
});

//zoom in and out on hover for any gif in the gifresult
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
//zoom in for any of the favs
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

// start the actual code
//define preset topics
var topics = ["kids", "pets", "brownies", "friends", "sports"];

// "//api.giphy.com/v1/gifs/search?api_key=2lF9sKMxxHfZIY0plsOMnxN63wpaqwix&q=" +
//   topic +
//   "&limit=10&offset=0&rating=G&lang=en";

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
      var gif = $("<img class='img-fluid Gif-Individual'>").attr(
        "src",
        response.data[i].images.original.url
      );
      var divTopicContainer = $("<div class='Gif-container'></div>");
      divTopicContainer.append(gif);
      $(".Gif-result").prepend(divTopicContainer);
      //   $(".Gif-result").prepend(
      //     "<div class='Gif-container'><img class='img-fluid Gif-Individual' src='" +
      //       response.data[i].images.original.url +
      //       "></a></div>"
      //   );
    }
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

  topics.push(topic);
  renderButtons();
});

// Adding a click event listener to all elements with a class of "Initial-button"
$(document).on("click", ".Initial-button", displayTopics);

// Calling the renderButtons function to display the intial buttons
renderButtons();

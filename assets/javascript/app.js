//scroll on hover for the gif result

//scroll-right
$(".arrow-right").mouseover(function() {
  event.preventDefault();
  console.log("hover");
  //   $(".arrow-right").animate({
  //     width: 60
  //   });

  $(".Gif-result").animate({ scrollLeft: "+=200" }, 500);
});

// $(".arrow-right").mouseout(function() {
//   event.preventDefault();

//   $(".arrow-right").animate({
//     width: 50
//   });
//});

//scroll-left
$(".arrow-left").mouseover(function() {
  event.preventDefault();
  console.log("hover");
  //   $(".arrow-left").animate({
  //     width: 60
  //   });

  $(".Gif-result").animate({ scrollLeft: "-=200" }, 500);
});

// $(".arrow-left").mouseout(function() {
//   event.preventDefault();

//   $(".arrow-left").animate({
//     width: 50
//   });
// });

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

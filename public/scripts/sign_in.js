$( "#nav-bar text.compose" ).click(function() {
  $( "main.container section.new-tweet" ).slideToggle("slow", function() {
    $("textarea").focus();
  });
});

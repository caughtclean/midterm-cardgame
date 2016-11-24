$(() => {
  $.ajax({
    method: "GET",
    url: "/api/games"
  }).done((games) => {
    for(game of games) {
      $("<div>").text("Game", game.id).appendTo($("body"));
    }
  });;
});

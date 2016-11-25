
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/games"
  }).done((games) => {
    for(game of games) {
      createGameElement(game).appendTo($("#games-container"));
    }
  });;
});



function createGameElement(game) {
   //create variabled for gameer data,
   //used to append to html elements
   var name = game.type;
   var avatar = "/images/suits.png";

   //to be appended to #game-container
   var $game = $("<article>").addClass("game");//.append(gameData.context.text);
   //to be appended to $game
   var $header = $("<header>");
   var $body = $("<p>");
   var $footer = $("<footer>");
   //to be appended to $header
   var $avatar = $("<img>").attr("src", avatar);  //.addClass("img").append(gameData.user.avatars);
   var $name = $("<text>").append(name);
   //to be appended to $footer
   //footer children appended to footer
   //header children appended to
   ($avatar).appendTo($header);
   ($name).appendTo($header);
   //append header to game article
   ($header).appendTo($game);
   ($body).appendTo($game);
   ($footer).appendTo($game);

   return $game;
 };


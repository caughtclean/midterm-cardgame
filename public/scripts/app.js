
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
   var turn = game.whose_turn;
   var host = game.host_name;
   var guest = game.guest_name;

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
   var $player = $("<text>").append(host +" vs "+guest);
   var $turn = $("<p>").append("It is ", turn, "\'s turn");
   //to be appended to $footer
   //footer children appended to footer
   //header children appended to
   ($avatar).appendTo($header);
   ($name).appendTo($header);
   ($player).appendTo($header);
   ($turn).appendTo($header);

   //append header to game article
   ($header).appendTo($game);
   ($body).appendTo($game);
   ($footer).appendTo($game);

   return $game;
 };


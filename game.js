// Variables
var started = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];


// play sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// even handler keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// event handler button press
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // play the user chosen color's Audio
  playSound(userChosenColor);

  // animate button press
  animatePress(userChosenColor);

  // console.log(userClickedPattern);
  console.log(userClickedPattern);

  // check answer after button click
  checkAnswer(userClickedPattern.length-1);
});


// button pressed animation function
function animatePress(currentColor) {
  // add pressed class to button
  $("#" + currentColor).addClass("pressed");

  // remove pressed class from button after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Next sequence function
function nextSequence() {
  // reset user clicked pattern at start of next sequence
  userClickedPattern = [];

  // choose random color and add to game pattern array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // animate the random chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // play the random chosen color's Audio
  playSound(randomChosenColor);

  // add one to the current level
  level++;

  // update the h1 to display current level
  $("#level-title").text("Level " + level);
}


// check answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    console.log("wrong");

    startOver();
  }
}


// start over function
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

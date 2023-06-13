//Constant variable to store the ID of a textbox that is used for displaying the turn, winner, or "tie"
var STATUS_BOX_ID = "statusBox";

//Constant variable to store the ID of the game header that changes color when a winner is declared
var GAME_HEADING_ID = "ticTacToeText";

// Two players, X and O
// X Player always starts in the beginning of the game
// "turn" is either 0 or 1 which represents the index in the "players" array
var PLAYER1 = "X";
var PLAYER2 = "O";
var players = [PLAYER1, PLAYER2];
var turn = 0; 

//Variable for keeping the game status, which is updated by checkGameStatus function
// 1 => Winner declared
// 0 => Game to be continued
// -1 => Game tied
var WIN = 1;
var CONT = 0;
var TIE = -1;
var gameStatus;

// Variable for keeping the winner of the game, which is updated by checkGameStatus function
var gameWinner = null;

//Counts the number of moves made in the game
var MIN_MOVES = 5;
var MAX_MOVES = 9;
var moves = 1;

//Squares in the grid; letters represent rows, and numbers represent column numbers
var cells = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

//Sets up the click event for each cell
for (var index=0; index < cells.length; index++) {
  var cell = cells[index];
  createClickEvent(cell);
}

/*
  Handling the click event after user clicks a cell on the game:
  1. Checks if each spot is taken before it is marked 
  2. Mark the spot
  3. Checks if the game has been won or tie or should be continued
  4. If game is won or tie, display color effects accordingly
*/
function createClickEvent(cell) {
  onEvent(cell, "click", function() {
    var occupied = checkSpot(cell);
    if (occupied) return;
    var player = currentTurn(); // X or O
    setProperty(cell, "text", player);
    checkGameStatus(cells);
    if (gameStatus === WIN ) {
      setProperty(STATUS_BOX_ID, "text", gameWinner + " WON");
      colorSwitch(STATUS_BOX_ID, gameStatus);
      colorSwitch(GAME_HEADING_ID, gameStatus);
    } else if (gameStatus === TIE) {
      setProperty(STATUS_BOX_ID, "text", "GAME TIED");
      colorSwitch(STATUS_BOX_ID, gameStatus);
      colorSwitch(GAME_HEADING_ID, gameStatus);
    } else {
      var nextPlayer = toggleTurn();
      setProperty(STATUS_BOX_ID, "text", "TURN: " + nextPlayer);
      moves++;
    }
  });
}

/*Checks for a triple in every row, column, and the two diagonals
  If a triple is found, a winner is declared based on which player got it (X or O)
  If not, the game continues or a draw is declared if all spots are taken
*/
function checkGameStatus (cells) {
  // Looping the grid to find out how many inputs so far
  var numOfInputs = 0;
  for (var index =0; index < cells.length; index++) {
    var cellText = getText(cells[index]);
    if (cellText != "") {
      numOfInputs += 1;
    }
  }
  // Check if no. of inputs < 5. If so, the game should just continue (no winner or no tie yet)
  if (numOfInputs < MIN_MOVES) {
    gameStatus = CONT;
    return;
  }
  
  var markA1 = getText("a1");
  var markA2 = getText("a2");
  var markA3 = getText("a3");
  var markB1 = getText("b1");
  var markB2 = getText("b2");
  var markB3 = getText("b3");
  var markC1 = getText("c1");
  var markC2 = getText("c2");
  var markC3 = getText("c3");
  
  if (markA1 === PLAYER1 && markA2 === PLAYER1 && markA3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markA1 === PLAYER2 && markA2 === PLAYER2 && markA3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markA1 === PLAYER1 && markB2 === PLAYER1 && markC3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markA1 === PLAYER2 && markB2 === PLAYER2 && markC3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markA1 === PLAYER1 && markB1 === PLAYER1 && markC1 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markA1 === PLAYER2 && markB1 === PLAYER2 && markC1 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markC1 === PLAYER1 && markB2 === PLAYER1 && markA3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markC1 === PLAYER2 && markB2 === PLAYER2 && markA3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markB1 === PLAYER1 && markB2 === PLAYER1 && markB3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markB1 === PLAYER2 && markB2 === PLAYER2 && markB3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markC1 === PLAYER1 && markC2 === PLAYER1 && markC3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markC1 === PLAYER2 && markC2 === PLAYER2 && markC3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markA2 === PLAYER1 && markB2 === PLAYER1 && markC2 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markA2 === PLAYER2 && markB2 === PLAYER2 && markC2 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  if (markA3 === PLAYER1 && markB3 === PLAYER1 && markC3 === PLAYER1) {
    gameWinner = PLAYER1;
    gameStatus = WIN;
  }
  if (markA3 === PLAYER2 && markB3 === PLAYER2 && markC3 === PLAYER2) {
    gameWinner = PLAYER2;
    gameStatus = WIN;
  }
  //If the amount of moves made is still less than the maximum amount of moves possible, the game continues
  if (moves < MAX_MOVES && gameWinner === null) {
    gameStatus = CONT;
  }
  //If the maximum amount of moves is met and no winner is declared yet, the game is tied
  if (moves === MAX_MOVES && gameWinner === null) {
    gameStatus = TIE;
  }
}

//Function for alternating turns and return the next player
function toggleTurn() {
  turn = 1 - turn;
  return players[turn];
}

//Returns the current player of the turn
function currentTurn() {
  return players[turn];
}

/*
  Checks if the spot is taken before the user can take it
  parameter 'spot' - any spot on the grid, e.g. 'a1', 'b1'...etc 
  if the spot is taken, returns true; if not, returns false
*/
function checkSpot(spot) {
  //Checks if the spot is marked by X or O
  var text = getText(spot);
  return (text === PLAYER1 || text === PLAYER2); 
}

/*
  Flashes the text color of the text represented by boxId
  boxId - ID of the target 
  gameStatus - the outcome of the game
*/
function colorSwitch(boxId, gameStatus) {
  // No. of times color will flash when the game wins or ties
  var WIN_COLOR_FLASH_COUNT = 100000;
  var TIE_COLOR_FLASH_COUNT = 50000;
  
  //List of preset 20 colors in hex decimal format
  var colors = [
    "#FF0000", // red
    "#00FF00", // green
    "#0000FF", // blue
    "#FFFF00", // yellow
    "#FF00FF", // magenta
    "#00FFFF", // cyan
    "#800080", // purple
    "#FFA500", // orange
    "#008000", // dark green
    "#000000", // black
    "#FFC0CB", // pink
    "#808000", // olive
    "#FF8C00", // dark orange
    "#FFD700", // gold
    "#7CFC00", // lawn green
    "#ADD8E6", // light blue
    "#87CEEB", // sky blue
    "#E6E6FA", // lavender
    "#F0E68C", // khaki
    "#D2B48C" // tan
  ];

  //Variable to store a random number
  var randColorIndex;
  
  // Determine how many times the color should flash depending on the game status
  var flashCount;
  if (gameStatus == WIN) {
    flashCount = WIN_COLOR_FLASH_COUNT;
  } else if (gameStatus == TIE) {
    flashCount = TIE_COLOR_FLASH_COUNT;
  }
  
  // Flashing the colors
  for (var i = 0; i < flashCount; i++) {
    //Picks a random number
    randColorIndex = Math.floor(Math.random() * 19);
    //Picks a color according to the random number and changes the text color
    setProperty(boxId, "text-color", colors[randColorIndex]);
  }
}

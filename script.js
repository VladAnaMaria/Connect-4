//get current player

let currentPlayer;

function displaycurrentPlayer() {
    if (currentPlayer == 1) {
        document.getElementById('player-turn').innerHTML = 'Player 1';
        document.getElementById('player-ball').className = 'red';
    } else {
        document.getElementById('player-turn').innerHTML = 'Player 2';
        document.getElementById('player-ball').className = 'yellow';
    }
}

//generate board

let gameHasStarted = 0;
let board;
let totalRow = 6;
let totalColumn = 7;
let counterMoves = 0;

function generateBoard() {
    document.querySelector('.start-screen').style.visibility = 'hidden';
    currentPlayer = Math.floor(Math.random() * 2) + 1;
    displaycurrentPlayer();

    board = [];
    
    for (let i = 0; i < totalRow; ++i) {
        let row = [];
        for (let j = 0; j < totalColumn; ++j) {
            row.push(0);
            let col = document.createElement('div');
            col.classList.add('board');
            col.id = i.toString() + j.toString();
            document.getElementById('board-box').append(col);
            col.onclick = function() { clickCol(parseInt(j)); };
        }
        board.push(row);
    }
}

//set circle when click the column
function clickCol(colId) {
    if (gameHasStarted == 0) {
        gameHasStarted = 1;
        myInterval = setInterval(stopwatch, 1000);
    }

    let i = totalRow - 1;
    let j = colId;

    while(board[i][j] != 0) {
        --i;
    }

    board[i][j] = currentPlayer;
    ++counterMoves;
    
    if (currentPlayer == 1) {
        document.getElementById(i.toString() + j.toString()).className = 'red-board';
        currentPlayer = 2;   
    } else {
        document.getElementById(i.toString() + j.toString()).className = 'yellow-board';
        currentPlayer = 1;
    }

    if (checkWin() == 1) {
        gameOverWin();
    } else {
        displaycurrentPlayer();
        if (counterMoves == totalColumn * totalRow) {
            gameOverDraw();
        }
    }
}

//check equality for coordinates

function equalityCheck(x, y, z, w) {
    if (x != 0 && x == y && y == z && z == w) {
        return true;
    }
    return false;
}

//check winner
function checkWin() {
    //horizontally
    for (let i = 0; i < totalRow; ++i) {
        for (let j = 0; j < totalColumn - 3; ++j) {
            if (equalityCheck(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) {
                return 1;
            }
        }
    }

    //vertically
    for (let j = 0; j < totalColumn; ++j) {
        for (let i = 0; i < totalRow - 3; ++i) {
            if (equalityCheck(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) {
                return 1;
            }
        }
    }

    //main diagonal
    for (let i = 0; i < totalRow - 3; ++i) {
        for (let j = 0; j < totalColumn - 3; ++j) {
            if (equalityCheck(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3])) {
                return 1;
            }
        }
    }

    //secondary diagonal
    for (let i = 3; i < totalRow; ++i) {
        for (let j = 0; j < totalColumn - 3; ++j) {
            if (equalityCheck(board[i][j], board[i - 1][j + 1], board[i - 2][j + 2], board[i - 3][j + 3])) {
                return 1;
            }
        }
    }
    return 0;
}

//game over
//game over - win
function gameOverWin() {
    clearInterval(myInterval);
    gameHasStarted = 0;
    if (currentPlayer == 2) {
        document.getElementById("player-turn").innerHTML = 'Red win!';
    } else {
        document.getElementById("player-turn").innerHTML = 'Yellow win!';
    }
    return;
}

//game over - draw
function gameOverDraw() {
    gameHasStarted = 0;
    clearInterval(myInterval);
    document.getElementById('player-ball').className = 'grey';
    document.getElementById("player-turn").innerHTML = 'Draw!';
    return; 
}

//stopwatch
document.getElementById('stopwatch').innerHTML = '00:00';

let time = 0;
let myInterval;

function stopwatch() {
    time += 1000;
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor((time/1000) % 60);
    document.getElementById('stopwatch').innerHTML = minutes + ":" + seconds;
}
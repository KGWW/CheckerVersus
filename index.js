var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


http.listen( port, function () {
    console.log('listening on port', port);
});

app.use(express.static(__dirname + '/public'));

let numUsers = 0;
var board = [];

io.on('connection', (socket) => {

	console.log('A user connected');

    numUsers++;

    initBoard();
});

function initBoard() {
    // iterate through the rows
    for (let i = 0; i < 9; i++) {
        var row = [];
        board[i] = row;
        board[i].push("<tr>");

        // these indices represent the rows that will have pieces placed on
        if (i == 0 || i == 2 || i == 6 || i == 8) {
            // iterate through the columns
            for (var j = 0; j < 9; j++) {
                // if the index is even, place a piece
                if (j % 2 == 0) {
                    row.push("<td id='b" + i + j + "'><div id='" + i + j + "'></div></td>");

                    // this array is intended to keep track of all the indices of the pieces
                    piecesIndex.push("#piece" + i + j);
                }
                else
                    row.push("<td></td>");
            }
        }
        // these indices represent the rows that will have pieces placed on
        else if (i == 1 || i == 7) {
            for (var j = 0; j < 9; j++) {
                if (j % 2 == 1) {
                    row.push("<td id='b" + i + j + "'><div id='" + i + j + "'></div></td>");
                    piecesIndex.push("#piece" + i + j);
                }
                else
                    row.push("<td></td>");
            }
        }
        // the row will not contain any pieces
        else if (i == 3 || i == 5) {
            for (var j = 0; j < 9; j++) {
				if (j % 2 == 1) {
					row.push("<td id='b" + i + j + "'><div id='" + i + j + "' class='noPiece'></div></td>");
				}else{
					row.push("<td></td>");
				}
			}
		}else if(i == 4) {
			for (var j = 0; j < 9; j++) {
				if (j % 2 == 0) {
					row.push("<td id='b" + i + j + "'><div id='" + i + j + "' class='noPiece'></td>");
				}else{
					row.push("<td></td>");
				}
			}
		}

        // assign the row to the board
        board[i] = row;
        board[i].push("</tr>");
    }

    // add the start pieces. Only intialize pieces when 2 players are joined
		// initPieces();
		// p1Pieces = piecesIndex.slice(0, 14);
		// p2Pieces = piecesIndex.slice(14);

	//console.log(p1Pieces);
	//console.log(p2Pieces);
	// console.log(piecesIndex);
	// console.log(board);

    return board;
}

var PlayerGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
var PlayerCompGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
var compGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
var compPlayerGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];

var playerShips = 5;
var compShips = 5;
var turn = 1;
var gameover = false;
var lastHit = 0;
var lastHitCord = []; 
var compHits = 0;
var lastDir = "";

function ship(name, size, marker, location, orientation) {
	this.name = name;
	this.size = size;
	this.marker = marker;
	this.location = location;
	this.orientation = orientation;
	this.hit = 0;
}

var destroyer = new ship("Destroyer", 2, 1, [[3,5], [3,6]], 0);
var submarine = new ship("Submarine", 3, 2, [[1,3], [2,3], [3,3]], 1);
var cruiser = new ship("Cruiser", 3, 3, [[7,1],[7,2],[7,3]], 0);
var battleship = new ship("Battleship", 4, 4, [[5,8],[6,8],[7,8],[8,8]], 1);
var carrier = new ship("Carrier", 5, 5, [[10,6],[10,7],[10,8],[10,9],[10,10]], 0); 


var comp_destroyer = new ship("Destroyer", 2, 1, [[1,1], [1,2]], 0);
var comp_submarine = new ship("Submarine", 3, 2, [[4,1], [4,2], [4,3]], 1);
var comp_cruiser = new ship("Cruiser", 3, 3, [[10,3],[10,4],[10,5]], 0);
var comp_battleship = new ship("Battleship", 4, 4, [[6,5],[6,6],[6,7],[6,8]], 1);
var comp_carrier = new ship("Carrier", 5, 5, [[5,10],[6,10],[7,10],[8,10],[9,10]], 0); 




var request = new XMLHttpRequest();
request.open('GET', 'playerdata.json', false);
request.send();
var playerdata = JSON.parse(request.responseText);

var destroyer = new ship(playerdata[0].name, playerdata[0].size, playerdata[0].marker, playerdata[0].location);
var submarine = new ship(playerdata[1].name, playerdata[1].size, playerdata[1].marker, playerdata[1].location);
var cruiser = new ship(playerdata[2].name, playerdata[2].size, playerdata[2].marker, playerdata[2].location);
var battleship = new ship(playerdata[3].name, playerdata[3].size, playerdata[3].marker, playerdata[3].location);
var carrier = new ship(playerdata[4].name, playerdata[4].size, playerdata[4].marker, playerdata[4].location); 

genShipPlace(comp_destroyer);
genShipPlace(comp_submarine);
genShipPlace(comp_cruiser);
genShipPlace(comp_battleship);
genShipPlace(comp_carrier);


addShip(destroyer, PlayerGrid);
addShip(cruiser, PlayerGrid);
addShip(submarine, PlayerGrid);
addShip(battleship, PlayerGrid);
addShip(carrier, PlayerGrid);

function addShip(ship, gridData) {
	for (var i = 0; i < ship.location.length; i++) {
		for (var y = 0; y < 2; y++) {
			gridData[ship.location[i][y] - 1][ship.location[i][y+1] - 1] = ship.marker;	
		}
	}
}

 /*
addShip(comp_destroyer, compGrid)
addShip(comp_cruiser, compGrid)
addShip(comp_submarine, compGrid)
addShip(comp_battleship, compGrid)
addShip(comp_carrier, compGrid)
*/

function hitGrid(row, col, player) {
	if (player == 1) {
		PlayerCompGrid[row][col] = 1;
	}
	else {
	compPlayerGrid[row][col] = 1;
	}
}

function getPlayerCell(row, col){
	return PlayerGrid[row][col];
}

function getCompCell(row, col) {
	if (row == (-1)) {
		return 1;
	}
	if (col == (-1)) {
		return 1;
	}
	if (row == 10) {
		return 1;
	}
	if (col == 10) {
		return 1;
	}
	return compGrid[row][col];
}

function getPlayerCompCell(row,col) {
	return PlayerCompGrid[row][col];
}

function getCompPlayerCell(row, col) {
	if (row == (-1)) {
		row = row + 1;
	}
	if (col == (-1)) {
		col = col + 1;
	}
	if (row == 10) {
		row = row - 1;
	}
	if (col == 10) {
		col = col - 1;
	}
	return compPlayerGrid[row][col];
}
function getJsonFile() {
	return playerdata;
}

function shipHit(marker, player) {
	switch(marker) {
		case 1:
			if (player == 1) {
				destroyer.hit += 1;
				if (destroyer.hit >= destroyer.size) {
					playerShips -= 1;
					alert("Your destoryer has ben sunk!");
					lastHit = 0;
					if (playerShips <= 0) {
						gameover = true;
					}
				}
					break;
				
			}
			else {
				comp_destroyer.hit += 1;
				if (comp_destroyer.hit >= comp_destroyer.size) {
					compShips -= 1;
					alert("The computer's destoryer has ben sunk!");
					if (compShips <= 0) {
						alert("Player wins!");
						gameover = true;
					}
				}
					break;
			
	}
		case 2:
			if (player == 1) {
				submarine.hit += 1;
				if (submarine.hit >= submarine.size) {
					playerShips -= 1;
					alert("Your submarine has ben sunk!"); 
					lastHit = 0;
					if (playerShips <= 0) {
						alert("Computer wins!");
						gameover = true;
					}
				}
					break;
				
			}
			else {
				comp_submarine.hit += 1;
				if (comp_submarine.hit >= comp_submarine.size) {
					compShips -= 1;
					alert("The computer's submarine has ben sunk!");
					if (compShips <= 0) {
						alert("Player wins!");
						gameover = true;
					}
				}
					break;
			
}
		case 3:
			if (player == 1) {
				cruiser.hit += 1;
				if (cruiser.hit >= cruiser.size) {
					playerShips -= 1;
					alert("Your cruiser has ben sunk!");
					lastHit = 0;
					if (playerShips <= 0) {
						alert("Computer wins!");
						gameover = true;
					}
				}
					break;
				
			}
			else {
				comp_cruiser.hit += 1;
				if (comp_cruiser.hit >= comp_cruiser.size) {
					compShips -= 1;
					alert("The computer's cruiser has ben sunk!");
					if (compShips <= 0) {
						alert("Player wins!");
						gameover = true;
					}
				}
					break;
			
}
		case 4:
			if (player == 1) {
				battleship.hit += 1;
				if (battleship.hit >= battleship.size) {
					playerShips -= 1;
					alert("Your battleship has ben sunk!");
					lastHit = 0;
					if (playerShips <= 0) {
						alert("Computer wins!");
						gameover = true;
					}
				}
					break;
				
			}
			else {
				comp_battleship.hit += 1;
				if (comp_battleship.hit >= comp_battleship.size) {
					compShips -= 1;
					alert("The computer's battleship has ben sunk!");
					if (compShips <= 0) {
						alert("Player wins!");
						gameover = true;
					}
				}
					break;
			
}
		case 5:
			if (player == 1) {
				carrier.hit += 1;
				if (carrier.hit >= carrier.size) {
					playerShips -= 1;
					alert("Your carrier has ben sunk!");
					lastHit = 0;
					if (playerShips <= 0) {
						alert("Computer wins!");
						gameover = true;
				}
					break;
				
			}
			}
			else {
				comp_carrier.hit += 1;
				if (comp_carrier.hit >= comp_carrier.size) {
					compShips -= 1;
					alert("The computer's carrier has ben sunk!");
					if (compShips <= 0) {
						alert("Player wins!");
						gameover = true;
					}
				}
					break;
			
}
}
}

function gameOver() {
	return gameover;
}

function turn() {
	return turn;
}

function setTurn(val) {
	turn = val;
}

function compTurn() {
	var check = false;
	var row;
	var col;
	var data;
	
	if (lastHit == 2) {
		while (check != true) {
			if (lastDir == "left") {
				if (getCompPlayerCell(lastHitCord[0],lastHitCord[1] - 1) == 0) {
					row = lastHitCord[0];
					col = lastHitCord[1] - 1;
					if (PlayerGrid[row][col] != 0) {
						lastHitCord = [row, col];
						compPlayerGrid[row][col] = 1;
						return lastHitCord;
					}
					else {
						data = [row, col];
						compPlayerGrid[row][col] = 1;
						lastDir = "right";
						while (compPlayerGrid[row][col] != 0) {
							col = col + 1;
						}
						lastHitCord = [row, col - 1];
						return data;
					}
				}
				else {
					row = lastHitCord[0];
					col = lastHitCord[1];
					while (compPlayerGrid[row][col] != 0) {
						col = col + 1;
					}
					lastHitCord = [row, col - 1];
					lastDir = "right";
					continue;
				}
			}
			else if (lastDir == "right") {
				if (getCompPlayerCell(lastHitCord[0],lastHitCord[1] + 1) == 0) {
					row = lastHitCord[0];
					col = lastHitCord[1] + 1;
					if (PlayerGrid[row][col] != 0) {
						lastHitCord = [row, col];
						compPlayerGrid[row][col] = 1;
						return lastHitCord;
					}
					else {
						data = [row, col];
						compPlayerGrid[row][col] = 1;
						lastDir = "left";
						return data;
					}
				}
				else {
					lastDir = "right";
					continue;
				}
			
			}
			else if (lastDir == "up") {
				if (getCompPlayerCell(lastHitCord[0] - 1,lastHitCord[1]) == 0) {
					row = lastHitCord[0] - 1;
					col = lastHitCord[1];
					if (PlayerGrid[row][col] != 0) {
						lastHitCord = [row, col];
						compPlayerGrid[row][col] = 1;
						return lastHitCord;
					}
					else {
						data = [row, col];
						compPlayerGrid[row][col] = 1;
						lastDir = "down";
						return data;
					}
				}
				else {
					row = lastHitCord[0];
					col = lastHitCord[1];
					while (compPlayerGrid[row][col] != 0) {
						row = row + 1;
					}
					lastHitCord = [row - 1, col];
					lastDir = "down";
					continue;
				}
			
			}
			else if (lastDir == "down") {
				if (getCompPlayerCell(lastHitCord[0] + 1,lastHitCord[1]) == 0) {
					row = lastHitCord[0] + 1;
					col = lastHitCord[1];
					if (PlayerGrid[row][col] != 0) {
						lastHitCord = [row, col];
						compPlayerGrid[row][col] = 1;
						return lastHitCord;
					}
					else {
						data = [row, col];
						compPlayerGrid[row][col] = 1;
						lastDir = "up";
						return data;
					}
				}
				else {
					lastDir = "up";
					continue;
				}
			
			}
			else {
				lastHit = 0;
				check = true;
			}
		}
	}
	
	if (lastHit == 1) {
		while (check != true) {
			if (getCompPlayerCell(lastHitCord[0],lastHitCord[1] - 1) == 0) {
				row = lastHitCord[0];
				col = lastHitCord[1] - 1;
				if (PlayerGrid[row][col] != 0) {
					lastHit = 2;
					lastDir = "left";
					lastHitCord = [row, col];
					compPlayerGrid[row][col] = 1;
					return lastHitCord;
				}
				else {
					lastHit = 1; 
					data = [row, col];
					compPlayerGrid[row][col] = 1;
					return data;
				}
			}
			else if (getCompPlayerCell(lastHitCord[0] - 1,lastHitCord[1]) == 0) {
				row = lastHitCord[0] - 1;
				col = lastHitCord[1];
				if (PlayerGrid[row][col] != 0) {
					lastHit = 2;
					lastDir = "up";
					lastHitCord = [row, col];
					compPlayerGrid[row][col] = 1;
					return lastHitCord;
				}
				else {
					lastHit = 1; 
					data = [row, col];
					compPlayerGrid[row][col] = 1;
					return data;
				}
			}
			else if (getCompPlayerCell(lastHitCord[0],lastHitCord[1] + 1) == 0) {
				row = lastHitCord[0];
				col = lastHitCord[1] + 1;
				if (PlayerGrid[row][col] != 0) {
					lastHit = 2;
					lastDir = "right";
					lastHitCord = [row, col];
					compPlayerGrid[row][col] = 1;
					return lastHitCord;
				}
				else {
					lastHit = 1; 
					data = [row, col];
					compPlayerGrid[row][col] = 1;
					return data;
				}
			}
			else if (getCompPlayerCell(lastHitCord[0] + 1,lastHitCord[1]) == 0) {
				row = lastHitCord[0] + 1;
				col = lastHitCord[1];
				if (PlayerGrid[row][col] != 0) {
					lastHit = 2;
					lastDir = "down";
					lastHitCord = [row, col];
					compPlayerGrid[row][col] = 1;
					return lastHitCord;
				}
				else {
					lastHit = 1; 
					data = [row, col];
					compPlayerGrid[row][col] = 1;
					return data;
				}
			}
			else {
				lastHit = 0;
				check = true;
			}
		}
	}
	
	//Check to see if the cell has been hit before
	while (check != true) {
		row = Math.floor(Math.random() * 10);
		col = Math.floor(Math.random() * 10);
		if (compPlayerGrid[row][col] == 0) {
			compPlayerGrid[row][col] = 1;
			check = true;
		}
	}
	
	if (PlayerGrid[row][col] != 0) {
		lastHit = 1;
		lastHitCord = [row, col];
		return lastHitCord;
	}

	data = [row, col]
	return data;
}
function genShipPlace(ship) {
	var check = true; 
	loop:
	while (check == true) {
		var row = Math.floor(Math.random()* 10); 
		var col = Math.floor(Math.random()* 10); 
		var orientation = Math.floor(Math.random() * 2);
		
		if (orientation == 0) {
			for (var i = 0; i < ship.size; i++) {
				if (getCompCell(row,col + i) != 0) {
					continue loop;
				}
			}
			for (var z = 0; z < ship.size; z++) {
				compGrid[row][col + z] = ship.marker;
			}
			check = false;
		}
		else {
			for (var i = 0; i < ship.size; i++) {
				if (getCompCell(row + i,col) != 0) {
					continue loop;
				}
			}
			for (var z = 0; z < ship.size; z++) {
				compGrid[row + z][col] = ship.marker;
			}
			check = false;
		}
	}
}

function resetModel() {
	PlayerGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
	PlayerCompGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
	compGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];
	compPlayerGrid = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]];

	playerShips = 5;
	compShips = 5;
	turn = 1;
	gameover = false;
	lastHit = 0;
	lastHitCord = []; 
	compHits = 0;
	lastDir = "";



	destroyer = new ship("Destroyer", 2, 1, [[3,5], [3,6]], 0);
	submarine = new ship("Submarine", 3, 2, [[1,3], [2,3], [3,3]], 1);
	cruiser = new ship("Cruiser", 3, 3, [[7,1],[7,2],[7,3]], 0);
	battleship = new ship("Battleship", 4, 4, [[5,8],[6,8],[7,8],[8,8]], 1);
	carrier = new ship("Carrier", 5, 5, [[10,6],[10,7],[10,8],[10,9],[10,10]], 0); 


	comp_destroyer = new ship("Destroyer", 2, 1, [[1,1], [1,2]], 0);
	comp_submarine = new ship("Submarine", 3, 2, [[4,1], [4,2], [4,3]], 1);
	comp_cruiser = new ship("Cruiser", 3, 3, [[10,3],[10,4],[10,5]], 0);
	comp_battleship = new ship("Battleship", 4, 4, [[6,5],[6,6],[6,7],[6,8]], 1);
	comp_carrier = new ship("Carrier", 5, 5, [[5,10],[6,10],[7,10],[8,10],[9,10]], 0); 




	request = new XMLHttpRequest();
	request.open('GET', 'playerdata.json', false);
	request.send();
	playerdata = JSON.parse(request.responseText);

	destroyer = new ship(playerdata[0].name, playerdata[0].size, playerdata[0].marker, playerdata[0].location);
	submarine = new ship(playerdata[1].name, playerdata[1].size, playerdata[1].marker, playerdata[1].location);
	cruiser = new ship(playerdata[2].name, playerdata[2].size, playerdata[2].marker, playerdata[2].location);
	battleship = new ship(playerdata[3].name, playerdata[3].size, playerdata[3].marker, playerdata[3].location);
	carrier = new ship(playerdata[4].name, playerdata[4].size, playerdata[4].marker, playerdata[4].location); 

	genShipPlace(comp_destroyer);
	genShipPlace(comp_submarine);
	genShipPlace(comp_cruiser);
	genShipPlace(comp_battleship);
	genShipPlace(comp_carrier);


	addShip(destroyer, PlayerGrid);
	addShip(cruiser, PlayerGrid);
	addShip(submarine, PlayerGrid);
	addShip(battleship, PlayerGrid);
	addShip(carrier, PlayerGrid);

}
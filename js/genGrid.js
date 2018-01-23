function showGrid(){
	var gridDiv2 = document.getElementById("gameGridDiv");
	var gridDiv = document.getElementById("gameGridDiv2");
	gridDiv2.innerHTML = genCompGrid(10,10) 
	gridDiv.innerHTML = genGrid(10,10)
	var c = document.getElementById("myCanvas");
	paintCanvas(c);
	startGame();
}

function genGrid(x,y){
	var table = '';
	height = x;
	length = y;
	
	table += '<table>';
	
	for (i = 0; i < x; i++)
	{
		table += '<tr>';
		for (z = 0; z < y; z++)
		{
			if (getPlayerCell(i,z) != 0) {
				if (getCompPlayerCell(i,z) == 1) {
					shipHit(getPlayerCell(i,z), 1);
					table += '<td class="hit"> <img src="img/ship.png"></td>' ;
				}
				else {
					table += '<td> <img src="img/ship.png">';
				}
			}
			else if (getCompPlayerCell(i,z) == 1){
				table += '<td class="miss"></td>';
			}
			else {
				table += '<td></td>';
			}
		}
		table += '</tr>';
	}
	table += '</table>';
	return table;
}

function genCompGrid(x,y){
	var table = '';
	height = x;
	length = y;
	
	table += '<table>';
	
	for (i = 0; i < x; i++)
	{
		table += '<tr>';
		for (z = 0; z < y; z++)
		{
			if (getCompCell(i,z) != 0) {
				if (getPlayerCompCell(i,z) == 1) {
					shipHit(getCompCell(i,z), 2)
					table += '<td class="hit"> </td>' ;
				}
				else {
					table += '<td> </td>';
				}
			}
			else if (getPlayerCompCell(i,z) == 1){
				table += '<td class="miss"></td>';
			}
			else {
				table += '<td></td>';
			}
			
		}
		table += '</tr>';
	}
	table += '</table>';
	return table;
}

function addClickHandlers() {
	var playerGrid = document.getElementById("gameGridDiv");
	var playerCells = playerGrid.getElementsByTagName("td");
	
	for (var i = 0; i < playerCells.length; i++) {
		playerCells[i].onclick = changePlayerCell;
	}
	
	/*
	var compGrid = document.getElementById("gameGridDiv2");
	var compCells = compGrid.getElementsByTagName("td");
	
	for (var i = 0; i < compCells.length; i++) {
		compCells[i].onclick = changeCompCell;
	}
	*/
	
}

function changePlayerCell() {
	var col = this.cellIndex;
	var row = this.parentNode.rowIndex;
	if (getPlayerCompCell(row, col) != 0) {
		return;
	}
	if (getCompCell(row,col) != 0) {
		this.className = "hit";
		shipHit(getCompCell(row,col), 2)
		hitGrid(row, col, 1);
	}
	else {
		this.className = "miss"
		hitGrid(row, col, 1);
	}
	
	row += 1;
	col += 1;
	var cordDiv = document.getElementById("cord");
	cordDiv.innerHTML = "row: " + row + " col: " + col;	
	if (gameOver() == true) {
		resetGame();
	}
	else {
		aiTurn();
	}
}

function changeCompCell() {
	var col = this.cellIndex;
	var row = this.parentNode.rowIndex;
	if (getCompPlayerCell(row, col) !=0) {
		return;
	}
	if (getPlayerCell(row,col) != 0) {
		this.className = "hit";
		shipHit(getPlayerCell(row,col), 1);
		hitGrid(row, col, 2);
	}
	else {
		this.className = "miss";
		hitGrid(row, col, 2);
	}
	
	row += 1;
	col += 1;
	var cordDiv = document.getElementById("cord");
	cordDiv.innerHTML = "row: " + row + " col: " + col;
}

function startGame() {
	addClickHandlers();
}

function aiTurn() {
	var compDiv = document.getElementById("gameGridDiv2");
	var compTable = compDiv.getElementsByTagName("table");
	var cord = compTurn();
	if (getPlayerCell(cord[0],cord[1]) != 0) {
		compTable[0].rows[cord[0]].cells[cord[1]].className = "hit";
		shipHit(getPlayerCell(cord[0],cord[1]), 1);
	}
	else {
		compTable[0].rows[cord[0]].cells[cord[1]].className = "miss";
	}
	if (gameOver() == true) {
		resetGame();
	}
}

function resetGame() {
	resetModel();
	showGrid();
}

function paintCanvas(canvas) {
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Lucida Console";
	ctx.strokeText("Battleship", 50,100);
}
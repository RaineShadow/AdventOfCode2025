import fs from'fs';
import readLine from 'readline';

export function day4(){
	console.log("Starting day 4");
	processLineByLine();
}

let paperMatrix = [];
let paperCount = 0;
let accessiblePaper = 0;

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day4/input_paper.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
		processCharByChar(line);
	}

	processPaper();
	console.log("Accessible Paper: " + accessiblePaper);
}

function processCharByChar(line){
	for(let i = 0; i < line.length; i++){
		if(i == 0){
			paperMatrix[paperCount] = [];
		}

		paperMatrix[paperCount][i] = line.charAt(i);

		if(i == (line.length - 1)){
			paperCount++;
		}
	}
}

function processPaper() {
	//Row number
	for(let i = 0; i < paperMatrix.length; i++){
		//Column number
		for(let j = 0; j < paperMatrix[i].length; j++){
			if(paperMatrix[i][j] == '@'){
				console.log("paper at " + i + ", " + j);
				let fewRollsOfPaper = checkSurroundingPaper(i, j, paperMatrix[i].length);
				console.log("fewRollsOfPaper: " + fewRollsOfPaper);
				console.log("")
				if(fewRollsOfPaper){
					accessiblePaper += 1;
				}
			}
		}
	}
}

function checkSurroundingPaper(row, column, rowLength){
	let rowAbove = (row - 1) >= 0;
	let rowBelow = (row + 1) < paperMatrix.length;
	let columnLeft = (column - 1) >= 0;
	let columnRight = (column + 1) < rowLength;

	let rowAboveNum = (row - 1);
	let rowBelowNum = (row + 1);
	let columnLeftNum = (column - 1);
	let columnRightNum = (column + 1);

	let paperCount = 0;

	//console.log("rowAbove: " + rowAbove + " rowBelow: " + rowBelow + " columnLeft: " + columnLeft + " columnRight: " + columnRight);

	//check rowAbove and columnLeft
	//check rowAbove and column
	//check rowAbove and columnRight
	if(rowAbove){
		if(columnLeft){
			paperCount += isPaper(paperMatrix[rowAboveNum][columnLeftNum]);
		}
		paperCount += isPaper(paperMatrix[rowAboveNum][column]);
		if(columnRight){
			paperCount += isPaper(paperMatrix[rowAboveNum][columnRightNum]);
		}
	}

	//check row and columnLeft
	//check row and columnRight
	if(columnLeft){
		paperCount += isPaper(paperMatrix[row][columnLeftNum]);
	}
	if(columnRight){
		paperCount += isPaper(paperMatrix[row][columnRightNum]);
	}

	//check rowBelow and columnLeft
	//check rowBelow and column
	//check rowBelow and columnRight
	if(rowBelow){
		if(columnLeft){
			paperCount += isPaper(paperMatrix[rowBelowNum][columnLeftNum]);
		}
		paperCount += isPaper(paperMatrix[rowBelowNum][column]);
		if(columnRight){
			paperCount += isPaper(paperMatrix[rowBelowNum][columnRightNum]);
		}
	}

	//console.log("paperCount: " + paperCount);

	if(paperCount >= 4){
		return false;
	} else{
		return true;
	}
}

function isPaper(item){
	if(item == '@'){
		return 1;
	} else {
		return 0;
	}
}
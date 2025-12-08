import fs from'fs';
import readLine from 'readline';

export function day6(){
	console.log("Starting day 6");
	processLineByLine();
}

let originalFileEachChar = [];
let originalFileEachCharCount = 0;
let originalFileWithDashes = [];
let mathNumbers = [];
let mathNumbersPartTwo = [];
let mathEquation = [];
let equationTotal = 0;
let blankNumbersFinal = new Set();
let blankNumbers = new Set();

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day6/input_math.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		//console.log("");
		//console.log("line: " + line);

		originalFileEachChar[originalFileEachCharCount] = [];

		//Get each character
		for(let i = 0; i < line.length; i++){
			originalFileEachChar[originalFileEachCharCount][i] = line.charAt(i);
			originalFileWithDashes[originalFileEachCharCount] = [];
		}

		originalFileEachCharCount++;
	}

	findAllBlankSpaces();
	fillNonBlankColumnsWithDashes();
	getArrayRowsToBeMathProblems();
	setMathRowsToBePartTwoNumbers();
	partTwoMath();
}

function multiply(array) {
	let result = 1;

	for(let j = 0; j < array.length; j++){
		result *= array[j];
	}

	return result;
}

function add(array) {
	let result = 0;

	for(let j = 0; j < array.length; j++){
		result += parseInt(array[j]);
	}

	return result;
}

function findAllBlankSpaces(){
	//line by line
	for(let i = 0; i < originalFileEachChar.length; i++){
		for(let j = 0; j < originalFileEachChar[i].length; j++){
			if(originalFileEachChar[i][j] == " "){
				//console.log("[" + i + "][" + j + "]");
				
				//Get all the first row numbers
				if(i == 0){
					blankNumbersFinal.add(j);
				} else{
					//Compare if numbers in other rows are in the first row as well
					if(blankNumbersFinal.has(j)){
						blankNumbers.add(j);
					}
				}
			}
		}
		if(i != 0){
			//console.log("blankNumbersFinal: " + Array.from(blankNumbersFinal));
			blankNumbersFinal.clear();
			blankNumbers.forEach(function(value){
				blankNumbersFinal.add(value);
			});
			//console.log("blankNumbersFinal: " + Array.from(blankNumbersFinal));
			blankNumbers.clear();
		}
	}

	//console.log("blank spaces: " + Array.from(blankNumbersFinal));
}

function fillNonBlankColumnsWithDashes() {
	for(let i = 0; i < originalFileEachChar.length; i++){
		for(let j = 0; j < originalFileEachChar[i].length; j++){
			if(!blankNumbersFinal.has(j) && originalFileEachChar[i][j] == " "){
				originalFileWithDashes[i][j] = "-";
			} else{
				originalFileWithDashes[i][j] = originalFileEachChar[i][j]; 
			}
		}
	}

	for(let i = 0; i < originalFileWithDashes.length; i++){
		console.log(i + ": " + originalFileWithDashes[i]);
	}
}

function getArrayRowsToBeMathProblems(){
	for(let i = 0; i < (blankNumbersFinal.size + 1); i++){
		mathNumbers[i] = [];
	}

	for(let i = 0; i < originalFileWithDashes.length; i++){
		let lastCharWasSpace = false;
		let spaceNumber = 0;
		let firstGo = true;
		let doneWithNumbers = false;

		for(let j = 0; j < originalFileWithDashes[i].length; j++){
			if((j == 0) && (originalFileWithDashes[i][j] == "-")){
				//console.log("char [" + i + "][" + j + "] " + originalFileWithDashes[i][j] + " is first and a space");
				lastCharWasSpace = true;
				//j++;
			}

			//If it's a * or +
			if(isNaN(originalFileWithDashes[i][j]) && originalFileWithDashes[i][j] != "-"){
				//console.log("char [" + i + "][" + j + "] " + originalFileWithDashes[i][j] + " is a * or + at [" + spaceNumber + "]");
				lastCharWasSpace = false;
				doneWithNumbers = true;
				mathEquation[spaceNumber] = originalFileWithDashes[i][j];
			} else if(originalFileWithDashes[i][j] == " "){
				//It's a space
				//console.log("char [" + i + "][" + j + "] " + originalFileWithDashes[i][j] + " is a space");
				if(!lastCharWasSpace){
					spaceNumber++;
					firstGo = true;
					lastCharWasSpace = true;
				}
			} else {
				//It's a number
				//console.log("char [" + i + "][" + j + "] " + originalFileWithDashes[i][j] + " is a number");
				lastCharWasSpace = false;
				if(firstGo && !doneWithNumbers){
					mathNumbers[spaceNumber][i] = '';
					firstGo = false;
				}

				if(!doneWithNumbers){
					mathNumbers[spaceNumber][i] += originalFileWithDashes[i][j];
				}
			}
		}
	}

	for(let i = 0; i < mathNumbers.length; i++){
		console.log(mathNumbers[i]);
	}
	console.log(mathEquation);
}

function setMathRowsToBePartTwoNumbers() {
	for(let i = 0; i < mathNumbers.length; i++){
		let tempArray = [];

		for(let j = 0; j < mathNumbers[i].length; j++){
			for(let k = 0; k < mathNumbers[i][j].length; k++){

				if(j == 0){
					tempArray[k] = '';
				}

				if(mathNumbers[i][j].charAt(k) != "-"){
					tempArray[k] += mathNumbers[i][j].charAt(k);
				}
			}
		}
		mathNumbersPartTwo[i] = tempArray;
	}
}

function partTwoMath() {
	for(let i = 0; i < mathNumbersPartTwo.length; i++){
		let temp = 0;
		let addOrMult = mathEquation[i];
		
		if(addOrMult == "*"){
			temp = multiply(mathNumbersPartTwo[i]);
			//console.log("temp: " + temp);
		} else {
			temp = add(mathNumbersPartTwo[i]);
			//console.log("temp: " + temp);
		}

		equationTotal += temp;
		//console.log("equationTotal: " + equationTotal);
	}

	console.log("Equation total: " + equationTotal);
}
import fs from'fs';
import readLine from 'readline';

export function day6(){
	console.log("Starting day 6");
	processLineByLine();
}

let originalFileEachChar = [];
let originalFileEachCharCount = 0;
let mathNumbers = [];
let mathEquation = [];
let equationTotal = 0;

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
		}

		originalFileEachCharCount++;
	}

	/*for(let i = 0; i < originalFileEachChar.length; i++){
		console.log("originalFile " + i + ": " + originalFileEachChar[i]);
		//console.log("originalFile " + i + ": " + originalFileEachChar[i].length);
	}*/

	for(let i = 0; i < originalFileEachChar[0].length; i++){
		mathNumbers[i] = [];
	}

	console.log("mathNumbers.length: " + mathNumbers.length);

	for(let i = 0; i < originalFileEachChar.length; i++){
		//let lastCharWasNum = false;
		let lastCharWasSpace = false;
		let spaceNumber = 0;
		let firstGo = true;
		for(let j = 0; j < originalFileEachChar[i].length; j++){
			if((j == 0) && (originalFileEachChar[i][j] == " ")){
				console.log("char [" + i + "][" + j + "] " + originalFileEachChar[i][j] + " is first and a space");
				lastCharWasSpace = true;
				//j++;
			}

			//If it's a * or +
			if(isNaN(originalFileEachChar[i][j])){
				console.log("char [" + i + "][" + j + "] " + originalFileEachChar[i][j] + " is a * or + at [" + spaceNumber + "]");
				lastCharWasSpace = false;
				mathEquation[spaceNumber] = originalFileEachChar[i][j];
			} else if(originalFileEachChar[i][j] == " "){
				//It's a space
				console.log("char [" + i + "][" + j + "] " + originalFileEachChar[i][j] + " is a space");
				if(!lastCharWasSpace){
					spaceNumber++;
					firstGo = true;
					lastCharWasSpace = true;
				}
			} else {
				//It's a number
				console.log("char [" + i + "][" + j + "] " + originalFileEachChar[i][j] + " is a number");
				lastCharWasSpace = false;
				if(firstGo){
					mathNumbers[spaceNumber][i] = '';
					firstGo = false;
				}
				mathNumbers[spaceNumber][i] += originalFileEachChar[i][j];
			}
		}
	}

	for(let i = 0; i < mathNumbers.length; i++){
		console.log("mathNumbers " + i + ": " + mathNumbers[i] + " mathEquation: " + mathEquation[i]);
		//console.log("originalFile " + i + ": " + originalFileEachChar[i].length);
	}

	for(let i = 0; i < mathNumbers.length; i++){
		let temp = 0;
		let addOrMult = mathEquation[i];
		
		if(addOrMult == "*"){
			temp = multiply(mathNumbers[i]);
			console.log("temp: " + temp);
		} else {
			temp = add(mathNumbers[i]);
			console.log("temp: " + temp);
		}

		equationTotal += temp;
		console.log("equationTotal: " + equationTotal);
	}

	console.log("Equation total: " + equationTotal);
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
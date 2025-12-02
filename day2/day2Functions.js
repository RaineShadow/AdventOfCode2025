import fs from'fs';
import readLine from 'readline';

export function day2(){
	console.log("Starting day 2");
	processInput();
}

let idArray = [];
let sumOfID = 0;

//Read File separated by commas
async function processInput(){
	const fileStream = fs.createReadStream('./day2/input_id.txt');
	let fileText = '';

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		fileText = line;
		console.log("fileText: " + fileText);
	}

	idArray = fileText.split(",");

	for(let i = 0; i < idArray.length; i++){
		console.log("");
		console.log(idArray[i]);
		processID(idArray[i]);
	}

	console.log("Sum of ID's: " + sumOfID);
}

function processID(idRange){
	let idRangeArray = idRange.split("-");
	let rangeStart = parseInt(idRangeArray[0]);
	let rangeEnd = parseInt(idRangeArray[1]);
	
	for(let i = rangeStart; i <= rangeEnd; i++){
		let currentNumber = i.toString();
		let middle = currentNumber.length / 2;
		let firstHalf = '';
		let secondHalf = '';

		for(let j = 0; j < currentNumber.length; j++){
			if(j < middle){
				firstHalf += currentNumber[j];
			} else{
				secondHalf += currentNumber[j];
			}
		}

		if(firstHalf == secondHalf){
			sumOfID += i;
		}
	}
}
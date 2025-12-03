import fs from'fs';
import readLine from 'readline';

export function day3(){
	console.log("Starting day 3");
	processLineByLine();
}

let joltageSum = 0;

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day3/input_joltage.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
		findHighestJoltage(line);
	}
}

function findHighestJoltage(line) {
	let twelveHighest = [];
	let count = 0;
	let joltageTotalLength = 12;
	let joltageLengthLeft = joltageTotalLength;
	let highestJoltageString = '';
	let lastHighestIndex = -1;

	//Get all 12 characters
	for(let i = 0; i < joltageTotalLength; i++){
		let lastHighest = 0;

		//Go through whole character line
		for(let j = 0; j < line.length; j++){
			let enoughCharactersLeft = line.length - joltageLengthLeft;
			if(j <= enoughCharactersLeft && j > lastHighestIndex){
				//Can look at characters
				let temp = line.charAt(j);
				if(temp > lastHighest){
					lastHighest = temp;
					lastHighestIndex = j;
				}
			}
		}

		twelveHighest[count] = lastHighest;
		count++;
		joltageLengthLeft--;
	}

	for(let i = 0; i < joltageTotalLength; i++){
		highestJoltageString += twelveHighest[i];
	}

	console.log("highestJoltageString: " + highestJoltageString);
	joltageSum += parseInt(highestJoltageString);
	console.log("joltageSum: " + joltageSum);
}
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
	let firstHighest = 0;
	let firstHighestIndex = -1;
	let secondHighest = 0;
	let highestJoltageString = '';

	for(let i = 0; i < line.length; i++){
		if(i != (line.length - 1)){
			let temp = line.charAt(i);
			if(temp > firstHighest){
				firstHighest = temp;
				firstHighestIndex = i;
			}
		} else if((i != (line.length - 1)) && gotFirstHighest){
			let temp2 = line.charAt(i);
			if(temp2 > secondHighest){
				secondHighest = temp2;
			}
		} else{
			break;
		}
	}

	for(let i = 0; i < line.length; i++){
		if(i > firstHighestIndex){
			let temp = line.charAt(i);
			if(temp > secondHighest){
				secondHighest = temp;
			}
		}
	}

	//console.log("firstHighest: " + firstHighest + " secondHighest: " + secondHighest);
	highestJoltageString += firstHighest;
	highestJoltageString += secondHighest;
	//console.log("highestJoltageString: " + highestJoltageString);
	joltageSum += parseInt(highestJoltageString);
	console.log("joltageSum: " + joltageSum);
}
import fs from'fs';
import readLine from 'readline';

export function day6(){
	console.log("Starting day 6");
	processLineByLine();
}

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day6/input_math.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
	}
}
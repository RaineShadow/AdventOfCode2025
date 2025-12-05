import fs from'fs';
import readLine from 'readline';

export function day5(){
	console.log("Starting day 5");
	processLineByLine();
}

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day5/input_ingredient_test.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
	}
}
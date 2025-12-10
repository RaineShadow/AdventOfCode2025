import fs from'fs';
import readLine from 'readline';

export function day7(){
	console.log("Starting day 8");
	processLineByLine();
}

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day8/input_junction_boxes_test.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
	}
}
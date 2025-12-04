import fs from'fs';
import readLine from 'readline';

export function day4(){
	console.log("Starting day 4");
	processLineByLine();
}

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day4/input_paper_test.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
	}
}
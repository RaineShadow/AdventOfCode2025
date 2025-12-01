const fs = require('fs');
const readLine = require('readline');

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('input_password_test.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
		moveDial(line);
	}
}

function moveDial(line){
	let direction = line.charAt(0);
	let number = parseInt(line.slice(1));

	console.log("direction: " + direction + " number: " + number);

	//Left towards lower numbers
	//Right towards higher numbers
	console.log("dial starting at: " + current_password_dial);

	if(direction == 'R'){
		current_password_dial = (current_password_dial + number);
		while(current_password_dial > 99){
			dial_at_zero++;
			console.log("dial_at_zero: " + dial_at_zero);
			current_password_dial = -1 + (current_password_dial - password_dial_length);
		}
	} else if(direction == 'L') {
		current_password_dial = current_password_dial - number;
		while(current_password_dial < 0){
			dial_at_zero++;
			console.log("dial_at_zero: " + dial_at_zero);
			current_password_dial = 100 + current_password_dial;
		}
	}

	console.log("dial currently at: " + current_password_dial);
}

//-------------------------------Start of Code

console.log("Advent of Code 2025");

//dial goes from 0 to 99
let password_dial = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99];
let password_dial_length = password_dial.length - 1;
let current_password_dial = 50;
let dial_at_zero = 0;

processLineByLine().then(temp => {
	console.log("Password is: " + dial_at_zero);
});
import fs from'fs';
import readLine from 'readline';

//dial goes from 0 to 99
let password_dial = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99];
let current_password_dial = 50;
let dial_at_zero = 0;

console.log("dial starting at: " + password_dial[current_password_dial]);

export function day1(){
	processLineByLine().then(temp => {
		console.log("Password is: " + dial_at_zero);
	});
}

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day1/input_password.txt');

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

	//Left towards lower numbers
	//Right towards higher numbers
	if(direction == 'R'){
		for(let i = 1; i <= number; i++){
			if(current_password_dial == 99 && (i != 1)){
				current_password_dial++;
			} else if(current_password_dial == 99 && (i == 1)){
				current_password_dial = 0;
			} else {
				current_password_dial++;
			}

			if(password_dial[current_password_dial] == 0){
				dial_at_zero++;
			}

			if(password_dial[current_password_dial] == 99 && (i == number)){
				//do nothing because dial is stopping there
			} else if(password_dial[current_password_dial] == 99 && (i != number)){
				current_password_dial = -1;
			}
		}
	} else if(direction == 'L') {
		for(let i = 1; i <= number; i++){
			if(current_password_dial == 0 && (i != 1)){
				current_password_dial--;
			} else if(current_password_dial == 0 && (i == 1)){
				current_password_dial = 99;
			} else {
				current_password_dial--;
			}

			if(password_dial[current_password_dial] == 0){
				dial_at_zero++;
			}

			if(password_dial[current_password_dial] == 0 && (i == number)){
				//do nothing because dial is stopping there
			} else if(password_dial[current_password_dial] == 0 && (i != number)){
				current_password_dial = 100;
			}
		}
	}

	console.log("dial currently at: " + current_password_dial);
}
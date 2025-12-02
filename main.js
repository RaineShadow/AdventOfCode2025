import readLine from 'readline';

import {day1} from './day1/day1Functions.js';
import {day2} from './day2/day2Functions.js';

console.log("Advent of Code 2025");

const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("What day is it? ", (dayNumber) => {
	console.log("dayNumber: " + dayNumber);

	switch (dayNumber){
		case '1':
			day1();
			break;
		case'2':
			day2();
			break;
		default:
			console.log("Not a valid day");
	}
	
	rl.close();
});
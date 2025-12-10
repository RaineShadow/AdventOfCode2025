import readLine from 'readline';

import {day1} from './day1/day1Functions.js';
import {day2} from './day2/day2Functions.js';
import {day3} from './day3/day3Functions.js';
import {day4} from './day4/day4Functions.js';
import {day5} from './day5/day5Functions.js';
import {day6} from './day6/day6Functions.js';
import {day7} from './day7/day7Functions.js';
import {day8} from './day8/day8Functions.js';

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
		case '2':
			day2();
			break;
		case '3':
			day3();
			break;
		case '4':
			day4();
			break;
		case '5':
			day5();
			break;
		case '6':
			day6();
			break;
		case '7':
			day7();
			break;
		case '8':
			day8();
			break;
		default:
			console.log("Not a valid day");
	}

	rl.close();
});
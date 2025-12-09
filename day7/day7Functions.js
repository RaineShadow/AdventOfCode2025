import fs from'fs';
import readLine from 'readline';

export function day7(){
	console.log("Starting day 7");
	processLineByLine();
}

let originalInput = [];
let originalInputCount = 0;
let timelineCount = [];
let finalTimelineCount = 0;

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day7/input_beam.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);
		originalInput[originalInputCount] = line;
		originalInputCount++;
	}

	tractorBeam();
}

function tractorBeam(){
	let startingPoint = -1;
	let carrotCount = 0;

	for(let i = 0; i < originalInput[0].length; i++){
		timelineCount[i] = 0;
	}

	//For each line
	for(let i = 0; i < originalInput.length; i++){	
		//Find Starting point
		if(i == 0){
			for(let j = 0; j < originalInput[i].length; j++){
				if(originalInput[i].charAt(j) == "S"){
					startingPoint = j;
					timelineCount[j] = 1;
					console.log("timelineCount: " + timelineCount);
				}
			}

			//Write first beams
			for(let j = 0; j < originalInput[i+1].length; j++){
				if(j == startingPoint){
					originalInput[i+1] = replace(originalInput[i+1], j, "|");
					i++;
				}
			}
		}

		//Look for ^ under | and count
		if(i >= 2){
			for(let j = 0; j < originalInput[i].length; j++){
				if(originalInput[i-1].charAt(j) == "|"){
					if(originalInput[i].charAt(j) == "^"){
						originalInput[i] = replace(originalInput[i], j-1, "|");
						originalInput[i] = replace(originalInput[i], j+1, "|");
						updateTimeline(j);
						carrotCount++;
					} else if(originalInput[i].charAt(j) == "."){
						originalInput[i] = replace(originalInput[i], j, "|");
					}
				}
			}
		}
	}

	for(let i = 0; i < originalInput.length; i++){
		console.log(originalInput[i]);
	}

	console.log("Carrot count: " + carrotCount);
	partTwoMath();
	console.log("Timeline count: " + finalTimelineCount);
	//7382 too low
}

function replace(originalInputLine, index, char) {
	if(index > originalInputLine.length || index < 0){
		return originalInputLine;
	} else {
		return originalInputLine.substring(0, index) + char + originalInputLine.substring(index+1);
	}
}

function updateTimeline(index){
	if((index - 1) < 0 || (index + 1) > originalInput[0].length){
		console.log("doesn't fit");
	} else{
		timelineCount[index-1] += timelineCount[index];
		timelineCount[index+1] += timelineCount[index];
		timelineCount[index] = 0;
		console.log("timelineCount: " + timelineCount);
	}
}

function partTwoMath() {
	for(let j = 0; j < timelineCount.length; j++){
		finalTimelineCount += parseInt(timelineCount[j]);
	}
}
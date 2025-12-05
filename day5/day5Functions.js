import fs from'fs';
import readLine from 'readline';

export function day5(){
	console.log("Starting day 5");
	processLineByLine();
}

let doneWithRanges = false;
let ingredientRange = [];
let count = 0;
let freshIngredients = 0;
let ingredientRangeNumbers = [];
let numberCount = 0;
let totalNumberInRange = 0;

//Read File Line by Line
async function processLineByLine(){
	const fileStream = fs.createReadStream('./day5/input_ingredient.txt');

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		console.log("");
		console.log("line: " + line);

		if(!doneWithRanges){
			processRanges(line);
		} else{
			let isItFresh = isFresh(line);

			if(isItFresh){
				freshIngredients++;
			}
		}

		//console.log("ingredientRange: " + ingredientRange);
	}

	console.log("Fresh ingredients: " + freshIngredients);

	/*let tempSet = new Set();
	let setCount = 0;
	let keepGoing = true;

	while(keepGoing){
		try{
			tempSet.add(setCount);
		} catch(e){
			console.log("setCount: " + setCount);
			keepGoing = false;
		}
		setCount++;
		//8388608
	}*/

	getNumberInRange();

	//Sort ranges
	//console.log("ingredientRangeNumbers: " + ingredientRangeNumbers);
	ingredientRangeNumbers.sort(function (a,b) {
		return a[0]-b[0];
	});

	ingredientRangeNumbers.sort(function (a,b) {
		return a[1]-b[1];
	});
	//console.log("ingredientRangeNumbers: " + ingredientRangeNumbers);


	//Add Numbers without Overlap
	getNonOverlappingNumbers();
}

function processRanges(line){
	if(line == ''){
		console.log("break");
		doneWithRanges = true;
	} else {
		ingredientRange[count] = line;
		count++;
	}
}

function isFresh(line){
	//For each range
	for(let i = 0; i < ingredientRange.length; i++){
		let firstNumberString = '';
		let lastNumberString = '';
		let startLastNumber = false;

		//Get the numbers of that range
		for(let j = 0; j < ingredientRange[i].length; j++){
			if(ingredientRange[i].charAt(j) == '-'){
				startLastNumber = true;
				j++;
			}

			if(!startLastNumber){
				firstNumberString += ingredientRange[i].charAt(j);
			} else{
				lastNumberString += ingredientRange[i].charAt(j);
			}
		}

		//console.log("firstNumber: " + firstNumberString + " lastNumber: " + lastNumberString);

		let lineNumber = parseInt(line);
		let firstNumber = parseInt(firstNumberString);
		let lastNumber = parseInt(lastNumberString);

		if(lineNumber >= firstNumber && lineNumber <= lastNumber){
			return true;
		}

		if(i == (ingredientRange.length - 1)){
			return false;
		}
	}

	return false;
}

function getNumberInRange() {
	//For each range
	for(let i = 0; i < ingredientRange.length; i++){
		let firstNumberString = '';
		let lastNumberString = '';
		let startLastNumber = false;

		//Get the numbers of that range
		for(let j = 0; j < ingredientRange[i].length; j++){
			if(ingredientRange[i].charAt(j) == '-'){
				startLastNumber = true;
				j++;
			}

			if(!startLastNumber){
				firstNumberString += ingredientRange[i].charAt(j);
			} else{
				lastNumberString += ingredientRange[i].charAt(j);
			}
		}

		let firstNumber = parseInt(firstNumberString);
		let lastNumber = parseInt(lastNumberString);

		ingredientRangeNumbers[numberCount] = [];
		ingredientRangeNumbers[numberCount][0] = firstNumber;
		ingredientRangeNumbers[numberCount][1] = lastNumber;
		numberCount++;
	}
}

function getNonOverlappingNumbers() {
	let lastSmallestNumber = -1;
	let lastBiggestNumber = -1;
	let firstGo = true;
	let testTotal = 0;

	for(let i = (ingredientRangeNumbers.length - 1); i >= 0; i--){
		console.log("[" + ingredientRangeNumbers[i][0] + "],[" + ingredientRangeNumbers[i][1] + "]");
	}

	for(let i = (ingredientRangeNumbers.length - 1); i >= 0; i--){
		//if((lastBiggestNumber > ingredientRangeNumbers[i][1]) && (lastSmallestNumber < ingredientRangeNumbers[i][0])){
			//console.log("overlap");
			//lastSmallestNumber = ingredientRangeNumbers[i][0];
			//lastBiggestNumber = ingredientRangeNumbers[i][1];
			//i--;
			//continue;
		//}

		if(!firstGo && (lastSmallestNumber <= ingredientRangeNumbers[i][1])){
			let temp = (ingredientRangeNumbers[i][1] - lastSmallestNumber) + 1;
			let tempTotal = (ingredientRangeNumbers[i][1] - ingredientRangeNumbers[i][0] - temp) + 1;

			if(tempTotal < 0){
			 	//do nothing
			} else {
				totalNumberInRange += tempTotal;
				lastSmallestNumber = ingredientRangeNumbers[i][0];
				lastBiggestNumber = ingredientRangeNumbers[i][1];
			}
		} else if (!firstGo && (lastSmallestNumber > ingredientRangeNumbers[i][1])){
			totalNumberInRange += (ingredientRangeNumbers[i][1] - ingredientRangeNumbers[i][0]) + 1;
			lastSmallestNumber = ingredientRangeNumbers[i][0];
			lastBiggestNumber = ingredientRangeNumbers[i][1];
		}

		if(i == (ingredientRangeNumbers.length - 1)){
			firstGo = false;
			totalNumberInRange += (ingredientRangeNumbers[i][1] - ingredientRangeNumbers[i][0]) + 1;
			lastSmallestNumber = ingredientRangeNumbers[i][0];
			lastBiggestNumber = ingredientRangeNumbers[i][1];
		}

		testTotal += ingredientRangeNumbers[i][1] - ingredientRangeNumbers[i][0];
	}

	console.log("Total number in range: " + totalNumberInRange);
	console.log("Test total: " + testTotal);
	//308919106554499 too low
	//325285987298635 not correct (not sure if too high or too low)
	//340137468764170 not correct (not sure if too high or too low)
	//350939902751909 CORRECT!!! YAY!!!
	//441490132142353 too high (it's all of them with overlap)
}
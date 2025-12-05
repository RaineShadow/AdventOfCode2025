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
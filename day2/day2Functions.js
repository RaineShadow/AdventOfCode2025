import fs from'fs';
import readLine from 'readline';

export function day2(){
	console.log("Starting day 2");
	processInput();
}

let idArray = [];
let sumOfID = 0;

//Read File separated by commas
async function processInput(){
	const fileStream = fs.createReadStream('./day2/input_id.txt');
	let fileText = '';

	const rl = readLine.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	for await(const line of rl){
		fileText = line;
		console.log("fileText: " + fileText);
	}

	idArray = fileText.split(",");

	for(let i = 0; i < idArray.length; i++){
		console.log("");
		console.log(idArray[i]);
		processID(idArray[i]);
	}

	console.log("Sum of ID's: " + sumOfID);
}

function processID(idRange){
	let idRangeArray = idRange.split("-");
	let rangeStart = parseInt(idRangeArray[0]);
	let rangeEnd = parseInt(idRangeArray[1]);
	let lastAddedNumber = 0;
	
	for(let i = rangeStart; i <= rangeEnd; i++){
		let currentNumber = i.toString();
		
		for(let j = 1; j < currentNumber.length; j++){
			let divideBy = currentNumber.length - j;
			let divideByTotal = currentNumber.length / divideBy;

			if(Number.isInteger(divideByTotal) && (lastAddedNumber != currentNumber)){
				let idBrokenDown = [];
				let count = 0;
				let temp = '';
				let tempCount = 0;

				for(let k = 0; k < currentNumber.length; k++){
					if(tempCount <= divideBy){
						tempCount++;
						temp += currentNumber[k];
					}
					if(tempCount == divideBy){
						idBrokenDown[count] = temp;
						tempCount = 0;
						temp = '';
						count++;
					}
				}

				//console.log("idBrokenDown for " + divideBy + ": " + idBrokenDown);

				for(let d = 0; d < idBrokenDown.length; d++){
					if((d+1) in idBrokenDown){
						//console.log("checking " + idBrokenDown[d] + " and " + idBrokenDown[d+1]);
						if(idBrokenDown[d] != idBrokenDown[d+1]){
							break;
						} else{
							if(d == (idBrokenDown.length - 2)){
								sumOfID += i;
								lastAddedNumber = i;
								//stop looking at this number
							}
						}
					}
				}
			}
		}
		




		/*let middle = currentNumber.length / 2;
		let firstHalf = '';
		let secondHalf = '';

		for(let j = 0; j < currentNumber.length; j++){
			if(j < middle){
				firstHalf += currentNumber[j];
			} else{
				secondHalf += currentNumber[j];
			}
		}
		console.log("firstHalf: " + firstHalf + " secondHalf: " + secondHalf);

		if(firstHalf == secondHalf){
			sumOfID += i;
		}*/
	}
}
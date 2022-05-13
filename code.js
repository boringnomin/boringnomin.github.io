'use strict';

const numberIcons = ["icons/zero.png", "icons/one.png", "icons/two.png",
"icons/three.png", "icons/four.png", "icons/five.png", "icons/six.png",
"icons/seven.png", "icons/eight.png", "icons/nine.png"];

var nDigits = parseInt(localStorage.getItem("level"));
const Digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var code = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var count = 0;
var bestRecord = localStorage.getItem("bestrecord"+ nDigits);


if(!bestRecord)
	var bestRecord = 100;
else
	document.getElementById('best-record').textContent = bestRecord;

generateRandoms();
function generateRandoms(){
	for (var i = 0; i < nDigits; i++)
		Digits[i] = Math.floor(Math.random()*10);
	console.log(Digits);
	for(var i=0; i<nDigits; i++){
		for(var j=0; j<10; j++){
			if(Digits[i] == j){
				if(data[j] != 0)
					count++;
				data[j]++;
				code[j]++;
				break;
			}
		}
	}
}
console.log(code);

var possibleNumbers = [];
if(nDigits < 8){
	generatePossibleNumbers();
	var nGPN = nDigits+2;
}
else{
	var possibleNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var nGPN = 10;
	shuffle(possibleNumbers);
	console.log(possibleNumbers);
}

function generatePossibleNumbers() {
	var temp;
	var index = 0;
	var fill = count+ 2;
	while(fill != 0){//Generating possible numbers
	    temp = Math.floor(Math.random()*10);
	    for(var i=0; i<10; i++){
	        if(temp == i && data[i] == 0){//Number check && fake number filling situation
	            possibleNumbers[index++] = temp;
	            fill--;
	            data[i] = -1;
	            break;
	        }
	        else if(temp == i && data[i] > 0){//Number check && actual number displaying situation
	            possibleNumbers[index++] = temp;
	            data[i] = -1;
	            break;
	        }
	    }

	    if(fill == 0)//This is necessary, in case of some actual numbers are not in the display yet!!!
	        for(var i=0; i<10; i++)
	            if(data[i] > 0)
	                possibleNumbers[index++] = i;

	}
}

function shuffle(array) {
	for(var i=0; i<nDigits; i++){
		var randomIndex = Math.floor(Math.random()*10);
		for(var j=0; j<10; j++){
			if(j > randomIndex){
				var temp = array[j];
				array[j] = array[j-1];
				array[j-1] = temp;
			}
		}
	}
  
  return array;
}

addingIcons();
function addingIcons() {
	for(var i =0; i<nDigits; i++){
		var variable = document.getElementById("hidden");
		var img = document.createElement('img');
		img.className = "hidden" + i;
		img.src = "icons/question-mark.png";
		img.alt = "question-mark";
		variable.appendChild(img);

		var variable = document.getElementById("inputs");
		var input = document.createElement('input');
		input.className = "input" + i;
		input.type = "number";
		//input.name = "number";
		input.min = '0';
		input.max = '9';
		variable.appendChild(input);
	}

	for (var i = 0; i < nGPN; i++) {
		var variable = document.getElementById("possible-numbers");
		var img = document.createElement('img');
		img.className = "possible-numbers" + i;
		img.src = ""+ numberIcons[possibleNumbers[i]];
		img.alt = ""+ possibleNumbers[i];
		variable.appendChild(img);
	}
}


function showPossibleNumbers(showThis){
	document.querySelector(".possible-numbers" + showThis).src = numberIcons[possibleNumbers[showThis]];
	return 0;
}

var answer = [];
function inputNumbers(){
	var greens =0;var reds =0;var nulls = 0;var count = 0;
	for(var i = 0; i<nDigits; i++){
		answer[i] = parseInt(document.querySelector(".input"+ i).value);
		if(answer[i] == Digits[i])
			greens++;
	}
	console.log(answer);
	//console.log(positions);
	for(var i=0; i<10; i++){
        for(var j=0; j<nDigits; j++){
            if(answer[j] == i)
                count++;
        }
        console.log(count);
        if(code[i] > count)
            nulls = nulls + code[i] - count;
        count = 0;
    }

    reds = nDigits - greens - nulls;
    console.log(greens + " greens");
	console.log(reds + " reds");
	console.log(nulls + " nulls");
	const r = showInputNumbers(greens, reds, nulls);
	if(greens == nDigits){
		const s = successBox(true);
	}
}

document.getElementById("btn").addEventListener("mouseover", function () {
	var checkInput = 0;
	for(var i = 0; i<nDigits; i++){
		answer[i] = parseInt(document.querySelector(".input"+ i).value);
		if(answer[i]<0 || answer[i] >9 || (!answer[i] && answer[i] != 0))
			document.getElementById("btn").disabled = true;
	}
});
document.getElementById("btn-clear").addEventListener("click", function () {
		document.getElementById("btn").disabled = false;
});

var countSteps = 0;
function showInputNumbers(greens, reds, nulls){
	var list = document.getElementById('memory');
	var steps = answer;
	var entry = document.createElement('li');
	entry.className = "trial";
	entry.id = "trial-" + countSteps;
	list.appendChild(entry);
	for(var i=0; i<answer.length; i++){
		var inputDigits = document.getElementById("trial-" + countSteps);
		var img = document.createElement('img');
		img.className = "medium";
		if(!answer[i] && answer[i] != 0)
			img.src = "icons/question-mark.png";
		else
			img.src = ""+ numberIcons[answer[i]];
		inputDigits.appendChild(img);
	}

	for(var i=0; i<greens; i++){
		if(nDigits >=10 && i == 0){
			var nextline = document.getElementById("trial-" + countSteps);
			var br = document.createElement('br');
			nextline.appendChild(br);
		}
		var signal =document.getElementById("trial-" + countSteps);
		var img = document.createElement('img');
		img.className = "small";
		img.src = "icons/correct.png";
		signal.appendChild(img);
	}
	for(var i=0; i<reds; i++){
		var signal =document.getElementById("trial-" + countSteps);
		var img = document.createElement('img');
		img.className = "small";
		img.src = "icons/wrong.png";
		signal.appendChild(img);
	}
	for(var i=0; i<nulls; i++){
		var signal =document.getElementById("trial-" + countSteps);
		var img = document.createElement('img');
		img.className = "small";
		img.src = "icons/invalid.png";
		signal.appendChild(img);
	}

	var lineBreaker = document.getElementById("trial-" + countSteps);
	var hr = document.createElement('hr');
	lineBreaker.appendChild(hr);
	countSteps++;
	return countSteps;
}

function successBox(status){
	if(status == true){
		document.getElementById("btn").disabled = true;
		document.getElementById("btn-clear").disabled = true;
		for(var i=0; i<nDigits; i++)
			document.querySelector('.hidden'+ i).src = numberIcons[Digits[i]];
		if(countSteps<bestRecord){
			localStorage.setItem("bestrecord"+ nDigits, countSteps);
      		bestRecord = localStorage.getItem("bestrecord"+ nDigits);
      		document.getElementById('best-record').textContent = bestRecord;
      	}
	}
	window.open("success.html");
	return 0;
}

console.log("Best record :"+localStorage.getItem("bestrecord"+ nDigits));
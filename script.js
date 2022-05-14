document.getElementById('btn-level').addEventListener('click', function() {
	var nDigits = document.getElementById("level").value;
	if (nDigits <2 || nDigits >20) {
		document.querySelector('.message').style.textDecoration = "underline dotted";
		document.querySelector('.message').style.backgroundColor = "#cc0000";
		displayMessage('< Error : Please enter number between 2 to 20!!! >');
	}else{
		document.querySelector('.message').style.backgroundColor = "#00bfff";
		document.querySelector('.message').style.textDecoration = "none";
		displayMessage('[ Now : Challenging the '+ nDigits +'-digits ^_^ ]');
		localStorage.setItem("level", nDigits);

		window.location.href = "ingame.html";
	}
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
}

var firsttime = true;
document.getElementById("board").addEventListener("click", function(){
		document.querySelector(".board").style.display = "block";
		document.getElementById("board").style.display = "none";
		for(var i=1; i<=20; i++){
			var showBoard = document.getElementById("list");
			if(firsttime)
				var listItems = document.createElement("li");
			showBoard.appendChild(listItems);
			listItems.className = "lvlBoard"+ i;
			if(!(localStorage.getItem("bestrecord"+ i))){
				document.querySelector(".lvlBoard" + i).textContent = "???";
			}
			else
				document.querySelector(".lvlBoard" + i).textContent = localStorage.getItem("bestrecord"+ i);
		}
		firsttime = false;
});

function closeBtn(){
	document.querySelector(".board").style.display = "none";
	document.getElementById("board").style.display = "block";
}
document.getElementById('btn-level').addEventListener('click', function() {
	var level = document.getElementById("level").value;
	if (level <2 || level >20) {
		document.querySelector('.message').style.textDecoration = "underline dotted";
		document.querySelector('.message').style.backgroundColor = "#cc0000";
		displayMessage('< Error : Please enter number between 2 to 20!!! >');
	}else{
		document.querySelector('.message').style.backgroundColor = "#00bfff";
		document.querySelector('.message').style.textDecoration = "none";
		displayMessage('[ Now : Challenging the '+ level +'-digits ^_^ ]');
		localStorage.setItem("level", level);
		window.open("ingame.html");
	}
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
}

//console.log(localStorage.getItem("bestrecord"+ nDigits));
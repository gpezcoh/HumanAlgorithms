var startTime = 0;
var endTime = 0;

function startTimer() {
	startTime = Date.now();
	console.log("timer")
	document.getElementById("time").value = 0;
}

function endTimer(){
	endTime = (Date.now() - startTime)/1000;
	document.getElementById("time").value = endTime;
}
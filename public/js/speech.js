var grammar = '#JSGF V1.0; grammar colors; public <color> = blue | green | orange | purple | red | yellow ;'
var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

console.log("hello")

var answers = [];
var manualStop = false;
var lim = 0;
var correct = []

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a color command.');
// }

function speak(limit,ans){
	document.getElementById("show").style.display = "inline";
	document.getElementById("hide").style.display = "none";
	lim = limit - 0;
	recognition.start();
  	console.log('Ready to receive a color command.');
  	startTimer();
}

function sendCorrect(ans){
	correct = ans.split(" ")[0].split(",");
}

function stop(){
	manualStop = true;
	recognition.stop();
	if(answers.length > 1){
		answers = answers.join(" ").split(" ");
	}
	else if (answers.length === 1){
		answers = answers[0].split(" ");
	}
	if(answers.length !== lim){
		console.log("reconcile")
		console.log(answers)
		answers = reconcileAnswers(answers);
	}
	console.log(answers)
	var output = document.getElementById('speechAnswer');
	document.getElementById('speechAnswer').setAttribute("value", answers);
	endTimer();
}

function reconcileAnswers(ans){
	for(x in ans){
		if (ans[x] !== correct[x]){
			if(ans.length < correct.length){
				console.log("add one")
				console.log(x)
				ans.splice(x,0,"wrong");
				// return ans;
			}
			else{
				console.log("remove one")
				console.log(x)
				ans.splice(x,1);
				// return ans;
			}
		}
	}
	return ans;
}

// function checkProblem(index,length){
// 	testAnswers = answers
// 	if(!length){
// 		testAnswers.splice(index,0,correct[index]);
// 		if(reconcileAnswers(testAnswers)){
// 			console.log("Skipped")
// 			return testAnswers
// 		}
// 	}
// 	else{
// 		testAnswers.splice(index,1)
// 		if(reconcileAnswers(testAnswers)){
// 			console.log("Extra")
// 			return testAnswers
// 		}
// 	}
// }

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  console.log(color)
  answers.push(color)
  // answers.push(color.split(" "))
}

// recognition.onaudiostart = function(event) {
// 	console.log("started")
// }

recognition.onend = function() {
	console.log("ended")
	if(!manualStop){
		recognition.start()
	}
}

// recognition.onspeechstart = function(event) {
// 	console.log("speech started")
// }

// recognition.onspeechend = function(event) {
// 	console.log("speech ended")
// }
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

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a color command.');
// }

function speak(){
	recognition.start();
  	console.log('Ready to receive a color command.');
}

function stop(){
	manualStop = true;
	recognition.stop();
	console.log(answers)
	var output = document.getElementById('speechAnswer');
	console.log(output);
	console.log(output.value)
	console.log(answers.join(" "));
	document.getElementById('speechAnswer').setAttribute("value", answers.join(" "));
	console.log(output)
}

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
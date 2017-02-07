function readQuestion(question) {
	var word = findWord(question)
	var msg = new SpeechSynthesisUtterance("Which of these is " + word);
	window.speechSynthesis.speak(msg);
}

function wtf(arg){
	console.log("hello")
}

function findWord(question){
	switch(question){
		case "dog":
			return "a dog";
		case "apple":
			return "an apple";
		case "sun":
			return "the sun";
		case "book":
			return "a book";
	}
}
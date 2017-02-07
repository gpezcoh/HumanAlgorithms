var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Test = mongoose.model('Test'),
  Question = mongoose.model('Question');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/createQuestion/:sectionNumber', function (req, res, next) {
	res.render("createQuestion",{
		section: req.params.sectionNumber
	});
});

router.post('/createQuestion', function (req, res, next) {
	var answers = parseAnswers([req.body.answer1, req.body.answer2, 
	req.body.answer3, req.body.answer4]);
	var question = new Question ({
		title: req.body.title,
		answers: answers,
		section: req.body.section - 0,
		correctAnswer: parseCorrect(req.body.correctAnswer),
		answerType: req.body.answerType
	})
	console.log(question)
	question.save(function (err) {
            if (err) return console.error(err);
            	res.render("createQuestion", {
					created: true
				})
          });
});

function parseCorrect(answer){
	switch(answer){
		case "dog":
			return "/img/dog.jpg";
		case "apple":
			return "/img/apple.jpg";
		case "sun":
			return "/img/sun.png";
		case "book":
			return "/img/book.jpg";	
	}
}

function parseAnswers(answers){
	var newAnswers = [];
	for(x in answers){
		switch(answers[x]){
			case "dog":
				newAnswers.push("/img/dog.jpg");
				break;
			case "apple":
				newAnswers.push("/img/apple.jpg");
				break;
			case "sun":
				newAnswers.push("/img/sun.png");
				break;
			case "book":
				newAnswers.push("/img/book.jpg");
				break;
		}
	}
	return newAnswers;
}

router.get('/test/:test/inSection/:sectionNumber', function (req, res, next) {
	console.log("here")
	Test.findById(req.params.test).populate('questions').exec(function(err, test) {
		console.log(test.questions[0])
		console.log(req.params.sectionNumber)
		if(test.questions[0].section === req.params.sectionNumber-0){
			console.log("hello")
			var question = test.questions.shift()
			test.save();
			res.render('questions', {
				section: req.params.sectionNumber,
				title: question.title,
				answers: question.answers,
				correctAnswer: question.correctAnswer,
				test: test.id
			});
	    }
	    else{
	      res.render('sectionEnd', {
	        section: req.params.sectionNumber,
	       	nextSection : req.params.sectionNumber - 0 + 1,
	       	test: test.id
	      });
	    }
	});
  });

router.post('/test/:test/inSection/:sectionNumber', function (req, res, next) {
	Test.findById(req.params.test).populate('questions').exec(function(err, test) {
		test.total++
		console.log(req.body.correctAnswer)
		console.log(req.body.answer)
		if(req.body.correctAnswer === req.body.answer){
			test.correct++;
		}
		test.save();
		console.log(test.questions)
		console.log(req.params.sectionNumber)
		if(test.questions.length && test.questions[0].section === req.params.sectionNumber-0){
			var question = test.questions.shift()
			res.render('questions', {
				section: req.params.sectionNumber,
				title: question.title,
				answers: question.answers,
				correctAnswer: question.correctAnswer,
				test: test.id
			});
	    }
	    else{
	      res.render('sectionEnd', {
	        section: req.params.sectionNumber,
	       	nextSection : req.params.sectionNumber - 0 + 1,
	       	test: test.id
	      });
	    }
	});
});
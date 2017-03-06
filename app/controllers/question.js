var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Test = mongoose.model('Test'),
  Question = mongoose.model('Question'),
  limit = 10;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/createQuestion/:sectionNumber', function (req, res, next) {
	res.render("createQuestion",{
		section: req.params.sectionNumber
	});
});

router.post('/createQuestion', function (req, res, next) {
	if(req.body.section === "2"){
		var question = new Question ({
			title: req.body.color,
			answers: [],
			section: req.body.section - 0,
			correctAnswer: req.body.word,
			answerType: req.body.answerType
		})
	}
	else{
		var answers = parseAnswers([req.body.answer1, req.body.answer2, 
		req.body.answer3, req.body.answer4]);
		var question = new Question ({
			title: req.body.title,
			answers: answers,
			section: req.body.section - 0,
			correctAnswer: parseCorrect(req.body.correctAnswer),
			answerType: req.body.answerType
		})
	}
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

function colorQuestions(limit){
	var colors = ["red","orange","yellow","green","blue","purple"];
	var questions = [];
	while (questions.length < limit){
		questions.push(colors[Math.round(Math.random() * (colors.length - 1))]);
	}
	return questions;
}

router.get('/test/:test/inSection/:sectionNumber', function (req, res, next) {
	Test.findById(req.params.test).populate('questions').exec(function(err, test) {
		if(test.questions.length && test.questions[0].section === req.params.sectionNumber-0){
			test.sectionTotal = test.sectionLengths.shift();
			test.sectionProgress = 0;
			var question = test.questions.shift()
			test.save();
			console.log(test.sectionLengths)
			if(req.params.sectionNumber-0 === 2){
				questions = colorQuestions(limit);
				console.log(questions)
				res.render('questions', {
					section: req.params.sectionNumber,
					questions: questions,
					test: test.id,
					total: limit
				});
			}
			else{
				res.render('questions', {
					section: req.params.sectionNumber,
					title: question.title,
					answers: question.answers,
					correctAnswer: question.correctAnswer,
					test: test.id,
					sectionProgress: (test.sectionProgress/test.sectionTotal) * 100 + "%"
				});
			}
	    }
	    else{ // necessary?
	      res.render('sectionEnd', {
	        section: req.params.sectionNumber,
	       	nextSection : req.params.sectionNumber - 0 + 1,
	       	test: test.id
	      });
	    }
	});
  });

function calculate(test,orig,answers){
	orig = orig.split(",");
	answers = answers.split(",");
	for(var i in orig){
		test.total++;
		if(orig[i] === answers[i]){
			test.correct++;
		}
	}
	return test
}

router.post('/test/:test/inSection/:sectionNumber', function (req, res, next) {
	Test.findById(req.params.test).populate('questions').exec(function(err, test) {
		if(req.params.sectionNumber - 0 === 2){
			// console.log(req.body.questions)
			// console.log(req.body.speechAnswer)
			test = calculate(test,req.body.questions,req.body.speechAnswer)
			test.sectionProgress++;
			test.time += (req.body.time - 0);
			console.log("time = " + test.time)
			test.save();
			res.render('sectionEnd', {
		        section: req.params.sectionNumber,
		       	nextSection : req.params.sectionNumber - 0 + 1,
		       	test: test.id,
		       	sectionProgress: (test.sectionProgress/test.sectionTotal) * 100 + "%"
		    });
		}
		else{
			test.total++;
			test.sectionProgress++;
			test.time += (req.body.time - 0);
			if(req.body.correctAnswer === req.body.answer){
				test.correct++;
			}
			console.log("time = " + test.time)
			test.save();
			if(test.questions.length && test.questions[0].section === req.params.sectionNumber-0){
				var question = test.questions.shift()
				res.render('questions', {
					section: req.params.sectionNumber,
					title: question.title,
					answers: question.answers,
					correctAnswer: question.correctAnswer,
					test: test.id,
					sectionProgress: (test.sectionProgress/test.sectionTotal) * 100 + "%"
				});
		    }
		    else{
		      res.render('sectionEnd', {
		        section: req.params.sectionNumber,
		       	nextSection : req.params.sectionNumber - 0 + 1,
		       	test: test.id,
		       	sectionProgress: (test.sectionProgress/test.sectionTotal) * 100 + "%"
		      });
		    }
		}
	});
});
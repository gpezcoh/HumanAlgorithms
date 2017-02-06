var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Test = mongoose.model('Test'),
  Question = mongoose.model('Question');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/createQuestion', function (req, res, next) {
	res.render("createQuestion")
});

router.post('/createQuestion', function (req, res, next) {
	var answers = [req.body.answer1, req.body.answer2, 
	req.body.answer3, req.body.answer4]
	var question = new Question ({
		title: req.body.title,
		answers: answers,
		section: req.body.section,
		correctAnswer: req.body.correctAnswer
	})
	question.save(function (err) {
            if (err) return console.error(err);
          });
	res.render("createQuestion", {
		created: true
	})
});

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
	  //   if(req.params.questionNumber - 0 < 4){
			// var question = test.questions[0]
			// res.render('questions', {
			// 	section: req.params.sectionNumber,
			// 	nextSection : req.params.sectionNumber - 0 + 1,
			// 	title: question.title,
			// 	answers: question.answers,
			// 	correctAnswer: question.correctAnswer,
			// 	nextQuestion : req.params.questionNumber - 0 + 1,	
			// });
	  //   }
	  //   else{
	  //     res.render('sectionEnd', {
	  //       section: req.params.sectionNumber,
	  //      	nextSection : req.params.sectionNumber - 0 + 1
	  //     });
	  //   }
	});
  });

router.post('/test/:test/startSection/:sectionNumber', function (req, res, next) {
	Test.findById(req.params.test).populate('questions').exec(function(err, test) {
		test.total++
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
	// total++;
	// if(req.body.correctAnswer === req.body.answer){
	// 	correct++;
	// }
	// if(req.params.questionNumber - 0 < 4){
	// 	var question = Question.createQuestion(1,10);
	// 	res.render('questions', {
	// 		section: req.params.sectionNumber,
	// 		nextSection : req.params.sectionNumber - 0 + 1,
	// 		title: question.title,
	// 		answers: question.answers,
	// 		correctAnswer: question.correctAnswer,
	// 		nextQuestion : req.params.questionNumber - 0 + 1,	
	// 	});
 //    }
 //    else{
 //      res.render('sectionEnd', {
 //        section: req.params.sectionNumber,
 //       	nextSection : req.params.sectionNumber - 0 + 1
 //      });
 //    }
});
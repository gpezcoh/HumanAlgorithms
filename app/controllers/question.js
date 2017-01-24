var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Question = mongoose.model('Question');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/startSection/:sectionNumber/questions/:questionNumber', function (req, res, next) {
    if(req.params.questionNumber - 0 < 4){
		var question = Question.createQuestion(1,10);
		res.render('questions', {
			section: req.params.sectionNumber,
			nextSection : req.params.sectionNumber - 0 + 1,
			title: question.title,
			answers: question.answers,
			correctAnswer: question.correctAnswer,
			nextQuestion : req.params.questionNumber - 0 + 1,	
		});
    }
    else{
      res.render('sectionEnd', {
        section: req.params.sectionNumber,
       	nextSection : req.params.sectionNumber - 0 + 1
      });
    }
  });

router.post('/startSection/:sectionNumber/questions/:questionNumber', function (req, res, next) {
	total++;
	if(req.body.correctAnswer === req.body.answer){
		correct++;
	}
	console.log(correct)
	console.log(total)
	if(req.params.questionNumber - 0 < 4){
		var question = Question.createQuestion(1,10);
		res.render('questions', {
			section: req.params.sectionNumber,
			nextSection : req.params.sectionNumber - 0 + 1,
			title: question.title,
			answers: question.answers,
			correctAnswer: question.correctAnswer,
			nextQuestion : req.params.questionNumber - 0 + 1,	
		});
    }
    else{
      res.render('sectionEnd', {
        section: req.params.sectionNumber,
       	nextSection : req.params.sectionNumber - 0 + 1
      });
    }
});
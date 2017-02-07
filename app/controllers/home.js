var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  Test = mongoose.model('Test'),
  Question = mongoose.model('Question');

module.exports = function (app) {
  app.use('/', router);
};

// router.get('/', function (req, res, next) {
//   Article.find(function (err, articles) {
//     if (err) return next(err);
//     res.render('index', {
//       title: 'Human Algorithms',
//       articles: articles
//     });
//   });
// });

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Human Algorithms'
  });
});

router.get('/start', function (req, res, next) {
  var test = new Test({
    correct: 0,
    total: 0,
    email: "",
    questions: [],
    sections: 1
  });
  Question.find({section: 1}, function(err,questions){
    console.log(questions)
    addQuestions(test,questions);
    // var question = Question.createQuestion()
    console.log(test);
    test.save(function (err,test) {
      res.redirect('/start/test/' + test.id);
    });
  });
});

router.get('/start/test/:test', function (req, res, next) {
  res.render('start',{
    test: req.params.test
  })
});

function addQuestions(test,questions){
    for(var i = 0; i < 4; ++i){
      var index = Math.floor(Math.random()*questions.length)
      test.questions.push(questions[index].id)
      questions.splice(index,1);
      console.log(questions)
    }
}

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/test/:test/startSection/:sectionNumber', function (req, res, next) {
  Test.findById(req.params.test, function(err, test) {
    console.log("im here")
    console.log(test.questions)
    if(test.questions.length){
      res.render('sectionInstructions', {
        section: req.params.sectionNumber,
        nextSection : req.params.sectionNumber - 0 + 1,
        test: test.id
      });
    }
    else{
      res.render('results', {
        correct: test.correct,
        total: test.total,
        test: test.id
      });
    }
  });
});
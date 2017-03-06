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
    name: "",
    questions: [],
    sections: 1,
    sectionProgress: 0,
    sectionTotal: 0,
    sectionLengths: [4,1,4],
    time: 0
  });
  Question.find({section: 1}, function(err,questions){
    addQuestions(test,questions,test.sectionLengths[0]);
    // var question = Question.createQuestion()
    Question.find({section: 2}, function(err,questions){
      addQuestions(test,questions,test.sectionLengths[1]);
      Question.find({section: 3}, function(err,questions){
      addQuestions(test,questions,test.sectionLengths[2]);
        test.save(function (err,test) {
          res.redirect('/start/test/' + test.id);
        });
      });
    });
  });
});

router.get('/start/test/:test', function (req, res, next) {
  res.render('start',{
    test: req.params.test
  })
});

function addQuestions(test,questions,number){
    for(var i = 0; i < number; ++i){
      var index = Math.floor(Math.random()*questions.length)
      test.questions.push(questions[index].id)
      questions.splice(index,1);
    }
}

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/test/:test/startSection/:sectionNumber', function (req, res, next) {
  Test.findById(req.params.test).populate('questions').exec(function(err, test) {
    if(req.query.name && req.query.email){
      test.name = req.query.name;
      test.email = req.query.email;
    }
    if(test.questions.length){
      while(test.questions.length && test.questions[0].section < req.params.sectionNumber){
        test.questions.splice(0,1);
        console.log("cut")
      }
      test.save(function (err,test) {
        console.log(test)
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
          test: test.id,
          resultsBar: (test.correct/test.total) * 100 + "%",
          time: Math.round(test.time)
        });
      }
      });
    }
    else{
      res.render('results', {
        correct: test.correct,
        total: test.total,
        test: test.id,
        resultsBar: (test.correct/test.total) * 100 + "%",
        time: Math.round(test.time)
      });
    }
  });
});
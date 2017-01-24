var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

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
  correct = 0;
  total = 0;
  res.render('index', {
    title: 'Human Algorithms'
  });
});

router.get('/start', function (req, res, next) {
    res.render('start');
});

router.get('/about', function (req, res, next) {
    res.render('about');
});

router.get('/startSection/:sectionNumber', function (req, res, next) {
    if(req.params.sectionNumber - 0 < 4){
      res.render('sectionInstructions', {
        section: req.params.sectionNumber,
        nextSection : req.params.sectionNumber - 0 + 1
      });
    }
    else{
      res.render('results', {
        correct: correct,
        total: total
      });
    }
  });
const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');

var router = express.Router();

router.get('/', function(req, res, next) {
  // Get the request params
  var id = req.query.id;
  // console.log(id);

	const title = 'NewsTube'
  // Retrieve the top headlines
  processNews.getTopArticles().then((response) => {
    res.render('index', {title: title, articles: response.articles});
    // console.log(response);

  }).catch((err) => {
    res.render('error', { message: "An Error Occured Fetching Articles", error: err });
  });
  // processAnalysis.sentimentAnalysis().then((response) => {
  //   res.render('index', {title: title});
  //   console.log(response);

  // }).catch((err) => {
  //   res.render('error', { message: "An Error Occured Fetching Articles", error: err });
  // });
});

router.post('/analyse', function(req, res, next) {
  var title = "result";
  let query = req.body.query;
  if (query === null){
    res.render('error', {message: "Invalid query"});
  }
  processAnalysis.sentimentAnalysis(query).then((response) => {
    res.render('layout', {title: title});
    // console.log(response);

  }).catch((err) => {
    res.render('error', { message: "An Error Occured Extracting Content", error: err });
  });
    // // res.render('layout');
    // // console.log(query);
    // var result = extractContent.extractArticle(query);
    // console.log(result);
  
});

module.exports = router;
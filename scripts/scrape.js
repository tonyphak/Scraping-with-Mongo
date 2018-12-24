// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var scrape = function(cb){
    axios.get("https://www.npr.org/sections/politics/").then(function(response){
        var $ = cheerio.load(response.data);

        var articles = [];

        $("h2.title").each(function(i, element) {
            var result = {};
            result.headline = $(this)
            .children("a")
            .text()
            .trim();
            result.summary = $(this)
            .siblings("p")
            .text()
            .trim();
            result.url = $(this)
            .children("a")
            .attr("href");
            // db.Article.create(result)
            // .then(function(dbArticle){
            //     console.log(dbArticle);
            // })
            // .catch(function(err){
            //     console.log(err);
            // });
            var addData = {
                headline: result.headline,
                summary: result.summary,
                url: result.url
            };
        articles.push(addData);
        });
        cb(articles);
        // res.send("Scrape Complete");
    });
};

module.exports = scrape;



// app.get("/scrape", function(req, res){
    
// });

// app.get("/articles", function(req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//       .then(function(dbArticle) {
//         // If we were able to successfully find Articles, send them back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

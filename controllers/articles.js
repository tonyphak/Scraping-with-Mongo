var scrape = require("../scripts/scrape");

var Article = require("../models/Article");

module.exports = {
    //scrapes articles from NPR and set saved to false for each article
    fetch: function(cb) {
        scrape(function(data){
            var articles = data;
            for(var i=0; i < articles.length; i++){
                articles[i].saved = false;
            }
            Article.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
    //function to delete article or remove article
    delete: function(query, cb){
        Article.remove(query, cb);
    },
    //get items in collection of db out and sort descending then past into cb function
    get: function(query, cb){
        Article.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, docs){
            cb(docs);
        });
    },
    //function to update articles that are scraped with new ID
    update: function(query, cb){
        Article.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}
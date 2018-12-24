//routes execute url path and renders pages from html or handlebars
// bring in scrape function 
var scrape = require("../scripts/scrape");
//controllers executes CRUD
var articleController = require("../controllers/articles");
var noteController = require("../controllers/notes"); 


module.exports = function(router){
    router.get("/", function(req, res){
        res.render("home");
    });
    router.get("/saved", function(req, res){
        res.render("saved");
    });
    //get information and places it in api/fetch
    router.get("/api/scrape", function(req, res){ 
        //goes into article controller and run fetch function inside controller
        articleController.fetch(function(err, docs){
            //if no new articles added or none at all displays message.
            if(!docs || docs.insertedCount === 0){
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                //message tells user how many artciles are added
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    //get all the headlines in the database when /api/articles is hit
    router.get("/api/articles", function(req, res){
        var query = {};
        //if user specifies a saved article or any parameter then set query to that
        if (req.query.saved){
            query = req.query;
        }

        articleController.get(query, function(data){
            res.json(data);
        });
    });
    //when this is hit, user deletes a specific article
    router.delete("/api/articles/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        articleController.delete(query, function(err, data){
            res.json(data);
        });
    });
    //route to update articles
    router.put("/api/articles", function(req, res){
        articleController.update(req.body, function(err, data){
            res.json(data);
        });
    }); 
    //route to grab notes associated with article and display to user
    router.get("/api/notes/:articles_id?", function(req, res){
        var query = {};
        if (req.params.article_id){
            query._id = req.params.article_id;
        }

        noteController.get(query, function(err, data){
            res.json(data);
        });
    });
    //route to delete notes
    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        //user chosen associated query
        query._id = req.params.id;
        noteController.delete(query, function(err, data){
            res.json(data);
        });
    });    
    //route to post new notes to article
    router.post("/api/notes", function(req, res){
        //runs save function in noteController and uses the req.body from the user input
        noteController.save(req.body, function(data){
            //output is json format to display frontend of the application
            res.json(data);
        });
    });
}
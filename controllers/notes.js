var Note = require("../models/Note");

module.exports = {
    //get function to get notes that user created
    get: function(data, cb){
        Note.find({
            _articleId: data._id
        }, cb);
    },
    //save function that saves artcileid, title, body that user creates
    save: function(data, cb){
        var newNote = {
            _articleId: data._id,
            title: data.title,
            body: data.body
        };
        //creates note that returns error or document
        Note.create(newNote, function(err, doc){
            if (err){
                console.log(doc);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    //delete function to delete note associated with artcile
    delete: function(data, db){
        Note.remove({
            _id: data.id
        }, cb);
    }

}
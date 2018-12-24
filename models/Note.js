var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    _articleId: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    title: String,
    body: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
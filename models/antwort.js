

const mongoose = require("mongoose");
const { Schema } = mongoose;
const AntwortSchema = new Schema({
    Question:String,
    frage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Frage",
      },
    antwort:String,
    umfrageId:String,
    umfrageTitel:String
});
module.exports = mongoose.model("Antwort", AntwortSchema);
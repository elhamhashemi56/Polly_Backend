const mongoose = require("mongoose");
const { Schema } = mongoose;

const FrageSchema = new Schema({
    frage:String,
    umfrage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Umfrage",
      },
    antworten:[String],
    titel:String
});

module.exports = mongoose.model("Frage", FrageSchema);
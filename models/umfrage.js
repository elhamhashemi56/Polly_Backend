const mongoose = require("mongoose");
const { Schema } = mongoose;

const UmfrageSchema = new Schema({
    titel: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    date:String
});

module.exports = mongoose.model("Umfrage", UmfrageSchema);
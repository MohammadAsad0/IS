const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model("File", FileSchema);
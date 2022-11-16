const mongoose = require("mongoose");

const textSchema = mongoose.Schema({
    iv: String,
    encryptedData: String
});

const FileSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    encryptedText: {
        type: textSchema,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model("File", FileSchema);
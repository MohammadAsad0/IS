var express = require('express');
var QRRouter = express.Router();
const bcrypt = require("bcrypt");

const fileModel = require("../models/file");
const {decrypt} = require("../Encryption/crypto");

var fileId;
/* GET QR page. */
QRRouter.get('/:id', (req, res, next) => {
    fileId = req.params.id;
    res.render('QR');
});

QRRouter.post('/', async (req, res) => {
    const {password} = req.body;

    try {        
        const fileFound = await fileModel.findOne({id: fileId});

        if(!fileFound) {
            return res.status(404).json({message: "File not found"});
        }

        const matchPassword = await bcrypt.compare(password, fileFound.password);

        if(!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        res.render("QRResult", {title: fileFound.title, text: decrypt(fileFound.encryptedText)});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed"});
    }
});

module.exports = QRRouter;

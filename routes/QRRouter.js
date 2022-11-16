var express = require('express');
var QRRouter = express.Router();
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');

const fileModel = require("../models/file");
const {decrypt} = require("../Encryption/crypto");

/* GET QR page. */
QRRouter.get('/:id', (req, res, next) => {
    var fileId = req.params.id;
    res.render('QR', {fileId: fileId});
});

QRRouter.post('/', async (req, res) => {
    var {fileId, password} = req.body;

    try {        
        var fileFound = await fileModel.findOne({_id: fileId});

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

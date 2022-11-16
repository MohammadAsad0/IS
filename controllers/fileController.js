const fileModel = require("../models/file");
const {encrypt, decrypt} = require("../Encryption/crypto");
const bcrypt = require("bcrypt");

const getFiles = async (req, res) => {
    try {
        fileModel.find({userId: req.userId}).lean().exec((err, result) => {

            if (err) {
                res.status(400).json({message: "Error Occured"});
            } else {
                
                result.forEach(file => {
                    file.encryptedText = decrypt(file.encryptedText);
                    file.password = "";
                });

                res.status(201).json(result);
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed"});
    }
}

const createFiles = async (req, res) => {
    const {title, text, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.FILE_HASH_ROUNDS));

    const file = new fileModel({
        title: title,
        encryptedText: encrypt(text),
        userId: req.userId,
        password: hashedPassword
    });

    try {
        await file.save();
        res.status(201).json(file);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed"});
    }
}

const updateFiles = async (req, res) => {

    const id = req.params.id;
    const {title, text, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.FILE_HASH_ROUNDS));

    const file = {
        title: title,
        encryptedText: encrypt(text),
        userId: req.userId,
        password: hashedPassword
    }

    try {
        await fileModel.findByIdAndUpdate(id, file, {new: true});
        res.status(201).json(file);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed"});
    }
}

const deleteFiles = async (req, res) => {
    
    const id = req.params.id;

    try {
        const file = await fileModel.findByIdAndRemove(id);
        res.status(201).json(file);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed"});
    }
}

module.exports = {
    getFiles,
    createFiles,
    updateFiles,
    deleteFiles
}

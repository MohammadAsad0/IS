const fileModel = require("../models/file");

const getFiles = async (req, res) => {

    try {
        fileModel.find({userId: req.userId}, (err, result) => {

            if (err) {
                res.status(400).json({message: "Error Occured"});
            } else {
                res.status(201).json(result);
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed"});
    }
}

const createFiles = async (req, res) => {
    const {title, text} = req.body;

    const file = new fileModel({
        title: title,
        text: text,
        userId: req.userId
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
    const {title, text} = req.body;

    const file = {
        title: title,
        text: text,
        userId: req.userId
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

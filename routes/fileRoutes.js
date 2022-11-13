const express = require("express");
const { getFiles, createFiles, deleteFiles, updateFiles } = require("../controllers/fileController");
const auth = require("../middlewares/auth");
const fileRouter = express.Router();

// when user requests for /files/ the auth.js middleware checks if the user is authenticated and will call the getFiles function in fileController.js
fileRouter.get("/", auth, getFiles);

fileRouter.post("/", auth, createFiles);

fileRouter.delete('/:id', auth, deleteFiles);

fileRouter.put("/:id", auth, updateFiles);

module.exports = fileRouter;
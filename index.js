const express = require("express");

const userController = require("./controller/user.controller");

const galleryController = require("./controller/gallery.controller");

const app = express();

app.use(express.json());

app.use("/users", userController);

app.use("/users/gallery", galleryController);

module.exports = app;

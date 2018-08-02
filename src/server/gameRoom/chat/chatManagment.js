const express = require("express");
const bodyParser = require("body-parser");
const users = require("../../users/users.js");
const chat = require("./chat.js");
const chatManagement = express.Router();

chatManagement.use(bodyParser.text());

chatManagement
  .route("/")
  .get(users.userAuthentication, (req, res) => {
    res.json(chat.getChat(req, res));
  })
  .post(users.userAuthentication, (req, res) => {
    chat.postChat(req, res);
    res.sendStatus(200);
  });

module.exports = chatManagement;

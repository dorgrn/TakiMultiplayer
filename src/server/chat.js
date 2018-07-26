const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./auth");

const chatContent = [];

const chatManagement = express.Router();

chatManagement.use(bodyParser.text());

chatManagement
  .route("/")
  .get(auth.userAuthentication, (req, res) => {
    res.json(chatContent);
  })
  .post(auth.userAuthentication, (req, res) => {
    const body = req.body;
    const userInfo = auth.getUserInfo(req.session.id);
    chatContent.push({ user: userInfo, text: body });
    res.sendStatus(200);
  });

chatManagement.appendUserLogoutMessage = function(userInfo) {
  chatContent.push({ user: userInfo, text: `user had logout` });
};

module.exports = chatManagement;

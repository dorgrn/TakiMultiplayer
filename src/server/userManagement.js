const express = require("express");
const auth = require("./auth");
const chatManagement = require("./chat");

const userManagement = express.Router();

userManagement.get("/", auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id);
  res.json(userName);
});

userManagement.get("/allUsers", auth.userAuthentication, (req, res) => {
  res.json(auth.getAllUsers());
});

userManagement.
post("/addUser", auth.addUserToAuthList, (req, res) => {
  res.sendStatus(200);
});

userManagement.get("/logout", [
  (req, res, next) => {
    const userinfo = auth.getUserInfo(req.session.id);
    chatManagement.appendUserLogoutMessage(userinfo);
    next();
  },
  auth.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = userManagement;

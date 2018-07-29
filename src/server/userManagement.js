const express = require("express");
const auth = require("./auth");
const chatManagement = require("./chat");

const userManagement = express.Router();

userManagement.get("/", auth.userAuthentication, (req, res) => {
  const user = auth.userList.getUserById(req.session.id);
  res.json(user);
});

userManagement.get("/allUsers", auth.userAuthentication, (req, res) => {
  res.json(auth.userList.getAll());
});

userManagement.
post("/addUser", auth.addUserToAuthList, (req, res) => {
  res.sendStatus(200);
});

userManagement.get("/logout", [
  (req, res, next) => {
    const user = auth.userList.getUserById(req.session.id);
    chatManagement.appendUserLogoutMessage(user);
    next();
  },
  auth.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = userManagement;

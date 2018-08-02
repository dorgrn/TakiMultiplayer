const express = require("express");
const users = require("./users");

const userManagement = express.Router();

userManagement.get("/", users.userAuthentication, (req, res) => {
  const user = users.userList.getUserById(req.session.id);
  res.json(user);
});

userManagement.get("/allUsers", users.userAuthentication, (req, res) => {
  res.json(users.userList.getAll());
});

userManagement.
post("/addUser", users.addUserToAuthList, (req, res) => {
  res.sendStatus(200);
});

userManagement.get("/logout", [
  users.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = userManagement;

const User = require("./User");
const PC = require("./PC");
const UserList = require("./UserList.js");

const userList = new UserList();

function createUserPlayer(name){
  return new User(name);
}

function createPCPlayer(){
  return new PC();
}

function userAuthentication(req, res, next) {
  if (!userList.isIdExists(req.session.id)) {
    res.sendStatus(401);
  } else {
    next();
  }
}

function addUserToAuthList(req, res, next) {
  // req.body = username
  const userName = req.body;
  if (userList.isIdExists(req.session.id)) {
      res.status(403).send("user already exist");
      return;
  }
  else if (userList.isNameExists(userName)) {
      res.status(403).send("user name already exist");
      return;
  }

  userList.add(req.session.id, createUserPlayer(userName));
  next();
}

function removeUserFromAuthList(req, res, next) {
  if (!userList.isIdExists(req.session.id)) {
    res.status(403).send("user does not exist");
  } else {
    userList.remove(req.session.id);
    next();
  }
}

module.exports = {
  userList,
  userAuthentication,
  addUserToAuthList,
  removeUserFromAuthList,
  createUserPlayer,
  createPCPlayer
};

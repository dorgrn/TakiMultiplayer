const path = require("path");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const userManagement = require("./server/users/usersManagement");
const gameManagement = require("./server/games/gamesManagement");
const users = require("./server/users/users");
const chatManagement = require("./server/chat");
const gameRoomManagement = require("./server/gameRoom/gameRoomMangement");
const app = express();

// configurations
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 269999999999 },
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.text());
app.use(express.static(path.resolve(__dirname, "..", "public")));

// router mappings
app.use("/users", userManagement);
app.use("/chat", chatManagement);
app.use("/games", gameManagement);
app.use("/gameRoom", gameRoomManagement);

app.listen(3000, console.log("Example app listening on port 3000!"));

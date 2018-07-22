import { observable } from "mobx";

const gameUtils = require("../utils/gameUtils");

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.gameStore = new GameStore(this);
  }
}

class UserStore {
  @observable users = [];

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.fetchUsers();
  }

  getGamesForUser(user){
    return gameUtils.getGamesForUser(user);
  }
}

class GameStore {
  @observable games = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

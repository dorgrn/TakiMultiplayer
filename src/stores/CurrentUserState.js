import { observable } from "mobx";

export default class CurrentUserState {
  @observable name = "";
  @observable sessionId = "";
  @observable currentGame = null;
}

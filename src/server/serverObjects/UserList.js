const User = require("./User.js");
const List = require("./List.js");

module.exports = class UserList extends List{
  constructor(){
      super();
  }

  add(key, value){
      if (value instanceof User){
          super.add(key, value);
      }
  }

  isIdExists(id){
      return this.isKeyExists(id);
  }

  isNameExists(name){
      for (let id in this.list) {
          const user = this.list[id];
          if (user.name === name) {
              return true;
          }
      }

      return false;
  }

  getUserById(id){
      return this.list[id];
  }

  getUserByName(name){
      const id = _.findKey(this.list, user => (user.name = name));
      return this.getUserById(id);
  }

    getAll(){
        const users = {};
        for (let name in this.list) {
            const user = this.list[name];
            users[name] = user.getState();
        }

        return users;
    }

};
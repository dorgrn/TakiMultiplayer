import Player from "./Player";

const playerFactory = (function() {
  const TYPES = {
    PC: "pc",
    USER: "user"
  };


  return {
    HAND_INITIAL_SIZE: 8,

    createPlayers: function(playersDTO){
      let players=[];
      for(let i=0; i<playersDTO.length;i++){
        if(playersDTO[i].playerType === TYPES.USER){
            players.push(this.createUserPlayer(playersDTO[i].name));
        }
        else if(playersDTO[i].playerType === TYPES.PC){
            players.push(this.createPCPlayer());
        }
      }

      return players;
    },

    createUserPlayer: function(name){
      return new Player(TYPES.USER, name);
    },

    createPCPlayer: function(){
      return new Player(TYPES.PC, "PC player");
    },

    getTypes: function() {
        return TYPES;
    }

  };
})();

export default playerFactory;

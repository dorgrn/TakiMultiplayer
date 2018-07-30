const Hand = require("./Hand");
const Card = require("./Card");
const Stopwatch = require("./Stopwatch");

const PLAYING_STATUS = {
  PLAYING: "playing",
  DONE: "done"
};

const TYPES = {
    PC: "pc",
    USER: "user"
};

const HAND_INITIAL_SIZE = 8;



module.exports = class Player{
    constructor(type, name){
        this.name = name;
        this.stats = {
            lastCardCounter: 0,
            turnsAmount: 0,
            turnsTime: 0,
            turnsAvgTime: 0,
            turnStopWatch: new Stopwatch()
        };
        this.playerType = type;
        this.inTakiMode = {
            status: false,
            takiId: {}
        };
        this.isStopped = false;
        this.mustTake = 0;
        this.hand = new Hand();
        this.playingStatus = PLAYING_STATUS.PLAYING;
        this.place = 0;
    }

    static get TYPES(){
      return TYPES;
    }

    static get PLAYING_STATUS(){
      return PLAYING_STATUS;
    }

    static get HAND_INITIAL_SIZE(){
      return HAND_INITIAL_SIZE;
    }

  static getAvgTime(turnsAmount, turnsTime) {
    return turnsAmount === 0
      ? 0
      : Stopwatch.millisToMinutesAndSeconds(turnsTime / turnsAmount);
  }

  init() {
    this.hand.init();
    this.stats.score = 0;
    this.stats.lastCardCounter = 0;
    this.stats.turnsAmount = 0;
    this.stats.turnsTime = 0;
    this.stats.turnsAvgTime = 0;
    this.isStopped = false;
    this.mustTake = 0;
    this.playingStatus = PLAYING_STATUS.PLAYING;
    this.place = 0;
  }

  isAbleToDrawFromDeck() {
    return !this.inTakiMode.status && this.hand.legalCards.length === 0;
  }

  clearLegalCards() {
    this.hand.legalCards = [];
  }

  hasLastCard() {
    return this.hand.cards.length === 1;
  }

  getAvgTurnTime() {
    return Player.getAvgTime(this.stats.turnsAmount, this.stats.turnsTime);
  }

    copyState() {
        return {
            name: this.name,
            type: this.playerType,
            hand: this.hand.copyState(),
            cardsAmount: this.hand.cards.length,
            stats: Object.assign({}, this.stats),
            place: this.place,
            playingStatus: this.playingStatus
        };
    }

  determinePCPlay(top) {
    const TYPES = Card.TYPES;
    const legalCards = this.hand.legalCards;
    let cardToPlay;

    //if PC is in the middle of taki mode
    if (this.inTakiMode.status) {
      let options = [
        { type: TYPES.TAKI, color: top.color, value: undefined },
        { type: TYPES.PLUS, color: top.color, value: undefined },
        { type: TYPES.STOP, color: top.color, value: undefined },
        { type: TYPES.REVERSE, color: top.color, value: undefined },
        { type: TYPES.VALUE, color: top.color, value: undefined },
        { type: TYPES.TAKE2, color: top.color, value: undefined }
      ];

      cardToPlay = this.findPlayableCard(legalCards, options);
    }
    //if PC has to respond over take2 card
    else if (this.mustTake > 0) {
      let options = [{ type: TYPES.TAKE2, color: undefined, value: undefined }];

      cardToPlay = this.findPlayableCard(legalCards, options);
    }
    //if no special situation occurred then PC acts normally
    else {
      let options = [
        { type: TYPES.TAKE2, color: undefined, value: undefined },
        { type: TYPES.STOP, color: undefined, value: undefined },
        { type: TYPES.PLUS, color: undefined, value: undefined },
        { type: TYPES.REVERSE, color: undefined, value: undefined },
        { type: TYPES.TAKI, color: undefined, value: undefined },
        { type: TYPES.VALUE, color: top.color, value: undefined },
        { type: TYPES.VALUE, color: undefined, value: undefined },
        { type: TYPES.SUPER_TAKI, color: undefined, value: undefined },
        { type: TYPES.CHANGE, color: undefined, value: undefined }
      ];

      cardToPlay = this.findPlayableCard(legalCards, options);
    }

    return cardToPlay;
  }

  findPlayableCard(legalCards, options) {
    const findCardInArray = Card.findCardInArray;
    let isPlayed = false;
    let cardToPlay;

    for (let i = 0; i < options.length && !isPlayed; i++) {
      let type = options[i].type;
      let color = options[i].color;
      let value = options[i].value;
      if (findCardInArray(legalCards, type, color, value)) {
        cardToPlay = findCardInArray(legalCards, type, color, value);
        isPlayed = true;
      }
    }
    return cardToPlay;
  }

  determinePCColor() {
    let i;
    const cards = this.hand.cards;
    const colorsCount = [];
    let colorSelected;
    let max = 0;

    for (i = 0; i < Card.COLORS.length; i++) {
      colorsCount[Card.COLORS[i]] = 0;
    }

    for (i = 0; i < cards.length; i++) {
      if (cards[i].color !== "colorful") {
        colorsCount[cards[i].color]++;
        if (colorsCount[cards[i].color] > max) {
          max = colorsCount[cards[i].color];
          colorSelected = cards[i].color;
        }
      }
    }

    if (max === 0) {
      colorSelected =
          Card.COLORS[
          Math.floor(Math.random() * Card.COLORS.length)
        ];
    }

    return colorSelected;
  }

  startTurn() {
    this.stats.turnStopWatch.start();
    if (this.hasLastCard()) {
      this.stats.lastCardCounter++;
    }

    this.stats.turnsAmount++;
  }

  endTurn() {
    this.clearLegalCards();
    const elapsed = this.stats.turnStopWatch.stop();
    this.stats.turnsTime += elapsed;
    this.stats.turnsAvgTime = this.getAvgTurnTime();
  }

  setDone() {
    this.playingStatus = PLAYING_STATUS.DONE;
  }

  isPlaying() {
    return this.playingStatus === PLAYING_STATUS.PLAYING;
  }

  isPC() {
    return this.playerType === TYPES.PC;
  }

  isUser() {
    return this.playerType === TYPES.USER;
  }

  static comparePlayersPlaces(player1, player2) {
    if (player1.place < player2.place) {
      return -1;
    }
    if (player1.place > player2.place) {
      return 1;
    }

    return 0;
  }

    static createPlayers(playersDTO){
        let players=[];
        for(let i=0; i<playersDTO.length;i++){
            if(playersDTO[i].type === TYPES.USER){
                players.push(Player.createUserPlayer(playersDTO[i].name));
            }
        }

        for(let i=0; i<playersDTO.length;i++){
            if(playersDTO[i].type === TYPES.PC){
                players.push(Player.createPCPlayer());
            }
        }

        return players;
    }

    static createUserPlayer(name){
        return new Player(TYPES.USER, name);
    }

    static createPCPlayer(){
        return new Player(TYPES.PC, "PC player");
    }
};

const Stats = require("./Stats");
const PlayZone = require("./PlayZone");
const Deck = require("./Deck");
const Player = require("./Player");
const Card = require("./Card");
const History = require("./History");

function funcOpenTaki() {
  const activePlayer = this.getActivePlayer();
  activePlayer.inTakiMode.status = true;
  activePlayer.inTakiMode.takiId = this.playZone.getTop().cardId;
  this.fillLegalCards();
  this.history.gamePostTakiOpened(this.stats.getElapsedTime());
  if (activePlayer.isPC()) {
    this.doPlayerTurn();
  }
}

function funcChangeColor() {
  const activePlayer = this.getActivePlayer();
  if (activePlayer.isPC()) {
    this.colorSelected(activePlayer.determinePCColor());
  }
}

function funcStop() {
  this.getNextPlayer().isStopped = true;
  this.swapPlayer();
}

function funcPlus() {
  const activePlayer = this.getActivePlayer();
  activePlayer.endTurn();
  this.doPlayerTurn();
}

function funcTake2() {
  const activePlayer = this.getActivePlayer();
  const nextPlayer = this.getNextPlayer();
  nextPlayer.mustTake = activePlayer.mustTake + 2;
  activePlayer.mustTake = 0;
  this.swapPlayer();
}

function funcReverse() {
  this.playingDirection *= -1;
  this.history.gamePostReverseDirection(this.stats.getElapsedTime());
  this.swapPlayer();
}

function funcSuperTaki() {
  const activePlayer = this.getActivePlayer();
  activePlayer.inTakiMode.status = true;
  funcChangeColor.call(this);
  funcOpenTaki.call(this);
}


module.exports = class GameLogic{
    constructor(playersDTO){
        this.stats = new Stats();
        this.history = new History();
        this.deck = new Deck();
        this.playZone = new PlayZone();
        this.players = Player.createPlayers(playersDTO);
        this.currentlyPlaying = playersDTO.length;
        this.donePlayers = [];
        this.playingDirection=1;
        this.playerTurn = 0;

    this.init();
  }

    //TODO: this method is vital for server
    getBoardState() {
        return {
            players: this.players.map(player => player.copyState()),
            donePlayers: this.donePlayers.map(player => player.copyState()),
            turn: this.playerTurn,
            stats: this.stats.copyState(),
            playZone: this.playZone.copyState(),
            deck: this.deck.copyState(),
            history: this.history.copyState(),
            playingDirection: this.playingDirection
        };
    }

  //TODO: this method is vital for server
  colorSelected(color) {
    const activePlayer = this.getActivePlayer();
    const top = this.playZone.popTheTop();
    top.color = color;
    top.frontImg = top.frontImg.replace("colorful", color);
    this.playZone.putOnTop(top);
    this.fillLegalCards();

    this.history.gamePostColorChanged(this.stats.getElapsedTime(), color);
    if (activePlayer.inTakiMode.status === false) {
      this.swapPlayer();
    }
  }

  //TODO: this method is vital for server
  takiClosed() {
    const activePlayer = this.getActivePlayer();
    const top = this.playZone.getTop();
    activePlayer.inTakiMode.status = false;

    this.history.gamePostTakiClosed(this.stats.getElapsedTime());
    //need to check functionality of the last card in taki.
    if (activePlayer.inTakiMode.takiId !== top.cardId) {
      activePlayer.inTakiMode.takiId = {};
      this.activateCard(top);
    } else {
      this.swapPlayer();
    }
  }

  activateCard(card) {
    const activePlayer = this.getActivePlayer();
    const types = Card.TYPES;
    if (activePlayer.inTakiMode.status === true) {
      if (activePlayer.isPC()) {
        this.doPlayerTurn();
      }
    } else {
      switch (card.type) {
        case types.VALUE:
          this.swapPlayer();
          break;
        case types.TAKI:
          funcOpenTaki.call(this);
          break;
        case types.CHANGE:
          funcChangeColor.call(this);
          break;
        case types.TAKE2:
          funcTake2.call(this);
          break;
        case types.STOP:
          funcStop.call(this);
          break;
        case types.PLUS:
          funcPlus.call(this);
          break;
        case types.REVERSE:
          funcReverse.call(this);
          break;
        case types.SUPER_TAKI:
          funcSuperTaki.call(this);
          break;
      }
    }
  }

  //TODO: this method is vital for server
  playCard(cardId) {
    const activePlayer = this.getActivePlayer();
    const card = activePlayer.hand.cards.find(card => card.cardId === cardId);

    if (!this.isCardLegal(card)) {
      return;
    }

    activePlayer.hand.removeCard(card);
    this.playZone.putOnTop(card);
    this.history.playerPostPlay(
      this.stats.getElapsedTime(),
      this.stats.turnAmount,
      activePlayer,
      card
    );
    this.activateCard(card);
  }

  drawCard() {
    let cardDrawn = this.deck.drawCard();
    // if the deck is empty, take the cards from playZone
    if (this.deck.isEmpty()) {
      const newDeck = this.playZone.getUsedCards(); // copy the original deck except for the first card
      this.deck.insertCards(newDeck); // insert it shuffled to deck
    }

    return cardDrawn;
  }

  drawCardsToPlayer(player) {
    let card;
    let cardsDrawn = 0;
    if (player.mustTake > 0) {
      for (let i = 0; i < player.mustTake; i++) {
        card = this.drawCard();
        cardsDrawn++;
        player.hand.cards.push(card);
      }

      player.mustTake = 0;
    } else {
      card = this.drawCard();
      cardsDrawn++;
      player.hand.cards.push(card);
    }
    this.history.playerPostDraw(
      this.stats.getElapsedTime(),
      this.stats.turnAmount,
      player,
      cardsDrawn
    );
  }

  //TODO: this method is vital for server
  drawCardsWhenNoLegal(player) {
    if (player.isAbleToDrawFromDeck()) {
      this.drawCardsToPlayer(player);
      this.swapPlayer();
    }
  }

  fillLegalCards() {
    const activePlayer = this.getActivePlayer();
    activePlayer.hand.legalCards = activePlayer.hand.cards.filter(
      this.isCardLegal.bind(this)
    );
  }

  isCardLegal(card) {
    const topPlayZone = this.playZone.getTop();
    const activePlayer = this.getActivePlayer();

    if (activePlayer.inTakiMode.status) {
      return topPlayZone.compareColor(card);
    } else if (
      this.getActivePlayer().mustTake > 0 &&
      this.playZone.getTop().type === "take2"
    ) {
      return topPlayZone.compareType(card);
    }

    return (
      topPlayZone.compareColor(card) ||
      (topPlayZone.isValueCard() &&
        card.isValueCard() &&
        topPlayZone.compareValue(card)) ||
      (topPlayZone.isSpecialCard() &&
        card.isSpecialCard() &&
        topPlayZone.compareType(card)) ||
      card.isSuperCard()
    );
  }

    gameEnded() {
        this.stats.gameWatch.stop();
        this.stats.isGameEnded = true;
    }

  swapPlayer() {
    let activePlayer = this.getActivePlayer();
    activePlayer.endTurn();
    if (activePlayer.hand.cards.length === 0) {
      this.history.playerPostDone(
        this.stats.getElapsedTime(),
        this.stats.turnAmount,
        activePlayer
      );
      this.playerDonePlaying();
    }

    if (this.currentlyPlaying === 1) {
      this.setNextPlayerAsActive();
      this.playerDonePlaying();
      this.gameEnded();
    }

        if (!this.stats.isGameEnded) {
            this.setNextPlayerAsActive();
            this.doPlayerTurn();
        }
    }

  playerDonePlaying() {
    let activePlayer = this.getActivePlayer();
    this.currentlyPlaying--;
    this.donePlayers.push(activePlayer);
    activePlayer.place = this.players.length - this.currentlyPlaying;
    activePlayer.setDone();
  }

  doPlayerTurn() {
    const activePlayer = this.getActivePlayer();
    if (activePlayer.isStopped === true) {
      this.history.gamePostStopPlayer(
        this.stats.getElapsedTime(),
        activePlayer
      );
      activePlayer.isStopped = false;
      this.swapPlayer();
    } else {
      activePlayer.startTurn();
      this.stats.turnAmount++;
      this.fillLegalCards();
      if (activePlayer.isPC()) {
        setTimeout(this.doPCTurn.bind(this), 1200);
      }
    }
  }

  doPCTurn() {
    const activePlayer = this.getActivePlayer();
    let cardToPlay = activePlayer.determinePCPlay(this.playZone.getTop());
    if (cardToPlay == null) {
      if (activePlayer.inTakiMode.status === true) {
        this.takiClosed();
      } else {
        this.drawCardsWhenNoLegal(activePlayer);
      }
    } else {
      this.playCard(cardToPlay.cardId);
    }
  }

  getActivePlayer() {
    return this.players[this.playerTurn];
  }

  getNextPlayerIndex(){
      let i =
          (this.playerTurn + this.playingDirection + this.players.length) %
          this.players.length;
      while (i !== this.playerTurn) {
          if (this.players[i].isPlaying()) {
              break;
          }
          i =
              (i + this.playingDirection + this.players.length) % this.players.length;
      }

      return i;
  }

  getNextPlayer() {
      return this.players[this.getNextPlayerIndex()];
  }

  setNextPlayerAsActive() {
      this.playerTurn = this.getNextPlayerIndex();
  }

  init() {
    this.stats.resetGameStats();
    this.stats.gameWatch.start();
    this.history.clearHistory();

    this.deck.init();
    // draw the first card to playZone
    let card = this.drawCard();

    while (card.isSuperCard()) {
      this.deck.insertCard(card);
      card = this.drawCard();
    }
    this.playZone.init();
    this.playZone.putOnTop(card);

    // deal the first cards to players
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].init();
      this.players[i].mustTake = Player.HAND_INITIAL_SIZE;
      this.drawCardsToPlayer(this.players[i]);
    }

    this.currentlyPlaying = this.players.length;
    this.playerTurn = 0;
    this.doPlayerTurn();
  }
};

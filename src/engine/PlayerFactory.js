import handFactory from "../engine/HandFactory.js";
import stopWatchFactory from "../engine/StopWatchFactory.js";
import manager from "../engine/Manager.js";
import stats from "../engine/Stats.js";
import cardFactory from "../engine/CardFactory.js";

const playerFactory = (function() {
  const TYPES = {
    PC: "pc",
    USER: "user"
  };

  function getAvgTime(turnsAmount, turnsTime) {
    return turnsAmount === 0
      ? 0
      : stopWatchFactory.millisToMinutesAndSeconds(turnsTime / turnsAmount);
  }

  return {
    HAND_INITIAL_SIZE: 8,

    createPlayer: function(type) {
      const player = {
        stats: {
          score: 0,
          lastCardCounter: 0,
          turnAmount: 0,
          turnAmountAllGames: 0,
          turnsTime: 0,
          turnsTimeAllGames: 0,
          turnsAvgTime: 0,
          turnsAvgTimeAllGames: 0
        },
        playerType: type,
        inTakiMode: {
          status: false,
          takiId: {}
        },
        isStopped: false,
        mustTake: 0,
        hand: handFactory.createHand()
      };

      player.init = function() {
        player.hand.init();

        this.stats.score = 0;
        this.stats.lastCardCounter = 0;
        this.stats.turnAmount = 0;
        this.stats.turnsTime = 0;
        this.stats.turnsAvgTime= 0;

        player.isStopped = 0;
        player.mustTake = 0;
      };

      player.dealInitialCardsToHand = function() {
        for (let i = 0; i < playerFactory.HAND_INITIAL_SIZE; i++) {
          player.drawCardFromDeck();
        }
      };

      player.removedCardFromHand = function(card) {
        player.hand.removeCard(card);
        manager.updateUI();
      };

      player.putCardOnPlayZone = function(card) {
        manager.playZone.putOnTop(card);
        manager.updateUI();
      };

      player.drawCardFromDeck = function() {
        let card;
        if (player.mustTake > 0) {
          for (let i = 0; i < player.mustTake; i++) {
            card = manager.drawCard();
            player.hand.cards.push(card);
          }

          player.mustTake = 0;
        } else {
          card = manager.drawCard();
          player.hand.cards.push(card);
        }
        manager.updateUI();
      };

      player.drawWhenNoLegalCards = function() {
        if (!player.isAbleToDrawFromDeck()) {
          return;
        }
        this.drawCardFromDeck();
        this.endTurn();
        manager.swapPlayer();
      };

      player.isAbleToDrawFromDeck = function() {
        return !player.inTakiMode.status && player.hand.legalCards.length === 0;
      };

      player.selectColor = function(color) {
        const top = manager.playZone.popTheTop();
        top.color = color;
        top.frontImg = top.frontImg.replace("colorful", color);
        manager.playZone.putOnTop(top);

        manager.updateUI();
        if (player.inTakiMode.status === true) {
          cardFactory.funcOpenTaki();
        } else {
          manager.swapPlayer();
        }
      };

      player.closeTaki = function() {
        const top = manager.playZone.getTop();
        player.inTakiMode.status = false;

        //need to check functionality of the last card in taki.
        if (player.inTakiMode.takiId !== top.cardId) {
          player.inTakiMode.takiId = {};
          player.handleCard(top);
        } else {
          manager.swapPlayer();
        }
      };

      player.fillLegalCards = function() {
        player.hand.legalCards = player.hand.cards.filter(manager.isCardLegal);
        manager.updateUI();
      };

      player.clearLegalCards = function() {
        player.hand.legalCards = [];
      };

      player.playCard = function(card) {
        // check card is legal
        if (!manager.isCardLegal(card)) {
          return;
        }

        player.removedCardFromHand(card);
        player.putCardOnPlayZone(card);
        player.handleCard(card);
      };

      player.handleCard = function(card) {
        //this function is being called after we already know card is legal
        if (player.inTakiMode.status) {
          player.doTurn();
        } else {
          if (card.isSpecialCard() || card.isSuperCard()) {
            card.activate();
          } else {
            // means this is a value card
            manager.swapPlayer();
          }
        }
      };

      player.hasLegalCard = function() {
        return player.hand.legalCards.length > 0;
      };

      player.hasCard = function() {
        return player.hand.cards.length > 0;
      };

      function doUserTurn() {
        // empty
      }

      function doPCTurn() {
        setTimeout(function() {
          playerFactory.determinePCPlay.call(player);
        }, 500);
      }

      if (type === TYPES.PC) {
        player.doTurn = doPCTurn.bind(player);
      } else if (type === TYPES.USER) {
        player.doTurn = doUserTurn.bind(player);
      }

      player.hasLastCard = function() {
        return player.hand.cards.length === 1;
      };

      player.getAvgTurnTime = function() {
        return getAvgTime(
          player.stats.turnAmount,
          player.stats.turnsTime
        );
      };

      player.getAvgTurnTimeAllGames = function() {
        return getAvgTime(
          player.stats.turnAmountAllGames,
          player.stats.turnsTimeAllGames
        );
      };

      player.getLastCardCounter = function() {
        return player.stats.lastCardCounter;
      };

      player.copyState = function() {
        return {
          type: player.playerType,
          hand: player.hand.copyState(),
          stats: Object.assign({}, player.stats)
        };
      };

      player.turnStopWatch = stopWatchFactory.createStopWatch();
      player.startTurn = this.startTurn.bind(player);
      player.endTurn = this.endTurn.bind(player);

      return player;
    },

    tryPlayOptions: function(legalCards, options) {
      const findCardInArray = cardFactory.findCardInArray;
      const playCard = this.playCard;
      let isPlayed = false;

      for (let i = 0; i < options.length && !isPlayed; i++) {
        let type = options[i].type;
        let color = options[i].color;
        let value = options[i].value;
        if (findCardInArray(legalCards, type, color, value)) {
          playCard(findCardInArray(legalCards, type, color, value));
          isPlayed = true;
        }
      }
      return isPlayed;
    },

    // this function is in charge of the pc logic
    determinePCPlay: function() {
      const tryPlayOptions = playerFactory.tryPlayOptions.bind(this);
      const top = manager.playZone.getTop();
      const TYPES = cardFactory.getTypes();
      const activePlayer = manager.getActivePlayer();
      const legalCards = this.hand.legalCards;
      let isPlayed = false;

      if (!top) {
        console.error("pc turn with no cards in playzone");
        return false;
      }

      //if PC is in the middle of taki mode
      if (activePlayer.inTakiMode.status) {
        let options = [
          { type: TYPES.TAKI, color: top.color, value: undefined },
          { type: TYPES.PLUS, color: top.color, value: undefined },
          { type: TYPES.STOP, color: top.color, value: undefined },
          { type: TYPES.VALUE, color: top.color, value: undefined },
          { type: TYPES.TAKE2, color: top.color, value: undefined }
        ];

        isPlayed = tryPlayOptions(legalCards, options);
        if (!isPlayed) {
          PlayZone.closeTaki();
        }
      }
      //if PC has to respond over take2 card
      else if (activePlayer.mustTake > 0) {
        let options = [
          { type: TYPES.TAKE2, color: undefined, value: undefined }
        ];

        isPlayed = tryPlayOptions(legalCards, options);
        if (!isPlayed) {
          activePlayer.drawWhenNoLegalCards();
        }
      }
      //if no special situation occurred then PC acts normally
      else {
        let options = [
          { type: TYPES.TAKE2, color: undefined, value: undefined },
          { type: TYPES.STOP, color: undefined, value: undefined },
          { type: TYPES.PLUS, color: undefined, value: undefined },
          { type: TYPES.TAKI, color: undefined, value: undefined },
          { type: TYPES.VALUE, color: top.color, value: undefined },
          { type: TYPES.VALUE, color: undefined, value: undefined },
          { type: TYPES.SUPER_TAKI, color: undefined, value: undefined },
          { type: TYPES.CHANGE, color: undefined, value: undefined }
        ];

        isPlayed = tryPlayOptions(legalCards, options);
        if (!isPlayed) {
          activePlayer.drawWhenNoLegalCards();
        }
      }
    },

    startTurn: function() {
      this.turnStopWatch.start();
      if (this.hasLastCard()) {
        this.stats.lastCardCounter++;
      }

      if (this.isStopped) {
        this.isStopped = false;
        manager.swapPlayer();
      } else {
        this.stats.turnAmount++;
        this.stats.turnAmountAllGames++;
        stats.turnAmount++;
        this.fillLegalCards();

        this.doTurn();
      }
    },

    endTurn: function() {
      this.clearLegalCards();
      const elapsed = this.turnStopWatch.stop();
      this.stats.turnsTime += elapsed;
      this.stats.turnsTimeAllGames += elapsed;
      this.stats.turnsAvgTime = getAvgTime(this.stats.turnAmount,this.stats.turnsTime);
      this.stats.turnsAvgTimeAllGames = getAvgTime(this.stats.turnAmountAllGames,this.stats.turnsTimeAllGames);
    }
  };
})();

export default playerFactory;

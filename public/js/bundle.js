/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scenes_GameScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/GameScene */ "./src/client/scenes/GameScene.js");
/* harmony import */ var _scenes_MainMenuScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/MainMenuScene */ "./src/client/scenes/MainMenuScene.js");
/* harmony import */ var _scenes_PlayerSetupScene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/PlayerSetupScene */ "./src/client/scenes/PlayerSetupScene.js");




var config = {
  title: "Crazy 8 Smackdown",
  version: "0.0.1",
  width: 800,
  height: 600,
  type: phaser__WEBPACK_IMPORTED_MODULE_0___default.a.AUTO,
  parent: "game",
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  render: {
    pixelArt: true,
    antialias: true
  },
  backgroundColor: "0xF5F5F5",
  scene: [_scenes_MainMenuScene__WEBPACK_IMPORTED_MODULE_2__["default"], _scenes_PlayerSetupScene__WEBPACK_IMPORTED_MODULE_3__["default"], _scenes_GameScene__WEBPACK_IMPORTED_MODULE_1__["default"]]
};
new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Game(config);

/***/ }),

/***/ "./src/client/objects/Card.js":
/*!************************************!*\
  !*** ./src/client/objects/Card.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * @class - Card class to store suit/value information.
 */

var Card =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Card, _Phaser$GameObjects$S);

  function Card(scene, x, y, suit, value, name, cardBack) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, scene, x, y));
    _this.suit = suit;
    _this.value = value;
    _this.name = name;
    _this.cardBack = cardBack;

    _this.setOrigin(0.5);

    _this.faceCardDown();

    return _this;
  }
  /**
   * Load the card back texture to face card down.
   */


  _createClass(Card, [{
    key: "faceCardDown",
    value: function faceCardDown() {
      this.setTexture("back_".concat(this.cardBack));
    }
    /**
     * Load the corresponding texture for this card.
     */

  }, {
    key: "faceCardUp",
    value: function faceCardUp() {
      this.setTexture("".concat(this.suit, "_").concat(this.value));
    }
  }]);

  return Card;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Sprite);



/***/ }),

/***/ "./src/client/objects/Deck.js":
/*!************************************!*\
  !*** ./src/client/objects/Deck.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Deck; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Card */ "./src/client/objects/Card.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * @class - Deck class to manage the deck of cards.
 */

var Deck =
/*#__PURE__*/
function (_Phaser$GameObjects$G) {
  _inherits(Deck, _Phaser$GameObjects$G);

  function Deck(scene) {
    var _this;

    _classCallCheck(this, Deck);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Deck).call(this, scene)); // This is where cards will be drawn from.

    _this.drawPile = []; // This is where cards will played into.

    _this.playPile = []; // Generate the deck, baby.

    _this.generateDeck(scene);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.drawPile[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var card = _step.value;

        // Add card to group object.
        _this.add(card, true); // Set the overall scale of the card to be 25% smaller.


        card.scale = 0.75;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }
  /**
   * Generate and randomly shuffle draw Deck.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   *
   */


  _createClass(Deck, [{
    key: "generateDeck",
    value: function generateDeck(scene) {
      var values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q"];
      var suits = ["hearts", "diamonds", "spades", "clubs"];
      var backColors = ["blue", "green", "red"];
      var deck = [];
      var backColor = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Math.RND.pick(backColors);

      for (var i = 0; i < suits.length; i++) {
        for (var ii = 0; ii < values.length; ii++) {
          deck.push(new _Card__WEBPACK_IMPORTED_MODULE_1__["default"](scene, 125 + i, 125 + i, suits[i], values[ii], "".concat(values[ii], " of ").concat(suits[i]), backColor));
        }
      }

      this.drawPile = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Utils.Array.Shuffle(deck);
    }
    /**
     * Return the next card of the draw pile (index 0 is considered the top).
     *
     * @return {Card} The last card in deck of cards.
     */

  }, {
    key: "getNextDrawCard",
    value: function getNextDrawCard() {
      return this.drawPile[0];
    }
    /**
     * Return the top card of the play pile (index 0 is considered the top).
     *
     * @return {Card} The last card in deck of cards.
     */

  }, {
    key: "getLastPlayCard",
    value: function getLastPlayCard() {
      return this.playPile[0];
    }
    /**
     * Add array of card(s) to the deck.
     *
     * @param {Card[]} cards - The array of cards to add to the deck.
     */

  }, {
    key: "addCardsToDeck",
    value: function addCardsToDeck(cards) {
      this.drawPile = (this.drawPile, cards);
    }
    /**
     * Shuffle the play pile, pass that back to the draw pile and clear playPile.
     */

  }, {
    key: "shuffleDeck",
    value: function shuffleDeck() {
      console.log("*** Shuffling the deck ***");
      this.drawPile = phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Utils.Array.Shuffle(this.playPile);
      this.drawPile.forEach(function (card) {
        card.faceCardDown();
      });
      this.playPile = [];
    }
  }]);

  return Deck;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Group);



/***/ }),

/***/ "./src/client/objects/Player.js":
/*!**************************************!*\
  !*** ./src/client/objects/Player.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * @class - Player class to manage player's hand and countdown score.
 */

var Player =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Player, _Phaser$GameObjects$S);

  function Player(scene, x, y, name, color) {
    var _this;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, scene, x, y));
    _this.name = name;
    _this.color = color;
    _this.countdown = 8;
    _this.hand = [];
    _this.nameText = scene.add.text(x, y + 50, name);

    _this.nameText.setOrigin(0.5);

    _this.setTexture("player_".concat(_this.color));

    return _this;
  }
  /**
   * Remove a card from the player's hand, place it in play pile.
   *
   * @param {Card} cards - The card to be removed.
   * @param {Deck} deck - The deck which contains the play pile to add to.
   *
   * @return {Card} - The last card added to playPile.
   */


  _createClass(Player, [{
    key: "removeCardFromHand",
    value: function removeCardFromHand(card, deck) {
      var cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
      deck.playPile.unshift(cardToRemove[0]);
      console.log("[".concat(this.name, "] ").concat(cardToRemove[0].name, " was played!"));
      return deck.getLastPlayCard();
    }
    /**
     * Remove multiple cards from the player's hand, place it in play pile.
     *
     * @param {Card[]} cards - The cards to be removed.
     * @param {Deck} deck - The deck which contains the play pile to add to.
     *
     * @return {Card} - The last card added to playPile.
     */

  }, {
    key: "removeCardsFromHand",
    value: function removeCardsFromHand(cards, deck) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var card = _step.value;
          var cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
          deck.playPile.unshift(cardToRemove[0]);
          console.log("[".concat(this.name, "] ").concat(cardToRemove[0].name, " was played!"));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return deck.getLastPlayCard();
    }
    /**
     * Add a card to the player's hand.
     *
     * @param {Card} card - The card to be added to the player's hand.
     */

  }, {
    key: "addCardToHand",
    value: function addCardToHand(card) {
      this.hand.push(card);
    }
  }]);

  return Player;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.GameObjects.Sprite);



/***/ }),

/***/ "./src/client/scenes/GameScene.js":
/*!****************************************!*\
  !*** ./src/client/scenes/GameScene.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameScene; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _objects_Deck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/Deck.js */ "./src/client/objects/Deck.js");
/* harmony import */ var _objects_Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/Player.js */ "./src/client/objects/Player.js");
/* harmony import */ var _utilities_Preload_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/Preload.js */ "./src/client/utilities/Preload.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





/**
 * @class - Game scene which contains the core game loop.
 */

var GameScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene).call(this, {
      key: 'GameScene'
    }));
  }
  /**
   * Basically need to load any assets here.
   *
   * @see Preload.js for preload functions.
   */


  _createClass(GameScene, [{
    key: "preload",
    value: function preload() {
      _utilities_Preload_js__WEBPACK_IMPORTED_MODULE_3__["default"].loadCards(this);
      _utilities_Preload_js__WEBPACK_IMPORTED_MODULE_3__["default"].loadPlayers(this);
      _utilities_Preload_js__WEBPACK_IMPORTED_MODULE_3__["default"].loadSounds(this);
    }
    /**
     * Generate the deck, setup players and initialize the game.
     */

  }, {
    key: "create",
    value: function create() {
      this.gameOver = false;
      this.playerTurn = 3;
      this.checkHandForPlayableCards = true;
      this.deck = new _objects_Deck_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
      this.players = [];
      this.players.push(new _objects_Player_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.sys.game.config.width - 100, 100, "jarred", "green"));
      this.players.push(new _objects_Player_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.sys.game.config.width - 100, 200, "willbert", "blue"));
      this.players.push(new _objects_Player_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.sys.game.config.width - 100, 300, "frank", "purple"));
      this.players.push(new _objects_Player_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, 100, 500, "brandon", "yellow"));
      this.initializeGame();
      this.buildWildCardDialog();
      this.addRestartButton();
    }
    /**
     * Game logic will go in here.
     */

  }, {
    key: "update",
    value: function update() {
      // Check if the game is over.
      this.checkGameOver(); // Check if the last card has changed.

      if (this.checkLastPlayCardChange()) {
        // A turn has been made, let's make sure to make all the player's cards
        // non-interactive.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.players[this.playerTurn].hand[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var card = _step.value;
            card.removeAllListeners();
          } // Check for wildcard.

        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (this.currentCardInPlay.value == this.players[this.playerTurn].countdown) {
          this.wildCardDialogContainer.visible = true;
        }
      } // Check the player hand for playable cards.


      if (this.checkHandForPlayableCards) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.players[this.playerTurn].hand[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _card = _step2.value;
            var currentCardInPlay = this.deck.getLastPlayCard();

            if (_card.value == currentCardInPlay.value || _card.suit == this.currentSuitInPlay || _card.value == this.players[this.playerTurn].countdown) {
              this.makeCardPlayable(_card, this.players[this.playerTurn]);
            }
          } // Flag that the hand has been checked.

        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.checkHandForPlayableCards = false;
      }
    }
    /**
     * Do any game init within this function.
     */

  }, {
    key: "initializeGame",
    value: function initializeGame() {
      var _this = this;

      // Add players to screen.
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var player = _step3.value;
          this.add.existing(player);
        } // Deal out cards to the players.

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var offset = 0;

      var _loop = function _loop(i) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          var _loop2 = function _loop2() {
            var player = _step4.value;

            // Deal the card to player.
            _this.dealCardsToPlayer(player); // XXX: Gotta move this into something more dynamic... will do for now.
            // Tween the card game object and reveal what is in the hand.


            if (player.name === 'brandon') {
              _this.tweens.add({
                targets: player.hand[i],
                x: 225 + offset,
                y: 500,
                ease: 'Linear',
                duration: 250,
                onComplete: function onComplete() {
                  player.hand[i].faceCardUp();
                }
              });

              offset = offset + 50;
            }
          };

          for (var _iterator4 = _this.players[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      };

      for (var i = 0; i <= 7; i++) {
        _loop(i);
      } // Deal out the first card to the play pile.


      this.dealCardFromDrawToPlayPile();
    }
    /**
     * Determine if the game is over by checking each player's countdown score, 0
     * is considered game over.
     */

  }, {
    key: "checkGameOver",
    value: function checkGameOver() {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.players[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var player = _step5.value;

          // If the countdown is at 0, that's it... GAME OVER!
          if (player.countdown === 0) {
            this.gameOver = true;
            console.log("".concat(player.name, " is the winner!"));
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
    /**
     * Deal a card to the Player, tween the card to the player's hand.
     *
     * @param {Player} player - The player we are dealing to.
     * @param {Number} numberOfCards - The number of cards to deal to the player.
     */

  }, {
    key: "dealCardsToPlayer",
    value: function dealCardsToPlayer(player) {
      var numberOfCards = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      // We want to keep track of how many cards are left to deal if the deck
      // needs to be shuffled.
      for (var cardsLeftToDeal = numberOfCards; cardsLeftToDeal >= 1; cardsLeftToDeal--) {
        var cardToDeal = this.deck.drawPile.shift();

        if (cardToDeal) {
          // Deal the card to player.
          player.addCardToHand(cardToDeal);
        } else {
          // No cards left to draw, shuffle and try again.
          this.deck.shuffleDeck(); // If there are enough cards left to deal, deal em'.

          if (this.deck.drawPile.length >= cardsLeftToDeal) {
            // Make sure to only deal the remainder (if there is enough).
            this.dealCardsToPlayer(player, cardsLeftToDeal);
          } else {
            console.log("No more cards left to deal!");
          }
        }
      }
    }
    /**
     * Deal a card from the draw deck to the play pile.
     */

  }, {
    key: "dealCardFromDrawToPlayPile",
    value: function dealCardFromDrawToPlayPile() {
      // Shift out a card from the draw pile.
      var cardToDeal = this.deck.drawPile.shift(); // Place card on the top of the play pile.

      this.deck.playPile.unshift(cardToDeal); // Set the first card in play pile as the last card played.

      this.currentCardInPlay = cardToDeal; // Set the suit in play pile as the last card's suit.

      this.currentSuitInPlay = cardToDeal.suit; // Move the card to the playPile zone.

      this.tweens.add({
        targets: cardToDeal,
        x: '+=125',
        ease: 'Linear',
        duration: 250,
        onComplete: function onComplete() {
          cardToDeal.faceCardUp();
        }
      });
    }
    /**
     * Check to see if the last card has changed.
     *
     * @return {Boolean} - True if the card has changed, false otherwise.
     */

  }, {
    key: "checkLastPlayCardChange",
    value: function checkLastPlayCardChange() {
      if (this.currentCardInPlay.name != this.deck.getLastPlayCard().name) {
        this.currentCardInPlay = this.deck.getLastPlayCard();
        this.currentSuitInPlay = this.deck.getLastPlayCard().suit;
        return true;
      }

      return false;
    }
    /**
     * Make a card playable by adding click/hover listeners.
     *
     * @param {Card} card - The card to make playable.
     */

  }, {
    key: "makeCardPlayable",
    value: function makeCardPlayable(card, player) {
      var _this2 = this;

      card.setInteractive(); // When the user clicks send the card to the play pile and do other stuff.

      card.on('pointerdown', function () {
        // Remove all the listeners.
        card.removeAllListeners(); // Remove tint.

        card.clearTint(); // Set the depth of all playPile cards to 0.

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = _this2.deck.playPile[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var playCard = _step6.value;
            playCard.setDepth(0);
          } // Set the depth of the card to played to 1.

        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        card.setDepth(1); // Move the card to the play pile.

        _this2.tweens.add({
          targets: card,
          x: 250,
          y: 125,
          ease: 'Linear',
          duration: 250
        }); // Remove the card from hand, move into the play pile.


        player.removeCardFromHand(card, _this2.deck);
      }); // When the user hovers the cursor over the card, set a tint and raise y.

      card.on('pointerover', function () {
        // Set a tint to show card is playable.
        card.setTint(0xe3e3e3); // Move card up slightly.

        _this2.tweens.add({
          targets: card,
          y: 450,
          ease: 'Linear',
          duration: 250
        });
      }); // When the user's cursor leaves the card, remove the tint and lower y.

      card.on('pointerout', function () {
        // Remove tint.
        card.clearTint(); // Move the card back into hand.

        _this2.tweens.add({
          targets: card,
          y: 500,
          ease: 'Linear',
          duration: 250
        });
      });
    }
    /**
     * Constructs a wildcard dialog box.
     */

  }, {
    key: "buildWildCardDialog",
    value: function buildWildCardDialog() {
      var _this3 = this;

      // initialize container object to hold all the dialogue text.
      this.wildCardDialogContainer = this.add.container(0, 0);
      this.wildCardDialogContainer.visible = false; // Add a background for the message box.

      var wildCardDialogBackground = this.add.graphics();
      wildCardDialogBackground.fillStyle(0xbdbdbd, 0.8);
      wildCardDialogBackground.fillRoundedRect(200, 250, 400, 150, 4);
      this.wildCardDialogContainer.add(wildCardDialogBackground); // Show message text in the center of the screen.

      var wildCardText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 20, 'Wild card played, choose a new suit:');
      wildCardText.setOrigin(0.5);
      this.wildCardDialogContainer.add(wildCardText);
      var suits = ["hearts", "diamonds", "spades", "clubs"];
      var offset = 10;

      var _loop3 = function _loop3() {
        var suit = _suits[_i];

        var wildCardOption = _this3.add.text(_this3.sys.game.config.width / 2, _this3.sys.game.config.height / 2 + offset, suit);

        wildCardOption.setOrigin(0.5);
        wildCardOption.setInteractive();
        wildCardOption.on('pointerdown', function () {
          _this3.currentSuitInPlay = suit;
          _this3.checkHandForPlayableCards = true;
          _this3.wildCardDialogContainer.visible = false;
        });
        wildCardOption.on('pointerover', function () {
          wildCardOption.setTint(0xe3e3e3);
        });
        wildCardOption.on('pointerout', function () {
          wildCardOption.clearTint();
        });

        _this3.wildCardDialogContainer.add(wildCardOption);

        offset += 20;
      };

      for (var _i = 0, _suits = suits; _i < _suits.length; _i++) {
        _loop3();
      }
    }
    /**
     * Add a restart button to the scene, used for debugging.
     */

  }, {
    key: "addRestartButton",
    value: function addRestartButton() {
      var _this4 = this;

      var restartButton = this.add.text(700, 525, 'Restart');
      restartButton.setOrigin(0.5);
      restartButton.setInteractive();
      restartButton.on('pointerdown', function () {
        _this4.scene.restart();
      });
      restartButton.on('pointerover', function () {
        restartButton.setTint(0x6356c7);
      });
      restartButton.on('pointerout', function () {
        restartButton.clearTint();
      });
    }
  }]);

  return GameScene;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);



/***/ }),

/***/ "./src/client/scenes/MainMenuScene.js":
/*!********************************************!*\
  !*** ./src/client/scenes/MainMenuScene.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainMenuScene; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_FontLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/FontLoader */ "./src/client/utilities/FontLoader.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * @class - It's da main menu scene!
 */

var MainMenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MainMenuScene, _Phaser$Scene);

  function MainMenuScene() {
    _classCallCheck(this, MainMenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainMenuScene).call(this, {
      key: 'MainMenuScene'
    }));
  }

  _createClass(MainMenuScene, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      // Currently does jack shit...
      _utilities_FontLoader__WEBPACK_IMPORTED_MODULE_1__["default"].loadWebFontOpenSans();
      this.addTitleText();
      this.addStartGameButton();
      this.addPlayerSetupButton();
    }
  }, {
    key: "update",
    value: function update() {}
    /**
     * Add title text to the scene.
     */

  }, {
    key: "addTitleText",
    value: function addTitleText() {
      this.titleTextBackground = this.add.graphics();
      this.titleTextBackground.fillRoundedRect(200, 75, 400, 50, 6);
      this.titleTextBackground.fillStyle(0x7FFFD4, 0.5);
      this.titleTextBackgroundBorder = this.add.graphics();
      this.titleTextBackgroundBorder.lineStyle(4, 0x000000);
      this.titleTextBackgroundBorder.strokeRoundedRect(200, 75, 400, 50, 6);
      this.titleText = this.add.text(400, 100, 'Crazy 8 Smackdown', {
        fontFamily: 'Open Sans',
        fontSize: '28px',
        fontStyle: 'bold',
        color: '0x000000'
      });
      this.titleText.setOrigin(0.5);
    }
    /**
     * Add a start game button that starts the game scene (GameScene.js).
     */

  }, {
    key: "addStartGameButton",
    value: function addStartGameButton() {
      var _this = this;

      this.startButtonBackground = this.add.graphics();
      this.startButtonBackground.fillRoundedRect(300, 280, 200, 40, 6);
      this.startButtonBackground.fillStyle(0xFFB0B0, 0.5);
      this.startButtonBackground.closePath();
      this.startButtonBackgroundBorder = this.add.graphics();
      this.startButtonBackgroundBorder.lineStyle(4, 0x000000);
      this.startButtonBackgroundBorder.strokeRoundedRect(300, 280, 200, 40, 6);
      this.startButton = this.add.text(400, 300, 'Start Game', {
        fontFamily: 'Open Sans',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '0x000000'
      });
      this.startButton.setOrigin(0.5);
      this.startButton.setInteractive();
      this.startButton.on('pointerdown', function () {
        _this.scene.start('GameScene');
      });
      this.startButton.on('pointerover', function () {
        _this.startButtonBackground.setAlpha(0.5);
      });
      this.startButton.on('pointerout', function () {
        _this.startButtonBackground.setAlpha(1);
      });
    }
    /**
     * Add a player setup button that starts the player setup scene
     * (PlayerSetupScene.js).
     */

  }, {
    key: "addPlayerSetupButton",
    value: function addPlayerSetupButton() {
      var _this2 = this;

      this.setupButtonBackground = this.add.graphics();
      this.setupButtonBackground.fillRoundedRect(300, 350, 200, 40, 6);
      this.setupButtonBackground.fillStyle(0x6356c7, 0.5);
      this.setupButtonBackgroundBorder = this.add.graphics();
      this.setupButtonBackgroundBorder.lineStyle(4, 0x000000);
      this.setupButtonBackgroundBorder.strokeRoundedRect(300, 350, 200, 40, 6);
      this.setupButton = this.add.text(400, 370, 'Player Setup', {
        fontFamily: 'Open Sans',
        fontSize: '18px',
        fontStyle: 'bold',
        color: '0x000000'
      });
      this.setupButton.setOrigin(0.5);
      this.setupButton.setInteractive();
      this.setupButton.on('pointerdown', function () {
        _this2.scene.start('PlayerSetupScene');
      });
      this.setupButton.on('pointerover', function () {
        _this2.setupButtonBackground.setAlpha(0.5);
      });
      this.setupButton.on('pointerout', function () {
        _this2.startButtonBackground.setAlpha(1);
      });
    }
  }]);

  return MainMenuScene;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);



/***/ }),

/***/ "./src/client/scenes/PlayerSetupScene.js":
/*!***********************************************!*\
  !*** ./src/client/scenes/PlayerSetupScene.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PlayerSetupScene; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


/**
 * @class - Player setup scene, where the user will enter a username and draw
 *  their avatar.
 */

var PlayerSetupScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayerSetupScene, _Phaser$Scene);

  function PlayerSetupScene() {
    _classCallCheck(this, PlayerSetupScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayerSetupScene).call(this, {
      key: 'PlayerSetupScene'
    }));
  }

  _createClass(PlayerSetupScene, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      // Initialize some default properties.
      this.lastDot = false;
      this.selectedSizeOption = 6;
      this.selectedColorOption = '0x000000'; // Add all the things to the scene.

      this.addPaintCanvas();
      this.addPaintOptions();
      this.addClearButton();
    }
  }, {
    key: "update",
    value: function update() {}
    /**
     * Creates a canvas for players to create their avatar and adds it to the
     * scene.
     *
     * @TODO: This could definitely stand to be optimized at some point, as it
     * creates a Phaser.Grahpics object for every pointerdown & pointermove event.
     */

  }, {
    key: "addPaintCanvas",
    value: function addPaintCanvas() {
      var _this = this;

      // Create the canvas for players to draw on.
      var canvas = this.add.graphics();
      canvas.lineStyle(4, 0x000000);
      canvas.strokeRoundedRect(200 - 5, 100 - 5, 400 + 10, 400 + 10, 8);
      canvas.setInteractive(new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Rectangle(200, 100, 400, 400), phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Rectangle.Contains); // Add a pointer down event which draws a circle where the cursor is.

      canvas.on('pointerdown', function (pointer) {
        var dot = _this.add.graphics();

        dot.fillStyle(_this.selectedColorOption);
        dot.fillCircle(pointer.x, pointer.y, _this.selectedSizeOption);
      }, this); // Add a pointer move event which draws a circle where the pointer moves to
      // and draws a line between the last known dot location to give a smoothed
      // brush stroke effect.

      canvas.on('pointermove', function (pointer) {
        if (pointer.isDown) {
          var dot = _this.add.graphics();

          dot.fillStyle(_this.selectedColorOption);
          dot.fillCircle(pointer.x, pointer.y, _this.selectedSizeOption); // If there is a known last dot, draw a line between the current dot and
          // the last.

          if (_this.lastDot) {
            var lineShape = new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Line(_this.lastDot.x, _this.lastDot.y, pointer.x, pointer.y);
            _this.line = _this.add.graphics();

            _this.line.lineStyle(_this.selectedSizeOption * 2, _this.selectedColorOption);

            _this.line.strokeLineShape(lineShape);
          } // Set the current dot as the last known dot.


          _this.lastDot = {
            x: pointer.x,
            y: pointer.y
          };
        }
      }, this); // When the user is done drawing, remove any last known dot information.

      canvas.on('pointerup', function () {
        _this.lastDot = false;
      }, this); // When the cursor leaves the canvas, remove any last known dot information.

      canvas.on('pointerout', function () {
        _this.lastDot = false;
      }, this);
    }
    /**
     * Add the brush color and brush size options to the scene.
     */

  }, {
    key: "addPaintOptions",
    value: function addPaintOptions() {
      this.paintOptionsGroup = this.add.group();
      this.addPaintBrushColorOptions();
      this.addPaintBrushSizeOptions();
    }
    /**
     * Add brush size options to the scene.
     */

  }, {
    key: "addPaintBrushSizeOptions",
    value: function addPaintBrushSizeOptions() {
      var _this2 = this;

      var sizes = [6, 9, 12];
      var offsetX = 0;

      var _loop = function _loop(i) {
        var brushSizeOption = _this2.add.graphics();

        brushSizeOption.fillStyle(0x000000);
        brushSizeOption.fillCircle(650 + offsetX, 500, sizes[i]);
        brushSizeOption.setInteractive(new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Circle(650 + offsetX, 500, sizes[i]), phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Circle.Contains); // When the user clicks on the graphic, change the size of the brush..

        brushSizeOption.on('pointerdown', function () {
          _this2.selectedSizeOption = sizes[i];
        });
        offsetX += 50;
      };

      for (var i = 0; i < sizes.length; i++) {
        _loop(i);
      }
    }
    /**
     * Add brush color options to the scene.
     */

  }, {
    key: "addPaintBrushColorOptions",
    value: function addPaintBrushColorOptions() {
      var _this3 = this;

      var colors = ['0x000000', '0x6356c7', '0x87E0FF', '0x7FFFD4', '0xFFB0B0', '0xFFAB76', '0xFCF3B0', '0xFFFFFF'];
      var offsetY = 0;

      var _loop2 = function _loop2(i) {
        var brushColorOption = _this3.add.graphics(700, 100 + offsetY);

        brushColorOption.fillStyle(colors[i]);
        brushColorOption.fillCircle(700, 100 + offsetY, 15);
        brushColorOption.setInteractive(new phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Circle(700, 100 + offsetY, 15), phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Geom.Circle.Contains);
        brushColorOption.setScale(1, 1); // When the user clicks on the graphic, change the color of the brush.

        brushColorOption.on('pointerdown', function () {
          _this3.selectedColorOption = colors[i];
        });
        offsetY += 50;
      };

      for (var i = 0; i < colors.length; i++) {
        _loop2(i);
      }
    }
    /**
     * Add a clear button to the scene, used for debugging.
     */

  }, {
    key: "addClearButton",
    value: function addClearButton() {
      var _this4 = this;

      var clearButton = this.add.text(700, 550, 'Clear');
      clearButton.setOrigin(0.5);
      clearButton.setInteractive();
      clearButton.on('pointerdown', function () {
        _this4.scene.restart();
      });
      clearButton.on('pointerover', function () {
        clearButton.setTint(0x6356c7);
      });
      clearButton.on('pointerout', function () {
        clearButton.clearTint();
      });
    }
  }]);

  return PlayerSetupScene;
}(phaser__WEBPACK_IMPORTED_MODULE_0___default.a.Scene);



/***/ }),

/***/ "./src/client/utilities/FontLoader.js":
/*!********************************************!*\
  !*** ./src/client/utilities/FontLoader.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FontLoader; });
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webfontloader */ "./node_modules/webfontloader/webfontloader.js");
/* harmony import */ var webfontloader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webfontloader__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * @class - Font loader class to handle loading Web Fonts.
 */

var FontLoader =
/*#__PURE__*/
function () {
  function FontLoader() {
    _classCallCheck(this, FontLoader);
  }

  _createClass(FontLoader, null, [{
    key: "loadWebFontOpenSans",

    /**
     * Load the 'Open Sans' Google webfont family.
     *
     * Worth noting this doesn't do anything at the moment...
     */
    value: function loadWebFontOpenSans() {
      webfontloader__WEBPACK_IMPORTED_MODULE_0___default.a.load = {
        google: {
          families: ['Open Sans', 'Open Sans:bold']
        },
        active: function active() {
          console.log("hi");
        }
      };
    }
  }]);

  return FontLoader;
}();



/***/ }),

/***/ "./src/client/utilities/Preload.js":
/*!*****************************************!*\
  !*** ./src/client/utilities/Preload.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Preload; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class - Preload static class to handle asset preloading.
 */
var Preload =
/*#__PURE__*/
function () {
  function Preload() {
    _classCallCheck(this, Preload);
  }

  _createClass(Preload, null, [{
    key: "loadCards",

    /**
     * Load card assets.
     *
     * @param {Phaser.Scene} scene - The phaser scene object.
     */
    value: function loadCards(scene) {
      var names = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q"];
      var suits = ["hearts", "diamonds", "spades", "clubs"];

      for (var _i = 0, _suits = suits; _i < _suits.length; _i++) {
        var suit = _suits[_i];

        for (var _i2 = 0, _names = names; _i2 < _names.length; _i2++) {
          var name = _names[_i2];
          var cardName = "".concat(suit, "_").concat(name);
          scene.load.image(cardName, "public/assets/cards/" + cardName + ".png");
        }
      }

      scene.load.image("back_blue", "public/assets/cards/back_blue.png");
      scene.load.image("back_green", "public/assets/cards/back_green.png");
      scene.load.image("back_red", "public/assets/cards/back_red.png");
    }
    /**
     * Load player assets.
     *
     * @param {Phaser.Scene} scene - The phaser scene object.
     */

  }, {
    key: "loadPlayers",
    value: function loadPlayers(scene) {
      var colors = ["black", "blue", "green", "purple", "red", "white", "yellow"];

      for (var _i3 = 0, _colors = colors; _i3 < _colors.length; _i3++) {
        var color = _colors[_i3];
        scene.load.image("player_".concat(color), "public/assets/player/player_".concat(color, ".png"));
      }
    }
    /**
     * Load sound assets.
     *
     * @param {Phaser.Scene} scene - The phaser scene object.
     */

  }, {
    key: "loadSounds",
    value: function loadSounds(scene) {
      var sounds = ["place", "slide"];

      for (var _i4 = 0, _sounds = sounds; _i4 < _sounds.length; _i4++) {
        var sound = _sounds[_i4];

        for (var i = 1; i <= 3; i++) {
          scene.load.audio("card_".concat(sound, "_").concat(i), "public/assets/sounds/card_".concat(sound, "_").concat(i, ".ogg"));
        }
      }
    }
  }]);

  return Preload;
}();



/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/client/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/brandon/Git/crazy-8-smackdown/src/client/index.js */"./src/client/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L29iamVjdHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L29iamVjdHMvRGVjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L29iamVjdHMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvc2NlbmVzL0dhbWVTY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3NjZW5lcy9NYWluTWVudVNjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvc2NlbmVzL1BsYXllclNldHVwU2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC91dGlsaXRpZXMvRm9udExvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3V0aWxpdGllcy9QcmVsb2FkLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInRpdGxlIiwidmVyc2lvbiIsIndpZHRoIiwiaGVpZ2h0IiwidHlwZSIsIlBoYXNlciIsIkFVVE8iLCJwYXJlbnQiLCJpbnB1dCIsImtleWJvYXJkIiwibW91c2UiLCJ0b3VjaCIsImdhbWVwYWQiLCJyZW5kZXIiLCJwaXhlbEFydCIsImFudGlhbGlhcyIsImJhY2tncm91bmRDb2xvciIsInNjZW5lIiwiTWFpbk1lbnVTY2VuZSIsIlBsYXllclNldHVwU2NlbmUiLCJHYW1lU2NlbmUiLCJHYW1lIiwiQ2FyZCIsIngiLCJ5Iiwic3VpdCIsInZhbHVlIiwibmFtZSIsImNhcmRCYWNrIiwic2V0T3JpZ2luIiwiZmFjZUNhcmREb3duIiwic2V0VGV4dHVyZSIsIkdhbWVPYmplY3RzIiwiU3ByaXRlIiwiRGVjayIsImRyYXdQaWxlIiwicGxheVBpbGUiLCJnZW5lcmF0ZURlY2siLCJjYXJkIiwiYWRkIiwic2NhbGUiLCJ2YWx1ZXMiLCJzdWl0cyIsImJhY2tDb2xvcnMiLCJkZWNrIiwiYmFja0NvbG9yIiwiTWF0aCIsIlJORCIsInBpY2siLCJpIiwibGVuZ3RoIiwiaWkiLCJwdXNoIiwiVXRpbHMiLCJBcnJheSIsIlNodWZmbGUiLCJjYXJkcyIsImNvbnNvbGUiLCJsb2ciLCJmb3JFYWNoIiwiR3JvdXAiLCJQbGF5ZXIiLCJjb2xvciIsImNvdW50ZG93biIsImhhbmQiLCJuYW1lVGV4dCIsInRleHQiLCJjYXJkVG9SZW1vdmUiLCJzcGxpY2UiLCJpbmRleE9mIiwidW5zaGlmdCIsImdldExhc3RQbGF5Q2FyZCIsImtleSIsIlByZWxvYWQiLCJsb2FkQ2FyZHMiLCJsb2FkUGxheWVycyIsImxvYWRTb3VuZHMiLCJnYW1lT3ZlciIsInBsYXllclR1cm4iLCJjaGVja0hhbmRGb3JQbGF5YWJsZUNhcmRzIiwicGxheWVycyIsInN5cyIsImdhbWUiLCJpbml0aWFsaXplR2FtZSIsImJ1aWxkV2lsZENhcmREaWFsb2ciLCJhZGRSZXN0YXJ0QnV0dG9uIiwiY2hlY2tHYW1lT3ZlciIsImNoZWNrTGFzdFBsYXlDYXJkQ2hhbmdlIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiY3VycmVudENhcmRJblBsYXkiLCJ3aWxkQ2FyZERpYWxvZ0NvbnRhaW5lciIsInZpc2libGUiLCJjdXJyZW50U3VpdEluUGxheSIsIm1ha2VDYXJkUGxheWFibGUiLCJwbGF5ZXIiLCJleGlzdGluZyIsIm9mZnNldCIsImRlYWxDYXJkc1RvUGxheWVyIiwidHdlZW5zIiwidGFyZ2V0cyIsImVhc2UiLCJkdXJhdGlvbiIsIm9uQ29tcGxldGUiLCJmYWNlQ2FyZFVwIiwiZGVhbENhcmRGcm9tRHJhd1RvUGxheVBpbGUiLCJudW1iZXJPZkNhcmRzIiwiY2FyZHNMZWZ0VG9EZWFsIiwiY2FyZFRvRGVhbCIsInNoaWZ0IiwiYWRkQ2FyZFRvSGFuZCIsInNodWZmbGVEZWNrIiwic2V0SW50ZXJhY3RpdmUiLCJvbiIsImNsZWFyVGludCIsInBsYXlDYXJkIiwic2V0RGVwdGgiLCJyZW1vdmVDYXJkRnJvbUhhbmQiLCJzZXRUaW50IiwiY29udGFpbmVyIiwid2lsZENhcmREaWFsb2dCYWNrZ3JvdW5kIiwiZ3JhcGhpY3MiLCJmaWxsU3R5bGUiLCJmaWxsUm91bmRlZFJlY3QiLCJ3aWxkQ2FyZFRleHQiLCJ3aWxkQ2FyZE9wdGlvbiIsInJlc3RhcnRCdXR0b24iLCJyZXN0YXJ0IiwiU2NlbmUiLCJGb250TG9hZGVyIiwibG9hZFdlYkZvbnRPcGVuU2FucyIsImFkZFRpdGxlVGV4dCIsImFkZFN0YXJ0R2FtZUJ1dHRvbiIsImFkZFBsYXllclNldHVwQnV0dG9uIiwidGl0bGVUZXh0QmFja2dyb3VuZCIsInRpdGxlVGV4dEJhY2tncm91bmRCb3JkZXIiLCJsaW5lU3R5bGUiLCJzdHJva2VSb3VuZGVkUmVjdCIsInRpdGxlVGV4dCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRTdHlsZSIsInN0YXJ0QnV0dG9uQmFja2dyb3VuZCIsImNsb3NlUGF0aCIsInN0YXJ0QnV0dG9uQmFja2dyb3VuZEJvcmRlciIsInN0YXJ0QnV0dG9uIiwic3RhcnQiLCJzZXRBbHBoYSIsInNldHVwQnV0dG9uQmFja2dyb3VuZCIsInNldHVwQnV0dG9uQmFja2dyb3VuZEJvcmRlciIsInNldHVwQnV0dG9uIiwibGFzdERvdCIsInNlbGVjdGVkU2l6ZU9wdGlvbiIsInNlbGVjdGVkQ29sb3JPcHRpb24iLCJhZGRQYWludENhbnZhcyIsImFkZFBhaW50T3B0aW9ucyIsImFkZENsZWFyQnV0dG9uIiwiY2FudmFzIiwiR2VvbSIsIlJlY3RhbmdsZSIsIkNvbnRhaW5zIiwicG9pbnRlciIsImRvdCIsImZpbGxDaXJjbGUiLCJpc0Rvd24iLCJsaW5lU2hhcGUiLCJMaW5lIiwibGluZSIsInN0cm9rZUxpbmVTaGFwZSIsInBhaW50T3B0aW9uc0dyb3VwIiwiZ3JvdXAiLCJhZGRQYWludEJydXNoQ29sb3JPcHRpb25zIiwiYWRkUGFpbnRCcnVzaFNpemVPcHRpb25zIiwic2l6ZXMiLCJvZmZzZXRYIiwiYnJ1c2hTaXplT3B0aW9uIiwiQ2lyY2xlIiwiY29sb3JzIiwib2Zmc2V0WSIsImJydXNoQ29sb3JPcHRpb24iLCJzZXRTY2FsZSIsImNsZWFyQnV0dG9uIiwiV2ViRm9udCIsImxvYWQiLCJnb29nbGUiLCJmYW1pbGllcyIsImFjdGl2ZSIsIm5hbWVzIiwiY2FyZE5hbWUiLCJpbWFnZSIsInNvdW5kcyIsInNvdW5kIiwiYXVkaW8iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsTUFBTSxHQUFHO0FBQ2JDLE9BQUssRUFBSyxtQkFERztBQUViQyxTQUFPLEVBQUcsT0FGRztBQUdiQyxPQUFLLEVBQUssR0FIRztBQUliQyxRQUFNLEVBQUksR0FKRztBQUtiQyxNQUFJLEVBQU1DLDZDQUFNLENBQUNDLElBTEo7QUFNYkMsUUFBTSxFQUFJLE1BTkc7QUFPYkMsT0FBSyxFQUFFO0FBQ0xDLFlBQVEsRUFBRSxJQURMO0FBRUxDLFNBQUssRUFBSyxJQUZMO0FBR0xDLFNBQUssRUFBSyxJQUhMO0FBSUxDLFdBQU8sRUFBRztBQUpMLEdBUE07QUFhYkMsUUFBTSxFQUFFO0FBQ05DLFlBQVEsRUFBSSxJQUROO0FBRU5DLGFBQVMsRUFBRztBQUZOLEdBYks7QUFpQmJDLGlCQUFlLEVBQUUsVUFqQko7QUFrQmJDLE9BQUssRUFBRSxDQUFFQyw2REFBRixFQUFpQkMsZ0VBQWpCLEVBQW1DQyx5REFBbkM7QUFsQk0sQ0FBZjtBQXFCQSxJQUFJZiw2Q0FBTSxDQUFDZ0IsSUFBWCxDQUFnQnRCLE1BQWhCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFFQTs7OztJQUdxQnVCLEk7Ozs7O0FBRW5CLGdCQUFZTCxLQUFaLEVBQW1CTSxDQUFuQixFQUFzQkMsQ0FBdEIsRUFBeUJDLElBQXpCLEVBQStCQyxLQUEvQixFQUFzQ0MsSUFBdEMsRUFBNENDLFFBQTVDLEVBQXNEO0FBQUE7O0FBQUE7O0FBQ3BELDhFQUFNWCxLQUFOLEVBQWFNLENBQWIsRUFBZ0JDLENBQWhCO0FBRUEsVUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQkEsUUFBaEI7O0FBRUEsVUFBS0MsU0FBTCxDQUFlLEdBQWY7O0FBQ0EsVUFBS0MsWUFBTDs7QUFUb0Q7QUFVckQ7QUFFRDs7Ozs7OzttQ0FHZTtBQUNiLFdBQUtDLFVBQUwsZ0JBQXdCLEtBQUtILFFBQTdCO0FBQ0Q7QUFFRDs7Ozs7O2lDQUdjO0FBQ1gsV0FBS0csVUFBTCxXQUFtQixLQUFLTixJQUF4QixjQUFnQyxLQUFLQyxLQUFyQztBQUNEOzs7O0VBMUI4QnJCLDZDQUFNLENBQUMyQixXQUFQLENBQW1CQyxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHJEO0FBQ0E7QUFFQTs7OztJQUdxQkMsSTs7Ozs7QUFFbkIsZ0JBQVlqQixLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhFQUFNQSxLQUFOLEdBRGlCLENBRWpCOztBQUNBLFVBQUtrQixRQUFMLEdBQWdCLEVBQWhCLENBSGlCLENBSWpCOztBQUNBLFVBQUtDLFFBQUwsR0FBZ0IsRUFBaEIsQ0FMaUIsQ0FNakI7O0FBQ0EsVUFBS0MsWUFBTCxDQUFrQnBCLEtBQWxCOztBQVBpQjtBQUFBO0FBQUE7O0FBQUE7QUFTakIsMkJBQWlCLE1BQUtrQixRQUF0Qiw4SEFBZ0M7QUFBQSxZQUF2QkcsSUFBdUI7O0FBQzlCO0FBQ0EsY0FBS0MsR0FBTCxDQUFTRCxJQUFULEVBQWUsSUFBZixFQUY4QixDQUc5Qjs7O0FBQ0FBLFlBQUksQ0FBQ0UsS0FBTCxHQUFhLElBQWI7QUFDRDtBQWRnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBZWxCO0FBRUQ7Ozs7Ozs7Ozs7aUNBTWF2QixLLEVBQU87QUFDbEIsVUFBTXdCLE1BQU0sR0FBRyxDQUFFLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixFQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQyxFQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxFQUErQyxJQUEvQyxFQUFxRCxHQUFyRCxFQUEwRCxHQUExRCxFQUErRCxHQUEvRCxDQUFmO0FBQ0EsVUFBTUMsS0FBSyxHQUFHLENBQUUsUUFBRixFQUFZLFVBQVosRUFBd0IsUUFBeEIsRUFBa0MsT0FBbEMsQ0FBZDtBQUNBLFVBQU1DLFVBQVUsR0FBRyxDQUFFLE1BQUYsRUFBVSxPQUFWLEVBQW1CLEtBQW5CLENBQW5CO0FBRUEsVUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFDQSxVQUFJQyxTQUFTLEdBQUd4Qyw2Q0FBTSxDQUFDeUMsSUFBUCxDQUFZQyxHQUFaLENBQWdCQyxJQUFoQixDQUFxQkwsVUFBckIsQ0FBaEI7O0FBRUEsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUCxLQUFLLENBQUNRLE1BQTFCLEVBQWtDRCxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDLGFBQUssSUFBSUUsRUFBRSxHQUFHLENBQWQsRUFBaUJBLEVBQUUsR0FBR1YsTUFBTSxDQUFDUyxNQUE3QixFQUFxQ0MsRUFBRSxFQUF2QyxFQUEyQztBQUN6Q1AsY0FBSSxDQUFDUSxJQUFMLENBQVUsSUFBSTlCLDZDQUFKLENBQVNMLEtBQVQsRUFBaUIsTUFBTWdDLENBQXZCLEVBQTRCLE1BQU1BLENBQWxDLEVBQXNDUCxLQUFLLENBQUNPLENBQUQsQ0FBM0MsRUFBZ0RSLE1BQU0sQ0FBQ1UsRUFBRCxDQUF0RCxZQUErRFYsTUFBTSxDQUFDVSxFQUFELENBQXJFLGlCQUFnRlQsS0FBSyxDQUFDTyxDQUFELENBQXJGLEdBQTRGSixTQUE1RixDQUFWO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLVixRQUFMLEdBQWdCOUIsNkNBQU0sQ0FBQ2dELEtBQVAsQ0FBYUMsS0FBYixDQUFtQkMsT0FBbkIsQ0FBMkJYLElBQTNCLENBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7c0NBS2tCO0FBQ2QsYUFBTyxLQUFLVCxRQUFMLENBQWMsQ0FBZCxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7c0NBS2tCO0FBQ2QsYUFBTyxLQUFLQyxRQUFMLENBQWMsQ0FBZCxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7bUNBS2VvQixLLEVBQU87QUFDcEIsV0FBS3JCLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxFQUFlcUIsS0FBaEM7QUFDRDtBQUVEOzs7Ozs7a0NBR2M7QUFDWkMsYUFBTyxDQUFDQyxHQUFSLENBQVksNEJBQVo7QUFDQSxXQUFLdkIsUUFBTCxHQUFnQjlCLDZDQUFNLENBQUNnRCxLQUFQLENBQWFDLEtBQWIsQ0FBbUJDLE9BQW5CLENBQTJCLEtBQUtuQixRQUFoQyxDQUFoQjtBQUNBLFdBQUtELFFBQUwsQ0FBY3dCLE9BQWQsQ0FBc0IsVUFBQ3JCLElBQUQsRUFBVTtBQUM5QkEsWUFBSSxDQUFDUixZQUFMO0FBQ0QsT0FGRDtBQUdBLFdBQUtNLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7OztFQS9FK0IvQiw2Q0FBTSxDQUFDMkIsV0FBUCxDQUFtQjRCLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05yRDtBQUVBOzs7O0lBR3FCQyxNOzs7OztBQUVuQixrQkFBWTVDLEtBQVosRUFBbUJNLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkcsSUFBekIsRUFBK0JtQyxLQUEvQixFQUFzQztBQUFBOztBQUFBOztBQUNwQyxnRkFBTTdDLEtBQU4sRUFBYU0sQ0FBYixFQUFnQkMsQ0FBaEI7QUFFQSxVQUFLRyxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLbUMsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUtDLElBQUwsR0FBWSxFQUFaO0FBRUEsVUFBS0MsUUFBTCxHQUFnQmhELEtBQUssQ0FBQ3NCLEdBQU4sQ0FBVTJCLElBQVYsQ0FBZTNDLENBQWYsRUFBa0JDLENBQUMsR0FBRyxFQUF0QixFQUEwQkcsSUFBMUIsQ0FBaEI7O0FBQ0EsVUFBS3NDLFFBQUwsQ0FBY3BDLFNBQWQsQ0FBd0IsR0FBeEI7O0FBRUEsVUFBS0UsVUFBTCxrQkFBMEIsTUFBSytCLEtBQS9COztBQVhvQztBQVlyQztBQUVEOzs7Ozs7Ozs7Ozs7dUNBUW1CeEIsSSxFQUFNTSxJLEVBQU07QUFDN0IsVUFBSXVCLFlBQVksR0FBRyxLQUFLSCxJQUFMLENBQVVJLE1BQVYsQ0FBaUIsS0FBS0osSUFBTCxDQUFVSyxPQUFWLENBQWtCL0IsSUFBbEIsQ0FBakIsRUFBMEMsQ0FBMUMsQ0FBbkI7QUFDQU0sVUFBSSxDQUFDUixRQUFMLENBQWNrQyxPQUFkLENBQXNCSCxZQUFZLENBQUMsQ0FBRCxDQUFsQztBQUNBVixhQUFPLENBQUNDLEdBQVIsWUFBZ0IsS0FBSy9CLElBQXJCLGVBQThCd0MsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQnhDLElBQTlDO0FBRUEsYUFBT2lCLElBQUksQ0FBQzJCLGVBQUwsRUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7O3dDQVFvQmYsSyxFQUFPWixJLEVBQU07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDL0IsNkJBQWlCWSxLQUFqQiw4SEFBd0I7QUFBQSxjQUFmbEIsSUFBZTtBQUN0QixjQUFJNkIsWUFBWSxHQUFHLEtBQUtILElBQUwsQ0FBVUksTUFBVixDQUFpQixLQUFLSixJQUFMLENBQVVLLE9BQVYsQ0FBa0IvQixJQUFsQixDQUFqQixFQUEwQyxDQUExQyxDQUFuQjtBQUNBTSxjQUFJLENBQUNSLFFBQUwsQ0FBY2tDLE9BQWQsQ0FBc0JILFlBQVksQ0FBQyxDQUFELENBQWxDO0FBRUFWLGlCQUFPLENBQUNDLEdBQVIsWUFBZ0IsS0FBSy9CLElBQXJCLGVBQThCd0MsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQnhDLElBQTlDO0FBQ0Q7QUFOOEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRL0IsYUFBT2lCLElBQUksQ0FBQzJCLGVBQUwsRUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O2tDQUtjakMsSSxFQUFNO0FBQ2xCLFdBQUswQixJQUFMLENBQVVaLElBQVYsQ0FBZWQsSUFBZjtBQUNEOzs7O0VBMURpQ2pDLDZDQUFNLENBQUMyQixXQUFQLENBQW1CQyxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMdkQ7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztJQUdxQmIsUzs7Ozs7QUFFbkIsdUJBQWM7QUFBQTs7QUFBQSxrRkFDTjtBQUNKb0QsU0FBRyxFQUFFO0FBREQsS0FETTtBQUliO0FBRUQ7Ozs7Ozs7Ozs4QkFLVTtBQUNSQyxtRUFBTyxDQUFDQyxTQUFSLENBQWtCLElBQWxCO0FBQ0FELG1FQUFPLENBQUNFLFdBQVIsQ0FBb0IsSUFBcEI7QUFDQUYsbUVBQU8sQ0FBQ0csVUFBUixDQUFtQixJQUFuQjtBQUNEO0FBRUQ7Ozs7Ozs2QkFHUztBQUNQLFdBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS0MseUJBQUwsR0FBaUMsSUFBakM7QUFFQSxXQUFLbkMsSUFBTCxHQUFZLElBQUlWLHdEQUFKLENBQVMsSUFBVCxDQUFaO0FBRUEsV0FBSzhDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS0EsT0FBTCxDQUFhNUIsSUFBYixDQUFrQixJQUFJUywwREFBSixDQUFXLElBQVgsRUFBa0IsS0FBS29CLEdBQUwsQ0FBU0MsSUFBVCxDQUFjbkYsTUFBZCxDQUFxQkcsS0FBckIsR0FBNkIsR0FBL0MsRUFBcUQsR0FBckQsRUFBMEQsUUFBMUQsRUFBb0UsT0FBcEUsQ0FBbEI7QUFDQSxXQUFLOEUsT0FBTCxDQUFhNUIsSUFBYixDQUFrQixJQUFJUywwREFBSixDQUFXLElBQVgsRUFBa0IsS0FBS29CLEdBQUwsQ0FBU0MsSUFBVCxDQUFjbkYsTUFBZCxDQUFxQkcsS0FBckIsR0FBNkIsR0FBL0MsRUFBcUQsR0FBckQsRUFBMEQsVUFBMUQsRUFBc0UsTUFBdEUsQ0FBbEI7QUFDQSxXQUFLOEUsT0FBTCxDQUFhNUIsSUFBYixDQUFrQixJQUFJUywwREFBSixDQUFXLElBQVgsRUFBa0IsS0FBS29CLEdBQUwsQ0FBU0MsSUFBVCxDQUFjbkYsTUFBZCxDQUFxQkcsS0FBckIsR0FBNkIsR0FBL0MsRUFBcUQsR0FBckQsRUFBMEQsT0FBMUQsRUFBbUUsUUFBbkUsQ0FBbEI7QUFDQSxXQUFLOEUsT0FBTCxDQUFhNUIsSUFBYixDQUFrQixJQUFJUywwREFBSixDQUFXLElBQVgsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsU0FBM0IsRUFBc0MsUUFBdEMsQ0FBbEI7QUFFQSxXQUFLc0IsY0FBTDtBQUNBLFdBQUtDLG1CQUFMO0FBQ0EsV0FBS0MsZ0JBQUw7QUFDRDtBQUVEOzs7Ozs7NkJBR1M7QUFDUDtBQUNBLFdBQUtDLGFBQUwsR0FGTyxDQUlQOztBQUNBLFVBQUksS0FBS0MsdUJBQUwsRUFBSixFQUFvQztBQUVsQztBQUNBO0FBSGtDO0FBQUE7QUFBQTs7QUFBQTtBQUlsQywrQkFBaUIsS0FBS1AsT0FBTCxDQUFhLEtBQUtGLFVBQWxCLEVBQThCZCxJQUEvQyw4SEFBcUQ7QUFBQSxnQkFBNUMxQixJQUE0QztBQUNuREEsZ0JBQUksQ0FBQ2tELGtCQUFMO0FBQ0QsV0FOaUMsQ0FRbEM7O0FBUmtDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU2xDLFlBQUksS0FBS0MsaUJBQUwsQ0FBdUIvRCxLQUF2QixJQUFnQyxLQUFLc0QsT0FBTCxDQUFhLEtBQUtGLFVBQWxCLEVBQThCZixTQUFsRSxFQUE2RTtBQUMzRSxlQUFLMkIsdUJBQUwsQ0FBNkJDLE9BQTdCLEdBQXVDLElBQXZDO0FBQ0Q7QUFDRixPQWpCTSxDQW1CUDs7O0FBQ0EsVUFBSSxLQUFLWix5QkFBVCxFQUFvQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNsQyxnQ0FBaUIsS0FBS0MsT0FBTCxDQUFhLEtBQUtGLFVBQWxCLEVBQThCZCxJQUEvQyxtSUFBcUQ7QUFBQSxnQkFBNUMxQixLQUE0QztBQUNuRCxnQkFBSW1ELGlCQUFpQixHQUFHLEtBQUs3QyxJQUFMLENBQVUyQixlQUFWLEVBQXhCOztBQUVBLGdCQUFJakMsS0FBSSxDQUFDWixLQUFMLElBQWMrRCxpQkFBaUIsQ0FBQy9ELEtBQWhDLElBQXlDWSxLQUFJLENBQUNiLElBQUwsSUFBYSxLQUFLbUUsaUJBQTNELElBQWdGdEQsS0FBSSxDQUFDWixLQUFMLElBQWMsS0FBS3NELE9BQUwsQ0FBYSxLQUFLRixVQUFsQixFQUE4QmYsU0FBaEksRUFBMkk7QUFDekksbUJBQUs4QixnQkFBTCxDQUFzQnZELEtBQXRCLEVBQTRCLEtBQUswQyxPQUFMLENBQWEsS0FBS0YsVUFBbEIsQ0FBNUI7QUFDRDtBQUNGLFdBUGlDLENBUWxDOztBQVJrQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNsQyxhQUFLQyx5QkFBTCxHQUFpQyxLQUFqQztBQUNEO0FBQ0Y7QUFFRDs7Ozs7O3FDQUdpQjtBQUFBOztBQUNmO0FBRGU7QUFBQTtBQUFBOztBQUFBO0FBRWYsOEJBQW1CLEtBQUtDLE9BQXhCLG1JQUFpQztBQUFBLGNBQXhCYyxNQUF3QjtBQUMvQixlQUFLdkQsR0FBTCxDQUFTd0QsUUFBVCxDQUFrQkQsTUFBbEI7QUFDRCxTQUpjLENBTWY7O0FBTmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPZixVQUFJRSxNQUFNLEdBQUcsQ0FBYjs7QUFQZSxpQ0FTTi9DLENBVE07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGdCQVVKNkMsTUFWSTs7QUFZWDtBQUNBLGlCQUFJLENBQUNHLGlCQUFMLENBQXVCSCxNQUF2QixFQWJXLENBZVg7QUFDQTs7O0FBQ0EsZ0JBQUlBLE1BQU0sQ0FBQ25FLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0I7QUFDN0IsbUJBQUksQ0FBQ3VFLE1BQUwsQ0FBWTNELEdBQVosQ0FBZ0I7QUFDZDRELHVCQUFPLEVBQUVMLE1BQU0sQ0FBQzlCLElBQVAsQ0FBWWYsQ0FBWixDQURLO0FBRWQxQixpQkFBQyxFQUFHLE1BQU15RSxNQUZJO0FBR2R4RSxpQkFBQyxFQUFFLEdBSFc7QUFJZDRFLG9CQUFJLEVBQUUsUUFKUTtBQUtkQyx3QkFBUSxFQUFFLEdBTEk7QUFNZEMsMEJBQVUsRUFBRSxzQkFBWTtBQUN0QlIsd0JBQU0sQ0FBQzlCLElBQVAsQ0FBWWYsQ0FBWixFQUFlc0QsVUFBZjtBQUNEO0FBUmEsZUFBaEI7O0FBV0FQLG9CQUFNLEdBQUdBLE1BQU0sR0FBRyxFQUFsQjtBQUNEO0FBOUJVOztBQVViLGdDQUFtQixLQUFJLENBQUNoQixPQUF4QixtSUFBaUM7QUFBQTtBQXFCaEM7QUEvQlk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNmLFdBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUksQ0FBckIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFBQSxjQUFwQkEsQ0FBb0I7QUF1QjVCLE9BaENjLENBa0NmOzs7QUFDQSxXQUFLdUQsMEJBQUw7QUFDRDtBQUVEOzs7Ozs7O29DQUlnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNkLDhCQUFtQixLQUFLeEIsT0FBeEIsbUlBQWlDO0FBQUEsY0FBeEJjLE1BQXdCOztBQUUvQjtBQUNBLGNBQUlBLE1BQU0sQ0FBQy9CLFNBQVAsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsaUJBQUtjLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQXBCLG1CQUFPLENBQUNDLEdBQVIsV0FBZW9DLE1BQU0sQ0FBQ25FLElBQXRCO0FBQ0Q7QUFDRjtBQVJhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTZjtBQUVEOzs7Ozs7Ozs7c0NBTWtCbUUsTSxFQUEyQjtBQUFBLFVBQW5CVyxhQUFtQix1RUFBSCxDQUFHOztBQUMzQztBQUNBO0FBQ0EsV0FBSyxJQUFJQyxlQUFlLEdBQUdELGFBQTNCLEVBQTBDQyxlQUFlLElBQUksQ0FBN0QsRUFBZ0VBLGVBQWUsRUFBL0UsRUFBbUY7QUFDakYsWUFBSUMsVUFBVSxHQUFHLEtBQUsvRCxJQUFMLENBQVVULFFBQVYsQ0FBbUJ5RSxLQUFuQixFQUFqQjs7QUFFQSxZQUFJRCxVQUFKLEVBQWdCO0FBQ2Q7QUFDQWIsZ0JBQU0sQ0FBQ2UsYUFBUCxDQUFxQkYsVUFBckI7QUFDRCxTQUhELE1BSUs7QUFDSDtBQUNBLGVBQUsvRCxJQUFMLENBQVVrRSxXQUFWLEdBRkcsQ0FJSDs7QUFDQSxjQUFJLEtBQUtsRSxJQUFMLENBQVVULFFBQVYsQ0FBbUJlLE1BQW5CLElBQTZCd0QsZUFBakMsRUFBa0Q7QUFDaEQ7QUFDQSxpQkFBS1QsaUJBQUwsQ0FBdUJILE1BQXZCLEVBQStCWSxlQUEvQjtBQUNELFdBSEQsTUFJSztBQUNIakQsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFFRDs7Ozs7O2lEQUc2QjtBQUMzQjtBQUNBLFVBQUlpRCxVQUFVLEdBQUcsS0FBSy9ELElBQUwsQ0FBVVQsUUFBVixDQUFtQnlFLEtBQW5CLEVBQWpCLENBRjJCLENBSTNCOztBQUNBLFdBQUtoRSxJQUFMLENBQVVSLFFBQVYsQ0FBbUJrQyxPQUFuQixDQUEyQnFDLFVBQTNCLEVBTDJCLENBTzNCOztBQUNBLFdBQUtsQixpQkFBTCxHQUF5QmtCLFVBQXpCLENBUjJCLENBVTNCOztBQUNBLFdBQUtmLGlCQUFMLEdBQXlCZSxVQUFVLENBQUNsRixJQUFwQyxDQVgyQixDQWEzQjs7QUFDQSxXQUFLeUUsTUFBTCxDQUFZM0QsR0FBWixDQUFnQjtBQUNkNEQsZUFBTyxFQUFFUSxVQURLO0FBRWRwRixTQUFDLEVBQUUsT0FGVztBQUdkNkUsWUFBSSxFQUFFLFFBSFE7QUFJZEMsZ0JBQVEsRUFBRSxHQUpJO0FBS2RDLGtCQUFVLEVBQUUsc0JBQU07QUFDaEJLLG9CQUFVLENBQUNKLFVBQVg7QUFDRDtBQVBhLE9BQWhCO0FBU0Q7QUFFRDs7Ozs7Ozs7OENBSzBCO0FBQ3hCLFVBQUksS0FBS2QsaUJBQUwsQ0FBdUI5RCxJQUF2QixJQUErQixLQUFLaUIsSUFBTCxDQUFVMkIsZUFBVixHQUE0QjVDLElBQS9ELEVBQXFFO0FBQ25FLGFBQUs4RCxpQkFBTCxHQUF5QixLQUFLN0MsSUFBTCxDQUFVMkIsZUFBVixFQUF6QjtBQUNBLGFBQUtxQixpQkFBTCxHQUF5QixLQUFLaEQsSUFBTCxDQUFVMkIsZUFBVixHQUE0QjlDLElBQXJEO0FBRUEsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7cUNBS2lCYSxJLEVBQU13RCxNLEVBQVE7QUFBQTs7QUFDN0J4RCxVQUFJLENBQUN5RSxjQUFMLEdBRDZCLENBRzdCOztBQUNBekUsVUFBSSxDQUFDMEUsRUFBTCxDQUFRLGFBQVIsRUFBdUIsWUFBTTtBQUMzQjtBQUNBMUUsWUFBSSxDQUFDa0Qsa0JBQUwsR0FGMkIsQ0FJM0I7O0FBQ0FsRCxZQUFJLENBQUMyRSxTQUFMLEdBTDJCLENBTzNCOztBQVAyQjtBQUFBO0FBQUE7O0FBQUE7QUFRM0IsZ0NBQXFCLE1BQUksQ0FBQ3JFLElBQUwsQ0FBVVIsUUFBL0IsbUlBQXlDO0FBQUEsZ0JBQWhDOEUsUUFBZ0M7QUFDdkNBLG9CQUFRLENBQUNDLFFBQVQsQ0FBa0IsQ0FBbEI7QUFDRCxXQVYwQixDQVkzQjs7QUFaMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhM0I3RSxZQUFJLENBQUM2RSxRQUFMLENBQWMsQ0FBZCxFQWIyQixDQWUzQjs7QUFDQSxjQUFJLENBQUNqQixNQUFMLENBQVkzRCxHQUFaLENBQWdCO0FBQ2Q0RCxpQkFBTyxFQUFFN0QsSUFESztBQUVkZixXQUFDLEVBQUUsR0FGVztBQUdkQyxXQUFDLEVBQUUsR0FIVztBQUlkNEUsY0FBSSxFQUFFLFFBSlE7QUFLZEMsa0JBQVEsRUFBRTtBQUxJLFNBQWhCLEVBaEIyQixDQXdCM0I7OztBQUNBUCxjQUFNLENBQUNzQixrQkFBUCxDQUEwQjlFLElBQTFCLEVBQWdDLE1BQUksQ0FBQ00sSUFBckM7QUFDRCxPQTFCRCxFQUo2QixDQWdDN0I7O0FBQ0FOLFVBQUksQ0FBQzBFLEVBQUwsQ0FBUSxhQUFSLEVBQXVCLFlBQU07QUFDM0I7QUFDQTFFLFlBQUksQ0FBQytFLE9BQUwsQ0FBYSxRQUFiLEVBRjJCLENBSTNCOztBQUNBLGNBQUksQ0FBQ25CLE1BQUwsQ0FBWTNELEdBQVosQ0FBZ0I7QUFDZDRELGlCQUFPLEVBQUU3RCxJQURLO0FBRWRkLFdBQUMsRUFBRSxHQUZXO0FBR2Q0RSxjQUFJLEVBQUUsUUFIUTtBQUlkQyxrQkFBUSxFQUFFO0FBSkksU0FBaEI7QUFNRCxPQVhELEVBakM2QixDQThDN0I7O0FBQ0EvRCxVQUFJLENBQUMwRSxFQUFMLENBQVEsWUFBUixFQUFzQixZQUFNO0FBQzFCO0FBQ0ExRSxZQUFJLENBQUMyRSxTQUFMLEdBRjBCLENBSTFCOztBQUNBLGNBQUksQ0FBQ2YsTUFBTCxDQUFZM0QsR0FBWixDQUFnQjtBQUNkNEQsaUJBQU8sRUFBRTdELElBREs7QUFFZGQsV0FBQyxFQUFFLEdBRlc7QUFHZDRFLGNBQUksRUFBRSxRQUhRO0FBSWRDLGtCQUFRLEVBQUU7QUFKSSxTQUFoQjtBQU1ELE9BWEQ7QUFZRDtBQUVEOzs7Ozs7MENBR3NCO0FBQUE7O0FBQ3BCO0FBQ0EsV0FBS1gsdUJBQUwsR0FBK0IsS0FBS25ELEdBQUwsQ0FBUytFLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBL0I7QUFDQSxXQUFLNUIsdUJBQUwsQ0FBNkJDLE9BQTdCLEdBQXVDLEtBQXZDLENBSG9CLENBS3BCOztBQUNBLFVBQUk0Qix3QkFBd0IsR0FBRyxLQUFLaEYsR0FBTCxDQUFTaUYsUUFBVCxFQUEvQjtBQUNBRCw4QkFBd0IsQ0FBQ0UsU0FBekIsQ0FBbUMsUUFBbkMsRUFBNkMsR0FBN0M7QUFDQUYsOEJBQXdCLENBQUNHLGVBQXpCLENBQXlDLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELEdBQXhELEVBQTZELENBQTdEO0FBRUEsV0FBS2hDLHVCQUFMLENBQTZCbkQsR0FBN0IsQ0FBaUNnRix3QkFBakMsRUFWb0IsQ0FZcEI7O0FBQ0EsVUFBSUksWUFBWSxHQUFHLEtBQUtwRixHQUFMLENBQVMyQixJQUFULENBQWUsS0FBS2UsR0FBTCxDQUFTQyxJQUFULENBQWNuRixNQUFkLENBQXFCRyxLQUFyQixHQUE2QixDQUE1QyxFQUFpRCxLQUFLK0UsR0FBTCxDQUFTQyxJQUFULENBQWNuRixNQUFkLENBQXFCSSxNQUFyQixHQUE4QixDQUEvQixHQUFvQyxFQUFwRixFQUF3RixzQ0FBeEYsQ0FBbkI7QUFDQXdILGtCQUFZLENBQUM5RixTQUFiLENBQXVCLEdBQXZCO0FBRUEsV0FBSzZELHVCQUFMLENBQTZCbkQsR0FBN0IsQ0FBaUNvRixZQUFqQztBQUVBLFVBQU1qRixLQUFLLEdBQUcsQ0FBRSxRQUFGLEVBQVksVUFBWixFQUF3QixRQUF4QixFQUFrQyxPQUFsQyxDQUFkO0FBQ0EsVUFBSXNELE1BQU0sR0FBRyxFQUFiOztBQW5Cb0I7QUFxQmYsWUFBSXZFLElBQUksYUFBUjs7QUFDSCxZQUFJbUcsY0FBYyxHQUFHLE1BQUksQ0FBQ3JGLEdBQUwsQ0FBUzJCLElBQVQsQ0FBYyxNQUFJLENBQUNlLEdBQUwsQ0FBU0MsSUFBVCxDQUFjbkYsTUFBZCxDQUFxQkcsS0FBckIsR0FBNkIsQ0FBM0MsRUFBK0MsTUFBSSxDQUFDK0UsR0FBTCxDQUFTQyxJQUFULENBQWNuRixNQUFkLENBQXFCSSxNQUFyQixHQUE4QixDQUEvQixHQUFvQzZGLE1BQWxGLEVBQTBGdkUsSUFBMUYsQ0FBckI7O0FBQ0FtRyxzQkFBYyxDQUFDL0YsU0FBZixDQUF5QixHQUF6QjtBQUNBK0Ysc0JBQWMsQ0FBQ2IsY0FBZjtBQUVBYSxzQkFBYyxDQUFDWixFQUFmLENBQWtCLGFBQWxCLEVBQWlDLFlBQU07QUFDckMsZ0JBQUksQ0FBQ3BCLGlCQUFMLEdBQXlCbkUsSUFBekI7QUFDQSxnQkFBSSxDQUFDc0QseUJBQUwsR0FBaUMsSUFBakM7QUFDQSxnQkFBSSxDQUFDVyx1QkFBTCxDQUE2QkMsT0FBN0IsR0FBdUMsS0FBdkM7QUFDRCxTQUpEO0FBTUFpQyxzQkFBYyxDQUFDWixFQUFmLENBQWtCLGFBQWxCLEVBQWlDLFlBQU07QUFDckNZLHdCQUFjLENBQUNQLE9BQWYsQ0FBdUIsUUFBdkI7QUFDRCxTQUZEO0FBSUFPLHNCQUFjLENBQUNaLEVBQWYsQ0FBa0IsWUFBbEIsRUFBZ0MsWUFBTTtBQUNwQ1ksd0JBQWMsQ0FBQ1gsU0FBZjtBQUNELFNBRkQ7O0FBSUEsY0FBSSxDQUFDdkIsdUJBQUwsQ0FBNkJuRCxHQUE3QixDQUFpQ3FGLGNBQWpDOztBQUVBNUIsY0FBTSxJQUFJLEVBQVY7QUExQ2tCOztBQXFCcEIsZ0NBQWlCdEQsS0FBakIsNEJBQXdCO0FBQUE7QUFzQnZCO0FBQ0Y7QUFFRDs7Ozs7O3VDQUdtQjtBQUFBOztBQUNqQixVQUFJbUYsYUFBYSxHQUFHLEtBQUt0RixHQUFMLENBQVMyQixJQUFULENBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixTQUF4QixDQUFwQjtBQUNBMkQsbUJBQWEsQ0FBQ2hHLFNBQWQsQ0FBd0IsR0FBeEI7QUFDQWdHLG1CQUFhLENBQUNkLGNBQWQ7QUFFQWMsbUJBQWEsQ0FBQ2IsRUFBZCxDQUFpQixhQUFqQixFQUFnQyxZQUFNO0FBQ3BDLGNBQUksQ0FBQy9GLEtBQUwsQ0FBVzZHLE9BQVg7QUFDRCxPQUZEO0FBSUFELG1CQUFhLENBQUNiLEVBQWQsQ0FBaUIsYUFBakIsRUFBZ0MsWUFBTTtBQUNwQ2EscUJBQWEsQ0FBQ1IsT0FBZCxDQUFzQixRQUF0QjtBQUNELE9BRkQ7QUFJQVEsbUJBQWEsQ0FBQ2IsRUFBZCxDQUFpQixZQUFqQixFQUErQixZQUFNO0FBQ25DYSxxQkFBYSxDQUFDWixTQUFkO0FBQ0QsT0FGRDtBQUdEOzs7O0VBdFZvQzVHLDZDQUFNLENBQUMwSCxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUjlDO0FBQ0E7QUFFQTs7OztJQUdxQjdHLGE7Ozs7O0FBRW5CLDJCQUFjO0FBQUE7O0FBQUEsc0ZBQ047QUFDSnNELFNBQUcsRUFBRTtBQURELEtBRE07QUFJYjs7Ozs4QkFFUyxDQUVUOzs7NkJBRVE7QUFDUDtBQUNBd0QsbUVBQVUsQ0FBQ0MsbUJBQVg7QUFFQSxXQUFLQyxZQUFMO0FBQ0EsV0FBS0Msa0JBQUw7QUFDQSxXQUFLQyxvQkFBTDtBQUNEOzs7NkJBRVEsQ0FFUjtBQUVEOzs7Ozs7bUNBR2U7QUFDYixXQUFLQyxtQkFBTCxHQUEyQixLQUFLOUYsR0FBTCxDQUFTaUYsUUFBVCxFQUEzQjtBQUNBLFdBQUthLG1CQUFMLENBQXlCWCxlQUF6QixDQUF5QyxHQUF6QyxFQUE4QyxFQUE5QyxFQUFrRCxHQUFsRCxFQUF1RCxFQUF2RCxFQUEyRCxDQUEzRDtBQUNBLFdBQUtXLG1CQUFMLENBQXlCWixTQUF6QixDQUFtQyxRQUFuQyxFQUE2QyxHQUE3QztBQUVBLFdBQUthLHlCQUFMLEdBQWlDLEtBQUsvRixHQUFMLENBQVNpRixRQUFULEVBQWpDO0FBQ0EsV0FBS2MseUJBQUwsQ0FBK0JDLFNBQS9CLENBQXlDLENBQXpDLEVBQTRDLFFBQTVDO0FBQ0EsV0FBS0QseUJBQUwsQ0FBK0JFLGlCQUEvQixDQUFpRCxHQUFqRCxFQUFzRCxFQUF0RCxFQUEwRCxHQUExRCxFQUErRCxFQUEvRCxFQUFtRSxDQUFuRTtBQUVBLFdBQUtDLFNBQUwsR0FBaUIsS0FBS2xHLEdBQUwsQ0FBUzJCLElBQVQsQ0FBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLG1CQUF4QixFQUE2QztBQUFFd0Usa0JBQVUsRUFBRSxXQUFkO0FBQTJCQyxnQkFBUSxFQUFFLE1BQXJDO0FBQTZDQyxpQkFBUyxFQUFFLE1BQXhEO0FBQWdFOUUsYUFBSyxFQUFFO0FBQXZFLE9BQTdDLENBQWpCO0FBQ0EsV0FBSzJFLFNBQUwsQ0FBZTVHLFNBQWYsQ0FBeUIsR0FBekI7QUFDRDtBQUVEOzs7Ozs7eUNBR3FCO0FBQUE7O0FBQ25CLFdBQUtnSCxxQkFBTCxHQUE2QixLQUFLdEcsR0FBTCxDQUFTaUYsUUFBVCxFQUE3QjtBQUNBLFdBQUtxQixxQkFBTCxDQUEyQm5CLGVBQTNCLENBQTJDLEdBQTNDLEVBQWdELEdBQWhELEVBQXFELEdBQXJELEVBQTBELEVBQTFELEVBQThELENBQTlEO0FBQ0EsV0FBS21CLHFCQUFMLENBQTJCcEIsU0FBM0IsQ0FBcUMsUUFBckMsRUFBK0MsR0FBL0M7QUFDQSxXQUFLb0IscUJBQUwsQ0FBMkJDLFNBQTNCO0FBRUEsV0FBS0MsMkJBQUwsR0FBbUMsS0FBS3hHLEdBQUwsQ0FBU2lGLFFBQVQsRUFBbkM7QUFDQSxXQUFLdUIsMkJBQUwsQ0FBaUNSLFNBQWpDLENBQTJDLENBQTNDLEVBQThDLFFBQTlDO0FBQ0EsV0FBS1EsMkJBQUwsQ0FBaUNQLGlCQUFqQyxDQUFtRCxHQUFuRCxFQUF3RCxHQUF4RCxFQUE2RCxHQUE3RCxFQUFrRSxFQUFsRSxFQUFzRSxDQUF0RTtBQUVBLFdBQUtRLFdBQUwsR0FBbUIsS0FBS3pHLEdBQUwsQ0FBUzJCLElBQVQsQ0FBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLFlBQXhCLEVBQXNDO0FBQUV3RSxrQkFBVSxFQUFFLFdBQWQ7QUFBMkJDLGdCQUFRLEVBQUUsTUFBckM7QUFBNkNDLGlCQUFTLEVBQUUsTUFBeEQ7QUFBZ0U5RSxhQUFLLEVBQUU7QUFBdkUsT0FBdEMsQ0FBbkI7QUFDQSxXQUFLa0YsV0FBTCxDQUFpQm5ILFNBQWpCLENBQTJCLEdBQTNCO0FBQ0EsV0FBS21ILFdBQUwsQ0FBaUJqQyxjQUFqQjtBQUVBLFdBQUtpQyxXQUFMLENBQWlCaEMsRUFBakIsQ0FBb0IsYUFBcEIsRUFBbUMsWUFBTTtBQUN2QyxhQUFJLENBQUMvRixLQUFMLENBQVdnSSxLQUFYLENBQWlCLFdBQWpCO0FBQ0QsT0FGRDtBQUlBLFdBQUtELFdBQUwsQ0FBaUJoQyxFQUFqQixDQUFvQixhQUFwQixFQUFtQyxZQUFNO0FBQ3ZDLGFBQUksQ0FBQzZCLHFCQUFMLENBQTJCSyxRQUEzQixDQUFvQyxHQUFwQztBQUNELE9BRkQ7QUFJQSxXQUFLRixXQUFMLENBQWlCaEMsRUFBakIsQ0FBb0IsWUFBcEIsRUFBa0MsWUFBTTtBQUN0QyxhQUFJLENBQUM2QixxQkFBTCxDQUEyQkssUUFBM0IsQ0FBb0MsQ0FBcEM7QUFDRCxPQUZEO0FBR0Q7QUFFRDs7Ozs7OzsyQ0FJdUI7QUFBQTs7QUFDckIsV0FBS0MscUJBQUwsR0FBNkIsS0FBSzVHLEdBQUwsQ0FBU2lGLFFBQVQsRUFBN0I7QUFDQSxXQUFLMkIscUJBQUwsQ0FBMkJ6QixlQUEzQixDQUEyQyxHQUEzQyxFQUFnRCxHQUFoRCxFQUFxRCxHQUFyRCxFQUEwRCxFQUExRCxFQUE4RCxDQUE5RDtBQUNBLFdBQUt5QixxQkFBTCxDQUEyQjFCLFNBQTNCLENBQXFDLFFBQXJDLEVBQStDLEdBQS9DO0FBRUEsV0FBSzJCLDJCQUFMLEdBQW1DLEtBQUs3RyxHQUFMLENBQVNpRixRQUFULEVBQW5DO0FBQ0EsV0FBSzRCLDJCQUFMLENBQWlDYixTQUFqQyxDQUEyQyxDQUEzQyxFQUE4QyxRQUE5QztBQUNBLFdBQUthLDJCQUFMLENBQWlDWixpQkFBakMsQ0FBbUQsR0FBbkQsRUFBd0QsR0FBeEQsRUFBNkQsR0FBN0QsRUFBa0UsRUFBbEUsRUFBc0UsQ0FBdEU7QUFFQSxXQUFLYSxXQUFMLEdBQW1CLEtBQUs5RyxHQUFMLENBQVMyQixJQUFULENBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixjQUF4QixFQUF3QztBQUFFd0Usa0JBQVUsRUFBRSxXQUFkO0FBQTJCQyxnQkFBUSxFQUFFLE1BQXJDO0FBQTZDQyxpQkFBUyxFQUFFLE1BQXhEO0FBQWdFOUUsYUFBSyxFQUFFO0FBQXZFLE9BQXhDLENBQW5CO0FBQ0EsV0FBS3VGLFdBQUwsQ0FBaUJ4SCxTQUFqQixDQUEyQixHQUEzQjtBQUNBLFdBQUt3SCxXQUFMLENBQWlCdEMsY0FBakI7QUFFQSxXQUFLc0MsV0FBTCxDQUFpQnJDLEVBQWpCLENBQW9CLGFBQXBCLEVBQW1DLFlBQU07QUFDdkMsY0FBSSxDQUFDL0YsS0FBTCxDQUFXZ0ksS0FBWCxDQUFpQixrQkFBakI7QUFDRCxPQUZEO0FBSUEsV0FBS0ksV0FBTCxDQUFpQnJDLEVBQWpCLENBQW9CLGFBQXBCLEVBQW1DLFlBQU07QUFDdkMsY0FBSSxDQUFDbUMscUJBQUwsQ0FBMkJELFFBQTNCLENBQW9DLEdBQXBDO0FBQ0QsT0FGRDtBQUlBLFdBQUtHLFdBQUwsQ0FBaUJyQyxFQUFqQixDQUFvQixZQUFwQixFQUFrQyxZQUFNO0FBQ3RDLGNBQUksQ0FBQzZCLHFCQUFMLENBQTJCSyxRQUEzQixDQUFvQyxDQUFwQztBQUNELE9BRkQ7QUFHRDs7OztFQW5Hd0M3SSw2Q0FBTSxDQUFDMEgsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmxEO0FBRUE7Ozs7O0lBSXFCNUcsZ0I7Ozs7O0FBRW5CLDhCQUFjO0FBQUE7O0FBQUEseUZBQ047QUFDSnFELFNBQUcsRUFBRTtBQURELEtBRE07QUFJYjs7Ozs4QkFFUyxDQUVUOzs7NkJBRVE7QUFDUDtBQUNBLFdBQUs4RSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsV0FBS0MsbUJBQUwsR0FBMkIsVUFBM0IsQ0FKTyxDQU1QOztBQUNBLFdBQUtDLGNBQUw7QUFDQSxXQUFLQyxlQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNEOzs7NkJBRVEsQ0FFUjtBQUVEOzs7Ozs7Ozs7O3FDQU9pQjtBQUFBOztBQUNmO0FBQ0EsVUFBSUMsTUFBTSxHQUFHLEtBQUtySCxHQUFMLENBQVNpRixRQUFULEVBQWI7QUFDQW9DLFlBQU0sQ0FBQ3JCLFNBQVAsQ0FBaUIsQ0FBakIsRUFBb0IsUUFBcEI7QUFDQXFCLFlBQU0sQ0FBQ3BCLGlCQUFQLENBQXlCLE1BQU0sQ0FBL0IsRUFBa0MsTUFBTSxDQUF4QyxFQUEyQyxNQUFNLEVBQWpELEVBQXFELE1BQU0sRUFBM0QsRUFBK0QsQ0FBL0Q7QUFDQW9CLFlBQU0sQ0FBQzdDLGNBQVAsQ0FBc0IsSUFBSTFHLDZDQUFNLENBQUN3SixJQUFQLENBQVlDLFNBQWhCLENBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLENBQXRCLEVBQXFFekosNkNBQU0sQ0FBQ3dKLElBQVAsQ0FBWUMsU0FBWixDQUFzQkMsUUFBM0YsRUFMZSxDQU9mOztBQUNBSCxZQUFNLENBQUM1QyxFQUFQLENBQVUsYUFBVixFQUF5QixVQUFDZ0QsT0FBRCxFQUFhO0FBQ2xDLFlBQUlDLEdBQUcsR0FBRyxLQUFJLENBQUMxSCxHQUFMLENBQVNpRixRQUFULEVBQVY7O0FBQ0F5QyxXQUFHLENBQUN4QyxTQUFKLENBQWMsS0FBSSxDQUFDK0IsbUJBQW5CO0FBQ0FTLFdBQUcsQ0FBQ0MsVUFBSixDQUFlRixPQUFPLENBQUN6SSxDQUF2QixFQUEwQnlJLE9BQU8sQ0FBQ3hJLENBQWxDLEVBQXFDLEtBQUksQ0FBQytILGtCQUExQztBQUNILE9BSkQsRUFJRyxJQUpILEVBUmUsQ0FjZjtBQUNBO0FBQ0E7O0FBQ0FLLFlBQU0sQ0FBQzVDLEVBQVAsQ0FBVSxhQUFWLEVBQXlCLFVBQUNnRCxPQUFELEVBQWE7QUFDcEMsWUFBSUEsT0FBTyxDQUFDRyxNQUFaLEVBQW9CO0FBQ2xCLGNBQUlGLEdBQUcsR0FBRyxLQUFJLENBQUMxSCxHQUFMLENBQVNpRixRQUFULEVBQVY7O0FBQ0F5QyxhQUFHLENBQUN4QyxTQUFKLENBQWMsS0FBSSxDQUFDK0IsbUJBQW5CO0FBQ0FTLGFBQUcsQ0FBQ0MsVUFBSixDQUFlRixPQUFPLENBQUN6SSxDQUF2QixFQUEwQnlJLE9BQU8sQ0FBQ3hJLENBQWxDLEVBQXFDLEtBQUksQ0FBQytILGtCQUExQyxFQUhrQixDQUtsQjtBQUNBOztBQUNBLGNBQUksS0FBSSxDQUFDRCxPQUFULEVBQWtCO0FBQ2hCLGdCQUFJYyxTQUFTLEdBQUcsSUFBSS9KLDZDQUFNLENBQUN3SixJQUFQLENBQVlRLElBQWhCLENBQXFCLEtBQUksQ0FBQ2YsT0FBTCxDQUFhL0gsQ0FBbEMsRUFBcUMsS0FBSSxDQUFDK0gsT0FBTCxDQUFhOUgsQ0FBbEQsRUFBcUR3SSxPQUFPLENBQUN6SSxDQUE3RCxFQUFnRXlJLE9BQU8sQ0FBQ3hJLENBQXhFLENBQWhCO0FBRUEsaUJBQUksQ0FBQzhJLElBQUwsR0FBWSxLQUFJLENBQUMvSCxHQUFMLENBQVNpRixRQUFULEVBQVo7O0FBQ0EsaUJBQUksQ0FBQzhDLElBQUwsQ0FBVS9CLFNBQVYsQ0FBb0IsS0FBSSxDQUFDZ0Isa0JBQUwsR0FBMEIsQ0FBOUMsRUFBaUQsS0FBSSxDQUFDQyxtQkFBdEQ7O0FBQ0EsaUJBQUksQ0FBQ2MsSUFBTCxDQUFVQyxlQUFWLENBQTBCSCxTQUExQjtBQUNELFdBYmlCLENBZWxCOzs7QUFDQSxlQUFJLENBQUNkLE9BQUwsR0FBZTtBQUNiL0gsYUFBQyxFQUFFeUksT0FBTyxDQUFDekksQ0FERTtBQUViQyxhQUFDLEVBQUV3SSxPQUFPLENBQUN4STtBQUZFLFdBQWY7QUFJRDtBQUNGLE9BdEJELEVBc0JHLElBdEJILEVBakJlLENBeUNmOztBQUNBb0ksWUFBTSxDQUFDNUMsRUFBUCxDQUFVLFdBQVYsRUFBdUIsWUFBTTtBQUMzQixhQUFJLENBQUNzQyxPQUFMLEdBQWUsS0FBZjtBQUNELE9BRkQsRUFFRyxJQUZILEVBMUNlLENBOENmOztBQUNBTSxZQUFNLENBQUM1QyxFQUFQLENBQVUsWUFBVixFQUF3QixZQUFNO0FBQzVCLGFBQUksQ0FBQ3NDLE9BQUwsR0FBZSxLQUFmO0FBQ0QsT0FGRCxFQUVHLElBRkg7QUFHRDtBQUVEOzs7Ozs7c0NBR2tCO0FBQ2hCLFdBQUtrQixpQkFBTCxHQUF5QixLQUFLakksR0FBTCxDQUFTa0ksS0FBVCxFQUF6QjtBQUVBLFdBQUtDLHlCQUFMO0FBQ0EsV0FBS0Msd0JBQUw7QUFDRDtBQUVEOzs7Ozs7K0NBRzJCO0FBQUE7O0FBQ3pCLFVBQU1DLEtBQUssR0FBRyxDQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsRUFBUixDQUFkO0FBQ0EsVUFBSUMsT0FBTyxHQUFHLENBQWQ7O0FBRnlCLGlDQUloQjVILENBSmdCO0FBS3ZCLFlBQUk2SCxlQUFlLEdBQUcsTUFBSSxDQUFDdkksR0FBTCxDQUFTaUYsUUFBVCxFQUF0Qjs7QUFDQXNELHVCQUFlLENBQUNyRCxTQUFoQixDQUEwQixRQUExQjtBQUNBcUQsdUJBQWUsQ0FBQ1osVUFBaEIsQ0FBMkIsTUFBTVcsT0FBakMsRUFBMEMsR0FBMUMsRUFBK0NELEtBQUssQ0FBQzNILENBQUQsQ0FBcEQ7QUFDQTZILHVCQUFlLENBQUMvRCxjQUFoQixDQUErQixJQUFJMUcsNkNBQU0sQ0FBQ3dKLElBQVAsQ0FBWWtCLE1BQWhCLENBQXVCLE1BQU1GLE9BQTdCLEVBQXNDLEdBQXRDLEVBQTJDRCxLQUFLLENBQUMzSCxDQUFELENBQWhELENBQS9CLEVBQXFGNUMsNkNBQU0sQ0FBQ3dKLElBQVAsQ0FBWWtCLE1BQVosQ0FBbUJoQixRQUF4RyxFQVJ1QixDQVV2Qjs7QUFDQWUsdUJBQWUsQ0FBQzlELEVBQWhCLENBQW1CLGFBQW5CLEVBQWtDLFlBQU07QUFDdEMsZ0JBQUksQ0FBQ3VDLGtCQUFMLEdBQTBCcUIsS0FBSyxDQUFDM0gsQ0FBRCxDQUEvQjtBQUNELFNBRkQ7QUFJQTRILGVBQU8sSUFBSSxFQUFYO0FBZnVCOztBQUl6QixXQUFLLElBQUk1SCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMkgsS0FBSyxDQUFDMUgsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFBQSxjQUE5QkEsQ0FBOEI7QUFZdEM7QUFDRjtBQUVEOzs7Ozs7Z0RBRzRCO0FBQUE7O0FBQzFCLFVBQU0rSCxNQUFNLEdBQUcsQ0FBRSxVQUFGLEVBQWMsVUFBZCxFQUEwQixVQUExQixFQUFzQyxVQUF0QyxFQUFpRCxVQUFqRCxFQUE2RCxVQUE3RCxFQUF5RSxVQUF6RSxFQUFxRixVQUFyRixDQUFmO0FBQ0EsVUFBSUMsT0FBTyxHQUFFLENBQWI7O0FBRjBCLG1DQUlqQmhJLENBSmlCO0FBS3hCLFlBQUlpSSxnQkFBZ0IsR0FBRyxNQUFJLENBQUMzSSxHQUFMLENBQVNpRixRQUFULENBQWtCLEdBQWxCLEVBQXVCLE1BQU15RCxPQUE3QixDQUF2Qjs7QUFDQUMsd0JBQWdCLENBQUN6RCxTQUFqQixDQUEyQnVELE1BQU0sQ0FBQy9ILENBQUQsQ0FBakM7QUFDQWlJLHdCQUFnQixDQUFDaEIsVUFBakIsQ0FBNEIsR0FBNUIsRUFBaUMsTUFBTWUsT0FBdkMsRUFBZ0QsRUFBaEQ7QUFDQUMsd0JBQWdCLENBQUNuRSxjQUFqQixDQUFnQyxJQUFJMUcsNkNBQU0sQ0FBQ3dKLElBQVAsQ0FBWWtCLE1BQWhCLENBQXVCLEdBQXZCLEVBQTRCLE1BQU1FLE9BQWxDLEVBQTJDLEVBQTNDLENBQWhDLEVBQWdGNUssNkNBQU0sQ0FBQ3dKLElBQVAsQ0FBWWtCLE1BQVosQ0FBbUJoQixRQUFuRztBQUNBbUIsd0JBQWdCLENBQUNDLFFBQWpCLENBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBVHdCLENBV3hCOztBQUNBRCx3QkFBZ0IsQ0FBQ2xFLEVBQWpCLENBQW9CLGFBQXBCLEVBQW1DLFlBQU07QUFDdkMsZ0JBQUksQ0FBQ3dDLG1CQUFMLEdBQTJCd0IsTUFBTSxDQUFDL0gsQ0FBRCxDQUFqQztBQUNELFNBRkQ7QUFJQWdJLGVBQU8sSUFBSSxFQUFYO0FBaEJ3Qjs7QUFJMUIsV0FBSyxJQUFJaEksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRytILE1BQU0sQ0FBQzlILE1BQTNCLEVBQW1DRCxDQUFDLEVBQXBDLEVBQXdDO0FBQUEsZUFBL0JBLENBQStCO0FBYXZDO0FBQ0Y7QUFFRDs7Ozs7O3FDQUdpQjtBQUFBOztBQUNmLFVBQUltSSxXQUFXLEdBQUcsS0FBSzdJLEdBQUwsQ0FBUzJCLElBQVQsQ0FBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLE9BQXhCLENBQWxCO0FBQ0FrSCxpQkFBVyxDQUFDdkosU0FBWixDQUFzQixHQUF0QjtBQUNBdUosaUJBQVcsQ0FBQ3JFLGNBQVo7QUFFQXFFLGlCQUFXLENBQUNwRSxFQUFaLENBQWUsYUFBZixFQUE4QixZQUFNO0FBQ2xDLGNBQUksQ0FBQy9GLEtBQUwsQ0FBVzZHLE9BQVg7QUFDRCxPQUZEO0FBSUFzRCxpQkFBVyxDQUFDcEUsRUFBWixDQUFlLGFBQWYsRUFBOEIsWUFBTTtBQUNsQ29FLG1CQUFXLENBQUMvRCxPQUFaLENBQW9CLFFBQXBCO0FBQ0QsT0FGRDtBQUlBK0QsaUJBQVcsQ0FBQ3BFLEVBQVosQ0FBZSxZQUFmLEVBQTZCLFlBQU07QUFDakNvRSxtQkFBVyxDQUFDbkUsU0FBWjtBQUNELE9BRkQ7QUFHRDs7OztFQWpLMkM1Ryw2Q0FBTSxDQUFDMEgsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnJEO0FBRUE7Ozs7SUFHcUJDLFU7Ozs7Ozs7Ozs7QUFFbkI7Ozs7OzBDQUs2QjtBQUMzQnFELDBEQUFPLENBQUNDLElBQVIsR0FBZTtBQUNiQyxjQUFNLEVBQUU7QUFDTkMsa0JBQVEsRUFBRSxDQUFFLFdBQUYsRUFBZSxnQkFBZjtBQURKLFNBREs7QUFJYkMsY0FBTSxFQUFFLGtCQUFXO0FBQ2pCaEksaUJBQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDRDtBQU5ZLE9BQWY7QUFRRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkg7OztJQUdxQmUsTzs7Ozs7Ozs7OztBQUVuQjs7Ozs7OEJBS2lCeEQsSyxFQUFPO0FBQ3RCLFVBQU15SyxLQUFLLEdBQUcsQ0FBRSxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBcUMsR0FBckMsRUFBMEMsR0FBMUMsRUFBK0MsSUFBL0MsRUFBcUQsR0FBckQsRUFBMEQsR0FBMUQsRUFBK0QsR0FBL0QsQ0FBZDtBQUNBLFVBQU1oSixLQUFLLEdBQUcsQ0FBRSxRQUFGLEVBQVksVUFBWixFQUF3QixRQUF4QixFQUFrQyxPQUFsQyxDQUFkOztBQUVBLGdDQUFtQkEsS0FBbkIsNEJBQTBCO0FBQXJCLFlBQU1qQixJQUFJLGFBQVY7O0FBQ0gsbUNBQW1CaUssS0FBbkIsOEJBQTBCO0FBQXJCLGNBQU0vSixJQUFJLGNBQVY7QUFDSCxjQUFNZ0ssUUFBUSxhQUFNbEssSUFBTixjQUFjRSxJQUFkLENBQWQ7QUFFQVYsZUFBSyxDQUFDcUssSUFBTixDQUFXTSxLQUFYLENBQWlCRCxRQUFqQixFQUEyQix5QkFBeUJBLFFBQXpCLEdBQW9DLE1BQS9EO0FBQ0Q7QUFDRjs7QUFFRDFLLFdBQUssQ0FBQ3FLLElBQU4sQ0FBV00sS0FBWCxDQUFpQixXQUFqQixFQUE4QixtQ0FBOUI7QUFDQTNLLFdBQUssQ0FBQ3FLLElBQU4sQ0FBV00sS0FBWCxDQUFpQixZQUFqQixFQUErQixvQ0FBL0I7QUFDQTNLLFdBQUssQ0FBQ3FLLElBQU4sQ0FBV00sS0FBWCxDQUFpQixVQUFqQixFQUE2QixrQ0FBN0I7QUFDRDtBQUVEOzs7Ozs7OztnQ0FLbUIzSyxLLEVBQU87QUFDeEIsVUFBTStKLE1BQU0sR0FBRyxDQUFFLE9BQUYsRUFBVyxNQUFYLEVBQW1CLE9BQW5CLEVBQTRCLFFBQTVCLEVBQXNDLEtBQXRDLEVBQTZDLE9BQTdDLEVBQXNELFFBQXRELENBQWY7O0FBRUEsa0NBQW9CQSxNQUFwQiwrQkFBNEI7QUFBdkIsWUFBTWxILEtBQUssZUFBWDtBQUNIN0MsYUFBSyxDQUFDcUssSUFBTixDQUFXTSxLQUFYLGtCQUEyQjlILEtBQTNCLHlDQUFtRUEsS0FBbkU7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7OytCQUtrQjdDLEssRUFBTztBQUN2QixVQUFNNEssTUFBTSxHQUFHLENBQUUsT0FBRixFQUFXLE9BQVgsQ0FBZjs7QUFFQSxrQ0FBb0JBLE1BQXBCLCtCQUE0QjtBQUF2QixZQUFNQyxLQUFLLGVBQVg7O0FBQ0gsYUFBSyxJQUFJN0ksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxDQUFyQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUMzQmhDLGVBQUssQ0FBQ3FLLElBQU4sQ0FBV1MsS0FBWCxnQkFBeUJELEtBQXpCLGNBQWtDN0ksQ0FBbEMsdUNBQW9FNkksS0FBcEUsY0FBNkU3SSxDQUE3RTtBQUNEO0FBQ0Y7QUFDRiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFBoYXNlciBmcm9tIFwicGhhc2VyXCI7XG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuL3NjZW5lcy9HYW1lU2NlbmVcIjtcbmltcG9ydCBNYWluTWVudVNjZW5lIGZyb20gXCIuL3NjZW5lcy9NYWluTWVudVNjZW5lXCI7XG5pbXBvcnQgUGxheWVyU2V0dXBTY2VuZSBmcm9tIFwiLi9zY2VuZXMvUGxheWVyU2V0dXBTY2VuZVwiO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIHRpdGxlOiAgICBcIkNyYXp5IDggU21hY2tkb3duXCIsXG4gIHZlcnNpb246ICBcIjAuMC4xXCIsXG4gIHdpZHRoOiAgICA4MDAsXG4gIGhlaWdodDogICA2MDAsXG4gIHR5cGU6ICAgICBQaGFzZXIuQVVUTyxcbiAgcGFyZW50OiAgIFwiZ2FtZVwiLFxuICBpbnB1dDoge1xuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIG1vdXNlOiAgICB0cnVlLFxuICAgIHRvdWNoOiAgICB0cnVlLFxuICAgIGdhbWVwYWQ6ICBmYWxzZSxcbiAgfSxcbiAgcmVuZGVyOiB7XG4gICAgcGl4ZWxBcnQ6ICAgdHJ1ZSxcbiAgICBhbnRpYWxpYXM6ICB0cnVlLFxuICB9LFxuICBiYWNrZ3JvdW5kQ29sb3I6IFwiMHhGNUY1RjVcIixcbiAgc2NlbmU6IFsgTWFpbk1lbnVTY2VuZSwgUGxheWVyU2V0dXBTY2VuZSwgR2FtZVNjZW5lIF0sXG59O1xuXG5uZXcgUGhhc2VyLkdhbWUoY29uZmlnKTtcbiIsImltcG9ydCBQaGFzZXIgZnJvbSAncGhhc2VyJztcblxuLyoqXG4gKiBAY2xhc3MgLSBDYXJkIGNsYXNzIHRvIHN0b3JlIHN1aXQvdmFsdWUgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQgZXh0ZW5kcyBQaGFzZXIuR2FtZU9iamVjdHMuU3ByaXRlIHtcblxuICBjb25zdHJ1Y3RvcihzY2VuZSwgeCwgeSwgc3VpdCwgdmFsdWUsIG5hbWUsIGNhcmRCYWNrKSB7XG4gICAgc3VwZXIoc2NlbmUsIHgsIHkpO1xuXG4gICAgdGhpcy5zdWl0ID0gc3VpdDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNhcmRCYWNrID0gY2FyZEJhY2s7XG5cbiAgICB0aGlzLnNldE9yaWdpbigwLjUpO1xuICAgIHRoaXMuZmFjZUNhcmREb3duKCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCB0aGUgY2FyZCBiYWNrIHRleHR1cmUgdG8gZmFjZSBjYXJkIGRvd24uXG4gICAqL1xuICBmYWNlQ2FyZERvd24oKSB7XG4gICAgdGhpcy5zZXRUZXh0dXJlKGBiYWNrXyR7dGhpcy5jYXJkQmFja31gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSBjb3JyZXNwb25kaW5nIHRleHR1cmUgZm9yIHRoaXMgY2FyZC5cbiAgICovXG4gICBmYWNlQ2FyZFVwKCkge1xuICAgICB0aGlzLnNldFRleHR1cmUoYCR7dGhpcy5zdWl0fV8ke3RoaXMudmFsdWV9YCk7XG4gICB9XG59XG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gXCJwaGFzZXJcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuL0NhcmRcIjtcblxuLyoqXG4gKiBAY2xhc3MgLSBEZWNrIGNsYXNzIHRvIG1hbmFnZSB0aGUgZGVjayBvZiBjYXJkcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVjayBleHRlbmRzIFBoYXNlci5HYW1lT2JqZWN0cy5Hcm91cCB7XG5cbiAgY29uc3RydWN0b3Ioc2NlbmUpIHtcbiAgICBzdXBlcihzY2VuZSk7XG4gICAgLy8gVGhpcyBpcyB3aGVyZSBjYXJkcyB3aWxsIGJlIGRyYXduIGZyb20uXG4gICAgdGhpcy5kcmF3UGlsZSA9IFtdO1xuICAgIC8vIFRoaXMgaXMgd2hlcmUgY2FyZHMgd2lsbCBwbGF5ZWQgaW50by5cbiAgICB0aGlzLnBsYXlQaWxlID0gW107XG4gICAgLy8gR2VuZXJhdGUgdGhlIGRlY2ssIGJhYnkuXG4gICAgdGhpcy5nZW5lcmF0ZURlY2soc2NlbmUpO1xuXG4gICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLmRyYXdQaWxlKSB7XG4gICAgICAvLyBBZGQgY2FyZCB0byBncm91cCBvYmplY3QuXG4gICAgICB0aGlzLmFkZChjYXJkLCB0cnVlKTtcbiAgICAgIC8vIFNldCB0aGUgb3ZlcmFsbCBzY2FsZSBvZiB0aGUgY2FyZCB0byBiZSAyNSUgc21hbGxlci5cbiAgICAgIGNhcmQuc2NhbGUgPSAwLjc1O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhbmQgcmFuZG9tbHkgc2h1ZmZsZSBkcmF3IERlY2suXG4gICAqXG4gICAqIEBwYXJhbSB7UGhhc2VyLlNjZW5lfSBzY2VuZSAtIFRoZSBwaGFzZXIgc2NlbmUgb2JqZWN0LlxuICAgKlxuICAgKi9cbiAgZ2VuZXJhdGVEZWNrKHNjZW5lKSB7XG4gICAgY29uc3QgdmFsdWVzID0gWyBcImFcIiwgXCIyXCIsIFwiM1wiLCBcIjRcIiwgXCI1XCIsIFwiNlwiLCBcIjdcIiwgXCI4XCIsIFwiOVwiLCBcIjEwXCIsIFwialwiLCBcImtcIiwgXCJxXCIgXTtcbiAgICBjb25zdCBzdWl0cyA9IFsgXCJoZWFydHNcIiwgXCJkaWFtb25kc1wiLCBcInNwYWRlc1wiLCBcImNsdWJzXCIgXTtcbiAgICBjb25zdCBiYWNrQ29sb3JzID0gWyBcImJsdWVcIiwgXCJncmVlblwiLCBcInJlZFwiIF07XG5cbiAgICBsZXQgZGVjayA9IFtdO1xuICAgIGxldCBiYWNrQ29sb3IgPSBQaGFzZXIuTWF0aC5STkQucGljayhiYWNrQ29sb3JzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCB2YWx1ZXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIGRlY2sucHVzaChuZXcgQ2FyZChzY2VuZSwgKDEyNSArIGkpLCAoMTI1ICsgaSksIHN1aXRzW2ldLCB2YWx1ZXNbaWldLCBgJHt2YWx1ZXNbaWldfSBvZiAke3N1aXRzW2ldfWAsIGJhY2tDb2xvcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZHJhd1BpbGUgPSBQaGFzZXIuVXRpbHMuQXJyYXkuU2h1ZmZsZShkZWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5leHQgY2FyZCBvZiB0aGUgZHJhdyBwaWxlIChpbmRleCAwIGlzIGNvbnNpZGVyZWQgdGhlIHRvcCkuXG4gICAqXG4gICAqIEByZXR1cm4ge0NhcmR9IFRoZSBsYXN0IGNhcmQgaW4gZGVjayBvZiBjYXJkcy5cbiAgICovXG4gIGdldE5leHREcmF3Q2FyZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYXdQaWxlWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgdG9wIGNhcmQgb2YgdGhlIHBsYXkgcGlsZSAoaW5kZXggMCBpcyBjb25zaWRlcmVkIHRoZSB0b3ApLlxuICAgKlxuICAgKiBAcmV0dXJuIHtDYXJkfSBUaGUgbGFzdCBjYXJkIGluIGRlY2sgb2YgY2FyZHMuXG4gICAqL1xuICBnZXRMYXN0UGxheUNhcmQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wbGF5UGlsZVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYXJyYXkgb2YgY2FyZChzKSB0byB0aGUgZGVjay5cbiAgICpcbiAgICogQHBhcmFtIHtDYXJkW119IGNhcmRzIC0gVGhlIGFycmF5IG9mIGNhcmRzIHRvIGFkZCB0byB0aGUgZGVjay5cbiAgICovXG4gIGFkZENhcmRzVG9EZWNrKGNhcmRzKSB7XG4gICAgdGhpcy5kcmF3UGlsZSA9ICh0aGlzLmRyYXdQaWxlLCBjYXJkcyk7XG4gIH1cblxuICAvKipcbiAgICogU2h1ZmZsZSB0aGUgcGxheSBwaWxlLCBwYXNzIHRoYXQgYmFjayB0byB0aGUgZHJhdyBwaWxlIGFuZCBjbGVhciBwbGF5UGlsZS5cbiAgICovXG4gIHNodWZmbGVEZWNrKCkge1xuICAgIGNvbnNvbGUubG9nKFwiKioqIFNodWZmbGluZyB0aGUgZGVjayAqKipcIik7XG4gICAgdGhpcy5kcmF3UGlsZSA9IFBoYXNlci5VdGlscy5BcnJheS5TaHVmZmxlKHRoaXMucGxheVBpbGUpO1xuICAgIHRoaXMuZHJhd1BpbGUuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgY2FyZC5mYWNlQ2FyZERvd24oKTtcbiAgICB9KTtcbiAgICB0aGlzLnBsYXlQaWxlID0gW107XG4gIH1cbn1cbiIsImltcG9ydCBQaGFzZXIgZnJvbSAncGhhc2VyJztcblxuLyoqXG4gKiBAY2xhc3MgLSBQbGF5ZXIgY2xhc3MgdG8gbWFuYWdlIHBsYXllcidzIGhhbmQgYW5kIGNvdW50ZG93biBzY29yZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgUGhhc2VyLkdhbWVPYmplY3RzLlNwcml0ZSB7XG5cbiAgY29uc3RydWN0b3Ioc2NlbmUsIHgsIHksIG5hbWUsIGNvbG9yKSB7XG4gICAgc3VwZXIoc2NlbmUsIHgsIHkpO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5jb3VudGRvd24gPSA4O1xuICAgIHRoaXMuaGFuZCA9IFtdO1xuXG4gICAgdGhpcy5uYW1lVGV4dCA9IHNjZW5lLmFkZC50ZXh0KHgsIHkgKyA1MCwgbmFtZSk7XG4gICAgdGhpcy5uYW1lVGV4dC5zZXRPcmlnaW4oMC41KTtcblxuICAgIHRoaXMuc2V0VGV4dHVyZShgcGxheWVyXyR7dGhpcy5jb2xvcn1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjYXJkIGZyb20gdGhlIHBsYXllcidzIGhhbmQsIHBsYWNlIGl0IGluIHBsYXkgcGlsZS5cbiAgICpcbiAgICogQHBhcmFtIHtDYXJkfSBjYXJkcyAtIFRoZSBjYXJkIHRvIGJlIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7RGVja30gZGVjayAtIFRoZSBkZWNrIHdoaWNoIGNvbnRhaW5zIHRoZSBwbGF5IHBpbGUgdG8gYWRkIHRvLlxuICAgKlxuICAgKiBAcmV0dXJuIHtDYXJkfSAtIFRoZSBsYXN0IGNhcmQgYWRkZWQgdG8gcGxheVBpbGUuXG4gICAqL1xuICByZW1vdmVDYXJkRnJvbUhhbmQoY2FyZCwgZGVjaykge1xuICAgIGxldCBjYXJkVG9SZW1vdmUgPSB0aGlzLmhhbmQuc3BsaWNlKHRoaXMuaGFuZC5pbmRleE9mKGNhcmQpLCAxKTtcbiAgICBkZWNrLnBsYXlQaWxlLnVuc2hpZnQoY2FyZFRvUmVtb3ZlWzBdKTtcbiAgICBjb25zb2xlLmxvZyhgWyR7dGhpcy5uYW1lfV0gJHtjYXJkVG9SZW1vdmVbMF0ubmFtZX0gd2FzIHBsYXllZCFgKTtcblxuICAgIHJldHVybiBkZWNrLmdldExhc3RQbGF5Q2FyZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBtdWx0aXBsZSBjYXJkcyBmcm9tIHRoZSBwbGF5ZXIncyBoYW5kLCBwbGFjZSBpdCBpbiBwbGF5IHBpbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2FyZFtdfSBjYXJkcyAtIFRoZSBjYXJkcyB0byBiZSByZW1vdmVkLlxuICAgKiBAcGFyYW0ge0RlY2t9IGRlY2sgLSBUaGUgZGVjayB3aGljaCBjb250YWlucyB0aGUgcGxheSBwaWxlIHRvIGFkZCB0by5cbiAgICpcbiAgICogQHJldHVybiB7Q2FyZH0gLSBUaGUgbGFzdCBjYXJkIGFkZGVkIHRvIHBsYXlQaWxlLlxuICAgKi9cbiAgcmVtb3ZlQ2FyZHNGcm9tSGFuZChjYXJkcywgZGVjaykge1xuICAgIGZvciAobGV0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICAgIGxldCBjYXJkVG9SZW1vdmUgPSB0aGlzLmhhbmQuc3BsaWNlKHRoaXMuaGFuZC5pbmRleE9mKGNhcmQpLCAxKTtcbiAgICAgIGRlY2sucGxheVBpbGUudW5zaGlmdChjYXJkVG9SZW1vdmVbMF0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhgWyR7dGhpcy5uYW1lfV0gJHtjYXJkVG9SZW1vdmVbMF0ubmFtZX0gd2FzIHBsYXllZCFgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVjay5nZXRMYXN0UGxheUNhcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBjYXJkIHRvIHRoZSBwbGF5ZXIncyBoYW5kLlxuICAgKlxuICAgKiBAcGFyYW0ge0NhcmR9IGNhcmQgLSBUaGUgY2FyZCB0byBiZSBhZGRlZCB0byB0aGUgcGxheWVyJ3MgaGFuZC5cbiAgICovXG4gIGFkZENhcmRUb0hhbmQoY2FyZCkge1xuICAgIHRoaXMuaGFuZC5wdXNoKGNhcmQpO1xuICB9XG59XG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQgRGVjayBmcm9tIFwiLi4vb2JqZWN0cy9EZWNrLmpzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9vYmplY3RzL1BsYXllci5qc1wiO1xuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4uL3V0aWxpdGllcy9QcmVsb2FkLmpzXCI7XG5cbi8qKlxuICogQGNsYXNzIC0gR2FtZSBzY2VuZSB3aGljaCBjb250YWlucyB0aGUgY29yZSBnYW1lIGxvb3AuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAga2V5OiAnR2FtZVNjZW5lJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNpY2FsbHkgbmVlZCB0byBsb2FkIGFueSBhc3NldHMgaGVyZS5cbiAgICpcbiAgICogQHNlZSBQcmVsb2FkLmpzIGZvciBwcmVsb2FkIGZ1bmN0aW9ucy5cbiAgICovXG4gIHByZWxvYWQoKSB7XG4gICAgUHJlbG9hZC5sb2FkQ2FyZHModGhpcyk7XG4gICAgUHJlbG9hZC5sb2FkUGxheWVycyh0aGlzKTtcbiAgICBQcmVsb2FkLmxvYWRTb3VuZHModGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgdGhlIGRlY2ssIHNldHVwIHBsYXllcnMgYW5kIGluaXRpYWxpemUgdGhlIGdhbWUuXG4gICAqL1xuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMucGxheWVyVHVybiA9IDM7XG4gICAgdGhpcy5jaGVja0hhbmRGb3JQbGF5YWJsZUNhcmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuZGVjayA9IG5ldyBEZWNrKHRoaXMpO1xuXG4gICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgdGhpcy5wbGF5ZXJzLnB1c2gobmV3IFBsYXllcih0aGlzLCAodGhpcy5zeXMuZ2FtZS5jb25maWcud2lkdGggLSAxMDApLCAxMDAsIFwiamFycmVkXCIsIFwiZ3JlZW5cIikpO1xuICAgIHRoaXMucGxheWVycy5wdXNoKG5ldyBQbGF5ZXIodGhpcywgKHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoIC0gMTAwKSwgMjAwLCBcIndpbGxiZXJ0XCIsIFwiYmx1ZVwiKSk7XG4gICAgdGhpcy5wbGF5ZXJzLnB1c2gobmV3IFBsYXllcih0aGlzLCAodGhpcy5zeXMuZ2FtZS5jb25maWcud2lkdGggLSAxMDApLCAzMDAsIFwiZnJhbmtcIiwgXCJwdXJwbGVcIikpO1xuICAgIHRoaXMucGxheWVycy5wdXNoKG5ldyBQbGF5ZXIodGhpcywgMTAwLCA1MDAsIFwiYnJhbmRvblwiLCBcInllbGxvd1wiKSk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVHYW1lKCk7XG4gICAgdGhpcy5idWlsZFdpbGRDYXJkRGlhbG9nKCk7XG4gICAgdGhpcy5hZGRSZXN0YXJ0QnV0dG9uKCk7XG4gIH1cblxuICAvKipcbiAgICogR2FtZSBsb2dpYyB3aWxsIGdvIGluIGhlcmUuXG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGdhbWUgaXMgb3Zlci5cbiAgICB0aGlzLmNoZWNrR2FtZU92ZXIoKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBsYXN0IGNhcmQgaGFzIGNoYW5nZWQuXG4gICAgaWYgKHRoaXMuY2hlY2tMYXN0UGxheUNhcmRDaGFuZ2UoKSkge1xuXG4gICAgICAvLyBBIHR1cm4gaGFzIGJlZW4gbWFkZSwgbGV0J3MgbWFrZSBzdXJlIHRvIG1ha2UgYWxsIHRoZSBwbGF5ZXIncyBjYXJkc1xuICAgICAgLy8gbm9uLWludGVyYWN0aXZlLlxuICAgICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLnBsYXllcnNbdGhpcy5wbGF5ZXJUdXJuXS5oYW5kKSB7XG4gICAgICAgIGNhcmQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGZvciB3aWxkY2FyZC5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRDYXJkSW5QbGF5LnZhbHVlID09IHRoaXMucGxheWVyc1t0aGlzLnBsYXllclR1cm5dLmNvdW50ZG93bikge1xuICAgICAgICB0aGlzLndpbGRDYXJkRGlhbG9nQ29udGFpbmVyLnZpc2libGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIHRoZSBwbGF5ZXIgaGFuZCBmb3IgcGxheWFibGUgY2FyZHMuXG4gICAgaWYgKHRoaXMuY2hlY2tIYW5kRm9yUGxheWFibGVDYXJkcykge1xuICAgICAgZm9yIChsZXQgY2FyZCBvZiB0aGlzLnBsYXllcnNbdGhpcy5wbGF5ZXJUdXJuXS5oYW5kKSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2FyZEluUGxheSA9IHRoaXMuZGVjay5nZXRMYXN0UGxheUNhcmQoKTtcblxuICAgICAgICBpZiAoY2FyZC52YWx1ZSA9PSBjdXJyZW50Q2FyZEluUGxheS52YWx1ZSB8fCBjYXJkLnN1aXQgPT0gdGhpcy5jdXJyZW50U3VpdEluUGxheSB8fCBjYXJkLnZhbHVlID09IHRoaXMucGxheWVyc1t0aGlzLnBsYXllclR1cm5dLmNvdW50ZG93bikge1xuICAgICAgICAgIHRoaXMubWFrZUNhcmRQbGF5YWJsZShjYXJkLCB0aGlzLnBsYXllcnNbdGhpcy5wbGF5ZXJUdXJuXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEZsYWcgdGhhdCB0aGUgaGFuZCBoYXMgYmVlbiBjaGVja2VkLlxuICAgICAgdGhpcy5jaGVja0hhbmRGb3JQbGF5YWJsZUNhcmRzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERvIGFueSBnYW1lIGluaXQgd2l0aGluIHRoaXMgZnVuY3Rpb24uXG4gICAqL1xuICBpbml0aWFsaXplR2FtZSgpIHtcbiAgICAvLyBBZGQgcGxheWVycyB0byBzY3JlZW4uXG4gICAgZm9yIChsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycykge1xuICAgICAgdGhpcy5hZGQuZXhpc3RpbmcocGxheWVyKTtcbiAgICB9XG5cbiAgICAvLyBEZWFsIG91dCBjYXJkcyB0byB0aGUgcGxheWVycy5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDc7IGkrKykge1xuICAgICAgZm9yIChsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycykge1xuXG4gICAgICAgIC8vIERlYWwgdGhlIGNhcmQgdG8gcGxheWVyLlxuICAgICAgICB0aGlzLmRlYWxDYXJkc1RvUGxheWVyKHBsYXllcik7XG5cbiAgICAgICAgLy8gWFhYOiBHb3R0YSBtb3ZlIHRoaXMgaW50byBzb21ldGhpbmcgbW9yZSBkeW5hbWljLi4uIHdpbGwgZG8gZm9yIG5vdy5cbiAgICAgICAgLy8gVHdlZW4gdGhlIGNhcmQgZ2FtZSBvYmplY3QgYW5kIHJldmVhbCB3aGF0IGlzIGluIHRoZSBoYW5kLlxuICAgICAgICBpZiAocGxheWVyLm5hbWUgPT09ICdicmFuZG9uJykge1xuICAgICAgICAgIHRoaXMudHdlZW5zLmFkZCh7XG4gICAgICAgICAgICB0YXJnZXRzOiBwbGF5ZXIuaGFuZFtpXSxcbiAgICAgICAgICAgIHg6ICgyMjUgKyBvZmZzZXQpLFxuICAgICAgICAgICAgeTogNTAwLFxuICAgICAgICAgICAgZWFzZTogJ0xpbmVhcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBwbGF5ZXIuaGFuZFtpXS5mYWNlQ2FyZFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyA1MDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlYWwgb3V0IHRoZSBmaXJzdCBjYXJkIHRvIHRoZSBwbGF5IHBpbGUuXG4gICAgdGhpcy5kZWFsQ2FyZEZyb21EcmF3VG9QbGF5UGlsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiB0aGUgZ2FtZSBpcyBvdmVyIGJ5IGNoZWNraW5nIGVhY2ggcGxheWVyJ3MgY291bnRkb3duIHNjb3JlLCAwXG4gICAqIGlzIGNvbnNpZGVyZWQgZ2FtZSBvdmVyLlxuICAgKi9cbiAgY2hlY2tHYW1lT3ZlcigpIHtcbiAgICBmb3IgKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzKSB7XG5cbiAgICAgIC8vIElmIHRoZSBjb3VudGRvd24gaXMgYXQgMCwgdGhhdCdzIGl0Li4uIEdBTUUgT1ZFUiFcbiAgICAgIGlmIChwbGF5ZXIuY291bnRkb3duID09PSAwKSB7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtwbGF5ZXIubmFtZX0gaXMgdGhlIHdpbm5lciFgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVhbCBhIGNhcmQgdG8gdGhlIFBsYXllciwgdHdlZW4gdGhlIGNhcmQgdG8gdGhlIHBsYXllcidzIGhhbmQuXG4gICAqXG4gICAqIEBwYXJhbSB7UGxheWVyfSBwbGF5ZXIgLSBUaGUgcGxheWVyIHdlIGFyZSBkZWFsaW5nIHRvLlxuICAgKiBAcGFyYW0ge051bWJlcn0gbnVtYmVyT2ZDYXJkcyAtIFRoZSBudW1iZXIgb2YgY2FyZHMgdG8gZGVhbCB0byB0aGUgcGxheWVyLlxuICAgKi9cbiAgZGVhbENhcmRzVG9QbGF5ZXIocGxheWVyLCBudW1iZXJPZkNhcmRzID0gMSkge1xuICAgIC8vIFdlIHdhbnQgdG8ga2VlcCB0cmFjayBvZiBob3cgbWFueSBjYXJkcyBhcmUgbGVmdCB0byBkZWFsIGlmIHRoZSBkZWNrXG4gICAgLy8gbmVlZHMgdG8gYmUgc2h1ZmZsZWQuXG4gICAgZm9yIChsZXQgY2FyZHNMZWZ0VG9EZWFsID0gbnVtYmVyT2ZDYXJkczsgY2FyZHNMZWZ0VG9EZWFsID49IDE7IGNhcmRzTGVmdFRvRGVhbC0tKSB7XG4gICAgICBsZXQgY2FyZFRvRGVhbCA9IHRoaXMuZGVjay5kcmF3UGlsZS5zaGlmdCgpO1xuXG4gICAgICBpZiAoY2FyZFRvRGVhbCkge1xuICAgICAgICAvLyBEZWFsIHRoZSBjYXJkIHRvIHBsYXllci5cbiAgICAgICAgcGxheWVyLmFkZENhcmRUb0hhbmQoY2FyZFRvRGVhbCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gTm8gY2FyZHMgbGVmdCB0byBkcmF3LCBzaHVmZmxlIGFuZCB0cnkgYWdhaW4uXG4gICAgICAgIHRoaXMuZGVjay5zaHVmZmxlRGVjaygpO1xuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBlbm91Z2ggY2FyZHMgbGVmdCB0byBkZWFsLCBkZWFsIGVtJy5cbiAgICAgICAgaWYgKHRoaXMuZGVjay5kcmF3UGlsZS5sZW5ndGggPj0gY2FyZHNMZWZ0VG9EZWFsKSB7XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHRvIG9ubHkgZGVhbCB0aGUgcmVtYWluZGVyIChpZiB0aGVyZSBpcyBlbm91Z2gpLlxuICAgICAgICAgIHRoaXMuZGVhbENhcmRzVG9QbGF5ZXIocGxheWVyLCBjYXJkc0xlZnRUb0RlYWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gbW9yZSBjYXJkcyBsZWZ0IHRvIGRlYWwhXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlYWwgYSBjYXJkIGZyb20gdGhlIGRyYXcgZGVjayB0byB0aGUgcGxheSBwaWxlLlxuICAgKi9cbiAgZGVhbENhcmRGcm9tRHJhd1RvUGxheVBpbGUoKSB7XG4gICAgLy8gU2hpZnQgb3V0IGEgY2FyZCBmcm9tIHRoZSBkcmF3IHBpbGUuXG4gICAgbGV0IGNhcmRUb0RlYWwgPSB0aGlzLmRlY2suZHJhd1BpbGUuc2hpZnQoKTtcblxuICAgIC8vIFBsYWNlIGNhcmQgb24gdGhlIHRvcCBvZiB0aGUgcGxheSBwaWxlLlxuICAgIHRoaXMuZGVjay5wbGF5UGlsZS51bnNoaWZ0KGNhcmRUb0RlYWwpO1xuXG4gICAgLy8gU2V0IHRoZSBmaXJzdCBjYXJkIGluIHBsYXkgcGlsZSBhcyB0aGUgbGFzdCBjYXJkIHBsYXllZC5cbiAgICB0aGlzLmN1cnJlbnRDYXJkSW5QbGF5ID0gY2FyZFRvRGVhbDtcblxuICAgIC8vIFNldCB0aGUgc3VpdCBpbiBwbGF5IHBpbGUgYXMgdGhlIGxhc3QgY2FyZCdzIHN1aXQuXG4gICAgdGhpcy5jdXJyZW50U3VpdEluUGxheSA9IGNhcmRUb0RlYWwuc3VpdDtcblxuICAgIC8vIE1vdmUgdGhlIGNhcmQgdG8gdGhlIHBsYXlQaWxlIHpvbmUuXG4gICAgdGhpcy50d2VlbnMuYWRkKHtcbiAgICAgIHRhcmdldHM6IGNhcmRUb0RlYWwsXG4gICAgICB4OiAnKz0xMjUnLFxuICAgICAgZWFzZTogJ0xpbmVhcicsXG4gICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBjYXJkVG9EZWFsLmZhY2VDYXJkVXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIGxhc3QgY2FyZCBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gLSBUcnVlIGlmIHRoZSBjYXJkIGhhcyBjaGFuZ2VkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBjaGVja0xhc3RQbGF5Q2FyZENoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50Q2FyZEluUGxheS5uYW1lICE9IHRoaXMuZGVjay5nZXRMYXN0UGxheUNhcmQoKS5uYW1lKSB7XG4gICAgICB0aGlzLmN1cnJlbnRDYXJkSW5QbGF5ID0gdGhpcy5kZWNrLmdldExhc3RQbGF5Q2FyZCgpO1xuICAgICAgdGhpcy5jdXJyZW50U3VpdEluUGxheSA9IHRoaXMuZGVjay5nZXRMYXN0UGxheUNhcmQoKS5zdWl0O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhIGNhcmQgcGxheWFibGUgYnkgYWRkaW5nIGNsaWNrL2hvdmVyIGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtDYXJkfSBjYXJkIC0gVGhlIGNhcmQgdG8gbWFrZSBwbGF5YWJsZS5cbiAgICovXG4gIG1ha2VDYXJkUGxheWFibGUoY2FyZCwgcGxheWVyKSB7XG4gICAgY2FyZC5zZXRJbnRlcmFjdGl2ZSgpO1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgc2VuZCB0aGUgY2FyZCB0byB0aGUgcGxheSBwaWxlIGFuZCBkbyBvdGhlciBzdHVmZi5cbiAgICBjYXJkLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcbiAgICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxpc3RlbmVycy5cbiAgICAgIGNhcmQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aW50LlxuICAgICAgY2FyZC5jbGVhclRpbnQoKTtcblxuICAgICAgLy8gU2V0IHRoZSBkZXB0aCBvZiBhbGwgcGxheVBpbGUgY2FyZHMgdG8gMC5cbiAgICAgIGZvciAobGV0IHBsYXlDYXJkIG9mIHRoaXMuZGVjay5wbGF5UGlsZSkge1xuICAgICAgICBwbGF5Q2FyZC5zZXREZXB0aCgwKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSBkZXB0aCBvZiB0aGUgY2FyZCB0byBwbGF5ZWQgdG8gMS5cbiAgICAgIGNhcmQuc2V0RGVwdGgoMSk7XG5cbiAgICAgIC8vIE1vdmUgdGhlIGNhcmQgdG8gdGhlIHBsYXkgcGlsZS5cbiAgICAgIHRoaXMudHdlZW5zLmFkZCh7XG4gICAgICAgIHRhcmdldHM6IGNhcmQsXG4gICAgICAgIHg6IDI1MCxcbiAgICAgICAgeTogMTI1LFxuICAgICAgICBlYXNlOiAnTGluZWFyJyxcbiAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIGNhcmQgZnJvbSBoYW5kLCBtb3ZlIGludG8gdGhlIHBsYXkgcGlsZS5cbiAgICAgIHBsYXllci5yZW1vdmVDYXJkRnJvbUhhbmQoY2FyZCwgdGhpcy5kZWNrKTtcbiAgICB9KTtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgaG92ZXJzIHRoZSBjdXJzb3Igb3ZlciB0aGUgY2FyZCwgc2V0IGEgdGludCBhbmQgcmFpc2UgeS5cbiAgICBjYXJkLm9uKCdwb2ludGVyb3ZlcicsICgpID0+IHtcbiAgICAgIC8vIFNldCBhIHRpbnQgdG8gc2hvdyBjYXJkIGlzIHBsYXlhYmxlLlxuICAgICAgY2FyZC5zZXRUaW50KDB4ZTNlM2UzKTtcblxuICAgICAgLy8gTW92ZSBjYXJkIHVwIHNsaWdodGx5LlxuICAgICAgdGhpcy50d2VlbnMuYWRkKHtcbiAgICAgICAgdGFyZ2V0czogY2FyZCxcbiAgICAgICAgeTogNDUwLFxuICAgICAgICBlYXNlOiAnTGluZWFyJyxcbiAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlcidzIGN1cnNvciBsZWF2ZXMgdGhlIGNhcmQsIHJlbW92ZSB0aGUgdGludCBhbmQgbG93ZXIgeS5cbiAgICBjYXJkLm9uKCdwb2ludGVyb3V0JywgKCkgPT4ge1xuICAgICAgLy8gUmVtb3ZlIHRpbnQuXG4gICAgICBjYXJkLmNsZWFyVGludCgpO1xuXG4gICAgICAvLyBNb3ZlIHRoZSBjYXJkIGJhY2sgaW50byBoYW5kLlxuICAgICAgdGhpcy50d2VlbnMuYWRkKHtcbiAgICAgICAgdGFyZ2V0czogY2FyZCxcbiAgICAgICAgeTogNTAwLFxuICAgICAgICBlYXNlOiAnTGluZWFyJyxcbiAgICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSB3aWxkY2FyZCBkaWFsb2cgYm94LlxuICAgKi9cbiAgYnVpbGRXaWxkQ2FyZERpYWxvZygpIHtcbiAgICAvLyBpbml0aWFsaXplIGNvbnRhaW5lciBvYmplY3QgdG8gaG9sZCBhbGwgdGhlIGRpYWxvZ3VlIHRleHQuXG4gICAgdGhpcy53aWxkQ2FyZERpYWxvZ0NvbnRhaW5lciA9IHRoaXMuYWRkLmNvbnRhaW5lcigwLCAwKTtcbiAgICB0aGlzLndpbGRDYXJkRGlhbG9nQ29udGFpbmVyLnZpc2libGUgPSBmYWxzZTtcblxuICAgIC8vIEFkZCBhIGJhY2tncm91bmQgZm9yIHRoZSBtZXNzYWdlIGJveC5cbiAgICBsZXQgd2lsZENhcmREaWFsb2dCYWNrZ3JvdW5kID0gdGhpcy5hZGQuZ3JhcGhpY3MoKTtcbiAgICB3aWxkQ2FyZERpYWxvZ0JhY2tncm91bmQuZmlsbFN0eWxlKDB4YmRiZGJkLCAwLjgpO1xuICAgIHdpbGRDYXJkRGlhbG9nQmFja2dyb3VuZC5maWxsUm91bmRlZFJlY3QoMjAwLCAyNTAsIDQwMCwgMTUwLCA0KTtcblxuICAgIHRoaXMud2lsZENhcmREaWFsb2dDb250YWluZXIuYWRkKHdpbGRDYXJkRGlhbG9nQmFja2dyb3VuZCk7XG5cbiAgICAvLyBTaG93IG1lc3NhZ2UgdGV4dCBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4gICAgbGV0IHdpbGRDYXJkVGV4dCA9IHRoaXMuYWRkLnRleHQoKHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoIC8gMiksICh0aGlzLnN5cy5nYW1lLmNvbmZpZy5oZWlnaHQgLyAyKSAtIDIwLCAnV2lsZCBjYXJkIHBsYXllZCwgY2hvb3NlIGEgbmV3IHN1aXQ6Jyk7XG4gICAgd2lsZENhcmRUZXh0LnNldE9yaWdpbigwLjUpO1xuXG4gICAgdGhpcy53aWxkQ2FyZERpYWxvZ0NvbnRhaW5lci5hZGQod2lsZENhcmRUZXh0KTtcblxuICAgIGNvbnN0IHN1aXRzID0gWyBcImhlYXJ0c1wiLCBcImRpYW1vbmRzXCIsIFwic3BhZGVzXCIsIFwiY2x1YnNcIiBdO1xuICAgIGxldCBvZmZzZXQgPSAxMDtcblxuICAgIGZvciAobGV0IHN1aXQgb2Ygc3VpdHMpIHtcbiAgICAgIGxldCB3aWxkQ2FyZE9wdGlvbiA9IHRoaXMuYWRkLnRleHQodGhpcy5zeXMuZ2FtZS5jb25maWcud2lkdGggLyAyLCAodGhpcy5zeXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMikgKyBvZmZzZXQsIHN1aXQpO1xuICAgICAgd2lsZENhcmRPcHRpb24uc2V0T3JpZ2luKDAuNSk7XG4gICAgICB3aWxkQ2FyZE9wdGlvbi5zZXRJbnRlcmFjdGl2ZSgpO1xuXG4gICAgICB3aWxkQ2FyZE9wdGlvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudFN1aXRJblBsYXkgPSBzdWl0O1xuICAgICAgICB0aGlzLmNoZWNrSGFuZEZvclBsYXlhYmxlQ2FyZHMgPSB0cnVlO1xuICAgICAgICB0aGlzLndpbGRDYXJkRGlhbG9nQ29udGFpbmVyLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICB3aWxkQ2FyZE9wdGlvbi5vbigncG9pbnRlcm92ZXInLCAoKSA9PiB7XG4gICAgICAgIHdpbGRDYXJkT3B0aW9uLnNldFRpbnQoMHhlM2UzZTMpO1xuICAgICAgfSk7XG5cbiAgICAgIHdpbGRDYXJkT3B0aW9uLm9uKCdwb2ludGVyb3V0JywgKCkgPT4ge1xuICAgICAgICB3aWxkQ2FyZE9wdGlvbi5jbGVhclRpbnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLndpbGRDYXJkRGlhbG9nQ29udGFpbmVyLmFkZCh3aWxkQ2FyZE9wdGlvbik7XG5cbiAgICAgIG9mZnNldCArPSAyMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgcmVzdGFydCBidXR0b24gdG8gdGhlIHNjZW5lLCB1c2VkIGZvciBkZWJ1Z2dpbmcuXG4gICAqL1xuICBhZGRSZXN0YXJ0QnV0dG9uKCkge1xuICAgIGxldCByZXN0YXJ0QnV0dG9uID0gdGhpcy5hZGQudGV4dCg3MDAsIDUyNSwgJ1Jlc3RhcnQnKTtcbiAgICByZXN0YXJ0QnV0dG9uLnNldE9yaWdpbigwLjUpO1xuICAgIHJlc3RhcnRCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcblxuICAgIHJlc3RhcnRCdXR0b24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5zY2VuZS5yZXN0YXJ0KCk7XG4gICAgfSk7XG5cbiAgICByZXN0YXJ0QnV0dG9uLm9uKCdwb2ludGVyb3ZlcicsICgpID0+IHtcbiAgICAgIHJlc3RhcnRCdXR0b24uc2V0VGludCgweDYzNTZjNyk7XG4gICAgfSk7XG5cbiAgICByZXN0YXJ0QnV0dG9uLm9uKCdwb2ludGVyb3V0JywgKCkgPT4ge1xuICAgICAgcmVzdGFydEJ1dHRvbi5jbGVhclRpbnQoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBoYXNlciBmcm9tICdwaGFzZXInO1xuaW1wb3J0IEZvbnRMb2FkZXIgZnJvbSAnLi4vdXRpbGl0aWVzL0ZvbnRMb2FkZXInO1xuXG4vKipcbiAqIEBjbGFzcyAtIEl0J3MgZGEgbWFpbiBtZW51IHNjZW5lIVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBrZXk6ICdNYWluTWVudVNjZW5lJyxcbiAgICB9KTtcbiAgfVxuXG4gIHByZWxvYWQoKSB7XG5cbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBDdXJyZW50bHkgZG9lcyBqYWNrIHNoaXQuLi5cbiAgICBGb250TG9hZGVyLmxvYWRXZWJGb250T3BlblNhbnMoKTtcblxuICAgIHRoaXMuYWRkVGl0bGVUZXh0KClcbiAgICB0aGlzLmFkZFN0YXJ0R2FtZUJ1dHRvbigpO1xuICAgIHRoaXMuYWRkUGxheWVyU2V0dXBCdXR0b24oKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aXRsZSB0ZXh0IHRvIHRoZSBzY2VuZS5cbiAgICovXG4gIGFkZFRpdGxlVGV4dCgpIHtcbiAgICB0aGlzLnRpdGxlVGV4dEJhY2tncm91bmQgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHRoaXMudGl0bGVUZXh0QmFja2dyb3VuZC5maWxsUm91bmRlZFJlY3QoMjAwLCA3NSwgNDAwLCA1MCwgNik7XG4gICAgdGhpcy50aXRsZVRleHRCYWNrZ3JvdW5kLmZpbGxTdHlsZSgweDdGRkZENCwgMC41KTtcblxuICAgIHRoaXMudGl0bGVUZXh0QmFja2dyb3VuZEJvcmRlciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gICAgdGhpcy50aXRsZVRleHRCYWNrZ3JvdW5kQm9yZGVyLmxpbmVTdHlsZSg0LCAweDAwMDAwMCk7XG4gICAgdGhpcy50aXRsZVRleHRCYWNrZ3JvdW5kQm9yZGVyLnN0cm9rZVJvdW5kZWRSZWN0KDIwMCwgNzUsIDQwMCwgNTAsIDYpO1xuXG4gICAgdGhpcy50aXRsZVRleHQgPSB0aGlzLmFkZC50ZXh0KDQwMCwgMTAwLCAnQ3JhenkgOCBTbWFja2Rvd24nLCB7IGZvbnRGYW1pbHk6ICdPcGVuIFNhbnMnLCBmb250U2l6ZTogJzI4cHgnLCBmb250U3R5bGU6ICdib2xkJywgY29sb3I6ICcweDAwMDAwMCcgfSk7XG4gICAgdGhpcy50aXRsZVRleHQuc2V0T3JpZ2luKDAuNSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgc3RhcnQgZ2FtZSBidXR0b24gdGhhdCBzdGFydHMgdGhlIGdhbWUgc2NlbmUgKEdhbWVTY2VuZS5qcykuXG4gICAqL1xuICBhZGRTdGFydEdhbWVCdXR0b24oKSB7XG4gICAgdGhpcy5zdGFydEJ1dHRvbkJhY2tncm91bmQgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHRoaXMuc3RhcnRCdXR0b25CYWNrZ3JvdW5kLmZpbGxSb3VuZGVkUmVjdCgzMDAsIDI4MCwgMjAwLCA0MCwgNik7XG4gICAgdGhpcy5zdGFydEJ1dHRvbkJhY2tncm91bmQuZmlsbFN0eWxlKDB4RkZCMEIwLCAwLjUpO1xuICAgIHRoaXMuc3RhcnRCdXR0b25CYWNrZ3JvdW5kLmNsb3NlUGF0aCgpO1xuXG4gICAgdGhpcy5zdGFydEJ1dHRvbkJhY2tncm91bmRCb3JkZXIgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHRoaXMuc3RhcnRCdXR0b25CYWNrZ3JvdW5kQm9yZGVyLmxpbmVTdHlsZSg0LCAweDAwMDAwMCk7XG4gICAgdGhpcy5zdGFydEJ1dHRvbkJhY2tncm91bmRCb3JkZXIuc3Ryb2tlUm91bmRlZFJlY3QoMzAwLCAyODAsIDIwMCwgNDAsIDYpO1xuXG4gICAgdGhpcy5zdGFydEJ1dHRvbiA9IHRoaXMuYWRkLnRleHQoNDAwLCAzMDAsICdTdGFydCBHYW1lJywgeyBmb250RmFtaWx5OiAnT3BlbiBTYW5zJywgZm9udFNpemU6ICcxOHB4JywgZm9udFN0eWxlOiAnYm9sZCcsIGNvbG9yOiAnMHgwMDAwMDAnIH0pO1xuICAgIHRoaXMuc3RhcnRCdXR0b24uc2V0T3JpZ2luKDAuNSk7XG4gICAgdGhpcy5zdGFydEJ1dHRvbi5zZXRJbnRlcmFjdGl2ZSgpO1xuXG4gICAgdGhpcy5zdGFydEJ1dHRvbi5vbigncG9pbnRlcmRvd24nLCAoKSA9PiB7XG4gICAgICB0aGlzLnNjZW5lLnN0YXJ0KCdHYW1lU2NlbmUnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhcnRCdXR0b24ub24oJ3BvaW50ZXJvdmVyJywgKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydEJ1dHRvbkJhY2tncm91bmQuc2V0QWxwaGEoMC41KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhcnRCdXR0b24ub24oJ3BvaW50ZXJvdXQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0QnV0dG9uQmFja2dyb3VuZC5zZXRBbHBoYSgxKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBwbGF5ZXIgc2V0dXAgYnV0dG9uIHRoYXQgc3RhcnRzIHRoZSBwbGF5ZXIgc2V0dXAgc2NlbmVcbiAgICogKFBsYXllclNldHVwU2NlbmUuanMpLlxuICAgKi9cbiAgYWRkUGxheWVyU2V0dXBCdXR0b24oKSB7XG4gICAgdGhpcy5zZXR1cEJ1dHRvbkJhY2tncm91bmQgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHRoaXMuc2V0dXBCdXR0b25CYWNrZ3JvdW5kLmZpbGxSb3VuZGVkUmVjdCgzMDAsIDM1MCwgMjAwLCA0MCwgNik7XG4gICAgdGhpcy5zZXR1cEJ1dHRvbkJhY2tncm91bmQuZmlsbFN0eWxlKDB4NjM1NmM3LCAwLjUpO1xuXG4gICAgdGhpcy5zZXR1cEJ1dHRvbkJhY2tncm91bmRCb3JkZXIgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgIHRoaXMuc2V0dXBCdXR0b25CYWNrZ3JvdW5kQm9yZGVyLmxpbmVTdHlsZSg0LCAweDAwMDAwMCk7XG4gICAgdGhpcy5zZXR1cEJ1dHRvbkJhY2tncm91bmRCb3JkZXIuc3Ryb2tlUm91bmRlZFJlY3QoMzAwLCAzNTAsIDIwMCwgNDAsIDYpO1xuXG4gICAgdGhpcy5zZXR1cEJ1dHRvbiA9IHRoaXMuYWRkLnRleHQoNDAwLCAzNzAsICdQbGF5ZXIgU2V0dXAnLCB7IGZvbnRGYW1pbHk6ICdPcGVuIFNhbnMnLCBmb250U2l6ZTogJzE4cHgnLCBmb250U3R5bGU6ICdib2xkJywgY29sb3I6ICcweDAwMDAwMCcgfSk7XG4gICAgdGhpcy5zZXR1cEJ1dHRvbi5zZXRPcmlnaW4oMC41KTtcbiAgICB0aGlzLnNldHVwQnV0dG9uLnNldEludGVyYWN0aXZlKCk7XG5cbiAgICB0aGlzLnNldHVwQnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMuc2NlbmUuc3RhcnQoJ1BsYXllclNldHVwU2NlbmUnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dXBCdXR0b24ub24oJ3BvaW50ZXJvdmVyJywgKCkgPT4ge1xuICAgICAgdGhpcy5zZXR1cEJ1dHRvbkJhY2tncm91bmQuc2V0QWxwaGEoMC41KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dXBCdXR0b24ub24oJ3BvaW50ZXJvdXQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0QnV0dG9uQmFja2dyb3VuZC5zZXRBbHBoYSgxKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBoYXNlciBmcm9tICdwaGFzZXInO1xuXG4vKipcbiAqIEBjbGFzcyAtIFBsYXllciBzZXR1cCBzY2VuZSwgd2hlcmUgdGhlIHVzZXIgd2lsbCBlbnRlciBhIHVzZXJuYW1lIGFuZCBkcmF3XG4gKiAgdGhlaXIgYXZhdGFyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJTZXR1cFNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBrZXk6ICdQbGF5ZXJTZXR1cFNjZW5lJyxcbiAgICB9KTtcbiAgfVxuXG4gIHByZWxvYWQoKSB7XG5cbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBJbml0aWFsaXplIHNvbWUgZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICAgIHRoaXMubGFzdERvdCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRTaXplT3B0aW9uID0gNjtcbiAgICB0aGlzLnNlbGVjdGVkQ29sb3JPcHRpb24gPSAnMHgwMDAwMDAnO1xuXG4gICAgLy8gQWRkIGFsbCB0aGUgdGhpbmdzIHRvIHRoZSBzY2VuZS5cbiAgICB0aGlzLmFkZFBhaW50Q2FudmFzKCk7XG4gICAgdGhpcy5hZGRQYWludE9wdGlvbnMoKTtcbiAgICB0aGlzLmFkZENsZWFyQnV0dG9uKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY2FudmFzIGZvciBwbGF5ZXJzIHRvIGNyZWF0ZSB0aGVpciBhdmF0YXIgYW5kIGFkZHMgaXQgdG8gdGhlXG4gICAqIHNjZW5lLlxuICAgKlxuICAgKiBAVE9ETzogVGhpcyBjb3VsZCBkZWZpbml0ZWx5IHN0YW5kIHRvIGJlIG9wdGltaXplZCBhdCBzb21lIHBvaW50LCBhcyBpdFxuICAgKiBjcmVhdGVzIGEgUGhhc2VyLkdyYWhwaWNzIG9iamVjdCBmb3IgZXZlcnkgcG9pbnRlcmRvd24gJiBwb2ludGVybW92ZSBldmVudC5cbiAgICovXG4gIGFkZFBhaW50Q2FudmFzKCkge1xuICAgIC8vIENyZWF0ZSB0aGUgY2FudmFzIGZvciBwbGF5ZXJzIHRvIGRyYXcgb24uXG4gICAgbGV0IGNhbnZhcyA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gICAgY2FudmFzLmxpbmVTdHlsZSg0LCAweDAwMDAwMCk7XG4gICAgY2FudmFzLnN0cm9rZVJvdW5kZWRSZWN0KDIwMCAtIDUsIDEwMCAtIDUsIDQwMCArIDEwLCA0MDAgKyAxMCwgOCk7XG4gICAgY2FudmFzLnNldEludGVyYWN0aXZlKG5ldyBQaGFzZXIuR2VvbS5SZWN0YW5nbGUoMjAwLCAxMDAsIDQwMCwgNDAwKSwgUGhhc2VyLkdlb20uUmVjdGFuZ2xlLkNvbnRhaW5zKTtcblxuICAgIC8vIEFkZCBhIHBvaW50ZXIgZG93biBldmVudCB3aGljaCBkcmF3cyBhIGNpcmNsZSB3aGVyZSB0aGUgY3Vyc29yIGlzLlxuICAgIGNhbnZhcy5vbigncG9pbnRlcmRvd24nLCAocG9pbnRlcikgPT4ge1xuICAgICAgICBsZXQgZG90ID0gdGhpcy5hZGQuZ3JhcGhpY3MoKTtcbiAgICAgICAgZG90LmZpbGxTdHlsZSh0aGlzLnNlbGVjdGVkQ29sb3JPcHRpb24pO1xuICAgICAgICBkb3QuZmlsbENpcmNsZShwb2ludGVyLngsIHBvaW50ZXIueSwgdGhpcy5zZWxlY3RlZFNpemVPcHRpb24pO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gQWRkIGEgcG9pbnRlciBtb3ZlIGV2ZW50IHdoaWNoIGRyYXdzIGEgY2lyY2xlIHdoZXJlIHRoZSBwb2ludGVyIG1vdmVzIHRvXG4gICAgLy8gYW5kIGRyYXdzIGEgbGluZSBiZXR3ZWVuIHRoZSBsYXN0IGtub3duIGRvdCBsb2NhdGlvbiB0byBnaXZlIGEgc21vb3RoZWRcbiAgICAvLyBicnVzaCBzdHJva2UgZWZmZWN0LlxuICAgIGNhbnZhcy5vbigncG9pbnRlcm1vdmUnLCAocG9pbnRlcikgPT4ge1xuICAgICAgaWYgKHBvaW50ZXIuaXNEb3duKSB7XG4gICAgICAgIGxldCBkb3QgPSB0aGlzLmFkZC5ncmFwaGljcygpO1xuICAgICAgICBkb3QuZmlsbFN0eWxlKHRoaXMuc2VsZWN0ZWRDb2xvck9wdGlvbik7XG4gICAgICAgIGRvdC5maWxsQ2lyY2xlKHBvaW50ZXIueCwgcG9pbnRlci55LCB0aGlzLnNlbGVjdGVkU2l6ZU9wdGlvbik7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBrbm93biBsYXN0IGRvdCwgZHJhdyBhIGxpbmUgYmV0d2VlbiB0aGUgY3VycmVudCBkb3QgYW5kXG4gICAgICAgIC8vIHRoZSBsYXN0LlxuICAgICAgICBpZiAodGhpcy5sYXN0RG90KSB7XG4gICAgICAgICAgbGV0IGxpbmVTaGFwZSA9IG5ldyBQaGFzZXIuR2VvbS5MaW5lKHRoaXMubGFzdERvdC54LCB0aGlzLmxhc3REb3QueSwgcG9pbnRlci54LCBwb2ludGVyLnkpO1xuXG4gICAgICAgICAgdGhpcy5saW5lID0gdGhpcy5hZGQuZ3JhcGhpY3MoKTtcbiAgICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKHRoaXMuc2VsZWN0ZWRTaXplT3B0aW9uICogMiwgdGhpcy5zZWxlY3RlZENvbG9yT3B0aW9uKTtcbiAgICAgICAgICB0aGlzLmxpbmUuc3Ryb2tlTGluZVNoYXBlKGxpbmVTaGFwZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIGN1cnJlbnQgZG90IGFzIHRoZSBsYXN0IGtub3duIGRvdC5cbiAgICAgICAgdGhpcy5sYXN0RG90ID0ge1xuICAgICAgICAgIHg6IHBvaW50ZXIueCxcbiAgICAgICAgICB5OiBwb2ludGVyLnlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBpcyBkb25lIGRyYXdpbmcsIHJlbW92ZSBhbnkgbGFzdCBrbm93biBkb3QgaW5mb3JtYXRpb24uXG4gICAgY2FudmFzLm9uKCdwb2ludGVydXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxhc3REb3QgPSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcblxuICAgIC8vIFdoZW4gdGhlIGN1cnNvciBsZWF2ZXMgdGhlIGNhbnZhcywgcmVtb3ZlIGFueSBsYXN0IGtub3duIGRvdCBpbmZvcm1hdGlvbi5cbiAgICBjYW52YXMub24oJ3BvaW50ZXJvdXQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxhc3REb3QgPSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGJydXNoIGNvbG9yIGFuZCBicnVzaCBzaXplIG9wdGlvbnMgdG8gdGhlIHNjZW5lLlxuICAgKi9cbiAgYWRkUGFpbnRPcHRpb25zKCkge1xuICAgIHRoaXMucGFpbnRPcHRpb25zR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuXG4gICAgdGhpcy5hZGRQYWludEJydXNoQ29sb3JPcHRpb25zKCk7XG4gICAgdGhpcy5hZGRQYWludEJydXNoU2l6ZU9wdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYnJ1c2ggc2l6ZSBvcHRpb25zIHRvIHRoZSBzY2VuZS5cbiAgICovXG4gIGFkZFBhaW50QnJ1c2hTaXplT3B0aW9ucygpIHtcbiAgICBjb25zdCBzaXplcyA9IFsgNiwgOSwgMTIgXTtcbiAgICBsZXQgb2Zmc2V0WCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnJ1c2hTaXplT3B0aW9uID0gdGhpcy5hZGQuZ3JhcGhpY3MoKTtcbiAgICAgIGJydXNoU2l6ZU9wdGlvbi5maWxsU3R5bGUoMHgwMDAwMDApO1xuICAgICAgYnJ1c2hTaXplT3B0aW9uLmZpbGxDaXJjbGUoNjUwICsgb2Zmc2V0WCwgNTAwLCBzaXplc1tpXSk7XG4gICAgICBicnVzaFNpemVPcHRpb24uc2V0SW50ZXJhY3RpdmUobmV3IFBoYXNlci5HZW9tLkNpcmNsZSg2NTAgKyBvZmZzZXRYLCA1MDAsIHNpemVzW2ldKSwgUGhhc2VyLkdlb20uQ2lyY2xlLkNvbnRhaW5zKTtcblxuICAgICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGdyYXBoaWMsIGNoYW5nZSB0aGUgc2l6ZSBvZiB0aGUgYnJ1c2guLlxuICAgICAgYnJ1c2hTaXplT3B0aW9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNpemVPcHRpb24gPSBzaXplc1tpXTtcbiAgICAgIH0pO1xuXG4gICAgICBvZmZzZXRYICs9IDUwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYnJ1c2ggY29sb3Igb3B0aW9ucyB0byB0aGUgc2NlbmUuXG4gICAqL1xuICBhZGRQYWludEJydXNoQ29sb3JPcHRpb25zKCkge1xuICAgIGNvbnN0IGNvbG9ycyA9IFsgJzB4MDAwMDAwJywgJzB4NjM1NmM3JywgJzB4ODdFMEZGJywgJzB4N0ZGRkQ0JywnMHhGRkIwQjAnLCAnMHhGRkFCNzYnLCAnMHhGQ0YzQjAnLCAnMHhGRkZGRkYnIF07XG4gICAgbGV0IG9mZnNldFk9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJydXNoQ29sb3JPcHRpb24gPSB0aGlzLmFkZC5ncmFwaGljcyg3MDAsIDEwMCArIG9mZnNldFkpO1xuICAgICAgYnJ1c2hDb2xvck9wdGlvbi5maWxsU3R5bGUoY29sb3JzW2ldKTtcbiAgICAgIGJydXNoQ29sb3JPcHRpb24uZmlsbENpcmNsZSg3MDAsIDEwMCArIG9mZnNldFksIDE1KTtcbiAgICAgIGJydXNoQ29sb3JPcHRpb24uc2V0SW50ZXJhY3RpdmUobmV3IFBoYXNlci5HZW9tLkNpcmNsZSg3MDAsIDEwMCArIG9mZnNldFksIDE1KSwgUGhhc2VyLkdlb20uQ2lyY2xlLkNvbnRhaW5zKTtcbiAgICAgIGJydXNoQ29sb3JPcHRpb24uc2V0U2NhbGUoMSwgMSk7XG5cbiAgICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBncmFwaGljLCBjaGFuZ2UgdGhlIGNvbG9yIG9mIHRoZSBicnVzaC5cbiAgICAgIGJydXNoQ29sb3JPcHRpb24ub24oJ3BvaW50ZXJkb3duJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ29sb3JPcHRpb24gPSBjb2xvcnNbaV07XG4gICAgICB9KTtcblxuICAgICAgb2Zmc2V0WSArPSA1MDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgY2xlYXIgYnV0dG9uIHRvIHRoZSBzY2VuZSwgdXNlZCBmb3IgZGVidWdnaW5nLlxuICAgKi9cbiAgYWRkQ2xlYXJCdXR0b24oKSB7XG4gICAgbGV0IGNsZWFyQnV0dG9uID0gdGhpcy5hZGQudGV4dCg3MDAsIDU1MCwgJ0NsZWFyJyk7XG4gICAgY2xlYXJCdXR0b24uc2V0T3JpZ2luKDAuNSk7XG4gICAgY2xlYXJCdXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcblxuICAgIGNsZWFyQnV0dG9uLm9uKCdwb2ludGVyZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMuc2NlbmUucmVzdGFydCgpO1xuICAgIH0pO1xuXG4gICAgY2xlYXJCdXR0b24ub24oJ3BvaW50ZXJvdmVyJywgKCkgPT4ge1xuICAgICAgY2xlYXJCdXR0b24uc2V0VGludCgweDYzNTZjNyk7XG4gICAgfSk7XG5cbiAgICBjbGVhckJ1dHRvbi5vbigncG9pbnRlcm91dCcsICgpID0+IHtcbiAgICAgIGNsZWFyQnV0dG9uLmNsZWFyVGludCgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgV2ViRm9udCBmcm9tICd3ZWJmb250bG9hZGVyJztcblxuLyoqXG4gKiBAY2xhc3MgLSBGb250IGxvYWRlciBjbGFzcyB0byBoYW5kbGUgbG9hZGluZyBXZWIgRm9udHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvbnRMb2FkZXIge1xuXG4gIC8qKlxuICAgKiBMb2FkIHRoZSAnT3BlbiBTYW5zJyBHb29nbGUgd2ViZm9udCBmYW1pbHkuXG4gICAqXG4gICAqIFdvcnRoIG5vdGluZyB0aGlzIGRvZXNuJ3QgZG8gYW55dGhpbmcgYXQgdGhlIG1vbWVudC4uLlxuICAgKi9cbiAgc3RhdGljIGxvYWRXZWJGb250T3BlblNhbnMoKSB7XG4gICAgV2ViRm9udC5sb2FkID0ge1xuICAgICAgZ29vZ2xlOiB7XG4gICAgICAgIGZhbWlsaWVzOiBbICdPcGVuIFNhbnMnLCAnT3BlbiBTYW5zOmJvbGQnIF1cbiAgICAgIH0sXG4gICAgICBhY3RpdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhpXCIpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIC0gUHJlbG9hZCBzdGF0aWMgY2xhc3MgdG8gaGFuZGxlIGFzc2V0IHByZWxvYWRpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xuXG4gIC8qKlxuICAgKiBMb2FkIGNhcmQgYXNzZXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge1BoYXNlci5TY2VuZX0gc2NlbmUgLSBUaGUgcGhhc2VyIHNjZW5lIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBsb2FkQ2FyZHMoc2NlbmUpIHtcbiAgICBjb25zdCBuYW1lcyA9IFsgXCJhXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCIsIFwiNVwiLCBcIjZcIiwgXCI3XCIsIFwiOFwiLCBcIjlcIiwgXCIxMFwiLCBcImpcIiwgXCJrXCIsIFwicVwiIF07XG4gICAgY29uc3Qgc3VpdHMgPSBbIFwiaGVhcnRzXCIsIFwiZGlhbW9uZHNcIiwgXCJzcGFkZXNcIiwgXCJjbHVic1wiIF07XG5cbiAgICBmb3IgKGNvbnN0IHN1aXQgb2Ygc3VpdHMpIHtcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICBjb25zdCBjYXJkTmFtZSA9IGAke3N1aXR9XyR7bmFtZX1gO1xuXG4gICAgICAgIHNjZW5lLmxvYWQuaW1hZ2UoY2FyZE5hbWUsIFwicHVibGljL2Fzc2V0cy9jYXJkcy9cIiArIGNhcmROYW1lICsgXCIucG5nXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNjZW5lLmxvYWQuaW1hZ2UoXCJiYWNrX2JsdWVcIiwgXCJwdWJsaWMvYXNzZXRzL2NhcmRzL2JhY2tfYmx1ZS5wbmdcIik7XG4gICAgc2NlbmUubG9hZC5pbWFnZShcImJhY2tfZ3JlZW5cIiwgXCJwdWJsaWMvYXNzZXRzL2NhcmRzL2JhY2tfZ3JlZW4ucG5nXCIpO1xuICAgIHNjZW5lLmxvYWQuaW1hZ2UoXCJiYWNrX3JlZFwiLCBcInB1YmxpYy9hc3NldHMvY2FyZHMvYmFja19yZWQucG5nXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgcGxheWVyIGFzc2V0cy5cbiAgICpcbiAgICogQHBhcmFtIHtQaGFzZXIuU2NlbmV9IHNjZW5lIC0gVGhlIHBoYXNlciBzY2VuZSBvYmplY3QuXG4gICAqL1xuICBzdGF0aWMgbG9hZFBsYXllcnMoc2NlbmUpIHtcbiAgICBjb25zdCBjb2xvcnMgPSBbIFwiYmxhY2tcIiwgXCJibHVlXCIsIFwiZ3JlZW5cIiwgXCJwdXJwbGVcIiwgXCJyZWRcIiwgXCJ3aGl0ZVwiLCBcInllbGxvd1wiIF07XG5cbiAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIGNvbG9ycykge1xuICAgICAgc2NlbmUubG9hZC5pbWFnZShgcGxheWVyXyR7Y29sb3J9YCwgYHB1YmxpYy9hc3NldHMvcGxheWVyL3BsYXllcl8ke2NvbG9yfS5wbmdgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBzb3VuZCBhc3NldHMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGhhc2VyLlNjZW5lfSBzY2VuZSAtIFRoZSBwaGFzZXIgc2NlbmUgb2JqZWN0LlxuICAgKi9cbiAgc3RhdGljIGxvYWRTb3VuZHMoc2NlbmUpIHtcbiAgICBjb25zdCBzb3VuZHMgPSBbIFwicGxhY2VcIiwgXCJzbGlkZVwiIF07XG5cbiAgICBmb3IgKGNvbnN0IHNvdW5kIG9mIHNvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgIHNjZW5lLmxvYWQuYXVkaW8oYGNhcmRfJHtzb3VuZH1fJHtpfWAsIGBwdWJsaWMvYXNzZXRzL3NvdW5kcy9jYXJkXyR7c291bmR9XyR7aX0ub2dnYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
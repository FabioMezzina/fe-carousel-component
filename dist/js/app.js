/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel.js */ "./src/js/carousel.js");
 // types and cardinalities allowed values array
// used to randomly chose a value for 'type' and 'category' card property

var types = ['video', 'playlist', 'news', 'other'];
var cardinalities = ['single', 'collection'];
/**
 * reusable fetchCards function
 * it returns "chunkSize" card objects to be displayed in the carousel
 */

var fetchCards = function fetchCards(chunkSize) {
  // create and populate the cards array to be returned
  var cards = [];

  for (var i = 0; i < chunkSize; i++) {
    // get a random id to point at a specific image on picsum
    var imageId = Math.floor(Math.random() * 100);
    cards.push({
      image: "https://picsum.photos/id/".concat(imageId, "/150/100"),
      type: types[Math.floor(Math.random() * 4)],
      duration: Math.floor(Math.random() * 7200),
      // duration in seconds, must be converted in human readable format
      title: "Card title ".concat(i + 1),
      cardinality: cardinalities[Math.floor(Math.random() * 2)]
    });
  } // return the JSON-like array of new cards to render


  return cards;
};
/* First carousel instance */


var options1 = {
  container: 'myCarousel1',
  icon: 'lightbulb',
  title: 'Fresh and just uploaded content >',
  subtitle: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Cras mollis condimentum nisl a tristique.',

  /**
   * function that returns "chunkSize" card objects to be displayed in the carousel
   */
  fetchCards: fetchCards
};
var carousel1 = new _carousel_js__WEBPACK_IMPORTED_MODULE_0__.default(options1);
/* Second carousel instance */

var options2 = {
  container: 'myCarousel2',
  icon: 'hand-point-right',
  title: 'Another carousel instance title >',
  subtitle: 'Totam illo magnam officiis minus suscipit, enim laboriosam delectus culpa libero dignissimos.',

  /**
   * function that returns "chunkSize" card objects to be displayed in the carousel
   */
  fetchCards: fetchCards
};
var carousel2 = new _carousel_js__WEBPACK_IMPORTED_MODULE_0__.default(options2);

/***/ }),

/***/ "./src/js/carousel.js":
/*!****************************!*\
  !*** ./src/js/carousel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Carousel = /*#__PURE__*/function () {
  /**
   * carousel constructor function
   * @param {object} options 
   */
  function Carousel(options) {
    _classCallCheck(this, Carousel);

    // destructure options object to construct Carousel class property
    var container = options.container,
        icon = options.icon,
        title = options.title,
        subtitle = options.subtitle;
    this.container = container;
    this.icon = icon;
    this.title = title;
    this.subtitle = subtitle;
    this.fetchCards = options.fetchCards; // generate for every Carousel instance a random chunk size from 3 to 6

    this.chunkSize = Math.floor(Math.random() * 4) + 3; // get carousel DOM element

    this.carouselEl = document.getElementById(container); // call the function for rendering the component

    this.renderComponent();
  }
  /**
   * render the whole component
   */


  _createClass(Carousel, [{
    key: "renderComponent",
    value: function renderComponent() {
      var _this = this;

      // carousel base template
      this.carouselEl.innerHTML = "\n        <!-- carousel header -->\n        <header class=\"carousel-header\">\n          <div class=\"icon-wrapper\">\n            <i class=\"far fa-".concat(this.icon, "\"></i>\n          </div>\n          <section class=\"title-section\">\n            <h3 class=\"title\">").concat(this.title, "</h3>\n            <p class=\"subtitle\">").concat(this.subtitle, "</p>\n          </section>\n        </header>\n        \n        <!-- carousel cards section -->\n        <section class=\"cards-section\">\n          <!-- single card -->\n          <div class=\"cards\"></div>\n\n          <!-- navigation arrows -->\n          <div class=\"arrow prev\">\n            <i class=\"fas fa-chevron-left\"></i>\n          </div>\n          <div class=\"arrow next\">\n            <i class=\"fas fa-chevron-right\"></i>\n          </div>\n\n        </section>\n    "); // add event listeners to navigation arrows
      // invokes generateCards function with a parameter indicating the scroll direction

      this.carouselEl.querySelector('.prev').addEventListener('click', function () {
        _this.generateCards('right');
      });
      this.carouselEl.querySelector('.next').addEventListener('click', function () {
        _this.generateCards('left');
      }); // generate cards into cards section

      this.generateCards();
    }
    /**
     * render a fake loading cards list
     * after 1.5s delay, generate a real cards list
     */

  }, {
    key: "generateCards",
    value: function generateCards() {
      var _this2 = this;

      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // get cards wrapper DOM element
      this.cards = this.carouselEl.querySelector('.cards'); // add a dynamic class to handle the scroll animation

      this.cards.classList.add("scroll-".concat(dir)); // generate fake loading cards

      this.renderCards(true); // generate cards after 1.5s timeout (mimic an API call)

      setTimeout(function () {
        _this2.renderCards(false); // remove the scrolling animation class handler


        _this2.cards.classList.remove("scroll-".concat(dir));
      }, 1500);
    }
    /**
     * render a generated cards array
     * if loading argument is true, all cards generated show a fake loading image
     * if false, an array of cards with random images is generated
     * @param {boolean} loading 
     */

  }, {
    key: "renderCards",
    value: function renderCards(loading) {
      var _this3 = this;

      var cardList = [];

      if (loading) {
        var card = {
          image: 'https://www.jqueryscript.net/images/loading-indicator-view.jpg',
          type: 'loading...',
          duration: 0,
          title: 'Loading...',
          cardinality: ''
        };

        for (var i = 0; i < this.chunkSize; i++) {
          cardList.push(card);
        }
      } else {
        cardList = this.fetchCards(this.chunkSize);
      } // delete and re-render the cardList array


      this.cards.innerHTML = '';
      cardList.forEach(function (card, index) {
        // convert duration in a human readable format
        var time = _this3.secondsToHuman(card.duration);

        var newCard = "\n        <div class=\"card\">\n          <div class=\"card-image-wrapper\">\n            <img class=\"card-image\" src=\"".concat(card.image, "\" alt=\"oops..image not found\">\n            <span class=\"type\">").concat(card.type, "</span>\n            <span class=\"duration\">").concat(time, "</span>\n          </div>\n          <h4 class=\"card-title\">").concat(card.title, "</h4>\n        </div>\n      ");
        _this3.cards.innerHTML += newCard;

        if (card.cardinality === 'collection') {
          _this3.cards.querySelectorAll('.card')[index].classList.add('collection');
        }
      });
    }
    /**
     * converts an integer number of minutes into human readable format
     * @param {number} sec 
     */

  }, {
    key: "secondsToHuman",
    value: function secondsToHuman(sec) {
      var hours = Math.floor(sec % 31536000 % 86400 / 3600);
      var minutes = Math.floor(sec % 31536000 % 86400 % 3600 / 60);
      var seconds = sec % 31536000 % 86400 % 3600 % 60;
      seconds = seconds < 10 ? "0".concat(seconds) : seconds;
      return hours > 0 ? "".concat(hours, "h ").concat(minutes, "m") : "".concat(minutes, ":").concat(seconds);
    }
  }]);

  return Carousel;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Carousel);

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/js/app.js"],
/******/ 			["./src/scss/app.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkjs_carousel"] = self["webpackChunkjs_carousel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
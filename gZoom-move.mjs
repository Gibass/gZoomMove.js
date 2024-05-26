/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/gZoomMove.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GZoomMove)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MIN_SCALE = 0.1;
var MAX_SCALE = 4;
var defaultOptions = {
  scale: {
    min: MIN_SCALE,
    max: MAX_SCALE
  },
  controls: {
    zoomIn: false,
    zoomOut: false,
    reset: false
  },
  zoom: true,
  move: true
};
var GZoomMove = /*#__PURE__*/function () {
  function GZoomMove(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, GZoomMove);
    this.elt = selector;
    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.elt && this.initZooming();
  }
  return _createClass(GZoomMove, [{
    key: "initZooming",
    value: function initZooming() {
      this.initEltParams();
      this.touchEvent();
      this.disableDocumentZoom();
      this.mouseEvent();
      this.controlEvent();
    }
  }, {
    key: "initEltParams",
    value: function initEltParams() {
      this.drag = false;
      this.isHover = false;
      this.start = {
        scale: 1,
        middle: {
          x: this.elt.offsetWidth / 2,
          y: this.elt.offsetHeight / 2
        }
      };
      this.state = {
        x: 0,
        y: 0,
        width: this.elt.offsetWidth,
        height: this.elt.offsetHeight,
        scale: 1,
        distance: 0,
        delta: {
          x: 0,
          y: 0
        }
      };
      this.parent = this.elt.parentNode;
    }
  }, {
    key: "touchEvent",
    value: function touchEvent() {
      var _this = this;
      // Start
      this.parent.addEventListener('touchstart', function (e) {
        return _this.handleTouchstart(e);
      });

      // Move
      this.parent.addEventListener('touchmove', function (e) {
        return _this.handleTouchMove(e);
      });

      // End
      this.parent.addEventListener('touchend', function (e) {
        return _this.handleTouchEnd(e);
      });
    }
  }, {
    key: "mouseEvent",
    value: function mouseEvent() {
      var _this2 = this;
      this.options.zoom && this.parent.addEventListener('wheel', function (e) {
        return _this2.handleWheel(e);
      });
      this.options.move && this.parent.addEventListener('mousedown', function (e) {
        return _this2.handleMouseDown(e);
      });
      this.options.move && this.parent.addEventListener("mousemove", function (e) {
        return _this2.handleMouseMove(e);
      });
      this.options.move && this.parent.addEventListener('mouseup', function () {
        return _this2.handleMouseCancel();
      });
      this.options.move && this.parent.addEventListener('mouseleave', function () {
        return _this2.handleMouseCancel();
      });
      this.elt.addEventListener('mouseover', function () {
        _this2.isHover = true;
      }, false);
      this.elt.addEventListener('mouseleave', function () {
        _this2.isHover = false;
      }, false);
    }
  }, {
    key: "controlEvent",
    value: function controlEvent() {
      var _this3 = this;
      this.options.zoom && this.options.controls.zoomIn && this.options.controls.zoomIn.addEventListener('click', function (e) {
        return _this3.controlZoom(e, 0.5);
      });
      this.options.zoom && this.options.controls.zoomOut && this.options.controls.zoomOut.addEventListener('click', function (e) {
        return _this3.controlZoom(e, -0.5);
      });
      this.options.controls.reset && this.options.controls.reset.addEventListener('click', function (e) {
        e.preventDefault();
        _this3.reset();
      });
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      if (e.cancelable) e.preventDefault();
      this.start.middle.x = e.clientX - this.elt.offsetLeft;
      this.start.middle.y = e.clientY - this.elt.offsetTop;
      this.zoom(-(e.deltaY / 1000));
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e.preventDefault();
      this.drag = true;
      this.tempCoord = {
        x: e.clientX,
        y: e.clientY
      };
      this.start.x = this.state.x;
      this.start.y = this.state.y;
      this.deltaStart = {
        x: this.state.delta.x,
        y: this.state.delta.y
      };
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      e.preventDefault();
      if (this.drag) {
        this.state.x = this.start.x + (e.clientX - this.tempCoord.x);
        this.state.y = this.start.y + (e.clientY - this.tempCoord.y);
        this.state.delta.x = this.deltaStart.x - (e.clientX - this.tempCoord.x);
        this.state.delta.y = this.deltaStart.y - (e.clientY - this.tempCoord.y);
        this.render();
      }
    }
  }, {
    key: "handleMouseCancel",
    value: function handleMouseCancel() {
      this.drag = false;
      this.tempCoord = {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "handleTouchstart",
    value: function handleTouchstart(e) {
      if (e.cancelable && (this.options.move || this.options.zoom)) e.preventDefault();
      if (this.options.move && e.touches.length === 1) {
        /*this.drag = true;
        this.start.x = this.state.x
        this.start.y = this.state.y
        this.deltaStart = { x: this.state.delta.x, y: this.state.delta.y }
        this.tempCoord = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }*/
      }
      if (this.options.zoom && e.touches.length === 2) {
        this.drag = true;
        this.start.x = this.state.x;
        this.start.y = this.state.y;
        this.deltaStart = {
          x: this.state.delta.x,
          y: this.state.delta.y
        };
        this.tempCoord = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
        this.start.scale = this.state.scale;
        this.start.distance = this.distance(e);
        this.start.middle.x = (e.touches[0].clientX - this.elt.offsetLeft + e.touches[1].clientX - 2 * this.elt.offsetLeft) / 2;
        this.start.middle.y = (e.touches[0].clientY - this.elt.offsetTop + e.touches[1].clientY - 2 * this.elt.offsetTop) / 2;
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      if (e.cancelable && (this.options.move || this.options.zoom)) e.preventDefault();
      if (this.options.move && this.drag && e.touches.length === 1) {

        //this.render()
      }
      if (this.options.zoom && e.touches.length === 2) {
        this.state.x = this.start.x + (e.changedTouches[0].clientX - this.tempCoord.x);
        this.state.y = this.start.y + (e.changedTouches[0].clientY - this.tempCoord.y);
        this.state.delta.x = this.deltaStart.x - (e.changedTouches[0].clientX - this.tempCoord.x);
        this.state.delta.y = this.deltaStart.y - (e.changedTouches[0].clientY - this.tempCoord.y);
        var deltaDistance = this.distance(e);
        var scale = deltaDistance / this.start.distance;
        this.state.scale = this.start.scale * Math.min(Math.max(0.12, scale), 4);
        this.reAdapt();
        this.render();
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(e) {
      if (e.cancelable && (this.options.move || this.options.zoom)) e.preventDefault();
      if (e.touches.length === 1) {
        this.drag = false;
        this.tempCoord = {
          x: 0,
          y: 0
        };
      }
    }
  }, {
    key: "disableDocumentZoom",
    value: function disableDocumentZoom() {
      var _this4 = this;
      document.addEventListener('wheel', function (e) {
        if (e.ctrlKey && _this4.isHover) e.preventDefault();
      }, {
        passive: false
      });
    }
  }, {
    key: "reAdapt",
    value: function reAdapt() {
      var deltaScale = this.elt.offsetWidth * this.state.scale / this.state.width - 1;
      var escapeX = (this.elt.offsetWidth * this.state.scale - this.state.width) / 2;
      var escapeY = (this.elt.offsetHeight * this.state.scale - this.state.height) / 2;
      this.state.x += escapeX - (this.start.middle.x + this.state.delta.x) * deltaScale;
      this.state.y += escapeY - (this.start.middle.y + this.state.delta.y) * deltaScale;
      this.state.delta.x += (this.start.middle.x + this.state.delta.x) * deltaScale;
      this.state.delta.y += (this.start.middle.y + this.state.delta.y) * deltaScale;
      this.state.width = this.elt.offsetWidth * this.state.scale;
      this.state.height = this.elt.offsetHeight * this.state.scale;
    }
  }, {
    key: "render",
    value: function render() {
      this.elt.style.transform = "translate(".concat(this.state.x, "px, ").concat(this.state.y, "px) scale(").concat(this.state.scale, ")");
    }
  }, {
    key: "distance",
    value: function distance(event) {
      return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    }
  }, {
    key: "controlZoom",
    value: function controlZoom(e, step) {
      e.preventDefault();
      this.start.middle.x = this.elt.offsetWidth / 2;
      this.start.middle.y = this.elt.offsetHeight / 2;
      this.zoom(step);
    }
  }, {
    key: "zoom",
    value: function zoom(step) {
      this.state.scale += step;
      var min = this.options.scale.min ? this.options.scale.min : MIN_SCALE;
      var max = this.options.scale.max ? this.options.scale.max : Number.MAX_SAFE_INTEGER;
      this.state.scale = Math.min(Math.max(min, this.state.scale), max);
      this.reAdapt();
      this.render();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.initEltParams();
      this.reAdapt();
      this.render();
    }
  }]);
}();

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };

//# sourceMappingURL=gZoom-move.mjs.map
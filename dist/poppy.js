var poppy =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8);
module.exports.Container = __webpack_require__(14);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var group_timer,
    groups = [],
    React = __webpack_require__(4),
    ReactDOM = __webpack_require__(9),
    isSafari = navigator.userAgent.toLowerCase(),
    propTypes = __webpack_require__(10);

isSafari = isSafari.indexOf('safari') >= 0 && isSafari.indexOf('chrome') < 0;

function group(item, unsafe) {
    if (!group_timer) {
        group_timer = requestAnimationFrame(do_group, 16);
    }
    item._group = 1;
    unsafe && (item._unsafe = 1);
    groups.push(item);
}
function ungroup(item) {
    var index = groups.indexOf(item);
    groups[index] = 0;
}
function do_group() {
    var i, ln, item, pack, settings;
    for (i = 0, ln = groups.length; i < ln; i++) {
        if (item = groups[i]) {
            pack = item.pack;
            item._group = 0;
            settings = item.settings;
            var targetRect = settings.target.getBoundingClientRect();
            pack.targetRect = {
                top: targetRect.top,
                left: targetRect.left,
                right: targetRect.right,
                bottom: targetRect.bottom,
                width: targetRect.width,
                height: targetRect.height
            };
            settings.constrainTo = item.props.constrainTo || defaults.constrainTo;
            settings.constrainTarget = item._upwardSelector(settings.constrainTo, settings);
            if (settings.constrainTarget === window) {
                pack.parentRect = {
                    top: window.scrollY,
                    left: window.scrollX,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                pack.parentRect.right = pack.parentRect.width + pack.parentRect.left;
                pack.parentRect.bottom = pack.parentRect.height + pack.parentRect.top;
                pack.targetRect.top += window.scrollY;
                pack.targetRect.left += window.scrollX;
            } else {
                pack.parentRect = settings.constrainTarget.getBoundingClientRect();
            }
        }
    }
    for (i = 0, ln = groups.length; i < ln; i++) {
        if (item = groups[i]) {
            item._updateAsync();
            item._unsafe && (item._unsafe = 0);
        }
        //groups[i]._updateAsync();
    }
    groups.length = 0;
    group_timer = 0;
}
//
//TODO cleanup and opensource
//TODO add groups
var SHOWING = {
    'NONE': 0,
    'MOUSEOVER': 1,
    'CONTENT': 2,
    'CLICK': 4,
    'PROPERTY': 8
},
    LEFT = 1,
    RIGHT = 2,
    TOP = 3,
    BOTTOM = 4;

var defaults = {
    //'onContentMouseLeave' : undefined,
    //'onContentMouseEnter' : undefined,
    'backgroundStyle': undefined,
    'arrowStyle': {},
    'wrapperStyle': undefined,
    'titleStyle': undefined,
    'content': '',
    'className': '',
    'title': '',
    'position': {
        'overflow': 'auto',
        'position': 'relative',
        'top': 0,
        'height': '100%',
        'left': 0,
        'width': '100%'
    },
    'constrainTo': 'parent',
    'persistOverContent': false,
    'showOnMouseEnter': true,
    'hideOnMouseLeave': true,
    'bindWindowResize': false,
    'bindScroll': false,
    //'hideOnClickOut' : false,
    'toggleOnClick': false,
    'constrainWidth': true,
    'constrainHeight': true,
    'track': false,
    //'constrainLeft' : true,
    //'constrainTop' : true,
    'arrowSize': 15,
    //'arrowPosition' : {},
    'region': undefined,
    'show': undefined,
    'showDelay': 300,
    'hideDelay': 320
},
    getDefaults = eval('(function () {return ' + JSON.stringify(defaults) + ';})');
(function (defaults) {
    var p, item;
    for (p in defaults) {
        item = defaults[p];
        if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
            defaults[p] = eval('(function (obj) {var result =' + JSON.stringify(item) + ',p; for (p in obj) {result[p]=obj[p]} return result;})');
        }
    }
})(defaults);

function assign_defaults(obja) {
    var _defaults = getDefaults(),
        val,
        d,
        p,
        q;
    for (p in obja) {
        if ((val = obja[p]) !== undefined && val !== null) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && _typeof(d = _defaults[p]) === 'object' && d) {
                for (q in val) {
                    d[q] = val[q];
                }
            } else {
                _defaults[p] = val;
            }
        }
    }
    return _defaults;
}

var
//React = require('react'),
//ReactDOM = require('react-dom'),
Popover = function (_React$Component) {
    _inherits(Popover, _React$Component);

    function Popover() {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this));

        _this._onExit = function (e) {
            _this.__onExit(e);
        };
        _this._onEnter = function (e) {
            _this.__onEnter(e);
        };
        return _this;
    }

    _createClass(Popover, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(props, state) {
            var last = this.state || {},
                position2 = state.position || {},
                result = this.minWidth !== position2.minWidth || this.minHeight !== position2.minHeight || this.maxWidth !== position2.maxWidth || last.content !== state.content || last.title !== state.title || this.maxHeight !== position2.maxHeight;
            return result;
        }
    }, {
        key: 'render',
        value: function render() {
            var state = this.state;
            if (!state) {
                return null;
            }
            var title = state.title,
                position = state.position,
                maxWidth = position.maxWidth,
                maxHeight = position.maxHeight,
                minWidth = position.minWidth,
                minHeight = position.minHeight,
                content = state.content,
                overflowStyle = this.overflowStyle,
                wrapperStyle = this.wrapperStyle,
                sWrap = state.wrapperStyle || {},
                backgroundStyle = state.backgroundStyle || {};

            overflowStyle.overflow = content ? 'auto' : null;
            this.maxHeight = overflowStyle.maxHeight = wrapperStyle.maxHeight = maxHeight;
            this.maxWidth = overflowStyle.maxWidth = wrapperStyle.maxWidth = maxWidth;
            this.minHeight = backgroundStyle.minHeight = sWrap.minHeight = minHeight;
            this.minWidth = backgroundStyle.minWidth = sWrap.minWidth = minWidth;

            return React.createElement(
                'span',
                { className: "poppy " + (state.className || ''), onMouseOver: this._onEnter, onMouseOut: this._onExit },
                React.createElement(
                    'span',
                    { ref: 'inner', style: state.backgroundStyle, className: 'poppy-background' },
                    React.createElement('div', { ref: 'arrow', className: 'poppy-arrow', style: state.mergedArrowStyle }),
                    React.createElement('div', { ref: 'wrapper', className: 'poppy-background-overlay', style: sWrap })
                ),
                React.createElement(
                    'div',
                    { ref: 'content', className: 'poppy-content-wrapper', style: wrapperStyle },
                    title ? React.createElement(
                        'div',
                        { ref: 'titleWrapper', style: state.titleStyle, className: 'poppy-title-wrapper' },
                        React.createElement(
                            'span',
                            { ref: 'title', className: 'poppy-title' },
                            state.title
                        )
                    ) : null,
                    React.createElement(
                        'div',
                        { ref: 'overflow', className: 'poppy-overflow', style: overflowStyle },
                        content ? React.createElement(
                            'div',
                            { ref: 'popover', className: 'poppy-content' },
                            ' ',
                            content || '',
                            ' '
                        ) : React.createElement('span', { ref: 'popover' })
                    )
                )
            );
        }
    }, {
        key: '__onEnter',
        value: function __onEnter() {
            this.state.onEnterContent && this.state.onEnterContent(SHOWING.CONTENT);
        }
    }, {
        key: '__onExit',
        value: function __onExit() {
            this.state.onLeaveContent && this.state.onLeaveContent(SHOWING.CONTENT);
        }
    }]);

    return Popover;
}(React.Component),
    overlay_template = document.createElement('span');
overlay_template.innerHTML = '<div class="poppy-container" style="position:absolute;top:0px;display:inline;pointer-events:none;z-index:6000"></div>';
overlay_template = overlay_template.lastChild;
Popover.prototype.overflowStyle = {};
Popover.prototype.wrapperStyle = {}, module.exports = function (_React$Component2) {
    _inherits(Poppy, _React$Component2);

    function Poppy() {
        _classCallCheck(this, Poppy);

        var _this2 = _possibleConstructorReturn(this, (Poppy.__proto__ || Object.getPrototypeOf(Poppy)).call(this));

        var state = assign_defaults(_this2.props);
        _this2._lastTargetRect = { left: 0, top: 0, width: 0, height: 0 };
        _this2.pack = {};
        _this2._transitioning = true;

        _this2._doTrack = function (e) {
            return _this2.__doTrack(e);
        };
        _this2._onClick = function (e) {
            return _this2.__onClick(e);
        };
        _this2._onResize = function (e) {
            return _this2.__onResize(e);
        };
        _this2._onScroll = function (e) {
            return _this2.__onScroll(e);
        };
        _this2._onMouseEnter = function (e) {
            return _this2.__onMouseEnter(e);
        };
        _this2._onMouseLeave = function (e) {
            return _this2.__onMouseLeave(e);
        };

        _this2.settings = {
            arrowStyle: {
                width: defaults.arrowSize,
                height: defaults.arrowSize
            },
            constrainTo: defaults.constrainTo,
            showing: 0,
            showDelay: defaults.showDelay,
            hideDelay: defaults.hideDelay,
            //arrowSize:defaults.arrowSize,
            track: defaults.track,
            constrainHeight: defaults.constrainHeight,
            constrainWidth: defaults.constrainWidth,
            className: defaults.className,

            //showOnMouseEnter : defaults.showOnMouseEnter,
            //hideOnMouseLeave : defaults.hideOnMouseLeave,
            //toggleOnClick : defaults.toggleOnClick,
            //bindWindowResize : defaults.bindWindowResize,
            //persistOverContent : defaults.persistOverContent,
            //bindScrollContainer : defaults.bindScrollContainer

            title: ''
        };
        _this2.componentWillUpdate(_this2.props, state);
        _this2.state = state;
        return _this2;
    }

    _createClass(Poppy, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                target = ReactDOM.findDOMNode(this);

            me.setState({
                'target': target
            });
            this._mount_timer = setTimeout(function () {
                me._updateSync(me.props, me.state);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var target = this.state.target,
                doc = target.ownerDocument,
                window = doc.defaultView;

            if (this.settings && (target = this.settings.target)) {
                target.removeEventListener('mouseenter', this._onMouseEnter);
                target.removeEventListener('mouseleave', this._onMouseLeave);
                target.removeEventListener('click', this._onClick);
            }
            this.untrack();
            this._resize_timer && clearTimeout(this._resize_timer);
            this._show_timer && clearTimeout(this._show_timer);
            this._mount_timer && clearTimeout(this._mount_timer);
            //this._render_timer && clearTimeout(this._render_timer);
            this.overlay && this.popoverEl.parentNode === this.overlay && this.overlay.removeChild(this.popoverEl);
            this._init_timer && clearTimeout(this._init_timer);

            this.settings.bindWindowResize && window.removeEventListener('resize', this._onResize);
            this._boundScroll && this._boundScroll.removeEventListener('scroll', this._onScroll);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(props, state) {
            this._updateSync(props, state);
            !this._group && group(this);
        }
    }, {
        key: '_updateSync',
        value: function _updateSync() {
            var _this3 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var state = arguments[1];

            state = state || this.state;
            var settings = this.settings,
                bindWindowResize = props.bindWindowResize || false,
                target = state && state.target,
                ltarget = settings.target,
                track = props.track || false,
                view = target && target.ownerDocument.defaultView,
                bindScroll = props.bindScroll === true ? 'window' : props.bindScroll,
                boundScroll = this._boundScroll,
                scroller = settings.target ? this._upwardSelector(bindScroll, settings) : false;

            if (bindWindowResize !== settings.bindWindowResize) {
                if (bindWindowResize) {
                    view && (view.addEventListener('resize', this._onResize), settings.bindWindowResize = true);
                } else {
                    view && view.removeEventListener('resize', this._onResize);
                    settings.bindWindowResize = false;
                }
            }

            settings.titleStyle = props.titleStyle || defaults.titleStyle;
            settings.wrapperStyle = props.wrapperStyle || defaults.wrapperStyle;

            if (scroller !== boundScroll) {
                if (boundScroll) {
                    boundScroll.removeEventListener('scroll', this._onScroll);
                    this._boundScroll = false;
                }
                if (scroller) {
                    scroller.addEventListener('scroll', this._onScroll, true);
                    this._boundScroll = scroller;
                }
            }

            if (track !== settings.track) {
                if (track) {
                    settings.track = true;
                    this.track();
                } else {
                    settings.track = false;
                    this.untrack();
                }
            }

            if (target && ltarget !== target) {
                target.addEventListener('mouseenter', this._onMouseEnter);
                target.addEventListener('mouseleave', this._onMouseLeave);
                target.addEventListener('click', this._onClick);
                settings.target = target;
                if (ltarget) {
                    ltarget.removeEventListener('mouseenter', this._onMouseEnter);
                    ltarget.removeEventListener('mouseleave', this._onMouseLeave);
                    ltarget.removeEventListener('click', this._onClick);
                }
            }

            if (props.persistOverContent) {
                settings.persistOverContent = true;
                settings.onEnterContent = function (e) {
                    return _this3.show(e);
                };
                settings.onLeaveContent = function (e) {
                    return _this3.hide(e);
                };
            } else {
                settings.persistOverContent = false;
                settings.onEnterContent = false;
                settings.onLeaveContent = false;
            }

            settings.toggleOnClick = props.toggleOnClick !== undefined ? props.toggleOnClick : defaults.toggleOnClick;
            settings.showOnMouseEnter = props.showOnMouseEnter !== undefined ? props.showOnMouseEnter : defaults.showOnMouseEnter;
            settings.hideOnMouseLeave = props.hideOnMouseLeave !== undefined ? props.hideOnMouseLeave : defaults.hideOnMouseLeave;
            settings.constrainHeight = props.constrainHeight !== undefined ? props.constrainHeight : defaults.constrainHeight;
            settings.constrainWidth = props.constrainWidth !== undefined ? props.constrainWidth : defaults.constrainWidth;
        }
    }, {
        key: '_updateAsync',
        value: function _updateAsync() {

            if (!this.settings.target) {
                return;
            }

            var me = this,
                props = this.props,
                show = props.show,
                settings = this.settings,
                showing = settings.showing & SHOWING.PROPERTY,
                doc = settings.target.ownerDocument,
                body = doc.body,
                overlay = this._upwardSelector(".poppy-container", settings),
                popover = this.popover,
                arrowSize = props.arrowSize !== undefined ? props.arrowSize : defaults.arrowSize,
                arrowStyle = settings.mergedArrowStyle = Object.assign({}, settings.arrowStyle, props.arrowStyle),
                region = props.region;

            if (region && region !== settings.last_prop_region) {
                if (region === 'top') {
                    settings.region = TOP;
                } else if (region === 'left') {
                    settings.region = LEFT;
                } else if (region === 'right') {
                    settings.region = RIGHT;
                } else if (region === 'bottom') {
                    settings.region = BOTTOM;
                }
            } else if (!region) {
                settings.region = defaults.region;
            }

            settings.backgroundStyle = props.backgroundStyle;

            settings.last_prop_region = region;
            settings.title = props.title || defaults.title;
            settings.content = props.content || defaults.content;
            settings.className = props.className || defaults.className;

            settings.arrowSize = arrowSize;
            settings.arrowSize3_4 = arrowSize * .75;
            settings.arrowSize1_2 = arrowSize * .5;
            settings.arrowSize2_1 = arrowSize * 2;
            settings.arrowSize3_2 = arrowSize * 1.5;
            arrowStyle.height = arrowStyle.width = arrowSize;

            this._adjustPosition(this.settings);

            if (overlay === body) {
                overlay = body.querySelector('.poppy-container');
            }
            if (!overlay) {
                body.appendChild(overlay = this.overlay = overlay_template.cloneNode(true));
            } else if (!this.overlay) {
                this.overlay = overlay;
            }

            if (!popover) {
                var test = document.createElement('div');
                popover = this.popover = ReactDOM.render(React.createElement(Popover, null), test);
                overlay.appendChild(test.lastChild);
            } else if (this.overlay.ownerDocument !== doc && this.popoverEl) {
                overlay.appendChild(this.popoverEl);
                this.overlay = overlay;
            }

            popover.setState(settings);
            if (!this.popoverEl) {
                this.popoverEl = ReactDOM.findDOMNode(popover);
            }

            //!this._init_timer && requestAnimationFrame(function () {
            if (showing && !show) {
                me.hide(SHOWING.PROPERTY);
            } else if (!showing && show) {
                me.show(SHOWING.PROPERTY);
            }

            //me._init_timer = false;
            me._updatePositions();

            //});
        }
    }, {
        key: '__onResize',
        value: function __onResize() {
            var me = this;
            if (this._resize_timer) {
                clearTimeout(this._resize_timer);
            }
            this._resize_timer = setTimeout(function () {
                me._resize_timer = undefined;
                me.setState({});
            }, 60);
        }
    }, {
        key: '__onMouseEnter',
        value: function __onMouseEnter() {
            if (this.settings.showOnMouseEnter) {
                this.show(SHOWING.MOUSEOVER);
            }
        }
    }, {
        key: '__onMouseLeave',
        value: function __onMouseLeave() {
            if (this.settings.hideOnMouseLeave) {
                this.hide(SHOWING.MOUSEOVER);
            }
        }
    }, {
        key: '__onClick',
        value: function __onClick() {
            if (this.settings.toggleOnClick) {
                if (this.settings.showing & SHOWING.CLICK) {
                    this.hide(SHOWING.CLICK);
                } else {
                    this.show(SHOWING.CLICK);
                }
            }
        }
    }, {
        key: '_adjustPosition',
        value: function _adjustPosition(settings) {
            var rect = this.pack.targetRect,
                //settings.target.getBoundingClientRect(),
            parentRect = this.pack.parentRect,
                //settings.constrainTarget.getBoundingClientRect(),
            parentRatio = parentRect.width / parentRect.height,
                region = settings.region,
                _topSpace,
                _leftSpace,
                _rightSpace,
                _bottomSpace,
                leftSpace = settings.leftSpace = rect.left - parentRect.left,
                rightSpace = settings.rightSpace = parentRect.left + parentRect.width - (rect.left + rect.width),
                topSpace = settings.topSpace = rect.top - parentRect.top,
                bottomSpace = settings.bottomSpace = parentRect.top + parentRect.height - (rect.top + rect.height),
                arrowSize = settings.arrowSize,
                position = settings.position,
                half_size = settings.arrowSize3_4,
                constrainHeight = settings.constrainHeight,
                constrainWidth = settings.constrainWidth,
                double_size = arrowSize * 2;

            if (!position) {
                position = settings.position = {};
            }

            if (!region) {
                _leftSpace = leftSpace * .75;
                _rightSpace = rightSpace * .75;
                _topSpace = topSpace * parentRatio;
                _bottomSpace = bottomSpace * parentRatio;
                if (_leftSpace > _bottomSpace && _leftSpace > _topSpace && _leftSpace >= _rightSpace) {
                    region = settings.region = LEFT;
                } else if (_rightSpace > _bottomSpace && _rightSpace > _topSpace) {
                    region = settings.region = RIGHT;
                } else if (_topSpace > _bottomSpace) {
                    region = settings.region = TOP;
                } else {
                    region = settings.region = BOTTOM;
                }
            }

            if (region === LEFT) {
                //position.minWidth = 0;
                position.minWidth = arrowSize;
                position.minHeight = double_size;
                position.top = position.left = 0;
                constrainWidth && (position.maxWidth = Math.max(leftSpace - half_size - 25, double_size));
                constrainHeight && (position.maxHeight = Math.max(topSpace + bottomSpace + rect.height - 30, 5));
            } else if (region === RIGHT) {
                //position.minWidth = 0;
                position.minWidth = arrowSize;
                position.top = 0;
                position.minHeight = double_size;
                position.left = rect.left + rect.width + half_size;
                constrainWidth && (position.maxWidth = Math.max(rightSpace - half_size - 25, double_size));
                constrainHeight && (position.maxHeight = Math.max(topSpace + bottomSpace + rect.height - 30, 5));
            } else if (region === BOTTOM) {
                //position.minHeight = 'auto';
                position.minHeight = arrowSize;
                position.top = rect.top + rect.height + half_size;
                position.left = 0;
                position.minWidth = double_size;
                constrainHeight && (position.maxHeight = Math.max(bottomSpace - half_size - 5, 25));
                constrainWidth && (position.maxWidth = Math.max(leftSpace + rightSpace + rect.width - 30, 25));
            } else {
                //position.minHeight = 'auto';
                position.minHeight = arrowSize;
                position.top = position.left = 0;
                position.minWidth = double_size;
                constrainHeight && (position.maxHeight = Math.max(topSpace - half_size + 2, 25));
                constrainWidth && (position.maxWidth = Math.max(leftSpace + rightSpace + rect.width - 30, 25));
            }
        }
    }, {
        key: '__onScroll',
        value: function __onScroll() {
            !this._group && group(this, true);
        }
    }, {
        key: '__doTrack',
        value: function __doTrack() {
            this._track_timer = setTimeout(this._doTrack, 16);

            var settings = this.settings,
                target = settings.target;

            if (!target || !this.popover) {
                return;
            }

            !this._group && group(this, true);
        }
    }, {
        key: 'track',
        value: function track() {
            if (!this._track_timer) {
                this._track_timer = setTimeout(this._doTrack, 16);
            }
            return this;
        }
    }, {
        key: 'untrack',
        value: function untrack() {
            if (this._track_timer) {
                clearTimeout(this._track_timer);
                this._track_timer = false;
            }
            return this;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.setState({});
            return this;
        }
    }, {
        key: 'hide',
        value: function hide(trigger) {
            var me = this,
                settings = this.settings,
                showing = settings.showing;
            if (!showing) {
                return;
            }

            if (showing & trigger) {
                settings.showing -= trigger;
            } else {
                return;
            }

            var node = this.popoverEl,
                style = node.style;
            this._show_timer && clearTimeout(this._show_timer);
            this._show_timer = setTimeout(function () {
                if (settings.showing) {
                    return;
                }
                !node.$listener && node.addEventListener('transitionend', node.$listener = function () {
                    node.removeEventListener('transitionend', node.$listener);
                    node.$listener = false;
                    !settings.showing && (node.style.visibility = 'hidden');
                });
                me._show_timer = undefined;
                style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
                if (settings.region === RIGHT) {
                    style.transform = 'translateX(30px)translateY(0px)';
                } else if (settings.region === LEFT) {
                    style.transform = 'translateX(-30px)translateY(0px)';
                } else if (settings.region === TOP) {
                    style.transform = 'translateX(0px)translateY(-30px)';
                } else {
                    style.transform = 'translateX(0px)translateY(30px)';
                }
                style.pointerEvents = 'none';
                style.opacity = 0;
                me.props.onHide && me.props.onHide();
            }, settings.hideDelay);
        }
    }, {
        key: 'show',
        value: function show(trigger) {
            var me = this,
                settings = this.settings,
                node = this.popoverEl,
                style = node.style,
                reset = true,
                was_showing = settings.showing;

            settings.showing |= trigger;
            if (was_showing) {
                return;
            } else if (this._show_timer) {
                clearTimeout(this._show_timer);
                this._show_timer = undefined;
                reset = false;
            }
            node.$listener && node.removeEventListener('transitionend', node.$listener);
            node.$listener = false;

            if (reset) {
                this._show_timer = setTimeout(function () {
                    if (!settings.showing) {
                        return;
                    }
                    me.props.onShow && me.props.onShow();
                    me._show_timer = undefined;
                    style.transition = null;
                    if (settings.region === RIGHT) {
                        style.transfrom = 'translateX(30px)translateY(0px)';
                    } else if (settings.region === LEFT) {
                        style.transform = 'translateX(-30px)translateY(0px)';
                    } else if (settings.region === TOP) {
                        style.transform = 'translateX(0px)translateY(-30px)';
                    } else {
                        style.transform = 'translateX(0px)translateY(30px)';
                    }
                    style.pointerEvents = 'all';
                    me._show_timer = setTimeout(function () {
                        me._show_timer = undefined;
                        style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
                        style.visibility = null;
                        style.opacity = 1;
                        style.transform = 'translateX(0px)translateY(0px)';
                    }, settings.showDelay);
                });
            } else {
                style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
                style.visibility = null;
                style.opacity = 1;
                style.transform = 'translateX(0px)translateY(0px)';
            }
        }
    }, {
        key: '_upwardSelector',
        value: function _upwardSelector(selector, settings) {
            var target = settings.target,
                document = target.ownerDocument;

            if (!selector) {
                return selector;
            } else if (typeof selector === 'string') {
                if (selector === 'body') {
                    return document.body;
                } else if (selector === 'parent') {
                    return target && target.parentNode;
                } else if (selector === 'window') {
                    return target && target.ownerDocument.defaultView;
                } else {
                    while (target) {
                        if (target.matches && target.matches(selector)) {
                            return target;
                        }
                        target = target.parentNode;
                    }
                    return document.body;
                }
            } else if (target = ReactDOM.findDOMNode(selector)) {
                return target;
            }
            return selector;
        }
    }, {
        key: '_updatePositions',
        value: function _updatePositions() {
            var target = this.settings.target;
            if (!target) {
                return;
            }
            var overflow = this.popover.refs.overflow,
                overflowStyle = overflow.style,
                overflowRect,
                wrapperStyle = this.popover.refs.wrapper.style,
                arrow = this.popover.refs.arrow,
                arrowelStyle = arrow.style,
                contentStyle = this.popover.refs.content.style,
                settings = this.settings,
                title = this.popover.refs.title,
                titleRect = title && title.getBoundingClientRect(),
                targetRect = this.pack.targetRect,
                //target.getBoundingClientRect(),
            parentRect = this.pack.parentRect,
                //settings.constrainTarget.getBoundingClientRect(),
            titleWidth = titleRect && titleRect.width || 0,
                titleHeight = titleRect && titleRect.height || 0,
                targetTop = targetRect.top,
                targetWidth = targetRect.width,
                halfTargetWidth = targetWidth / 2,
                targetHeight = targetRect.height,
                halfTargetHeight = targetHeight / 2,
                targetLeft = targetRect.left,
                offsetTop,
                offsetLeft,
                parentTop = offsetTop = parentRect.top,
                parentLeft = offsetLeft = parentRect.left,
                arrowLeft = offsetLeft | 0,
                arrowTop = offsetTop | 0,
                width,
                height,
                region = settings.region,
                spaceLeft = settings.leftSpace,
                spaceTop = settings.topSpace,
                arrowSize = settings.arrowSize | 0,
                size1_2 = settings.arrowSize1_2,
                size3_4 = settings.arrowSize3_4,
                size2_1 = settings.arrowSize2_1,
                size3_2 = settings.arrowSize3_2,
                upperBounds,
                lowerBounds,
                x = settings.position.left,
                y = settings.position.top,
                c;

            overflowStyle.paddingTop = titleHeight + 'px';
            overflowStyle.maxHeight = Math.max(Math.round(this.settings.position.maxHeight - titleHeight), 0) + 'px';

            overflowRect = overflow.getBoundingClientRect();
            width = Math.max(overflowRect.width, titleWidth);
            height = overflowRect.height;

            if (!this.settings.target) {
                return;
            }
            if (region === TOP || region === BOTTOM) {
                lowerBounds = 5;
                upperBounds = parentLeft + parentRect.width - 5;
                offsetLeft = targetLeft + halfTargetWidth - width / 2;
                if (offsetLeft < lowerBounds) {
                    offsetLeft = lowerBounds;
                }
                if ((c = targetLeft + targetWidth - size3_2) < lowerBounds) {
                    offsetLeft = c;
                }
                if (offsetLeft > (c = upperBounds - width)) {
                    offsetLeft = c;
                }
                if ((c = targetLeft + arrowSize) > upperBounds) {
                    offsetLeft = c - width;
                }

                arrowLeft += spaceLeft + halfTargetWidth - arrowSize;
                arrowLeft = Math.max(Math.min(arrowLeft, offsetLeft + width - size2_1), offsetLeft) + size1_2;
                x = offsetLeft;
                if (region === TOP) {
                    y = targetTop - height - size3_4 - 9;
                    //y = (targetTop - height - size3_4 -9);

                    arrowTop = targetTop - size3_4 - 9 - size1_2; // size3_4 - size1_2;
                } else {
                    arrowTop = y - size1_2;
                }
            } else if (region === LEFT || region === RIGHT) {
                offsetTop += spaceTop + targetHeight - halfTargetHeight - height / 2;
                upperBounds = parentTop + parentRect.height - 5;
                lowerBounds = 5;

                if (offsetTop < lowerBounds) {
                    offsetTop = lowerBounds;
                }
                if ((c = targetTop + targetHeight - size3_2) < lowerBounds) {
                    offsetTop = c;
                }
                if (offsetTop > (c = upperBounds - height)) {
                    offsetTop = c;
                }
                if ((c = targetTop + arrowSize) > upperBounds) {
                    offsetTop = c - height;
                }
                arrowTop += spaceTop + halfTargetHeight - arrowSize;
                arrowTop = Math.max(Math.min(arrowTop, offsetTop + height - size2_1), offsetTop) + size1_2;
                y = offsetTop;
                if (region === LEFT) {
                    x = targetLeft - width - size3_4 - 6;
                    arrowLeft = x + width - size1_2 - 1;
                } else {
                    x = targetLeft + targetWidth + size3_4;
                    arrowLeft = x - size1_2 + 1;
                }
            }

            contentStyle.width = wrapperStyle.width = (width | 0) + 'px';
            //arrowelStyle.top = (arrowTop|0) + 'px';
            //arrowelStyle.left = (arrowLeft|0) + 'px';
            //wrapperStyle.top = contentStyle.top = (y|0) + 'px';
            //wrapperStyle.left = contentStyle.left = (x|0) + 'px'


            if (isSafari && this._unsafe && this.popoverEl) {
                if (group_timer) {
                    this.popoverEl.style.transition = arrowelStyle.transition = contentStyle.transition = wrapperStyle.transition = 'none';
                } else {
                    this.popoverEl.style.transition = arrowelStyle.transition = contentStyle.transition = wrapperStyle.transition = null;
                }
            }

            //var me = this;

            contentStyle.width = wrapperStyle.width = (width | 0) + 'px';
            arrowelStyle.top = (arrowTop | 0) + 'px';
            arrowelStyle.left = (arrowLeft | 0) + 'px';
            wrapperStyle.top = contentStyle.top = (y | 0) + 'px';
            wrapperStyle.left = contentStyle.left = (x | 0) + 'px';
            wrapperStyle.height = (height | 0) + 'px';

            this.settings.showing && this.popoverEl.style.visiblity && (this.popoverEl.style.visiblity = null);
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;
            if (typeof children === 'string') {
                children = React.createElement(
                    'span',
                    null,
                    children
                );
            }
            return children || null;
        }
    }]);

    return Poppy;
}(React.Component);
module.exports.propTypes = {
    children: propTypes.any,
    constrainTo: propTypes.any,
    show: propTypes.bool,
    showDelay: propTypes.number,
    hideDelay: propTypes.number,
    track: propTypes.bool,
    constrainHeight: propTypes.bool,
    constrainWidth: propTypes.bool,
    arrowSize: propTypes.number,
    region: propTypes.oneOf(['left', 'right', 'top', 'bottom', null, false, undefined]),
    bindScroll: propTypes.oneOfType([propTypes.bool, propTypes.string]),
    bindWindowResize: propTypes.bool,
    arrowStyle: propTypes.object,
    backgroundStyle: propTypes.object,
    wrapperStyle: propTypes.object,
    titleStyle: propTypes.object,
    className: propTypes.string,
    title: propTypes.any,
    showOnMouseEnter: propTypes.bool,
    hideOnMouseLeave: propTypes.bool,
    toggleOnClick: propTypes.bool,
    persistOverContent: propTypes.bool,
    onHide: propTypes.func,
    onShow: propTypes.func
};
module.exports.defaultProps = {
    constrainTo: 'parent',
    showDelay: 300,
    hideDelay: 320,
    track: false,
    constrainHeight: true,
    constrainWidth: true,
    arrowSize: 15,
    bindScroll: false,
    bindWindowResize: false,
    className: '',
    title: '',
    showOnMouseEnter: true,
    hideOnMouseLeave: true,
    toggleOnClick: false,
    persistOverContent: false
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(11)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(13)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(5);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(12);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(4);

module.exports = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
    }

    _createClass(Container, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return !this.loaded && (this.loaded = true);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'poppy-container', style: { position: 'absolute', display: 'inline', top: 0, pointerEvents: 'none', zIndex: 6000 } });
        }
    }]);

    return Container;
}(React.Component);

/***/ })
/******/ ]);
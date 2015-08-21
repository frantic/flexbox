/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function doc(keyword) {

	  return React.renderToStaticMarkup(React.createElement(DocBox, { keyword: keyword }));
	}

	window.doc = doc;

	var DocBox = React.createClass({
	  displayName: 'DocBox',

	  render: function render() {
	    var values = ['flex-start', 'center', 'flex-end'].map(function (value, ii) {
	      return React.createElement(
	        'span',
	        { key: value },
	        ii !== 0 && ' | ',
	        React.createElement(
	          'a',
	          { href: '#' },
	          value
	        )
	      );
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'strong',
	        null,
	        this.props.keyword
	      ),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      'Defines some cool stuff, lol!',
	      React.createElement('br', null),
	      React.createElement('br', null),
	      'Values: ',
	      values
	    );
	  }
	});

/***/ }
/******/ ]);
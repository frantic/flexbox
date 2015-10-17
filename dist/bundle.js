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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Editor = __webpack_require__(1);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _Simulator = __webpack_require__(5);

	var _Simulator2 = _interopRequireDefault(_Simulator);

	var _ExamplesPage = __webpack_require__(7);

	var _ExamplesPage2 = _interopRequireDefault(_ExamplesPage);

	var Main = React.createClass({
	  displayName: 'Main',

	  getInitialState: function getInitialState() {
	    return {
	      code: __webpack_require__(4)
	    };
	  },

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      'div',
	      { className: 'main' },
	      React.createElement(_Simulator2['default'], { code: this.state.code }),
	      React.createElement(_Editor2['default'], {
	        onChange: function (code) {
	          return _this.setState({ code: code });
	        },
	        initialCode: this.state.code
	      })
	    );
	  }
	});

	window.addEventListener('load', function () {
	  return React.render(React.createElement(Main, null), document.body);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _DocBox = __webpack_require__(2);

	var _DocBox2 = _interopRequireDefault(_DocBox);

	var Editor = React.createClass({
	  displayName: 'Editor',

	  getInitialState: function getInitialState() {
	    return {
	      keyword: ''
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	      mode: 'javascript',
	      theme: 'neo',
	      tabSize: 2,
	      keyMap: 'sublime',
	      viewportMargin: Infinity
	    });
	    editor.focus();

	    editor.on('change', function () {
	      _this.props.onChange(editor.getValue());
	    });
	    editor.on('cursorActivity', function () {
	      var pos = editor.getCursor();
	      var line = editor.getLine(pos.line);
	      for (var end = pos.ch; end < line.length; end++) {
	        if (!line[end].match(/\w/)) {
	          break;
	        }
	      }
	      for (var start = pos.ch - 1; start >= 0; start--) {
	        if (!line[start].match(/\w/)) {
	          break;
	        }
	      }
	      var keyword = line.substring(start + 1, end);
	      _this.setState({ keyword: keyword });
	    });
	    this.editor = editor;
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'code' },
	      React.createElement('textarea', { id: 'code', defaultValue: this.props.initialCode }),
	      React.createElement(_DocBox2['default'], {
	        keyword: this.state.keyword,
	        onChangeValue: this.editLine
	      })
	    );
	  },

	  editLine: function editLine(value) {
	    var _editor$getCursor = this.editor.getCursor();

	    var line = _editor$getCursor.line;
	    var ch = _editor$getCursor.ch;

	    var original = this.editor.getLine(line);
	    var text = typeof value === 'string' ? '\'' + value + '\'' : value + '';
	    var replacement = original.replace(/: .+$/, ': ' + text + ',');
	    this.editor.replaceRange(replacement, { line: line, ch: 0 }, { line: line, ch: original.length }, 'cats');
	    this.editor.setCursor({ line: line, ch: ch });
	    this.editor.focus();
	  }

	});

	module.exports = Editor;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _docs = __webpack_require__(3);

	var _docs2 = _interopRequireDefault(_docs);

	var DocBox = React.createClass({
	  displayName: 'DocBox',

	  render: function render() {
	    var _this = this;

	    var help = _docs2['default'][this.props.keyword];
	    if (!help) {
	      return null;
	    }

	    var values = help.values.map(function (value, ii) {
	      return React.createElement(
	        'span',
	        { key: value },
	        ii !== 0 && ' | ',
	        React.createElement(
	          'a',
	          { href: '#', onClick: function () {
	              return _this.props.onChangeValue(value);
	            } },
	          value
	        )
	      );
	    });

	    return React.createElement(
	      'div',
	      { id: 'help' },
	      React.createElement(
	        'strong',
	        null,
	        this.props.keyword
	      ),
	      React.createElement('br', null),
	      React.createElement('br', null),
	      help.description,
	      React.createElement('br', null),
	      React.createElement('br', null),
	      'Values: ',
	      values
	    );
	  }
	});

	module.exports = DocBox;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  flexDirection: {
	    description: 'Shows where to put children',
	    values: ['row', 'column']
	  },
	  alignItems: {
	    description: 'Used to align stuff',
	    values: ['flex-start', 'center', 'flex-end']
	  },
	  justifyContent: {
	    description: 'Like alignItems but different',
	    values: ['flex-start', 'center', 'flex-end']
	  },
	  flex: {
	    description: 'Use all the space',
	    values: [1, 'auto']
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "class ListViewItem extends React.Component {\n  render() {\n    return (\n      <View style={styles.item}>\n        <Image style={styles.icon} />\n        <View style={styles.content}>\n          <Text style={styles.title}>\n            List item title\n          </Text>\n          <Text style={styles.description}>\n            Here goes description\n          </Text>\n        </View>\n      </View>\n    );\n  }\n};\n\nvar IMAGE_SIZE = 60;\n\nvar styles = StyleSheet.create({\n  item: {\n    padding: 10,\n    flexDirection: 'row',\n    justifyContent: 'center',\n  },\n  icon: {\n    width: IMAGE_SIZE,\n    height: IMAGE_SIZE,\n    backgroundColor: '#336699',\n    marginRight: 10,\n  },\n  content: {\n    flex: 1,\n    justifyContent: 'center',\n  },\n  title: {\n    fontWeight: 'bold',\n  },\n  description: {\n    paddingTop: 4,\n    color: '#777',\n  }\n});\n"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ExampleHost = __webpack_require__(9);

	var _ExampleHost2 = _interopRequireDefault(_ExampleHost);

	var Simulator = (function (_React$Component) {
	  _inherits(Simulator, _React$Component);

	  function Simulator() {
	    _classCallCheck(this, Simulator);

	    _get(Object.getPrototypeOf(Simulator.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Simulator, [{
	    key: "render",
	    value: function render() {
	      var time = formatTime(new Date());
	      return React.createElement(
	        "div",
	        { className: "preview" },
	        React.createElement(
	          "div",
	          { className: "phone" },
	          React.createElement(
	            "div",
	            { className: "status" },
	            React.createElement(
	              "span",
	              null,
	              "●●●●● React"
	            ),
	            React.createElement(
	              "span",
	              null,
	              time
	            ),
	            React.createElement(
	              "span",
	              null,
	              "100%"
	            )
	          ),
	          React.createElement(_ExampleHost2["default"], { code: this.props.code })
	        )
	      );
	    }
	  }]);

	  return Simulator;
	})(React.Component);

	exports["default"] = Simulator;

	function formatTime(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  if (minutes < 10) {
	    minutes = '0' + minutes;
	  }
	  return hours + ':' + minutes;
	}

	module.exports = Simulator;
	module.exports = exports["default"];

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactNativeWeb = __webpack_require__(8);

	var ExampleCard = (function (_React$Component) {
	  _inherits(ExampleCard, _React$Component);

	  function ExampleCard() {
	    _classCallCheck(this, ExampleCard);

	    _get(Object.getPrototypeOf(ExampleCard.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ExampleCard, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(_ReactNativeWeb.View, { style: styles.card });
	    }
	  }]);

	  return ExampleCard;
	})(React.Component);

	var ExamplesPage = (function (_React$Component2) {
	  _inherits(ExamplesPage, _React$Component2);

	  function ExamplesPage() {
	    _classCallCheck(this, ExamplesPage);

	    _get(Object.getPrototypeOf(ExamplesPage.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ExamplesPage, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(ExampleCard, null);
	    }
	  }]);

	  return ExamplesPage;
	})(React.Component);

	exports['default'] = ExamplesPage;

	var styles = _ReactNativeWeb.StyleSheet.create({
	  card: {
	    width: 100,
	    height: 100,
	    backgroundColor: '#eee'
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var View = 'div';
	exports.View = View;
	var Text = 'span';
	exports.Text = Text;
	var Image = 'img';
	exports.Image = Image;
	var StyleSheet = { create: function create(s) {
	    return s;
	  } };
	exports.StyleSheet = StyleSheet;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExampleHost = (function (_React$Component) {
	  _inherits(ExampleHost, _React$Component);

	  function ExampleHost() {
	    _classCallCheck(this, ExampleHost);

	    _get(Object.getPrototypeOf(ExampleHost.prototype), 'constructor', this).call(this);
	    this.state = { html: null, error: null };
	  }

	  _createClass(ExampleHost, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.evalCode();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (prevProps.code !== this.props.code) {
	        this.evalCode();
	      }
	    }
	  }, {
	    key: 'evalCode',
	    value: function evalCode() {
	      var View = 'div';
	      var Text = 'span';
	      var Image = 'img';
	      var StyleSheet = { create: function create(s) {
	          return s;
	        } };

	      var code = this.props.code || '';
	      var className = code.match(/class ([A-Z]\w+) extends React/);
	      try {
	        className = className && className[1];
	        if (!className) {
	          throw new Error('Could not find React component. Make sure your code has\n\n' + 'class Example extends React.Component');
	        }
	        code += '\nReact.renderToStaticMarkup(<' + className + ' />);';
	        code = JSXTransformer.transform(code).code;

	        this.setState({
	          html: eval(code),
	          error: null
	        });
	      } catch (error) {
	        this.setState({ error: error });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.state.error) {
	        return React.createElement('div', {
	          className: 'display',
	          dangerouslySetInnerHTML: { __html: this.state.html }
	        });
	      }

	      return React.createElement(
	        'div',
	        { className: 'error' },
	        this.state.error.message
	      );
	    }
	  }]);

	  return ExampleHost;
	})(React.Component);

	exports['default'] = ExampleHost;
	module.exports = exports['default'];

/***/ }
/******/ ]);
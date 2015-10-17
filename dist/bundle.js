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
	    return React.createElement(
	      'div',
	      { className: 'main' },
	      React.createElement(_ExamplesPage2['default'], null)
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _DocBox = __webpack_require__(2);

	var _DocBox2 = _interopRequireDefault(_DocBox);

	var _reactNativeWeb = __webpack_require__(13);

	var Editor = (function (_React$Component) {
	  _inherits(Editor, _React$Component);

	  function Editor() {
	    _classCallCheck(this, Editor);

	    _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).call(this);
	    this.state = { keyword: '' };
	  }

	  _createClass(Editor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
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
	    }
	  }, {
	    key: 'editLine',
	    value: function editLine(value) {
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
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        _reactNativeWeb.View,
	        { style: styles.code },
	        React.createElement('textarea', { id: 'code', defaultValue: this.props.initialCode }),
	        React.createElement(_DocBox2['default'], {
	          keyword: this.state.keyword,
	          onChangeValue: this.editLine
	        })
	      );
	    }
	  }]);

	  return Editor;
	})(React.Component);

	exports['default'] = Editor;

	var styles = _reactNativeWeb.StyleSheet.create({
	  code: {
	    display: 'flex',
	    position: 'relative',
	    flex: 4,
	    backgroundColor: '#F5F5FF',
	    justifyContent: 'center',
	    flexDirection: 'column',
	    overflow: 'scroll',
	    paddingLeft: 20,
	    borderLeft: 'solid 1px #ccc'
	  }
	});
	module.exports = exports['default'];

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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ExampleHost = __webpack_require__(9);

	var _ExampleHost2 = _interopRequireDefault(_ExampleHost);

	var _StatusBar = __webpack_require__(12);

	var _StatusBar2 = _interopRequireDefault(_StatusBar);

	var _reactNativeWeb = __webpack_require__(13);

	var Simulator = (function (_React$Component) {
	  _inherits(Simulator, _React$Component);

	  function Simulator() {
	    _classCallCheck(this, Simulator);

	    _get(Object.getPrototypeOf(Simulator.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Simulator, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        _reactNativeWeb.View,
	        { style: styles.container },
	        React.createElement(
	          _reactNativeWeb.View,
	          { style: styles.phone },
	          React.createElement(_StatusBar2['default'], null),
	          React.createElement(_ExampleHost2['default'], {
	            style: styles.innerFrame,
	            code: this.props.code
	          })
	        )
	      );
	    }
	  }]);

	  return Simulator;
	})(React.Component);

	exports['default'] = Simulator;

	var styles = _reactNativeWeb.StyleSheet.create({
	  container: {
	    display: 'flex',
	    flex: 3,
	    alignItems: 'center',
	    justifyContent: 'center'
	  },
	  phone: {
	    position: 'relative',
	    display: 'flex',
	    width: 320,
	    height: 568,
	    borderWidth: 1,
	    borderColor: '#ccc',
	    borderStyle: 'solid',
	    borderRadius: 2,
	    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
	    fontSize: 12
	  },
	  innerFrame: {
	    paddingTop: _StatusBar2['default'].height
	  }
	});
	module.exports = exports['default'];

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ExampleHost = __webpack_require__(9);

	var _ExampleHost2 = _interopRequireDefault(_ExampleHost);

	var _reactNativeWeb = __webpack_require__(13);

	var ExampleCard = (function (_React$Component) {
	  _inherits(ExampleCard, _React$Component);

	  function ExampleCard() {
	    _classCallCheck(this, ExampleCard);

	    _get(Object.getPrototypeOf(ExampleCard.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ExampleCard, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        _reactNativeWeb.View,
	        { style: styles.card },
	        React.createElement(_ExampleHost2['default'], { code: this.props.code })
	      );
	    }
	  }]);

	  return ExampleCard;
	})(React.Component);

	var examples = [__webpack_require__(11), __webpack_require__(4)];

	var ExamplesPage = (function (_React$Component2) {
	  _inherits(ExamplesPage, _React$Component2);

	  function ExamplesPage() {
	    _classCallCheck(this, ExamplesPage);

	    _get(Object.getPrototypeOf(ExamplesPage.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(ExamplesPage, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        _reactNativeWeb.View,
	        { style: styles.container },
	        examples.map(function (code, idx) {
	          return React.createElement(ExampleCard, { code: code, key: idx });
	        })
	      );
	    }
	  }]);

	  return ExamplesPage;
	})(React.Component);

	exports['default'] = ExamplesPage;

	var styles = _reactNativeWeb.StyleSheet.create({
	  container: {
	    display: 'flex',
	    flex: 1,
	    flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#eee'
	  },
	  card: {
	    width: 300,
	    height: 300,
	    margin: 10,
	    backgroundColor: 'white',
	    position: 'relative',
	    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
	    fontSize: 12
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _reactNativeWeb = __webpack_require__(13);

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
	        return React.createElement(_reactNativeWeb.View, {
	          className: 'display',
	          style: [styles.takeAllSpace, this.props.style],
	          dangerouslySetInnerHTML: { __html: this.state.html }
	        });
	      }

	      return React.createElement(
	        _reactNativeWeb.View,
	        {
	          className: 'error',
	          style: [styles.takeAllSpace, styles.error, this.props.style] },
	        this.state.error.message
	      );
	    }
	  }]);

	  return ExampleHost;
	})(React.Component);

	exports['default'] = ExampleHost;

	var styles = _reactNativeWeb.StyleSheet.create({
	  innerFrame: {
	    paddingTop: 20
	  },
	  takeAllSpace: {
	    position: 'absolute',
	    left: 0,
	    top: 0,
	    bottom: 0,
	    right: 0,
	    overflow: 'hidden'
	  },
	  error: {
	    alignItems: 'center',
	    justifyContent: 'center',
	    paddingHorizontal: 30,
	    color: 'red',
	    whiteSpace: 'pre-wrap'
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	module.exports = "class CenteredTextLabel extends React.Component {\n  render() {\n    return (\n      <View style={styles.container}>\n        <Text>Hello!</Text>\n      </View>\n    );\n  }\n};\n\nvar styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});\n"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _reactNativeWeb = __webpack_require__(13);

	var StatusBar = (function (_React$Component) {
	  _inherits(StatusBar, _React$Component);

	  function StatusBar() {
	    _classCallCheck(this, StatusBar);

	    _get(Object.getPrototypeOf(StatusBar.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(StatusBar, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;

	      this.interval = setInterval(function () {
	        return _this.forceUpdate();
	      }, 1000);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearInterval(this.interval);
	    }
	  }, {
	    key: 'now',
	    value: function now() {
	      var date = new Date();
	      var hours = date.getHours();
	      var minutes = date.getMinutes();
	      if (minutes < 10) {
	        minutes = '0' + minutes;
	      }
	      return hours + ':' + minutes;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        _reactNativeWeb.View,
	        { style: styles.status },
	        React.createElement(
	          _reactNativeWeb.Text,
	          { style: [styles.section, styles.network] },
	          '●●●●● React'
	        ),
	        React.createElement(
	          _reactNativeWeb.Text,
	          { style: [styles.section, styles.time] },
	          this.now()
	        ),
	        React.createElement(
	          _reactNativeWeb.Text,
	          { style: [styles.section, styles.info] },
	          '100%'
	        )
	      );
	    }
	  }]);

	  return StatusBar;
	})(React.Component);

	exports['default'] = StatusBar;

	StatusBar.height = 20;

	var styles = _reactNativeWeb.StyleSheet.create({
	  status: {
	    height: StatusBar.height,
	    display: 'flex',
	    flex: 1,
	    flexDirection: 'row'
	  },
	  section: {
	    flex: 1,
	    padding: 4,
	    fontWeight: '500'
	  },
	  network: {
	    textAlign: 'left'
	  },
	  time: {
	    textAlign: 'center'
	  },
	  info: {
	    textAlign: 'right'
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function fallback(value1, value2) {
	  if (typeof value1 !== 'undefined') {
	    return value1;
	  } else {
	    return value2;
	  }
	}

	function polyfill(style) {
	  var computed = {};
	  for (var key in style) {
	    var value = style[key];
	    switch (key) {
	      case 'paddingVertical':
	        computed.paddingTop = fallback(style.paddingTop, value);
	        computed.paddingBottom = fallback(style.paddingBottom, value);
	        break;

	      case 'paddingHorizontal':
	        computed.paddingLeft = fallback(style.paddingLeft, value);
	        computed.paddingRight = fallback(style.paddingRight, value);
	        break;

	      case 'marginVertical':
	        computed.marginTop = fallback(style.marginTop, value);
	        computed.marginBottom = fallback(style.marginBottom, value);
	        break;

	      case 'marginHorizontal':
	        computed.marginLeft = fallback(style.marginLeft, value);
	        computed.marginRight = fallback(style.marginRight, value);
	        break;

	      default:
	        computed[key] = value;
	    }
	  }
	  return computed;
	}

	function styled(Component) {
	  return React.createClass({
	    displayName: Component,

	    render: function render() {
	      var _props = this.props;
	      var style = _props.style;

	      var props = _objectWithoutProperties(_props, ['style']);

	      if (Array.isArray(style)) {
	        style = Object.assign.apply(Object, [{}].concat(_toConsumableArray(style)));
	      }

	      return React.createElement(Component, _extends({ style: polyfill(style) }, props));
	    }
	  });
	}

	var View = styled('div');
	exports.View = View;
	var Text = styled('span');
	exports.Text = Text;
	var Image = styled('img');
	exports.Image = Image;
	var StyleSheet = { create: function create(s) {
	    return s;
	  } };
	exports.StyleSheet = StyleSheet;

/***/ }
/******/ ]);
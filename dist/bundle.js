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

	var _Simulator = __webpack_require__(3);

	var _Simulator2 = _interopRequireDefault(_Simulator);

	var Main = React.createClass({
	  displayName: 'Main',

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      'div',
	      { className: 'main' },
	      React.createElement(_Simulator2['default'], { ref: 'sim' }),
	      React.createElement(_Editor2['default'], { onChange: function (code) {
	          return _this.refs.sim.run(code);
	        } })
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
	    this.props.onChange(editor.getValue());

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
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'code' },
	      React.createElement('textarea', { id: 'code', defaultValue: template }),
	      React.createElement(_DocBox2['default'], { keyword: this.state.keyword })
	    );
	  }

	});

	module.exports = Editor;

	var template = '\nvar Example = React.createClass({\n  render: function() {\n    return (\n      <View style={styles.container}>\n        <Text>Hello!</Text>\n      </View>\n    );\n  }\n});\n\nvar styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: \'center\',\n    justifyContent: \'center\',\n  },\n});\n';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _docs = __webpack_require__(4);

	var _docs2 = _interopRequireDefault(_docs);

	var DocBox = React.createClass({
	  displayName: 'DocBox',

	  render: function render() {
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
	          { href: '#' },
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

	var View = 'div';
	var Text = 'span';
	var StyleSheet = { create: function create(s) {
	    return s;
	  } };

	function run(code) {
	  code += 'React.render(<Example />, display);';
	  try {
	    code = JSXTransformer.transform(code).code;
	    eval(code);
	    display.style.opacity = 1;
	    error.innerHTML = '';
	  } catch (e) {
	    display.style.opacity = 0.2;
	    console.error(code);
	    console.error(e.message);
	    error.innerHTML = e.message;
	  }
	}

	var Simulator = React.createClass({
	  displayName: 'Simulator',

	  run: run,

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'preview' },
	      React.createElement(
	        'div',
	        { className: 'phone' },
	        React.createElement('div', { id: 'display' }),
	        React.createElement(
	          'div',
	          { id: 'error' },
	          'Ops'
	        )
	      )
	    );
	  }

	});

	module.exports = Simulator;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
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

/***/ }
/******/ ]);
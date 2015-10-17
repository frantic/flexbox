import DocBox from './DocBox';

var Editor = React.createClass({

  getInitialState: function() {
    return {
      keyword: '',
    };
  },

  componentDidMount() {
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'javascript',
      theme: 'neo',
      tabSize: 2,
      keyMap: 'sublime',
      viewportMargin: Infinity
    });
    editor.focus();
    this.props.onChange(editor.getValue());

    editor.on('change', () => {
      this.props.onChange(editor.getValue());
    });
    editor.on('cursorActivity', () => {
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
      this.setState({keyword});
    });
    this.editor = editor;
  },

  render() {
    return (
      <div className="code">
        <textarea id="code" defaultValue={template} />
        <DocBox
          keyword={this.state.keyword}
          onChangeValue={this.editLine}
        />
      </div>
    );
  },

  editLine(value) {
    let {line, ch} = this.editor.getCursor();
    let original = this.editor.getLine(line);
    let text = typeof value === 'string' ? `'${value}'` : value + '';
    let replacement = original.replace(/: .+$/, `: ${text},`);
    this.editor.replaceRange(replacement, {line, ch: 0}, {line, ch: original.length}, 'cats');
    this.editor.setCursor({line, ch});
    this.editor.focus();
  }

});

module.exports = Editor;


var template = require('raw!./examples/ListViewItem');

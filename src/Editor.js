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
  },

  render() {
    return (
      <div className="code">
        <textarea id="code" defaultValue={template} />
        <DocBox keyword={this.state.keyword} />
      </div>
    );
  }

});

module.exports = Editor;


var template = `
var Example = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
`;




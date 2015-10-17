import DocBox from './DocBox';
import {View, StyleSheet} from './react-native-web';

export default class Editor extends React.Component {

  constructor() {
    super();
    this.state = {keyword: ''};
  }

  componentDidMount() {
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'javascript',
      theme: 'neo',
      tabSize: 2,
      keyMap: 'sublime',
      viewportMargin: Infinity
    });
    editor.focus();

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
  }

  editLine(value) {
    let {line, ch} = this.editor.getCursor();
    let original = this.editor.getLine(line);
    let text = typeof value === 'string' ? `'${value}'` : value + '';
    let replacement = original.replace(/: .+$/, `: ${text},`);
    this.editor.replaceRange(replacement, {line, ch: 0}, {line, ch: original.length}, 'cats');
    this.editor.setCursor({line, ch});
    this.editor.focus();
  }

  render() {
    return (
      <View style={styles.code}>
        <textarea id="code" defaultValue={this.props.initialCode} />
        <DocBox
          keyword={this.state.keyword}
          onChangeValue={this.editLine}
        />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  code: {
    display: 'flex',
    position: 'relative',
    flex: 4,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'scroll',
    paddingLeft: 20,
    borderLeft: 'solid 1px #ccc',
  },
});

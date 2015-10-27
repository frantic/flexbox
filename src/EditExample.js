import React from 'react'
import { Link } from 'react-router'
import Editor from './Editor';
import Simulator from './Simulator';
import ExamplesPage from './ExamplesPage';
import allExamples from './allExamples';
import createHistory from 'history/lib/createHashHistory';
import {StyleSheet} from './react-native-web';

export default class EditExample extends React.Component {
  constructor() {
    super();
    this.state = {code: null};
  }

  componentDidMount() {
    // TODO: We could load code from Parse
    var code = allExamples[this.props.params.id];
    this.setState({code});
  }

  render() {
    if (!this.state.code) {
      // TODO: Show loading screen?
      return null;
    }

    return (
      <div className="main">
        <Link to={'/'} style={styles.close}>
          {'\u2715' /* X */}
        </Link>
        <Simulator
          code={this.state.code}
        />
        <Editor
          initialCode={this.state.code}
          onChange={(code) => this.setState({code})}
        />
      </div>
    );
  }
}

var styles = StyleSheet.create({
  close: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 30,
    height: 30,
    textDecoration: 'none',
    color: '#ccc',
    fontSize: 26,
  },
});

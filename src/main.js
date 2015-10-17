import React from 'react'
import { Router, Route, Link } from 'react-router'
import Editor from './Editor';
import Simulator from './Simulator';
import ExamplesPage from './ExamplesPage';
import allExamples from './allExamples';
import createHistory from 'history/lib/createHashHistory';

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <Router history={createHistory({queryKey: false})}>
          <Router path="/" component={ExamplesPage} />
          <Route path="/example/:id" component={EditExample}/>
        </Router>
      </div>
    );
  }
}

class EditExample extends React.Component {
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

window.addEventListener('load', () => React.render(<Main />, document.body));


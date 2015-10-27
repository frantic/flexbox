import React from 'react'
import { Router, Route } from 'react-router'
import Editor from './Editor';
import Simulator from './Simulator';
import ExamplesPage from './ExamplesPage';
import EditExample from './EditExample';
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

window.addEventListener('load', () => React.render(<Main />, document.body));


import Editor from './Editor';
import Simulator from './Simulator';
import ExamplesPage from './ExamplesPage';

var Main = React.createClass({
  getInitialState: function() {
    return {
      code: require('raw!./examples/ListViewItem')
    };
  },

  render() {
    return (
      <div className="main">
        <ExamplesPage />
      </div>
    );
  }
});

window.addEventListener('load', () => React.render(<Main />, document.body));


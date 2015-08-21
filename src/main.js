import Editor from './Editor';
import Simulator from './Simulator';

var Main = React.createClass({
  render() {
    return (
      <div className="main">
        <Simulator ref="sim" />
        <Editor onChange={(code) => this.refs.sim.run(code)} />
      </div>
    );
  }
});

window.addEventListener('load', () => React.render(<Main />, document.body));


import ExampleHost from './ExampleHost';

export default class Simulator extends React.Component {
  render() {
    var time = formatTime(new Date());
    return (
      <div className="preview">
        <div className="phone">
          <div className="status">
            <span>&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf; React</span>
            <span>{time}</span>
            <span>100%</span>
          </div>
          <ExampleHost code={this.props.code} />
        </div>
      </div>
    );
  }
}

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}

module.exports = Simulator;

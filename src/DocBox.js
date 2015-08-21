import docs from './docs';

var DocBox = React.createClass({
  render() {
    var help = docs[this.props.keyword];
    if (!help) {
      return null;
    }

    var values = help.values.map((value, ii) =>
      <span key={value}>
        {ii !== 0 && ' | '}
        <a href="#" onClick={() => this.props.onChangeValue(value)}>{value}</a>
      </span>
    );

    return (
      <div id="help">
        <strong>{this.props.keyword}</strong>
        <br />
        <br />
        {help.description}
        <br />
        <br />
        Values: {values}
      </div>
    );
  }
});

module.exports = DocBox;

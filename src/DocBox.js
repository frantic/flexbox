var DocBox = React.createClass({
  render() {
    var values = ['flex-start', 'center', 'flex-end'].map((value, ii) =>
      <span key={value}>
        {ii !== 0 && ' | '}
        <a href="#">{value}</a>
      </span>
    );

    return (
      <div id="help">
        <strong>{this.props.keyword}</strong>
        <br />
        <br />
        Defines some cool stuff, lol!
        <br />
        <br />
        Values: {values}
      </div>
    );
  }
});

module.exports = DocBox;

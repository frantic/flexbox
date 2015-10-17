var View = 'div';
var Text = 'span';
var Image = 'img';
var StyleSheet = {create: function(s) { return s; }};

function run(code) {
  var className = code.match(/class ([A-Z]\w+) extends React/);
  try {
    className = className && className[1];
    if (!className) {
      throw new Error(
        'Could not find React component. Make sure your code has\n\n' +
        'class Example extends React.Component'
      );
    }
    code += `\nReact.render(<${className} />, display);`
    code = JSXTransformer.transform(code).code;
    eval(code);
    display.style.opacity = 1;
    error.innerHTML = '';
  } catch(e) {
    display.style.opacity = 0.2;
    console.error(code);
    console.error(e.message);
    error.innerHTML = e.message;
  }
}

var Simulator = React.createClass({

  run,

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
          <div id="display"></div>
          <div id="error">Ops</div>
        </div>
      </div>
    );
  }

});

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}

module.exports = Simulator;

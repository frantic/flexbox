var View = 'div';
var Text = 'span';
var StyleSheet = {create: function(s) { return s; }};

function run(code) {
  code += 'React.render(<Example />, display);'
  try {
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
    return (
      <div className="preview">
        <div className="phone">
          <div id="display"></div>
          <div id="error">Ops</div>
        </div>
      </div>
    );
  }

});

module.exports = Simulator;

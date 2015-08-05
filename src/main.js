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

window.addEventListener('load', function() {
  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'javascript',
    theme: 'neo',
    tabSize: 2,
    keyMap: 'sublime',
    viewportMargin: Infinity
  });
  editor.focus();
  run(editor.getValue());
  editor.on('change', function() {
    run(editor.getValue());
  });
});

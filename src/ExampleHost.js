export default class ExampleHost extends React.Component {

  constructor() {
    super();
    this.state = {html: null, error: null};
  }

  componentDidMount() {
    this.evalCode();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.evalCode();
    }
  }

  evalCode() {
    var View = 'div';
    var Text = 'span';
    var Image = 'img';
    var StyleSheet = {create: function(s) { return s; }};

    var code = this.props.code || '';
    var className = code.match(/class ([A-Z]\w+) extends React/);
    try {
      className = className && className[1];
      if (!className) {
        throw new Error(
          'Could not find React component. Make sure your code has\n\n' +
          'class Example extends React.Component'
        );
      }
      code += `\nReact.renderToStaticMarkup(<${className} />);`
      code = JSXTransformer.transform(code).code;

      this.setState({
        html: eval(code),
        error: null,
      });
    } catch(error) {
      this.setState({error: error});
    }
  }

  render() {
    if (!this.state.error) {
      return (
        <div
          className="display"
          dangerouslySetInnerHTML={{__html: this.state.html}}
        />
      )
    }

    return (
      <div className="error">
        {this.state.error.message}
      </div>
    )
  }
}


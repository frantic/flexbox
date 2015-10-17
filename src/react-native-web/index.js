import React from 'react'

function fallback(value1, value2): any {
  if (typeof value1 !== 'undefined') {
    return value1;
  } else {
    return value2;
  }
}

function polyfill(style: Object): Object {
  var computed = {};
  for (var key in style) {
    var value = style[key];
    switch (key) {
      case 'paddingVertical':
        computed.paddingTop = fallback(style.paddingTop, value);
        computed.paddingBottom = fallback(style.paddingBottom, value);
        break;

      case 'paddingHorizontal':
        computed.paddingLeft = fallback(style.paddingLeft, value);
        computed.paddingRight = fallback(style.paddingRight, value);
        break;

      case 'marginVertical':
        computed.marginTop = fallback(style.marginTop, value);
        computed.marginBottom = fallback(style.marginBottom, value);
        break;

      case 'marginHorizontal':
        computed.marginLeft = fallback(style.marginLeft, value);
        computed.marginRight = fallback(style.marginRight, value);
        break;

      default:
        computed[key] = value;
    }
  }
  return computed;
}

function styled(Component: string): React.Component {
  return React.createClass({
    displayName: Component,

    render() {
      var {style, ...props} = this.props;
      if (Array.isArray(style)) {
        style = Object.assign({}, ...style);
      }

      return <Component style={polyfill(style)} {...props} />;
    }
  });
}

export let View = styled('div');
export let Text = styled('span');
export let Image = styled('img');
export let StyleSheet = { create: (s) => s };


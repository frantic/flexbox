import ExampleHost from './ExampleHost';
import {View, Text, StyleSheet} from './react-native-web';

class ExampleCard extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <ExampleHost code={this.props.code} />
      </View>
    );
  }
}

var examples = [
  require('raw!./examples/CenteredTextLabel'),
  require('raw!./examples/ListViewItem'),
];

export default class ExamplesPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {examples.map((code, idx) => <ExampleCard code={code} key={idx} />)}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  card: {
    width: 300,
    height: 300,
    margin: 10,
    backgroundColor: 'white',
    position: 'relative',
    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 12,
  }
});

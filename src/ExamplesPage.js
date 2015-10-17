import {View, Text, StyleSheet} from './ReactNativeWeb';

class ExampleCard extends React.Component {
  render() {
    return (
      <View style={styles.card}>
      </View>
    );
  }
}

export default class ExamplesPage extends React.Component {
  render() {
    return <ExampleCard />;
  }
}

var styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
  }
});

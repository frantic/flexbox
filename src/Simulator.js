import React from 'react'
import ExampleHost from './ExampleHost';
import StatusBar from './StatusBar';
import {Text, View, StyleSheet} from './react-native-web';


export default class Simulator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.phone}>
          <StatusBar />
          <ExampleHost
            style={styles.innerFrame}
            code={this.props.code}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: 568,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 2,
    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 12,
  },
});
